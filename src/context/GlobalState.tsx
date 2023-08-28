import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

import {fetchProducts} from '../services/api';

export interface Product {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

interface GlobalState {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	cart: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	removeItemFromCart: (productId: number) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider: React.FC<{children: ReactNode}> = ({children}) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<Product[]>([]);

	const addToCart = (product: Product) => {
		const existingProduct = cart.find(item => item.id === product.id);
		if (existingProduct) {
			// If product already exist in cart then increase its quantity
			const updatedCart = cart.map(item =>
				item.id === product.id
					? {...item, quantity: item.quantity + 1}
					: item,
			);
			setCart(updatedCart);
		} else {
			// Add new product to cart
			setCart(prevCart => [...prevCart, {...product, quantity: 1}]);
		}
	};

	const removeFromCart = (productId: number) => {
		// decresing the quantity of item
		const updatedCart = cart
			.map(item =>
				item.id === productId
					? {...item, quantity: item.quantity - 1}
					: item,
			)
			.filter(item => item.quantity > 0);

		setCart(updatedCart);
	};

	const removeItemFromCart = (productId: number) => {
		// removing item from cart
		const updatedCart = cart.filter(item => item.id !== productId);
		setCart(updatedCart);
	};

	useEffect(() => {
		fetchProducts()
			.then(data => setProducts(data))
			.catch(error => {
				console.error('Error fetching products:', error);
			});
	}, []);

	const stateValue = {
		products,
		setProducts,
		cart,
		addToCart,
		removeFromCart,
		removeItemFromCart,
	};

	return (
		<GlobalContext.Provider value={stateValue}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalState = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalProvider');
	}
	return context;
};

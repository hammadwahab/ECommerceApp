// Importing necessary modules and components
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { fetchProducts } from '../services/api';

// Defining the Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Defining the GlobalState interface for context
interface GlobalState {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  removeItemFromCart: (productId: number) => void;
}

// Creating a context for global state
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Defining and exporting the GlobalProvider component to manage global state
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initializing state for products and cart
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Add a product to the cart or increase its quantity if it already exists
  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // If the product already exists in the cart, increase its quantity
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      // update the cart
      setCart(updatedCart);
    } else {
      // Add a new product to the cart
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  // Remove a single item from the cart
  const removeFromCart = (productId: number) => {
    // Decrease the quantity of the item
    const updatedCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);

    // update the cart
    setCart(updatedCart);
  };

  // Remove an item completely from the cart
  const removeItemFromCart = (productId: number) => {
    // Removing item from the cart
    const updatedCart = cart.filter((item) => item.id !== productId);
    // update the cart
    setCart(updatedCart);
  };

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Defining the context value
  const stateValue = {
    products,
    setProducts,
    cart,
    addToCart,
    removeFromCart,
    removeItemFromCart,
  };

  // Providing the context value to children components
  return <GlobalContext.Provider value={stateValue}>{children}</GlobalContext.Provider>;
};

// Defining and exporting a custom hook for using the global state
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};

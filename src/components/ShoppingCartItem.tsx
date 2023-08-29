import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Product, useGlobalState} from '../context/GlobalState';

interface ShoppingCartItemProps {
	item: Product;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({item}) => {
	const {removeFromCart, addToCart, removeItemFromCart} = useGlobalState();

	return (
		<View style={styles.container}>
			<View style={styles.subContainer}>
				<View style={styles.dataContainer}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.price}>${item.price}</Text>
				</View>
				<View style={styles.quantityContainer}>
					<View style={styles.quantitySubContainer}>
						<TouchableOpacity
							style={styles.quantityButton}
							onPress={() => {
								if (item.quantity > 1) removeFromCart(item.id);
							}}>
							<Text style={styles.quantityButtonText}>-</Text>
						</TouchableOpacity>
						<Text style={styles.quantityText}>{item.quantity}</Text>
						<TouchableOpacity
							style={styles.quantityButton}
							onPress={() => addToCart(item)}>
							<Text style={styles.quantityButtonText}>+</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<TouchableOpacity
				style={styles.removeButton}
				onPress={() => removeItemFromCart(item.id)}>
				<Text style={styles.removeButtonText}>Remove</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
	},
	subContainer: {
		flexDirection: 'row',
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	price: {
		fontSize: 14,
		color: '#888',
	},
	count: {
		fontSize: 14,
		color: '#555',
	},
	removeButton: {
		backgroundColor: 'red',
		padding: 5,
		borderRadius: 5,
		alignItems: 'center',
		marginTop: 5,
	},
	removeButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	dataContainer: {
		flex: 3,
	},
	quantityContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	quantitySubContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	quantityButton: {
		backgroundColor: 'lightgray',
		padding: 5,
		borderRadius: 5,
		marginHorizontal: 5,
	},
	quantityButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
	},
	quantityText: {
		fontSize: 16,
		marginHorizontal: 10,
	},
});

export default ShoppingCartItem;

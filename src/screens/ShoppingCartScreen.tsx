import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';

import {Product, useGlobalState} from '../context/GlobalState';
import ShoppingCartItem from '../components/ShoppingCartItem';

const ShoppingCartScreen: React.FC = () => {
	const {cart} = useGlobalState();

	const renderItem = ({item}: {item: Product}) => (
		<ShoppingCartItem item={item} />
	);

	return (
		<View style={styles.container}>
			{cart.length === 0 ? (
				<Text>Your cart is empty</Text>
			) : (
				<FlatList
					data={cart}
					keyExtractor={item => item.id.toString()}
					renderItem={renderItem}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});

export default ShoppingCartScreen;

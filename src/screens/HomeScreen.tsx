import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Product, useGlobalState} from '../context/GlobalState';
import ProductListItem from '../components/ProductListItem';
import {fetchProducts} from '../services/api';

const HomeScreen: React.FC = () => {
	const {products, setProducts, addToCart} = useGlobalState();
	const [loading, setLoading] = useState(true);

	const navigation =
		useNavigation<NativeStackNavigationProp<ParamListBase>>();

	useEffect(() => {
		fetchProducts()
			.then(data => {
				setProducts(data);
				setLoading(false);
			})
			.catch(error => {
				console.error('Error fetching products:', error);
				setLoading(false);
			});
	}, []);

	const renderItem = ({item}: {item: Product}) => (
		<ProductListItem product={item} onAddToCart={() => addToCart(item)} />
	);

	return loading ? (
		<View style={styles.loadingContainer}>
			<Text>Loading...</Text>
		</View>
	) : (
		<View style={styles.container}>
			<FlatList
				data={products}
				keyExtractor={item => item.id.toString()}
				renderItem={renderItem}
			/>
			<TouchableOpacity
				style={styles.cartButton}
				onPress={() => navigation.navigate('Cart')}>
				<Text style={styles.cartButtonText}>View Cart</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cartButton: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		marginTop: 10,
	},
	cartButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default HomeScreen;

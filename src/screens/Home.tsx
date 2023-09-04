// Importing necessary modules and components
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Product, useGlobalState } from '../context/GlobalState';
import ProductListItem from '../components/ProductListItem';
import { fetchProducts } from '../services/api';

// Defining the Home component
const Home: React.FC = () => {
  // Accessing global state and navigation
  const { products, setProducts, addToCart } = useGlobalState();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // fetch data as screen mounts
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Render each item in the FlatList
  const renderItem = ({ item }: { item: Product }) => (
    <ProductListItem product={item} onAddToCart={() => addToCart(item)} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        // loading component until data is not updated in state
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        // list of products
        <FlatList data={products} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
      )}
      {/*Cart screen button*/}
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// styling
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

// Exporting the Home component
export default Home;

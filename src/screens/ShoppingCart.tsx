// Importing necessary modules and components
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import { Product, useGlobalState } from '../context/GlobalState';
import ShoppingCartItem from '../components/ShoppingCartItem';

// Defining the ShoppingCart component
const ShoppingCart: React.FC = () => {
  // Accessing global state
  const { cart } = useGlobalState();

  // Render each item in the FlatList
  const renderItem = ({ item }: { item: Product }) => <ShoppingCartItem item={item} />;

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        /* component if no cart is empty */
        <Text>Your cart is empty</Text>
      ) : (
        // shopping cart listing
        <FlatList data={cart} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
      )}
    </View>
  );
};

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

// Exporting the ShoppingCart component
export default ShoppingCart;

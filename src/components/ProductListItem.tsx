// Importing necessary modules and components
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../context/GlobalState';

// Defining the props for the ProductListItem component
interface ProductListItemProps {
  product: Product;
  onAddToCart: () => void;
}

// Defining the ProductListItem component
const ProductListItem: React.FC<ProductListItemProps> = ({ product, onAddToCart }) => {
  return (
    <View style={styles.container}>
      {/* Product Name */}
      <Text style={styles.name}>{product.name}</Text>
      {/* Product Price */}
      <Text style={styles.price}>${product.price}</Text>
      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// styling
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

// Exporting the ProductListItem component
export default ProductListItem;

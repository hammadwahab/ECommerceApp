// Importing necessary modules and components
import axios, { AxiosResponse } from 'axios';
import { Product } from '../context/GlobalState';

// Defining the base URL for the API
const API_BASE_URL = 'https://my-json-server.typicode.com/benirvingplt/products';

// Defining a function to fetch products from the API
export const fetchProducts = async () => {
  try {
    // Send a GET request to the products endpoint
    const response: AxiosResponse<Product[]> = await axios.get(`${API_BASE_URL}/products`);

    // Return the data from the response, which contains the products
    return response.data;
  } catch (error) {
    // Error handling
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error:', error.message);
    } else {
      // Handle general errors
      console.error('Error fetching products:', error);
    }

    throw error;
  }
};

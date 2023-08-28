import axios from 'axios';

const API_BASE_URL =
	'https://my-json-server.typicode.com/benirvingplt/products';

export const fetchProducts = async () => {
	const response = await axios.get(`${API_BASE_URL}/products`);
	return response.data;
};

import {fetchProducts} from '../src/services/api';

describe('API tests', () => {
	test('fetchProducts fetches data correctly', async () => {
		const products = await fetchProducts();
		expect(products.length).toBeGreaterThan(0);
	});
});

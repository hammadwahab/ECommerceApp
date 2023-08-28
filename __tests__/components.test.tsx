// __tests__/components.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import ProductListItem from '../src/components/ProductListItem';

test('ProductListItem renders correctly', () => {
  const product = {
    id: 1,
    name: 'Sample Product',
    price: 10,
  };

  const { getByText } = render(<ProductListItem product={product} onAddToCart={() => { }} />);

  expect(getByText('Sample Product')).toBeTruthy();
  expect(getByText('$10')).toBeTruthy();
});

// __tests__/context.test.tsx
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { GlobalProvider, useGlobalState } from '../src/context/GlobalState';

test('useGlobalState hook returns initial context', () => {
    const { result } = renderHook(() => useGlobalState(), {
        wrapper: GlobalProvider,
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.cart).toEqual([]);
});

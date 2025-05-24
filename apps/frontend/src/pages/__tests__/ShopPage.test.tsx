/// <reference types="vitest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import ShopPage from '../ShopPage';
import { CartContext } from '../../context/CartContext';
import { vi } from 'vitest';

const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 100,
    description: 'Desc 1',
    category: 'Cat 1',
    image: 'img1.jpg',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 200,
    description: 'Desc 2',
    category: 'Cat 2',
    image: 'img2.jpg',
    rating: { rate: 4.0, count: 5 },
  },
];

const mockContext = {
  cartItemsCount: 0,
  cartItems: [],
  addItem: vi.fn(),
  removeItem: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
};

describe('ShopPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading initially', () => {
    render(
      <CartContext.Provider value={mockContext}>
        <ShopPage />
      </CartContext.Provider>
    );

    expect(screen.getByText(/loading products.../i)).toBeInTheDocument();
  });

  it('renders products fetched from API', async () => {
    render(
      <CartContext.Provider value={mockContext}>
        <ShopPage />
      </CartContext.Provider>
    );

    // Uncomment below line for debugging what is in the DOM if test fails
    // screen.debug();

    expect(await screen.findByText('Test Product 1')).toBeInTheDocument();
    expect(await screen.findByText('Test Product 2')).toBeInTheDocument();
  });

  it('renders error message when fetch fails', async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    render(
      <CartContext.Provider value={mockContext}>
        <ShopPage />
      </CartContext.Provider>
    );

    // Uncomment below line for debugging if test fails
    // screen.debug();

    expect(await screen.findByText(/failed to fetch products/i)).toBeInTheDocument();
  });
});

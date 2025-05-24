import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { CartContext, CartContextType } from '../../context/CartContext';
import { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'A test product',
  category: 'electronics',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 100,
  },
};

const renderWithCart = (addItemMock = vi.fn()) => {
  const mockContext: CartContextType = {
    cartItemsCount: 0,
    cartItems: [],
    addItem: addItemMock,
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
  };

  render(
    <CartContext.Provider value={mockContext}>
      <ProductCard product={mockProduct} />
    </CartContext.Provider>
  );

  return { addItemMock };
};

describe('ProductCard', () => {
  it('renders product title and price', () => {
    renderWithCart();

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$99.99/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image);
  });

  it('increments and decrements quantity', () => {
    renderWithCart();

    const input = screen.getByLabelText(/quantity/i) as HTMLInputElement;
    const increment = screen.getByRole('button', { name: /increase quantity/i });
    const decrement = screen.getByRole('button', { name: /decrease quantity/i });

    fireEvent.click(increment);
    expect(input.value).toBe('2');

    fireEvent.click(decrement);
    expect(input.value).toBe('1');

    fireEvent.click(decrement); // Should not go below 1
    expect(input.value).toBe('1');
  });

  it('prevents quantity input below 1', () => {
    renderWithCart();

    const input = screen.getByLabelText(/quantity/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0' } });

    expect(input.value).toBe('1'); // Should correct to min 1
  });

  it('calls addItem with correct quantity', () => {
    const { addItemMock } = renderWithCart();

    const input = screen.getByLabelText(/quantity/i) as HTMLInputElement;
    const increment = screen.getByRole('button', { name: /increase quantity/i });
    const addToCart = screen.getByRole('button', { name: /add to cart/i });

    fireEvent.click(increment); // now quantity is 2
    fireEvent.click(addToCart);

    expect(addItemMock).toHaveBeenCalledWith(mockProduct, 2);
  });

  it('resets quantity after adding to cart', () => {
    renderWithCart();

    const input = screen.getByLabelText(/quantity/i) as HTMLInputElement;
    const increment = screen.getByRole('button', { name: /increase quantity/i });
    const addToCart = screen.getByRole('button', { name: /add to cart/i });

    fireEvent.click(increment); // quantity = 2
    fireEvent.click(addToCart);

    expect(input.value).toBe('1');
  });
});

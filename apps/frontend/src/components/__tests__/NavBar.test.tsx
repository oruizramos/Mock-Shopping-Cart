import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../NavBar';
import { CartContext } from '../../context/CartContext';
import type { CartContextType } from '../../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

const mockCartContext: CartContextType = {
  cartItemsCount: 1,
  cartItems: [
    {
      product: {
        id: 1,
        title: 'Test Product',
        price: 100,
        description: 'Test Description',
        category: 'Test Category',
        image: 'test.jpg',
        rating: {
          rate: 4.5,
          count: 10,
        },
      },
      quantity: 1,
    },
  ],
  addItem: vi.fn(),
  removeItem: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
};

const renderWithProviders = () =>
  render(
    <CartContext.Provider value={mockCartContext}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </CartContext.Provider>
  );

describe('NavBar', () => {
  it('renders the title', () => {
    renderWithProviders();
    expect(screen.getByText('ShoppingApp')).toBeInTheDocument();
  });

  it('shows cart item count', () => {
    renderWithProviders();
    expect(screen.getAllByText(/Cart \(1\)/i).length).toBeGreaterThan(0);
  });

  it('toggles mobile menu', () => {
    renderWithProviders();

    const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(toggleButton);

    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('Shop')).toBeVisible();
    expect(screen.getAllByText(/Cart \(1\)/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Checkout')).toBeVisible();
  });
});

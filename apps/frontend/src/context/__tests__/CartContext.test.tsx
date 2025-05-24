/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCart, CartProvider } from '../CartContext';
import type { Product } from '../../types';


const mockProduct: Product = {
  id: 1,
  title: 'Test Product Title',
  description: 'Test item',
  price: 10,
  category: 'Test Category',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 10,
  },
};

const TestComponent: React.FC = () => {
  const { cartItems, cartItemsCount, addItem, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <p data-testid="cart-length">Items count: {cartItemsCount}</p>
      <p data-testid="cart-length-array">Items array length: {cartItems.length}</p>
      <button onClick={() => addItem(mockProduct, 1)}>Add Item</button>
      <button onClick={() => removeItem(mockProduct.id)}>Remove Item</button>
      <button onClick={() => updateQuantity(mockProduct.id, 5)}>Update Quantity to 5</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  it('should add an item to the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 0');
    expect(screen.getByTestId('cart-length-array')).toHaveTextContent('Items array length: 0');

    const addButton = screen.getByRole('button', { name: /add item/i });
    await user.click(addButton);

    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 1');
    expect(screen.getByTestId('cart-length-array')).toHaveTextContent('Items array length: 1');
  });

  it('should remove an item from the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByRole('button', { name: /add item/i });
    const removeButton = screen.getByRole('button', { name: /remove item/i });

    await user.click(addButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 1');

    await user.click(removeButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 0');
  });

  it('should update item quantity', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByRole('button', { name: /add item/i });
    const updateButton = screen.getByRole('button', { name: /update quantity to 5/i });

    await user.click(addButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 1');

    await user.click(updateButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 5');
  });

  it('should clear the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByRole('button', { name: /add item/i });
    const clearButton = screen.getByRole('button', { name: /clear cart/i });

    await user.click(addButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 1');

    await user.click(clearButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('Items count: 0');
    expect(screen.getByTestId('cart-length-array')).toHaveTextContent('Items array length: 0');
  });
});

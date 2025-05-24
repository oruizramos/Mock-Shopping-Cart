import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cartItemsCount: number;
  cartItems: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += action.quantity;
        return { items: newItems };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      const newItems = state.items.map((item) =>
        item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
      );
      return { items: newItems };
    }
    case 'CLEAR_CART': {
      return { items: [] };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItemsCount,
        cartItems: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook to access the cart context safely
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// ✅ Exports the context directly (for testing)
export { CartContext };

export type { CartContextType };

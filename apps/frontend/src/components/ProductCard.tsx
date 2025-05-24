import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Number(e.target.value));
    setQuantity(val);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1); // resets after adding
  };

  return (
    <div className="border rounded p-4 flex flex-col items-center shadow hover:shadow-md transition">
      <img src={product.image} alt={product.title} className="h-48 object-contain mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-center">{product.title}</h3>
      <p className="text-blue-600 font-bold mb-4">${product.price.toFixed(2)}</p>

      <div className="flex items-center mb-4 space-x-2">
        <button
          onClick={decrement}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={onChange}
          className="w-12 text-center border rounded"
          aria-label="Quantity"
        />
        <button
          onClick={increment}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const { cartItemsCount } = useCart();  
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          ShoppingApp
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/shop" className="text-gray-700 hover:text-blue-600 transition">
            Shop
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition">
            Cart ({cartItemsCount})  {/* <-- changed here */}
          </Link>
          <Link to="/checkout" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
            Checkout
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-2 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/shop" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
            Shop
          </Link>
          <Link to="/cart" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
            Cart ({cartItemsCount})  {/* <-- changed here */}
          </Link>
          <Link to="/checkout" className="block bg-blue-600 text-white text-center py-1 rounded hover:bg-blue-700" onClick={toggleMenu}>
            Checkout
          </Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;

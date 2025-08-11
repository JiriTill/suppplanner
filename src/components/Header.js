import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component for navigation.
 * Implements a responsive design with a hamburger menu for mobile devices.
 * The menu is hidden on small screens and appears when the menu button is clicked.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and App Title */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            {/* Using a placeholder image URL to prevent "Module not found" build errors */}
            <img src="https://placehold.co/40x40/94a3b8/e2e8f0?text=SP" alt="Supplement Planner Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-gray-800">SuppPlan.ai</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors duration-200">Home</Link>
          <Link to="/planner" className="text-gray-600 hover:text-primary transition-colors duration-200">Planner</Link>
          <Link to="/check-planner" className="text-gray-600 hover:text-primary transition-colors duration-200">Check My Plan</Link>
          <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors duration-200">Blog</Link>
          <Link to="/library" className="text-gray-600 hover:text-primary transition-colors duration-200">Library</Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors duration-200">Contact</Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none focus:text-primary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg border-t border-gray-200 py-2">
          <div className="flex flex-col items-start px-4 space-y-2">
            <Link to="/" className="block w-full py-2 text-gray-600 hover:bg-gray-100 px-4 rounded-md" onClick={toggleMenu}>Home</Link>
            <Link to="/planner" className="block w-full py-2 text-gray-600 hover:bg-gray-100 px-4 rounded-md" onClick={toggleMenu}>Planner</Link>
            <Link to="/check-planner" className="block w-full py-2 text-gray-600 hover:bg-gray-100 px-4 rounded-md" onClick={toggleMenu}>Check My Plan</Link>
            <Link to="/blog" className="block w-full py-2 text-gray-600 hover:bg-gray-100 px-4 rounded-md" onClick={toggleMenu}>Blog</Link>
            <Link to="/library" className="block w-full py-2 text-gray-600 hover:bg-gray-100 px-4 rounded-md" onClick={toggleMenu}>Library</Link>
            <Link to="/contact" className="block w-full py-2 text-gray-600 hover:bg-gray-100 px-4 rounded-md" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

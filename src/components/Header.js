// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
// Reference directly from public folder
// Ensure logo512.png is in your public/ folder
// You can resize it to a smaller version (e.g., logo64.png) for better performance if desired
// and then update the src="/logo64.png" below.
// For now, let's assume logo512.png is uploaded and accessible.

function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo512.png" alt="SuppPlan.AI Logo" className="h-8 w-8 rounded-full" />
          <span className="text-2xl font-bold text-primary">
            SuppPlan.AI
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-primary transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/planner" className="text-gray-700 hover:text-primary transition duration-200">
                Get Plan
              </Link>
            </li>
            <li> {/* New Link */}
              <Link to="/blog" className="text-gray-700 hover:text-primary transition duration-200">
                Blog
              </Link>
            </li>
            <li> {/* New Link */}
              <Link to="/library" className="text-gray-700 hover:text-primary transition duration-200">
                Library
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

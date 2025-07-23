// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SuppPlan.AI
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/planner" className="text-gray-700 hover:text-blue-600 transition duration-200">
                Get Plan
              </Link>
            </li>
            {/* Future links: About, Blog, Contact, etc. */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

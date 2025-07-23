// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
// REMOVE THIS LINE: import logo from '../public/logo512.png';

function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* REFERENCE DIRECTLY FROM PUBLIC FOLDER */}
          <img src="/logo512.png" alt="SuppPlan Logo" className="h-8 w-8 rounded-full" /> {/* Adjust h/w as needed */}
          <span className="text-2xl font-bold text-primary"> {/* Using custom primary color */}
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
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

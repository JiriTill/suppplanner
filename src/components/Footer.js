// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-primary-dark text-white p-8 mt-12 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Copyright and Brand */}
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} SuppPlan.AI</p>
          <p className="text-sm text-gray-300">Your personalized health journey, powered by AI.</p>
        </div>

        {/* Footer Navigation */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
            <li>
              <Link to="/terms" className="text-gray-300 hover:text-accent transition duration-200 text-sm">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/data-usage" className="text-gray-300 hover:text-accent transition duration-200 text-sm">
                Data Usage
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-accent transition duration-200 text-sm">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-300 hover:text-accent transition duration-200 text-sm">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/library" className="text-gray-300 hover:text-accent transition duration-200 text-sm">
                Library
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Media/Placeholder (Optional, can be added later) */}
        {/* <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-accent transition duration-200">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-accent transition duration-200">
            <i className="fab fa-twitter"></i>
          </a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;

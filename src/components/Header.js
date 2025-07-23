import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SuppPlan</Link>
        <div>
          <Link to="/planner" className="mx-2 hover:underline">Planner</Link>
          <Link to="/library" className="mx-2 hover:underline">Library</Link>
          <Link to="/blog" className="mx-2 hover:underline">Blog</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

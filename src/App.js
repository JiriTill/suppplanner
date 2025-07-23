// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import BlogPage from './pages/BlogPage'; // New Import
import LibraryPage from './pages/LibraryPage'; // New Import
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/index.css'; // Correct path to index.css

// Import the Firebase context if you're using it globally
import { FirebaseProvider } from './contexts/FirebaseContext';

function App() {
  return (
    <Router>
      <FirebaseProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/blog" element={<BlogPage />} /> {/* New Route */}
              <Route path="/library" element={<LibraryPage />} /> {/* New Route */}
              {/* Add more routes here as your app grows */}
            </Routes>
          </main>
          <Footer />
        </div>
      </FirebaseProvider>
    </Router>
  );
}

export default App;


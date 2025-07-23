// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'; // For Tailwind CSS imports if not already there

// Import the Firebase context if you're using it globally
import { FirebaseProvider } from './contexts/FirebaseContext'; // We will create this next!

function App() {
  return (
    // Wrap your application with Router for navigation
    // Wrap with FirebaseProvider for global Firebase access
    <Router>
      <FirebaseProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planner" element={<PlannerPage />} />
              {/* Add more routes here as your app grows, e.g., /about, /blog */}
            </Routes>
          </main>
          <Footer />
        </div>
      </FirebaseProvider>
    </Router>
  );
}

export default App;

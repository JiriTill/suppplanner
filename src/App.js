// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import BlogPage from './pages/BlogPage';
import LibraryPage from './pages/LibraryPage';
import TermsPage from './pages/TermsPage'; // New Import
import DataUsagePage from './pages/DataUsagePage'; // New Import
import ContactPage from './pages/ContactPage'; // New Import
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
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/terms" element={<TermsPage />} /> {/* New Route */}
              <Route path="/data-usage" element={<DataUsagePage />} /> {/* New Route */}
              <Route path="/contact" element={<ContactPage />} /> {/* New Route */}
            </Routes>
          </main>
          <Footer />
        </div>
      </FirebaseProvider>
    </Router>
  );
}

export default App;

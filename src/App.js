import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import BlogPage from './pages/BlogPage';
import LibraryPage from './pages/LibraryPage';
import TermsPage from './pages/TermsPage';
import DataUsagePage from './pages/DataUsagePage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';

// Import the Firebase context if you're using it globally
import { FirebaseProvider } from './contexts/FirebaseContext';

function App() {
  return (
    <Router>
      <FirebaseProvider>
        {/* The main layout container with the mobile scrolling fix */}
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          {/*
            The flex-grow class here ensures the main content area expands to
            fill the available space, pushing the footer to the bottom.
            The container mx-auto p-4 classes center the content and add padding.
          */}
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/data-usage" element={<DataUsagePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FirebaseProvider>
    </Router>
  );
}

export default App;

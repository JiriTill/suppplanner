import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import BlogPage from './pages/BlogPage';
import LibraryPage from './pages/LibraryPage';
import SupplementDetailPage from './pages/SupplementDetailPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/library/:slug" element={<SupplementDetailPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              {/* Add more routes as you build out pages */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

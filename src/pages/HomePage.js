// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Personalized Supplement Plans, Powered by AI
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Unlock your potential with plans tailored to your unique goals and health data.
      </p>
      <Link
        to="/planner"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
      >
        Get Your Plan Now!
      </Link>
      <div className="mt-12 text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">How it works:</h2>
        <ul className="list-disc list-inside space-y-2 max-w-md mx-auto">
          <li>Tell us your fitness or health goals.</li>
          <li>Optionally, upload a health report for deeper insights.</li>
          <li>Receive a personalized supplement and dietary recommendation.</li>
          <li>Always consult a professional for medical advice.</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;

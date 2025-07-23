import React from 'react';

function HomePage() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Your Personalized Supplement Guide</h1>
      <p className="text-xl text-gray-700 mb-8">
        Organize your daily supplements, avoid harmful combinations, and get recommendations based on your unique needs.
      </p>
      <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600">
        Start Your Plan for Free
      </button>
    </div>
  );
}

export default HomePage;

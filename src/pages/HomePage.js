// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center bg-gray-50">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary to-primary-light text-white shadow-lg rounded-b-3xl mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Unlock Your Health Potential <br /> with Personalized Supplements
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Get an AI-powered supplement and dietary plan tailored to your unique goals,
            current health, and medical needs.
          </p>
          {/* Main Call to Action - Option 1: New User */}
          <Link
            to="/planner?scenario=new" // Link to planner with 'new' scenario
            className="inline-block bg-accent hover:bg-accent-dark text-primary-dark font-extrabold py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 shadow-xl"
          >
            I'm New: Generate My Custom Plan!
          </Link>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-primary mb-10">Why SuppPlan.AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-primary text-5xl mb-4">💡</div> {/* Icon placeholder */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Personalized for You</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes your specific goals, current regimen, and health data to create a plan that fits *you*.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-primary text-5xl mb-4">🛡️</div> {/* Icon placeholder */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Safety First</h3>
            <p className="text-gray-600">
              Recommendations consider your medical conditions and medications to avoid harmful interactions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-primary text-5xl mb-4">📈</div> {/* Icon placeholder */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Optimize Your Results</h3>
            <p className="text-gray-600">
              Beyond supplements, get tailored dietary advice and lifestyle tips to maximize your health journey.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-primary-dark text-white py-16 rounded-t-3xl mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-accent text-primary-dark rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">1</div>
              <h3 className="text-xl font-semibold mb-2">Tell Us Your Goals</h3>
              <p className="text-gray-200 text-center">Share your health and fitness aspirations.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-accent text-primary-dark rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">2</div>
              <h3 className="text-xl font-semibold mb-2">AI Analyzes Your Needs</h3>
              <p className="text-gray-200 text-center">Our intelligent system processes your unique data.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-accent text-primary-dark rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">3</div>
              <h3 className="text-xl font-semibold mb-2">Receive Your Custom Plan</h3>
              <p className="text-gray-200 text-center">Get a personalized supplement and dietary guide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action at the bottom - Option 2: Existing User */}
      <section className="py-16 px-4 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Already Taking Supplements?</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          If you're already on a regimen, we can help you optimize your schedule and ensure safe, effective combinations.
        </p>
        <Link
          to="/planner?scenario=existing" // Link to planner with 'existing' scenario
          className="inline-block bg-primary hover:bg-primary-dark text-white font-extrabold py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 shadow-xl"
        >
          Optimize My Current Regimen
        </Link>
      </section>
    </div>
  );
}

export default HomePage;

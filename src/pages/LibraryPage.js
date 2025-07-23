// src/pages/LibraryPage.js
import React from 'react';

function LibraryPage() {
  // Mock library resources data
  const resources = [
    {
      id: 1,
      title: "Essential Vitamins & Minerals Guide",
      description: "A comprehensive guide to key micronutrients and their roles.",
      category: "Guides",
      link: "#" // Placeholder link
    },
    {
      id: 2,
      title: "Research on AI in Personalized Nutrition",
      description: "Explore academic papers and studies on AI's impact on dietary planning.",
      category: "Research",
      link: "#"
    },
    {
      id: 3,
      title: "Supplement Safety Best Practices",
      description: "Tips and guidelines for safe and effective supplement usage.",
      category: "Safety",
      link: "#"
    },
    {
      id: 4,
      title: "Glossary of Supplement Terms",
      description: "Understand common terms used in the supplement industry.",
      category: "Guides",
      link: "#"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Our Library & Resources</h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl mx-auto">
        Access curated articles, guides, and research to deepen your health knowledge.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{resource.title}</h2>
            <p className="text-sm text-primary mb-3">{resource.category}</p>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <a href={resource.link} className="text-accent hover:text-accent-dark font-medium" target="_blank" rel="noopener noreferrer">
              View Resource &rarr;
            </a>
          </div>
        ))}
      </div>

      {/* Placeholder for more resources or categories */}
      <div className="text-center mt-12">
        <p className="text-gray-500">More resources will be added regularly!</p>
      </div>
    </div>
  );
}

export default LibraryPage;

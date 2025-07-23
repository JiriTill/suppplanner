// src/pages/BlogPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // <--- ADDED THIS LINE

function BlogPage() {
  // Mock blog post data
  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Personalized Supplementation",
      date: "July 23, 2025",
      snippet: "Dive deep into how AI can revolutionize your supplement intake...",
      link: "/blog/post-1" // Placeholder for individual post link
    },
    {
      id: 2,
      title: "Top 5 Supplements for Energy & Focus",
      date: "July 15, 2025",
      snippet: "Discover essential supplements to boost your daily performance...",
      link: "/blog/post-2"
    },
    {
      id: 3,
      title: "Understanding Your Health Report: A Beginner's Guide",
      date: "July 10, 2025",
      snippet: "Learn how to interpret common health markers and what they mean for you...",
      link: "/blog/post-3"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Our Blog</h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl mx-auto">
        Stay updated with the latest in health, nutrition, and personalized wellness.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{post.date}</p>
            <p className="text-gray-600 mb-4">{post.snippet}</p>
            <Link to={post.link} className="text-accent hover:text-accent-dark font-medium">
              Read More &rarr;
            </Link>
          </div>
        ))}
      </div>

      {/* Placeholder for pagination or more posts */}
      <div className="text-center mt-12">
        <p className="text-gray-500">More posts coming soon!</p>
      </div>
    </div>
  );
}

export default BlogPage;

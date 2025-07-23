// src/pages/ContactPage.js
import React, { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'success', 'error', 'sending'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // In a real application, you would send this data to a backend endpoint
    // (e.g., a Vercel Serverless Function that sends emails via SendGrid, Nodemailer, etc.)
    // For this placeholder, we'll just simulate a success/failure.

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate success or error based on some condition (e.g., email format)
      if (formData.email.includes('@') && formData.message.length > 10) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
      console.error("Contact form submission error:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
        Have questions, feedback, or need support? We'd love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        {status === 'sending' && <p className="text-accent text-center">Sending your message...</p>}
        {status === 'success' && <p className="text-primary text-center">Message sent successfully! We'll get back to you soon.</p>}
        {status === 'error' && <p className="text-red-500 text-center">Failed to send message. Please try again later.</p>}

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg text-lg w-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          disabled={status === 'sending'}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactPage;

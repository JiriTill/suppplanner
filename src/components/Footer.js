// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} SuppPlan.AI. All rights reserved. <br/>
        Disclaimer: Always consult a healthcare professional before starting any new supplement regimen.
      </div>
    </footer>
  );
}

export default Footer;

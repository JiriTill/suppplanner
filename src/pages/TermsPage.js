// src/pages/TermsPage.js
import React from 'react';

function TermsPage() {
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">Terms of Service</h1>
      <div className="prose max-w-none text-gray-700">
        <p>Welcome to SuppPlan.AI! These Terms of Service ("Terms") govern your access to and use of the SuppPlan.AI website and services (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">1. Acceptance of Terms</h2>
        <p>By using our Service, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Service.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">2. Nature of Service</h2>
        <p>SuppPlan.AI provides AI-generated supplement and dietary plans for informational purposes only. The Service is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">3. User Responsibilities</h2>
        <ul>
          <li>You are responsible for providing accurate and complete information about your health goals, current supplements, and medical conditions.</li>
          <li>You understand that AI-generated plans are not medical prescriptions and should be reviewed by a healthcare professional.</li>
          <li>You agree not to use the Service for any unlawful or prohibited purpose.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">4. Disclaimer of Warranties</h2>
        <p>The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">5. Limitation of Liability</h2>
        <p>In no event shall SuppPlan.AI, its affiliates, or their respective directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">6. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">7. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at [Your Contact Email/Form Link].</p>
      </div>
    </div>
  );
}

export default TermsPage;

// src/pages/DataUsagePage.js
import React from 'react';

function DataUsagePage() {
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">Data Usage Policy</h1>
      <div className="prose max-w-none text-gray-700">
        <p>At SuppPlan.AI, we are committed to protecting your privacy and being transparent about how we use your data. This policy explains what data we collect, why we collect it, and how it is used.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">1. Data We Collect</h2>
        <p>We collect the following types of data to provide and improve our Service:</p>
        <ul>
          <li><strong>User Input:</strong> Information you provide in the planner form, including your health/fitness goals, current supplements, medical conditions/medications, and any uploaded health report data.</li>
          <li><strong>Generated Plans:</strong> The AI-generated supplement and dietary plans.</li>
          <li><strong>Anonymous Usage Data:</strong> We use Firebase Anonymous Authentication to assign a unique, non-identifiable ID to each user. This allows us to save your generated plans without requiring personal registration. We may also collect anonymized usage statistics (e.g., number of plans generated) to understand how the Service is used.</li>
          <li><strong>Technical Data:</strong> Standard server logs, which may include your IP address, browser type, and access times, for security and operational purposes.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">2. How We Use Your Data</h2>
        <p>Your data is used primarily for the following purposes:</p>
        <ul>
          <li><strong>To Generate Personalized Plans:</strong> Your input is sent to the OpenAI API to generate your custom supplement and dietary plan.</li>
          <li><strong>To Save Your Plans:</strong> Your generated plans and the input that created them are saved to our Firestore database, linked to your anonymous user ID, so you can access them later (if we implement a history feature).</li>
          <li><strong>Service Improvement:</strong> Anonymized and aggregated data may be used to analyze usage patterns and improve the accuracy and relevance of our AI models and the overall Service.</li>
          <li><strong>Safety:</strong> Medical information provided is used solely to inform the AI's recommendations and ensure safety, not for diagnosis or treatment.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">3. Data Sharing and Disclosure</h2>
        <p>We do not sell, rent, or trade your personal data. We may share your data with third-party service providers only to the extent necessary to operate and improve the Service:</p>
        <ul>
          <li><strong>OpenAI:</strong> Your user input (goals, supplements, medical issues, parsed report) is sent to OpenAI's API to generate the supplement plan. OpenAI's data usage policies apply to data processed by their models.</li>
          <li><strong>Firebase:</strong> We use Firebase for authentication and database services. Your data is stored securely in Firebase Firestore.</li>
          <li><strong>Vercel:</strong> Our application is hosted on Vercel, which processes requests to our serverless functions.</li>
        </ul>
        <p>We may also disclose your data if required by law or in response to valid requests by public authorities (e.g., a court order).</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">4. Data Security</h2>
        <p>We implement reasonable security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">5. Your Data Rights</h2>
        <p>As an anonymous user, your data is linked to a unique, non-identifiable ID. If you wish to request deletion of your data, please contact us using the contact information provided in our Terms of Service, specifying your anonymous user ID (which you can find in your browser's developer console if you're still logged in anonymously).</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">6. Changes to This Policy</h2>
        <p>We may update our Data Usage Policy from time to time. We will notify you of any changes by posting the new policy on this page. You are advised to review this policy periodically for any changes.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">7. Contact Us</h2>
        <p>If you have any questions about this Data Usage Policy, please contact us at [Your Contact Email/Form Link].</p>
      </div>
    </div>
  );
}

export default DataUsagePage;

// src/pages/PlannerPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { generateSupplementPlan } from '../services/api';
import { useFirebase } from '../contexts/FirebaseContext';

function PlannerPage() {
  const { saveGeneratedPlan } = useFirebase();
  const location = useLocation(); // Get location object to access query parameters
  const queryParams = new URLSearchParams(location.search);
  const scenario = queryParams.get('scenario'); // Get the 'scenario' parameter ('new' or 'existing')

  // State for user inputs
  const [userGoals, setUserGoals] = useState('');
  const [currentSupplements, setCurrentSupplements] = useState('');
  const [medicalIssues, setMedicalIssues] = useState('');
  const [healthReportFile, setHealthReportFile] = useState(null);
  const [parsedReportData, setParsedReportData] = useState(null);

  // State for AI response and UI feedback
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Adjust placeholder text based on scenario
  const currentSupplementsPlaceholder = scenario === 'existing'
    ? "List all supplements you currently take, including dosages and brands if known. E.g., 'Creatine Monohydrate 5g daily, Optimum Nutrition Gold Standard Whey Protein 1 scoop post-workout, Vitamin D3 2000 IU daily.'"
    : "List any supplements you currently take (optional). E.g., 'Multivitamin, Fish Oil.'";

  // Handle file selection and parsing
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setHealthReportFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          try {
            setParsedReportData(JSON.parse(content));
          } catch (jsonParseError) {
            setParsedReportData(content);
          }
        } catch (readError) {
          setError('Error reading file: ' + readError.message);
          setParsedReportData(null);
        }
      };
      reader.onerror = () => {
        setError('Failed to read file.');
        setParsedReportData(null);
      };
      reader.readAsText(file);
    } else {
      setHealthReportFile(null);
      setParsedReportData(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    const userInput = {
      userGoals,
      currentSupplements,
      medicalIssues,
      parsedReport: parsedReportData,
      scenario: scenario, // Pass the scenario to the API
    };

    try {
      const plan = await generateSupplementPlan(userInput);
      setGeneratedPlan(plan);
      await saveGeneratedPlan(userInput, plan);
      console.log('Plan generated and saved successfully!');
    } catch (err) {
      console.error('Failed to generate supplement plan:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Generate Your Personalized Supplement Plan
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="userGoals" className="block text-gray-700 text-sm font-bold mb-2">
            Your Health/Fitness Goals:
          </label>
          <textarea
            id="userGoals"
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., Build muscle, lose weight, increase energy, improve sleep, better recovery..."
            value={userGoals}
            onChange={(e) => setUserGoals(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="currentSupplements" className="block text-gray-700 text-sm font-bold mb-2">
            Current Supplements You're Taking (if any):
          </label>
          <textarea
            id="currentSupplements"
            rows="2"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={currentSupplementsPlaceholder} // Dynamic placeholder
            value={currentSupplements}
            onChange={(e) => setCurrentSupplements(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="medicalIssues" className="block text-gray-700 text-sm font-bold mb-2">
            Any Medical Conditions or Medications (for safety):
          </label>
          <textarea
            id="medicalIssues"
            rows="2"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., High blood pressure, diabetes, taking warfarin. This helps ensure safe recommendations."
            value={medicalIssues}
            onChange={(e) => setMedicalIssues(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="healthReportFile" className="block text-gray-700 text-sm font-bold mb-2">
            Optional: Upload Health Report (JSON or Text File):
          </label>
          <input
            type="file"
            id="healthReportFile"
            accept=".json,.txt,.csv"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleFileChange}
          />
          {healthReportFile && (
            <p className="text-gray-600 text-xs mt-1">File selected: {healthReportFile.name}</p>
          )}
          {parsedReportData && (
             <p className="text-green-600 text-xs mt-1">File parsed successfully. Data type: {typeof parsedReportData === 'object' ? 'JSON Object' : 'Text'}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg text-lg w-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Generating Plan...' : 'Generate My Plan'}
        </button>
      </form>

      {generatedPlan && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{generatedPlan.planTitle || 'Your Personalized Supplement Plan'}</h2>
          <p className="text-gray-700 mb-4">{generatedPlan.introduction}</p>

          <h3 className="text-xl font-semibold text-gray-700 mb-3">Recommended Supplements:</h3>
          {generatedPlan.recommendedSupplements && generatedPlan.recommendedSupplements.length > 0 ? (
            <div className="space-y-4 mb-6">
              {generatedPlan.recommendedSupplements.map((s, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2 rounded-md">
                  <h4 className="text-lg font-medium text-gray-800">{s.name}</h4>
                  <p className="text-gray-600"><strong>Dosage:</strong> {s.dosage}</p>
                  <p className="text-gray-600"><strong>Timing:</strong> {s.timing}</p>
                  <p className="text-gray-600"><strong>Benefit:</strong> {s.benefit}</p>
                  {s.warnings && <p className="text-red-600 text-sm"><strong>Warning:</strong> {s.warnings}</p>}
                  {s.affiliateLinkText && <p className="text-primary text-sm mt-1">{s.affiliateLinkText}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No specific supplement recommendations at this time based on your input.</p>
          )}

          {generatedPlan.dietaryAdvice && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Dietary Advice:</h3>
              <p className="text-gray-700">{generatedPlan.dietaryAdvice}</p>
            </div>
          )}

          {generatedPlan.lifestyleTips && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Lifestyle Tips:</h3>
              <p className="text-gray-700">{generatedPlan.lifestyleTips}</p>
            </div>
          )}

          {generatedPlan.importantDisclaimer && (
            <div className="mt-6 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 text-sm rounded-md">
              <p><strong>Important Disclaimer:</strong> {generatedPlan.importantDisclaimer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlannerPage;

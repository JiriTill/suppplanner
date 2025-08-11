import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateSupplementPlan } from '../services/api';
import { useFirebase } from '../contexts/FirebaseContext';

// Define the checkbox options for goals and medical conditions
const goalOptions = [
  'Better sleep', 'Focus', 'Energy', 'Mood', 'Stress', 'Muscle gain',
  'Fat loss', 'Immunity', 'Gut health', 'Hair/skin/nails', 'Joint health',
  'Heart health', 'General wellness'
];

const dietPatternOptions = [
  'Omnivore', 'Vegetarian', 'Vegan', 'Keto/Low-carb', 'Paleo', 'Low-FODMAP'
];

const medicalConditionOptions = [
  'Thyroid issues', 'Diabetes', 'Kidney issues', 'Liver issues', 'GI issues', 'Hypertension'
];

const medicationFlags = [
  'Anticoagulants', 'SSRIs/SNRIs', 'MAOIs', 'Stimulants', 'Thyroid meds', 'Immunosuppressants'
];

function PlannerPage() {
  const { saveGeneratedPlan } = useFirebase();

  // State for form inputs
  const [formData, setFormData] = useState({
    // Main Goal (mandatory)
    goals: [],
    otherGoal: '',
    // Personal Info
    age: '',
    sex: '',
    weight: '',
    height: '',
    isPregnant: '',
    // Health Details
    medicalConditions: [],
    otherMedicalCondition: '',
    prescriptionMeds: '',
    medicationFlags: [],
    otherMedicationFlag: '',
    allergies: '',
    // Lifestyle
    dietPattern: '',
    otherDietPattern: '',
    dietAvoidances: '',
    ethicalReligious: [],
    coffeePerDay: '',
    lastCaffeineTime: '',
    alcoholDaysPerWeek: '',
    nicotineUse: '',
    // Consent
    hasConsented: false,
  });

  // State for AI response and UI feedback
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // File upload state
  const [healthReportFile, setHealthReportFile] = useState(null);
  const [parsedReportData, setParsedReportData] = useState(null);

  // Handle form changes for various input types
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const listName = name; // e.g., 'goals'
      const optionValue = value; // e.g., 'Better sleep'
      setFormData(prev => ({
        ...prev,
        [listName]: checked
          ? [...prev[listName], optionValue]
          : prev[listName].filter(item => item !== optionValue)
      }));
    } else if (name === 'otherMedicationFlag') {
      setFormData(prev => ({
        ...prev,
        medicationFlags: checked
          ? [...prev.medicationFlags, 'Others']
          : prev.medicationFlags.filter(item => item !== 'Others')
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setHealthReportFile(file);
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
      reader.readAsText(file);
    } else {
      setHealthReportFile(null);
      setParsedReportData(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hasConsented || (formData.goals.length === 0 && !formData.otherGoal)) {
      setError('Please select at least one goal and consent to the terms.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    const userInput = {
      ...formData,
      parsedReport: parsedReportData,
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

  // Function to render the button content dynamically
  const renderButtonContent = () => {
    if (isLoading) {
      return (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating Plan...
        </span>
      );
    }
    if (generatedPlan) {
      return 'Your plan is generated!';
    }
    return 'Generate My Plan';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
        Create Your Personalized Plan
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-xl shadow-lg mb-8">
        {/* Section 1: Goals */}
        <section className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">1. What’s your main goal? (pick up to 3) <span className="text-red-500">*</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {goalOptions.map(goal => (
              <label key={goal} className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition duration-200 ${formData.goals.includes(goal) ? 'bg-blue-200 text-blue-800 font-semibold shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}>
                <input
                  type="checkbox"
                  name="goals"
                  value={goal}
                  checked={formData.goals.includes(goal)}
                  onChange={handleInputChange}
                  className="form-checkbox text-blue-600 rounded-sm"
                  disabled={formData.goals.length >= 3 && !formData.goals.includes(goal)}
                />
                <span>{goal}</span>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor="otherGoal" className="block text-sm font-medium text-gray-700 mb-2">Other:</label>
            <input
              type="text"
              id="otherGoal"
              name="otherGoal"
              value={formData.otherGoal}
              onChange={handleInputChange}
              placeholder="e.g., Longevity, specific performance target"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </section>

        {/* Section 2: Personal Info */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">2. Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="1"
                max="120"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Sex:</span>
                <label className="inline-flex items-center">
                  <input type="radio" name="sex" value="female" checked={formData.sex === 'female'} onChange={handleInputChange} className="form-radio text-blue-600" />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="sex" value="male" checked={formData.sex === 'male'} onChange={handleInputChange} className="form-radio text-blue-600" />
                  <span className="ml-2">Male</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight & Height:</label>
              <div className="flex space-x-4 mt-1">
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Weight (e.g., 75 kg)"
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Height (e.g., 180 cm)"
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Pregnant/Breastfeeding?</span>
                <label className="inline-flex items-center">
                  <input type="radio" name="isPregnant" value="no" checked={formData.isPregnant === 'no'} onChange={handleInputChange} className="form-radio text-blue-600" />
                  <span className="ml-2">No</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="isPregnant" value="yes" checked={formData.isPregnant === 'yes'} onChange={handleInputChange} className="form-radio text-blue-600" />
                  <span className="ml-2">Yes</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Health & Medications */}
        <section className="mb-8 p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-800 mb-4">3. Health & Medications</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any medical conditions we should consider?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {medicalConditionOptions.map(condition => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="medicalConditions"
                    value={condition}
                    checked={formData.medicalConditions.includes(condition)}
                    onChange={handleInputChange}
                    className="form-checkbox text-red-600 rounded-sm"
                  />
                  <span>{condition}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="otherMedicalCondition" className="block text-sm font-medium text-gray-700 mb-2">Other:</label>
              <input
                type="text"
                id="otherMedicalCondition"
                name="otherMedicalCondition"
                value={formData.otherMedicalCondition}
                onChange={handleInputChange}
                placeholder="e.g., PCOS, autoimmune disease, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="prescriptionMeds" className="block text-sm font-medium text-gray-700 mb-2">Which prescription meds do you take? (name + dose + time)</label>
            <textarea
              id="prescriptionMeds"
              name="prescriptionMeds"
              rows="2"
              value={formData.prescriptionMeds}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
            ></textarea>
            <div className="mt-2 text-sm text-gray-600">Quick flags:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
              {medicationFlags.map(flag => (
                <label key={flag} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="medicationFlags"
                    value={flag}
                    checked={formData.medicationFlags.includes(flag)}
                    onChange={handleInputChange}
                    className="form-checkbox text-red-600 rounded-sm"
                  />
                  <span>{flag}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="otherMedicationFlag"
                  value="Others"
                  checked={formData.medicationFlags.includes('Others')}
                  onChange={handleInputChange}
                  className="form-checkbox text-red-600 rounded-sm"
                />
                <span>Others</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-2">Any allergies or ingredient sensitivities?</label>
            <textarea
              id="allergies"
              name="allergies"
              rows="2"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="e.g., shellfish, soy, gluten, lactose"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
            ></textarea>
          </div>
        </section>

        {/* Section 4: Lifestyle */}
        <section className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-green-800 mb-4">4. Lifestyle & Diet</h2>
          <div className="mb-4">
            <label htmlFor="dietPattern" className="block text-sm font-medium text-gray-700 mb-2">Diet pattern?</label>
            <div className="flex flex-wrap gap-2">
              {dietPatternOptions.map(pattern => (
                <label key={pattern} className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition duration-200 ${formData.dietPattern === pattern ? 'bg-green-200 text-green-800 font-semibold shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}>
                  <input
                    type="radio"
                    name="dietPattern"
                    value={pattern}
                    checked={formData.dietPattern === pattern}
                    onChange={handleInputChange}
                    className="form-radio text-green-600"
                  />
                  <span>{pattern}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex space-x-4">
              <div className="flex-grow">
                <label htmlFor="otherDietPattern" className="block text-sm font-medium text-gray-700 mb-2">Other:</label>
                <input
                  type="text"
                  id="otherDietPattern"
                  name="otherDietPattern"
                  value={formData.otherDietPattern}
                  onChange={handleInputChange}
                  placeholder="e.g., Mediterranean"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div className="flex-grow">
                <label htmlFor="dietAvoidances" className="block text-sm font-medium text-gray-700 mb-2">Avoidances:</label>
                <input
                  type="text"
                  id="dietAvoidances"
                  name="dietAvoidances"
                  value={formData.dietAvoidances}
                  onChange={handleInputChange}
                  placeholder="e.g., pork, alcohol"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-700 mb-2">Ethical/religious:</span>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="ethicalReligious"
                    value="Halal"
                    checked={formData.ethicalReligious.includes("Halal")}
                    onChange={handleInputChange}
                    className="form-checkbox text-green-600 rounded-sm"
                  />
                  <span>Halal</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="ethicalReligious"
                    value="Kosher"
                    checked={formData.ethicalReligious.includes("Kosher")}
                    onChange={handleInputChange}
                    className="form-checkbox text-green-600 rounded-sm"
                  />
                  <span>Kosher</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div>
              <label htmlFor="coffeePerDay" className="block text-sm font-medium text-gray-700 mb-2">Coffee/tea/energy drinks per day:</label>
              <input
                type="number"
                id="coffeePerDay"
                name="coffeePerDay"
                value={formData.coffeePerDay}
                onChange={handleInputChange}
                min="0"
                placeholder="e.g., 2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="lastCaffeineTime" className="block text-sm font-medium text-gray-700 mb-2">Last caffeine time:</label>
              <input
                type="time"
                id="lastCaffeineTime"
                name="lastCaffeineTime"
                value={formData.lastCaffeineTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="alcoholDaysPerWeek" className="block text-sm font-medium text-gray-700 mb-2">Alcohol days/week:</label>
              <input
                type="number"
                id="alcoholDaysPerWeek"
                name="alcoholDaysPerWeek"
                value={formData.alcoholDaysPerWeek}
                onChange={handleInputChange}
                min="0"
                max="7"
                placeholder="e.g., 2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              />
            </div>
            <div className="flex items-center mt-6">
              <span className="text-sm font-medium text-gray-700">Nicotine use:</span>
              <label className="inline-flex items-center ml-4">
                <input type="radio" name="nicotineUse" value="no" checked={formData.nicotineUse === 'no'} onChange={handleInputChange} className="form-radio text-green-600" />
                <span className="ml-2">No</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input type="radio" name="nicotineUse" value="yes" checked={formData.nicotineUse === 'yes'} onChange={handleInputChange} className="form-radio text-green-600" />
                <span className="ml-2">Yes</span>
              </label>
            </div>
          </div>
        </section>

        {/* Section 5: Optional Report & Consent */}
        <section className="mb-8 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">5. Final Details & Consent</h2>
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
                         file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
              onChange={handleFileChange}
            />
            {healthReportFile && (
              <p className="text-gray-600 text-xs mt-1">File selected: {healthReportFile.name}</p>
            )}
            {parsedReportData && (
              <p className="text-green-600 text-xs mt-1">File parsed successfully. Data type: {typeof parsedReportData === 'object' ? 'JSON Object' : 'Text'}</p>
            )}
          </div>
          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              name="hasConsented"
              checked={formData.hasConsented}
              onChange={(e) => setFormData(prev => ({ ...prev, hasConsented: e.target.checked }))}
              className="mt-1 form-checkbox text-purple-600 rounded-sm"
              required
            />
            <label htmlFor="hasConsented" className="ml-2 text-sm text-gray-700 leading-tight">
              I understand that the recommendations are for informational purposes only and are **not a substitute for medical advice**. I have read and agree to the <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link to="/data-usage" className="text-purple-600 hover:underline">Data Usage Policy</Link>. <span className="text-red-500">*</span>
            </label>
          </div>
        </section>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg text-lg w-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          disabled={isLoading || !formData.hasConsented || (formData.goals.length === 0 && !formData.otherGoal)}
        >
          {renderButtonContent()}
        </button>
      </form>

      {generatedPlan && (
        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
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

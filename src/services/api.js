// src/services/api.js (Frontend API Service)

const API_BASE_URL = '/api'; // Calls your Vercel Serverless Functions

export async function generateSupplementPlan(userInput) {
  try {
    const response = await fetch(`${API_BASE_URL}/planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput), // Send user input to your Vercel API route
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `Failed to generate plan with status: ${response.status}`;
      throw new Error(errorMessage + (errorData.rawResponse ? ` Raw: ${errorData.rawResponse}` : ''));
    }

    const data = await response.json();
    return data; // This will be the structured JSON response from OpenAI
  } catch (error) {
    console.error("Error generating supplement plan:", error);
    throw error;
  }
}

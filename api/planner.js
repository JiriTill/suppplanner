// src/api/planner.js (Vercel Serverless Function - Direct OpenAI Call)

import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // IMPORTANT: Get your OpenAI API Key from Vercel environment variables.
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      console.error("OPENAI_API_KEY environment variable is not set.");
      return res.status(500).json({ message: "Server configuration error: OpenAI API key missing." });
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // Use a cost-effective model like gpt-4o-mini or gpt-3.5-turbo for initial testing
    // Change to "gpt-4o" for higher quality if desired and credit allows.
    const MODEL = "gpt-4o-mini"; // Or "gpt-3.5-turbo" or "gpt-4o"

    // Extract user input from the request body
    const { userGoals, currentSupplements, medicalIssues, parsedReport } = req.body;

    // Construct a detailed prompt for OpenAI
    const promptMessages = [
      {
        role: "system",
        content: `
        You are a highly knowledgeable and ethical AI assistant specializing in personalized supplement and nutrition planning.
        Your goal is to provide a comprehensive, safe, and effective supplement plan based on the user's input.
        Always prioritize safety and advise consulting a healthcare professional for serious conditions.

        Your response should be structured as a JSON object with the following keys:
        {
          "planTitle": "Concise title for the plan",
          "introduction": "A brief, encouraging introduction.",
          "recommendedSupplements": [
            {
              "name": "Supplement Name",
              "dosage": "Recommended dosage and frequency (e.g., '200mg daily')",
              "timing": "Best time to take (e.g., 'With breakfast', 'Before bed')",
              "benefit": "Brief explanation of its benefit related to user's goals/issues",
              "warnings": "Any specific warnings or contraindications for THIS user (e.g., 'Avoid if on blood thinners' or 'Potential interaction with [medication]')",
              "affiliateLinkText": "e.g., 'Find [Supplement Name] on Amazon' (placeholder, to be replaced by frontend)"
            }
            // Add more supplement objects as needed, typically 3-7 supplements are a good range.
          ],
          "dietaryAdvice": "General dietary recommendations to complement the plan (e.g., 'Focus on whole foods...')",
          "lifestyleTips": "Brief lifestyle advice (e.g., 'Ensure adequate sleep...')",
          "importantDisclaimer": "Standard disclaimer about consulting a professional, especially for medical conditions and before starting any new supplement regimen."
        }
        Ensure the JSON is perfectly valid and can be parsed directly. Do not include any text outside the JSON block.
        `
      },
      {
        role: "user",
        content: `
        Here is the user's information:
        - User's Goals: ${userGoals || 'Not specified'}
        - Current Supplements: ${currentSupplements || 'None listed'}
        - Medical Issues: ${medicalIssues || 'None listed'}
        - Parsed Health Report Data (if available): ${parsedReport ? JSON.stringify(parsedReport, null, 2) : 'No specific report data provided'}

        Please generate the personalized supplement plan as a JSON object as specified in the system prompt.
        `
      }
    ];

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: promptMessages,
      response_format: { type: "json_object" }, // Crucial for getting JSON output
      temperature: 0.7, // Adjust creativity if needed
      max_tokens: 1500 // Adjust max tokens based on expected response length and cost
    });

    let aiResponseContent = completion.choices[0].message.content;

    // OpenAI's json_object format is usually reliable, but an extra parse is good.
    try {
        const parsedResponse = JSON.parse(aiResponseContent);
        res.status(200).json(parsedResponse);
    } catch (jsonError) {
        console.error("Failed to parse OpenAI response as JSON:", aiResponseContent, jsonError);
        res.status(500).json({
            message: "AI response format error. Please try again.",
            rawResponse: aiResponseContent,
            errorDetails: jsonError.message
        });
    }

  } catch (error) {
    console.error('Error in Vercel Serverless Function:', error);
    // Differentiate between API errors and other errors
    if (error.response && error.response.status) {
      // This is likely an error from the OpenAI API
      res.status(error.response.status).json({
        message: `External API error: ${error.message}`, // OpenAI errors often have useful messages
        status: error.response.status,
        error: error.message
      });
    } else {
      // Other unexpected errors
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
}

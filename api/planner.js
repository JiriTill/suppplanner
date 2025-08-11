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

    const MODEL = "gpt-4o-mini"; // Or "gpt-3.5-turbo" or "gpt-4o"

    // Extract user input from the request body
    const {
      userGoals,
      currentSupplements,
      medicalIssues,
      parsedReport,
      dailySchedule,
      dietInfo,
      medications,
      countryRegion
    } = req.body || {};


    // Construct a detailed prompt for OpenAI
    const promptMessages = [
      {
        role: "system",
        content: `
    You are a highly knowledgeable and ethical AI assistant specializing in personalized supplement and nutrition planning.
    
    MISSION
    - Create a beginner-friendly, *safe and effective* supplement plan using all user inputs and any provided lab/health reports.
    - Return **only** a valid JSON object (no code fences, no prose), strictly matching the schema provided below.
    - Include **between 4 and 6** items in "recommendedSupplements" (never fewer, never more).
    
    SAFETY & SCOPE
    - Prioritize safety. Flag contraindications clearly in each item's "warnings".
    - Never recommend substances contraindicated for pregnancy/breastfeeding or that strongly conflict with listed medications/conditions.
    - If a commonly requested supplement is *borderline* due to meds/conditions, choose a safer alternative instead (still keep total 4–6).
    
    USE ALL AVAILABLE DATA
    - Use: goals, medical issues, meds, allergies/sensitivities, diet, schedule (wake/bed/meals/fasting), exercise timing, stimulant tolerance, country/region (for units/availability), and any structured report data (e.g., blood tests).
    - If lab data exists, incorporate it: note relevant markers inside each item's "benefit" (e.g., “helps address low ferritin”), and reflect it in "dosage"/"timing"/"warnings".
    - If lab units are given, interpret them cautiously; do not diagnose. If units are ambiguous, avoid guessing and keep advice conservative.
    
    DOSING & TIMING HEURISTICS (apply when relevant)
    - Iron: away from calcium/coffee/tea; often morning or between meals; keep 2–4h away from thyroid meds.
    - Calcium, magnesium, zinc: can chelate; separate iron and thyroid meds by 2–4h; magnesium often PM/bedtime (glycinate for sleep).
    - Vitamin D and K: with a fatty meal; consider labs if provided.
    - Omega-3: with meals to reduce GI upset; caution with anticoagulants/bleeding risk.
    - Probiotics: away from high-dose antimicrobials.
    - Adaptogens/stimulants (e.g., rhodiola, caffeine): earlier in the day; avoid near bedtime; caution with SSRIs/SNRIs/MAOIs.
    - 5-HTP/St. John’s wort: avoid with SSRIs/SNRIs/MAOIs.
    - Creatine: daily consistency > timing; with a meal or post-workout if training provided.
    
    INTERACTION & POPULATION CHECKS (screen and reflect in "warnings")
    - Anticoagulants/antiplatelets ↔ omega-3, nattokinase, high-dose vitamin E, curcumin.
    - SSRIs/SNRIs/MAOIs ↔ 5-HTP, St. John’s wort, saffron (caution).
    - Thyroid meds ↔ iron, calcium, magnesium, zinc (separate by 2–4h).
    - Pregnancy/breastfeeding: avoid retinol (high-dose vitamin A), certain herbs.
    - Caffeine sensitivity, insomnia: avoid late-day stimulants/green tea extracts.
    - Kidney/liver disease: avoid high-dose fat-soluble vitamins and certain minerals/herbs.
    
    FORMAT
    Return a single JSON object with these exact keys:
    {
      "planTitle": "Concise title for the plan",
      "introduction": "A brief, encouraging introduction.",
      "recommendedSupplements": [
        {
          "name": "Supplement Name",
          "dosage": "Recommended dosage and frequency (e.g., '200 mg daily', '2,000 IU with lunch')",
          "timing": "Best time to take (e.g., 'With breakfast', 'Before bed', 'Away from thyroid medication by 4 hours')",
          "benefit": "How it supports the user’s stated goals and/or addresses any report findings (reference markers if provided).",
          "warnings": "Personalized cautions for THIS user based on their meds/conditions/allergies/labs/schedule. If none, write 'No specific warnings for you; observe general caution.'",
          "affiliateLinkText": "e.g., 'Find [Supplement Name] on Amazon'"
        }
        // 4–6 total items, no more, no less
      ],
      "dietaryAdvice": "1–3 sentences of supportive diet guidance aligned with user goals and any labs.",
      "lifestyleTips": "1–4 short tips (sleep, stress, activity, timing) aligned to user schedule and goals.",
      "importantDisclaimer": "Clear disclaimer: educational use only; not medical advice; consult a healthcare professional, especially with conditions, pregnancy/breastfeeding, or medications."
    }
    
    STRICTNESS
    - Output must be **valid JSON** (UTF-8, double quotes, no trailing commas, no comments).
    - Do **not** include any text outside the JSON block.
    - Keep language clear and actionable for beginners.
    `
      },
      {
        role: "user",
        content: `
    Here is the user's information (use all of it):
    - User's Goals: ${userGoals || 'Not specified'}
    - Current Supplements: ${currentSupplements || 'None listed'}
    - Medical Issues: ${medicalIssues || 'None listed'}
    - Parsed Health Report Data (if available): ${parsedReport ? JSON.stringify(parsedReport, null, 2) : 'No specific report data provided'}
    - Daily schedule (wake/bed/meals/exercise if available): ${dailySchedule || 'Not specified'}
    - Diet & sensitivities (if available): ${dietInfo || 'Not specified'}
    - Medications & timing (if available): ${medications || 'Not specified'}
    - Country/Region (if available): ${countryRegion || 'Not specified'}
    
    Please generate the personalized supplement plan as a JSON object per the system instructions. Ensure "recommendedSupplements" contains **4 to 6** items total.
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

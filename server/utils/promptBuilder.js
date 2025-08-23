/**
 * Builds a single, clear prompt string for Gemini.
 * `form` is the object of all questionnaire fields coming from the frontend.
 *
 * We ask the model to return STRICT JSON with a known shape.
 */
export function buildSkincarePrompt(form) {
  // Pull common fields safely
  const {
    gender,
    age,
    skinType,
    skinConcerns,
    allergies,
    sensitivities,
    lifestyle = {}, // waterIntake, sleepHours, stressLevel, exerciseFrequency, dietDescription, etc.
    history = {}, // skincare history answers
    goals,
    climate,
    location,
  } = form;

  return `
You are a skincare specialist AI. Based on the following questionnaire responses, generate a **personalized skincare routine**.  

The output must be ONLY valid JSON (no text outside JSON).  
The JSON should follow this exact schema:

{
  "MorningRoutine": [
    {
      "step": number,
      "title": string,
      "description": string
    }
  ],
  "NightRoutine": [
    {
      "step": number,
      "title": string,
      "description": string
    }
  ],
  "Lifestyle": {
    "do": [ string ],
    "dont": [ string ],
    "tips": [ string ]
  },
  "Products": [
    {
      "name": string,
      "howToUse": string,
      "keyIngredients": [ string ],
      "productLink": string
    }
  ]
}

⚠️ IMPORTANT RULES:
- Do NOT return anything outside of this JSON format.
- Every product must have a **productLink**.  
   - If an official/recommended product link is available, use it.  
   - If not, create a Google search link in this format:  
     "https://www.google.com/search?q=<Product+Name>"  
     (replace spaces with '+').  
- Always give at least 3 products.
- Fill every section, even if the user skips some answers.
- If unsure, give safe generic recommendations.

Here are the user’s answers to the questionnaire:
{{user_responses}}

`;
}

function safe(v) {
  if (v === undefined || v === null) return "N/A";
  return typeof v === "string" ? v : JSON.stringify(v);
}
function listOrString(v) {
  if (!v) return "N/A";
  return Array.isArray(v) ? v.join(", ") : String(v);
}
function safeObj(v) {
  try {
    return JSON.stringify(v ?? {});
  } catch {
    return "{}";
  }
}

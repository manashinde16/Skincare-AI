/**
 * Builds a single, clear prompt string for Gemini.
 * `form` is the object of all questionnaire fields coming from the frontend.
 *
 * We ask the model to return STRICT JSON with a known shape.
 */
export function buildSkincarePrompt(form) {
  const userResponses = JSON.stringify(form, null, 2);

  return `
You are a skincare specialist AI. Based on the following questionnaire responses, generate a **personalized skincare routine**.

The output must be ONLY valid JSON (no text outside JSON).
The JSON should follow this exact schema:

{
  "MorningRoutine": [
    {
      "step": number,
      "title": string,
      "description": string,
      "productOptions": [
        {
          "name": string,
          "howToUse": string,
          "keyIngredients": [ string ],
          "productLink": string,
          "rating": {
            "value": number,        // 0-5 scale
            "count": number,        // number of reviews if available
            "source": "nykaa" | "amazon" | "flipkart" | "google",
            "url": string           // URL where this rating was found
          }
        },
        {
          "name": string,
          "howToUse": string,
          "keyIngredients": [ string ],
          "productLink": string,
          "rating": {
            "value": number,
            "count": number,
            "source": "nykaa" | "amazon" | "flipkart" | "google",
            "url": string
          }
        }
      ]
    }
  ],
  "NightRoutine": [
    {
      "step": number,
      "title": string,
      "description": string,
      "productOptions": [
        {
          "name": string,
          "howToUse": string,
          "keyIngredients": [ string ],
          "productLink": string,
          "rating": {
            "value": number,
            "count": number,
            "source": "nykaa" | "amazon" | "flipkart" | "google",
            "url": string
          }
        },
        {
          "name": string,
          "howToUse": string,
          "keyIngredients": [ string ],
          "productLink": string,
          "rating": {
            "value": number,
            "count": number,
            "source": "nykaa" | "amazon" | "flipkart" | "google",
            "url": string
          }
        }
      ]
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
      "productLink": string,
      "rating": {
        "value": number,
        "count": number,
        "source": "nykaa" | "amazon" | "flipkart" | "google",
        "url": string
      }
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
- Prefer products available in India (Amazon India, Nykaa, Flipkart, Indian brands like Cetaphil India, Minimalist, Lakme, Nivea India, etc.). Provide India-available links wherever possible.
- For each routine step, provide exactly TWO productOptions (A or B) tailored to that step.

RATINGS POLICY (MANDATORY):
- Only recommend products with rating.value >= 4.0.
- Determine ratings using this priority order and record the chosen source in rating.source:
  1) Nykaa, 2) Amazon India, 3) Flipkart, 4) Google (last resort).
- When possible, include rating.count (number of reviews) and rating.url (the page where the rating was found).
- If a product cannot be verified to have 4.0+ rating on the above sources, choose a different product that meets this criteria.

Here are the user’s answers to the questionnaire (full JSON):
${userResponses}

The user has also provided 3 skin images (attached separately). Use both the answers and these images to generate recommendations.

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

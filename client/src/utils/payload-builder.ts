import { v4 as uuidv4 } from "uuid"; // Import uuid for client ID

// Define the full AnalysisData interface for the payload
export interface AnalysisData {
  gender: "male" | "female" | "";
  ageCategory: "under-18" | "18-25" | "26-35" | "36-50" | "50-plus" | "";
  skinType: "dry" | "oily" | "combination" | "normal" | "sensitive" | "";
  images: {
    front: string | null; // Base64 string
    left: string | null; // Base64 string
    right: string | null; // Base64 string
  };
  hasAllergies: boolean | null;
  allergies: string;
  usesProducts: boolean | null;
  products: string;
  concerns: string[];
  otherConcern: string;
  additionalDetails: string; // Added this field
  beardGrowthConcerns: boolean | null; // Male
  shaveFrequently: boolean | null; // Male
  oilyAcneProneSkinMale: boolean | null; // Male
  hairFall: boolean | null; // Male
  hormonalAcne: boolean | null; // Female
  regularPeriods: boolean | null; // Female
  applyMakeupDaily: boolean | null; // Female
  pigmentationAroundMouthEyes: boolean | null; // Female
  pregnantLactating: boolean | null; // Female
  waterIntake: "less-1l" | "1-2l" | "2-3l" | "3l-plus" | "";
  sleepHours: "less-5" | "6-7" | "8-plus" | "";
  stressLevel: "low" | "moderate" | "high" | "";
  exerciseFrequency: "never" | "1-2-times-week" | "3-plus-times-week" | "";
  dietDescription: "junk-food" | "balanced" | "healthy" | "";
  consumptionSugarCaffeineAlcohol: string;
  currentMedicationsSupplements: string;
}

export function buildPayload(data: AnalysisData) {
  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
    clientId: uuidv4(),
  };

  // Clean up conditional fields if not applicable
  if (data.hasAllergies === false) {
    payload.allergies = "";
  }
  if (data.usesProducts === false) {
    payload.products = "";
  }
  if (!data.concerns.includes("Other")) {
    payload.otherConcern = "";
  }

  if (data.gender === "male") {
    payload.hormonalAcne = null;
    payload.regularPeriods = null;
    payload.applyMakeupDaily = null;
    payload.pigmentationAroundMouthEyes = null;
    payload.pregnantLactating = null;
  } else if (data.gender === "female") {
    payload.beardGrowthConcerns = null;
    payload.shaveFrequently = null;
    payload.oilyAcneProneSkinMale = null;
    payload.hairFall = null;
  } else {
    // If gender is not selected, clear all gender-specific fields
    payload.beardGrowthConcerns = null;
    payload.shaveFrequently = null;
    payload.oilyAcneProneSkinMale = null;
    payload.hairFall = null;
    payload.hormonalAcne = null;
    payload.regularPeriods = null;
    payload.applyMakeupDaily = null;
    payload.pigmentationAroundMouthEyes = null;
    payload.pregnantLactating = null;
  }

  return payload;
}

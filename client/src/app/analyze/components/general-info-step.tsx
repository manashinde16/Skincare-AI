"use client";

import { Button } from "@/components/ui/button";
import type { AnalysisData } from "../page";

interface GeneralInfoStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const; // Added as const for type safety

const ageOptions = [
  { value: "under-18", label: "Under 18" },
  { value: "18-25", label: "18-25" },
  { value: "26-35", label: "26-35" },
  { value: "36-50", label: "36-50" },
  { value: "50-plus", label: "50+" },
] as const;

const skinTypeOptions = [
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
  { value: "normal", label: "Normal" },
  { value: "sensitive", label: "Sensitive" },
] as const;

export default function GeneralInfoStep({
  data,
  updateData,
}: GeneralInfoStepProps) {
  return (
    <div className="space-y-8">
      {/* Gender Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What is your gender?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {genderOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => updateData({ gender: option.value })}
              className={`p-4 h-auto text-left justify-start transition-all duration-200 ${
                data.gender === option.value
                  ? "bg-gradient-to-r from-purple-accent to-magenta-accent text-white shadow-md"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50 bg-white"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Age Category */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What is your age category?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ageOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => updateData({ ageCategory: option.value })}
              className={`p-4 h-auto text-left justify-start transition-all duration-200 ${
                data.ageCategory === option.value
                  ? "bg-gradient-to-r from-purple-accent to-magenta-accent text-white shadow-md"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50 bg-white"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What would you say your skin type is?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skinTypeOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => updateData({ skinType: option.value })}
              className={`p-4 h-auto text-left justify-start transition-all duration-200 ${
                data.skinType === option.value
                  ? "bg-gradient-to-r from-purple-accent to-magenta-accent text-white shadow-md"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50 bg-white"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

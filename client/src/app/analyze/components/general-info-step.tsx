"use client";

import { Button } from "@/components/ui/button";
import type { AnalysisData } from "../page";
import { useState } from "react";

interface GeneralInfoStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

const ageOptions = [
  { value: "under-18", label: "Under 18" },
  { value: "19-25", label: "19–25" },
  { value: "26-35", label: "26–35" },
  { value: "36-45", label: "36–45" },
  { value: "over-45", label: "Over 45" },
];

const skinTypeOptions = [
  { value: "oily", label: "Oily" },
  { value: "dry", label: "Dry" },
  { value: "normal", label: "Normal" },
  { value: "sensitive", label: "Sensitive" },
  { value: "combination", label: "Combination" },
  { value: "not-sure", label: "Not sure" },
];

export default function GeneralInfoStep({
  data,
  updateData,
}: GeneralInfoStepProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8">
      {/* Gender Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What is your gender?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {genderOptions.map((option) => (
            <Button
              key={option.value}
              variant={data.gender === option.value ? "default" : "outline"}
              onClick={() => updateData({ gender: option.value })}
              className={`p-4 h-auto text-left justify-start ${
                data.gender === option.value
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50"
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
              variant={
                data.ageCategory === option.value ? "default" : "outline"
              }
              onClick={() => updateData({ ageCategory: option.value })}
              className={`p-4 h-auto text-left justify-start ${
                data.ageCategory === option.value
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50"
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
              variant={data.skinType === option.value ? "default" : "outline"}
              onClick={() => updateData({ skinType: option.value })}
              className={`p-4 h-auto text-left justify-start ${
                data.skinType === option.value
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50"
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

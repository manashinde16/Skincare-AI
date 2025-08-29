"use client";

import { Button } from "@/components/ui/button";
import { Target, Users, Sparkles } from "lucide-react";
import type { AnalysisData } from "../page";

interface GenderSpecificQuestionsStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

export default function GenderSpecificQuestionsStep({
  data,
  updateData,
}: GenderSpecificQuestionsStepProps) {
  const renderQuestion = (
    question: string,
    key: keyof AnalysisData,
    currentValue: boolean | null,
    icon: string,
    color: string,
    options: { value: boolean; label: string }[] = [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ]
  ) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
          <span className="text-lg">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
      </div>
      <div className="flex space-x-4">
        {options.map((option) => (
          <Button
            key={`${key}-${String(option.value)}`}
            variant={currentValue === option.value ? "default" : "outline"}
            onClick={() => updateData({ [key]: option.value })}
            className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              currentValue === option.value
                ? `bg-gradient-to-r ${color} text-white shadow-lg`
                : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 bg-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{option.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  if (data.gender === "") {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100 max-w-md mx-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white mx-auto mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Gender Selection Required
          </h3>
          <p className="text-gray-600">
            Please select your gender in the &quot;Basic Info&quot; step to see
            gender-specific questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium mb-4">
          <Target className="h-4 w-4" />
          {data.gender === "male" ? "Male-Specific" : "Female-Specific"}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {data.gender === "male" ? "Men's Skincare" : "Women's Skincare"} Questions
        </h2>
        <p className="text-gray-600">
          These questions help us provide more personalized recommendations for your specific needs.
        </p>
      </div>

      {data.gender === "male" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderQuestion(
            "Do you have beard growth concerns?",
            "beardGrowthConcerns",
            data.beardGrowthConcerns,
            "🧔",
            "from-blue-500 to-blue-600"
          )}
          {renderQuestion(
            "Do you shave frequently?",
            "shaveFrequently",
            data.shaveFrequently,
            "✂️",
            "from-green-500 to-green-600"
          )}
          {renderQuestion(
            "Do you have oily or acne-prone skin?",
            "oilyAcneProneSkinMale",
            data.oilyAcneProneSkinMale,
            "💧",
            "from-purple-500 to-purple-600"
          )}
          {renderQuestion(
            "Do you experience hair fall?",
            "hairFall",
            data.hairFall,
            "🍃",
            "from-orange-500 to-orange-600"
          )}
        </div>
      )}

      {data.gender === "female" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderQuestion(
            "Do you experience hormonal acne?",
            "hormonalAcne",
            data.hormonalAcne,
            "🌸",
            "from-pink-500 to-pink-600"
          )}
          {renderQuestion(
            "Do you have regular periods?",
            "regularPeriods",
            data.regularPeriods,
            "📅",
            "from-red-500 to-red-600"
          )}
          {renderQuestion(
            "Do you apply makeup daily?",
            "applyMakeupDaily",
            data.applyMakeupDaily,
            "💄",
            "from-purple-500 to-purple-600"
          )}
          {renderQuestion(
            "Do you face pigmentation around the mouth or eyes?",
            "pigmentationAroundMouthEyes",
            data.pigmentationAroundMouthEyes,
            "👁️",
            "from-indigo-500 to-indigo-600"
          )}
          {renderQuestion(
            "Are you currently pregnant or lactating?",
            "pregnantLactating",
            data.pregnantLactating,
            "🤱",
            "from-green-500 to-emerald-600"
          )}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="text-center p-4 bg-white rounded-xl border border-gray-200 mt-8">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Gender-specific questions help us tailor your skincare routine perfectly</span>
        </div>
      </div>
    </div>
  );
}

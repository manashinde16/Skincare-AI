"use client";

import { Button } from "@/components/ui/button";
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
    options: { value: boolean; label: string }[] = [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ]
  ) => (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{question}</h3>
      <div className="flex space-x-4">
        {options.map((option) => (
          <Button
            key={`${key}-${String(option.value)}`}
            variant={currentValue === option.value ? "default" : "outline"}
            onClick={() => updateData({ [key]: option.value })}
            className={`${
              currentValue === option.value
                ? "bg-gradient-to-r from-purple-accent to-magenta-accent text-white"
                : "border-purple-200 text-gray-700 hover:bg-purple-50"
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {data.gender === "male" && (
        <>
          {renderQuestion(
            "Do you have beard growth concerns?",
            "beardGrowthConcerns",
            data.beardGrowthConcerns
          )}
          {renderQuestion(
            "Do you shave frequently?",
            "shaveFrequently",
            data.shaveFrequently
          )}
          {renderQuestion(
            "Do you have oily or acne-prone skin?",
            "oilyAcneProneSkinMale",
            data.oilyAcneProneSkinMale
          )}
          {renderQuestion(
            "Do you experience hair fall?",
            "hairFall",
            data.hairFall
          )}
        </>
      )}

      {data.gender === "female" && (
        <>
          {renderQuestion(
            "Do you experience hormonal acne?",
            "hormonalAcne",
            data.hormonalAcne
          )}
          {renderQuestion(
            "Do you have regular periods?",
            "regularPeriods",
            data.regularPeriods
          )}
          {renderQuestion(
            "Do you apply makeup daily?",
            "applyMakeupDaily",
            data.applyMakeupDaily
          )}
          {renderQuestion(
            "Do you face pigmentation around the mouth or eyes?",
            "pigmentationAroundMouthEyes",
            data.pigmentationAroundMouthEyes
          )}
          {renderQuestion(
            "Are you currently pregnant or lactating?",
            "pregnantLactating",
            data.pregnantLactating
          )}
        </>
      )}

      {data.gender === "" && (
        <div className="text-center text-gray-500">
          Please select your gender in the &quot;Basic Info&quot; step to see
          gender-specific questions.
        </div>
      )}
    </div>
  );
}

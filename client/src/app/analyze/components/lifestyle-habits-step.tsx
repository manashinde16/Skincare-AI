"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AnalysisData } from "../page";

interface LifestyleHabitsStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const waterIntakeOptions = [
  { value: "less-1l", label: "Less than 1L" },
  { value: "1-2l", label: "1-2L" },
  { value: "2-3l", label: "2-3L" },
  { value: "3l-plus", label: "3L+" },
];

const sleepHoursOptions = [
  { value: "less-5", label: "Less than 5" },
  { value: "6-7", label: "6-7" },
  { value: "8-plus", label: "8+" },
];

const stressLevelOptions = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
];

const exerciseFrequencyOptions = [
  { value: "never", label: "Never" },
  { value: "1-2-times-week", label: "1-2 times/week" },
  { value: "3-plus-times-week", label: "3+ times/week" },
];

const dietDescriptionOptions = [
  { value: "junk-food", label: "Junk food" },
  { value: "balanced", label: "Balanced" },
  { value: "healthy", label: "Healthy" },
];

export default function LifestyleHabitsStep({
  data,
  updateData,
}: LifestyleHabitsStepProps) {
  const renderOptionGroup = <T extends string>(
    title: string,
    key: keyof AnalysisData,
    options: { value: T; label: string }[],
    currentValue: T
  ) => (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => updateData({ [key]: option.value })}
            className={`p-4 h-auto text-left justify-start transition-all duration-200 ${
              currentValue === option.value
                ? "bg-gradient-to-r from-purple-accent to-magenta-accent text-white shadow-md"
                : "border-purple-200 text-gray-700 hover:bg-purple-50 bg-white"
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
      {renderOptionGroup(
        "How much water do you drink daily?",
        "waterIntake",
        waterIntakeOptions,
        data.waterIntake
      )}
      {renderOptionGroup(
        "How many hours do you sleep daily?",
        "sleepHours",
        sleepHoursOptions,
        data.sleepHours
      )}
      {renderOptionGroup(
        "Rate your stress level",
        "stressLevel",
        stressLevelOptions,
        data.stressLevel
      )}
      {renderOptionGroup(
        "How often do you exercise?",
        "exerciseFrequency",
        exerciseFrequencyOptions,
        data.exerciseFrequency
      )}
      {renderOptionGroup(
        "How would you describe your current diet?",
        "dietDescription",
        dietDescriptionOptions,
        data.dietDescription
      )}

      {/* Textarea for consumption */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          How often do you consume sugar, caffeine, or alcohol?
        </h3>
        <Textarea
          placeholder="e.g., 'Sugar daily, caffeine 3 times a week, alcohol occasionally'"
          value={data.consumptionSugarCaffeineAlcohol}
          onChange={(e) =>
            updateData({ consumptionSugarCaffeineAlcohol: e.target.value })
          }
          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 min-h-[80px]"
        />
      </div>

      {/* Textarea for medications/supplements */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Any current medications or supplements? (Optional)
        </h3>
        <Textarea
          placeholder="Please list any medications or supplements you are currently taking..."
          value={data.currentMedicationsSupplements}
          onChange={(e) =>
            updateData({ currentMedicationsSupplements: e.target.value })
          }
          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 min-h-[80px]"
        />
      </div>
    </div>
  );
}

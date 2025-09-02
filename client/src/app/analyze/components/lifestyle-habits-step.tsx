"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Droplet, Moon, Brain, Activity, Apple, Coffee } from "lucide-react";
import type { AnalysisData } from "../page";

interface LifestyleHabitsStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const waterIntakeOptions = [
  { value: "less-1l", label: "Less than 1L", color: "from-red-500 to-red-600" },
  { value: "1-2l", label: "1-2L", color: "from-orange-500 to-orange-600" },
  { value: "2-3l", label: "2-3L", color: "from-green-500 to-green-600" },
  { value: "3l-plus", label: "3L+", color: "from-blue-500 to-blue-600" },
];

const sleepHoursOptions = [
  { value: "less-5", label: "Less than 5", color: "from-red-500 to-red-600" },
  { value: "6-7", label: "6-7", color: "from-yellow-500 to-yellow-600" },
  { value: "8-plus", label: "8+", color: "from-green-500 to-green-600" },
];

const stressLevelOptions = [
  { value: "low", label: "Low", color: "from-green-500 to-green-600" },
  { value: "moderate", label: "Moderate", color: "from-yellow-500 to-yellow-600" },
  { value: "high", label: "High", color: "from-red-500 to-red-600" },
];

const exerciseFrequencyOptions = [
  { value: "never", label: "Never", color: "from-red-500 to-red-600" },
  { value: "1-2-times-week", label: "1-2 times/week", color: "from-orange-500 to-orange-600" },
  { value: "3-plus-times-week", label: "3+ times/week", color: "from-green-500 to-green-600" },
];

const dietDescriptionOptions = [
  { value: "junk-food", label: "Junk food", color: "from-red-500 to-red-600" },
  { value: "balanced", label: "Balanced", color: "from-yellow-500 to-yellow-600" },
  { value: "healthy", label: "Healthy", color: "from-green-500 to-green-600" },
];

export default function LifestyleHabitsStep({
  data,
  updateData,
}: LifestyleHabitsStepProps) {
  const renderOptionGroup = <T extends string>(
    title: string,
    key: keyof AnalysisData,
    options: { value: T; label: string; color: string }[],
    currentValue: T,
    icon: React.ReactNode
  ) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => updateData({ [key]: option.value })}
            className={`p-4 h-auto text-center justify-center transition-all duration-300 rounded-xl border-2 ${
              currentValue === option.value
                ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 bg-white hover:scale-105"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-medium text-sm">{option.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium mb-4">
          <Activity className="h-4 w-4" />
          Lifestyle & Habits
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Daily Lifestyle
        </h2>
        <p className="text-gray-600">
          Understanding your lifestyle helps us create a skincare routine that fits your daily habits.
        </p>
      </div>

      {/* Option Groups */}
      {renderOptionGroup(
        "How much water do you drink daily?",
        "waterIntake",
        waterIntakeOptions,
        data.waterIntake,
        <Droplet className="h-6 w-6" />
      )}
      
      {renderOptionGroup(
        "How many hours do you sleep daily?",
        "sleepHours",
        sleepHoursOptions,
        data.sleepHours,
        <Moon className="h-6 w-6" />
      )}
      
      {renderOptionGroup(
        "Rate your stress level",
        "stressLevel",
        stressLevelOptions,
        data.stressLevel,
        <Brain className="h-6 w-6" />
      )}
      
      {renderOptionGroup(
        "How often do you exercise?",
        "exerciseFrequency",
        exerciseFrequencyOptions,
        data.exerciseFrequency,
        <Activity className="h-6 w-6" />
      )}
      
      {renderOptionGroup(
        "How would you describe your current diet?",
        "dietDescription",
        dietDescriptionOptions,
        data.dietDescription,
        <Apple className="h-6 w-6" />
      )}

      {/* Textarea for consumption */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white">
            <Coffee className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            How often do you consume sugar, caffeine, or alcohol?
          </h3>
        </div>
        <Textarea
          placeholder="e.g., 'Sugar daily, caffeine 3 times a week, alcohol occasionally'"
          value={data.consumptionSugarCaffeineAlcohol}
          onChange={(e) =>
            updateData({ consumptionSugarCaffeineAlcohol: e.target.value })
          }
          className="border-gray-200 focus:border-orange-400 focus:ring-orange-400 min-h-[80px] rounded-xl resize-none"
        />
      </div>

      {/* Textarea for medications/supplements */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
            <Brain className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Any current medications or supplements? (Optional)
          </h3>
        </div>
        <Textarea
          placeholder="Please list any medications or supplements you are currently taking..."
          value={data.currentMedicationsSupplements}
          onChange={(e) =>
            updateData({ currentMedicationsSupplements: e.target.value })
          }
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 min-h-[80px] rounded-xl resize-none"
        />
      </div>

      {/* Progress Indicator */}
      <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Lifestyle factors significantly impact your skin health and routine effectiveness</span>
        </div>
      </div>
    </div>
  );
}

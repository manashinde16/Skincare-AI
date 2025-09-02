"use client";

import { Button } from "@/components/ui/button";
import { User, Calendar, Droplet } from "lucide-react";
import type { AnalysisData } from "../page";

interface GeneralInfoStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const genderOptions = [
  { value: "male", label: "Male", icon: "👨", color: "from-blue-500 to-blue-600" },
  { value: "female", label: "Female", icon: "👩", color: "from-pink-500 to-pink-600" },
] as const;

const ageOptions = [
  { value: "under-18", label: "Under 18", icon: "🧒", color: "from-green-500 to-green-600" },
  { value: "18-25", label: "18-25", icon: "👱‍♀️", color: "from-purple-500 to-purple-600" },
  { value: "26-35", label: "26-35", icon: "👨‍💼", color: "from-indigo-500 to-indigo-600" },
  { value: "36-50", label: "36-50", icon: "👩‍💼", color: "from-orange-500 to-orange-600" },
  { value: "50-plus", label: "50+", icon: "👴", color: "from-red-500 to-red-600" },
] as const;

const skinTypeOptions = [
  { value: "dry", label: "Dry", icon: "🏜️", color: "from-yellow-500 to-orange-600" },
  { value: "oily", label: "Oily", icon: "💧", color: "from-blue-500 to-cyan-600" },
  { value: "combination", label: "Combination", icon: "🎭", color: "from-purple-500 to-pink-600" },
  { value: "normal", label: "Normal", icon: "✨", color: "from-green-500 to-emerald-600" },
  { value: "sensitive", label: "Sensitive", icon: "🌸", color: "from-pink-500 to-rose-600" },
] as const;

export default function GeneralInfoStep({
  data,
  updateData,
}: GeneralInfoStepProps) {
  return (
    <div className="space-y-10">
      {/* Gender Selection */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
            <User className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            What is your gender?
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {genderOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => updateData({ gender: option.value })}
              className={`p-6 h-auto text-left justify-start transition-all duration-300 rounded-xl border-2 ${
                data.gender === option.value
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                  : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 bg-white hover:scale-105"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">{option.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Age Category */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            What is your age category?
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ageOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => updateData({ ageCategory: option.value })}
              className={`p-4 h-auto text-center justify-center transition-all duration-300 rounded-xl border-2 ${
                data.ageCategory === option.value
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                  : "border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50 bg-white hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-medium text-sm">{option.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white">
            <Droplet className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            What would you say your skin type is?
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skinTypeOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => updateData({ skinType: option.value })}
              className={`p-4 h-auto text-center justify-center transition-all duration-300 rounded-xl border-2 ${
                data.skinType === option.value
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                  : "border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50 bg-white hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-medium text-sm">{option.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      
    </div>
  );
}

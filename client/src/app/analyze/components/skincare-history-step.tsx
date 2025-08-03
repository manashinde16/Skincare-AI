"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import type { AnalysisData } from "../page";

interface SkincareHistoryStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const concernOptions = [
  "Acne",
  "Pigmentation",
  "Dry patches",
  "Dark circles",
  "Redness",
  "Others",
];

export default function SkincareHistoryStep({
  data,
  updateData,
}: SkincareHistoryStepProps) {
  const [isRecording, setIsRecording] = useState(false);

  const toggleConcern = (concern: string) => {
    const updatedConcerns = data.concerns.includes(concern)
      ? data.concerns.filter((c) => c !== concern)
      : [...data.concerns, concern];
    updateData({ concerns: updatedConcerns });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
  };

  return (
    <div className="space-y-8">
      {/* Allergies */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Do you have any known skin allergies?
        </h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              variant={data.hasAllergies ? "default" : "outline"}
              onClick={() => updateData({ hasAllergies: true })}
              className={`${
                data.hasAllergies
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50"
              }`}
            >
              Yes
            </Button>
            <Button
              variant={!data.hasAllergies ? "default" : "outline"}
              onClick={() => updateData({ hasAllergies: false, allergies: "" })}
              className={`${
                !data.hasAllergies
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50"
              }`}
            >
              No
            </Button>
          </div>
          {data.hasAllergies && (
            <Input
              placeholder="Please list your allergies..."
              value={data.allergies}
              onChange={(e) => updateData({ allergies: e.target.value })}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          )}
        </div>
      </div>

      {/* Recent Products */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Have you used any skincare products recently?
        </h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              variant={data.usesProducts ? "default" : "outline"}
              onClick={() => updateData({ usesProducts: true })}
              className={`${
                data.usesProducts
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50"
              }`}
            >
              Yes
            </Button>
            <Button
              variant={!data.usesProducts ? "default" : "outline"}
              onClick={() => updateData({ usesProducts: false, products: "" })}
              className={`${
                !data.usesProducts
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-gray-700 hover:bg-purple-50"
              }`}
            >
              No
            </Button>
          </div>
          {data.usesProducts && (
            <Input
              placeholder="Please list the products you've been using..."
              value={data.products}
              onChange={(e) => updateData({ products: e.target.value })}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          )}
        </div>
      </div>

      {/* Skin Concerns */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Do you have any current skin concerns?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {concernOptions.map((concern) => (
            <div key={concern} className="flex items-center space-x-2">
              <Checkbox
                id={concern}
                checked={data.concerns.includes(concern)}
                onCheckedChange={() => toggleConcern(concern)}
                className="border-purple-300 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <label
                htmlFor={concern}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {concern}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Details
        </h3>
        <div className="relative">
          <Textarea
            placeholder="Describe anything else we should know..."
            value={data.additionalDetails}
            onChange={(e) => updateData({ additionalDetails: e.target.value })}
            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 pr-12 min-h-[100px]"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRecording}
            className={`absolute bottom-3 right-3 ${
              isRecording
                ? "text-red-500 hover:text-red-600"
                : "text-purple-600 hover:text-purple-700"
            }`}
          >
            {isRecording ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Click the microphone icon to use voice-to-text
        </p>
      </div>
    </div>
  );
}

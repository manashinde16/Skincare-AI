"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import GeneralInfoStep from "./components/general-info-step";
import UploadSelfiesStep from "./components/upload-selfies-step";
import SkincareHistoryStep from "./components/skincare-history-step";
import SubmitStep from "./components/submit-step";

export interface AnalysisData {
  gender: string;
  ageCategory: string;
  skinType: string;
  images: {
    front: File | null;
    left: File | null;
    right: File | null;
  };
  hasAllergies: boolean;
  allergies: string;
  usesProducts: boolean;
  products: string;
  concerns: string[];
  additionalDetails: string;
}

const steps = [
  { id: 1, title: "General Info", description: "Tell us about yourself" },
  { id: 2, title: "Upload Photos", description: "Take 3 selfies" },
  { id: 3, title: "Skincare History", description: "Share your experience" },
  { id: 4, title: "Analysis", description: "Generate your routine" },
];

export default function AnalyzePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    gender: "",
    ageCategory: "",
    skinType: "",
    images: {
      front: null,
      left: null,
      right: null,
    },
    hasAllergies: false,
    allergies: "",
    usesProducts: false,
    products: "",
    concerns: [],
    additionalDetails: "",
  });

  const updateAnalysisData = (updates: Partial<AnalysisData>) => {
    setAnalysisData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          analysisData.gender &&
          analysisData.ageCategory &&
          analysisData.skinType
        );
      case 2:
        return (
          analysisData.images.front &&
          analysisData.images.left &&
          analysisData.images.right
        );
      case 3:
        return true; // All fields are optional in step 3
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <GeneralInfoStep
            data={analysisData}
            updateData={updateAnalysisData}
          />
        );
      case 2:
        return (
          <UploadSelfiesStep
            data={analysisData}
            updateData={updateAnalysisData}
          />
        );
      case 3:
        return (
          <SkincareHistoryStep
            data={analysisData}
            updateData={updateAnalysisData}
          />
        );
      case 4:
        return <SubmitStep data={analysisData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background enhancements */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-purple-50/20 to-lavender-50/30 pointer-events-none" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-lavender-100/40 to-purple-100/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/2" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="border-b border-purple-100/50 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <div className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-colors ${
                        currentStep > step.id ? "bg-purple-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress
              value={(currentStep / steps.length) * 100}
              className="h-2 mb-8"
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-purple-100/50 shadow-xl backdrop-blur-sm bg-white/95">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {steps[currentStep - 1].title}
                  </h1>
                  <p className="text-gray-600">
                    {steps[currentStep - 1].description}
                  </p>
                </div>

                {renderStep()}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

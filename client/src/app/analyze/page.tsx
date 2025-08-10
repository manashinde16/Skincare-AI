"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import GeneralInfoStep from "./components/general-info-step";
import UploadSelfiesStep from "./components/upload-selfies-step";
import SkincareHistoryStep from "./components/skincare-history-step";
import GenderSpecificQuestionsStep from "./components/gender-specific-questions-step";
import LifestyleHabitsStep from "./components/lifestyle-habits-step";
import SubmitStep from "./components/submit-step";
import { useRouter } from "next/navigation";

export interface AnalysisData {
  gender: "male" | "female" | "";
  ageCategory: "under-18" | "18-25" | "26-35" | "36-50" | "50-plus" | "";
  skinType: "dry" | "oily" | "combination" | "normal" | "sensitive" | "";
  images: {
    front: File | null;
    left: File | null;
    right: File | null;
  };
  hasAllergies: boolean | null;
  allergies: string;
  usesProducts: boolean | null;
  products: string;
  concerns: string[];
  otherConcern: string;
  // Gender-specific questions
  beardGrowthConcerns: boolean | null; // Male
  shaveFrequently: boolean | null; // Male
  oilyAcneProneSkinMale: boolean | null; // Male
  hairFall: boolean | null; // Male
  hormonalAcne: boolean | null; // Female
  regularPeriods: boolean | null; // Female
  applyMakeupDaily: boolean | null; // Female
  pigmentationAroundMouthEyes: boolean | null; // Female
  pregnantLactating: boolean | null; // Female
  // Lifestyle & Habits
  waterIntake: "less-1l" | "1-2l" | "2-3l" | "3l-plus" | "";
  sleepHours: "less-5" | "6-7" | "8-plus" | "";
  stressLevel: "low" | "moderate" | "high" | "";
  exerciseFrequency: "never" | "1-2-times-week" | "3-plus-times-week" | "";
  dietDescription: "junk-food" | "balanced" | "healthy" | "";
  consumptionSugarCaffeineAlcohol: string;
  currentMedicationsSupplements: string;
  additionalDetails: string;
}

const steps = [
  { id: 1, title: "Basic Info", description: "Tell us about yourself" },
  { id: 2, title: "Image Upload", description: "Upload 3 clear face photos" },
  { id: 3, title: "Skincare History", description: "Share your experience" },
  {
    id: 4,
    title: "Specific Questions",
    description: "Answer gender-specific questions",
  },
  {
    id: 5,
    title: "Lifestyle & Habits",
    description: "Share your daily routine",
  },
  { id: 6, title: "Analysis", description: "Generate your routine" },
];

export default function AnalyzePage() {
  const router = useRouter();
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
    hasAllergies: null,
    allergies: "",
    usesProducts: null,
    products: "",
    concerns: [],
    otherConcern: "",
    beardGrowthConcerns: null,
    shaveFrequently: null,
    oilyAcneProneSkinMale: null,
    hairFall: null,
    hormonalAcne: null,
    regularPeriods: null,
    applyMakeupDaily: null,
    pigmentationAroundMouthEyes: null,
    pregnantLactating: null,
    waterIntake: "",
    sleepHours: "",
    stressLevel: "",
    exerciseFrequency: "",
    dietDescription: "",
    consumptionSugarCaffeineAlcohol: "",
    currentMedicationsSupplements: "",
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
        return true; // All fields are optional or have default states
      case 4:
        // Gender-specific validation (simplified for brevity, could be more detailed)
        if (analysisData.gender === "male") {
          return (
            analysisData.beardGrowthConcerns !== null &&
            analysisData.shaveFrequently !== null &&
            analysisData.oilyAcneProneSkinMale !== null &&
            analysisData.hairFall !== null
          );
        } else if (analysisData.gender === "female") {
          return (
            analysisData.hormonalAcne !== null &&
            analysisData.regularPeriods !== null &&
            analysisData.applyMakeupDaily !== null &&
            analysisData.pigmentationAroundMouthEyes !== null &&
            analysisData.pregnantLactating !== null
          );
        }
        return false; // Should not happen if gender is selected
      case 5:
        return (
          analysisData.waterIntake !== "" &&
          analysisData.sleepHours !== "" &&
          analysisData.stressLevel !== "" &&
          analysisData.exerciseFrequency !== "" &&
          analysisData.dietDescription !== ""
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save data to local storage
    localStorage.setItem("skincareAnalysisData", JSON.stringify(analysisData));
    router.push("/report");
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
        return (
          <GenderSpecificQuestionsStep
            data={analysisData}
            updateData={updateAnalysisData}
          />
        );
      case 5:
        return (
          <LifestyleHabitsStep
            data={analysisData}
            updateData={updateAnalysisData}
          />
        );
      case 6:
        return <SubmitStep data={analysisData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background enhancements */}
      <div className="fixed inset-0 bg-gradient-to-br from-peach-light/50 via-lavender-light/50 to-baby-pink-light/50 pointer-events-none" />
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
                        ? "bg-gradient-to-r from-purple-accent to-magenta-accent border-purple-accent text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-colors ${
                        currentStep > step.id
                          ? "bg-purple-accent"
                          : "bg-gray-300"
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
            <Card className="border-purple-100/50 shadow-xl backdrop-blur-sm bg-white/95 animate-glass-pulse">
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

                {/* Navigation Buttons - Always visible */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent opacity-100 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  {currentStep < steps.length ? (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="bg-gradient-to-r from-purple-accent to-magenta-accent hover:from-purple-600 hover:to-pink-600 text-white opacity-100 disabled:opacity-50"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed()}
                      className="bg-gradient-to-r from-purple-accent to-magenta-accent hover:from-purple-600 hover:to-pink-600 text-white opacity-100 disabled:opacity-50"
                    >
                      Generate Report
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

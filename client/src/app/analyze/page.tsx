"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles, Brain, Zap } from "lucide-react";
import Link from "next/link";
import GeneralInfoStep from "./components/general-info-step";
import UploadSelfiesStep from "./components/upload-selfies-step";
import SkincareHistoryStep from "./components/skincare-history-step";
import GenderSpecificQuestionsStep from "./components/gender-specific-questions-step";
import LifestyleHabitsStep from "./components/lifestyle-habits-step";
import SubmitStep from "./components/submit-step";
import { useRouter, useSearchParams } from "next/navigation";
import type { AnalysisData as FullAnalysisData } from "@/utils/payload-builder";
import type { FormSubmissionResponse } from "../../utils/form-submission";
import { useAuth } from "@/contexts/AuthContext";

// Use the AnalysisData from payload-builder.ts as the source of truth
export type AnalysisData = FullAnalysisData;

const steps = [
  { id: 1, title: "Basic Info", description: "Tell us about yourself", icon: "👤" },
  { id: 2, title: "Image Upload", description: "Upload 3 clear face photos", icon: "📸" },
  { id: 3, title: "Skincare History", description: "Share your experience", icon: "📚" },
  {
    id: 4,
    title: "Specific Questions",
    description: "Answer gender-specific questions",
    icon: "🎯"
  },
  {
    id: 5,
    title: "Lifestyle & Habits",
    description: "Share your daily routine",
    icon: "🌱"
  },
  { id: 6, title: "Analysis", description: "Generate your routine", icon: "✨" },
];

export default function AnalyzePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
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
    additionalDetails: "",
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
  });

  // Resume flow after login/signup
  const [shouldAutoStart, setShouldAutoStart] = useState(false);

  // On mount: if resume flag present and we have pending data in localStorage, restore it
  useEffect(() => {
    const resumeParam = searchParams.get("resume");
    const autoStartParam = searchParams.get("autostart");
    if (resumeParam === "1") {
      try {
        const saved = typeof window !== "undefined" ? localStorage.getItem("pendingAnalysisData") : null;
        if (saved) {
          const parsed = JSON.parse(saved);
          setAnalysisData((prev) => ({ ...prev, ...parsed }));
          setCurrentStep(steps.length);
          if (autoStartParam === "1") {
            setShouldAutoStart(true);
          }
        }
      } catch (e) {
        console.error("Failed to restore pending analysis data", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmit = async (response: FormSubmissionResponse) => {
    try {
      // Store the backend response in localStorage for the report page
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "skincareReportData",
          JSON.stringify(response.result)
        );
        // Clear pending draft if present
        localStorage.removeItem("pendingAnalysisData");
      }
      router.push("/report");
    } catch (error) {
      console.error("Error handling submission response:", error);
      throw error;
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
        return <SubmitStep data={analysisData} onSubmit={handleSubmit} autoStart={shouldAutoStart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-100/40 to-blue-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/2" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 min-h-screen">
        {/* Enhanced Header */}
        <div className="border-b border-gray-200/50 bg-white/90 backdrop-blur-xl shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link
                href={user ? "/dashboard" : "/"}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">
                  {user ? "Back to Dashboard" : "Back to Home"}
                </span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium">
                  <Brain className="h-4 w-4" />
                  AI Analysis
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Step {currentStep} of {steps.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section (steps only) */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-2xl border-2 transition-all duration-500 ${
                        currentStep >= step.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 border-blue-600 text-white shadow-lg scale-110"
                          : "border-gray-300 text-gray-400 bg-white"
                      }`}
                    >
                      <span className="text-lg font-bold">{step.id}</span>
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-xs font-medium ${
                        currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-20 h-1 mx-4 rounded-full transition-all duration-500 ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Step Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <CardContent className="p-0">
                {/* Step Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold">
                      {steps[currentStep - 1].title}
                    </h1>
                  </div>
                  <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    {steps[currentStep - 1].description}
                  </p>
                </div>

                {/* Step Content */}
                <div className="p-8">
                  {renderStep()}

                  {/* Enhanced Navigation Buttons */}
                  <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 bg-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Previous
                    </Button>
                    
                    {currentStep < steps.length ? (
                      <Button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        Next Step
                        <ArrowRight className="w-5 w-5 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {}} // This button is now handled by SubmitStep
                        disabled={!canProceed()}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                        style={{ display: "none" }} // Hide this button since SubmitStep handles submission
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Generate Report
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        
      </div>
    </div>
  );
}

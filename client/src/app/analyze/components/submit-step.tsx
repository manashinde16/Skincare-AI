"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type { AnalysisData } from "@/utils/payload-builder"; // Import AnalysisData

interface SubmitStepProps {
  data: AnalysisData;
  onSubmit: () => Promise<void>; // This function now triggers the API call in the parent
}

export default function SubmitStep({ data, onSubmit }: SubmitStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 10;
          } else {
            clearInterval(interval);
            return 100;
          }
        });
      }, 300); // Simulate progress
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setSubmissionStatus("idle");

    try {
      await onSubmit(); // Call the parent's onSubmit, which handles the API call
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Submission failed in SubmitStep:", error);
    } finally {
      setIsAnalyzing(false); // Stop loading animation regardless of success/failure
    }
  };

  return (
    <div className="space-y-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        Ready for your personalized analysis?
      </h2>
      <p className="text-gray-600">
        Click the button below to submit your information and generate your
        custom skincare and wellness report.
      </p>

      <Card className="border-purple-100/50 shadow-lg bg-white/90">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          {isAnalyzing ? (
            <div className="w-full">
              <Loader2 className="h-12 w-12 text-purple-accent animate-spin mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Analyzing Your Skin...
              </p>
              <p className="text-gray-500 mb-4">
                This will only take a moment.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-gradient-to-r from-purple-accent to-magenta-accent h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
            </div>
          ) : (
            <>
              <Button
                onClick={startAnalysis}
                className="bg-gradient-to-r from-purple-accent to-magenta-accent hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                Start Analysis
              </Button>

              {submissionStatus === "success" && (
                <div className="mt-6 flex items-center text-green-600 font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Data submitted successfully!
                </div>
              )}
              {submissionStatus === "error" && (
                <div className="mt-6 flex items-center text-red-600 font-semibold">
                  <XCircle className="w-5 h-5 mr-2" />
                  Submission failed, please try again.
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

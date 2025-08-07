"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type { AnalysisData } from "../page";

interface SubmitStepProps {
  data: AnalysisData;
  onSubmit: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SubmitStep({ data, onSubmit }: SubmitStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 10;
          } else {
            clearInterval(interval);
            setAnalysisComplete(true);
            onSubmit(); // Trigger navigation to report page
            return 100;
          }
        });
      }, 300); // Simulate progress
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, onSubmit]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setAnalysisComplete(false);
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
            <Button
              onClick={startAnalysis}
              className="bg-gradient-to-r from-purple-accent to-magenta-accent hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Analysis
            </Button>
          )}

          {analysisComplete && (
            <div className="mt-6 flex items-center text-green-600 font-semibold">
              <CheckCircle className="w-5 h-5 mr-2" />
              Analysis Complete! Redirecting...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type { AnalysisData } from "@/utils/payload-builder";
import {
  submitAnalysisForm,
  type FormSubmissionResponse,
} from "../../../utils/form-submission";
import { useToast } from "../../../hooks/use-toast";

interface SubmitStepProps {
  data: AnalysisData;
  onSubmit: (response: FormSubmissionResponse) => Promise<void>;
}

export default function SubmitStep({ data, onSubmit }: SubmitStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { toast } = useToast();

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          // keep moving while pending but never hit 100 until completion
          const targetCap = 99; // feel alive until server finishes
          if (prev >= targetCap) return prev;
          // ease increments as it gets higher
          const delta = prev < 70 ? 3 : prev < 85 ? 2 : 1;
          const next = Math.min(prev + delta, targetCap);
          if (next !== prev) console.log("Progress:", next);
          return next;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    console.log("Progress: 0");
    setSubmissionStatus("idle");

    try {
      // Prepare form values (exclude images from the main data object)
      const { images, ...formValues } = data;

      // Submit the form with multipart/form-data
      const response = await submitAnalysisForm(
        formValues,
        images.left, // leftFile
        images.front, // frontFile
        images.right // rightFile
      );

      if (response.ok) {
        setProgress(100);
        console.log("Progress: 100");
        setSubmissionStatus("success");
        await onSubmit(response); // Pass the response to parent
      } else {
        throw new Error("Server returned ok: false");
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Submission failed in SubmitStep:", error);

      // Show user-friendly error toast
      let errorMessage = "Failed to submit analysis. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("HTTP 413")) {
          errorMessage =
            "Images are too large. Please try with smaller images.";
        } else if (error.message.includes("HTTP 400")) {
          errorMessage =
            "Invalid form data. Please check all fields and try again.";
        } else if (error.message.includes("HTTP 500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
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
                  Analysis completed successfully!
                </div>
              )}
              {submissionStatus === "error" && (
                <div className="mt-6 flex items-center text-red-600 font-semibold">
                  <XCircle className="w-5 h-5 mr-2" />
                  Analysis failed. Please try again.
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

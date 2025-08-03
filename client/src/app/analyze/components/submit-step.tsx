"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle } from "lucide-react";
import type { AnalysisData } from "../page";
import { useRouter } from "next/navigation"; // Import useRouter

interface SubmitStepProps {
  data: AnalysisData;
}

export default function SubmitStep({ data }: SubmitStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter(); // Initialize useRouter

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setIsComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  useEffect(() => {
    console.log("Analysis data:", data);
  }, [data]);

  if (isComplete) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analysis Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            Your personalized skincare routine is ready.
          </p>
          <Button
            onClick={() => router.push("/routine")} // Navigate to /routine
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
          >
            View My Routine
          </Button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-purple-600 animate-pulse" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Your Skin
          </h2>
          <p className="text-gray-600 mb-4">
            Generating your personalized skincare routine...
          </p>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {Math.round(Math.min(progress, 100))}% complete
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-purple-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Analyze
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;ll analyze your photos and information to create a
          personalized skincare routine just for you.
        </p>
        <Button
          onClick={startAnalysis}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Skin Analysis
        </Button>
      </div>
    </div>
  );
}

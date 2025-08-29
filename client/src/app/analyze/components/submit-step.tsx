"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, Sparkles, Brain, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import type { AnalysisData } from "@/utils/payload-builder";
import {
  submitAnalysisForm,
  type FormSubmissionResponse,
} from "../../../utils/form-submission";
import { useToast } from "../../../hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { fileToBase64 } from "@/utils/image-utils";

interface SubmitStepProps {
  data: AnalysisData;
  onSubmit: (response: FormSubmissionResponse) => Promise<void>;
  autoStart?: boolean;
}

export default function SubmitStep({ data, onSubmit, autoStart = false }: SubmitStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const targetCap = 99;
          if (prev >= targetCap) return prev;
          const delta = prev < 70 ? 3 : prev < 85 ? 2 : 1;
          return Math.min(prev + delta, targetCap);
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  

  const startAnalysis = async () => {
    // If not logged in: persist form data and redirect to login with resume params
    if (!user) {
      try {
        // Convert any File images to base64 strings for persistence
        const serializable = { ...data } as AnalysisData;
        const images = { ...data.images } as AnalysisData["images"];
        const conversions: Promise<void>[] = [];

        (Object.keys(images) as Array<keyof typeof images>).forEach((key) => {
          const value = images[key] as unknown;
          const maybeFile = value as File | string | null | undefined;
          if (maybeFile && typeof maybeFile !== "string" && typeof (maybeFile as any).arrayBuffer === "function") {
            conversions.push(
              fileToBase64(maybeFile as File).then((b64) => {
                (images as any)[key] = b64;
              })
            );
          }
        });

        if (conversions.length) {
          await Promise.all(conversions);
        }
        (serializable as any).images = images;

        if (typeof window !== "undefined") {
          localStorage.setItem("pendingAnalysisData", JSON.stringify(serializable));
        }
      } catch (e) {
        // non-fatal
      }
      const nextUrl = encodeURIComponent("/analyze?resume=1&autostart=1");
      router.push(`/login?next=${nextUrl}`);
      return;
    }
    setIsAnalyzing(true);
    setProgress(0);
    setSubmissionStatus("idle");

    try {
      const { images, ...formValues } = data;

      const response = await submitAnalysisForm(
        formValues,
        images.left,
        images.front,
        images.right
      );

      if (response.ok) {
        setProgress(100);
        setSubmissionStatus("success");
        await onSubmit(response);
      } else {
        throw new Error("Server returned ok: false");
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Submission failed in SubmitStep:", error);

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

  // Auto-start analysis when requested (used after login redirect)
  useEffect(() => {
    if (autoStart && !isAnalyzing) {
      // Delay slightly to ensure restored state is present
      const t = setTimeout(() => {
        startAnalysis();
      }, 300);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  return (
    <div className="space-y-8 text-center">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Ready to Analyze
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready for Your{" "}
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Personalized Analysis?
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Click the button below to submit your information and generate your
          custom skincare and wellness report powered by AI.
        </p>
      </div>

      {/* Analysis Card */}
      <Card className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <CardContent className="p-0">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">AI Skin Analysis</h3>
            </div>
            <p className="text-green-100">
              Our advanced AI will analyze your skin and create a personalized routine
            </p>
          </div>

          {/* Card Content */}
          <div className="p-8 flex flex-col items-center justify-center">
            {isAnalyzing ? (
              <div className="w-full max-w-md">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Loader2 className="h-24 w-24 text-green-600 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Analyzing Your Skin...
                  </p>
                  <p className="text-gray-500 mb-6">
                    Our AI is processing your photos and information. This will only take a moment.
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Processing...</span>
                    <span className="font-semibold text-green-600">{progress}% Complete</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Button
                  onClick={startAnalysis}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-bold"
                >
                  <Sparkles className="h-6 w-6 mr-3" />
                  Start AI Analysis
                </Button>

                {submissionStatus === "success" && (
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="flex items-center justify-center gap-3 text-green-700 font-semibold">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-lg">Analysis completed successfully!</span>
                    </div>
                    <p className="text-green-600 mt-2">Redirecting to your personalized report...</p>
                  </div>
                )}
                
                {submissionStatus === "error" && (
                  <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-200">
                    <div className="flex items-center justify-center gap-3 text-red-700 font-semibold">
                      <XCircle className="w-6 h-6" />
                      <span className="text-lg">Analysis failed. Please try again.</span>
                    </div>
                    <p className="text-red-600 mt-2">Check your connection and try submitting again.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white mx-auto mb-3">
            <Brain className="h-6 w-6" />
          </div>
          <div className="text-sm font-semibold text-gray-900 mb-1">AI-Powered</div>
          <div className="text-xs text-gray-600">Advanced algorithms analyze your skin</div>
        </div>
        
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white mx-auto mb-3">
            <Zap className="h-6 w-6" />
          </div>
          <div className="text-sm font-semibold text-gray-900 mb-1">Fast Results</div>
          <div className="text-xs text-gray-600">Get your report in under 40 seconds</div>
        </div>
        
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white mx-auto mb-3">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div className="text-sm font-semibold text-gray-900 mb-1">Personalized</div>
          <div className="text-xs text-gray-600">Tailored to your unique skin needs</div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Your AI analysis will provide detailed insights and a customized skincare routine</span>
        </div>
      </div>
    </div>
  );
}

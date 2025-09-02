"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import type { AnalysisData } from "../page";
import CameraCapture from "../../../components/LandingPage/camera-capture";

interface UploadSelfiesStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const instructions = [
  {
    title: "Stand in well-lit area",
    description: "Natural lighting works best for accurate analysis",
    icon: "💡",
    color: "from-yellow-500 to-orange-600"
  },
  {
    title: "Remove makeup and glasses",
    description: "Clean face helps our AI see your natural skin",
    icon: "🧼",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Keep face straight and visible",
    description: "Look directly at the camera for best results",
    icon: "📸",
    color: "from-purple-500 to-pink-600"
  },
];

const photoTypes = [
  {
    key: "left" as const,
    label: "Left Side",
    description: "Turn your head to the right",
    icon: "👈",
    color: "from-blue-500 to-blue-600"
  },
  {
    key: "front" as const,
    label: "Front Face",
    description: "Look straight at the camera",
    icon: "😊",
    color: "from-purple-500 to-purple-600"
  },
  {
    key: "right" as const,
    label: "Right Side",
    description: "Turn your head to the left",
    icon: "👉",
    color: "from-green-500 to-green-600"
  },
];

export default function UploadSelfiesStep({
  data,
  updateData,
}: UploadSelfiesStepProps) {
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const autoAdvanceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoAdvance = () => {
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
    }
    autoAdvanceIntervalRef.current = setInterval(() => {
      setCurrentInstruction((prev) => (prev + 1) % instructions.length);
    }, 5000); // Auto-advance every 5 seconds
  };

  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current);
      }
    };
  }, []);

  const handleImageCapture = (
    type: keyof typeof data.images,
    fileOrBase64: File | string | null
  ) => {
    updateData({
      images: {
        ...data.images,
        [type]: fileOrBase64,
      },
    });
  };

  const handleManualNavigation = (direction: "prev" | "next") => {
    if (direction === "next") {
      setCurrentInstruction((prev) => (prev + 1) % instructions.length);
    } else {
      setCurrentInstruction(
        (prev) => (prev - 1 + instructions.length) % instructions.length
      );
    }
    resetAutoAdvance(); // Reset timer on manual interaction
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
          <Camera className="h-4 w-4" />
          Photo Upload
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Capture Your Photos
        </h2>
        <p className="text-gray-600">
          Clear photos help our AI provide the most accurate skin analysis and recommendations.
        </p>
      </div>

      {/* Enhanced Instructions Carousel */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleManualNavigation("prev")}
              className="text-pink-600 hover:bg-pink-100 p-2 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${instructions[currentInstruction].color} rounded-2xl text-white shadow-lg`}>
                  <span className="text-2xl">{instructions[currentInstruction].icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {instructions[currentInstruction].title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {instructions[currentInstruction].description}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleManualNavigation("next")}
              className="text-pink-600 hover:bg-pink-100 p-2 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-3">
            {instructions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentInstruction
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photoTypes.map((photo) => (
          <div key={photo.key} className="relative">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              
              <CameraCapture
                label={photo.label}
                description={photo.description}
                initialImage={data.images[photo.key]}
                onCapture={(fileOrBase64: string | File | null) =>
                  handleImageCapture(photo.key, fileOrBase64)
                }
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AnalysisData } from "../page";
import CameraCapture from "../../../components/camera-capture";

interface UploadSelfiesStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const instructions = [
  {
    title: "Stand in well-lit area",
    description: "Natural lighting works best for accurate analysis",
  },
  {
    title: "Remove makeup and glasses",
    description: "Clean face helps our AI see your natural skin",
  },
  {
    title: "Keep face straight and visible",
    description: "Look directly at the camera for best results",
  },
];

const photoTypes = [
  {
    key: "left" as const,
    label: "Left Side",
    description: "Turn your head to the right",
  },
  {
    key: "front" as const,
    label: "Front Face",
    description: "Look straight at the camera",
  },
  {
    key: "right" as const,
    label: "Right Side",
    description: "Turn your head to the left",
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
        [type]: fileOrBase64, // Can now handle both File objects and base64 strings
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
      {/* Instructions Carousel */}
      <Card className="border-purple-100 bg-gradient-to-r from-purple-50/50 to-pink-50/30 animate-glass-pulse">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleManualNavigation("prev")}
              className="text-purple-600 hover:bg-purple-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="text-center flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {instructions[currentInstruction].title}
              </h3>
              <p className="text-gray-600">
                {instructions[currentInstruction].description}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleManualNavigation("next")}
              className="text-purple-600 hover:bg-purple-100"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {instructions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentInstruction
                    ? "bg-purple-accent"
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
          <CameraCapture
            key={photo.key}
            label={photo.label}
            description={photo.description}
            initialImage={data.images[photo.key]}
            onCapture={(fileOrBase64: string | File | null) =>
              handleImageCapture(photo.key, fileOrBase64)
            }
          />
        ))}
      </div>
    </div>
  );
}

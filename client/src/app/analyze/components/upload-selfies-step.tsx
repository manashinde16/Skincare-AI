"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import type { AnalysisData } from "../page";

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
    key: "front" as const,
    label: "Front Face",
    description: "Look straight at the camera",
  },
  {
    key: "left" as const,
    label: "Left Side",
    description: "Turn your head to the right",
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
  const fileInputRefs = {
    front: useRef<HTMLInputElement>(null),
    left: useRef<HTMLInputElement>(null),
    right: useRef<HTMLInputElement>(null),
  };

  const handleFileUpload = (type: keyof typeof data.images, file: File) => {
    updateData({
      images: {
        ...data.images,
        [type]: file,
      },
    });
  };

  const triggerFileInput = (type: keyof typeof data.images) => {
    fileInputRefs[type].current?.click();
  };

  const nextInstruction = () => {
    setCurrentInstruction((prev) => (prev + 1) % instructions.length);
  };

  const prevInstruction = () => {
    setCurrentInstruction(
      (prev) => (prev - 1 + instructions.length) % instructions.length
    );
  };

  return (
    <div className="space-y-8">
      {/* Instructions Carousel */}
      <Card className="border-purple-100 bg-gradient-to-r from-purple-50/50 to-pink-50/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevInstruction}
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
              onClick={nextInstruction}
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
                  index === currentInstruction ? "bg-purple-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photoTypes.map((photo) => (
          <div key={photo.key} className="space-y-3">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900">{photo.label}</h4>
              <p className="text-sm text-gray-600">{photo.description}</p>
            </div>

            <Card className="border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                {data.images[photo.key] ? (
                  <div className="relative">
                    <Image
                      src={
                        URL.createObjectURL(data.images[photo.key]!) ||
                        "/placeholder.svg"
                      }
                      alt={photo.label}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => triggerFileInput(photo.key)}
                      className="mt-3 w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <Button
                        onClick={() => triggerFileInput(photo.key)}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Take Selfie
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRefs[photo.key]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(photo.key, file);
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

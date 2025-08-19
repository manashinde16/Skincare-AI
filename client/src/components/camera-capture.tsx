"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, CheckCircle } from "lucide-react";
import Image from "next/image";

interface CameraCaptureProps {
  label: string;
  description: string;
  initialImage: string | File | null; // Can now handle both base64 strings and File objects
  onCapture: (file: string | File | null) => void; // Can emit either base64 string or File object
}

export default function CameraCapture({
  label,
  description,
  initialImage,
  onCapture,
}: CameraCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Handle different types of initial images
    if (initialImage) {
      if (typeof initialImage === "string") {
        // Base64 string - use directly
        setImagePreviewUrl(initialImage);
      } else if (initialImage instanceof File) {
        // File object - create object URL for preview
        const objectUrl = URL.createObjectURL(initialImage);
        setImagePreviewUrl(objectUrl);

        // Cleanup object URL when component unmounts or image changes
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setImagePreviewUrl(null);
    }
  }, [initialImage]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // For the new multipart submission, we'll pass the File object directly
      onCapture(file);
    } else {
      onCapture(null);
    }
  };

  const triggerFileInput = (captureMode?: "user" | "environment") => {
    const input = fileInputRef.current;
    if (input) {
      if (captureMode) {
        input.setAttribute("capture", captureMode);
      } else {
        input.removeAttribute("capture");
      }
      input.click();
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h4 className="font-semibold text-gray-900">{label}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <Card className="border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors animate-glass-pulse">
        <CardContent className="p-6">
          {imagePreviewUrl ? (
            <div className="relative">
              <Image
                src={imagePreviewUrl || "/placeholder.svg"}
                alt={label}
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
                onClick={() => triggerFileInput()}
                className="mt-3 w-full border-purple-200 text-purple-600 hover:bg-purple-50 opacity-100"
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
                  onClick={() => triggerFileInput()}
                  className="w-full bg-gradient-to-r from-purple-accent to-magenta-accent hover:from-purple-600 hover:to-pink-600 text-white opacity-100"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  variant="outline"
                  onClick={() => triggerFileInput("environment")}
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent opacity-100"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}

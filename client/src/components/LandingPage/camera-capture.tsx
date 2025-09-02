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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

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
        // Hint some browsers to prefer camera
        input.setAttribute("accept", "image/*;capture=camera");
      } else {
        input.removeAttribute("capture");
        input.setAttribute("accept", "image/*");
      }
      input.click();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  };

  const openCamera = async (facing: "user" | "environment") => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Fallback to file input if camera API is not available
        triggerFileInput(facing);
        return;
      }
      setCameraError(null);
      const constraints: MediaStreamConstraints = {
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setCameraOpen(true);
      // Attach to video
      requestAnimationFrame(async () => {
        if (videoRef.current) {
          const video = videoRef.current;
          video.srcObject = stream;
          try {
            await video.play();
          } catch {}
          // Wait until metadata is loaded to ensure dimensions are available
          if (video.readyState < 2) {
            await new Promise<void>((resolve) => {
              const onLoaded = () => {
                video.removeEventListener("loadeddata", onLoaded);
                resolve();
              };
              video.addEventListener("loadeddata", onLoaded);
            });
          }
        }
      });
    } catch (e: any) {
      setCameraError(e?.message || "Unable to access camera");
      // Fallback to file input picker
      triggerFileInput(facing);
    }
  };

  const captureFromVideo = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    // Ensure we have frame data
    if (video.readyState < 2) {
      await new Promise<void>((resolve) => {
        const onLoaded = () => {
          video.removeEventListener("loadeddata", onLoaded);
          resolve();
        };
        video.addEventListener("loadeddata", onLoaded);
      });
    }
    const canvas = document.createElement("canvas");
    let width = video.videoWidth;
    let height = video.videoHeight;
    if (!width || !height) {
      const track = streamRef.current?.getVideoTracks()[0];
      const settings = track?.getSettings();
      width = settings?.width || 720;
      height = settings?.height || 720;
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        onCapture(file);
      }
      stopCamera();
    }, "image/jpeg", 0.95);
  };

  const clearPhoto = () => {
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onCapture(null);
  };

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h4 className="font-semibold text-gray-900">{label}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <Card className="border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors animate-glass-pulse">
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
                             <div className="mt-3 space-y-2">
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => openCamera("environment")}
                   className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                 >
                   Retake
                 </Button>
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={clearPhoto}
                   className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                 >
                   Delete
                 </Button>
               </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <Button
                onClick={() => openCamera("environment")}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
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

      {cameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-4 shadow-2xl">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} className="w-full h-full object-contain" playsInline muted />
            </div>
            {cameraError && (
              <p className="text-red-600 text-sm mt-2">{cameraError}</p>
            )}
            <div className="flex gap-3 mt-4">
              <Button onClick={captureFromVideo} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">Capture</Button>
              <Button variant="outline" onClick={stopCamera} className="flex-1">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

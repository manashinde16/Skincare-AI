"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Sparkles,
  Sun,
  Moon,
  Droplet,
  FlaskConical,
  CloverIcon as Cream,
  SunMedium,
  Eye,
} from "lucide-react";

// --- Data Structures (matching expected backend response for products) ---
interface ProductRecommendation {
  id: number; // Added for compatibility with existing ProductCard
  name: string;
  image: string; // Base64 or URL
  usage: string; // Corresponds to 'howToUse' in backend response
  ingredients: string[]; // Corresponds to 'keyIngredients'
  link: string;
}

interface RoutineStepFromBackend {
  title: string;
  description: string;
  products: ProductRecommendation[]; // Assuming backend provides this array of products
}

interface BackendFullResponse {
  morningRoutine: RoutineStepFromBackend[];
  nightRoutine: RoutineStepFromBackend[];
  lifestyle: {
    do: string[];
    dont: string[];
    tips: string[];
  };
  analysis: string;
}

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>

    {/* Routine Toggle Skeleton */}
    <div className="flex justify-center mb-12">
      <div className="flex space-x-4 p-1 rounded-full bg-gray-200 w-64 h-12"></div>
    </div>

    {/* Routine Sections Skeleton */}
    {[...Array(2)].map((_, sectionIndex) => (
      <div key={`section-skeleton-${sectionIndex}`} className="space-y-16">
        <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[...Array(4)].map((_, stepIndex) => (
            <div
              key={`step-card-skeleton-${sectionIndex}-${stepIndex}`}
              className="p-4 rounded-lg border border-gray-200 bg-gray-100 shadow-sm flex flex-col items-center text-center h-48"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
              <div className="h-8 bg-gray-300 rounded-full w-24 mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// --- Product Card Component (Reused and adapted) ---
interface ProductCardProps {
  product: ProductRecommendation;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Card className="flex-shrink-0 w-[280px] sm:w-[300px] snap-center mx-2 border-purple-100/50 shadow-md hover:shadow-lg transition-shadow flex flex-col bg-white/80 backdrop-blur-sm animate-glass-pulse">
    <CardHeader className="p-4 pb-0">
      <Image
        src={
          product.image || "/placeholder.svg?height=200&width=200&text=Product"
        }
        alt={product.name}
        width={180}
        height={180}
        className="w-full h-40 object-contain rounded-lg mb-2"
      />
      <CardTitle className="text-lg font-semibold text-gray-900">
        {product.name}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-2 space-y-2 flex-grow">
      <p className="text-sm text-gray-600 line-clamp-3">{product.usage}</p>
      <div className="flex flex-wrap gap-2">
        {product.ingredients.map((ingredient, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="bg-purple-50 text-purple-600"
          >
            {ingredient}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0 mt-auto">
      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <Button className="w-full bg-gradient-to-r from-purple-accent to-magenta-accent hover:from-purple-600 hover:to-pink-600 text-white">
          View Product
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

// --- Main Routine Page Component ---
export default function RoutinePage() {
  const [reportContent, setReportContent] =
    useState<BackendFullResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRoutine, setActiveRoutine] = useState<"morning" | "night">(
    "morning"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("skincareReportData");
      if (storedData) {
        try {
          const parsedData: BackendFullResponse = JSON.parse(storedData);
          setReportContent(parsedData);
        } catch (e) {
          console.error("Failed to parse report data from localStorage:", e);
          setError(
            "Failed to load your personalized routine. Please try the analysis again."
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setError(
          "No routine data found. Please complete the skin analysis form."
        );
        setIsLoading(false);
      }
    }
  }, []);

  const currentRoutine =
    reportContent && activeRoutine === "morning"
      ? reportContent.morningRoutine
      : reportContent?.nightRoutine;

  const handleToggle = (routine: "morning" | "night") => {
    if (activeRoutine === routine) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveRoutine(routine);
      setIsTransitioning(false);
    }, 300); // Match CSS transition duration
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50 p-4 md:p-8 font-sans">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 relative w-full">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50">
        <Card className="p-8 text-center shadow-lg border-red-200 bg-red-50/30">
          <h2 className="text-2xl font-bold mb-4 text-red-700">
            Error Loading Routine
          </h2>
          <p className="text-red-600">{error}</p>
          <Link href="/analyze">
            <Button className="mt-6 bg-gradient-to-r from-lavender-500 to-pink-500 text-white shadow-md hover:from-lavender-600 hover:to-pink-600 transition-all duration-300">
              Go to Analysis
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!reportContent || !currentRoutine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50">
        <Card className="p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            No Routine Available
          </h2>
          <p className="text-gray-600">
            Please complete the analysis form first to get your personalized
            routine.
          </p>
          <Link href="/analyze">
            <Button className="mt-6 bg-gradient-to-r from-lavender-500 to-pink-500 text-white shadow-md hover:from-lavender-600 hover:to-pink-600 transition-all duration-300">
              Go to Analysis
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header remains the same */}
      <div className="border-b border-purple-100/50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-400">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skincare AI
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content with Split Background */}
      <div className="flex-grow relative overflow-hidden">
        {/* Left side: White background */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white" />
        {/* Right side: Lavender gradient background */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-lavender-light/50 to-purple-50/50" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Personalized Skincare Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We’ve analyzed your skin concerns and created this simple,
              effective skincare routine just for you.
            </p>
          </div>
          {/* Routine Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 p-1 rounded-full bg-purple-50 border border-purple-100">
              <Button
                variant={activeRoutine === "morning" ? "default" : "ghost"}
                onClick={() => handleToggle("morning")}
                className={`rounded-full px-6 py-2 text-lg font-medium transition-all duration-300 ${
                  activeRoutine === "morning"
                    ? "bg-gradient-to-r from-purple-accent to-magenta-accent text-white shadow-md"
                    : "text-purple-600 hover:bg-purple-100"
                }`}
              >
                <Sun className="w-5 h-5 mr-2" />
                Morning Routine
              </Button>
              <Button
                variant={activeRoutine === "night" ? "default" : "ghost"}
                onClick={() => handleToggle("night")}
                className={`rounded-full px-6 py-2 text-lg font-medium transition-all duration-300 ${
                  activeRoutine === "night"
                    ? "bg-gradient-to-r from-purple-accent to-magenta-accent text-white shadow-md"
                    : "text-purple-600 hover:bg-purple-100"
                }`}
              >
                <Moon className="w-5 h-5 mr-2" />
                Night Routine
              </Button>
            </div>
          </div>
          {/* Dynamic Routine Sections with Transition */}
          <div
            key={activeRoutine}
            className={`space-y-16 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentRoutine.map((step, index) => (
              <div key={index} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  {" "}
                  {/* Centered step heading */}
                  <span className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
                    {/* Dynamically determine icon based on step title */}
                    {step.title.toLowerCase().includes("cleanse") && (
                      <Droplet className="w-6 h-6 text-purple-600" />
                    )}
                    {step.title.toLowerCase().includes("treat") && (
                      <FlaskConical className="w-6 h-6 text-purple-600" />
                    )}
                    {step.title.toLowerCase().includes("moisturize") && (
                      <Cream className="w-6 h-6 text-purple-600" />
                    )}
                    {step.title.toLowerCase().includes("protect") && (
                      <SunMedium className="w-6 h-6 text-purple-600" />
                    )}
                    {step.title.toLowerCase().includes("eye care") && (
                      <Eye className="w-6 h-6 text-purple-600" />
                    )}
                    {step.title.toLowerCase().includes("spot treatment") && (
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    )}
                  </span>
                  Step {index + 1}: {step.title}
                </h2>
                <div className="relative">
                  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 justify-center">
                    {" "}
                    {/* Centered product cards */}
                    {step.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

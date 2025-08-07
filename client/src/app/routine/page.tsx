"use client";

import type React from "react";

import { useState } from "react";
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

// --- Data Structures ---
interface Product {
  id: number;
  name: string;
  image: string;
  usage: string;
  ingredients: string[];
  link: string;
}

interface RoutineStep {
  title: string;
  icon: React.ReactNode; // Icon for the step
  products: Product[];
}

interface RoutineData {
  label: string;
  icon: React.ReactNode;
  steps: RoutineStep[];
}

// --- Dummy Data for Routines (Updated to 1-3 products per step) ---
const morningRoutineData: RoutineData = {
  label: "Morning Routine",
  icon: <span className="text-2xl">🌤️</span>,
  steps: [
    {
      title: "Cleanse",
      icon: <Droplet className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Gentle Hydrating Cleanser",
          image: "/placeholder.svg?height=200&width=200&text=Cleanser",
          usage:
            "Apply a small amount to damp skin, massage gently, then rinse thoroughly.",
          ingredients: ["Hyaluronic Acid", "Ceramides"],
          link: "#",
        },
        {
          id: 2,
          name: "Foaming Facial Cleanser",
          image: "/placeholder.svg?height=200&width=200&text=Foaming+Cleanser",
          usage:
            "Lather with water, cleanse face, and rinse. Ideal for oily skin.",
          ingredients: ["Niacinamide", "Salicylic Acid"],
          link: "#",
        },
      ],
    },
    {
      title: "Treat",
      icon: <FlaskConical className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Vitamin C Brightening Serum",
          image: "/placeholder.svg?height=200&width=200&text=Vitamin+C+Serum",
          usage:
            "After cleansing, apply 3-4 drops to face and neck. Pat gently until absorbed.",
          ingredients: ["Ascorbic Acid", "Ferulic Acid"],
          link: "#",
        },
      ],
    },
    {
      title: "Moisturize",
      icon: <Cream className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Lightweight Hydrating Moisturizer",
          image: "/placeholder.svg?height=200&width=200&text=Light+Moisturizer",
          usage: "Apply a small amount to face and neck after serum.",
          ingredients: ["Glycerin", "Squalane"],
          link: "#",
        },
        {
          id: 2,
          name: "Oil-Free Gel Moisturizer",
          image: "/placeholder.svg?height=200&width=200&text=Gel+Moisturizer",
          usage: "Ideal for oily and combination skin. Absorbs quickly.",
          ingredients: ["Hyaluronic Acid", "Aloe Vera"],
          link: "#",
        },
      ],
    },
    {
      title: "Protect",
      icon: <SunMedium className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Broad Spectrum SPF 50",
          image: "/placeholder.svg?height=200&width=200&text=SPF+50",
          usage: "Apply generously as the last step of your morning routine.",
          ingredients: ["Zinc Oxide", "Titanium Dioxide"],
          link: "#",
        },
      ],
    },
  ],
};

const nightRoutineData: RoutineData = {
  label: "Night Routine",
  icon: <span className="text-2xl">🌙</span>,
  steps: [
    {
      title: "Double Cleanse",
      icon: <Droplet className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Deep Cleansing Oil",
          image: "/placeholder.svg?height=200&width=200&text=Cleansing+Oil",
          usage:
            "Massage onto dry skin to dissolve makeup and impurities, then rinse with water.",
          ingredients: ["Jojoba Oil", "Polysorbate 80"],
          link: "#",
        },
        {
          id: 2,
          name: "Gentle Hydrating Cleanser",
          image: "/placeholder.svg?height=200&width=200&text=Cleanser",
          usage:
            "Apply a small amount to damp skin, massage gently, then rinse thoroughly.",
          ingredients: ["Hyaluronic Acid", "Ceramides"],
          link: "#",
        },
      ],
    },
    {
      title: "Treat",
      icon: <FlaskConical className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Retinol Night Serum",
          image: "/placeholder.svg?height=200&width=200&text=Retinol+Serum",
          usage:
            "Apply a thin layer to clean, dry skin 2-3 times a week, gradually increasing frequency.",
          ingredients: ["Retinol", "Squalane"],
          link: "#",
        },
        {
          id: 2,
          name: "AHA/BHA Exfoliating Serum",
          image: "/placeholder.svg?height=200&width=200&text=Exfoliating+Serum",
          usage: "Use 2-3 times a week on clean skin to exfoliate.",
          ingredients: ["Glycolic Acid", "Salicylic Acid"],
          link: "#",
        },
      ],
    },
    {
      title: "Eye Care",
      icon: <Eye className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Restorative Eye Cream",
          image: "/placeholder.svg?height=200&width=200&text=Eye+Cream",
          usage: "Gently dab a pea-sized amount around the orbital bone.",
          ingredients: ["Peptides", "Caffeine"],
          link: "#",
        },
      ],
    },
    {
      title: "Moisturize",
      icon: <Cream className="w-6 h-6 text-purple-600" />,
      products: [
        {
          id: 1,
          name: "Restorative Night Cream",
          image: "/placeholder.svg?height=200&width=200&text=Night+Cream",
          usage: "Apply a generous amount to face and neck as the final step.",
          ingredients: ["Ceramides", "Peptides", "Hyaluronic Acid"],
          link: "#",
        },
        {
          id: 2,
          name: "Sleeping Mask",
          image: "/placeholder.svg?height=200&width=200&text=Sleeping+Mask",
          usage: "Apply a thick layer as the last step. Rinse in the morning.",
          ingredients: ["Squalane", "Niacinamide"],
          link: "#",
        },
      ],
    },
    {
      title: "Spot Treatment",
      icon: <Sparkles className="w-6 h-6 text-purple-600" />, // Reusing Sparkles for spot treatment
      products: [
        {
          id: 1,
          name: "Acne Spot Treatment",
          image: "/placeholder.svg?height=200&width=200&text=Acne+Spot",
          usage: "Apply a thin layer directly to blemishes as needed.",
          ingredients: ["Salicylic Acid", "Tea Tree Oil"],
          link: "#",
        },
        {
          id: 2,
          name: "Pimple Patch",
          image: "/placeholder.svg?height=200&width=200&text=Pimple+Patch",
          usage: "Apply patch to clean, dry blemish overnight.",
          ingredients: ["Hydrocolloid"],
          link: "#",
        },
      ],
    },
  ],
};

// --- Product Card Component (Reused and adapted) ---
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Card className="flex-shrink-0 w-[280px] sm:w-[300px] snap-center mx-2 border-purple-100/50 shadow-md hover:shadow-lg transition-shadow flex flex-col bg-white/80 backdrop-blur-sm animate-glass-pulse">
    <CardHeader className="p-4 pb-0">
      <Image
        src={product.image || "/placeholder.svg"}
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
  const [activeRoutine, setActiveRoutine] = useState<"morning" | "night">(
    "morning"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentRoutine =
    activeRoutine === "morning" ? morningRoutineData : nightRoutineData;

  const handleToggle = (routine: "morning" | "night") => {
    if (activeRoutine === routine) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveRoutine(routine);
      setIsTransitioning(false);
    }, 300); // Match CSS transition duration
  };

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
            className={`space-y-16 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentRoutine.steps.map((step, index) => (
              <div key={index} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  {" "}
                  {/* Centered step heading */}
                  <span className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
                    {step.icon}
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

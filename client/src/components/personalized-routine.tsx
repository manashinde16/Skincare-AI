"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Droplet,
  FlaskConical,
  SunMedium,
  Eye,
  CloverIcon as Cream,
} from "lucide-react"; // Re-added Cream and Eye icons
import Link from "next/link";

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
  icon: React.ReactNode;
  products: Product[]; // Will contain only one product for this design
  microcopy: string;
}

interface RoutineData {
  label: string;
  icon: React.ReactNode;
  steps: RoutineStep[];
}

const morningRoutineData: RoutineData = {
  label: "Morning Routine",
  icon: <Sun className="w-5 h-5 mr-2" />,
  steps: [
    {
      title: "Cleanse",
      icon: <Droplet className="w-6 h-6 text-lavender-600" />,
      microcopy: "Removes impurities and preps your skin for the day.",
      products: [
        {
          id: 1,
          name: "Gentle Hydrating Cleanser",
          image: "/placeholder.svg?height=200&width=200&text=Cleanser",
          usage:
            "A mild, hydrating cleanser that removes impurities without stripping natural oils.",
          ingredients: ["Hyaluronic Acid", "Ceramides"],
          link: "#",
        },
      ],
    },
    {
      title: "Treat",
      icon: <FlaskConical className="w-6 h-6 text-lavender-600" />,
      microcopy: "Targets specific concerns like brightening or anti-aging.",
      products: [
        {
          id: 1,
          name: "Vitamin C Brightening Serum",
          image: "/placeholder.svg?height=200&width=200&text=Vitamin+C+Serum",
          usage:
            "A potent serum to brighten skin tone and reduce hyperpigmentation.",
          ingredients: ["Ascorbic Acid", "Ferulic Acid"],
          link: "#",
        },
      ],
    },
    {
      title: "Moisturize",
      icon: <Cream className="w-6 h-6 text-lavender-600" />, // Using Cream icon
      microcopy: "Hydrates and nourishes your skin, locking in moisture.",
      products: [
        {
          id: 1,
          name: "Lightweight Hydrating Moisturizer",
          image: "/placeholder.svg?height=200&width=200&text=Light+Moisturizer",
          usage:
            "A non-greasy formula providing all-day hydration and comfort.",
          ingredients: ["Glycerin", "Squalane"],
          link: "#",
        },
      ],
    },
    {
      title: "Protect",
      icon: <SunMedium className="w-6 h-6 text-lavender-600" />,
      microcopy:
        "Shields your skin from UV damage and environmental stressors.",
      products: [
        {
          id: 1,
          name: "Broad Spectrum SPF 50",
          image: "/placeholder.svg?height=200&width=200&text=SPF+50",
          usage:
            "Essential daily protection against UVA/UVB rays, non-comedogenic.",
          ingredients: ["Zinc Oxide", "Titanium Dioxide"],
          link: "#",
        },
      ],
    },
  ],
};

const nightRoutineData: RoutineData = {
  label: "Night Routine",
  icon: <Moon className="w-5 h-5 mr-2" />,
  steps: [
    {
      title: "Double Cleanse",
      icon: <Droplet className="w-6 h-6 text-lavender-600" />,
      microcopy: "Removes makeup and deep cleanses for a fresh start.",
      products: [
        {
          id: 1,
          name: "Deep Cleansing Oil",
          image: "/placeholder.svg?height=200&width=200&text=Cleansing+Oil",
          usage:
            "Dissolves makeup and impurities, leaving skin soft and clean.",
          ingredients: ["Jojoba Oil", "Polysorbate 80"],
          link: "#",
        },
      ],
    },
    {
      title: "Treat",
      icon: <FlaskConical className="w-6 h-6 text-lavender-600" />,
      microcopy:
        "Applies active ingredients for repair and regeneration overnight.",
      products: [
        {
          id: 1,
          name: "Retinol Night Serum",
          image: "/placeholder.svg?height=200&width=200&text=Retinol+Serum",
          usage:
            "Promotes cell turnover, reducing fine lines and improving texture.",
          ingredients: ["Retinol", "Squalane"],
          link: "#",
        },
      ],
    },
    {
      title: "Eye Care",
      icon: <Eye className="w-6 h-6 text-lavender-600" />, // Using Eye icon
      microcopy: "Nourishes the delicate skin around your eyes.",
      products: [
        {
          id: 1,
          name: "Restorative Eye Cream",
          image: "/placeholder.svg?height=200&width=200&text=Eye+Cream",
          usage:
            "Reduces puffiness and dark circles, deeply hydrating the eye area.",
          ingredients: ["Peptides", "Caffeine"],
          link: "#",
        },
      ],
    },
    {
      title: "Moisturize",
      icon: <Cream className="w-6 h-6 text-lavender-600" />, // Using Cream icon
      microcopy: "Hydrates and nourishes your skin while you sleep.",
      products: [
        {
          id: 1,
          name: "Restorative Night Cream",
          image: "/placeholder.svg?height=200&width=200&text=Night+Cream",
          usage:
            "Rich cream that repairs and replenishes skin barrier overnight.",
          ingredients: ["Ceramides", "Peptides", "Hyaluronic Acid"],
          link: "#",
        },
      ],
    },
  ],
};

export default function PersonalizedRoutine() {
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
    <section className="py-20 relative bg-gradient-to-br from-pink-50/30 via-white/60 to-lavender-50/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Your Personalized Routine
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Morning and Night routines made just for your skin
          </p>

          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={activeRoutine === "morning" ? "default" : "outline"}
              onClick={() => handleToggle("morning")}
              className={`rounded-full px-6 py-2 ${
                activeRoutine === "morning"
                  ? "bg-gradient-to-r from-lavender-500 to-pink-500 text-white"
                  : "border-lavender-200 text-lavender-600 hover:bg-lavender-50"
              }`}
            >
              {morningRoutineData.icon}
              Morning
            </Button>
            <Button
              variant={activeRoutine === "night" ? "default" : "outline"}
              onClick={() => handleToggle("night")}
              className={`rounded-full px-6 py-2 ${
                activeRoutine === "night"
                  ? "bg-gradient-to-r from-lavender-500 to-pink-500 text-white"
                  : "border-lavender-200 text-lavender-600 hover:bg-lavender-50"
              }`}
            >
              {nightRoutineData.icon}
              Night
            </Button>
          </div>
        </div>

        <div
          key={activeRoutine} // Key change triggers re-mount and animation
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {currentRoutine.steps.map((step, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-lavender-100/50 bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-lavender-100 rounded-full mb-2">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                  {step.microcopy}
                </p>
                {step.products.length > 0 && (
                  <>
                    <p className="text-gray-800 font-medium text-sm mt-2 line-clamp-1">
                      {step.products[0].name}
                    </p>
                    <Link
                      href={step.products[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="link"
                        className="text-lavender-600 hover:text-lavender-700 text-sm p-0 h-auto mt-2"
                      >
                        View Product
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

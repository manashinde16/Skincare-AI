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
  Zap,
  Clock,
} from "lucide-react";
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
  products: Product[];
  microcopy: string;
  time: string;
  color: string;
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
      icon: <Droplet className="w-6 h-6 text-blue-600" />,
      microcopy: "Removes impurities and preps your skin for the day.",
      time: "2 min",
      color: "from-blue-500 to-blue-600",
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
      icon: <FlaskConical className="w-6 h-6 text-purple-600" />,
      microcopy: "Targets specific concerns like brightening or anti-aging.",
      time: "1 min",
      color: "from-purple-500 to-purple-600",
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
      icon: <Cream className="w-6 h-6 text-green-600" />,
      microcopy: "Hydrates and nourishes your skin, locking in moisture.",
      time: "1 min",
      color: "from-green-500 to-green-600",
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
      icon: <SunMedium className="w-6 h-6 text-orange-600" />,
      microcopy:
        "Shields your skin from UV damage and environmental stressors.",
      time: "1 min",
      color: "from-orange-500 to-orange-600",
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
      icon: <Droplet className="w-6 h-6 text-blue-600" />,
      microcopy: "Removes makeup and deep cleanses for a fresh start.",
      time: "3 min",
      color: "from-blue-500 to-blue-600",
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
      icon: <FlaskConical className="w-6 h-6 text-purple-600" />,
      microcopy:
        "Applies active ingredients for repair and regeneration overnight.",
      time: "1 min",
      color: "from-purple-500 to-purple-600",
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
      icon: <Eye className="w-6 h-6 text-pink-600" />,
      microcopy: "Nourishes the delicate skin around your eyes.",
      time: "1 min",
      color: "from-pink-500 to-pink-600",
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
      icon: <Cream className="w-6 h-6 text-green-600" />,
      microcopy: "Hydrates and nourishes your skin while you sleep.",
      time: "1 min",
      color: "from-green-500 to-green-600",
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
    }, 300);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Personalized Routines
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Personalized Routine
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Morning and Night routines made just for your skin, optimized by AI for maximum results
          </p>

          {/* Routine Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={activeRoutine === "morning" ? "default" : "outline"}
              onClick={() => handleToggle("morning")}
              className={`rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                activeRoutine === "morning"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                  : "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:scale-105"
              }`}
            >
              {morningRoutineData.icon}
              Morning
            </Button>
            <Button
              variant={activeRoutine === "night" ? "default" : "outline"}
              onClick={() => handleToggle("night")}
              className={`rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                activeRoutine === "night"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                  : "border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:bg-purple-50 hover:scale-105"
              }`}
            >
              {nightRoutineData.icon}
              Night
            </Button>
          </div>
        </div>

        {/* Routine Steps */}
        <div
          key={activeRoutine}
          className={`transition-all duration-500 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {currentRoutine.steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Header */}
                <div className={`p-6 bg-gradient-to-br ${step.color} text-white text-center`}>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{step.time}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {step.microcopy}
                  </p>
                  
                  {step.products.length > 0 && (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <p className="text-gray-800 font-semibold text-sm mb-1">
                          {step.products[0].name}
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {step.products[0].usage}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {step.products[0].ingredients.slice(0, 2).map((ingredient, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={step.products[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-sm"
                        >
                          View Product
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom meta copy (CTA removed to reduce redundancy) */}
          <div className="mt-16 text-gray-600">
            <p className="text-lg">Ready to get your personalized routine?</p>
          </div>
        </div>
      </div>
    </section>
  );
}

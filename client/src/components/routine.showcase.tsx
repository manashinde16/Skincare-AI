"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, ArrowRight } from "lucide-react";

const routines = {
  morning: [
    { step: "Cleanse", product: "Gentle Foam Cleanser", link: "#" },
    { step: "Moisturize", product: "Hydrating Day Cream", link: "#" },
    { step: "SPF", product: "Broad Spectrum SPF 50", link: "#" },
  ],
  night: [
    { step: "Cleanse", product: "Deep Cleansing Oil", link: "#" },
    { step: "Treatment", product: "Retinol Serum", link: "#" },
    { step: "Night Cream", product: "Repair Night Moisturizer", link: "#" },
  ],
};

export default function RoutineShowcase() {
  const [activeTime, setActiveTime] = useState<"morning" | "night">("morning");

  return (
    <section className="py-20 relative">
      {/* Subtle glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white/50 to-pink-50/20 backdrop-blur-[2px]" />
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Your Personalized Routine
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Morning and night routines made just for your skin
          </p>

          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={activeTime === "morning" ? "default" : "outline"}
              onClick={() => setActiveTime("morning")}
              className={`rounded-full px-6 py-2 ${
                activeTime === "morning"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Sun className="w-4 h-4 mr-2" />
              Morning
            </Button>
            <Button
              variant={activeTime === "night" ? "default" : "outline"}
              onClick={() => setActiveTime("night")}
              className={`rounded-full px-6 py-2 ${
                activeTime === "night"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-purple-200 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Moon className="w-4 h-4 mr-2" />
              Night
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {routines[activeTime].map((item, index) => (
              <Card
                key={index}
                className="border-purple-100 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                        <span className="text-purple-600 font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.step}
                        </h3>
                        <p className="text-gray-600">{item.product}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      View Product
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

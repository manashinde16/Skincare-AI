"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, ArrowRight, Clock, Zap, CheckCircle } from "lucide-react";

const routines = {
  morning: [
    { 
      step: "Cleanse", 
      product: "Gentle Foam Cleanser", 
      link: "#",
      time: "2 min",
      description: "Remove impurities and prep skin for the day",
      icon: "🧼"
    },
    { 
      step: "Moisturize", 
      product: "Hydrating Day Cream", 
      link: "#",
      time: "1 min",
      description: "Hydrate and nourish your skin",
      icon: "💧"
    },
    { 
      step: "SPF", 
      product: "Broad Spectrum SPF 50", 
      link: "#",
      time: "1 min",
      description: "Protect from UV damage",
      icon: "☀️"
    },
  ],
  night: [
    { 
      step: "Cleanse", 
      product: "Deep Cleansing Oil", 
      link: "#",
      time: "3 min",
      description: "Remove makeup and deep cleanse",
      icon: "🛁"
    },
    { 
      step: "Treatment", 
      product: "Retinol Serum", 
      link: "#",
      time: "1 min",
      description: "Target aging and texture concerns",
      icon: "✨"
    },
    { 
      step: "Night Cream", 
      product: "Repair Night Moisturizer", 
      link: "#",
      time: "1 min",
      description: "Repair and regenerate overnight",
      icon: "🌙"
    },
  ],
};

export default function RoutineShowcase() {
  const [activeTime, setActiveTime] = useState<"morning" | "night">("morning");

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-white/60 to-pink-50/30 backdrop-blur-[2px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Routine Preview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Personalized Routine
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Morning and night routines made just for your skin, optimized by AI for maximum results
          </p>

          {/* Time Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={activeTime === "morning" ? "default" : "outline"}
              onClick={() => setActiveTime("morning")}
              className={`rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                activeTime === "morning"
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                  : "border-2 border-gray-300 text-gray-700 hover:border-yellow-500 hover:bg-yellow-50 hover:scale-105"
              }`}
            >
              <Sun className="w-5 h-5 mr-2" />
              Morning
            </Button>
            <Button
              variant={activeTime === "night" ? "default" : "outline"}
              onClick={() => setActiveTime("night")}
              className={`rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                activeTime === "night"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                  : "border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:bg-purple-50 hover:scale-105"
              }`}
            >
              <Moon className="w-5 h-5 mr-2" />
              Night
            </Button>
          </div>
        </div>

        {/* Routine Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {routines[activeTime].map((item, index) => (
              <Card
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center p-6">
                    {/* Step Number and Icon */}
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-center">
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <span className="text-purple-600 font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.step}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <p className="text-gray-800 font-medium">{item.product}</p>
                    </div>
                    
                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-4 border-purple-200 text-purple-600 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group-hover:scale-105"
                    >
                      View Product
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Your Full Routine?
            </h3>
            <p className="text-gray-600 mb-6">
              Complete your free skin analysis to receive a comprehensive, personalized skincare routine tailored to your unique needs.
            </p>
            <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CheckCircle className="w-5 h-5 mr-2" />
              Get My Routine
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

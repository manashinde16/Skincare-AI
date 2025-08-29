"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, Users, Award } from "lucide-react";
import { useState, useRef } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Helped reduce my acne in just 2 weeks! The AI recommendations were spot-on and the routine was so easy to follow.",
    rating: 5,
    location: "New York, NY",
    concern: "Acne",
    improvement: "95%"
  },
  {
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "I love how I can just speak my skin concerns instead of filling out long forms. The voice feature is a game-changer!",
    rating: 5,
    location: "Mumbai, India",
    concern: "Hyperpigmentation",
    improvement: "90%"
  },
  {
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Finally found products that work for my sensitive skin. The dermatologist-backed recommendations give me confidence.",
    rating: 5,
    location: "San Francisco, CA",
    concern: "Sensitive Skin",
    improvement: "88%"
  },
  {
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "The personalized routine transformed my skincare journey. My skin has never looked better, and it's completely free!",
    rating: 5,
    location: "London, UK",
    concern: "Aging",
    improvement: "92%"
  },
  {
    name: "David Lee",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "As a guy, I never thought about skincare. This AI made it simple and effective. My skin feels great!",
    rating: 4,
    location: "Toronto, Canada",
    concern: "General Care",
    improvement: "85%"
  },
];

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            Customer Success
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why{" "}
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              People Trust Us
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join over{" "}
            <span className="font-bold text-blue-600">
              1 Million routines generated
            </span>{" "}
            and discover why we&apos;re{" "}
            <span className="font-bold text-purple-600">
              Top-rated by beauty lovers
            </span>{" "}
            worldwide.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
              <Users className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
            <div className="text-sm text-gray-600">Happy Users</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl text-white">
              <Star className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
              <Award className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 justify-start md:justify-center cursor-grab active:cursor-grabbing"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[400px] snap-center mx-2 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-300 text-yellow-300 mr-1"
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-white/60" />
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Improvement Stats */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Concern</div>
                      <div className="text-sm font-semibold text-gray-700">{testimonial.concern}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Improvement</div>
                      <div className="text-lg font-bold text-green-600">{testimonial.improvement}</div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 ring-2 ring-gray-200">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom meta copy (CTA removed to reduce redundancy) */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-lg">Ready to join our community of satisfied users?</p>
        </div>
      </div>
    </section>
  );
}

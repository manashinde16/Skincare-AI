"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useState, useRef } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Helped reduce my acne in just 2 weeks! The AI recommendations were spot-on and the routine was so easy to follow.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "I love how I can just speak my skin concerns instead of filling out long forms. The voice feature is a game-changer!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Finally found products that work for my sensitive skin. The dermatologist-backed recommendations give me confidence.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "The personalized routine transformed my skincare journey. My skin has never looked better, and it's completely free!",
    rating: 5,
  },
  {
    name: "David Lee",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "As a guy, I never thought about skincare. This AI made it simple and effective. My skin feels great!",
    rating: 4,
  },
];

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const walk = (x - startX) * 2; // The *2 is for speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="py-20 relative bg-gradient-to-br from-peach-50/30 via-white/60 to-mint-50/30 backdrop-blur-sm animate-fade-in-up">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Why People Trust Us
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join over{" "}
            <span className="font-bold text-lavender-600">
              1 Million routines generated
            </span>{" "}
            and discover why we&apos;re{" "}
            <span className="font-bold text-pink-600">
              Top-rated by beauty lovers
            </span>{" "}
            worldwide.
          </p>
        </div>

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
              className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] snap-center mx-2 bg-white/80 backdrop-blur-sm border-lavender-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-lavender-100 text-lavender-600">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

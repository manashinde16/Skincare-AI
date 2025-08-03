"use client";

import { useState } from "react";
import Image from "next/image";

const partners = [
  { name: "Amazon", logo: "/placeholder.svg?height=60&width=120&text=Amazon" },
  { name: "Nykaa", logo: "/placeholder.svg?height=60&width=120&text=Nykaa" },
  {
    name: "Flipkart",
    logo: "/placeholder.svg?height=60&width=120&text=Flipkart",
  },
  { name: "Tira", logo: "/placeholder.svg?height=60&width=120&text=Tira" },
  { name: "Sugar", logo: "/placeholder.svg?height=60&width=120&text=Sugar" },
  { name: "Plum", logo: "/placeholder.svg?height=60&width=120&text=Plum" },
  {
    name: "The Derma Co.",
    logo: "/placeholder.svg?height=60&width=120&text=Derma+Co",
  },
  {
    name: "Minimalist",
    logo: "/placeholder.svg?height=60&width=120&text=Minimalist",
  },
  {
    name: "Cetaphil",
    logo: "/placeholder.svg?height=60&width=120&text=Cetaphil",
  },
];

// Duplicate the array for seamless infinite scroll
const duplicatedPartners = [...partners, ...partners];

export default function TrustedPartners() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Trusted by Skincare Users and Beauty Brands
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of users who trust our AI-powered recommendations
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className={`flex items-center space-x-12 ${
              isPaused ? "animate-none" : "animate-scroll"
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              width: `${duplicatedPartners.length * 180}px`,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-36 h-20 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${partners.length * 180}px);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

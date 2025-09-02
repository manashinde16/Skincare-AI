"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Users, Star } from "lucide-react";

const partners = [
  { name: "Amazon", logo: "/amazon.png" },
  { name: "Nykaa", logo: "/nykaa.png" },
  {
    name: "Flipkart",
    logo: "/flipkart.png",
  },
  { name: "CeraVe", logo: "/cerave.png" },
  { name: "Sugar", logo: "/sugar.png" },
  { name: "Nivea", logo: "/nivea.png" },
  {
    name: "Lakme",
    logo: "/lakme.png",
  },
  {
    name: "Minimalist",
    logo: "/minimalist.png",
  },
  {
    name: "Cetaphil",
    logo: "/cetaphil.png" },
];

// Duplicate the array for seamless infinite scroll
const duplicatedPartners = [...partners, ...partners];

export default function TrustedPartners() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="partners" className="py-16 sm:py-20 lg:py-24 relative scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            Trusted Partners
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Millions of Users
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of users who trust our AI-powered recommendations and partner with leading skincare brands worldwide.
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
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
              <Star className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
              <Shield className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Brand Partners</div>
          </div>
        </div>

        {/* Partners Logo Section */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className={`flex items-center space-x-16 ${
              isPaused ? "animate-none" : "animate-scroll"
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              width: `${duplicatedPartners.length * 200}px`,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-40 h-24 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="max-h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom meta copy (CTA removed to reduce redundancy) */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-lg">Ready to join our trusted community?</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${partners.length * 200}px);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}

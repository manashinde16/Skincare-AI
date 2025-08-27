import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32 min-h-[calc(100vh-80px)] flex items-center justify-center">
      {/* Enhanced Gradient Blobs with premium colors */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[900px] h-[900px] rounded-full filter blur-3xl opacity-60 animate-pulse"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2))",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full filter blur-3xl opacity-60 animate-pulse"
        style={{
          background:
            "radial-gradient(circle at center, rgba(236, 72, 153, 0.3), rgba(239, 68, 68, 0.2))",
        }}
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full filter blur-3xl opacity-50 animate-pulse"
        style={{
          background:
            "radial-gradient(circle at center, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.2))",
        }}
        style={{ animationDelay: '4s' }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mx-auto max-w-5xl">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="h-4 w-4" />
            AI-Powered Skincare Analysis
          </div>

          {/* Main Heading with enhanced gradients */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Your Skin, Supercharged by
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Technology
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-600 sm:text-gray-700">
            Get your <span className="font-semibold text-gray-800">dermatologist-grade skincare routine</span> in under 40 seconds —
            completely free, powered by AI, and trusted by over{" "}
            <span className="font-semibold text-blue-600">1 million users</span> worldwide.
          </p>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              <span>40 Second Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>AI-Powered</span>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/analyze">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden hover:scale-105 animate-pulse"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Free Skin Analysis
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            
            <Link href="/signup">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-3">Trusted by leading dermatologists worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

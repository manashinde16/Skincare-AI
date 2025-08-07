import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 min-h-[calc(100vh-64px)] flex items-center justify-center pt-[80px]">
      {/* Gradient Blobs - positioned to cover full width/height and bleed off edges */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full filter blur-3xl opacity-70 animate-float-blob-1 animate-pulse-opacity-slow"
        style={{
          background:
            "radial-gradient(circle at center, rgba(239, 233, 255, 0.8), rgba(252, 231, 246, 0.6))",
        }} // Lavender-100 to Pink-100
      ></div>
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full filter blur-3xl opacity-70 animate-float-blob-2 animate-pulse-opacity-slow"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 245, 235, 0.8), rgba(255, 234, 214, 0.6))",
        }} // Peach-100 to Peach-200
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-60 animate-float-blob-3 animate-pulse-opacity-slow"
        style={{
          background:
            "radial-gradient(circle at center, rgba(224, 242, 255, 0.8), rgba(186, 230, 253, 0.6))",
        }} // Sky-100 to Sky-200
      ></div>
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-60 animate-float-blob-4 animate-pulse-opacity-slow"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 249, 215, 0.8), rgba(253, 230, 138, 0.6))",
        }} // Amber-100 to Amber-200
      ></div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in-up">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-lavender-500 via-pink-500 to-peach-500 bg-clip-text text-transparent">
              Your Skin, Supercharged by AI
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-700 sm:text-xl">
            Get your dermatologist-grade skincare routine in under 40 seconds —
            completely free, powered by AI, and trusted by over 1 million users.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/analyze">
              <Button
                size="lg"
                className="group bg-black text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:scale-[1.02] animate-hero-button-glow"
              >
                Start Your Free Skin Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

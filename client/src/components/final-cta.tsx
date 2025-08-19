import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-lavender-500 via-pink-500 to-coral-500 animate-fade-in-up">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10" />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-white mr-2" />
          <Sparkles className="w-6 h-6 text-white/80" />
          <Sparkles className="w-4 h-4 text-white/60 ml-2" />
        </div>

        <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
          Transform Your Skin in Under 40 Seconds
        </h2>

        <p className="text-xl text-white/90 mb-10 leading-relaxed">
          AI-powered routines, completely free, no signup required.
        </p>

        <Link href="/analyze">
          <Button
            size="lg"
            className="bg-white text-lavender-600 hover:bg-gray-50 rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden animate-button-glow"
          >
            Start My Skin Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <p className="text-white/70 mt-6 text-sm">
          No signup required • Results in 3 minutes • Always free
        </p>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
}

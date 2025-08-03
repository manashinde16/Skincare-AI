import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200&text=Pattern')] opacity-10" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-white mr-2" />
            <Sparkles className="w-6 h-6 text-white/80" />
            <Sparkles className="w-4 h-4 text-white/60 ml-2" />
          </div>

          <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
            Ready to Transform Your Skin?
          </h2>

          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Start your personalized journey today. Join over 1 million users who
            have discovered their perfect skincare routine with our AI
            assistant.
          </p>

          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-50 rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Your Free Skin Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-white/70 mt-6 text-sm">
            No signup required • Results in 3 minutes • Always free
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
}

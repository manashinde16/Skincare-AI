import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Clock, Shield } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30">
          <Sparkles className="w-5 h-5" />
          Start Your Journey Today
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Transform Your Skin in{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Under 40 Seconds
          </span>
        </h2>

        {/* Enhanced Description */}
        <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
          AI-powered routines, completely free, no signup required. Join millions of users who have already transformed their skin.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center gap-3 text-white/90">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Instant Results</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/90">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">100% Free</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/90">
            <div className="p-2 bg-white/20 rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">No Signup</span>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className="mb-12">
          <Link href="/analyze">
            <Button
              size="lg"
              className="group bg-white text-blue-600 hover:bg-gray-50 rounded-full px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start My Skin Analysis
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <p className="text-white/80 mb-4 text-sm font-medium">
            Trusted by over 1 million users worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs">Dermatologist Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs">AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-white/70 mt-8 text-sm">
          No signup required • Results in under 40 seconds • Always free • Privacy protected
        </p>
      </div>
    </section>
  );
}

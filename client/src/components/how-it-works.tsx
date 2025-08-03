import { Play } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/40 via-white/60 to-pink-50/40 backdrop-blur-sm" />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              See How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch how to get your skin analysis instantly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Play className="h-8 w-8 text-purple-600 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-800">
                    3-minute demo: Upload → Analyze → Get Results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Play } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { id: 1, text: "Upload selfie" },
    { id: 2, text: "Fill skincare history" },
    { id: 3, text: "AI skin analysis" },
    { id: 4, text: "Personalized routine output" },
  ];

  return (
    <section className="py-20 relative bg-gradient-to-br from-lavender-50/30 via-white/60 to-pink-50/30 backdrop-blur-sm animate-fade-in-up">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            See How It Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Watch how to get your skin analysis instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl p-1 bg-gradient-to-br from-lavender-400/50 to-pink-400/50 backdrop-blur-md animate-glass-pulse">
            <div className="relative w-full h-full bg-white/80 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Play className="h-8 w-8 text-lavender-600 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-gray-800">
                    Watch the Flow in Action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-lavender-200 to-pink-200 rounded-full text-lavender-700 font-bold text-xl">
                {step.id}
              </div>
              <p className="text-gray-700 font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

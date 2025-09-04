import { Play, Upload, History, Brain, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { 
      id: 1, 
      text: "Upload selfie", 
      icon: Upload,
      description: "Take a clear photo of your skin",
      color: "from-blue-500 to-blue-600"
    },
    { 
      id: 2, 
      text: "Fill skincare history", 
      icon: History,
      description: "Share your current routine and concerns",
      color: "from-purple-500 to-purple-600"
    },
    { 
      id: 3, 
      text: "AI skin analysis", 
      icon: Brain,
      description: "Advanced AI analyzes your skin condition",
      color: "from-green-500 to-green-600"
    },
    { 
      id: 4, 
      text: "Personalized routine output", 
      icon: Zap,
      description: "Get your custom skincare plan",
      color: "from-pink-500 to-pink-600"
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 relative scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            <Play className="h-4 w-4" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get Your Analysis in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-accent">
              4 Simple Steps
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how to get your personalized skin analysis in under 40 seconds with our AI-powered technology.
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl p-2 bg-gradient-to-br from-blue-400/50 via-purple-400/50 to-pink-400/50 backdrop-blur-md">
            <div className="relative w-full h-full bg-white/90 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl hover:scale-110 transition-transform duration-500 cursor-pointer group">
                  <Play className="h-10 w-10 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    Watch the Flow in Action
                  </p>
                  <p className="text-sm text-gray-600">
                    See how our AI transforms your selfie into a personalized routine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="group relative animate-[fade-in-up_0.7s_ease-out_both]"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  {/* Step Number */}
                  <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-2xl text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 bg-gradient-to-br ${step.color} rounded-xl text-white shadow-lg`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {step.text}
                  </h3>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 transform -translate-y-1/2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom meta copy (CTA removed to reduce redundancy) */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-lg">Ready to transform your skincare routine?</p>
        </div>
      </div>
    </section>
  );
}

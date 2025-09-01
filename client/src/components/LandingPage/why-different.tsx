import { Brain, Palette, ShieldCheck, Lock, Star, Users, Award, Zap } from "lucide-react";

const differentiators = [
  {
    icon: Brain,
    title: "AI Trained on Dermatology-Grade Data",
    description:
      "Our AI learns from extensive, high-quality dermatological datasets, ensuring medical-grade accuracy in every recommendation.",
    color: "from-blue-500 to-blue-600",
    highlight: "Medical-Grade"
  },
  {
    icon: Palette,
    title: "Works Across All Skin Tones & Types",
    description: "Inclusive recommendations for every unique complexion, from fair to deep skin tones and all skin types.",
    color: "from-purple-500 to-purple-600",
    highlight: "Inclusive"
  },
  {
    icon: ShieldCheck,
    title: "Built with Medical Expertise",
    description: "Developed in collaboration with leading dermatologists and validated by medical professionals worldwide.",
    color: "from-green-500 to-green-600",
    highlight: "Expert-Approved"
  },
  {
    icon: Lock,
    title: "100% Free and Privacy Safe",
    description:
      "Enjoy personalized insights without any cost or data concerns. Your privacy is our top priority.",
    color: "from-orange-500 to-orange-600",
    highlight: "Free & Safe"
  },
];

export default function WhyDifferent() {
  return (
    <section id="why" className="py-16 sm:py-20 lg:py-24 relative scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why We&apos;re{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Different
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a new standard in personalized skincare with our unique approach that combines cutting-edge AI with medical expertise.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Highlight Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 mb-4">
                  {item.highlight}
                </div>
                
                {/* Icon */}
                <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${item.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-10 h-10" />
                </div>
                
                {/* Title and Description */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Traditional vs. AI-Powered Skincare
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-900">Traditional Approach</h4>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Generic recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Expensive consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Long waiting times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Limited accessibility</span>
                  </li>
                </ul>
              </div>
              
              {/* AI-Powered */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-900">AI-Powered Solution</h4>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Personalized recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>100% free analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Instant results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Available 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience the difference?
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Zap className="h-5 w-5" />
            Start Free Analysis
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check, Mic, Users, Shield, Sparkles, Heart, Star, Zap, Award } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Always Free to Use",
    description: "No hidden costs or premium features locked away. Enjoy the full power of our AI completely free.",
    color: "from-red-500 to-pink-600",
    highlight: "100% Free"
  },
  {
    icon: Sparkles,
    title: "Multi-Brand Skincare Suggestions",
    description: "Get recommendations from top beauty brands worldwide, tailored to your specific needs and preferences.",
    color: "from-purple-500 to-purple-600",
    highlight: "Premium Brands"
  },
  {
    icon: Shield,
    title: "Dermatologist Logic in AI Model",
    description: "Built with medical expertise and scientific research, ensuring safe and effective recommendations.",
    color: "from-blue-500 to-blue-600",
    highlight: "Medical-Grade"
  },
  {
    icon: Mic,
    title: "First Voice-Enabled Skincare Experience",
    description: "Speak your concerns naturally, no typing required. The most intuitive way to get skincare advice.",
    color: "from-green-500 to-green-600",
    highlight: "Voice-First"
  },
  {
    icon: Users,
    title: "Trusted by 1M+ Users",
    description: "Join our growing community of skincare enthusiasts who have transformed their skin with our AI.",
    color: "from-orange-500 to-orange-600",
    highlight: "Community"
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-accent">
              AI Assistant?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of personalized skincare with our advanced AI technology that combines innovation with proven results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with icon and check */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                
                {/* Highlight Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 mb-4">
                  {feature.highlight}
                </div>
                
                {/* Title and Description */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl text-white">
              <Users className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-sm text-gray-600">Happy Users</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
              <Award className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">99.8%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
              <Zap className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">40s</div>
            <div className="text-sm text-gray-600">Analysis Time</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 border border-pink-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join millions of users who have already transformed their skincare routine with our AI-powered assistant.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Zap className="h-5 w-5" />
              Start Free Analysis
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

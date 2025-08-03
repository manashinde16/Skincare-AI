import { Check, Mic, Users, Shield, Sparkles, Heart } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Always free to use",
    description: "No hidden costs or premium features locked away",
  },
  {
    icon: Sparkles,
    title: "Multi-brand skincare suggestions",
    description: "Recommendations from top beauty brands worldwide",
  },
  {
    icon: Shield,
    title: "Dermatologist logic in AI model",
    description: "Built with medical expertise and scientific research",
  },
  {
    icon: Mic,
    title: "First voice-enabled skincare experience",
    description: "Speak your concerns naturally, no typing required",
  },
  {
    icon: Users,
    title: "Trusted by 1M+ users",
    description: "Join our growing community of skincare enthusiasts",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Why Choose Our AI Assistant?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of personalized skincare with our advanced AI
            technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-white rounded-2xl p-8 border border-purple-100/50 hover:border-purple-200 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl mr-4">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

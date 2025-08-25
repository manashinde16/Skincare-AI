import { Brain, Palette, ShieldCheck, Lock } from "lucide-react";

const differentiators = [
  {
    icon: Brain,
    title: "AI Trained on Dermatology-Grade Data",
    description:
      "Our AI learns from extensive, high-quality dermatological datasets.",
  },
  {
    icon: Palette,
    title: "Works Across All Skin Tones & Types",
    description: "Inclusive recommendations for every unique complexion.",
  },
  {
    icon: ShieldCheck,
    title: "Built with Medical Expertise",
    description: "Developed in collaboration with leading dermatologists.",
  },
  {
    icon: Lock,
    title: "100% Free and Privacy Safe",
    description:
      "Enjoy personalized insights without any cost or data concerns.",
  },
];

export default function WhyDifferent() {
  return (
    <section className="py-20 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Why We’re Different
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Experience a new standard in personalized skincare with our unique
            approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-lavender-100/50 hover:border-lavender-200 transition-all duration-300 h-full flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-lavender-200 to-pink-200 rounded-full mb-6 relative overflow-hidden">
                <item.icon className="w-8 h-8 text-lavender-700" />
                <span className="absolute inset-0 rounded-full pointer-events-none group-hover:animate-button-glow" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

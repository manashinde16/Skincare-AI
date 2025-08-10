import { Cpu, Scan, Droplet, Lightbulb } from "lucide-react";
import Image from "next/image";

const aiFeatures = [
  {
    icon: Cpu,
    title: "Trained on 10,000+ Real Skin Types",
    description:
      "Our AI's vast knowledge base ensures highly accurate analysis.",
  },
  {
    icon: Scan,
    title: "Uses Facial Feature Detection",
    description:
      "Advanced algorithms identify key areas for precise recommendations.",
  },
  {
    icon: Droplet,
    title: "Understands Sensitivity, Dryness, Acne",
    description: "Intelligent analysis of your unique skin concerns.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning & Improvement",
    description: "Our AI constantly evolves to provide the best insights.",
  },
];

export default function SkincareMeetsAI() {
  return (
    <section className="py-20 relative bg-gradient-to-br from-mint-50/30 via-white/60 to-coral-50/30 backdrop-blur-sm animate-fade-in-up">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Skincare Meets AI
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            The perfect blend of artificial intelligence, beauty, and science.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-mint-100/50 hover:border-mint-200 transition-all duration-300 h-full flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-mint-200 to-coral-200 rounded-full mb-4 relative overflow-hidden">
                <feature.icon className="w-7 h-7 text-mint-700" />
                <span className="absolute inset-0 rounded-full pointer-events-none group-hover:animate-button-glow" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div
          className="max-w-3xl mx-auto text-center animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <video
            src="/skinvideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="mx-auto rounded-xl shadow-lg border border-lavender-100/50"
            width={600}
            height={400}
          />
          <p className="text-sm text-gray-500 mt-4">
            Our AI uses advanced computer vision to understand your unique skin.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Cpu, Scan, Droplet, Lightbulb, Brain, Zap, Target, TrendingUp } from "lucide-react";
import Image from "next/image";

const aiFeatures = [
  {
    icon: Brain,
    title: "Trained on 10,000+ Real Skin Types",
    description:
      "Our AI's vast knowledge base ensures highly accurate analysis and personalized recommendations.",
    color: "from-blue-500 to-blue-600",
    stat: "10K+"
  },
  {
    icon: Scan,
    title: "Advanced Facial Feature Detection",
    description:
      "State-of-the-art algorithms identify key areas for precise, targeted recommendations.",
    color: "from-purple-500 to-purple-600",
    stat: "99.2%"
  },
  {
    icon: Target,
    title: "Intelligent Skin Concern Analysis",
    description: "Deep understanding of sensitivity, dryness, acne, and aging concerns.",
    color: "from-green-500 to-green-600",
    stat: "15+"
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning & Improvement",
    description: "Our AI constantly evolves with new data to provide cutting-edge insights.",
    color: "from-orange-500 to-orange-600",
    stat: "24/7"
  },
];

export default function SkincareMeetsAI() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            AI Technology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Skincare Meets{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            The perfect blend of artificial intelligence, beauty, and science. Experience the future of personalized skincare.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative animate-[fade-in-up_0.7s_ease-out_both]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon and Stat */}
              <div className="relative z-10 text-center">
                <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                
                {/* Stat Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 mb-4">
                  {feature.stat}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Demo Video */}
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white rounded-3xl p-2 shadow-2xl border border-gray-100">
              <video
                src="/skinvideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-2xl"
                width={800}
                height={500}
              />
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              See AI in Action
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI uses advanced computer vision and machine learning to understand your unique skin characteristics, 
              providing personalized recommendations that adapt to your skin's needs.
            </p>
          </div>
        </div>

        {/* Technology Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
              <Cpu className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">99.8%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
              <Zap className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">40s</div>
            <div className="text-sm text-gray-600">Analysis Time</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
              <Target className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Skin Concerns</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Experience the power of AI-driven skincare analysis
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Brain className="h-5 w-5" />
            Try AI Analysis
          </div>
        </div>
      </div>
    </section>
  );
}

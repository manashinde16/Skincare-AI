import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Helped reduce my acne in just 2 weeks! The AI recommendations were spot-on and the routine was so easy to follow.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "I love how I can just speak my skin concerns instead of filling out long forms. The voice feature is a game-changer!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Finally found products that work for my sensitive skin. The dermatologist-backed recommendations give me confidence.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "The personalized routine transformed my skincare journey. My skin has never looked better, and it's completely free!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-white/40 to-pink-50/20 backdrop-blur-sm" />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from real people who transformed their skin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

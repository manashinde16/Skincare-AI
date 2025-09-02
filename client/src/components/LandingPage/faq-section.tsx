"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Is this really free?",
    answer:
      "Yes, our AI skin analysis and personalized routine generation are completely free to use, with no hidden costs or subscriptions.",
    category: "Pricing"
  },
  {
    question: "Is my photo stored?",
    answer:
      "No, we do not store your photos. Your images are processed in real-time for analysis and then immediately discarded to ensure your privacy.",
    category: "Privacy"
  },
  {
    question: "How do I get my results?",
    answer:
      "After completing the quick analysis steps, your personalized skincare routine will be displayed instantly on the screen, ready for you to view and save.",
    category: "Results"
  },
  {
    question: "Can I trust this with my sensitive skin?",
    answer:
      "Absolutely. Our AI is trained on dermatology-grade data and considers various skin types, including sensitive skin, to provide gentle and effective recommendations.",
    category: "Safety"
  },
  {
    question: "What kind of products do you recommend?",
    answer:
      "We recommend a wide range of products from various trusted beauty brands, tailored to your specific skin concerns and type. We do not promote any specific brand.",
    category: "Products"
  },
  {
    question: "Do you offer medical advice?",
    answer:
      "Our AI provides personalized skincare routine recommendations based on your input. It is not a substitute for professional medical advice. Always consult a dermatologist for medical concerns.",
    category: "Medical"
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 relative scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our AI skincare assistant and get the information you need to start your skincare journey.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {["All", "Pricing", "Privacy", "Results", "Safety", "Products"].map((category) => (
            <div
              key={category}
              className="text-center p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-orange-200"
            >
              <span className="text-sm font-medium text-gray-700">{category}</span>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors px-6 py-4 group-hover:bg-orange-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="text-gray-600 leading-relaxed pl-14">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom meta copy (CTA removed to reduce redundancy) */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-lg">Still have questions? We're here to help!</p>
        </div>
      </div>
    </section>
  );
}

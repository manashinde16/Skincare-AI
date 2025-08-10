"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this really free?",
    answer:
      "Yes, our AI skin analysis and personalized routine generation are completely free to use, with no hidden costs or subscriptions.",
  },
  {
    question: "Is my photo stored?",
    answer:
      "No, we do not store your photos. Your images are processed in real-time for analysis and then immediately discarded to ensure your privacy.",
  },
  {
    question: "How do I get my results?",
    answer:
      "After completing the quick analysis steps, your personalized skincare routine will be displayed instantly on the screen, ready for you to view and save.",
  },
  {
    question: "Can I trust this with my sensitive skin?",
    answer:
      "Absolutely. Our AI is trained on dermatology-grade data and considers various skin types, including sensitive skin, to provide gentle and effective recommendations.",
  },
  {
    question: "What kind of products do you recommend?",
    answer:
      "We recommend a wide range of products from various trusted beauty brands, tailored to your specific skin concerns and type. We do not promote any specific brand.",
  },
  {
    question: "Do you offer medical advice?",
    answer:
      "Our AI provides personalized skincare routine recommendations based on your input. It is not a substitute for professional medical advice. Always consult a dermatologist for medical concerns.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about our AI skincare assistant.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-lavender-100/50 bg-white/80 backdrop-blur-sm rounded-lg mb-4 px-4 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-lavender-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

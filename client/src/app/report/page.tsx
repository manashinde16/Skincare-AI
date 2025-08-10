"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sun,
  Moon,
  CheckCircle,
  XCircle,
  Droplet,
  Bed,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Dumbbell,
  Utensils,
  Shield,
  Heart,
  Download,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { AnalysisData } from "../analyze/page";

// Define interfaces for the report structure
interface ProductRecommendation {
  name: string;
  howToUse: string;
  keyIngredients: string[];
  link: string;
  image?: string;
}

interface RoutineStep {
  title: string; // This will now only be "Cleanser / Face Wash", "Moisturizer", etc.
  description: string;
  products: ProductRecommendation[];
}

interface ReportContent {
  morningRoutine: RoutineStep[];
  nightRoutine: RoutineStep[];
  dosAndDonts: {
    eat: string[];
    avoid: string[];
    tips: string[];
  };
}

export default function ReportPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [reportContent, setReportContent] = useState<ReportContent | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("skincareAnalysisData");
      if (storedData) {
        const parsedData: AnalysisData = JSON.parse(storedData);
        setAnalysisData(parsedData);
        setReportContent(generateReportContent(parsedData));
      }
    }
  }, []);

  // Function to generate report content based on analysis data
  const generateReportContent = (data: AnalysisData): ReportContent => {
    const morningRoutine: RoutineStep[] = [];
    const nightRoutine: RoutineStep[] = [];
    const dosAndDonts = {
      eat: [
        "Hydrate well: Drink plenty of water throughout the day.",
        "Eat vitamin-rich foods: Focus on fruits, vegetables, and whole grains.",
        "Include healthy fats: Avocados, nuts, seeds, and olive oil support skin barrier.",
        "Lean proteins: Essential for skin repair and collagen production.",
      ],
      avoid: [
        "Excessive sugar and refined carbohydrates: Can contribute to inflammation and breakouts.",
        "Highly processed foods: Often lack nutrients and can contain harmful additives.",
        "Excessive dairy (if acne-prone): Some individuals find dairy exacerbates acne.",
        "Fried foods: Can increase oil production and inflammation.",
      ],
      tips: [
        "Sleep 7-8 hours: Quality sleep is crucial for skin repair and regeneration.",
        "Manage stress: Practice mindfulness, meditation, or hobbies to reduce stress.",
        "Avoid touching face frequently: Prevents transfer of oils and bacteria.",
        "Clean phone screen: Your phone can harbor bacteria that transfers to your face.",
        "Change pillowcases regularly: Reduces exposure to dirt and oils.",
        "Exercise regularly: Improves circulation and helps detoxify the skin.",
        "Sun protection: Always use broad-spectrum SPF 30+ daily, even indoors.",
      ],
    };

    // Morning Routine Steps
    morningRoutine.push({
      title: "Cleanser / Face Wash",
      description: `Start your day with a gentle cleanse to remove overnight impurities. Look for ingredients like ${
        data.skinType === "oily" || data.concerns.includes("Acne")
          ? "salicylic acid or tea tree oil"
          : "hyaluronic acid or ceramides"
      } to address your ${data.skinType} skin type and concerns like ${
        data.concerns.length > 0 ? data.concerns[0] : "overall skin health"
      }.`,
      products: [
        {
          name:
            data.skinType === "oily" || data.concerns.includes("Acne")
              ? "Foaming Salicylic Acid Cleanser"
              : "Hydrating Cream Cleanser",
          howToUse:
            "Apply to damp skin, massage gently for 60 seconds, then rinse thoroughly with lukewarm water.",
          keyIngredients:
            data.skinType === "oily" || data.concerns.includes("Acne")
              ? ["Salicylic Acid", "Niacinamide"]
              : ["Hyaluronic Acid", "Ceramides", "Glycerin"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name:
            data.skinType === "sensitive"
              ? "Ultra-Gentle pH-Balanced Cleanser"
              : "Brightening Gel Cleanser",
          howToUse:
            "Lather a small amount with water, cleanse face, and rinse well. Pat dry.",
          keyIngredients:
            data.skinType === "sensitive"
              ? ["Oat Extract", "Allantoin"]
              : ["Vitamin C", "Licorice Root Extract"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    });

    if (
      data.concerns.includes("Pigmentation") ||
      data.concerns.includes("Sun damage") ||
      data.concerns.includes("Dullness")
    ) {
      morningRoutine.push({
        title: "Serum (Targeted Treatment)",
        description: `Address specific concerns like pigmentation or dullness with a potent serum. Ingredients like Vitamin C are powerful antioxidants that brighten and protect.`,
        products: [
          {
            name: "Vitamin C Brightening Serum",
            howToUse:
              "Apply 3-4 drops to clean, dry face and neck. Gently pat until absorbed.",
            keyIngredients: [
              "L-Ascorbic Acid (Vitamin C)",
              "Ferulic Acid",
              "Vitamin E",
            ],
            link: "#",
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      });
    }

    morningRoutine.push({
      title: "Moisturizer",
      description: `Lock in hydration and support your skin barrier. Choose a moisturizer that suits your ${data.skinType} skin type, providing adequate moisture without feeling heavy.`,
      products: [
        {
          name:
            data.skinType === "oily"
              ? "Lightweight Gel Moisturizer"
              : "Hydrating Barrier Cream",
          howToUse: "Apply a pea-sized amount evenly to face and neck.",
          keyIngredients:
            data.skinType === "oily"
              ? ["Hyaluronic Acid", "Niacinamide"]
              : ["Ceramides", "Squalane", "Peptides"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name:
            data.skinType === "dry"
              ? "Rich Emollient Cream"
              : "Balancing Face Lotion",
          howToUse:
            "Warm a small amount between palms and press onto face and neck.",
          keyIngredients:
            data.skinType === "dry"
              ? ["Shea Butter", "Glycerin", "Urea"]
              : ["Green Tea Extract", "Centella Asiatica"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    });

    morningRoutine.push({
      title: "Sunscreen",
      description: `The most crucial step for preventing premature aging and sun damage. Use a broad-spectrum SPF 30+ daily, regardless of weather.`,
      products: [
        {
          name: "Mineral SPF 50 Sunscreen",
          howToUse:
            "Apply generously as the last step of your morning routine, 15 minutes before sun exposure. Reapply every 2 hours.",
          keyIngredients: ["Zinc Oxide", "Titanium Dioxide"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name: "Chemical SPF 30 Daily Fluid",
          howToUse:
            "Apply a generous amount to face and neck. Blends seamlessly under makeup.",
          keyIngredients: ["Avobenzone", "Octinoxate", "Hyaluronic Acid"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    });

    // Night Routine Steps
    nightRoutine.push({
      title: "Double Cleanse",
      description: `Remove makeup, sunscreen, and daily grime with an oil-based cleanser, followed by a gentle water-based cleanser. This ensures a clean canvas for your treatments.`,
      products: [
        {
          name: "Oil Cleansing Balm",
          howToUse:
            "Massage onto dry skin to dissolve makeup and impurities. Add water to emulsify, then rinse.",
          keyIngredients: [
            "Jojoba Oil",
            "Sunflower Seed Oil",
            "Polysorbate 80",
          ],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name:
            data.skinType === "oily" || data.concerns.includes("Acne")
              ? "Purifying Gel Cleanser"
              : "Hydrating Cream Cleanser",
          howToUse:
            "Follow with this cleanser on damp skin to remove any remaining residue. Rinse thoroughly.",
          keyIngredients:
            data.skinType === "oily" || data.concerns.includes("Acne")
              ? ["Glycolic Acid", "Green Tea Extract"]
              : ["Glycerin", "Amino Acids"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    });

    if (
      data.concerns.includes("Acne") ||
      data.concerns.includes("Wrinkles") ||
      data.concerns.includes("Pigmentation") ||
      data.concerns.includes("Large pores")
    ) {
      nightRoutine.push({
        title: "Treatment Serum",
        description: `Target specific concerns with a powerful night serum. For ${
          data.concerns.includes("Acne")
            ? "acne, look for retinoids or salicylic acid."
            : data.concerns.includes("Wrinkles")
            ? "wrinkles, consider retinol or peptides."
            : "pigmentation, try alpha arbutin or niacinamide."
        }`,
        products: [
          {
            name: data.concerns.includes("Acne")
              ? "Retinoid Acne Treatment"
              : data.concerns.includes("Wrinkles")
              ? "Anti-Aging Retinol Serum"
              : "Alpha Arbutin Pigmentation Serum",
            howToUse:
              "Apply a pea-sized amount to clean, dry face. Start 2-3 times a week and increase frequency as tolerated. Always use SPF in the morning.",
            keyIngredients: data.concerns.includes("Acne")
              ? ["Adapalene", "Niacinamide"]
              : data.concerns.includes("Wrinkles")
              ? ["Retinol", "Peptides", "Hyaluronic Acid"]
              : ["Alpha Arbutin", "Kojic Acid"],
            link: "#",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: data.concerns.includes("Large pores")
              ? "Niacinamide Pore Minimizing Serum"
              : "Hyaluronic Acid Hydrating Serum",
            howToUse: "Apply a few drops to face before heavier creams.",
            keyIngredients: data.concerns.includes("Large pores")
              ? ["Niacinamide", "Zinc PCA"]
              : ["Hyaluronic Acid", "Vitamin B5"],
            link: "#",
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      });
    }

    nightRoutine.push({
      title: "Night Moisturizer",
      description: `A richer moisturizer for overnight repair and regeneration. It helps to replenish moisture lost throughout the day and supports the skin's natural healing process.`,
      products: [
        {
          name:
            data.skinType === "dry"
              ? "Overnight Repair Balm"
              : "Restorative Night Cream",
          howToUse:
            "Apply a generous layer to face and neck as the final step of your routine.",
          keyIngredients:
            data.skinType === "dry"
              ? ["Squalane", "Ceramides", "Fatty Acids"]
              : ["Peptides", "Antioxidants", "Glycerin"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name:
            data.skinType === "oily"
              ? "Oil-Free Hydrating Gel"
              : "Sleeping Mask",
          howToUse:
            "Apply a thin layer as your last step. No need to rinse until morning.",
          keyIngredients:
            data.skinType === "oily"
              ? ["Hyaluronic Acid", "Green Tea Extract"]
              : ["Probiotics", "Centella Asiatica"],
          link: "#",
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    });

    return { morningRoutine, nightRoutine, dosAndDonts };
  };

  if (!analysisData || !reportContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50">
        <Card className="p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Generating Your Report...
          </h2>
          <p className="text-gray-600">
            Please complete the analysis form first to get your personalized
            report.
          </p>
          <Link href="/analyze">
            <Button className="mt-6 bg-gradient-to-r from-lavender-500 to-pink-500 text-white shadow-md hover:from-lavender-600 hover:to-pink-600 transition-all duration-300">
              Go to Analysis
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleDownloadReport = () => {
    alert("Download Report functionality is not implemented in this demo.");
    console.log("Downloading report for:", analysisData);
  };

  const handleEmailReport = () => {
    alert("Email Report functionality is not implemented in this demo.");
    console.log("Emailing report to user:", analysisData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Your Personalized Skin Wellness Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A tailored guide to achieving your healthiest skin, based on your
            unique profile and concerns.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={handleDownloadReport}
              className="bg-lavender-500 hover:bg-lavender-600 text-white shadow-md transition-all duration-200 px-6 py-3 text-base"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button
              onClick={handleEmailReport}
              variant="outline"
              className="border-lavender-200 text-lavender-600 hover:bg-lavender-50 transition-all duration-200 px-6 py-3 text-base"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email to Me
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-gray-100" />

        {/* Morning Routine Section */}
        <section className="mb-10">
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
              <Sun className="w-7 h-7 mr-3 text-amber-500" /> Morning Routine
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Prepare and protect your skin for the day ahead with these
              essential steps.
            </p>
          </CardHeader>
          <div className="space-y-8">
            {reportContent.morningRoutine.map((step, stepIndex) => (
              <Card
                key={`morning-step-${stepIndex}`}
                className="border-gray-100 shadow-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Step {stepIndex + 1}: {step.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{step.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {step.products.map((product, prodIndex) => (
                      <Card
                        key={`morning-prod-${stepIndex}-${prodIndex}`}
                        className="border-lavender-100 bg-lavender-50/30 shadow-xs"
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Image
                            src={
                              product.image ||
                              "/placeholder.svg?height=80&width=80&query=skincare%20product"
                            }
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-full object-cover mb-3 border border-lavender-200"
                          />
                          <h4 className="text-lg font-medium text-gray-800 mb-1">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            How to use: {product.howToUse}
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            Key Ingredients: {product.keyIngredients.join(", ")}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-lavender-200 text-lavender-600 hover:bg-lavender-100"
                            asChild
                          >
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Product
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8 bg-gray-100" />

        {/* Night Routine Section */}
        <section className="mb-10">
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
              <Moon className="w-7 h-7 mr-3 text-indigo-500" /> Night Routine
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Focus on repair and regeneration while you sleep with these
              targeted steps.
            </p>
          </CardHeader>
          <div className="space-y-8">
            {reportContent.nightRoutine.map((step, stepIndex) => (
              <Card
                key={`night-step-${stepIndex}`}
                className="border-gray-100 shadow-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Step {stepIndex + 1}: {step.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{step.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {step.products.map((product, prodIndex) => (
                      <Card
                        key={`night-prod-${stepIndex}-${prodIndex}`}
                        className="border-lavender-100 bg-lavender-50/30 shadow-xs"
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Image
                            src={
                              product.image ||
                              "/placeholder.svg?height=80&width=80&query=skincare%20product"
                            }
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-full object-cover mb-3 border border-lavender-200"
                          />
                          <h4 className="text-lg font-medium text-gray-800 mb-1">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            How to use: {product.howToUse}
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            Key Ingredients: {product.keyIngredients.join(", ")}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-lavender-200 text-lavender-600 hover:bg-lavender-100"
                            asChild
                          >
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Product
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8 bg-gray-100" />

        {/* Do's & Don'ts Section */}
        <section className="mb-10">
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="w-7 h-7 mr-3 text-pink-500" /> Do&apos;s &
              Don&apos;ts for Healthy Skin
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Beyond products, your lifestyle significantly impacts your skin.
              Incorporate these habits for holistic wellness.
            </p>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-200 bg-green-50/30 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Do&apos;s
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {reportContent.dosAndDonts.eat.map((item, index) => (
                    <li key={`do-eat-${index}`} className="flex items-start">
                      <Droplet className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-blue-500" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50/30 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" /> Don&apos;ts
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {reportContent.dosAndDonts.avoid.map((item, index) => (
                    <li
                      key={`dont-avoid-${index}`}
                      className="flex items-start"
                    >
                      <Utensils className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-orange-500" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-purple-50/30 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-purple-700 mb-4 flex items-center">
                  <Bed className="w-5 h-5 mr-2" /> Lifestyle Tips
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {reportContent.dosAndDonts.tips.map((item, index) => (
                    <li key={`tip-${index}`} className="flex items-start">
                      <Shield className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-purple-500" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            This report is generated by AI for informational purposes only and
            is not a substitute for professional medical advice. Always consult
            a qualified dermatologist or healthcare provider for personalized
            diagnosis and treatment.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-lavender-600 hover:text-lavender-700 transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

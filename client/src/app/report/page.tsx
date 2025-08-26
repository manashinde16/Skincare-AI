//report.tsx
"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
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
  Utensils,
  Shield,
  Heart,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define interfaces for the backend response structure
interface ProductRecommendation {
  id: number; // Added for compatibility with existing ProductCard
  name: string;
  image: string; // Base64 or URL
  usage: string; // Corresponds to 'howToUse' in backend response
  ingredients: string[]; // Corresponds to 'keyIngredients'
  link: string;
}

interface RoutineStepFromBackend {
  title: string;
  description: string;
  products: ProductRecommendation[]; // legacy
  productOptions?: ProductRecommendation[]; // two options per step
}

interface BackendFullResponse {
  morningRoutine: RoutineStepFromBackend[];
  nightRoutine: RoutineStepFromBackend[];
  lifestyle: {
    do: string[];
    dont: string[];
    tips: string[];
  };
  analysis: string;
  products: ProductRecommendation[];
}

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>

    {/* Routine Section Skeleton */}
    {[...Array(2)].map((_, sectionIndex) => (
      <section key={`section-skeleton-${sectionIndex}`} className="mb-10">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
        <div className="space-y-8">
          {[...Array(3)].map((_, stepIndex) => (
            <Card
              key={`step-skeleton-${sectionIndex}-${stepIndex}`}
              className="border-gray-100 shadow-sm"
            >
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(2)].map((_, prodIndex) => (
                    <Card
                      key={`prod-skeleton-${sectionIndex}-${stepIndex}-${prodIndex}`}
                      className="border-lavender-100 bg-lavender-50/30 shadow-xs"
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="rounded-full bg-gray-300 mb-3 w-20 h-20"></div>
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    ))}

    {/* Do's & Don'ts Skeleton */}
    <section className="mb-10">
      <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, cardIndex) => (
          <Card
            key={`dosdonts-skeleton-${cardIndex}`}
            className="border-gray-100 shadow-sm"
          >
            <CardContent className="p-6">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <ul className="space-y-2">
                {[...Array(3)].map((_, itemIndex) => (
                  <li
                    key={`dosdonts-item-skeleton-${cardIndex}-${itemIndex}`}
                    className="h-4 bg-gray-200 rounded w-full"
                  ></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

export default function ReportPage() {
  const [reportContent, setReportContent] =
    useState<BackendFullResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


    // Normalizes backend result to expected frontend structure
    // Helper to map product names to images in public folder
    function getProductImage(productName: string): string {
      const name = productName.toLowerCase();
      if (name.includes("cerave")) return "/cerave.png";
      if (name.includes("cetaphil")) return "/cetaphil.png";
      if (name.includes("nivea")) return "/nivea.png";
      if (name.includes("lakme")) return "/lakme.png";
      if (name.includes("minimalist")) return "/minimalist.png";
      if (name.includes("sugar")) return "/sugar.png";
      if (name.includes("the ordinary")) return "/ordinary.png";
      if (name.includes("plum")) return "/Plum.png";
      if (name.includes("pond's")) return "/ponds.png";
      if (name.includes("neutrogena")) return "/Neutrogena.png";
      if (name.includes("olay")) return "/Olay.png";
      if (name.includes("loreal paris")) return "/loreal.png";
      if (name.includes("l'oreal paris")) return "/loreal.png";
      if (name.includes("re'equil")) return "/reequil.png";
      if (name.includes("the derma")) return "/thederma.jpg";
      if (name.includes("simple")) return "/simple.png";
      if (name.includes("garnier")) return "/garnier.png";
      if (name.includes("foxtale")) return "/foxtale.png";
      if (name.includes("dot & key")) return "/dotkey.png";
      if (name.includes("deconstruct")) return "/deconstruct.png";
      if (name.includes("Blynds")) return "/blynds.png";
      if (name.includes("klairs")) return "/klairs.jpg";
      if (name.includes("bioderma")) return "/bioderma.png";
      if (name.includes("avene")) return "/avene.png";
      if (name.includes("physiogel")) return "/physiogel.png";

      // Add more mappings as you add more images
      return "/placeholder.jpg";
    }

    function normalizeBackendResponse(raw: any): BackendFullResponse {
      const products = (raw.Products || []).map((prod: any, idx: number) => ({
        id: idx,
        name: prod.name,
        image: getProductImage(prod.name),
        usage: prod.howToUse,
        ingredients: prod.keyIngredients,
        link: prod.productLink,
      }));

      const mapStep = (step: any) => {
        const options = (step.productOptions || []).slice(0, 2).map((prod: any, idx: number) => ({
          id: idx,
          name: prod.name,
          image: getProductImage(prod.name),
          usage: prod.howToUse,
          ingredients: prod.keyIngredients || [],
          link: prod.productLink,
        }));
        return {
          title: step.title,
          description: step.description,
          products: [],
          productOptions: options,
        } as RoutineStepFromBackend;
      };

      const morningRoutine = (raw.MorningRoutine || []).map(mapStep);
      const nightRoutine = (raw.NightRoutine || []).map(mapStep);

      return {
        morningRoutine,
        nightRoutine,
        lifestyle: {
          do: (raw.Lifestyle?.do || []),
          dont: (raw.Lifestyle?.dont || []),
          tips: (raw.Lifestyle?.tips || []),
        },
        analysis: raw.analysis || "",
        products,
      };
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("skincareReportData");
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            // If response is wrapped in {ok, result}, unwrap
            const backendResult = parsedData.result || parsedData;
            setReportContent(normalizeBackendResponse(backendResult));
          } catch (e) {
            console.error("Failed to parse report data from localStorage:", e);
            setError(
              "Failed to load your personalized report. Please try the analysis again."
            );
          } finally {
            setIsLoading(false);
          }
        } else {
          setError(
            "No report data found. Please complete the skin analysis form."
          );
          setIsLoading(false);
        }
      }
    }, []);

  const handleDownloadReport = () => {
    if (!reportContent) return;
    console.log("Generating PDF Report");

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;

    const addPageIfNeeded = (needed = 24) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const addHeading = (text: string, icon?: string) => {
      addPageIfNeeded(28);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(text, margin, y);
      y += 24;
    };

    const addParagraph = (text: string) => {
      addPageIfNeeded(24);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
      lines.forEach((line: string) => {
        addPageIfNeeded(16);
        doc.text(line, margin, y);
        y += 16;
      });
      y += 8;
    };

    const addList = (items: string[]) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      items.forEach((item) => {
        const lines = doc.splitTextToSize("• " + item, pageWidth - margin * 2);
        lines.forEach((line: string) => {
          addPageIfNeeded(16);
          doc.text(line, margin, y);
          y += 16;
        });
      });
      y += 8;
    };

    const addDivider = () => {
      addPageIfNeeded(20);
      doc.setDrawColor(230);
      doc.line(margin, y, pageWidth - margin, y);
      y += 16;
    };

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Personalized Skin Wellness Report", margin, y);
    y += 28;
    addParagraph(
      "A tailored guide to achieving your healthiest skin, based on your unique profile and concerns."
    );
    addDivider();

    if (reportContent.analysis) {
      addHeading("Skin Analysis");
      addParagraph(reportContent.analysis);
      addDivider();
    }

    addHeading("Morning Routine");
    reportContent.morningRoutine.forEach((step, idx) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      addPageIfNeeded(18);
      doc.text(`Step ${idx + 1}: ${step.title}`, margin, y);
      y += 18;
      addParagraph(step.description);
      if (step.productOptions && step.productOptions.length) {
        step.productOptions.slice(0, 2).forEach((p, pIdx) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          addPageIfNeeded(16);
          doc.text(`Option ${pIdx + 1}: ${p.name}`, margin, y);
          y += 14;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          addParagraph(`How to use: ${p.usage}`);
          addParagraph(`Key Ingredients: ${p.ingredients.join(", ")}`);
          addParagraph(
            `Search: https://www.google.com/search?q=${encodeURIComponent(
              p.name + " site:amazon.in OR site:nykaa.com OR site:flipkart.com"
            )}`
          );
        });
        addDivider();
      }
    });
    addDivider();

    addHeading("Night Routine");
    reportContent.nightRoutine.forEach((step, idx) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      addPageIfNeeded(18);
      doc.text(`Step ${idx + 1}: ${step.title}`, margin, y);
      y += 18;
      addParagraph(step.description);
      if (step.productOptions && step.productOptions.length) {
        step.productOptions.slice(0, 2).forEach((p, pIdx) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          addPageIfNeeded(16);
          doc.text(`Option ${pIdx + 1}: ${p.name}`, margin, y);
          y += 14;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          addParagraph(`How to use: ${p.usage}`);
          addParagraph(`Key Ingredients: ${p.ingredients.join(", ")}`);
          addParagraph(
            `Search: https://www.google.com/search?q=${encodeURIComponent(
              p.name + " site:amazon.in OR site:nykaa.com OR site:flipkart.com"
            )}`
          );
        });
        addDivider();
      }
    });
    addDivider();

    addHeading("Recommended Products");
    reportContent.products.forEach((p) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      addPageIfNeeded(16);
      doc.text(p.name, margin, y);
      y += 16;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      addParagraph(`How to use: ${p.usage}`);
      addParagraph(`Key Ingredients: ${p.ingredients.join(", ")}`);
      addParagraph(`Link: ${p.link}`);
      addDivider();
    });

    addHeading("Do's & Don'ts for Healthy Skin");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    addPageIfNeeded(16);
    doc.text("Do's", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    addList(reportContent.lifestyle.do);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    addPageIfNeeded(16);
    doc.text("Don'ts", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    addList(reportContent.lifestyle.dont);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    addPageIfNeeded(16);
    doc.text("Lifestyle Tips", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    addList(reportContent.lifestyle.tips);

    doc.save("skin-wellness-report.pdf");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50 p-4 md:p-8 font-sans">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 relative w-full">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50">
        <Card className="p-8 text-center shadow-lg border-red-200 bg-red-50/30">
          <h2 className="text-2xl font-bold mb-4 text-red-700">
            Error Loading Report
          </h2>
          <p className="text-red-600">{error}</p>
          <Link href="/analyze">
            <Button className="mt-6 bg-gradient-to-r from-lavender-500 to-pink-500 text-white shadow-md hover:from-lavender-600 hover:to-pink-600 transition-all duration-300">
              Go to Analysis
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!reportContent) {
    // This case should ideally be caught by the error state, but as a fallback
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50">
        <Card className="p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            No Report Available
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-lavender-50 to-pink-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Your Personalized Skin Wellness Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your skin and the details you shared, here is your personalized skincare routine.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={handleDownloadReport}
              className="bg-lavender-500 hover:bg-lavender-600 text-white shadow-md transition-all duration-200 px-6 py-3 text-base"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Analysis Summary */}
        {reportContent.analysis && (
          <>
            <Separator className="my-8 bg-gray-100" />
            <section className="mb-10 text-center">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 mr-3 text-purple-500" /> Your
                  Skin Analysis
                </CardTitle>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  Here&apos;s a summary of your skin&apos;s current state and
                  key insights.
                </p>
              </CardHeader>
              <Card className="border-purple-100/50 shadow-lg bg-white/90 max-w-3xl mx-auto">
                <CardContent className="p-6 text-lg text-gray-700 leading-relaxed">
                  {reportContent.analysis}
                </CardContent>
              </Card>
            </section>
          </>
        )}

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
                  {step.productOptions && step.productOptions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {step.productOptions.slice(0, 2).map((product, idx) => (
                        <Card key={`morning-step-${stepIndex}-opt-${idx}`} className="border-lavender-100 bg-lavender-50/30 shadow-xs flex flex-col">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border border-lavender-200 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
                              <Image
                                src={product.image || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-semibold text-gray-800">{product.name}</h4>
                              <p className="text-sm text-gray-600 mt-1 break-words whitespace-normal"><span className="font-medium">How to use:</span> {product.usage}</p>
                              <p className="text-xs text-gray-500 mt-1 break-words whitespace-normal"><span className="font-medium">Key Ingredients:</span> {product.ingredients.join(", ")}</p>
                              <div className="mt-2">
                                <Button variant="outline" size="sm" className="border-lavender-200 text-lavender-600 hover:bg-lavender-100 bg-transparent" asChild>
                                  <a href={`https://www.google.com/search?q=${encodeURIComponent(product.name + ' site:amazon.in OR site:nykaa.com OR site:flipkart.com')}`} target="_blank" rel="noopener noreferrer">View Product</a>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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
                  {step.productOptions && step.productOptions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {step.productOptions.slice(0, 2).map((product, idx) => (
                        <Card key={`night-step-${stepIndex}-opt-${idx}`} className="border-lavender-100 bg-lavender-50/30 shadow-xs flex flex-col">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border border-lavender-200 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
                              <Image
                                src={product.image || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-semibold text-gray-800">{product.name}</h4>
                              <p className="text-sm text-gray-600 mt-1 break-words whitespace-normal"><span className="font-medium">How to use:</span> {product.usage}</p>
                              <p className="text-xs text-gray-500 mt-1 break-words whitespace-normal"><span className="font-medium">Key Ingredients:</span> {product.ingredients.join(", ")}</p>
                              <div className="mt-2">
                                <Button variant="outline" size="sm" className="border-lavender-200 text-lavender-600 hover:bg-lavender-100 bg-transparent" asChild>
                                  <a href={`https://www.google.com/search?q=${encodeURIComponent(product.name + ' site:amazon.in OR site:nykaa.com OR site:flipkart.com')}`} target="_blank" rel="noopener noreferrer">View Product</a>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended Products Section - removed as requested */}

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
                  {reportContent.lifestyle.do.map((item, index) => (
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
                  {reportContent.lifestyle.dont.map((item, index) => (
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
                  {reportContent.lifestyle.tips.map((item, index) => (
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

//report.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
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
  FileText,
  Star,
  Zap,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define interfaces for the backend response structure
interface ProductRecommendation {
  id: number;
  name: string;
  image: string;
  usage: string;
  ingredients: string[];
  link: string;
}

interface RoutineStepFromBackend {
  title: string;
  description: string;
  products: ProductRecommendation[];
  productOptions?: ProductRecommendation[];
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

// Enhanced Skeleton Loader Component
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
  const searchParams = useSearchParams();
  const [reportContent, setReportContent] =
    useState<BackendFullResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    if (name.includes("dot&key")) return "/dotkey.png";
    if (name.includes("deconstruct")) return "/deconstruct.png";
    if (name.includes("Blynds")) return "/blynds.png";
    if (name.includes("klairs")) return "/klairs.jpg";
    if (name.includes("bioderma")) return "/bioderma.png";
    if (name.includes("avene")) return "/avene.png";
    if (name.includes("physiogel")) return "/physiogel.png";

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
    const analysisId = searchParams.get("analysisId");
    const loadFromLocal = () => {
      const storedData = typeof window !== "undefined" ? localStorage.getItem("skincareReportData") : null;
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const backendResult = parsedData.result || parsedData;
          setReportContent(normalizeBackendResponse(backendResult));
        } catch (e) {
          console.error("Failed to parse report data from localStorage:", e);
          setError("Failed to load your personalized report. Please try the analysis again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("No report data found. Please complete the skin analysis form.");
        setIsLoading(false);
      }
    };

    const loadFromServer = async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/api/ai/history`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load analysis history");
        const json = await res.json();
        const match = (json.items || []).find((x: any) => x.id === id);
        if (match?.data) {
          setReportContent(normalizeBackendResponse(match.data));
        } else {
          setError("Report not found");
        }
      } catch (e: any) {
        setError(e?.message || "Failed to load report");
      } finally {
        setIsLoading(false);
      }
    };

    if (analysisId) loadFromServer(analysisId);
    else loadFromLocal();
  }, [searchParams]);

  const handleDownloadReport = () => {
    if (!reportContent) return;
    // console.log("Generating PDF Report");

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 font-sans">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 relative w-full">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Card className="p-8 text-center shadow-2xl border-red-200 bg-white rounded-3xl max-w-md mx-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl text-white mx-auto mb-4">
            <XCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-red-700">
            Error Loading Report
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link href="/analyze">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Zap className="w-4 h-4 mr-2" />
              Go to Analysis
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!reportContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Card className="p-8 text-center shadow-2xl bg-white rounded-3xl max-w-md mx-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white mx-auto mb-4">
            <FileText className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            No Report Available
          </h2>
          <p className="text-gray-600 mb-6">
            Please complete the analysis form first to get your personalized
            report.
          </p>
          <Link href="/analyze">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Zap className="w-4 h-4 mr-2" />
              Go to Analysis
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-100/40 to-blue-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 lg:p-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Your Report is Ready
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Your Personalized{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skin Wellness Report
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Based on your skin analysis and the details you shared, here is your personalized skincare routine.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={handleDownloadReport}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Analysis Summary */}
        {reportContent.analysis && (
          <>
            <Separator className="my-8 bg-gray-200" />
            <section className="mb-10 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Skin Analysis
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Skin Analysis
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Here&apos;s a summary of your skin&apos;s current state and key insights.
                </p>
              </div>
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 shadow-lg max-w-3xl mx-auto">
                <CardContent className="p-6 sm:p-8 text-base sm:text-lg text-gray-700 leading-relaxed">
                  {reportContent.analysis}
                </CardContent>
              </Card>
            </section>
          </>
        )}

        <Separator className="my-8 bg-gray-200" />

        {/* Morning Routine Section */}
        <section className="mb-10">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full text-sm font-medium mb-4">
              <Sun className="h-4 w-4" />
              Morning Routine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Morning Routine
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Prepare and protect your skin for the day ahead with these essential steps.
            </p>
          </div>
          <div className="space-y-8">
            {reportContent.morningRoutine.map((step, stepIndex) => (
              <Card
                key={`morning-step-${stepIndex}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl text-white">
                      <span className="text-xl font-bold">{stepIndex + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-6">{step.description}</p>
                  {step.productOptions && step.productOptions.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.productOptions.slice(0, 2).map((product, idx) => (
                        <Card key={`morning-step-${stepIndex}-opt-${idx}`} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="relative w-16 h-16 rounded-2xl border border-blue-200 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md">
                              <Image
                                src={product.image || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-contain p-2"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">{product.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2"><span className="font-medium">How to use:</span> {product.usage}</p>
                              <p className="text-[11px] sm:text-xs text-gray-500 mb-3"><span className="font-medium">Key Ingredients:</span> {product.ingredients.join(", ")}</p>
                              <div>
                                <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-100 bg-white hover:scale-105 transition-all duration-300" asChild>
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

        <Separator className="my-8 bg-gray-200" />

        {/* Night Routine Section */}
        <section className="mb-10">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
              <Moon className="h-4 w-4" />
              Night Routine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Night Routine
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Focus on repair and regeneration while you sleep with these targeted steps.
            </p>
          </div>
          <div className="space-y-8">
            {reportContent.nightRoutine.map((step, stepIndex) => (
              <Card
                key={`night-step-${stepIndex}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                      <span className="text-xl font-bold">{stepIndex + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-6">{step.description}</p>
                  {step.productOptions && step.productOptions.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.productOptions.slice(0, 2).map((product, idx) => (
                        <Card key={`night-step-${stepIndex}-opt-${idx}`} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="relative w-16 h-16 rounded-2xl border border-purple-200 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md">
                              <Image
                                src={product.image || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-contain p-2"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">{product.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2"><span className="font-medium">How to use:</span> {product.usage}</p>
                              <p className="text-[11px] sm:text-xs text-gray-500 mb-3"><span className="font-medium">Key Ingredients:</span> {product.ingredients.join(", ")}</p>
                              <div>
                                <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-100 bg-white hover:scale-105 transition-all duration-300" asChild>
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

        <Separator className="my-8 bg-gray-200" />

        {/* Do's & Don'ts Section */}
        <section className="mb-10">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium mb-4">
              <Heart className="h-4 w-4" />
              Lifestyle Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Do&apos;s & Don&apos;ts for Healthy Skin
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Beyond products, your lifestyle significantly impacts your skin. Incorporate these habits for holistic wellness.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700">Do&apos;s</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {reportContent.lifestyle.do.map((item, index) => (
                    <li key={`do-eat-${index}`} className="flex items-start">
                      <Droplet className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-blue-500" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl text-white">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-700">Don&apos;ts</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {reportContent.lifestyle.dont.map((item, index) => (
                    <li key={`dont-avoid-${index}`} className="flex items-start">
                      <Utensils className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-orange-500" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-700">Lifestyle Tips</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {reportContent.lifestyle.tips.map((item, index) => (
                    <li key={`tip-${index}`} className="flex items-start">
                      <Bed className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-purple-500" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center mt-12 p-6 sm:p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
            This report is generated by AI for informational purposes only and
            is not a substitute for professional medical advice. Always consult
            a qualified dermatologist or healthcare provider for personalized
            diagnosis and treatment.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

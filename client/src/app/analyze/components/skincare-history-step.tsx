"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Mic, MicOff, AlertTriangle, Package, Target, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import type { AnalysisData } from "../page";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getSkincareHistory } from "@/lib/api";

interface SkincareHistoryStepProps {
  data: AnalysisData;
  updateData: (updates: Partial<AnalysisData>) => void;
}

const concernOptions = [
  { value: "Acne", icon: "🩹", color: "from-red-500 to-red-600" },
  { value: "Pigmentation", icon: "🎭", color: "from-brown-500 to-brown-600" },
  { value: "Dark circles", icon: "👁️", color: "from-purple-500 to-purple-600" },
  { value: "Redness", icon: "🔴", color: "from-red-500 to-pink-600" },
  { value: "Dry patches", icon: "🏜️", color: "from-yellow-500 to-orange-600" },
  { value: "Oily T-zone", icon: "💧", color: "from-blue-500 to-cyan-600" },
  { value: "Large pores", icon: "🔍", color: "from-gray-500 to-gray-600" },
  { value: "Blackheads", icon: "⚫", color: "from-gray-500 to-black-600" },
  { value: "Whiteheads", icon: "⚪", color: "from-white-500 to-gray-600" },
  { value: "Wrinkles", icon: "📝", color: "from-orange-500 to-red-600" },
  { value: "Sun damage", icon: "☀️", color: "from-yellow-500 to-red-600" },
];

export default function SkincareHistoryStep({
  data,
  updateData,
}: SkincareHistoryStepProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [historyItems, setHistoryItems] = useState<Array<{ id: string; createdAt: string; data: unknown }>>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoadingHistory(true);
      setHistoryError(null);
      try {
        const res = await getSkincareHistory();
        if (!mounted) return;
        setHistoryItems(Array.isArray(res.items) ? res.items : []);
      } catch (e: any) {
        if (!mounted) return;
        setHistoryError(e?.message || "Failed to load your history");
      } finally {
        if (mounted) setLoadingHistory(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleConcern = (concern: string) => {
    const updatedConcerns = data.concerns.includes(concern)
      ? data.concerns.filter((c) => c !== concern)
      : [...data.concerns, concern];
    updateData({ concerns: updatedConcerns });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
  };

  return (
    <div className="space-y-8">
      {/* Previous Analyses (from your account) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Your Recent Analyses
          </h3>
        </div>
        {loadingHistory && (
          <p className="text-sm text-gray-600">Loading your history…</p>
        )}
        {historyError && (
          <p className="text-sm text-red-600">{historyError}</p>
        )}
        {!loadingHistory && !historyError && historyItems.length === 0 && (
          <p className="text-sm text-gray-600">No past analyses yet. Complete one to see it here.</p>
        )}
        {!loadingHistory && !historyError && historyItems.length > 0 && (
          <div className="space-y-3">
            {historyItems.slice(0, 5).map((h) => (
              <Card key={h.id} className="p-3 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Completed skin analysis</p>
                    <p className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</p>
                  </div>
                  <Link href={`/report?analysisId=${h.id}`} className="text-xs text-blue-600 hover:underline whitespace-nowrap">View report</Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
          <Target className="h-4 w-4" />
          Skincare History
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Skincare Journey
        </h2>
        <p className="text-gray-600">
          Understanding your skincare history helps us create a routine that builds on your experience.
        </p>
      </div>

      {/* Allergies */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl text-white">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Do you have any known skin allergies?
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              variant={data.hasAllergies === true ? "default" : "outline"}
              onClick={() => updateData({ hasAllergies: true })}
              className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                data.hasAllergies === true
                  ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg"
                  : "border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 bg-white"
              }`}
            >
              Yes
            </Button>
            <Button
              variant={data.hasAllergies === false ? "default" : "outline"}
              onClick={() => updateData({ hasAllergies: false, allergies: "" })}
              className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                data.hasAllergies === false
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50 bg-white"
              }`}
            >
              No
            </Button>
          </div>
          {data.hasAllergies && (
            <Input
              placeholder="Please list your allergies..."
              value={data.allergies}
              onChange={(e) => updateData({ allergies: e.target.value })}
              className="border-gray-200 focus:border-red-400 focus:ring-red-400 rounded-xl"
            />
          )}
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Have you used any skincare products recently?
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              variant={data.usesProducts === true ? "default" : "outline"}
              onClick={() => updateData({ usesProducts: true })}
              className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                data.usesProducts === true
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                  : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 bg-white"
              }`}
            >
              Yes
            </Button>
            <Button
              variant={data.usesProducts === false ? "default" : "outline"}
              onClick={() => updateData({ usesProducts: false, products: "" })}
              className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                data.usesProducts === false
                  ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg"
                  : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 bg-white"
              }`}
            >
              No
            </Button>
          </div>
          {data.usesProducts && (
            <Input
              placeholder="Please list the products you've been using..."
              value={data.products}
              onChange={(e) => updateData({ products: e.target.value })}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
            />
          )}
        </div>
      </div>

      {/* Skin Concerns */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Do you have any current skin concerns?
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {concernOptions.map((concern) => (
            <div key={concern.value} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Checkbox
                id={concern.value}
                checked={data.concerns.includes(concern.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    toggleConcern(concern.value);
                  } else {
                    toggleConcern(concern.value);
                  }
                }}
                className="border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={concern.value}
                className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
              >
                <span className="text-lg">{concern.icon}</span>
                {concern.value}
              </label>
            </div>
          ))}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <Checkbox
              id="other-concern"
              checked={data.concerns.includes("Other")}
              onCheckedChange={(checked) => {
                if (checked) {
                  toggleConcern("Other");
                } else {
                  toggleConcern("Other");
                  updateData({ otherConcern: "" });
                }
              }}
              className="border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <label
              htmlFor="other-concern"
              className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
            >
              <span className="text-lg">✨</span>
              Other
            </label>
          </div>
        </div>
        {data.concerns.includes("Other") && (
          <Input
            placeholder="Please specify other concerns..."
            value={data.otherConcern}
            onChange={(e) => updateData({ otherConcern: e.target.value })}
            className="mt-4 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
          />
        )}
      </div>

      {/* Additional Details */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Additional Details
          </h3>
        </div>
        <div className="relative">
          <Textarea
            placeholder="Describe anything else we should know..."
            value={data.additionalDetails}
            onChange={(e) => updateData({ additionalDetails: e.target.value })}
            className="border-gray-200 focus:border-green-400 focus:ring-green-400 pr-12 min-h-[100px] rounded-xl resize-none"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRecording}
            className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              isRecording
                ? "text-red-500 hover:text-red-600 bg-red-50"
                : "text-green-600 hover:text-green-700 bg-green-50"
            }`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
          <Mic className="w-3 h-3 text-green-600" />
          Click the microphone icon to use voice-to-text
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          <span>Your skincare history helps us avoid products that may not work for you</span>
        </div>
      </div>
    </div>
  );
}

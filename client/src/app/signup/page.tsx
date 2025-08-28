"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Eye, EyeOff, ArrowLeft, User, Mail, Shield, Zap, Brain, CheckCircle, Star } from "lucide-react";
import { signup } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setServerError("");

    try {
      const response = await signup(
        formData.email,
        formData.fullName,
        formData.password
      );
      authLogin(response.user);
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setServerError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/30 to-pink-100/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-100/40 to-blue-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/2" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-100/20 to-emerald-100/20 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Enhanced Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Enhanced Signup Card */}
          <Card className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <CardHeader className="text-center space-y-6 p-8">
              {/* Premium Logo */}
              <div className="flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 shadow-lg">
                  <User className="h-10 w-10 text-white" />
                </div>
              </div>
              
              {/* Header Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium mb-4">
                  <Star className="h-4 w-4" />
                  Join Our Community
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Join and get personalized skincare routines powered by AI
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Enhanced Full Name Field */}
                <div className="space-y-3">
                  <Label 
                    htmlFor="fullName" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-green-600" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className={`rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 px-4 py-3 text-base transition-all duration-300 ${
                      errors.fullName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Enhanced Email Field */}
                <div className="space-y-3">
                  <Label 
                    htmlFor="email" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4 text-blue-600" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base transition-all duration-300 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Enhanced Password Field */}
                <div className="space-y-3">
                  <Label 
                    htmlFor="password" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4 text-purple-600" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 px-4 py-3 text-base pr-12 transition-all duration-300 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-300 p-1 rounded-lg hover:bg-purple-50"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Server Error */}
                {serverError && (
                  <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                    <p className="text-sm text-red-600 text-center flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {serverError}
                    </p>
                  </div>
                )}

                {/* Enhanced Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Create My Account
                    </div>
                  )}
                </Button>
              </form>

              {/* Enhanced Login Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600 mb-3">
                  Already have an account?
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Brain className="h-4 w-4" />
                  Login to Account
                </Link>
            </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-8 space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Why Join Us?</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-700">AI-powered skin analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-700">Personalized skincare routines</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-700">100% free to use</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">Secure & Private</span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Your data is encrypted and never shared with third parties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

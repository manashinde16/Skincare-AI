"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
import { Sparkles, Eye, EyeOff, ArrowLeft, Lock, Mail, Shield, Zap, Brain } from "lucide-react";
import { login } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: authLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
    setServerError(null);

    try {
      const response = await login(formData.email, formData.password);
      authLogin(response.user);
      const next = searchParams.get("next");
      router.push(next || "/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setServerError(err.message);
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
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-100/40 to-blue-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/2" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

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

          {/* Enhanced Login Card */}
          <Card className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <CardHeader className="text-center space-y-6 p-8">
              {/* Premium Logo */}
              <div className="flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                  <Lock className="h-10 w-10 text-white" />
                </div>
              </div>
              
              {/* Header Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Welcome Back
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Log in to access your personalized skincare dashboard
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="Enter your password"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Login to Dashboard
                    </div>
                  )}
                </Button>
              </form>

              {/* Enhanced Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600 mb-3">
                  Don&apos;t have an account yet?
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Brain className="h-4 w-4" />
                  Create Account
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">Secure & Private</span>
              </div>
              <p className="text-xs text-gray-500">
                Your data is encrypted and never shared with third parties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

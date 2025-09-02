"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
}

export default function AuthGuard({ 
  children, 
  requireAuth = false, 
  requireGuest = false 
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    // If user is logged in and trying to access landing page, redirect to dashboard
    if (user && pathname === "/") {
      router.replace("/dashboard");
      return;
    }

    // If user is not logged in and trying to access protected routes
    if (!user && requireAuth) {
      router.replace("/");
      return;
    }

    // If user is logged in and trying to access guest-only routes
    if (user && requireGuest) {
      router.replace("/dashboard");
      return;
    }
  }, [user, loading, router, pathname, requireAuth, requireGuest]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

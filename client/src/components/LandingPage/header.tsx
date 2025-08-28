"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 150; // Scroll distance for full transformation
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <header
        className={`
             fixed top-0 left-0 z-50 w-full px-6
             bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-2xl
             border border-white/40 dark:border-white/20
             transition-all duration-500 ease-out
           `}
        style={{
          height: `${64 - scrollProgress * 16}px`,
          borderRadius: `${scrollProgress * 24}px`,
          maxWidth:
            scrollProgress > 0.1
              ? `${Math.max(60, 100 - scrollProgress * 30)}%`
              : "100%",
          margin:
            scrollProgress > 0.1 ? `${scrollProgress * 16}px auto 0` : "0",
          left: scrollProgress > 0.1 ? "50%" : "0",
          transform: scrollProgress > 0.1 ? "translateX(-50%)" : "none",
          boxShadow:
            scrollProgress > 0.1
              ? `0 20px 40px -10px rgba(0, 0, 0, ${0.15 + scrollProgress * 0.1})`
              : "0 8px 32px -4px rgba(0, 0, 0, 0.1)",
          backgroundColor: `rgba(255, 255, 255, ${0.9 - scrollProgress * 0.4})`,
        }}
      >
        <div
          className={`flex h-full items-center justify-between ${
            scrollProgress > 0.1
              ? "px-4 sm:px-6"
              : "container mx-auto px-4 sm:px-6"
          }`}
        >
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className={`
                flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600
                shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500
              `}
            >
              <Sparkles className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <span
              className={`
                text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
                group-hover:scale-105 transition-transform duration-300
              `}
            >
              Skincare AI
            </span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`
          fixed top-0 left-0 z-50 w-full px-6
          bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-2xl
          border border-white/40 dark:border-white/20
          transition-all duration-500 ease-out
        `}
      style={{
        height: `${78 - scrollProgress * 16}px`,
        borderRadius: `${scrollProgress * 24}px`,
        maxWidth:
          scrollProgress > 0.1
            ? `${Math.max(60, 100 - scrollProgress * 30)}%`
            : "100%",
        margin: scrollProgress > 0.1 ? `${scrollProgress * 16}px auto 0` : "0",
        left: scrollProgress > 0.1 ? "50%" : "0",
        transform: scrollProgress > 0.1 ? "translateX(-50%)" : "none",
        boxShadow:
          scrollProgress > 0.1
            ? `0 20px 40px -10px rgba(0, 0, 0, ${0.15 + scrollProgress * 0.1})`
            : "0 8px 32px -4px rgba(0, 0, 0, 0.1)",
        backgroundColor: `rgba(255, 255, 255, ${0.9 - scrollProgress * 0.4})`,
      }}
    >
      <div
        className={`flex h-full items-center justify-between ${
          scrollProgress > 0.1
            ? "px-3 sm:px-4 md:px-6"
            : "container mx-auto px-3 sm:px-4 md:px-6"
        }`}
      >
        <Link href="/" className="flex items-center space-x-3 group">
          <div
            className={`
               flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600
               shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500
             `}
          >
            <Sparkles className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <span
            className={`
               text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
               group-hover:scale-105 transition-transform duration-300
             `}
          >
            Skincare AI
          </span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-11 w-11 rounded-full p-0 hover:bg-gray-100 hover:scale-110 transition-all duration-500 ease-out shadow-lg hover:shadow-xl"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-500 ease-out">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl border-gray-200 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-2xl"
              >
                <div className="flex items-center justify-start gap-3 p-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-gray-900 dark:text-gray-100">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className={`
                        border-gray-300 text-gray-700 bg-white hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-full px-4 sm:px-6
                        transition-all duration-500 ease-out hover:scale-105 font-medium text-sm sm:text-base shadow-md hover:shadow-xl
                      `}
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className={`
                        bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                        text-white rounded-full px-4 sm:px-6 shadow-xl hover:shadow-2xl
                        transition-all duration-500 ease-out hover:scale-105 font-medium text-sm sm:text-base
                      `}
                >
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

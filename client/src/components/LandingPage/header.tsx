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
             bg-white/80 backdrop-blur-lg shadow-lg
             border border-white/30
             transition-all duration-300 ease-out
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
              ? `0 10px 25px -5px rgba(0, 0, 0, ${0.1 + scrollProgress * 0.1})`
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          backgroundColor: `rgba(255, 255, 255, ${0.8 - scrollProgress * 0.4})`,
        }}
      >
        <div
          className={`flex h-full items-center justify-between ${
            scrollProgress > 0.1
              ? "px-4 sm:px-6"
              : "container mx-auto px-4 sm:px-6"
          }`}
        >
          <Link href="/" className="flex items-center space-x-2 group">
            <div
              className={`
                flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lavender-400 to-pink-400
                shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300
              `}
            >
              <Sparkles className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span
              className={`
                text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-all duration-300
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
          bg-white/80 backdrop-blur-lg shadow-lg
          border border-white/30
          transition-all duration-300 ease-out
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
            ? `0 10px 25px -5px rgba(0, 0, 0, ${0.1 + scrollProgress * 0.1})`
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        backgroundColor: `rgba(255, 255, 255, ${0.8 - scrollProgress * 0.4})`,
      }}
    >
      <div
        className={`flex h-full items-center justify-between ${
          scrollProgress > 0.1
            ? "px-4 sm:px-6"
            : "container mx-auto px-4 sm:px-6"
        }`}
      >
        <Link href="/" className="flex items-center space-x-2 group">
          <div
            className={`
               flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lavender-400 to-pink-400
               shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300
             `}
          >
            <Sparkles className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span
            className={`
               text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-all duration-300
             `}
          >
            Skincare AI
          </span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full p-0 hover:bg-gray-100 hover:scale-110 transition-all duration-500 ease-out"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-gray-200 hover:ring-gray-300 transition-all duration-500 ease-out">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-gradient-to-br from-lavender-400 to-pink-400 text-white text-sm font-medium">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl border-gray-200 bg-white shadow-xl"
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50"
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
                  variant="ghost"
                  className={`
                         text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3 sm:px-6
                         transition-all duration-500 ease-out hover:scale-105 font-medium text-sm sm:text-base
                       `}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className={`
                         bg-gradient-to-r from-lavender-500 to-pink-500 hover:from-lavender-600 hover:to-pink-600 
                         text-white rounded-full px-3 sm:px-6 shadow-lg hover:shadow-xl
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

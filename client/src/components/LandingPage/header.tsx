"use client";

import { useState } from "react";
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
          fixed top-0 left-0 z-50 w-full h-20 px-4
          bg-white/20 backdrop-blur-lg shadow-lg border-b border-lavender-100/50
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="container mx-auto flex h-full items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div
              className={`
                flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lavender-400 to-pink-400
              `}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span
              className={`
                text-xl font-semibold bg-gradient-to-r from-lavender-600 to-pink-600 bg-clip-text text-transparent
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
        fixed top-0 left-0 z-50 w-full h-20 px-4
        bg-white/20 backdrop-blur-lg shadow-lg border-b border-lavender-100/50
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div
            className={`
              flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lavender-400 to-pink-400
            `}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span
            className={`
              text-xl font-semibold bg-gradient-to-r from-lavender-600 to-pink-600 bg-clip-text text-transparent
            `}
          >
            Skincare AI
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full p-0 hover:bg-lavender-50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-gradient-to-br from-lavender-400 to-pink-400 text-white text-sm font-medium">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
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
                    text-lavender-600 hover:text-lavender-700 hover:bg-lavender-50
                  `}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className={`
                    bg-gradient-to-r from-lavender-500 to-pink-500 hover:from-lavender-600 hover:to-pink-600 text-white rounded-full px-6
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

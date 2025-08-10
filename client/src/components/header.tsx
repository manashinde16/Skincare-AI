"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This state would typically come from an auth context

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
          {isLoggedIn ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-lavender-100 text-lavender-600">
                U
              </AvatarFallback>
            </Avatar>
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100/50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-400">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Skincare AI
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-purple-100 text-purple-600">
                U
              </AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-6">
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

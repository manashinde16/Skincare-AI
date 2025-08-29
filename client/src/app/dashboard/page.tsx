"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, LogOut, Sparkles, Plus, Search, BarChart3, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getSkincareHistory } from "@/lib/api";

export default function DashboardPage() {
  const [history, setHistory] = useState<Array<{ id: string; createdAt: string; data: unknown }>>([]);
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
        setHistory(Array.isArray(res.items) ? res.items : []);
      } catch (e: any) {
        if (!mounted) return;
        setHistoryError(e?.message || "Failed to load history");
      } finally {
        if (mounted) setLoadingHistory(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        <StickySidebar />

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">AI-Powered Skincare Analysis</span>
                <span className="sm:hidden">AI Skincare</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4">
                Your Skincare Journey
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Discover personalized recommendations and track your skin's transformation with AI-powered insights
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-8 sm:mb-12 flex justify-center">
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">New Analysis</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Start a comprehensive skin assessment</p>
                  </div>
                </div>
                <Link href="/analyze" className="mt-3 sm:mt-4 block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base">
                    Begin Analysis →
                  </Button>
                </Link>
              </Card>

              
            </div>

            

            {/* Recent Activity (real data if available) */}
            <section className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Activity</h2>
                <Button variant="outline" className="text-xs sm:text-sm w-full sm:w-auto">
                  View All
                </Button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {loadingHistory && (
                  <Card className="p-3 sm:p-4 bg-white border-0 shadow-sm">
                    <div className="text-sm text-gray-600">Loading history…</div>
                  </Card>
                )}
                {historyError && (
                  <Card className="p-3 sm:p-4 bg-white border-0 shadow-sm">
                    <div className="text-sm text-red-600">{historyError}</div>
                  </Card>
                )}
                {!loadingHistory && !historyError && history.length === 0 && (
                  <Card className="p-3 sm:p-4 bg-white border-0 shadow-sm">
                    <div className="text-sm text-gray-600">No analyses yet. Start your first one!</div>
                  </Card>
                )}
                {!loadingHistory && !historyError && history.map((h) => (
                  <Card key={h.id} className="p-3 sm:p-4 bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-1.5 sm:p-2 rounded-full bg-blue-100 text-blue-600">
                        <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Completed skin analysis</p>
                        <p className="text-xs sm:text-sm text-gray-500">{new Date(h.createdAt).toLocaleString()}</p>
                      </div>
                      <Link href={`/report?analysisId=${h.id}`} className="text-xs sm:text-sm text-blue-600 hover:underline">View</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StickySidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyItems, setHistoryItems] = useState<string[]>([
    "Acne Treatment",
    "Pigmentation Treatment",
    "Dark Circles",
    "Wrinkles",
    "Oily T Zone",
    "Whiteheads",
    "Blackheads Treatment",
    "Large Pores",
    "Redness Treatment",
    "Sun Damage",
    "Acne Treatment",
    "Pigmentation Treatment",
    "Dark Circles",
    "Wrinkles",
    "Oily T Zone",
    "Whiteheads",
    "Blackheads Treatment",
    "Large Pores",
    "Redness Treatment",
    "Sun Damage",
  ]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredItems = historyItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleViewLatestReport = () => {
    if (historyItems.length > 0) {
      // Navigate to the latest report (first item in history)
      window.location.href = `/report?analysis=${encodeURIComponent(historyItems[0])}`;
    }
  };

  return (
    <aside className={`${collapsed ? "w-16 sm:w-20" : "w-64 sm:w-72 lg:w-80"} sticky top-0 h-screen shrink-0 border-r border-gray-200/60 px-3 sm:px-4 lg:px-6 py-6 sm:py-8 bg-white/80 backdrop-blur-xl flex flex-col shadow-xl`}>
      {/* Top: Logo */}
      <button onClick={() => setCollapsed((v) => !v)} className="flex items-center gap-2 sm:gap-3 group">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        {!collapsed && <span className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skincare AI</span>}
      </button>

      {/* Large spacer */}
      <div className="mt-6 sm:mt-8 lg:mt-10" />

      {/* Middle content */}
      {!collapsed ? (
        <>
          {/* Navigation Menu (Dashboard and Routine removed) */}
          <nav className="space-y-1 sm:space-y-2" />

          {/* Divider */}
          <Separator className="my-4 sm:my-6" />

          {/* New Analysis */}
          <div>
            <Link href="/analyze">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-2.5 sm:py-3 text-sm sm:text-base">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                New Analysis
              </Button>
            </Link>
          </div>

          {/* View Latest Report */}
          <div className="mt-3 sm:mt-4">
            <Button 
              onClick={handleViewLatestReport}
              variant="outline" 
              className="w-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
              disabled={historyItems.length === 0}
            >
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              View Latest Report
            </Button>
          </div>

          {/* Search History */}
          <div className="mt-6 sm:mt-8">
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <Input
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search history"
                className="pl-7 sm:pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-300 text-xs sm:text-sm h-8 sm:h-10"
              />
            </div>
          </div>

          {/* Spacer before History list */}
          <div className="mt-6 sm:mt-8" />

          {/* History list */}
          <div className="flex-1 min-h-0">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 sm:mb-3 font-semibold">Recent Searches</div>
            <div className="overflow-y-auto scroll-smooth pr-1" style={{ maxHeight: 'calc(100vh - 600px)' }}>
              {filteredItems.length === 0 && (
                <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No history found.</p>
              )}
              {filteredItems.map((item, idx) => {
                const globalIndex = historyItems.indexOf(item);
                const isActive = activeIndex === globalIndex;
                const isEditing = editingIndex === globalIndex;
                return (
                  <div
                    key={`${item}-${idx}`}
                    className={`group flex items-center justify-between rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 h-9 sm:h-11 mb-1 sm:mb-2 ${
                      isActive ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200" : "bg-transparent hover:bg-gray-50"
                    } transition-all duration-300`}
                    onClick={() => setActiveIndex(globalIndex)}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      {isEditing ? (
                        <Input
                          autoFocus
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => {
                            const newName = editingValue.trim();
                            setEditingIndex(null);
                            if (newName && newName !== historyItems[globalIndex]) {
                              setHistoryItems((prev) => prev.map((v, i) => (i === globalIndex ? newName : v)));
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const newName = editingValue.trim();
                              setEditingIndex(null);
                              if (newName && newName !== historyItems[globalIndex]) {
                                setHistoryItems((prev) => prev.map((v, i) => (i === globalIndex ? newName : v)));
                              }
                            }
                            if (e.key === "Escape") {
                              setEditingIndex(null);
                              setEditingValue("");
                            }
                          }}
                          className="h-6 sm:h-8 text-xs sm:text-sm"
                        />
                      ) : (
                        <span className="truncate font-medium">{item}</span>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="opacity-70 hover:opacity-100 p-1 sm:p-1.5 rounded-lg hover:bg-gray-200 transition-all duration-300">
                          <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 sm:w-48">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingIndex(globalIndex);
                            setEditingValue(historyItems[globalIndex] || "");
                          }}
                          className="cursor-pointer text-xs sm:text-sm"
                        >
                          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setHistoryItems((prev) => prev.filter((_, i) => i !== globalIndex));
                            if (activeIndex === globalIndex) setActiveIndex(null);
                          }}
                          className="cursor-pointer text-red-600 focus:text-red-600 text-xs sm:text-sm"
                        >
                          <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Collapsed: show compact icon nav with hover tooltips */
        <>
          <nav className="flex flex-col items-center gap-3 mt-4" aria-label="Collapsed navigation">
            <div className="relative group">
              <Link href="/analyze" className="p-2 rounded-xl hover:bg-purple-50 block" aria-label="New Analysis">
                <Plus className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
              </Link>
              <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">New Analysis</span>
            </div>

            <div className="relative group">
              <button
                onClick={handleViewLatestReport}
                className="p-2 rounded-xl hover:bg-indigo-50 block disabled:opacity-50"
                aria-label="View Latest Report"
                disabled={historyItems.length === 0}
              >
                <FileText className={`h-5 w-5 ${historyItems.length === 0 ? 'text-gray-300' : 'text-indigo-600'} group-hover:scale-110 transition-transform`} />
              </button>
              <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">Latest Report</span>
            </div>
          </nav>
        </>
      )}

      {/* Bottom: User + actions - Always visible */}
      <div className="mt-auto pt-4 border-t border-gray-200/60">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-300 shadow-lg">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                {getInitials(user?.name || "User")}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="truncate">
                <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "Guest"}
                </div>
                <div className="text-xs text-gray-500 truncate">{user?.email || "Not signed in"}</div>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="px-1.5 sm:px-2 py-1 sm:py-1.5 border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-8 w-8 sm:h-9 sm:w-8">
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600 text-xs sm:text-sm">
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}


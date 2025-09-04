"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, LogOut, Sparkles, Plus, BarChart3, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getSkincareHistory } from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardPage() {
  const [history, setHistory] = useState<Array<{ id: string; createdAt: string; data: unknown }>>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  

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
    <AuthGuard requireAuth={true}>
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

            

            {/* Recent Activity: now shown only in sidebar */}
          </div>
        </main>
      </div>
    </div>
    </AuthGuard>
  );
}

function StickySidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const [activities, setActivities] = useState<Array<{ id: string; createdAt: string; title: string }>>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);
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

  // Load recent activity from API
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoadingActivities(true);
      setActivitiesError(null);
      try {
        const res = await getSkincareHistory();
        if (!mounted) return;
        const items = Array.isArray(res.items)
          ? res.items.map((it: any) => ({ id: String(it.id || it._id || it.analysisId || Math.random()), createdAt: it.createdAt || new Date().toISOString(), title: it.title || "Completed skin analysis" }))
          : [];
        setActivities(items);
      } catch (e: any) {
        if (!mounted) return;
        setActivitiesError(e?.message || "Failed to load activity");
      } finally {
        if (mounted) setLoadingActivities(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  const handleViewLatestReport = () => {
    if (activities.length > 0) {
      // Navigate to the latest report (first item in history)
      window.location.href = `/report?analysisId=${encodeURIComponent(activities[0].id)}`;
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
              disabled={activities.length === 0}
            >
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              View Latest Report
            </Button>
          </div>
          {/* Recent Activity list in sidebar */}
          <div className="mt-6 sm:mt-8 flex-1 min-h-0">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 sm:mb-3 font-semibold">Recent Activity</div>
            <div className="overflow-y-auto scroll-smooth pr-1" style={{ maxHeight: 'calc(100vh - 600px)' }}>
              {loadingActivities && (
                <p className="text-xs sm:text-sm text-gray-500 text-center py-4">Loading…</p>
              )}
              {activitiesError && (
                <p className="text-xs sm:text-sm text-red-600 text-center py-4">{activitiesError}</p>
              )}
              {!loadingActivities && !activitiesError && activities.length === 0 && (
                <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No recent activity.</p>
              )}
              {!loadingActivities && !activitiesError && activities.map((act, idx) => {
                const isActive = activeIndex === idx;
                const isEditing = editingIndex === idx;
                return (
                  <div
                    key={act.id}
                    className={`group flex items-center justify-between rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 h-9 sm:h-11 mb-1 sm:mb-2 ${
                      isActive ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200" : "bg-transparent hover:bg-gray-50"
                    } transition-all duration-300`}
                    onClick={() => setActiveIndex(idx)}
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
                            if (newName && newName !== act.title) {
                              setActivities((prev) => prev.map((v, i) => (i === idx ? { ...v, title: newName } : v)));
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const newName = editingValue.trim();
                              setEditingIndex(null);
                              if (newName && newName !== act.title) {
                                setActivities((prev) => prev.map((v, i) => (i === idx ? { ...v, title: newName } : v)));
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
                        <span className="truncate font-medium">{act.title}</span>
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
                            setEditingIndex(idx);
                            setEditingValue(act.title || "");
                          }}
                          className="cursor-pointer text-xs sm:text-sm"
                        >
                          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setActivities((prev) => prev.filter((_, i) => i !== idx));
                            if (activeIndex === idx) setActiveIndex(null);
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
                disabled={activities.length === 0}
              >
                <FileText className={`h-5 w-5 ${activities.length === 0 ? 'text-gray-300' : 'text-indigo-600'} group-hover:scale-110 transition-transform`} />
              </button>
              <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">Latest Report</span>
            </div>
          </nav>
        </>
      )}

      {/* Bottom: User + actions - centered */}
      <div className="mt-auto pt-4 border-t border-gray-200/60">
        <DropdownMenu>
          <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center gap-2 min-w-0 rounded-lg px-1.5 py-1 hover:bg-gray-50 transition-colors">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-300 shadow-lg">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="truncate text-center">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                      {user?.name || "Guest"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{user?.email || "Not signed in"}</div>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="center" className="w-40">
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600 text-xs sm:text-sm">
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}


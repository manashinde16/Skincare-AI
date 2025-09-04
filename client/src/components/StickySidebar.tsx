"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, LogOut, Sparkles, Plus, BarChart3, User, Zap, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { getSkincareHistory } from "@/lib/api";

export default function StickySidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
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
          {/* Navigation Menu */}
          <nav className="space-y-1 sm:space-y-2">
            <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </div>
              <span className="font-medium text-sm sm:text-base">Dashboard</span>
            </Link>
            
            <Link href="/routine" className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 group">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </div>
              <span className="font-medium text-sm sm:text-base">Routine</span>
            </Link>
          </nav>

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
              <Link href="/dashboard" className="p-2 rounded-xl hover:bg-blue-50 block" aria-label="Dashboard">
                <BarChart3 className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </Link>
              <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">Dashboard</span>
            </div>

            <div className="relative group">
              <Link href="/routine" className="p-2 rounded-xl hover:bg-green-50 block" aria-label="Routine">
                <Zap className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
              </Link>
              <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">Routine</span>
            </div>

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
        <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
          <div className="flex flex-col items-center gap-2 sm:gap-3 min-w-0">
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
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="px-1.5 sm:px-2 py-1 sm:py-1.5 border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-8 w-8 sm:h-9 sm:w-8">
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-32">
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

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  tag: string;
  notes: string;
  isPublic: boolean;
  createdAt: string;
}

const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: "1",
    title: "Next.js 16 App Directory docs",
    url: "https://nextjs.org/docs",
    tag: "nextjs",
    notes: "Official routing, layouts, and page conventions documentation. Crucial guide.",
    isPublic: true,
    createdAt: "2026-06-05",
  },
  {
    id: "2",
    title: "Figma Design System UI Kits",
    url: "https://figma.com/file/premium-kit",
    tag: "design",
    notes: "Premium asset packages, typography scaling guidelines, and grid layouts.",
    isPublic: false,
    createdAt: "2026-06-06",
  },
  {
    id: "3",
    title: "Introduction to Agentic Assistants",
    url: "https://deepmind.google/ai-agents",
    tag: "ai",
    notes: "Google DeepMind research paper detailing advanced paired programming agents.",
    isPublic: true,
    createdAt: "2026-06-07",
  },
  {
    id: "4",
    title: "Tailwind CSS v4 Roadmap Specs",
    url: "https://tailwindcss.com/specs",
    tag: "framework",
    notes: "Upgraded theme configurations, inline configurations, and custom keyframes.",
    isPublic: false,
    createdAt: "2026-06-07",
  },
  {
    id: "5",
    title: "Vite + React Bundler Optimization",
    url: "https://vite.dev/guide",
    tag: "framework",
    notes: "Guidelines for speeding up dev server HMR reload cycles.",
    isPublic: false,
    createdAt: "2026-06-08",
  },
];

export const DashboardClient: React.FC = () => {
  const router = useRouter();

  // Core Bookmarks Database
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [activeTab, setActiveTab] = useState<"vault" | "bio" | "tags" | "settings">("vault");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Inspector & Modal States
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Bookmark Form States
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  // Keyboard Navigation Index
  const [keyboardIndex, setKeyboardIndex] = useState<number>(-1);

  // Toast System
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // DOM Refs
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize from LocalStorage or Defaults
  useEffect(() => {
    const saved = localStorage.getItem("em_bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        setBookmarks(DEFAULT_BOOKMARKS);
      }
    } else {
      setBookmarks(DEFAULT_BOOKMARKS);
      localStorage.setItem("em_bookmarks", JSON.stringify(DEFAULT_BOOKMARKS));
    }
  }, []);

  // Save changes helper
  const saveBookmarks = (updated: Bookmark[]) => {
    setBookmarks(updated);
    localStorage.setItem("em_bookmarks", JSON.stringify(updated));
  };

  // Toast notifier helper
  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Tag suggestion parser
  useEffect(() => {
    const urlLower = newUrl.toLowerCase();
    if (!urlLower) {
      setSuggestedTags([]);
      return;
    }
    const tags: string[] = [];
    if (urlLower.includes("github") || urlLower.includes("next") || urlLower.includes("code")) {
      tags.push("nextjs", "git", "dev");
    }
    if (urlLower.includes("figma") || urlLower.includes("design") || urlLower.includes("ui")) {
      tags.push("design", "ui-ux", "figma");
    }
    if (urlLower.includes("ai") || urlLower.includes("gemini") || urlLower.includes("google")) {
      tags.push("ai", "tech", "neural");
    }
    if (urlLower.includes("tailwind") || urlLower.includes("css") || urlLower.includes("vite")) {
      tags.push("framework", "css", "vite");
    }
    if (tags.length === 0) {
      tags.push("ref", "saved");
    }
    setSuggestedTags(tags);
  }, [newUrl]);

  // Keyboard Shortcuts Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;

      // Escape key handles blur & closures
      if (e.key === "Escape") {
        if (isInputFocused && activeElement instanceof HTMLInputElement) {
          activeElement.blur();
        }
        setIsDrawerOpen(false);
        setIsAddModalOpen(false);
        return;
      }

      // If typing inside an input, don't trigger vault shortcuts
      if (isInputFocused) return;

      // Focus Search: '/'
      if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
        triggerToast("🔍 Search input focused");
        return;
      }

      // New Bookmark Modal: 'N' or 'n'
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setIsAddModalOpen(true);
        triggerToast("✨ Opened add bookmark panel");
        return;
      }

      // Vault cards navigation
      const filteredCount = filteredBookmarks.length;
      if (filteredCount === 0) return;

      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        setKeyboardIndex((prev) => {
          const next = prev + 1 >= filteredCount ? 0 : prev + 1;
          setSelectedCardId(filteredBookmarks[next].id);
          setIsDrawerOpen(true);
          return next;
        });
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        setKeyboardIndex((prev) => {
          const next = prev - 1 < 0 ? filteredCount - 1 : prev - 1;
          setSelectedCardId(filteredBookmarks[next].id);
          setIsDrawerOpen(true);
          return next;
        });
      } else if (e.key === "Enter") {
        if (keyboardIndex >= 0 && keyboardIndex < filteredCount) {
          e.preventDefault();
          setSelectedCardId(filteredBookmarks[keyboardIndex].id);
          setIsDrawerOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Action: Toggle Public Bio-Link Status
  const handleTogglePublic = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening drawer
    const updated = bookmarks.map((b) => {
      if (b.id === id) {
        const nextState = !b.isPublic;
        triggerToast(
          nextState
            ? "✨ Bookmark added to public Bio Link profile"
            : "🔒 Bookmark removed from public Bio Link"
        );
        return { ...b, isPublic: nextState };
      }
      return b;
    });
    saveBookmarks(updated);
  };

  // Action: Add Bookmark
  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newTitle) {
      triggerToast("⚠️ Please fill in Title and URL");
      return;
    }
    const cleanUrl = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      title: newTitle,
      url: cleanUrl,
      tag: newTag || "inbox",
      notes: newNotes || "",
      isPublic: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newBookmark, ...bookmarks];
    saveBookmarks(updated);
    setIsAddModalOpen(false);

    // Reset Form
    setNewUrl("");
    setNewTitle("");
    setNewTag("");
    setNewNotes("");
    setKeyboardIndex(0);
    setSelectedCardId(newBookmark.id);
    setIsDrawerOpen(true);

    triggerToast("✨ Bookmark added successfully!");
  };

  // Action: Delete Bookmark
  const handleDeleteBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    saveBookmarks(updated);
    setIsDrawerOpen(false);
    setSelectedCardId(null);
    setKeyboardIndex(-1);
    triggerToast("🗑️ Bookmark deleted");
  };

  // Action: Save Inspector Drawer Changes
  const handleUpdateBookmark = (id: string, updates: Partial<Bookmark>) => {
    const updated = bookmarks.map((b) => {
      if (b.id === id) {
        return { ...b, ...updates };
      }
      return b;
    });
    setBookmarks(updated); // Sync local state quickly
    localStorage.setItem("em_bookmarks", JSON.stringify(updated));
  };

  // Filtering Logic
  const filteredBookmarks = bookmarks.filter((b) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(query) ||
      b.url.toLowerCase().includes(query) ||
      b.tag.toLowerCase().includes(query) ||
      b.notes.toLowerCase().includes(query);

    const matchesTag = selectedTag ? b.tag.toLowerCase() === selectedTag.toLowerCase() : true;

    return matchesSearch && matchesTag;
  });

  // Calculate unique tags for selector
  const uniqueTags = Array.from(new Set(bookmarks.map((b) => b.tag.toLowerCase()))).filter(Boolean);

  const selectedBookmark = bookmarks.find((b) => b.id === selectedCardId);

  // Sign out helper
  const handleSignOut = () => {
    triggerToast("Logging out...");
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  return (
    <div className="flex h-screen bg-[#FAF8F5] text-stone-900 overflow-hidden font-sans relative selection:bg-stone-900 selection:text-white">
      
      {/* Toast Alert Banner */}
      <div
        className={`absolute bottom-6 right-6 z-[60] px-4 py-3 rounded-2xl bg-stone-950 text-white font-mono text-[10px] tracking-wide shadow-2xl flex items-center gap-2 transition-all duration-500 transform ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <span>{toast}</span>
      </div>

      {/* 1. Sidebar Panel */}
      <aside className="w-64 border-r border-stone-200/50 bg-[#F4F3EE]/50 flex flex-col justify-between shrink-0 relative z-30 select-none">
        <div>
          {/* Logo Brand Header */}
          <div className="h-20 px-6 border-b border-stone-200/40 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4.5 w-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-stone-950">
              EagerMinds
            </span>
          </div>

          {/* Main Navigation Section */}
          <nav className="p-4 flex flex-col gap-1.5">
            <button
              onClick={() => { setActiveTab("vault"); setSelectedTag(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "vault" && !selectedTag
                  ? "bg-stone-900 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)]"
                  : "text-stone-500 hover:bg-stone-200/45 hover:text-stone-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.5A2.25 2.25 0 0118 21H6a2.25 2.25 0 01-2.25-2.25v-4.5a2.25 2.25 0 012.25-2.25zM6 7.5h12M9 3h6" />
                </svg>
                Private Vault
              </span>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${activeTab === "vault" && !selectedTag ? "bg-white/20 text-white" : "bg-stone-200/80 text-stone-600"}`}>
                {bookmarks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("bio")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "bio"
                  ? "bg-stone-900 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)]"
                  : "text-stone-500 hover:bg-stone-200/45 hover:text-stone-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                Bio Link Profile
              </span>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${activeTab === "bio" ? "bg-white/20 text-white" : "bg-stone-200/80 text-stone-600"}`}>
                {bookmarks.filter((b) => b.isPublic).length}
              </span>
            </button>
          </nav>

          {/* Quick Tags Filter Section */}
          <div className="mt-8 px-6">
            <span className="text-[9px] font-black tracking-widest uppercase text-stone-400">Vault Tags</span>
            <div className="mt-3 flex flex-col gap-1 max-h-48 overflow-y-auto scrollbar-none">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setActiveTab("vault"); setSelectedTag(tag); }}
                  className={`w-full flex items-center justify-between py-1.5 text-xs font-bold lowercase transition-colors cursor-pointer ${
                    selectedTag === tag ? "text-stone-900" : "text-stone-400 hover:text-stone-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
                    #{tag}
                  </span>
                  <span className="font-mono text-[8px]">
                    {bookmarks.filter((b) => b.tag.toLowerCase() === tag).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Account Controls */}
        <div className="p-4 border-t border-stone-200/40 bg-stone-100/30 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="h-8 w-8 rounded-full bg-stone-300 flex items-center justify-center font-black text-xs text-stone-700 border border-stone-400/20 shadow-inner">
              EM
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black tracking-wide text-stone-800">EagerMinds Team</span>
              <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">Workspace Member</span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main content Explorer */}
      <main className="flex-1 flex flex-col h-full bg-[#FAF8F5] relative z-20 overflow-hidden">
        
        {/* Workspace Toolbar Header */}
        <header className="h-20 border-b border-stone-200/40 px-8 flex items-center justify-between shrink-0 bg-white/35 backdrop-blur-md">
          {/* Real-time search bar */}
          <div className="flex-1 max-w-lg relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search reference vault... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setKeyboardIndex(-1);
              }}
              className="w-full pl-11 pr-14 py-2.5 rounded-full border border-stone-200/70 bg-white text-xs font-semibold focus:outline-none focus:border-stone-900 focus:shadow-sm transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 font-mono text-[8px] font-bold text-stone-400 bg-stone-100 border border-stone-200/50 px-1.5 py-0.5 rounded shadow-sm">
              /
            </div>
          </div>

          {/* Quick Create controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Add Reference</span>
              <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-[8px]">N</span>
            </button>
          </div>
        </header>

        {/* Tab Viewport */}
        <div className="flex-1 overflow-y-auto p-8 scroll-mt-20">
          
          {/* Tab 1: Vault Inbox list */}
          {activeTab === "vault" && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200/20">
                <div className="flex flex-col text-left">
                  <h1 className="text-xl font-black tracking-tight text-stone-900">
                    {selectedTag ? `#${selectedTag}` : "All References"}
                  </h1>
                  <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                    Showing {filteredBookmarks.length} item{filteredBookmarks.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              {filteredBookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-stone-200 rounded-3xl bg-white/25">
                  <span className="text-stone-400 text-xs font-semibold italic">No links found matching filter query</span>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredBookmarks.map((bookmark, idx) => {
                    const isSelected = selectedCardId === bookmark.id;
                    const cleanHost = bookmark.url
                      .replace("https://", "")
                      .replace("http://", "")
                      .replace("www.", "")
                      .split("/")[0];
                    return (
                      <div
                        key={bookmark.id}
                        onClick={() => {
                          setSelectedCardId(bookmark.id);
                          setIsDrawerOpen(true);
                          setKeyboardIndex(idx);
                        }}
                        className={`rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 flex flex-col justify-between h-[180px] cursor-pointer relative group ${
                          isSelected
                            ? "border-stone-900 ring-2 ring-stone-900/10 shadow-md"
                            : "border-stone-200/60"
                        }`}
                      >
                        <div>
                          {/* Host & Date info */}
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-bold tracking-wide text-stone-400 flex items-center gap-1.5">
                              {/* Simple Favicon generator */}
                              <img
                                src={`https://www.google.com/s2/favicons?sz=64&domain=${cleanHost}`}
                                alt=""
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-7 3c1.7 0 3 1.3 3 3s-1.3 3-3 3s-3-1.3-3-3s1.3-3 3-3m5 10H7v-1.1c0-1.7 3.3-2.6 5-2.6s5 .9 5 2.6z'/%3E%3C/svg%3E";
                                }}
                                className="h-3.5 w-3.5 rounded-sm filter bg-stone-100 border border-stone-200/50"
                              />
                              {cleanHost}
                            </span>
                            <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-stone-350">
                              {bookmark.createdAt}
                            </span>
                          </div>

                          {/* Title & Notes snippet */}
                          <h3 className="font-black text-stone-900 tracking-tight text-sm leading-snug group-hover:text-stone-700 transition-colors line-clamp-2">
                            {bookmark.title}
                          </h3>
                          <p className="text-[10px] text-stone-400 mt-1.5 line-clamp-1">
                            {bookmark.notes || "No extra notes added."}
                          </p>
                        </div>

                        {/* Bottom stats + tags row */}
                        <div className="flex items-center justify-between mt-4 border-t border-stone-100 pt-3.5">
                          <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#EAE6DF]/70 text-stone-700 border border-stone-300/40">
                            #{bookmark.tag}
                          </span>

                          {/* Public Switch indicator */}
                          <div className="flex items-center gap-2">
                            <span className={`text-[8px] font-black uppercase tracking-widest ${bookmark.isPublic ? "text-stone-900" : "text-stone-350"}`}>
                              {bookmark.isPublic ? "Bio Public" : "Private"}
                            </span>
                            <button
                              onClick={(e) => handleTogglePublic(bookmark.id, e)}
                              className={`h-4.5 w-8 rounded-full flex items-center p-0.5 transition-colors duration-300 ${
                                bookmark.isPublic ? "bg-stone-900 justify-end" : "bg-stone-200 justify-start"
                              }`}
                            >
                              <div className="h-3.5 w-3.5 rounded-full bg-white shadow-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Public Bio Link builder settings */}
          {activeTab === "bio" && (
            <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in">
              <div className="pb-3 border-b border-stone-200/20 text-left">
                <h1 className="text-xl font-black tracking-tight text-stone-900">Bio Link Builder</h1>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                  Preview how your public references directory appears to recruiters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Editor settings pane (Left) */}
                <div className="md:col-span-5 bg-white border border-stone-200/60 rounded-3xl p-6 shadow-sm flex flex-col gap-6 text-left">
                  <div>
                    <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest border-b pb-2">Profile Layout</h3>
                    <div className="mt-4 flex flex-col gap-3">
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Bio Username</label>
                        <input
                          type="text"
                          defaultValue="@eagerminds"
                          disabled
                          className="w-full mt-1.5 px-4 py-2 border border-stone-200 bg-stone-50 text-xs font-semibold rounded-xl text-stone-450 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Custom Title</label>
                        <input
                          type="text"
                          defaultValue="My Resource Vault"
                          className="w-full mt-1.5 px-4 py-2 border border-stone-200 bg-white text-xs font-semibold rounded-xl text-stone-800 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest border-b pb-2">Published Cards</h3>
                    <div className="mt-4 flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {bookmarks.map((b) => (
                        <div key={b.id} className="flex justify-between items-center p-3 border border-stone-100 rounded-xl bg-stone-50/50">
                          <span className="text-[10px] font-bold text-stone-750 truncate max-w-[150px]">{b.title}</span>
                          <button
                            onClick={(e) => handleTogglePublic(b.id, e)}
                            className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full transition-all border ${
                              b.isPublic
                                ? "bg-stone-900 border-stone-900 text-white"
                                : "bg-white border-stone-200 text-stone-550 hover:bg-stone-50"
                            }`}
                          >
                            {b.isPublic ? "Public" : "Draft"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Mobile Profile Simulator Preview (Right) */}
                <div className="md:col-span-7 flex justify-center">
                  <div className="w-[290px] h-[520px] bg-[#FAF8F5] border border-stone-900/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] rounded-[2.8rem] p-5 flex flex-col justify-between items-center select-none border-4 border-stone-950/80 relative">
                    {/* Device Speaker Notch */}
                    <div className="absolute top-2 w-28 h-4 rounded-full bg-stone-950/80 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-stone-800 absolute right-4" />
                    </div>

                    <div className="flex flex-col items-center mt-6 w-full">
                      {/* Avatar stack */}
                      <div className="h-14 w-14 rounded-full bg-stone-900 border-2 border-white flex items-center justify-center text-white font-black text-sm shadow-md">
                        EM
                      </div>
                      <span className="text-xs font-black tracking-wider text-stone-850 mt-3">@eagerminds</span>
                      <span className="text-[9px] font-bold text-stone-400 tracking-wider mt-0.5">My Resource Vault</span>

                      {/* Mock bio buttons list */}
                      <div className="w-full flex flex-col gap-2.5 items-center justify-center mt-6 max-h-[300px] overflow-y-auto scrollbar-none px-1">
                        {bookmarks.filter((b) => b.isPublic).length === 0 ? (
                          <div className="py-12 text-center text-stone-300 text-[10px] italic">No public bookmarks published.</div>
                        ) : (
                          bookmarks
                            .filter((b) => b.isPublic)
                            .map((b) => (
                              <a
                                key={b.id}
                                href={b.url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-3 px-4 rounded-2xl bg-white border border-stone-200/70 text-[9px] font-black uppercase tracking-wider text-stone-850 text-center shadow-sm cursor-pointer hover:bg-stone-50 transition-colors truncate block"
                              >
                                {b.title}
                              </a>
                            ))
                        )}
                      </div>
                    </div>

                    <div className="text-[8px] font-black tracking-widest text-stone-300 uppercase pb-1 flex items-center gap-1.5 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      eagerminds.bio
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* 3. Slide-Out Details Inspector Drawer (Right) */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-96 bg-white border-l border-stone-200/60 shadow-[0_0_50px_rgba(0,0,0,0.08)] transform transition-transform duration-500 ease-in-out flex flex-col justify-between text-left ${
          isDrawerOpen && selectedBookmark ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedBookmark ? (
          <>
            <div>
              {/* Header metadata details */}
              <div className="h-20 border-b border-stone-200/40 px-6 flex items-center justify-between bg-stone-50/50">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Reference Details</span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-stone-200/50 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Editable Fields Content */}
              <div className="p-6 flex flex-col gap-6 overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Resource Title</label>
                  <input
                    type="text"
                    value={selectedBookmark.title}
                    onChange={(e) => handleUpdateBookmark(selectedBookmark.id, { title: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-850"
                  />
                </div>

                {/* URL Host */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Target Link URL</label>
                  <div className="flex gap-2 mt-1.5">
                    <input
                      type="text"
                      value={selectedBookmark.url}
                      onChange={(e) => handleUpdateBookmark(selectedBookmark.id, { url: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-850"
                    />
                    <a
                      href={selectedBookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 flex items-center justify-center transition-colors shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Tags Category */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Vault Tag</label>
                  <input
                    type="text"
                    value={selectedBookmark.tag}
                    onChange={(e) => handleUpdateBookmark(selectedBookmark.id, { tag: e.target.value.toLowerCase() })}
                    className="w-full mt-1.5 px-3 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-850 lowercase"
                  />
                </div>

                {/* Description Notes editor */}
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Personal Reference Notes</label>
                  <textarea
                    rows={4}
                    value={selectedBookmark.notes}
                    onChange={(e) => handleUpdateBookmark(selectedBookmark.id, { notes: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-850 resize-none leading-relaxed"
                    placeholder="Write a custom description, highlights, or search keywords here..."
                  />
                </div>

                {/* Public profile switch */}
                <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/50 rounded-2xl">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-stone-800 uppercase tracking-wider">Publish status</span>
                    <span className="text-[8px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Show in Bio Page list</span>
                  </div>
                  <button
                    onClick={(e) => handleTogglePublic(selectedBookmark.id, e)}
                    className={`h-5 w-9 rounded-full flex items-center p-0.5 transition-colors duration-300 ${
                      selectedBookmark.isPublic ? "bg-stone-900 justify-end" : "bg-stone-200 justify-start"
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer deletion control */}
            <div className="p-6 border-t border-stone-100 bg-stone-50/50 flex gap-3">
              <button
                onClick={() => handleDeleteBookmark(selectedBookmark.id)}
                className="w-full py-3 text-center text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Delete Bookmark
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 text-xs italic">Select a card to inspect.</div>
        )}
      </div>

      {/* 4. Add Bookmark Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 shadow-2xl text-left relative z-20 mx-4">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-5">
              <h3 className="text-sm font-black text-stone-950 uppercase tracking-widest">Add New Bookmark</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-450 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Inputs Form */}
            <form onSubmit={handleAddBookmark} className="flex flex-col gap-4">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Target Link URL</label>
                <input
                  type="text"
                  placeholder="e.g. github.com/nextjs/next.js"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-800"
                  required
                />
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Bookmark Title</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js Repository"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-800"
                  required
                />
              </div>

              {/* Tag + Suggestions parser */}
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Vault Tag</label>
                <input
                  type="text"
                  placeholder="e.g. nextjs, design, ai"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value.toLowerCase())}
                  className="w-full mt-1.5 px-3 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-800 lowercase"
                />

                {/* Auto Suggestions badge picker */}
                {suggestedTags.length > 0 && (
                  <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">Suggested:</span>
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setNewTag(tag)}
                        className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          newTag === tag
                            ? "bg-stone-900 border-stone-900 text-white"
                            : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-500"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Reference Notes</label>
                <textarea
                  rows={3}
                  placeholder="Write details, study guides, or context tags here..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-stone-900 text-stone-850 resize-none leading-relaxed"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 text-center text-[10px] font-black uppercase tracking-widest rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-center text-[10px] font-black uppercase tracking-widest rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-md cursor-pointer"
                >
                  Save Bookmark
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

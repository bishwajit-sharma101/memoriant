"use client";

import React, { useState, useMemo } from "react";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: "AI" | "Development" | "Design" | "Productivity";
  tags: string[];
  dateAdded: string;
}

const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: "1",
    title: "Building Next.js 16 Applications with React 19",
    url: "nextjs.org/docs",
    category: "Development",
    tags: ["nextjs", "react", "frontend"],
    dateAdded: "2 mins ago",
  },
  {
    id: "2",
    title: "Designing Premium Interfaces: Gradients and Glassmorphism",
    url: "refactoringui.com/design-tips",
    category: "Design",
    tags: ["css", "ui", "ux"],
    dateAdded: "1 hour ago",
  },
  {
    id: "3",
    title: "The Rise of Agentic AI Coding Assistants in 2026",
    url: "deepmind.google/discover",
    category: "AI",
    tags: ["ai", "agents", "future"],
    dateAdded: "3 hours ago",
  },
  {
    id: "4",
    title: "10 Productivity Hacks for High-Performing Teams",
    url: "medium.com/productivity",
    category: "Productivity",
    tags: ["work", "productivity", "tips"],
    dateAdded: "1 day ago",
  },
  {
    id: "5",
    title: "Advanced Tailwind CSS v4 Layout Techniques",
    url: "tailwindcss.com/blog",
    category: "Development",
    tags: ["tailwind", "css", "styles"],
    dateAdded: "2 days ago",
  },
];

export const InteractivePreview: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(INITIAL_BOOKMARKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const categories = ["All", "AI", "Development", "Design", "Productivity"];

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || b.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [bookmarks, searchQuery, selectedCategory]);

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setIsAdding(true);

    // Simulate link parsing and tag extraction
    setTimeout(() => {
      // Guess category and title from URL
      let category: Bookmark["category"] = "Development";
      let title = newTitle || newUrl.replace(/https?:\/\/(www\.)?/, "");
      let tags: string[] = ["saved"];

      const urlLower = newUrl.toLowerCase();
      if (urlLower.includes("github") || urlLower.includes("code") || urlLower.includes("dev")) {
        category = "Development";
        tags = ["git", "code", "dev"];
      } else if (urlLower.includes("ai") || urlLower.includes("gpt") || urlLower.includes("gemini")) {
        category = "AI";
        tags = ["ai", "ml", "tech"];
      } else if (urlLower.includes("dribbble") || urlLower.includes("figma") || urlLower.includes("design")) {
        category = "Design";
        tags = ["design", "figma", "ui"];
      } else if (urlLower.includes("notion") || urlLower.includes("todo") || urlLower.includes("time")) {
        category = "Productivity";
        tags = ["productivity", "notion", "work"];
      }

      if (!newTitle) {
        title = `Resource on ${newUrl.replace(/https?:\/\/(www\.)?([^\/]+).*/, "$2")}`;
      }

      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        title,
        url: newUrl.replace(/https?:\/\/(www\.)?/, ""),
        category,
        tags,
        dateAdded: "Just now",
      };

      setBookmarks([newBookmark, ...bookmarks]);
      setNewUrl("");
      setNewTitle("");
      setIsAdding(false);
    }, 800);
  };

  return (
    <div className="w-full rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden flex flex-col md:flex-row h-[550px]">
      {/* Sidebar Folders */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
        <div className="hidden md:block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 px-3">
          Folders
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {cat}
          </button>
        ))}
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Search & Quick Add Section */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search bookmarks, URLs, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:border-zinc-800 dark:bg-zinc-900/50"
              />
            </div>
          </div>

          {/* Quick Add Form */}
          <form onSubmit={handleAddBookmark} className="flex gap-2">
            <input
              type="text"
              placeholder="Paste link to quick-add (e.g. github.com/entireio/cli)..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-950"
              required
            />
            <button
              type="submit"
              disabled={isAdding}
              className="px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center min-w-[90px] cursor-pointer"
            >
              {isAdding ? "Adding..." : "Quick Add"}
            </button>
          </form>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="group p-4 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 bg-white shadow-sm hover:shadow-md transition-all duration-200 dark:border-zinc-900 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/60 dark:hover:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm sm:text-base">
                    {bookmark.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 dark:text-zinc-400">{bookmark.url}</p>
                  <div className="flex gap-1.5 mt-2.5">
                    {bookmark.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                    {bookmark.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">{bookmark.dateAdded}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <svg
                className="h-12 w-12 text-zinc-300 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2m4 4h.01M9 16h.01"
                />
              </svg>
              <h5 className="font-semibold text-zinc-700 dark:text-zinc-300">No bookmarks found</h5>
              <p className="text-sm text-zinc-500 mt-1">Try another category, search term, or add a link above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

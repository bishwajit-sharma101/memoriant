"use client";

import React, { useState, useEffect, useRef } from "react";

export interface Theme {
  id: string;
  name: string;
  bgLeft: string;
  bgRight: string;
  glowTop: string;
  glowBottom: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
}

export const PREMIUM_THEMES: Theme[] = [
  {
    id: "cream-linen",
    name: "Cream & Linen",
    bgLeft: "#EAE6DF",
    bgRight: "#F5F3EF",
    glowTop: "#FFFFFF",
    glowBottom: "#FCE7F3",
    textPrimary: "#1C1917",
    textMuted: "#4A4541",
    accent: "#111111",
  },
  {
    id: "mist-pearl",
    name: "Mist & Pearl",
    bgLeft: "#E2E8F0",
    bgRight: "#F8FAFC",
    glowTop: "#FFFFFF",
    glowBottom: "#E0F2FE",
    textPrimary: "#0F172A",
    textMuted: "#3E4A5B",
    accent: "#1E293B",
  },
  {
    id: "sage-alabaster",
    name: "Sage & Alabaster",
    bgLeft: "#DCE6D9",
    bgRight: "#F3F7F2",
    glowTop: "#FFFFFF",
    glowBottom: "#DCFCE7",
    textPrimary: "#14532D",
    textMuted: "#445142",
    accent: "#166534",
  },
  {
    id: "clay-ivory",
    name: "Clay & Ivory",
    bgLeft: "#EADFD9",
    bgRight: "#F7F3F0",
    glowTop: "#FFFFFF",
    glowBottom: "#FFEDD5",
    textPrimary: "#431407",
    textMuted: "#5C4E48",
    accent: "#9A3412",
  },
  {
    id: "dusk-chalk",
    name: "Dusk & Chalk",
    bgLeft: "#E1DFE9",
    bgRight: "#F3F2F7",
    glowTop: "#FFFFFF",
    glowBottom: "#F3E8FF",
    textPrimary: "#1E1B4B",
    textMuted: "#524C65",
    accent: "#312E81",
  },
  {
    id: "oat-sesame",
    name: "Oat & Sesame",
    bgLeft: "#ECE8DF",
    bgRight: "#FAF8F4",
    glowTop: "#FFFFFF",
    glowBottom: "#FEF9C3",
    textPrimary: "#451A03",
    textMuted: "#5E5345",
    accent: "#78350F",
  },
  {
    id: "ice-glacier",
    name: "Ice & Glacier",
    bgLeft: "#DCE4EC",
    bgRight: "#F2F6FA",
    glowTop: "#FFFFFF",
    glowBottom: "#E0F2FE",
    textPrimary: "#0C4A6E",
    textMuted: "#404F5E",
    accent: "#0369A1",
  },
  {
    id: "matcha-tea",
    name: "Matcha & Tea",
    bgLeft: "#D8E2DC",
    bgRight: "#F2F7F4",
    glowTop: "#FFFFFF",
    glowBottom: "#D1FAE5",
    textPrimary: "#064E3B",
    textMuted: "#3E5649",
    accent: "#047857",
  },
  {
    id: "rose-shell",
    name: "Rose & Shell",
    bgLeft: "#EADEDD",
    bgRight: "#F7F2F1",
    glowTop: "#FFFFFF",
    glowBottom: "#FFE4E6",
    textPrimary: "#4C0519",
    textMuted: "#5E4748",
    accent: "#9F1239",
  },
  {
    id: "haze-silk",
    name: "Haze & Silk",
    bgLeft: "#E2DDD9",
    bgRight: "#F5F2F0",
    glowTop: "#FFFFFF",
    glowBottom: "#F5F5F4",
    textPrimary: "#1C1917",
    textMuted: "#4A4541",
    accent: "#111111",
  },
];

interface AuthThemeProviderProps {
  children: React.ReactNode;
}

export const AuthThemeProvider: React.FC<AuthThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(PREMIUM_THEMES[0]);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    const savedThemeId = localStorage.getItem("em-auth-theme");
    if (savedThemeId) {
      const found = PREMIUM_THEMES.find((t) => t.id === savedThemeId);
      if (found) setCurrentTheme(found);
    }
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("em-auth-theme", theme.id);
    setIsOpen(false);
  };

  const cycleTheme = () => {
    const currentIndex = PREMIUM_THEMES.findIndex((t) => t.id === currentTheme.id);
    const nextIndex = (currentIndex + 1) % PREMIUM_THEMES.length;
    selectTheme(PREMIUM_THEMES[nextIndex]);
  };

  // Inline CSS variables injected dynamically
  const themeStyles = {
    "--bg-left": currentTheme.bgLeft,
    "--bg-right": currentTheme.bgRight,
    "--glow-top": currentTheme.glowTop,
    "--glow-bottom": currentTheme.glowBottom,
    "--text-primary": currentTheme.textPrimary,
    "--text-muted": currentTheme.textMuted,
    "--accent": currentTheme.accent,
  } as React.CSSProperties;

  return (
    <div
      style={themeStyles}
      className="relative w-full h-[100dvh] overflow-hidden theme-transition"
    >
      {/* Dynamic Theme Switcher UI */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-2" ref={dropdownRef}>
        {/* Toggle Button */}
        <button
          onClick={cycleTheme}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] text-stone-900 transition-all duration-500 group cursor-pointer"
        >
          {/* Circular Palette Preview */}
          <div className="flex h-5 w-5 rounded-full overflow-hidden border border-stone-200/50 shadow-inner scale-100 group-hover:scale-110 transition-transform duration-500">
            <div className="w-1/2 h-full theme-transition" style={{ backgroundColor: currentTheme.bgLeft }} />
            <div className="w-1/2 h-full theme-transition" style={{ backgroundColor: currentTheme.bgRight }} />
          </div>
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-700">
            Theme: <span className="text-stone-900">{currentTheme.name}</span>
          </span>

          {/* Quick Menu Opener Button */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
            title="All themes"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`h-3 w-3 text-stone-500 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-14 w-60 rounded-3xl bg-white/95 backdrop-blur-xl border border-white/60 p-3.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="px-2 pb-1.5 border-b border-stone-100/50">
              <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Select Light Variation</p>
            </div>
            <div className="max-h-64 overflow-y-auto pr-1 flex flex-col gap-1">
              {PREMIUM_THEMES.map((theme) => {
                const isActive = theme.id === currentTheme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => selectTheme(theme)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-stone-900 text-white font-semibold"
                        : "hover:bg-stone-50 text-stone-700 hover:text-stone-950"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-4.5 w-4.5 rounded-full overflow-hidden border border-stone-200/50 shadow-inner">
                        <div className="w-1/2 h-full" style={{ backgroundColor: theme.bgLeft }} />
                        <div className="w-1/2 h-full" style={{ backgroundColor: theme.bgRight }} />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wide">{theme.name}</span>
                    </div>
                    {isActive && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="h-3.5 w-3.5 text-white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main wrapped screen */}
      <div className="w-full h-full flex flex-row">
        {children}
      </div>
    </div>
  );
};

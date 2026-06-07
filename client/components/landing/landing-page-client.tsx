"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const LandingPageClient: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Fade out loader on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for Scroll Reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleNavigate = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
    }, 450);
  };

  return (
    <>
      {/* Fullscreen Premium Loader Overlay */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] transition-all duration-700 ease-in-out ${
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-5 animate-pulse-logo">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-white shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-stone-900">
            EagerMinds
          </span>
        </div>
      </div>

      {/* Main page layout */}
      <div
        className={`min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-stone-900 selection:text-white transition-colors duration-500 ${
          isExiting ? "animate-exit-fade" : ""
        }`}
      >
        {/* Visual background grid pattern */}
        <div className="absolute inset-0 -z-30 h-full w-full bg-[#FAF8F5] bg-[linear-gradient(to_right,#e5e5e030_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e030_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />

        {/* Navigation Header */}
        <header className="sticky top-0 z-40 w-full border-b border-stone-200/40 bg-[#FAF8F5]/60 backdrop-blur-md animate-in fade-in duration-1000">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-stone-900">
                EagerMinds
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <a href="#features" className="hover:text-stone-900 transition-colors">Features</a>
              <a href="#workflow" className="hover:text-stone-900 transition-colors">How it works</a>
              <a href="#stats" className="hover:text-stone-900 transition-colors">Performance</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate("/signin")}
                className="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-550 hover:bg-stone-100/50 hover:text-stone-900 transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavigate("/signup")}
                className="rounded-full bg-stone-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="absolute top-[-10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-[#EAE6DF] opacity-40 blur-[120px] pointer-events-none" />
          <div className="absolute top-[20%] right-[15%] -z-10 h-[600px] w-[600px] rounded-full bg-[#FFE4E6] opacity-30 blur-[130px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Content (Left) */}
            <div className="lg:col-span-7 flex flex-col text-left items-start animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
              <span className="inline-flex items-center rounded-full bg-[#EAE6DF]/60 border border-stone-200/50 px-4 py-1.5 text-[9px] font-black tracking-widest uppercase text-stone-700 mb-6">
                Linktree meets Pocket
              </span>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-stone-950 leading-[0.95] capitalize">
                Your digital mind,<br />perfectly organized.
              </h1>
              <p className="mt-8 max-w-xl text-base sm:text-lg text-stone-500 font-medium leading-relaxed">
                A premium, keyboard-first bookmarks repository. Capture references in your private Pocket inbox, tag automatically, and publish directly to your custom public bio link.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row w-full sm:w-auto">
                <button
                  onClick={() => handleNavigate("/signup")}
                  className="w-full sm:w-auto text-center rounded-full bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-500 cursor-pointer"
                >
                  Start Bookmarking Free
                </button>
                <a
                  href="#workflow"
                  className="w-full sm:w-auto text-center rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-700 hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
                >
                  Learn How It Works
                </a>
              </div>
            </div>

            {/* Hero Visual Canvas - 3D Perspective Stack (Right) */}
            <div className="lg:col-span-5 h-[500px] w-full flex items-center justify-center perspective-[2000px] preserve-3d select-none relative animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
              
              {/* Background Layer: Tag Stack */}
              <div className="absolute z-10 animate-float-fast pointer-events-auto transform hover:translate-z-[40px] transition-transform duration-500" style={{ right: '15%', top: '15%' }}>
                <div className="flex flex-col gap-2.5">
                  <span className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full bg-[#EAE6DF] border border-stone-300/40 text-stone-700 shadow-md">
                    #ai-agents
                  </span>
                  <span className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full bg-white/85 backdrop-blur-md border border-stone-200 text-stone-600 shadow-md">
                    #nextjs16
                  </span>
                  <span className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full bg-white/85 backdrop-blur-md border border-stone-200 text-stone-600 shadow-md">
                    #ui-design
                  </span>
                </div>
              </div>

              {/* Middle Layer: Pocket Saved Card */}
              <div className="absolute z-20 animate-float-slow pointer-events-auto transform hover:translate-z-[80px] hover:-rotate-x-[2deg] hover:rotate-y-[5deg] transition-all duration-500" style={{ left: '5%', top: '25%' }}>
                <div className="w-[290px] bg-white border border-stone-200/60 rounded-3xl p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06)] flex flex-col">
                  <div className="w-full h-32 rounded-2xl bg-stone-100 mb-4 overflow-hidden relative border border-stone-200/30">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#EAE6DF] to-stone-50" />
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-white/90 text-[8px] font-black tracking-widest uppercase text-stone-800 border border-stone-200/50">
                      Development
                  </div>
                  </div>
                  <h3 className="font-black text-stone-900 tracking-tight text-sm leading-snug">
                    The Rise of Agentic AI Coding Assistants in 2026
                  </h3>
                  <div className="flex items-center justify-between mt-5 border-t border-stone-100 pt-3">
                    <span className="text-[9px] font-bold tracking-wide text-stone-400">deepmind.google</span>
                    <span className="text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#EAE6DF]/40 text-stone-600">
                      5m read
                    </span>
                  </div>
                </div>
              </div>

              {/* Foreground Layer: Linktree Bio Mobile Card */}
              <div className="absolute z-30 animate-float-medium pointer-events-auto transform hover:translate-z-[120px] hover:rotate-x-[5deg] hover:-rotate-y-[10deg] transition-all duration-500" style={{ right: '5%', bottom: '10%' }}>
                <div className="w-[220px] h-[310px] bg-[#FAF8F5] border border-stone-200 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.12)] rounded-[2.2rem] p-4 flex flex-col items-center justify-between">
                  
                  <div className="flex flex-col items-center mt-2">
                    <div className="h-11 w-11 rounded-full bg-stone-900 border border-white/60 flex items-center justify-center text-white font-black text-xs shadow-inner">
                      EM
                    </div>
                    <span className="text-[10px] font-black tracking-wider text-stone-800 mt-2">@eagerminds</span>
                    <span className="text-[8px] font-bold tracking-wide text-stone-400 mt-0.5">My Resource Hub</span>
                  </div>

                  <div className="flex-1 w-full flex flex-col gap-2 items-center justify-center my-4">
                    <div className="w-full py-2.5 rounded-full bg-white border border-stone-200/70 text-[9px] font-black uppercase tracking-wider text-stone-800 text-center shadow-sm cursor-pointer hover:bg-stone-50 transition-colors">
                      GitHub Profile
                    </div>
                    <div className="w-full py-2.5 rounded-full bg-white border border-stone-200/70 text-[9px] font-black uppercase tracking-wider text-stone-800 text-center shadow-sm cursor-pointer hover:bg-stone-50 transition-colors">
                      AI Reading List
                    </div>
                    <div className="w-full py-2.5 rounded-full bg-white border border-stone-200/70 text-[9px] font-black uppercase tracking-wider text-stone-800 text-center shadow-sm cursor-pointer hover:bg-stone-50 transition-colors">
                      Figma Workspace
                    </div>
                  </div>

                  <div className="text-[7px] font-black tracking-widest text-stone-300 uppercase pb-1">
                    EagerMinds Bio
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How it Works / Workflow Section */}
        <section id="workflow" className="py-24 border-t border-b border-stone-200/30 bg-[#F3EFE9]/40 backdrop-blur-sm scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 reveal-on-scroll">The Lifecycle</span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-stone-900 mt-2 mb-16 reveal-on-scroll">How EagerMinds Bookmarks Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center relative group reveal-on-scroll">
                <div className="h-16 w-16 rounded-full bg-stone-900 text-white flex items-center justify-center text-lg font-black shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                  1
                </div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Capture (Pocket Mode)</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500 font-medium px-4">
                  Save links instantly from any browser or dev tool. Your pocket index keeps links private, secure, and searchable.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center relative group reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
                <div className="h-16 w-16 rounded-full bg-[#EAE6DF] text-stone-900 border border-stone-300/40 flex items-center justify-center text-lg font-black shadow-md mb-6 group-hover:scale-110 transition-transform duration-500">
                  2
                </div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Smart Classification</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500 font-medium px-4">
                  Metadata is parsed automatically. Categorize links into folder groups and tags dynamically without manual work.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center relative group reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                <div className="h-16 w-16 rounded-full bg-[#EAE6DF] text-stone-900 border border-stone-300/40 flex items-center justify-center text-lg font-black shadow-md mb-6 group-hover:scale-110 transition-transform duration-500">
                  3
                </div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Publish (Linktree Mode)</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500 font-medium px-4">
                  Toggle a link's public status to instantly display it on your public bio profile page. Share one link to show all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-20 border-b border-stone-200/20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <dl className="grid grid-cols-1 gap-y-12 gap-x-8 text-center sm:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-3 reveal-on-scroll">
                <dt className="text-[10px] font-black uppercase tracking-widest text-stone-400">Bookmarks Indexing</dt>
                <dd className="order-first text-5xl font-black tracking-tight sm:text-6xl text-stone-900">2.5M+</dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-3 reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
                <dt className="text-[10px] font-black uppercase tracking-widest text-stone-400">Search Speeds</dt>
                <dd className="order-first text-5xl font-black tracking-tight sm:text-6xl text-stone-900">&lt; 14ms</dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-3 reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                <dt className="text-[10px] font-black uppercase tracking-widest text-stone-400">Developer Teams</dt>
                <dd className="order-first text-5xl font-black tracking-tight sm:text-6xl text-stone-900">12,000+</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Supercharged Core</span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-stone-900 mt-2">Uncompromised Power</h2>
            <p className="mt-4 text-stone-500 font-medium">Everything you need to index, discover, and share link assets instantly.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-stone-200/50 bg-white/40 backdrop-blur p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 reveal-on-scroll">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE6DF] text-stone-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-black text-stone-900 tracking-tight">Lightning Search</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 font-medium">Search tags, titles, URLs, and description bodies instantly with hotkeys-first keyboard navigability.</p>
            </div>

            <div className="rounded-2xl border border-stone-200/50 bg-white/40 backdrop-blur p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE6DF] text-stone-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-black text-stone-900 tracking-tight">Team Spaces</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 font-medium">Share curated resource lists and digital libraries with teams inside custom, secure workspaces.</p>
            </div>

            <div className="rounded-2xl border border-stone-200/50 bg-white/40 backdrop-blur p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE6DF] text-stone-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13l1-7.205L5 13.795h5.813a3 3 0 01.002 2.109z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-black text-stone-900 tracking-tight">Smart Auto-Tagging</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 font-medium">Link parsers detect webpage metadata, auto-generating descriptive tags and sorting them efficiently.</p>
            </div>
          </div>
        </section>

        <footer className="py-16 text-center text-xs font-bold uppercase tracking-widest text-stone-400 border-t border-stone-200/20 bg-[#F3EFE9]/10">
          <p>© 2026 EagerMinds Bookmarks. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

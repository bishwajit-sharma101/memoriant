"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface MockBookmark {
  title: string;
  url: string;
  tag: string;
}

export const LandingPageClient: React.FC = () => {
  const router = useRouter();
  
  // Loader states
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Transition exit state
  const [isExiting, setIsExiting] = useState(false);

  // Scroll reveal states
  const [workflowRevealed, setWorkflowRevealed] = useState(false);
  const [statsRevealed, setStatsRevealed] = useState(false);
  const [featuresRevealed, setFeaturesRevealed] = useState(false);

  // Stats visibility state
  const [statsVisible, setStatsVisible] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [speedCount, setSpeedCount] = useState(100);
  const [teamsCount, setTeamsCount] = useState(0);

  // Workflow simulator state
  const [activeStep, setActiveStep] = useState<number>(1);
  const [simStep2Tags, setSimStep2Tags] = useState<string[]>([]);
  
  // Feature Playgrounds state
  const [searchQuery, setSearchQuery] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [detectedTags, setDetectedTags] = useState<string[]>([]);
  const [collabHovered, setCollabHovered] = useState(false);
  const [collabLogs, setCollabLogs] = useState<string[]>(["Workspace initialized."]);

  // Mock search bookmark data
  const MOCK_SEARCH_DATA: MockBookmark[] = [
    { title: "Next.js 16 Routing Guide", url: "nextjs.org/docs", tag: "dev" },
    { title: "Sleek Glassmorphism Effects", url: "glassy.ui/styles", tag: "design" },
    { title: "Introduction to Agentic AI", url: "deepmind.google/ai", tag: "ai" },
    { title: "Advanced CSS Variables", url: "css-tricks.com/vars", tag: "design" },
  ];

  // Loader count loop
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 350);
          return 100;
        }
        return prev + 1;
      });
    }, 12);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "workflow") {
              setWorkflowRevealed(true);
            } else if (entry.target.id === "stats") {
              setStatsRevealed(true);
              setStatsVisible(true);
            } else if (entry.target.id === "features") {
              setFeaturesRevealed(true);
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    const sections = ["workflow", "stats", "features"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Stats Count-Up interpolation loop
  useEffect(() => {
    if (!statsVisible) return;
    let tick = 0;
    const interval = setInterval(() => {
      tick += 1;
      if (tick >= 100) {
        setBookmarksCount(2.5);
        setSpeedCount(14);
        setTeamsCount(12);
        clearInterval(interval);
      } else {
        setBookmarksCount(Number((tick * 0.025).toFixed(2)));
        setSpeedCount(Number((100 - tick * 0.86).toFixed(1)));
        setTeamsCount(Number((tick * 0.12).toFixed(1)));
      }
    }, 15);
    return () => clearInterval(interval);
  }, [statsVisible]);

  // Auto-Tag preset analyzer
  useEffect(() => {
    const urlLower = tagInput.toLowerCase();
    if (!urlLower) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDetectedTags([]);
      return;
    }
    const tags: string[] = [];
    if (urlLower.includes("github") || urlLower.includes("next") || urlLower.includes("code")) {
      tags.push("git", "dev", "code");
    }
    if (urlLower.includes("figma") || urlLower.includes("design") || urlLower.includes("ui")) {
      tags.push("figma", "ui-ux", "design");
    }
    if (urlLower.includes("ai") || urlLower.includes("gemini") || urlLower.includes("gpt")) {
      tags.push("ai", "neural", "future");
    }
    if (tags.length === 0) {
      tags.push("saved", "bookmark");
    }
    setDetectedTags(tags);
  }, [tagInput]);

  // Step 2 Tags simulated mount
  useEffect(() => {
    if (activeStep === 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSimStep2Tags([]);
      const t1 = setTimeout(() => setSimStep2Tags(["#code"]), 400);
      const t2 = setTimeout(() => setSimStep2Tags(["#code", "#framework"]), 800);
      const t3 = setTimeout(() => setSimStep2Tags(["#code", "#framework", "#git"]), 1200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [activeStep]);

  // Workspace mock notifications
  const handleCollabAction = (name: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setCollabLogs((prev) => [`[${time}] ✨ ${name} joined shared pool!`, ...prev.slice(0, 2)]);
  };

  const handleNavigate = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
    }, 450);
  };

  const filteredSearchMock = MOCK_SEARCH_DATA.filter((b) => {
    const lower = searchQuery.toLowerCase();
    return b.title.toLowerCase().includes(lower) || b.tag.toLowerCase().includes(lower);
  });

  return (
    <>
      {/* Fullscreen Monospace Percentage Loader */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] transition-all duration-700 ease-in-out ${
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Subtle spinning indicator with progress nested */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="h-12 w-12 rounded-full border border-stone-200 border-t-stone-900 animate-spin duration-1000" />
            <div className="absolute font-mono text-[9px] font-bold text-stone-900">
              {loadProgress.toString().padStart(2, "0")}
            </div>
          </div>

          {/* Sleek lowercase/uppercase thin tracking header */}
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 mb-1.5">
            EAGERMINDS
          </span>

          <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest">
            Initializing workspace...
          </span>
        </div>
      </div>

      {/* Main page layout */}
      <div
        className={`min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-stone-900 selection:text-white transition-colors duration-500 ${
          isExiting ? "animate-exit-fade" : ""
        }`}
      >
        <div className="absolute inset-0 -z-30 h-full w-full bg-[#FAF8F5] bg-[linear-gradient(to_right,#e5e5e030_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e030_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />

        {/* Navigation Header */}
        <header className="sticky top-0 z-40 w-full border-b border-stone-200/40 bg-[#FAF8F5]/60 backdrop-blur-md animate-in fade-in duration-1000">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
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
                className="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-100/50 hover:text-stone-900 transition-all cursor-pointer"
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
            {/* Hero Content */}
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

            {/* 3D Floating Canvas */}
            <div className="lg:col-span-5 h-[500px] w-full flex items-center justify-center perspective-[2000px] preserve-3d select-none relative animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
              {/* Tags Layer */}
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

              {/* Pocket Saved Card */}
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
                    <span className="text-[9px] font-bold tracking-wide text-stone-450">deepmind.google</span>
                    <span className="text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#EAE6DF]/40 text-stone-600">
                      5m read
                    </span>
                  </div>
                </div>
              </div>

              {/* Linktree Bio Mobile Card */}
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

        {/* Overhauled Workflow Simulator Section */}
        <section id="workflow" className="py-24 border-t border-b border-stone-200/30 bg-[#F3EFE9]/40 backdrop-blur-sm scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-16">
              <span className={`text-[10px] font-black uppercase tracking-widest text-stone-400 reveal-on-scroll ${workflowRevealed ? "revealed" : ""}`}>The Cycle</span>
              <h2 className={`text-3xl font-black tracking-tight sm:text-4xl text-stone-900 mt-2 reveal-on-scroll ${workflowRevealed ? "revealed" : ""}`}>Interactive App Simulator</h2>
              <p className={`mt-4 text-stone-500 font-medium reveal-on-scroll ${workflowRevealed ? "revealed" : ""}`}>Hover over each step below to witness the app in action.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Step Controls (Left) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Step 1 Selector */}
                <div
                  onMouseEnter={() => setActiveStep(1)}
                  className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer text-left reveal-on-scroll ${workflowRevealed ? "revealed" : ""} ${
                    activeStep === 1
                      ? "bg-white border-stone-200 shadow-md translate-x-2"
                      : "bg-transparent border-transparent hover:bg-stone-100/30 hover:border-stone-200/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-xs transition-colors duration-500 ${
                      activeStep === 1 ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-600"
                    }`}>
                      01
                    </div>
                    <h3 className="text-base font-black text-stone-900 tracking-tight">Capture (Pocket Mode)</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-stone-500 font-medium pl-14">
                    Save references from any source. The link lands instantly in your secure, private inbox database.
                  </p>
                </div>

                {/* Step 2 Selector */}
                <div
                  onMouseEnter={() => setActiveStep(2)}
                  className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer text-left reveal-on-scroll ${workflowRevealed ? "revealed" : ""} ${
                    activeStep === 2
                      ? "bg-white border-stone-200 shadow-md translate-x-2"
                      : "bg-transparent border-transparent hover:bg-stone-100/30 hover:border-stone-200/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-xs transition-colors duration-500 ${
                      activeStep === 2 ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-600"
                    }`}>
                      02
                    </div>
                    <h3 className="text-base font-black text-stone-900 tracking-tight">Smart Auto-Tagging</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-stone-500 font-medium pl-14">
                    Link metadata is queried automatically. Dynamic tag labels map onto your assets in a split-second.
                  </p>
                </div>

                {/* Step 3 Selector */}
                <div
                  onMouseEnter={() => setActiveStep(3)}
                  className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer text-left reveal-on-scroll ${workflowRevealed ? "revealed" : ""} ${
                    activeStep === 3
                      ? "bg-white border-stone-200 shadow-md translate-x-2"
                      : "bg-transparent border-transparent hover:bg-stone-100/30 hover:border-stone-200/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-xs transition-colors duration-500 ${
                      activeStep === 3 ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-600"
                    }`}>
                      03
                    </div>
                    <h3 className="text-base font-black text-stone-900 tracking-tight">Publish to Bio Link</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-stone-500 font-medium pl-14">
                    Toggle your links to public status. Selected resources instantly display on your public bio page.
                  </p>
                </div>
              </div>

              {/* Simulator Display Screen (Right) */}
              <div className={`lg:col-span-7 h-[420px] bg-white/70 backdrop-blur border border-stone-200/60 rounded-3xl p-6 shadow-lg flex items-center justify-center overflow-hidden relative reveal-on-scroll ${workflowRevealed ? "revealed" : ""}`}>
                
                {/* Step 1 Simulator Screen */}
                {activeStep === 1 && (
                  <div className="w-full flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-full max-w-sm px-4 py-3 rounded-full border border-stone-200 bg-white shadow-inner flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
                      <span className="text-[10px] font-mono text-stone-500">typing: nextjs.org/docs/routing</span>
                    </div>
                    
                    <div className="w-full max-w-sm p-4 bg-[#FAF8F5] border border-stone-200/80 rounded-2xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] animate-bounce">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">Resource Saved</span>
                        <span className="h-1.5 w-10 rounded bg-stone-200" />
                      </div>
                      <h4 className="text-xs font-black text-stone-900">Next.js Routing Framework docs</h4>
                      <p className="text-[9px] text-stone-400 mt-1">nextjs.org</p>
                    </div>
                  </div>
                )}

                {/* Step 2 Simulator Screen */}
                {activeStep === 2 && (
                  <div className="w-full flex flex-col items-center gap-5 animate-in fade-in duration-500">
                    <div className="w-full max-w-sm p-5 bg-white border border-stone-200 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] relative">
                      <div className="h-2 w-10 bg-stone-100 rounded mb-4" />
                      <h4 className="text-sm font-black text-stone-900">Next.js Routing Framework docs</h4>
                      
                      {/* Tag attachment zone */}
                      <div className="flex gap-2 mt-5 h-6 items-center">
                        {simStep2Tags.length === 0 ? (
                          <span className="text-[9px] text-stone-400 italic">analyzing tags...</span>
                        ) : (
                          simStep2Tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#EAE6DF] text-stone-700 border border-stone-300/40 animate-in zoom-in-90 duration-300"
                            >
                              {tag}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 Simulator Screen */}
                {activeStep === 3 && (
                  <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-6 px-4 animate-in fade-in duration-500 relative">
                    
                    {/* Left side: Private Inbox Item */}
                    <div className="flex-1 max-w-[200px] p-4 bg-white border border-stone-200 rounded-2xl shadow-sm relative z-10">
                      <div className="h-1.5 w-8 bg-stone-100 rounded mb-2" />
                      <h5 className="text-[10px] font-black text-stone-900 leading-snug">Next.js Routing docs</h5>
                      
                      {/* Interactive toggle switch simulator */}
                      <div className="flex items-center justify-between mt-4 border-t pt-2 border-stone-50">
                        <span className="text-[8px] font-bold text-stone-400 uppercase">Public Bio</span>
                        <div className="h-3.5 w-7 rounded-full bg-stone-900 flex items-center justify-end px-0.5 cursor-pointer">
                          <div className="h-2.5 w-2.5 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>

                    {/* Laser link transfer indicator */}
                    <div className="hidden sm:block flex-1 border-t-2 border-dashed border-stone-300 relative">
                      <div className="absolute -top-1.5 right-0 animate-ping h-3.5 w-3.5 rounded-full bg-stone-900 flex items-center justify-center text-[7px] text-white font-bold">
                        →
                      </div>
                    </div>

                    {/* Right side: Mobile Mock profile */}
                    <div className="w-[170px] h-[260px] bg-[#FAF8F5] border border-stone-200 rounded-[1.8rem] shadow-md p-3 flex flex-col items-center justify-between relative z-10">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-stone-900 border border-white/60 flex items-center justify-center text-white text-[9px] font-black shadow-inner">
                          EM
                        </div>
                        <span className="text-[8px] font-black text-stone-800 mt-1">@eagerminds</span>
                      </div>
                      
                      <div className="w-full flex flex-col gap-1.5 justify-center flex-1 my-3">
                        <div className="w-full py-1.5 rounded-full bg-white border border-stone-100 text-[8px] font-black uppercase tracking-wider text-stone-800 text-center shadow-inner animate-in slide-in-from-bottom-2 duration-700">
                          Next.js Routing docs
                        </div>
                      </div>
                      
                      <div className="text-[6px] font-black tracking-widest text-stone-350 uppercase">
                        Bio Page
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with dynamic counts */}
        <section id="stats" className={`py-20 border-b border-stone-200/20 scroll-mt-20 reveal-on-scroll ${statsRevealed ? "revealed" : ""}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <dl className="grid grid-cols-1 gap-y-12 gap-x-8 text-center sm:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-3">
                <dt className="text-[10px] font-black uppercase tracking-widest text-stone-400">Bookmarks Indexing</dt>
                <dd className="order-first text-5xl font-black tracking-tight sm:text-6xl text-stone-900 theme-transition">
                  {statsVisible ? `${bookmarksCount.toFixed(2)}M+` : "0.00M+"}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-3">
                <dt className="text-[10px] font-black uppercase tracking-widest text-stone-400">Search Speeds</dt>
                <dd className="order-first text-5xl font-black tracking-tight sm:text-6xl text-stone-900 theme-transition">
                  {statsVisible ? `< ${speedCount.toFixed(1)}ms` : "< 100ms"}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-3">
                <dt className="text-[10px] font-black uppercase tracking-widest text-stone-400">Developer Teams</dt>
                <dd className="order-first text-5xl font-black tracking-tight sm:text-6xl text-stone-900 theme-transition">
                  {statsVisible ? `${teamsCount.toFixed(1)}K+` : "0.0K+"}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Features Playground Grid */}
        <section id="features" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 scroll-mt-20">
          <div className={`text-center max-w-3xl mx-auto mb-16 reveal-on-scroll ${featuresRevealed ? "revealed" : ""}`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Core Interaction</span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-stone-900 mt-2">Interactive Feature Playground</h2>
            <p className="mt-4 text-stone-500 font-medium">Test out the core capabilities of the bookmarks platform below.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Playable Card 1: Lightning Search Demo */}
            <div className={`rounded-2xl border border-stone-200/50 bg-white/40 backdrop-blur p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 flex flex-col justify-between h-[380px] reveal-on-scroll ${featuresRevealed ? "revealed" : ""}`}>
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE6DF] text-stone-900 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Interactive Index Search</h3>
                
                {/* Search input mock */}
                <input
                  type="text"
                  placeholder="Type 'dev', 'design', or 'ai'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 mt-4 text-xs font-semibold border border-stone-200 bg-white rounded-full focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Dynamic Search results */}
              <div className="flex-1 w-full bg-stone-50/50 rounded-2xl border border-stone-200/40 p-3 mt-4 overflow-y-auto max-h-36 flex flex-col gap-1.5 scrollbar-none">
                {filteredSearchMock.length > 0 ? (
                  filteredSearchMock.map((item, index) => (
                    <div key={index} className="flex justify-between items-center px-2 py-1.5 bg-white rounded-xl border border-stone-200/20 text-[10px] font-bold shadow-inner">
                      <span className="text-stone-850 truncate max-w-[120px]">{item.title}</span>
                      <span className="text-[8px] uppercase tracking-wider bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded border border-stone-200/50">#{item.tag}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-[9px] text-stone-400 italic text-center py-4">No results match.</span>
                )}
              </div>
            </div>

            {/* Playable Card 2: Auto Tag Demo */}
            <div className={`rounded-2xl border border-stone-200/50 bg-white/40 backdrop-blur p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 flex flex-col justify-between h-[380px] reveal-on-scroll ${featuresRevealed ? "revealed" : ""}`} style={{ transitionDelay: '150ms' }}>
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE6DF] text-stone-900 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13l1-7.205L5 13.795h5.813a3 3 0 01.002 2.109z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Smart Auto-Tag Simulator</h3>
                
                {/* Tag parser input mock */}
                <input
                  type="text"
                  placeholder="Paste URL (try 'github', 'figma', 'ai')..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-4 py-2 mt-4 text-xs font-semibold border border-stone-200 bg-white rounded-full focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Dynamic Parser result tags */}
              <div className="flex-1 w-full bg-stone-50/50 rounded-2xl border border-stone-200/40 p-4 mt-4 flex flex-wrap gap-2 items-center justify-center max-h-36 overflow-y-auto">
                {detectedTags.length > 0 ? (
                  detectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[9px] font-black uppercase tracking-widest bg-[#EAE6DF] text-stone-700 border border-stone-300/40 px-3 py-1.5 rounded-full shadow-sm animate-in zoom-in-90 duration-300"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-[9px] text-stone-400 italic">Type a keyword to analyze tags...</span>
                )}
              </div>
            </div>

            {/* Playable Card 3: Team badging / Collab Demo */}
            <div
              onMouseEnter={() => setCollabHovered(true)}
              onMouseLeave={() => setCollabHovered(false)}
              className={`rounded-2xl border border-stone-200/50 bg-white/40 backdrop-blur p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 flex flex-col justify-between h-[380px] reveal-on-scroll ${featuresRevealed ? "revealed" : ""}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE6DF] text-stone-900 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Curated Team Workspaces</h3>
                
                {/* Simulated Avatar badge buttons */}
                <div className="flex gap-2.5 mt-4 items-center h-8">
                  <button onClick={() => handleCollabAction("John")} className="h-7 w-7 rounded-full bg-stone-900 border border-white flex items-center justify-center text-[10px] font-black text-white hover:scale-110 active:scale-95 shadow cursor-pointer transition-transform duration-300">J</button>
                  <button onClick={() => handleCollabAction("Sarah")} className="h-7 w-7 rounded-full bg-[#EAE6DF] border border-white flex items-center justify-center text-[10px] font-black text-stone-700 hover:scale-110 active:scale-95 shadow cursor-pointer transition-transform duration-300">S</button>
                  <button onClick={() => handleCollabAction("Alex")} className="h-7 w-7 rounded-full bg-stone-200 border border-white flex items-center justify-center text-[10px] font-black text-stone-800 hover:scale-110 active:scale-95 shadow cursor-pointer transition-transform duration-300">A</button>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest pl-1">click to join</span>
                </div>
              </div>

              {/* Dynamic Notification log */}
              <div className="flex-1 w-full bg-stone-900 text-stone-300 font-mono text-[9px] p-4 rounded-2xl mt-4 overflow-y-auto max-h-36 flex flex-col gap-1.5 select-text border border-stone-950">
                {collabLogs.map((log, index) => (
                  <div key={index} className="leading-normal border-b border-stone-800/40 pb-1 last:border-b-0 animate-in fade-in slide-in-from-left-2 duration-300">
                    {log}
                  </div>
                ))}
              </div>
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

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "../../components/auth/auth-card";
import { SignUpForm } from "../../components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up - EagerMinds Bookmarks",
  description: "Create an account to start bookmarking and organizing your links.",
};

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen w-full lg:grid-cols-12 bg-zinc-50 dark:bg-black overflow-x-hidden font-sans">
      {/* Left side: Premium Branding & Dashboard Showcase (Visible only on lg screens) */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 bg-gradient-to-tr from-indigo-950 via-zinc-950 to-violet-950 text-white overflow-hidden border-r border-zinc-900">
        
        {/* Dynamic Glow effects */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-3xl dark:bg-indigo-600/5 animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-3xl dark:bg-violet-600/5" />
        
        {/* Grid pattern overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />

        {/* Top brand header */}
        <Link href="/" className="z-10 flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="h-5.5 w-5.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            EagerMinds Bookmarks
          </span>
        </Link>

        {/* Middle marketing showcase */}
        <div className="z-10 my-auto flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent leading-tight">
              Organize your digital mind in seconds.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              Save resources, tag them with keys, search instantly, and collaborate with your entire team.
            </p>
          </div>

          {/* Interactive/Mock tags display (High Fidelity) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl space-y-4 max-w-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">My Workspace</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs border border-indigo-500/20 text-indigo-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                #DeveloperTools
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-violet-500/10 px-2.5 py-1 text-xs border border-violet-500/20 text-violet-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                #DesignSystems
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-pink-500/10 px-2.5 py-1 text-xs border border-pink-500/20 text-pink-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                #ResearchAI
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs border border-cyan-500/20 text-cyan-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                #NextJS
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs border border-emerald-500/20 text-emerald-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                #TailwindCSS
              </div>
            </div>
            
            <div className="rounded-xl bg-black/40 p-3.5 space-y-2 border border-white/5">
              <div className="flex justify-between items-center text-[10px] text-zinc-500">
                <span>Recent Bookmark</span>
                <span>Saved 2m ago</span>
              </div>
              <p className="text-xs font-semibold text-zinc-100 truncate">Next.js App Router Documentation</p>
              <p className="text-[11px] text-zinc-400 line-clamp-1">https://nextjs.org/docs/app</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs text-zinc-500 flex items-center justify-between">
          <span>© 2026 EagerMinds.</span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-indigo-400">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            SSL Secure Encryption
          </span>
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="col-span-12 lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        
        {/* Dynamic abstract background design for the form side */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[20%] h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5" />
          <div className="absolute bottom-[15%] right-[20%] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/5" />
        </div>

        {/* Mobile Header Logo (visible only on md/sm screens) */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-650 text-white shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
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
          <span className="text-md font-bold tracking-tight bg-gradient-to-r from-zinc-950 to-indigo-900 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
            EagerMinds Bookmarks
          </span>
        </div>

        <AuthCard title="Get started" subtitle="Create a free account to organize your links">
          <SignUpForm />
        </AuthCard>
      </div>
    </main>
  );
}

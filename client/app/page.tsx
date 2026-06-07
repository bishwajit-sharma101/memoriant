import Link from "next/link";
import Image from "next/image";
import { InteractivePreview } from "../components/landing/interactive-preview";

export const metadata = {
  title: "EagerMinds Bookmarks - Organize Your Digital Mind",
  description: "The premium, keyboard-first, collaborative bookmark manager for teams and developers.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Visual background grid pattern */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/40 bg-white/70 backdrop-blur-md dark:border-zinc-800/40 dark:bg-black/70 transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
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
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-950 to-indigo-900 bg-clip-text text-transparent dark:from-white dark:to-zinc-350">
              EagerMinds Bookmarks
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-550 dark:text-zinc-400">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#preview" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Interactive Demo</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-150/40 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 lg:pt-40">
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[10%] -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5 animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] -z-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/5" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-950/40 dark:text-indigo-450 dark:ring-indigo-500/25">
            Introducing Live Previews & Tagging
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-b from-zinc-950 via-zinc-900 to-indigo-950 dark:from-white dark:via-zinc-100 dark:to-indigo-200 bg-clip-text text-transparent leading-none">
            Your digital mind,<br />perfectly organized.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-zinc-650 dark:text-zinc-400">
            Save resources, documents, or logs from any source. Organize with smart tags, find instantly, and share across teams.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="w-full sm:w-auto rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-600/15 hover:bg-indigo-500 transition-all active:scale-98 cursor-pointer"
            >
              Start Bookmarking Free
            </Link>
            <a
              href="#preview"
              className="w-full sm:w-auto rounded-xl border border-zinc-200 bg-white/40 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/20 px-6 py-3.5 text-base font-semibold hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-all active:scale-98"
            >
              Try Interactive Demo
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Preview Container */}
      <section id="preview" className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Experience it live</span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mt-1.5">No login needed to try the interface</h2>
        </div>
        <InteractivePreview />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-b border-zinc-200/40 bg-zinc-50/50 dark:border-zinc-800/40 dark:bg-zinc-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-y-12 gap-x-8 text-center sm:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">Bookmarks Saved</dt>
              <dd className="order-first text-3xl font-extrabold tracking-tight sm:text-4xl text-indigo-600 dark:text-indigo-450">2.5M+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">Average Search Speed</dt>
              <dd className="order-first text-3xl font-extrabold tracking-tight sm:text-4xl text-indigo-600 dark:text-indigo-450">&lt; 14ms</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">Developer Teams</dt>
              <dd className="order-first text-3xl font-extrabold tracking-tight sm:text-4xl text-indigo-600 dark:text-indigo-450">12,000+</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Supercharged Features</h2>
          <p className="mt-4 text-lg text-zinc-650 dark:text-zinc-400">Everything you need to retrieve resource URLs in milliseconds.</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200/50 bg-white p-8 shadow-sm hover:shadow-md transition-all dark:border-zinc-800/50 dark:bg-zinc-900/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-450">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold">Lightning Search</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-550 dark:text-zinc-450">Search tags, titles, URLs, and description bodies instantly with hotkeys first navigation.</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/50 bg-white p-8 shadow-sm hover:shadow-md transition-all dark:border-zinc-800/50 dark:bg-zinc-900/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-450">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold">Team Collaboration</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-550 dark:text-zinc-450">Share resource pools and folders with team members via secure, shared workspaces.</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/50 bg-white p-8 shadow-sm hover:shadow-md transition-all dark:border-zinc-800/50 dark:bg-zinc-900/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-450">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13l1-7.205L5 13.795h5.813a3 3 0 01.002 2.109z" />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold">Smart Auto-Tagging</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-550 dark:text-zinc-450">Our parser detects link metadata and page content, assigning logical folders and tags automatically.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-650 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <p>© 2026 EagerMinds Bookmarks. All rights reserved.</p>
      </footer>
    </div>
  );
}



import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:bg-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
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
            <span className="text-lg font-bold tracking-tight">EagerMinds Bookmarks</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 lg:pt-36">
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5" />
        <div className="absolute bottom-[10%] right-[5%] -z-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/5" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-950/30 dark:text-indigo-400 dark:ring-indigo-500/20">
            Introducing V1.0
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-indigo-900 dark:from-white dark:via-zinc-100 dark:to-indigo-200 bg-clip-text text-transparent">
            Your mind, organized. All in one bookmark manager.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Save articles, videos, recipes, or documentation links. Retrieve them instantly with global tag search, AI categorization, and cross-device syncing.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-98"
            >
              Start Bookmarking Free
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto rounded-xl border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-base font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-98"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-zinc-100/50 dark:bg-zinc-950/20 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Supercharged Features</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Everything you need to save and retrieve files in milliseconds.</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-zinc-200/50 bg-white p-6 shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Lightning Search</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Search tags, titles, and body content instantly with keyboard-first navigation.</p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-zinc-200/50 bg-white p-6 shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Team Collaboration</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Share resource pools and lists with team members via secure, collaborative shared spaces.</p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-zinc-200/50 bg-white p-6 shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13l1-7.205L5 13.795h5.813a3 3 0 01.002 2.109z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Smart Tagging</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Our engine auto-generates logical tags and labels based on target link contents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-600 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <p>© 2026 EagerMinds Bookmarks. Built with Next.js and Tailwind.</p>
      </footer>
    </div>
  );
}


import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "../../components/auth/auth-card";
import { SignUpForm } from "../../components/auth/signup-form";
import { AuthThemeProvider } from "../../components/auth/auth-theme-provider";

export const metadata: Metadata = {
  title: "Sign Up - EagerMinds Bookmarks",
  description: "Create an account to start bookmarking and organizing your links.",
};

export default function SignUpPage() {
  return (
    <AuthThemeProvider>
      <main className="flex h-full w-full flex-row overflow-hidden bg-[var(--bg-right)] font-sans theme-transition">
        {/* LEFT SIDE: Premium 3D Illusion Experience */}
        <div className="hidden lg:flex relative w-[55%] h-full bg-[var(--bg-left)] items-center justify-center overflow-hidden theme-transition">
          {/* Ambient Studio Lighting */}
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--glow-top)] opacity-90 blur-[120px] mix-blend-screen pointer-events-none theme-transition" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--glow-bottom)] opacity-50 blur-[100px] mix-blend-multiply pointer-events-none theme-transition" />

          {/* 3D Floating Glass Composition */}
          <div className="relative w-full h-full perspective-[1500px] flex items-center justify-center pointer-events-none">
            {/* Main front card */}
            <div className="absolute z-20" style={{ animation: 'float 8s ease-in-out infinite' }}>
              <div className="w-[320px] h-[440px] rounded-[2.5rem] bg-white/65 backdrop-blur-3xl border border-white/85 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] flex flex-col p-8 transform -rotate-y-[15deg] rotate-x-[10deg] translate-z-[50px] theme-transition">
                <div className="w-14 h-14 rounded-full bg-stone-300/60 mb-8 theme-transition" />
                <div className="w-3/4 h-5 rounded-full bg-stone-300/60 mb-5 theme-transition" />
                <div className="w-1/2 h-5 rounded-full bg-stone-300/60 mb-10 theme-transition" />
                <div className="flex-1 rounded-2xl bg-stone-200/50 border border-white/60 theme-transition" />
              </div>
            </div>

            {/* Background offset card */}
            <div className="absolute z-10" style={{ animation: 'float 7s ease-in-out infinite 1s' }}>
              <div className="w-[280px] h-[380px] rounded-[2.5rem] bg-white/45 backdrop-blur-xl border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col p-8 transform rotate-y-[25deg] rotate-x-[5deg] translate-x-32 translate-y-16 -translate-z-[150px] theme-transition">
                <div className="w-full h-32 rounded-2xl bg-stone-300/40 mb-6 theme-transition" />
                <div className="w-full h-12 rounded-2xl bg-stone-300/40 mb-4" />
                <div className="w-2/3 h-12 rounded-2xl bg-stone-300/40 theme-transition" />
              </div>
            </div>
          </div>

          {/* Premium typography overlay */}
          <div className="absolute bottom-20 left-20 z-30">
            <h1 className="text-5xl font-black text-[var(--text-primary)] tracking-tighter theme-transition">Start your journey.</h1>
            <p className="mt-4 text-[var(--text-muted)] font-bold tracking-widest uppercase text-xs theme-transition">Join the next generation</p>
          </div>

          {/* Smooth Panel Blender Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-r from-transparent to-[var(--bg-right)] pointer-events-none z-30 theme-transition" />
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative bg-[var(--bg-right)] z-40 overflow-y-auto theme-transition">
          <div className="w-full max-w-[420px] mx-auto animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="flex justify-start mb-12">
              <Link href="/" className="inline-flex items-center gap-2.5 rounded-full bg-white/60 px-5 py-2.5 backdrop-blur-md shadow-[0_5px_15px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] text-[var(--text-primary)] border border-stone-200/50 hover:-translate-y-0.5 hover:bg-white transition-all duration-300 group theme-transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-widest mt-0.5">Back to Home</span>
              </Link>
            </div>

            <AuthCard title="Create Account" subtitle="Join the next generation">
              <SignUpForm />
            </AuthCard>
          </div>
        </div>
      </main>
    </AuthThemeProvider>
  );
}

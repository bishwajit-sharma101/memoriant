import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Your Email | EagerMinds Bookmarks",
  description: "Check your inbox to verify your email and activate your account.",
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-stone-900 selection:text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background pattern */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-[#FAF8F5] bg-[linear-gradient(to_right,#e5e5e030_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e030_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-[10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-[#EAE6DF] opacity-40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] -z-10 h-[600px] w-[600px] rounded-full bg-[#FFE4E6] opacity-30 blur-[130px] pointer-events-none" />

      <div className="max-w-xl w-full px-6 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-1000 slide-in-from-bottom-8">
        
        {/* Animated Mail Icon */}
        <div className="h-28 w-28 rounded-full bg-white border border-stone-200/50 shadow-xl flex items-center justify-center mb-10 relative">
          <div className="absolute inset-0 rounded-full border border-stone-300 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-stone-900">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        {/* Premium Typography Heading */}
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-stone-950 leading-none">
          Check your inbox
        </h1>
        
        <p className="mt-8 text-base sm:text-lg text-stone-500 font-medium leading-relaxed max-w-md">
          We’ve sent a verification link to your email address. Please click the link to activate your EagerMinds account.
        </p>

        <div className="mt-12 flex flex-col w-full max-w-sm gap-4">
          <Link
            href="/signin"
            className="w-full text-center rounded-full bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-500"
          >
            Go to Sign In
          </Link>
          
          <Link
            href="/"
            className="w-full text-center rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-700 hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-500"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

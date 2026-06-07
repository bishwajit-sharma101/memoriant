"use client";

import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div 
      className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-zinc-200/50 bg-white/60 p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all duration-700 ease-out dark:border-white/10 dark:bg-zinc-950/50 dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] sm:p-10 animate-in fade-in zoom-in-95 fill-mode-forwards duration-700"
    >
      {/* Inner highlight for glass effect */}
      <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20 pointer-events-none dark:ring-white/5" />

      {/* Decorative gradient glowing spots inside card */}
      <div className="absolute -top-40 -left-40 -z-10 h-80 w-80 rounded-full bg-indigo-500/15 blur-[64px]" />
      <div className="absolute -bottom-40 -right-40 -z-10 h-80 w-80 rounded-full bg-violet-500/15 blur-[64px]" />

      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-xl shadow-indigo-500/30 ring-1 ring-white/20 dark:from-indigo-500 dark:to-violet-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-[90%]">
          {subtitle}
        </p>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

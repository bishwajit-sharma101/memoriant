"use client";

import React from "react";
import Image from "next/image";

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
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-zinc-800/50 dark:bg-zinc-950/70 sm:p-10">
      {/* Decorative gradient glowing spots */}
      <div className="absolute -top-40 -left-40 -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 -z-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 dark:bg-indigo-500">
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
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 text-center">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
};

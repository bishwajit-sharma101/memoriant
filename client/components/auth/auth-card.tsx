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
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150 fill-mode-both">
      <div className="flex flex-col mb-8 text-left">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] theme-transition">
          {title}
        </h2>
        <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-muted)] uppercase theme-transition">
          {subtitle}
        </p>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

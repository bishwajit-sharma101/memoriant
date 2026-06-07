"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className = "",
  type = "text",
  rightElement,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5 group">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-zinc-700 transition-colors group-focus-within:text-indigo-600 dark:text-zinc-300 dark:group-focus-within:text-indigo-400"
        >
          {label}
        </label>
      )}
      <div className="relative w-full flex items-center">
        <input
          id={id}
          type={type}
          className={`w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-zinc-900 shadow-sm shadow-zinc-200/20 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:shadow-none dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:focus:border-indigo-500 dark:focus:bg-zinc-950 dark:focus:ring-indigo-500/20 ${
            rightElement ? "pr-12" : ""
          } ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-zinc-400 hover:text-zinc-650 dark:text-zinc-500 dark:hover:text-zinc-350 transition-colors">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1 fade-in duration-200">{error}</span>
      )}
    </div>
  );
};

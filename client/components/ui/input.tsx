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
  value,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col relative group">
      <div className="relative w-full flex items-end">
        <input
          id={id}
          type={type}
          value={value}
          placeholder=" "
          className={`peer w-full border-b-[1.5px] border-[var(--text-muted)]/30 bg-transparent py-2 text-[var(--text-primary)] text-base sm:text-xl md:text-2xl font-bold transition-all duration-500 focus:border-[var(--text-primary)] focus:outline-none placeholder:text-transparent ${
            rightElement ? "pr-16" : ""
          } ${
            error
              ? "border-red-400 focus:border-red-500"
              : ""
          } ${className}`}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={`absolute left-0 transition-all duration-500 pointer-events-none ${
              value
                ? "-top-4 text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-widest"
                : "top-2 text-sm sm:text-base md:text-lg font-semibold text-[var(--text-muted)] peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[var(--text-primary)] peer-focus:uppercase peer-focus:tracking-widest"
            }`}
          >
            {label}
          </label>
        )}
        {rightElement && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 tracking-wide animate-in slide-in-from-top-1 fade-in duration-200">{error}</span>
      )}
    </div>
  );
};

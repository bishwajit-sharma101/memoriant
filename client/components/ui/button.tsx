"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-700 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 overflow-hidden group";

  const variants = {
    primary:
      "bg-[var(--accent)] text-white hover:opacity-90 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1 theme-transition",
    secondary:
      "bg-stone-100 text-[var(--text-primary)] hover:bg-stone-200 theme-transition",
    outline:
      "border-2 border-[var(--accent)] hover:bg-[var(--accent)] text-[var(--accent)] hover:text-white theme-transition",
    ghost:
      "hover:bg-stone-100 text-[var(--text-muted)] hover:text-[var(--text-primary)] theme-transition",
  };

  const sizes = {
    sm: "px-6 py-3 text-xs",
    md: "px-8 py-5 text-sm",
    lg: "px-12 py-6 text-base",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      <span className="flex items-center gap-2 relative z-10">{children}</span>
      <div className="absolute inset-0 h-full w-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
    </button>
  );
};

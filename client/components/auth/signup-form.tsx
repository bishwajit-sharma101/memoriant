"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Required";
    if (!email) newErrors.email = "Required";
    if (!password) newErrors.password = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAuthSuccess(true);
    setIsLoading(false);
  };

  if (authSuccess) {
    return (
      <div className="flex flex-col items-center py-6 text-center animate-in fade-in zoom-in duration-700 delay-300 fill-mode-both">
        <div className="h-20 w-20 mb-8 rounded-full bg-stone-900 flex items-center justify-center text-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-stone-900 tracking-tight">Welcome</h3>
        <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase">Preparing your universe</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[200ms] fill-mode-both">
        <Input
          label="Full Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[400ms] fill-mode-both mt-2">
        <Input
          label="Email Address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[600ms] fill-mode-both mt-2">
        <Input
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          rightElement={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors">
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[800ms] fill-mode-both mt-6">
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>

      <div className="animate-in fade-in duration-1000 delay-[1000ms] fill-mode-both">
        <p className="mt-4 text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          Already a member?{" "}
          <Link href="/signin" className="text-stone-900 hover:text-stone-500 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

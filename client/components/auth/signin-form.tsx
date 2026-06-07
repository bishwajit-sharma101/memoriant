"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    if (authSuccess) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [authSuccess, router]);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
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
        <h3 className="text-2xl font-black text-stone-900 tracking-tight">Signed In</h3>
        <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase">Restoring your universe</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[200ms] fill-mode-both">
        <Input
          label="Email Address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[400ms] fill-mode-both mt-2">
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          rightElement={
            <a href="#" className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors">
              Forgot?
            </a>
          }
        />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[600ms] fill-mode-both mt-6">
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </div>

      <div className="animate-in fade-in duration-1000 delay-[800ms] fill-mode-both">
        <p className="mt-4 text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          New here?{" "}
          <Link href="/signup" className="text-stone-900 hover:text-stone-500 transition-colors">
            Create Account
          </Link>
        </p>
      </div>
    </form>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signup } from "@/app/auth/actions";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    if (authSuccess) {
      // The server action handles redirect
    }
  }, [authSuccess, router]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "Required";
    } else if (name.length > 100) {
      newErrors.name = "Max 100 characters";
    }

    if (!email) {
      newErrors.email = "Required";
    } else if (email.length > 100) {
      newErrors.email = "Max 100 characters";
    }

    if (!password) {
      newErrors.password = "Required";
    } else if (password.length > 72) {
      newErrors.password = "Max 72 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const result = await signup(formData);
    
    if (result?.error) {
      setErrors({ server: result.error });
      setIsLoading(false);
    } else {
      setAuthSuccess(true);
      // Server action will redirect
    }
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
      {errors.server && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {errors.server}
        </div>
      )}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[200ms] fill-mode-both">
        <Input
          label="Full Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          disabled={isLoading}
          maxLength={100}
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
          disabled={isLoading}
          maxLength={100}
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
          disabled={isLoading}
          maxLength={72}
          rightElement={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors">
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[800ms] fill-mode-both mt-6">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Account"}
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

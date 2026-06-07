"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Real-time password strength validation rules
  const passwordStrength = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      numberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    let label = "Empty";
    let colorClass = "text-zinc-400 dark:text-zinc-500";
    let barColor = "bg-zinc-200 dark:bg-zinc-800";

    if (password.length > 0) {
      if (score === 1) {
        label = "Weak";
        colorClass = "text-red-500 font-semibold";
        barColor = "bg-red-500";
      } else if (score === 2) {
        label = "Fair";
        colorClass = "text-amber-500 font-semibold";
        barColor = "bg-amber-500";
      } else if (score === 3) {
        label = "Strong";
        colorClass = "text-emerald-500 font-semibold";
        barColor = "bg-emerald-500";
      }
    }

    return { checks, score, label, colorClass, barColor };
  }, [password]);

  // Real-time password matching status
  const passwordsMatch = useMemo(() => {
    if (!confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setAuthSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (authSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100/50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 mb-6 ring-8 ring-emerald-50 dark:ring-emerald-900/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-8 w-8 animate-[bounce_1s_ease-in-out_2]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Account Created!
        </h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Your account was successfully created. Proceeding to sign in page...
        </p>
        <Link href="/signin" className="mt-6 w-full">
          <Button variant="primary" className="w-full">Go to Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => alert("Google signup is a preview")}
          className="inline-flex items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-white hover:border-zinc-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98] dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
        >
          <svg className="mr-2.5 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => alert("GitHub signup is a preview")}
          className="inline-flex items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-white hover:border-zinc-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98] dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
        >
          <svg className="mr-2.5 h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
        </div>
        <span className="relative px-3 bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
          Or sign up with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          required
        />

        <div className="flex flex-col gap-1.5">
          <Input
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center justify-center p-1 rounded-lg focus:outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            }
            required
          />

          {/* Real-time Password Strength Meter */}
          {password.length > 0 && (
            <div className="mt-1 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-550 dark:text-zinc-400">Password Strength:</span>
                <span className={passwordStrength.colorClass}>{passwordStrength.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    passwordStrength.score >= 1 ? passwordStrength.barColor : "bg-zinc-200 dark:bg-zinc-800"
                  }`}
                />
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    passwordStrength.score >= 2 ? passwordStrength.barColor : "bg-zinc-200 dark:bg-zinc-800"
                  }`}
                />
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    passwordStrength.score >= 3 ? passwordStrength.barColor : "bg-zinc-200 dark:bg-zinc-800"
                  }`}
                />
              </div>

              {/* Password checklist */}
              <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2 text-xs">
                <div className={`flex items-center gap-1.5 ${passwordStrength.checks.length ? "text-emerald-600 dark:text-emerald-450" : "text-zinc-450 dark:text-zinc-500"}`}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  At least 8 characters
                </div>
                <div className={`flex items-center gap-1.5 ${passwordStrength.checks.uppercase ? "text-emerald-600 dark:text-emerald-450" : "text-zinc-450 dark:text-zinc-500"}`}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  One uppercase letter
                </div>
                <div className={`flex items-center gap-1.5 ${passwordStrength.checks.numberOrSymbol ? "text-emerald-600 dark:text-emerald-450" : "text-zinc-450 dark:text-zinc-500"}`}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  One number or symbol
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            label="Confirm Password"
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword)
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            error={errors.confirmPassword}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="flex items-center justify-center p-1 rounded-lg focus:outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            }
            required
          />

          {/* Confirm Password matching visual indicators */}
          {passwordsMatch !== null && (
            <div className="flex items-center gap-1.5 text-xs mt-1 transition-all duration-300">
              {passwordsMatch ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-450 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Passwords match
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Passwords do not match
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-start mt-1">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 mt-0.5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <label htmlFor="terms" className="ml-2 block text-xs text-zinc-650 dark:text-zinc-400">
            I agree to the{" "}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
          Create Account
        </Button>

        <p className="mt-2 text-center text-sm text-zinc-650 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

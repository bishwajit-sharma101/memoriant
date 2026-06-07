import React from "react";
import { Metadata } from "next";
import { AuthCard } from "../../components/auth/auth-card";
import { SignInForm } from "../../components/auth/signin-form";

export const metadata: Metadata = {
  title: "Sign In - EagerMinds Bookmarks",
  description: "Sign in to access and manage your bookmarks securely.",
};

export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
      {/* Dynamic abstract background design */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5" />
        <div className="absolute bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/5" />
      </div>

      <AuthCard title="Welcome back" subtitle="Sign in to manage your bookmarks">
        <SignInForm />
      </AuthCard>
    </main>
  );
}

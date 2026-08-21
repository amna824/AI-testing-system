"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AuthLayout from "@/components/Authlayout";
import SocialAuthButtons from "@/components/Socialauthbuttons";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    // Supabase Login Request
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setSubmitting(false);
    } else {
      // Successful login par dashboard redirect
      window.location.href = "/dashboard";
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome Back"
      title="Log in to your account"
      subtitle="Access your test suites and dashboard."
    >
      <div className="mb-6 flex items-center justify-between border-b border-[#D5DACD]/40 pb-2">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-[#D5DACD] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A192F] shadow-sm transition-all duration-200 hover:border-[#0A192F] hover:bg-[#0A192F] hover:text-[#FAF6F0]"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          <span>Back to home</span>
        </Link>
      </div>

      <SocialAuthButtons />

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#D5DACD]" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#0A192F]/35">
          or
        </span>
        <span className="h-px flex-1 bg-[#D5DACD]" />
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-medium text-red-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#0A192F]/70">
            Work email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0A192F]/35"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-xl border border-[#D5DACD] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0A192F] focus:border-[#8C5A3C] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#0A192F]/70">
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0A192F]/35"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#D5DACD] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0A192F] focus:border-[#8C5A3C] focus:outline-none"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.98 }}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A192F] py-3 text-sm font-semibold text-[#FAF6F0] shadow-sm transition-all duration-300 hover:bg-[#8C5A3C] disabled:opacity-50"
        >
          {submitting ? "Logging in..." : "Log in"}
          {!submitting && <ArrowRight size={15} />}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-[#0A192F]/55">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#8C5A3C] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import AuthLayout from "@/components/Authlayout";
import SocialAuthButtons from "@/components/Socialauthbuttons";
import { createClient } from "@supabase/supabase-js";

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const STRENGTH_LABEL = ["Too short", "Weak", "Okay", "Good", "Strong"];

// Supabase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Feedback messages status
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "success" | null;
    text: string;
  }>({ type: null, text: "" });

  const strength = useMemo(() => getStrength(password), [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setSubmitting(true);
    setStatusMessage({ type: null, text: "" });

    // Supabase SignUp Call
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setStatusMessage({ type: "error", text: error.message });
    } else {
      setStatusMessage({
        type: "success",
        text: "Account created successfully! Check your email to confirm registration.",
      });
      // Clear inputs on success
      setName("");
      setEmail("");
      setPassword("");
    }

    setSubmitting(false);
  };

  return (
    <AuthLayout
      eyebrow="Start free"
      title="Create your account"
      subtitle="No credit card. Generate your first test suite in under two minutes."
    >
      {/* Back to Home Button */}
      <div className="mb-8 flex items-center justify-between border-b border-[#D5DACD]/40 pb-2">
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

      {/* Alert Banner for Status Messages */}
      {statusMessage.text && (
        <div
          className={`mb-4 rounded-xl p-3 text-xs font-medium text-center border ${
            statusMessage.type === "error"
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-medium text-[#0A192F]/70"
          >
            Full name
          </label>
          <div className="relative">
            <User
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0A192F]/35"
            />
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              className="w-full rounded-xl border border-[#D5DACD] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0A192F] placeholder:text-[#0A192F]/30 transition-colors duration-200 focus:border-[#8C5A3C] focus:outline-none focus:ring-2 focus:ring-[#8C5A3C]/15"
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium text-[#0A192F]/70"
          >
            Work email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0A192F]/35"
            />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-xl border border-[#D5DACD] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0A192F] placeholder:text-[#0A192F]/30 transition-colors duration-200 focus:border-[#8C5A3C] focus:outline-none focus:ring-2 focus:ring-[#8C5A3C]/15"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-medium text-[#0A192F]/70"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0A192F]/35"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-[#D5DACD] bg-white py-2.5 pl-10 pr-11 text-sm text-[#0A192F] placeholder:text-[#0A192F]/30 transition-colors duration-200 focus:border-[#8C5A3C] focus:outline-none focus:ring-2 focus:ring-[#8C5A3C]/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0A192F]/35 transition-colors hover:text-[#0A192F]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {password.length > 0 && (
            <div className="mt-2.5">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i < strength ? "bg-[#8C5A3C]" : "bg-[#D5DACD]"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-[#0A192F]/45">
                {STRENGTH_LABEL[strength]}
              </p>
            </div>
          )}
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-2.5 pt-1 text-sm text-[#0A192F]/65">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[#D5DACD] text-[#8C5A3C] focus:ring-[#8C5A3C]/30"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-[#8C5A3C] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-[#8C5A3C] hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={submitting || !agreed}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A192F] py-3 text-sm font-semibold text-[#FAF6F0] shadow-sm transition-all duration-300 hover:bg-[#8C5A3C] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Creating account…" : "Create free account"}
          {!submitting && (
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          )}
        </motion.button>

        <p className="flex items-center justify-center gap-1.5 pt-1 font-mono text-[11px] text-[#0A192F]/40">
          <Check size={12} className="text-[#8C5A3C]" />
          No credit card required
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-[#0A192F]/55">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-[#8C5A3C] hover:underline"
        >
          Log in
        </a>
      </p>
    </AuthLayout>
  );
}
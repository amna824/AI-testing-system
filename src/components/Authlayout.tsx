"use client";

import { motion } from "framer-motion";
import { ScanEye, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const PROOF_POINTS = [
  "Generates suites from a screenshot in under 60s",
  "Self-healing selectors via Stagehand",
  "Every run replayed on Browserbase cloud",
];

export default function AuthLayout({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    // Replaced `w-screen` with `w-full` to remove horizontal overflow
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAF6F0] px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Container Card */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#D5DACD] bg-[#0A192F] shadow-2xl lg:grid-cols-2">
        
        {/* Brand Panel (Left) */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0A192F] p-8 lg:flex xl:p-10">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]" />

          <Link href="/" className="relative flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8C5A3C] text-[#FAF6F0]">
              <ScanEye size={18} strokeWidth={2} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-[#FAF6F0]">
              AutoTest<span className="text-[#8C5A3C]">.ai</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative my-auto max-w-md py-6"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8C5A3C]">
              Powered by AI Vision + Browserbase
            </span>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-[#FAF6F0] xl:text-3xl">
              QA suites that write and run themselves.
            </h2>

            <ul className="mt-6 space-y-3">
              {PROOF_POINTS.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-[#D5DACD]/80"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#8C5A3C]" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="relative flex items-center gap-2 font-mono text-xs text-[#D5DACD]/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8C5A3C]" />
            4,200+ suites generated this week
          </div>
        </div>

        {/* Form Panel (Right) */}
        <div className="flex flex-col justify-center bg-[#FAF6F0] px-6 py-8 sm:px-10 lg:px-12">
          <Link href="/" className="mb-6 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A192F] text-[#FAF6F0]">
              <ScanEye size={18} strokeWidth={2} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-[#0A192F]">
              AutoTest<span className="text-[#8C5A3C]">.ai</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto my-auto w-full max-w-sm"
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C5A3C]">
              {eyebrow}
            </span>
            <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#0A192F] sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1 text-xs text-[#0A192F]/60 sm:text-sm">{subtitle}</p>

            <div className="mt-5">{children}</div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
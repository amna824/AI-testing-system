"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, X, ScanLine, BrainCircuit, ListChecks, Cloud } from "lucide-react";
import DemoSandbox from "./demosandbox";

const PIPELINE = [
  {
    icon: ScanLine,
    label: "Connect Input",
    sub: "screenshot.png / repo.git",
  },
  {
    icon: BrainCircuit,
    label: "AI Analysis",
    sub: "vision + code parsing",
  },
  {
    icon: ListChecks,
    label: "Generate Suite",
    sub: "42 cases drafted",
  },
  {
    icon: Cloud,
    label: "Cloud Execution",
    sub: "browserbase runtime",
  },
];

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // ESC key closes the modal
  useEffect(() => {
    if (!isVideoOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVideoOpen]);

  // lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isVideoOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoOpen]);

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0]">
      {/* ambient texture */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#8C5A3C]/25 bg-[#8C5A3C]/[0.07] px-4 py-1.5"
          >
            <motion.span
              animate={{ rotate: [0, 20, -10, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4 }}
            >
              <Sparkles size={14} className="text-[#8C5A3C]" />
            </motion.span>
            <span className="font-mono text-xs font-medium tracking-tight text-[#8C5A3C]">
              Powered by AI Vision + Browserbase Cloud
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#0A192F] sm:text-5xl lg:text-6xl"
          >
            Point it at your product.
            <br />
            <span className="text-[#8C5A3C]">It writes the QA suite.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-[#0A192F]/65 sm:text-lg"
          >
            Upload a screenshot or connect a GitHub repo. AutoTest.ai reads your UI and
            your code, drafts real test cases, and runs them on live cloud browsers —
            with a video replay of every single run.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="/signup"
              className="group relative w-full overflow-hidden rounded-full bg-[#0A192F] px-7 py-3.5 text-center text-sm font-semibold text-[#FAF6F0] shadow-[0_8px_24px_-8px_rgba(10,25,47,0.5)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              <span className="relative z-10">Get Started Free</span>
              <span className="absolute inset-0 -z-0 bg-[#8C5A3C] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#0A192F]/15 bg-white/40 px-7 py-3.5 text-sm font-semibold text-[#0A192F] transition-all duration-300 hover:border-[#8C5A3C]/40 hover:bg-white/70 sm:w-auto"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0A192F] text-[#FAF6F0]">
                <Play size={11} fill="currentColor" className="ml-0.5" />
              </span>
              Watch 2-min Demo
            </button>
          </motion.div>
        </div>

        {/* Architecture flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-3xl border border-[#D5DACD] bg-white/50 p-5 shadow-[0_20px_60px_-30px_rgba(10,25,47,0.35)] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0A192F]/40">
                System pipeline
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#8C5A3C]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8C5A3C]" />
                live
              </span>
            </div>

            <div className="flex flex-col gap-0 lg:flex-row lg:items-center">
              {PIPELINE.map((step, i) => (
                <div key={step.label} className="flex flex-1 flex-col lg:flex-row lg:items-center">
                  {/* Node */}
                  <div className="relative flex flex-1 flex-col items-center gap-3 rounded-2xl border border-[#D5DACD] bg-[#FAF6F0] px-4 py-6 text-center">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A192F] text-[#FAF6F0]">
                      <step.icon size={20} strokeWidth={1.75} />
                      <motion.span
                        animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.45,
                          ease: "easeOut",
                        }}
                        className="absolute inset-0 rounded-xl bg-[#8C5A3C]"
                      />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-[#0A192F]">
                        {step.label}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-[#0A192F]/45">
                        {step.sub}
                      </p>
                    </div>
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#8C5A3C] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#FAF6F0]">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Connector */}
                  {i < PIPELINE.length - 1 && (
                    <div className="relative mx-auto my-2 h-6 w-[2px] shrink-0 overflow-hidden bg-[#D5DACD] lg:my-0 lg:h-[2px] lg:w-8">
                      {/* mobile: dot travels vertically */}
                      <motion.span
                        animate={{ top: ["-20%", "120%"] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: i * 0.35,
                          ease: "easeInOut",
                        }}
                        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8C5A3C] lg:hidden"
                      />
                      {/* desktop: dot travels horizontally */}
                      <motion.span
                        animate={{ left: ["-20%", "120%"] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: i * 0.35,
                          ease: "easeInOut",
                        }}
                        className="absolute top-1/2 hidden h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8C5A3C] lg:block"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            key="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A192F]/80 p-4 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="AutoTest.ai product walkthrough video"
          >
            <motion.div
              key="video-modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#D5DACD]/20 bg-[#0A192F] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#D5DACD]/10 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8C5A3C] text-[#FAF6F0]">
                    <Play size={12} fill="currentColor" className="ml-0.5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-[#FAF6F0] sm:text-base">
                    AutoTest.ai Product Walkthrough
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(false)}
                  aria-label="Close video"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#D5DACD]/60 transition-colors duration-200 hover:bg-white/10 hover:text-[#FAF6F0]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video */}
              <div className="relative aspect-video w-full bg-[#0A192F]">
                {isVideoOpen && <DemoSandbox />}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3.5 sm:px-6">
                <span className="font-mono text-[11px] text-[#D5DACD]/40">
                  Simulated walkthrough — no real data
                </span>
                <span className="font-mono text-[11px] text-[#8C5A3C]">
                  Press ESC to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
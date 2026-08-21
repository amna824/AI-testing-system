"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, GitBranch, ListTodo, PlayCircle } from "lucide-react";

const STEPS = [
  {
    icon: ImageIcon,
    title: "Upload a screenshot, or connect a repo",
    short: "Two entry points, one pipeline.",
    body:
      "Drag in a UI screenshot for Vision AI to read, or connect a GitHub repository so AutoTest.ai can trace routes, components, and user flows directly from the codebase.",
  },
  {
    icon: GitBranch,
    title: "AI drafts a full test suite",
    short: "Cases, not just clicks.",
    body:
      "GPT-4o Vision and our code-analysis engine turn what they find into concrete, human-readable QA test cases — covering forms, navigation, edge states, and regressions.",
  },
  {
    icon: ListTodo,
    title: "You choose what runs",
    short: "Nothing executes without your say.",
    body:
      "Review the generated suite in an interactive checklist. Select individual cases or whole categories — login flows, checkout, responsive breakpoints — before anything runs.",
  },
  {
    icon: PlayCircle,
    title: "Cloud execution, live",
    short: "Real browsers, real results.",
    body:
      "Selected cases run on Browserbase cloud browsers driven by Stagehand. Watch pass/fail status update in real time, with duration tracking and a full session replay saved for every run.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="relative bg-[#F5EBE0] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8C5A3C]">
            The workflow
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-[#0A192F] sm:text-4xl">
            From input to insight in four steps
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          {/* Step list */}
          <div className="flex flex-col gap-2">
            {STEPS.map((step, i) => (
              <button
                key={step.title}
                onClick={() => setActive(i)}
                className={`group relative flex items-start gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                  active === i
                    ? "border-[#8C5A3C]/40 bg-white shadow-sm"
                    : "border-transparent hover:bg-white/50"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors duration-300 ${
                    active === i
                      ? "bg-[#0A192F] text-[#FAF6F0]"
                      : "bg-[#D5DACD]/70 text-[#0A192F]/50"
                  }`}
                >
                  0{i + 1}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-sm font-semibold transition-colors duration-300 ${
                      active === i ? "text-[#0A192F]" : "text-[#0A192F]/60"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#0A192F]/45">
                    {step.short}
                  </span>
                </span>
                {active === i && (
                  <motion.span
                    layoutId="how-it-works-indicator"
                    className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-[#8C5A3C]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-[#D5DACD] bg-[#0A192F] p-8 sm:p-10">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative flex h-full flex-col"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8C5A3C] text-[#FAF6F0]">
                  {(() => {
                    const Icon = STEPS[active].icon;
                    return <Icon size={26} strokeWidth={1.75} />;
                  })()}
                </div>

                <span className="mt-6 font-mono text-xs uppercase tracking-widest text-[#D5DACD]/60">
                  Step 0{active + 1} of {STEPS.length}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#FAF6F0] sm:text-3xl">
                  {STEPS[active].title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#D5DACD]/80 sm:text-base">
                  {STEPS[active].body}
                </p>

                <div className="mt-auto flex items-center gap-1.5 pt-8">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === active ? "w-8 bg-[#8C5A3C]" : "w-3 bg-[#D5DACD]/25"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
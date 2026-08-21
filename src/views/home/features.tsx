"use client";

import { motion } from "framer-motion";
import { Eye, Wrench, Video, ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    icon: Eye,
    tag: "Vision AI",
    title: "Vision-Driven QA Test Gen",
    description:
      "Drop in a screenshot and GPT-4o Vision maps every button, form, and state on the page — then drafts manual test cases a human would actually write.",
    detail: "detects 60+ component types",
  },
  {
    icon: Wrench,
    tag: "Stagehand + Browserbase",
    title: "Self-Healing Automation",
    description:
      "Selectors break. Ours don't. When your UI shifts, Stagehand re-locates elements by intent instead of brittle CSS paths, so suites keep passing.",
    detail: "auto-repairs failed locators",
  },
  {
    icon: Video,
    tag: "Cloud Execution",
    title: "Live Replays & Pass Rates",
    description:
      "Every run streams to a real cloud browser. Scrub through a full session video, inspect the DOM at any frame, and track pass-rate trends over time.",
    detail: "full video, every session",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-[#FAF6F0] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8C5A3C]">
            Why teams switch
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-[#0A192F] sm:text-4xl">
            QA that reads your product, not just your DOM
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#D5DACD] bg-white/50 p-7 shadow-sm transition-colors duration-300 hover:border-[#8C5A3C]/40 hover:bg-white/80"
            >
              {/* corner glow on hover */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#8C5A3C]/0 blur-2xl transition-all duration-500 group-hover:bg-[#8C5A3C]/15" />

              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A192F] text-[#FAF6F0] transition-transform duration-300 group-hover:-rotate-6 group-hover:bg-[#8C5A3C]">
                  <feature.icon size={20} strokeWidth={1.75} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[#0A192F]/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8C5A3C]"
                />
              </div>

              <span className="mt-5 w-fit rounded-full bg-[#D5DACD]/60 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0A192F]/60">
                {feature.tag}
              </span>

              <h3 className="mt-4 font-display text-lg font-semibold text-[#0A192F]">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#0A192F]/60">
                {feature.description}
              </p>

              <div className="mt-6 flex items-center gap-2 border-t border-[#D5DACD] pt-4 font-mono text-xs text-[#8C5A3C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8C5A3C]" />
                {feature.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
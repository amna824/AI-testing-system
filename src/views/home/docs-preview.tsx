"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FileCode2, Copy, Check, ArrowRight } from "lucide-react";

const TABS = [
  {
    id: "cli",
    label: "terminal",
    icon: Terminal,
    lines: [
      { t: "comment", v: "# install the CLI" },
      { t: "cmd", v: "npm install -g autotest-ai" },
      { t: "comment", v: "# point it at a repo and generate a suite" },
      { t: "cmd", v: "autotest generate --repo ./my-app" },
      { t: "out", v: "✓ parsed 38 routes, 112 components" },
      { t: "out", v: "✓ drafted 64 test cases → suite.autotest.json" },
      { t: "comment", v: "# run the suite on cloud browsers" },
      { t: "cmd", v: "autotest run suite.autotest.json --cloud" },
      { t: "out", v: "→ session: browserbase.app/s/8f2c1a" },
    ],
  },
  {
    id: "sdk",
    label: "sdk.ts",
    icon: FileCode2,
    lines: [
      { t: "comment", v: "// trigger a run from your own pipeline" },
      { t: "kw", v: "import { AutoTest } from" , s:" \"autotest-ai\";" },
      { t: "blank", v: "" },
      { t: "kw", v: "const client = new" , s: " AutoTest({ apiKey: process.env.AUTOTEST_KEY });" },
      { t: "blank", v: "" },
      { t: "kw", v: "const run = await", s: " client.suites.run({" },
      { t: "plain", v: "  source: \"github:acme/storefront\"," },
      { t: "plain", v: "  select: [\"checkout\", \"auth\"]," },
      { t: "plain", v: "  browser: \"cloud\"," },
      { t: "plain", v: "});" },
      { t: "blank", v: "" },
      { t: "comment", v: "// → { passed: 58, failed: 2, replay: url }" },
    ],
  },
];

export default function DocsPreview() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [copied, setCopied] = useState(false);
  const tab = TABS.find((t) => t.id === activeTab)!;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="docs" className="relative bg-[#FAF6F0] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Copy side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8C5A3C]">
              Built for developers
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-[#0A192F] sm:text-4xl">
              Three lines from repo to running suite
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#0A192F]/60 sm:text-base">
              Use the CLI to generate and run suites from your terminal, or drop the
              SDK straight into an existing CI pipeline. Either way, you get the same
              cloud execution engine and replay data.
            </p>

            <ul className="mt-8 space-y-3">
              {["Zero-config repo scanning", "CI-friendly exit codes", "Replay links returned in every response"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#0A192F]/70">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D5DACD]">
                      <Check size={12} className="text-[#0A192F]" />
                    </span>
                    {item}
                  </li>
                )
              )}
            </ul>

            <a
              href="#"
              className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[#8C5A3C] transition-all hover:gap-2.5"
            >
              Read the full docs
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Mock editor side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-[#D5DACD] bg-[#0A192F] shadow-[0_24px_60px_-24px_rgba(10,25,47,0.5)]"
          >
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8C5A3C]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D5DACD]/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D5DACD]/50" />
              </div>

              <div className="flex gap-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors duration-200 ${
                      activeTab === t.id
                        ? "bg-white/10 text-[#FAF6F0]"
                        : "text-[#D5DACD]/40 hover:text-[#D5DACD]/70"
                    }`}
                  >
                    <t.icon size={12} />
                    {t.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 font-mono text-xs text-[#D5DACD]/50 transition-colors hover:text-[#FAF6F0]"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>

            {/* code body */}
            <div className="min-h-[320px] px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {tab.lines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.045 }}
                      className="whitespace-pre-wrap"
                    >
                      {line.t === "blank" && <span>&nbsp;</span>}
                      {line.t === "comment" && (
                        <span className="text-[#D5DACD]/40">{line.v}</span>
                      )}
                      {line.t === "cmd" && (
                        <span className="text-[#FAF6F0]">
                          <span className="text-[#8C5A3C]">$ </span>
                          {line.v}
                        </span>
                      )}
                      {line.t === "out" && (
                        <span className="text-[#D5DACD]/70">{line.v}</span>
                      )}
                      {line.t === "kw" && (
                        <span>
                          <span className="text-[#8C5A3C]">{line.v}</span>
                          <span className="text-[#F5EBE0]">{(line as any).s}</span>
                        </span>
                      )}
                      {line.t === "plain" && (
                        <span className="text-[#D5DACD]/85">{line.v}</span>
                      )}
                    </motion.div>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="mt-1 inline-block h-4 w-2 bg-[#8C5A3C]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
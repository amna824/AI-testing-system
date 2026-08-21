"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  CheckCircle2, 
  Globe, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ExternalLink,
  ShieldCheck,
  FileCode
} from "lucide-react";

const STEPS = [
  { id: 1, title: "1. Upload Vision" },
  { id: 2, title: "2. Draft Test Suite" },
  { id: 3, title: "3. Target Live URL" },
  { id: 4, title: "4. Cloud Execution" },
];

const INITIAL_TEST_CASES = [
  { id: "tc-1", title: "Verify User Login & Auth Session", desc: "Checks form inputs and JWT response", selected: false },
  { id: "tc-2", title: "Test Primary CTA Navigation", desc: "Validates click events to /dashboard", selected: false },
  { id: "tc-3", title: "Check Navigation Drawer Toggle", desc: "Ensures sidebar expands on mobile/desktop", selected: false },
];

export default function DemoSandbox() {
  const [currentStep, setCurrentStep] = useState(1);
  const [typedUrl, setTypedUrl] = useState("");
  const [testCases, setTestCases] = useState(INITIAL_TEST_CASES);
  const [executionProgress, setExecutionProgress] = useState(0);
  const targetUrlString = "https://app.autotest.ai/demo-staging";

  // Auto-play flow sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentStep === 1) {
      // Step 1: Upload image scan -> move to Step 2
      timer = setTimeout(() => setCurrentStep(2), 2200);
    } else if (currentStep === 2) {
      // Step 2: Auto-select test cases one by one -> move to Step 3
      timer = setTimeout(() => {
        setTestCases((prev) =>
          prev.map((tc) => (tc.id === "tc-1" || tc.id === "tc-2" ? { ...tc, selected: true } : tc))
        );
      }, 800);

      const nextTimer = setTimeout(() => setCurrentStep(3), 2800);
      return () => {
        clearTimeout(timer);
        clearTimeout(nextTimer);
      };
    } else if (currentStep === 3) {
      // Step 3: Type URL character by character -> move to Step 4
      let index = 0;
      setTypedUrl("");
      const typeInterval = setInterval(() => {
        if (index < targetUrlString.length) {
          setTypedUrl((prev) => prev + targetUrlString.charAt(index));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setCurrentStep(4), 800);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    } else if (currentStep === 4) {
      // Step 4: Run progress bar to 100%
      const progressInterval = setInterval(() => {
        setExecutionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(progressInterval);
    }

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleRestart = () => {
    setCurrentStep(1);
    setTypedUrl("");
    setExecutionProgress(0);
    setTestCases(INITIAL_TEST_CASES);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#0A192F] p-4 text-[#FAF6F0] sm:p-6">
      {/* Top Stepper Navigation */}
      <div className="grid grid-cols-4 gap-2 border-b border-[#D5DACD]/10 pb-4">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isPassed = currentStep > step.id;
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 font-mono text-[11px] transition-all sm:text-xs ${
                isActive
                  ? "bg-[#8C5A3C] font-semibold text-white shadow-md"
                  : isPassed
                  ? "bg-[#10B981]/15 text-[#10B981]"
                  : "bg-white/5 text-[#D5DACD]/40 hover:bg-white/10"
              }`}
            >
              {isPassed ? <Check size={12} /> : null}
              <span className="truncate">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Screen Workspace */}
      <div className="relative my-auto flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-[#D5DACD]/10 bg-[#060F1E] p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: Vision Screenshot Upload */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8C5A3C]/20 border border-[#8C5A3C]/40 text-[#8C5A3C]">
                <UploadCloud size={32} />
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-0.5 bg-[#8C5A3C] shadow-[0_0_8px_#8C5A3C]"
                />
              </div>
              <p className="font-display text-sm font-semibold sm:text-base">
                Scanning App Interface Screenshot
              </p>
              <p className="mt-1 font-mono text-xs text-[#D5DACD]/50">
                Parsing DOM structures, interactive elements & vision layout...
              </p>
            </motion.div>
          )}

          {/* STEP 2: Generated Test Cases Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-md space-y-2.5"
            >
              <div className="flex items-center justify-between pb-1">
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#8C5A3C]">
                  <Sparkles size={14} /> AI Auto-Drafted Test Cases
                </span>
                <span className="font-mono text-[10px] text-[#D5DACD]/40">Select scenarios</span>
              </div>
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className={`flex items-center justify-between rounded-lg border p-2.5 transition-all ${
                    tc.selected
                      ? "border-[#8C5A3C] bg-[#8C5A3C]/10 text-white"
                      : "border-white/10 bg-white/5 text-[#D5DACD]/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileCode size={16} className={tc.selected ? "text-[#8C5A3C]" : "text-[#D5DACD]/40"} />
                    <div>
                      <p className="text-xs font-medium">{tc.title}</p>
                      <p className="font-mono text-[10px] text-[#D5DACD]/40">{tc.desc}</p>
                    </div>
                  </div>
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      tc.selected ? "border-[#8C5A3C] bg-[#8C5A3C] text-white" : "border-white/30"
                    }`}
                  >
                    {tc.selected && <Check size={10} />}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* STEP 3: Target Live URL Input */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-md text-center"
            >
              <p className="mb-3 font-display text-sm font-semibold">
                Provide Live Target URL For Sandbox Execution
              </p>
              <div className="flex items-center gap-2 rounded-xl border border-[#D5DACD]/20 bg-black/40 px-3 py-2.5">
                <Globe size={16} className="text-[#8C5A3C]" />
                <span className="font-mono text-xs text-emerald-400">
                  {typedUrl}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#8C5A3C] px-4 py-2 font-mono text-xs font-semibold text-white shadow-lg">
                <Play size={12} fill="currentColor" /> Launch Browserbase Runner
              </button>
            </motion.div>
          )}

          {/* STEP 4: Cloud Browser Run & Results */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-md space-y-3"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck size={14} /> Cloud Session Active
                </span>
                <span className="text-[#D5DACD]/60">{executionProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-emerald-500 transition-all duration-200"
                  style={{ width: `${executionProgress}%` }}
                />
              </div>

              {/* Live Status Cards */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 text-xs">
                  <span className="font-mono text-[11px] text-[#D5DACD]/80">
                    1. Verify User Login & Auth Session
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">PASSED (110ms)</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 text-xs">
                  <span className="font-mono text-[11px] text-[#D5DACD]/80">
                    2. Test Primary CTA Navigation
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    {executionProgress === 100 ? "PASSED (85ms)" : "EXECUTING..."}
                  </span>
                </div>
              </div>

              {executionProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 p-2.5 border border-emerald-500/20 text-emerald-400"
                >
                  <CheckCircle2 size={16} />
                  <span className="font-mono text-xs font-medium">All Selected Tests Executed Successfully!</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Controls */}
      <div className="flex items-center justify-between border-t border-[#D5DACD]/10 pt-3">
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 font-mono text-xs text-[#D5DACD]/60 transition-colors hover:text-[#FAF6F0]"
        >
          <RotateCcw size={12} /> Restart Walkthrough
        </button>
        <span className="font-mono text-[10px] text-[#8C5A3C]">
          Step {currentStep} of 4
        </span>
      </div>
    </div>
  );
}
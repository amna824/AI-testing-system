"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScanEye, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs", href: "#docs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dashboard ya auth pages par navbar hide kar dein
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF6F0]/80 backdrop-blur-md border-b border-[#D5DACD] shadow-[0_1px_0_rgba(10,25,47,0.03)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A192F] text-[#FAF6F0] transition-transform duration-300 group-hover:rotate-6">
            <ScanEye size={18} strokeWidth={2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-[#0A192F]">
            AutoTest<span className="text-[#8C5A3C]">.ai</span>
          </span>
          <span className="ml-1 hidden items-center rounded-full border border-[#8C5A3C]/30 bg-[#8C5A3C]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8C5A3C] sm:inline-flex">
            AI Beta
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[#0A192F]/70 transition-colors hover:text-[#0A192F] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#8C5A3C] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth actions (Desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-[#0A192F] transition-colors hover:bg-[#D5DACD]/50">
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button className="rounded-full bg-[#0A192F] px-5 py-2 text-sm font-medium text-[#FAF6F0] shadow-sm transition-all duration-300 hover:bg-[#8C5A3C] hover:shadow-md">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-[#0A192F] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden border-t border-[#D5DACD] bg-[#FAF6F0] md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#0A192F]/80 hover:bg-[#D5DACD]/40"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-[#D5DACD] pt-4">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <button className="w-full rounded-full border border-[#0A192F]/15 px-4 py-2.5 text-sm font-medium text-[#0A192F]">
                Log In
              </button>
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <button className="w-full rounded-full bg-[#0A192F] px-4 py-2.5 text-sm font-medium text-[#FAF6F0]">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-[#0a0a1e]/80 backdrop-blur-md py-3 border-b border-white/10" : "bg-transparent py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="relative h-12 w-40 hover:opacity-80 transition-opacity">
          <Image src="/logo.png" alt="Barrios A2I" fill className="object-contain object-left" priority />
        </Link>
        <nav className="hidden md:flex gap-8">
          {[
            { n: "Services", h: "#pricing" },
            { n: "How It Works", h: "#how-it-works" },
            { n: "Problems", h: "#problems" }
          ].map(l => (
            <Link key={l.n} href={l.h} className="text-sm font-medium text-slate-300 hover:text-[#00C2FF]">
              {l.n}
            </Link>
          ))}
        </nav>
        <Link
          href="#pricing"
          className="hidden md:inline-flex h-10 items-center justify-center rounded-md border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-6 font-medium text-[#00C2FF] hover:bg-[#00C2FF] hover:text-white transition-all"
        >
          Get Started
        </Link>
        <button className="md:hidden text-slate-300" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-[#0a0a1e] border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
        >
          <Link href="#pricing" className="text-lg text-slate-300" onClick={() => setMobileOpen(false)}>
            Services
          </Link>
          <Link href="#how-it-works" className="text-lg text-slate-300" onClick={() => setMobileOpen(false)}>
            How It Works
          </Link>
          <Link href="#problems" className="text-lg text-slate-300" onClick={() => setMobileOpen(false)}>
            Problems
          </Link>
        </motion.div>
      )}
    </header>
  );
}

"use client";
import { motion } from "framer-motion";
import { ArrowRight, Bot, PlayCircle } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-32 pb-20">
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[#00C2FF] opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F59E0B] opacity-10 blur-[120px]" />
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 px-6 items-center z-10">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-3 py-1 text-xs font-medium text-[#00C2FF] mb-6">
            Accepting New Builds Q4
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Automated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-cyan-200">
              Operations.
            </span>
            <br />
            Engineered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-amber-200">
              Attention.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-xl">
            The complete ROI stack. Event-driven AI systems to run your business, character-driven commercials to fuel it.
          </p>
          <div className="flex gap-4">
            <Link
              href="#pricing"
              className="h-12 px-8 rounded-md bg-[#00C2FF] text-[#0a0a1e] font-bold flex items-center justify-center hover:scale-105 transition-transform"
            >
              Start Build
            </Link>
          </div>
        </motion.div>
        <div className="relative rounded-xl border border-slate-800 bg-[#0B1220]/90 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-between border-b border-slate-800 pb-4 mb-4">
            <span className="text-xs font-mono text-slate-500">LIVE_ROI_SNAPSHOT.tsx</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 border border-slate-800 rounded">
              <Bot className="h-4 w-4 text-[#00C2FF] mb-2" />
              <div className="text-2xl font-bold">840 Tasks/mo</div>
            </div>
            <div className="bg-slate-900/50 p-4 border border-slate-800 rounded">
              <PlayCircle className="h-4 w-4 text-[#F59E0B] mb-2" />
              <div className="text-2xl font-bold">12.5k Views</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

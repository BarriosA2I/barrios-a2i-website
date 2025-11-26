"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0a0a1e] via-[#0B1220] to-[#0a0a1e] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00C2FF10_1px,transparent_1px),linear-gradient(to_bottom,#00C2FF10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Build Something Real?
        </h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          No fluff. No 47-step funnels. Just honest work that drives ROI.
        </p>
        <Link
          href="mailto:hello@barriosa2i.com"
          className="inline-flex items-center gap-2 h-14 px-10 rounded-md bg-[#00C2FF] text-[#0a0a1e] font-bold hover:scale-105 transition-transform"
        >
          Book a Call
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

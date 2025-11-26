"use client";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Tier = ({ title, price, feat, highlight }: any) => (
  <div className={`p-6 rounded-xl border flex flex-col ${highlight ? 'border-[#00C2FF] bg-slate-900/80 shadow-2xl' : 'border-slate-800 bg-slate-900/40'}`}>
    <h4 className="text-lg font-bold text-white">{title}</h4>
    <div className="text-3xl font-bold text-white mt-2">{price}</div>
    <ul className="mt-4 space-y-2 flex-1">
      {feat.map((f: string, i: number) => (
        <li key={i} className="flex gap-2 text-sm text-slate-300">
          <Check className="w-4 h-4 text-[#00C2FF]" />
          {f}
        </li>
      ))}
    </ul>
    <Link
      href="mailto:hello@barriosa2i.com"
      className={`mt-6 w-full py-3 rounded text-center text-sm font-bold ${highlight ? 'bg-white text-black' : 'border border-slate-700 text-white'}`}
    >
      Book
    </Link>
  </div>
);

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a1e] relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Straightforward Pricing</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Tier title="Starter Site" price="$1,500" feat={["5 Pages", "Mobile Ready", "Contact Form"]} />
          <Tier title="Growth Site" price="$3,500" feat={["8-12 Pages", "SEO Setup", "Blog Ready"]} highlight={true} />
          <Tier title="Lead Gen" price="$5,000" feat={["15 Pages", "CRM Hookup", "Ad Landing Page"]} />
          <Tier title="E-Commerce" price="$4,000" feat={["Shopify Setup", "25 Products", "Payments"]} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-8">Video & Automation</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Tier title="Local Spot" price="$500 / vid" feat={["20-30 Sec", "AI + Human Edit", "Vertical/Horizontal"]} />
          <Tier title="Smart Bot" price="$199 / mo" feat={["$1k Setup", "RAG Training", "Booking Handoff"]} highlight={true} />
          <Tier title="Ops Sprint" price="$3,500" feat={["Map Bottlenecks", "Build Workflow", "ROI Report"]} />
        </div>
        <div className="mt-12 p-8 border border-dashed border-slate-700 bg-black/40 rounded-xl">
          <h3 className="text-xl font-bold text-white">Enterprise / Industrial</h3>
          <p className="text-slate-400 text-sm mt-2">
            RAG Architecture, Multi-Agent Fabrics, and Manufacturing Pilots available. Scoped engineering from $8,000+.
          </p>
        </div>
      </div>
    </section>
  );
}

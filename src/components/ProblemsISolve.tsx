"use client";
import { motion } from "framer-motion";
import { Zap, Users, Target, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Your Site Looks Like 2015",
    description: "Outdated design losing you clients before you even talk to them."
  },
  {
    icon: Users,
    title: "Nobody Knows You Exist",
    description: "Great product, zero visibility. SEO is a black box you keep paying for."
  },
  {
    icon: Target,
    title: "Ads Burn Money, No Leads",
    description: "Throwing cash at Google/Facebook. Getting clicks, not customers."
  },
  {
    icon: TrendingUp,
    title: "Doing Everything Manually",
    description: "Answering the same questions. Booking by email. No time left to sell."
  }
];

export function ProblemsISolve() {
  return (
    <section id="problems" className="py-24 bg-[#0a0a1e]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Problems I Actually Solve</h2>
        <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
          No fluff. Just the stuff that&apos;s costing you money right now.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-[#00C2FF]/30 transition-colors"
            >
              <problem.icon className="w-8 h-8 text-[#F59E0B] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
              <p className="text-sm text-slate-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

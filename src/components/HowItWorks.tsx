"use client";
import { motion } from "framer-motion";
import { MessageSquare, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Book a Call",
    description: "15-minute discovery. We'll figure out exactly what you need and what you don't."
  },
  {
    icon: Code,
    title: "We Build It",
    description: "No back-and-forth hell. We build, you review once, we ship."
  },
  {
    icon: Rocket,
    title: "You Launch",
    description: "Site goes live. Video goes out. Bot starts booking. You track ROI."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0B1220]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-8 rounded-xl border border-slate-800"
            >
              <div className="w-12 h-12 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-[#00C2FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

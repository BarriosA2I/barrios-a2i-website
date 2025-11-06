"use client";

import { motion } from "framer-motion";
import { Target, Zap, Shield, Rocket } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "Our mission is to democratize AI orchestration, making enterprise-grade multi-agent systems accessible to teams of any size.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "We push the boundaries of what's possible with AI agents, constantly exploring new patterns and architectures.",
  },
  {
    icon: Shield,
    title: "Production-Ready",
    description:
      "Every feature we build is battle-tested in production environments handling millions of queries per day.",
  },
  {
    icon: Rocket,
    title: "Developer Experience",
    description:
      "We obsess over DX, ensuring our tools integrate seamlessly into your existing workflow and codebase.",
  },
];

export default function AboutMission() {
  return (
    <section className="relative py-24 bg-[#0B1220]">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              These principles guide everything we build and every decision we make.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-amber-500 rounded-xl flex items-center justify-center">
                    <value.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

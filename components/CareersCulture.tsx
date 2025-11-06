"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Zap, Heart } from "lucide-react";

const perks = [
  {
    icon: Globe,
    title: "Remote-First",
    description: "Work from anywhere in the world. We're a distributed team across multiple time zones.",
  },
  {
    icon: Code2,
    title: "Cutting-Edge Tech",
    description: "Work with the latest AI models, distributed systems, and cloud infrastructure.",
  },
  {
    icon: Zap,
    title: "Fast-Paced",
    description: "Ship code that impacts thousands of users. No red tape, just execution.",
  },
  {
    icon: Heart,
    title: "Supportive Culture",
    description: "Collaborative environment focused on learning, growth, and work-life balance.",
  },
];

export default function CareersCulture() {
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
              Why Join Us?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We&apos;re building more than just software. We&apos;re creating the infrastructure
              that will power the next generation of AI applications.
            </p>
          </motion.div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-amber-500 rounded-xl flex items-center justify-center">
                    <perk.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {perk.description}
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

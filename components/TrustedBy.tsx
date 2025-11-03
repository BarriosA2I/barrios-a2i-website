"use client";

import { motion } from "framer-motion";

export default function TrustedBy() {
  const stats = [
    { label: "Enterprise Deployments", value: "10+" },
    { label: "ARR Orchestrated", value: "$100M+" },
    { label: "Avg Deployment", value: "18 days" },
    { label: "P95 Latency", value: "<20ms" },
  ];

  const logos = [
    { name: "Company 1", width: 120 },
    { name: "Company 2", width: 100 },
    { name: "Company 3", width: 140 },
    { name: "Company 4", width: 110 },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#0E1626] to-[#0B1220]">
      <div className="container mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-100 mb-6">
            Trusted by Production Teams
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Deployed at{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
              Scale
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Companies running mission-critical AI agent workloads on Barrios A2I.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo Grid Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-12"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              style={{ width: logo.width }}
            >
              {/* Placeholder for company logos */}
              <div className="h-12 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-slate-500 text-xs font-medium">
                {logo.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 text-sm mb-4">
            Join teams orchestrating billions of agent interactions
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            See customer stories →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

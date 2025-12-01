"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const steps = [
  {
    number: "01",
    title: "The Audit",
    subtitle: "We Map the Chaos",
    description: "Before we write a single line of code, we conduct a brutal forensic analysis of your current tech stack, data flows, and operational bottlenecks. We identify every leak.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    colorClasses: {
      text: "text-cyber-cyan",
      bg: "bg-cyber-cyan/10",
      border: "border-cyber-cyan/20",
      borderHover: "hover:border-cyber-cyan/30",
      badge: "bg-cyber-cyan/10 border-cyber-cyan/30",
      glow: "from-cyber-cyan/10",
    },
    deliverable: "Gap Analysis Report",
  },
  {
    number: "02",
    title: "The Architecture",
    subtitle: "We Design the OS",
    description: "We architect a unified system blueprint—your custom Command Deck. This is the master plan for how your data, agents, and interface will work as a single organism.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    colorClasses: {
      text: "text-cyber-gold",
      bg: "bg-cyber-gold/10",
      border: "border-cyber-gold/20",
      borderHover: "hover:border-cyber-gold/30",
      badge: "bg-cyber-gold/10 border-cyber-gold/30",
      glow: "from-cyber-gold/10",
    },
    deliverable: "System Blueprint",
  },
  {
    number: "03",
    title: "The Injection",
    subtitle: "We Connect the Data",
    description: "We inject your institutional knowledge into the RAG system, configure your AI agents with custom protocols, and wire everything into a live, queryable database.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    colorClasses: {
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      borderHover: "hover:border-emerald-500/30",
      badge: "bg-emerald-500/10 border-emerald-500/30",
      glow: "from-emerald-500/10",
    },
    deliverable: "Live Data System",
  },
  {
    number: "04",
    title: "The Handover",
    subtitle: "We Give You the Keys",
    description: "Full training. Full documentation. Full ownership. You get the keys to your Command Deck, and we remain on standby for optimization and scaling.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    colorClasses: {
      text: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      borderHover: "hover:border-purple-500/30",
      badge: "bg-purple-500/10 border-purple-500/30",
      glow: "from-purple-500/10",
    },
    deliverable: "Full Ownership",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-black overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] bg-cyber-cyan/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full" />

        {/* Vertical Timeline Line (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-[200px] bottom-[200px] w-px bg-gradient-to-b from-transparent via-cyber-cyan/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-cyber-gold rounded-full"></span>
            <span className="text-cyber-gold font-mono text-xs tracking-widest uppercase">The Process</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Engineering, Not Guessing.
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We don&apos;t &quot;wing it.&quot; Every engagement follows a <span className="text-white font-semibold">proven 4-phase protocol</span> that guarantees predictable outcomes.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 lg:space-y-0"
        >
          {steps.map((step, index) => {
            const isEven = index % 2 === 0
            const c = step.colorClasses

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                  index !== steps.length - 1 ? "lg:pb-16" : ""
                }`}
              >
                {/* Timeline Node (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0B1220] border-2 border-cyber-cyan items-center justify-center z-20">
                  <span className="text-cyber-cyan font-mono text-sm font-bold">{step.number}</span>
                </div>

                {/* Content Card */}
                <div
                  className={`relative ${
                    isEven ? "lg:col-start-1 lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"
                  }`}
                >
                  <div className={`group relative p-8 rounded-2xl bg-[#0B1220] border border-white/5 ${c.borderHover} transition-all duration-500`}>
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${c.glow} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className={`relative ${isEven ? "lg:text-right" : ""}`}>
                      {/* Mobile Number Badge */}
                      <div className={`lg:hidden inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full ${c.badge} border`}>
                        <span className={`${c.text} font-mono text-sm font-bold`}>STEP {step.number}</span>
                      </div>

                      {/* Icon + Title Row */}
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                        <div className={`w-14 h-14 rounded-xl ${c.bg} flex items-center justify-center ${c.text} ${c.border} border`}>
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                          <p className={`${c.text} text-sm font-medium`}>{step.subtitle}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Deliverable Tag */}
                      <div className={`inline-flex items-center gap-2 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                        <svg className={`w-4 h-4 ${c.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-500 text-sm">Deliverable: <span className="text-white">{step.deliverable}</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty Grid Cell for Alternating Layout */}
                {isEven ? (
                  <div className="hidden lg:block lg:col-start-2" />
                ) : (
                  <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-gradient-to-b from-[#0B1220] to-[#0e1626] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/40 flex items-center justify-center">
                  <span className="text-cyber-cyan text-xs">01</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-cyber-gold/20 border border-cyber-gold/40 flex items-center justify-center">
                  <span className="text-cyber-gold text-xs">02</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <span className="text-emerald-500 text-xs">03</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                  <span className="text-purple-500 text-xs">04</span>
                </div>
              </div>
              <span className="text-slate-400 text-sm">4 Phases. 8-12 Weeks. Zero Guesswork.</span>
            </div>
            <Link
              href="#pricing"
              className="px-10 py-4 bg-cyber-gold hover:bg-white text-navy-deep font-bold tracking-wider uppercase text-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
              Start the Audit
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

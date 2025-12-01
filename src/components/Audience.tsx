"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Audience() {
  return (
    <section id="audience" className="relative py-24 sm:py-32 bg-[#050A14] overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyber-cyan/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-cyber-gold/5 blur-[120px] rounded-full" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
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
            <span className="w-2 h-2 bg-cyber-cyan rounded-full"></span>
            <span className="text-cyber-cyan font-mono text-xs tracking-widest uppercase">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Total Command.
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We don&apos;t sell &quot;features.&quot; We engineer an <span className="text-white font-semibold">autonomous workforce</span> that runs 24/7 without you.
          </p>
        </motion.div>

        {/* Three Core Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-20"
        >

          {/* Core 1: Institutional Memory (RAG) */}
          <motion.div
            variants={itemVariants}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl bg-[#0B1220] border border-white/5 hover:border-cyber-cyan/30 transition-all duration-500 h-full">

              {/* Icon */}
              <div className="mb-6 w-16 h-16 rounded-xl bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan border border-cyber-cyan/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>

              {/* Number Badge */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
                <span className="text-cyber-cyan font-mono text-sm">01</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Institutional Memory</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Your business data—every email, contract, and SOP—indexed and instantly retrievable by your AI agents.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono border border-cyber-cyan/20">RAG</span>
                <span className="px-3 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono border border-cyber-cyan/20">Vector DB</span>
                <span className="px-3 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono border border-cyber-cyan/20">Semantic Search</span>
              </div>
            </div>
          </motion.div>

          {/* Core 2: Autonomous Workforce (Agents) */}
          <motion.div
            variants={itemVariants}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-gold/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl bg-[#0B1220] border border-white/5 hover:border-cyber-gold/30 transition-all duration-500 h-full">

              {/* Icon */}
              <div className="mb-6 w-16 h-16 rounded-xl bg-cyber-gold/10 flex items-center justify-center text-cyber-gold border border-cyber-gold/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              {/* Number Badge */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-cyber-gold/10 border border-cyber-gold/30 flex items-center justify-center">
                <span className="text-cyber-gold font-mono text-sm">02</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Autonomous Workforce</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Three dedicated AI agents running 24/7: One to qualify leads, one to handle support, and one to process invoices.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-cyber-gold/10 text-cyber-gold text-xs font-mono border border-cyber-gold/20">Lead Agent</span>
                <span className="px-3 py-1 rounded-full bg-cyber-gold/10 text-cyber-gold text-xs font-mono border border-cyber-gold/20">Support Agent</span>
                <span className="px-3 py-1 rounded-full bg-cyber-gold/10 text-cyber-gold text-xs font-mono border border-cyber-gold/20">Ops Agent</span>
              </div>
            </div>
          </motion.div>

          {/* Core 3: Profit Interface (Frontend) */}
          <motion.div
            variants={itemVariants}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl bg-[#0B1220] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 h-full">

              {/* Icon */}
              <div className="mb-6 w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Number Badge */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-emerald-500 font-mono text-sm">03</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Profit Interface</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                A high-performance Next.js interface that doesn&apos;t just &quot;look good&quot;—it controls the entire system.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono border border-emerald-500/20">Next.js 15</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono border border-emerald-500/20">Dashboard</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono border border-emerald-500/20">Real-time</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl bg-gradient-to-r from-[#0B1220] via-[#0e1626] to-[#0B1220] border border-white/5">
            <div className="text-left">
              <div className="text-sm text-slate-400 mb-1">Complete System Starting At</div>
              <div className="text-4xl font-bold text-white">$50,000</div>
            </div>
            <div className="h-12 w-px bg-white/10 hidden sm:block" />
            <Link
              href="#pricing"
              className="px-8 py-4 bg-cyber-cyan hover:bg-white text-navy-deep font-bold tracking-wider uppercase text-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,194,255,0.4)]"
            >
              See Full Package
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

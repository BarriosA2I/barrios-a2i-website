"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Problems() {
  return (
    <section id="problems" className="relative py-24 bg-black overflow-hidden border-t border-slate-900">

      {/* Background: Subtle 'Warning' Red/Orange Glow mixed with Cyan */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-cyan-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header: The Diagnosis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-500 font-mono text-xs tracking-widest uppercase">System Diagnosis: CRITICAL</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
            You Can&apos;t Scale a <br />
            <span className="text-slate-500">Frankenstein Monster.</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            You are growing, but your backend is a mess of disconnected spreadsheets, lost PDF contracts, and &quot;glued together&quot; software. <span className="text-white font-semibold">You are the bottleneck.</span>
          </p>
        </motion.div>

        {/* The Grid: 'Manual Friction' vs 'The Ceiling' */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >

          {/* Card 1: The Data Silo */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 rounded-2xl bg-[#0B1220] border border-white/5 hover:border-red-500/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div className="mb-6 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Institutional Amnesia</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Your best data—SOPs, client histories, and strategies—are locked in Slack DMs and static PDFs. Your AI can&apos;t see them, so your team answers the same questions 50 times a day.
            </p>
          </motion.div>

          {/* Card 2: The Agent Chaos */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 rounded-2xl bg-[#0B1220] border border-white/5 hover:border-red-500/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="mb-6 w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Zapier Spaghetti</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              You are trying to run a $10M operation on $20/month tools glued together. One API change breaks your entire sales funnel. It&apos;s fragile, and you know it.
            </p>
          </motion.div>

          {/* Card 3: The Human Bottleneck */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 rounded-2xl bg-[#0B1220] border border-white/5 hover:border-red-500/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="mb-6 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">The &quot;You&quot; Constraint</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Your staff waits for your approval. Your clients wait for your email. You are the smartest person in the room, which means the business stops when you sleep.
            </p>
          </motion.div>

        </motion.div>

        {/* The Transition: From Pain to Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-1 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"
        >
          <div className="bg-[#0e1626] rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">The Shift:</h4>
              <p className="text-slate-400 max-w-xl">
                To break through, you don&apos;t need more &quot;productivity tools.&quot; You need a <span className="text-cyber-cyan font-semibold">Digital Nervous System</span> that operates independently of you.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="#pricing"
                className="inline-block px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-all"
              >
                AUDIT MY BOTTLENECKS
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

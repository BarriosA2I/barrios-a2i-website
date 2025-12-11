'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 lg:pt-48 pb-20">
      {/* Ambient Background Effects (The Auras) */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")`
      }} />

      {/* Main Top Right Aura - Cyber Cyan */}
      <div className="fixed top-[-20%] right-[-10%] w-[900px] h-[900px] bg-cyber-cyan/15 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      {/* Secondary Moving Aura */}
      <div className="fixed top-[10%] right-[30%] w-[500px] h-[500px] bg-cyber-cyan/8 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

      {/* Bottom Left Warmth - Gold accent */}
      <div className="fixed bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-cyber-gold/8 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 px-6 items-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 text-xs font-semibold text-cyber-cyan mb-8 tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
            </span>
            Now Accepting Projects
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl leading-[1.1] text-white tracking-tight font-display font-bold mb-6">
            Build smarter.
            <br />
            <span className="gradient-text italic">
              Launch faster.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-300 leading-relaxed max-w-lg mb-10">
            We design, develop, and deploy AI-powered solutions — from websites
            and apps to commercials and automation systems.
          </p>

          {/* CTAs - Matching Nav button style */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#pricing"
              className="group px-8 py-3.5 bg-cyber-cyan text-navy-deep font-bold text-base rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#audience"
              className="glass border border-white/10 hover:border-cyber-cyan/50 text-white px-8 py-3.5 rounded-lg text-base font-medium transition-all flex items-center justify-center gap-2 hover:text-cyber-cyan"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>

        {/* Control Plane Visual - The Orbital Animation */}
        <motion.div
          className="relative group hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* THE HERO PULSING AURA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyber-cyan/20 blur-[100px] rounded-full -z-10 pointer-events-none animate-pulse-glow" />

          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

          <div className="relative rounded-2xl border border-white/10 bg-navy-light aspect-video overflow-hidden shadow-2xl border-glow-cyan">
            {/* Dark gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-navy-deep"></div>

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-60" style={{
              backgroundImage: 'linear-gradient(rgba(0, 194, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>

            {/* Status Overlay UI */}
            <div className="absolute bottom-6 left-6 font-mono text-xs text-cyber-cyan leading-relaxed z-10">
              <div className="flex items-center gap-2 mb-1">
                <ChevronRight className="w-3 h-3" /> SYSTEM_READY
              </div>
              <div className="flex items-center gap-2 mb-1 opacity-70">
                <ChevronRight className="w-3 h-3" /> AGENTS_ACTIVE: 4
              </div>
              <div className="flex items-center gap-2 opacity-70">
                <ChevronRight className="w-3 h-3" /> INTELLIGENCE_CORE: ONLINE
              </div>
            </div>

            {/* Abstract Orbital Visualization - The Galaxy Animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Outer ring - slow spin */}
              <div
                className="w-32 h-32 rounded-full border border-cyber-cyan/30 flex items-center justify-center animate-spin-slow"
              >
                {/* Inner ring - reverse spin */}
                <div
                  className="w-24 h-24 rounded-full border border-cyber-cyan/50"
                  style={{
                    borderTopColor: 'transparent',
                    animation: 'spin 3s linear infinite reverse'
                  }}
                ></div>
              </div>
              {/* Central Glow Dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyber-cyan rounded-full blur-[8px] animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

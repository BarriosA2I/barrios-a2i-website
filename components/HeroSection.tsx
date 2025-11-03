'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import FeatureCard from './FeatureCard'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Skip white frames at video start
    if (videoRef.current) {
      videoRef.current.currentTime = 0.5
    }
  }, [])

  // Technology tags
  const techTags = ['LangGraph', 'RabbitMQ', 'Redis', 'OpenTelemetry', 'Docker']

  // Metrics data
  const metrics = [
    { label: '99.9% Uptime SLA', value: '99.9%' },
    { label: '< 20 ms P95', value: 'Agents/Sec' }
  ]

  // Feature cards data
  const features = [
    {
      icon: Zap,
      title: 'Event-Driven Orchestration',
      description: 'RabbitMQ-powered async messaging for distributed multi-agent coordination with zero polling overhead.'
    },
    {
      icon: Shield,
      title: 'Circuit Breakers',
      description: 'Automatic failure isolation prevents cascade failures across your agent ecosystem with intelligent retry logic.'
    },
    {
      icon: TrendingUp,
      title: 'Horizontal Scaling',
      description: 'Scale individual agents independently based on load. Add capacity without downtime or code changes.'
    }
  ]

  return (
    <section className="relative w-full min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] to-[var(--ink-dark)]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      {/* Main hero content */}
      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">

          {/* LEFT: Animated Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glow effect behind video */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--gold)]/20 blur-3xl animate-pulse" />

              {/* Video container with dark background */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[var(--ink-dark)] border border-[var(--glass-border)] shadow-2xl">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(1.5) drop-shadow(0 0 60px rgba(34, 211, 238, 0.6))',
                    backgroundColor: '#020617'
                  }}
                >
                  <source src="/videos/Video_Optimization_Command_and_Generation.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[var(--cyan)] rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[var(--gold)] rounded-br-3xl" />
            </div>
          </motion.div>

          {/* RIGHT: Content Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Eyebrow text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--cyan)]/10 to-[var(--gold)]/10 border border-[var(--cyan)]/30"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
              <span className="text-sm font-medium text-[var(--cyan)] tracking-wider uppercase">
                Production-Grade AI Infrastructure
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Scale AI Agents With{' '}
              <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--cyan)] text-transparent bg-clip-text">
                Confidence
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-400 leading-relaxed max-w-2xl"
            >
              Enterprise-grade orchestration platform for distributed multi-agent systems.
              Event-driven architecture built for production-scale deployments.
            </motion.p>

            {/* Technology tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              {techTags.map((tech, index) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] text-sm text-slate-300 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <Link href="/schedule">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[var(--cyan)] to-[var(--gold)] text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Schedule Architecture Review
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>

                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] to-[var(--cyan)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>

              {/* Secondary CTA */}
              <Link href="/architecture">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-[var(--glass-bg)] backdrop-blur-sm text-white font-bold rounded-xl border-2 border-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    View Architecture
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Metrics bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-[var(--glass-border)]"
            >
              {metrics.map((metric, index) => (
                <div key={metric.label} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
                  <div>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.label}</div>
                  </div>
                  {index < metrics.length - 1 && (
                    <div className="hidden sm:block w-px h-12 bg-[var(--glass-border)]" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={1.0 + index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--ink-dark)] to-transparent" />
    </section>
  )
}

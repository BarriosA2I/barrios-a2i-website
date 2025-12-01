'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VideoPortalCard } from './ui';

// =============================================================================
// SOLUTIONS SECTION - S+++ PRODUCTION
// =============================================================================
// Premium video portal cards showcasing core AI solutions
// Videos generated via Kling AI for cinematic effect
// =============================================================================

interface Solution {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  fallbackImage: string;
  accentColor: 'cyan' | 'amber' | 'emerald' | 'purple' | 'rose';
  statusText: string;
  badge?: string;
  icon: React.ReactNode;
}

const SOLUTIONS: Solution[] = [
  {
    id: 'memory-core',
    title: 'Infinite Memory RAG',
    subtitle: 'Your AI remembers everything. Every document, every conversation, every insight—instantly accessible.',
    videoUrl: '/assets/ragnarok_memory_loop.mp4',
    fallbackImage: '/assets/memory-fallback.jpg',
    accentColor: 'cyan',
    statusText: 'MEMORY.ACTIVE',
    badge: 'Core System',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'agent-swarm',
    title: 'Autonomous Agent Swarm',
    subtitle: 'AI agents that think, decide, and execute—24/7 operations without human bottlenecks.',
    videoUrl: '/assets/ragnarok_agents_loop.mp4',
    fallbackImage: '/assets/agents-fallback.jpg',
    accentColor: 'emerald',
    statusText: 'AGENTS.DEPLOYED',
    badge: 'Automation',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'command-center',
    title: 'Real-Time Command Center',
    subtitle: 'Live dashboards, predictive analytics, and instant alerts—total operational visibility.',
    videoUrl: '/assets/ragnarok_dashboard_loop.mp4',
    fallbackImage: '/assets/dashboard-fallback.jpg',
    accentColor: 'amber',
    statusText: 'DASHBOARD.LIVE',
    badge: 'Intelligence',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-32 bg-[#0A0E17] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Core Systems
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            The Infrastructure of{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Total Command
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Three integrated systems that transform your business into an AI-powered operation.
            Built for scale. Designed for dominance.
          </p>
        </motion.div>

        {/* Solution Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <VideoPortalCard
                title={solution.title}
                subtitle={solution.subtitle}
                videoUrl={solution.videoUrl}
                fallbackImage={solution.fallbackImage}
                icon={solution.icon}
                accentColor={solution.accentColor}
                statusText={solution.statusText}
                badge={solution.badge}
                onClick={() => {
                  // Scroll to demo section
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-12"
        >
          {[
            { value: '99.9%', label: 'System Uptime' },
            { value: '<50ms', label: 'Response Time' },
            { value: '10M+', label: 'Queries Processed' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-bold text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

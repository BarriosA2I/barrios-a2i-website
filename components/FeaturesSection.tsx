'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Workflow, Shield, Gauge, GitBranch, Activity, Database } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Workflow,
      title: 'Event-Driven Orchestration',
      description: 'Async message queues with dead letter handling, retry logic, and backpressure management for fault-tolerant agent coordination.',
      color: 'cyan',
    },
    {
      icon: Shield,
      title: 'Circuit Breakers & Fallbacks',
      description: 'Automatic failure detection with exponential backoff and graceful degradation to secondary LLM providers.',
      color: 'amber',
    },
    {
      icon: Gauge,
      title: 'Horizontal Scaling',
      description: 'Worker pool autoscaling based on queue depth. Kubernetes-native with HPA for elastic capacity.',
      color: 'cyan',
    },
    {
      icon: GitBranch,
      title: 'Workflow DAGs',
      description: 'Visual state machines for agent lifecycles. Conditional branching, parallel execution, and human-in-the-loop approval gates.',
      color: 'amber',
    },
    {
      icon: Activity,
      title: 'OpenTelemetry Observability',
      description: 'Distributed tracing across agent boundaries. Real-time metrics for latency, token usage, and success rates.',
      color: 'cyan',
    },
    {
      icon: Database,
      title: 'Stateful Agent Memory',
      description: 'Vector databases for long-term context. Redis for session state. PostgreSQL for audit logs.',
      color: 'amber',
    },
  ]

  return (
    <section id="features" className="relative py-32 bg-slate-950">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6"
          >
            <span className="text-cyan-400 font-medium text-sm">CORE CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-4xl sm:text-5xl font-bold text-slate-50 mb-6"
          >
            Production-Ready <span className="gradient-text">Architecture</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            Built for engineers who demand reliability, observability, and scale.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const glowColor = feature.color === 'cyan' ? 'glow-cyan' : 'glow-gold'
            const borderColor = feature.color === 'cyan' ? 'border-cyan-400/30' : 'border-amber-500/30'
            const iconColor = feature.color === 'cyan' ? 'text-cyan-400' : 'text-amber-500'
            const bgColor = feature.color === 'cyan' ? 'bg-cyan-400/10' : 'bg-amber-500/10'

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 bg-slate-900/50 backdrop-blur border ${borderColor} rounded-lg hover:${glowColor} transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={iconColor} />
                </div>

                <h3 className="text-xl font-space font-bold text-slate-50 mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

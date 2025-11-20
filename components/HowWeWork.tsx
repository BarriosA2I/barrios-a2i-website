/**
 * HowWeWork Component - Barrios A2I
 *
 * 3-step process section with connecting lines
 * Shows our streamlined delivery workflow
 */

'use client'

import React from 'react'
import { MessageSquare, Cpu, Rocket } from 'lucide-react'

export default function HowWeWork() {
  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: 'Discovery Call',
      description: 'Share your vision in a 30-min call. We scope the project, clarify requirements, and provide instant pricing.',
      duration: '30 min',
      color: 'cyan',
    },
    {
      icon: Cpu,
      number: '02',
      title: 'AI-Powered Build',
      description: 'Our RAG agents generate code, scripts, and designs. Real-time progress updates via Slack or email.',
      duration: '48-72h',
      color: 'amber',
    },
    {
      icon: Rocket,
      number: '03',
      title: 'Launch & Support',
      description: 'We deploy, test, and hand off with full documentation. 30-day support included on all projects.',
      duration: '1-2 days',
      color: 'cyan',
    },
  ]

  return (
    <section id="process" className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-400/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
            <span className="text-cyan-400 font-medium text-sm uppercase tracking-wider">Our Process</span>
          </div>

          <h2 className="font-space text-5xl font-bold text-slate-50 mb-6">
            How We <span className="bg-gradient-to-r from-cyan-400 to-amber-500 bg-clip-text text-transparent">Work</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From concept to deployment in 72 hours. No endless sprints, no scope creep, no surprises.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/30 via-amber-500/30 to-cyan-400/30" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isAmber = step.color === 'amber'
              const glowColor = isAmber ? 'hover:shadow-[0_10px_40px_rgba(255,167,38,0.3)]' : 'hover:shadow-[0_10px_40px_rgba(0,217,255,0.3)]'
              const borderColor = isAmber ? 'border-amber-500/30' : 'border-cyan-400/30'
              const iconBg = isAmber ? 'bg-amber-500/10' : 'bg-cyan-400/10'
              const iconColor = isAmber ? 'text-amber-500' : 'text-cyan-400'
              const numberColor = isAmber ? 'text-amber-500/30' : 'text-cyan-400/30'

              return (
                <div
                  key={index}
                  className={`group relative p-8 bg-slate-900/50 backdrop-blur border ${borderColor} rounded-lg ${glowColor} transition-all duration-300 hover:-translate-y-2`}
                >
                  {/* Step Number Background */}
                  <div className={`absolute top-4 right-4 text-6xl font-bold ${numberColor} font-space`}>
                    {step.number}
                  </div>

                  {/* Icon Circle */}
                  <div className={`relative z-10 w-20 h-20 ${iconBg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={36} className={iconColor} />
                  </div>

                  {/* Duration Badge */}
                  <div className={`inline-block px-3 py-1 ${iconBg} rounded-full mb-4`}>
                    <span className={`text-xs font-medium ${iconColor}`}>{step.duration}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-space font-bold text-slate-50 mb-4 relative z-10">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed relative z-10">
                    {step.description}
                  </p>

                  {/* Hover indicator */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 ${isAmber ? 'bg-amber-500' : 'bg-cyan-400'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg`} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">Ready to see how fast we move?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:scale-105 transition-all duration-300"
          >
            Book Discovery Call
          </a>
        </div>
      </div>
    </section>
  )
}

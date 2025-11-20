/**
 * WhyBarrios Component - Barrios A2I
 *
 * 4 competitive advantages + founder story
 * Differentiates us from traditional dev agencies
 */

'use client'

import React from 'react'
import { Clock, DollarSign, Code, Shield } from 'lucide-react'

export default function WhyBarrios() {
  const advantages = [
    {
      icon: Clock,
      title: '48-72h Delivery',
      description: 'AI-powered workflows mean your project ships in days, not months. Fixed timelines, zero delays.',
      stat: '3 days',
      color: 'cyan',
    },
    {
      icon: DollarSign,
      title: 'Fixed Pricing',
      description: 'No hourly rates, no budget creep. Know the exact cost upfront before we write a single line of code.',
      stat: '$0 surprise fees',
      color: 'amber',
    },
    {
      icon: Code,
      title: 'Production-Grade Code',
      description: 'RAG agents trained on enterprise patterns. TypeScript, tests, documentation, and CI/CD included.',
      stat: '100% tested',
      color: 'cyan',
    },
    {
      icon: Shield,
      title: '30-Day Support',
      description: 'Every project includes a full month of bug fixes, adjustments, and deployment support. No extra charge.',
      stat: '30 days',
      color: 'amber',
    },
  ]

  return (
    <section id="why-us" className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-500 font-medium text-sm uppercase tracking-wider">Why Barrios A2I</span>
          </div>

          <h2 className="font-space text-5xl font-bold text-slate-50 mb-6">
            Built Different. <span className="bg-gradient-to-r from-cyan-400 to-amber-500 bg-clip-text text-transparent">Delivered Faster.</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We're not a traditional agency. We're an AI-first dev shop that ships production systems at startup speed.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            const isAmber = advantage.color === 'amber'
            const glowColor = isAmber ? 'hover:shadow-[0_10px_40px_rgba(255,167,38,0.3)]' : 'hover:shadow-[0_10px_40px_rgba(0,217,255,0.3)]'
            const borderColor = isAmber ? 'border-amber-500/30' : 'border-cyan-400/30'
            const iconBg = isAmber ? 'bg-amber-500/10' : 'bg-cyan-400/10'
            const iconColor = isAmber ? 'text-amber-500' : 'text-cyan-400'

            return (
              <div
                key={index}
                className={`group relative p-6 bg-slate-900/50 backdrop-blur border ${borderColor} rounded-lg ${glowColor} transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className={iconColor} />
                </div>

                {/* Stat Badge */}
                <div className={`inline-block px-3 py-1 ${iconBg} rounded-full mb-3`}>
                  <span className={`text-xs font-bold ${iconColor}`}>{advantage.stat}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-space font-bold text-slate-50 mb-3">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {advantage.description}
                </p>

                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${isAmber ? 'bg-amber-500' : 'bg-cyan-400'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg`} />
              </div>
            )
          })}
        </div>

        {/* Founder Story Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 bg-slate-900/50 backdrop-blur border border-cyan-400/30 rounded-2xl hover:shadow-[0_10px_40px_rgba(0,217,255,0.2)] transition-all duration-300">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-6xl text-cyan-400/20 font-serif">"</div>

            <div className="relative z-10">
              {/* Story */}
              <div className="mb-8">
                <h3 className="text-2xl font-space font-bold text-slate-50 mb-6">
                  Why I Built This
                </h3>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    I spent 10 years watching enterprise projects take 18 months to ship what should've taken 3 weeks.
                    Endless meetings, bloated teams, scope creep, and budgets that spiraled out of control.
                  </p>
                  <p>
                    When I discovered RAG orchestration and multi-agent systems, everything clicked. I could finally build
                    the dev shop I always wished existed: <span className="text-cyan-400 font-semibold">fast, fixed-price, and production-ready</span>.
                  </p>
                  <p>
                    Barrios A2I is what happens when you combine <span className="text-amber-500 font-semibold">10+ years of
                    software engineering</span> with cutting-edge AI orchestration. No fluff, no filler—just shipping real products
                    that generate revenue.
                  </p>
                </div>
              </div>

              {/* Founder Attribution */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">GB</span>
                </div>
                <div>
                  <div className="font-space font-bold text-slate-50 text-lg">Gary Barrios</div>
                  <div className="text-slate-400 text-sm">Founder & Lead Engineer</div>
                  <div className="text-cyan-400 text-xs font-medium mt-1">Alienation to Innovation</div>
                </div>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-amber-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

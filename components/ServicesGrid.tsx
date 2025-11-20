/**
 * ServicesGrid Component - Barrios A2I
 *
 * 4 core service offerings with hover effects
 * Replaces old single-focus features section
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Video, Brain, Globe, Smartphone } from 'lucide-react'

export default function ServicesGrid() {
  const services = [
    {
      icon: Video,
      title: 'Business Commercials',
      description: 'AI-scripted, RAG-powered video commercials delivered in 48-72 hours. From storyboard to final cut.',
      features: ['30-90 sec spots', 'Social cutdowns', 'Voiceover & music', 'Multi-platform export'],
      href: '/contact',
      color: 'cyan',
    },
    {
      icon: Brain,
      title: 'RAG Agents & MCP Servers',
      description: 'Production-grade multi-agent orchestration with LangGraph, RabbitMQ, and OpenTelemetry.',
      features: ['Event-driven', 'Fault-tolerant', 'Horizontal scaling', 'Real-time monitoring'],
      href: '/contact',
      color: 'amber',
    },
    {
      icon: Globe,
      title: 'Premium Websites',
      description: 'Next.js 14 sites with cyber aesthetics, Tailwind, and sub-3s load times. SEO-optimized.',
      features: ['App Router', 'Framer Motion', 'shadcn/ui', 'Vercel deployment'],
      href: '/contact',
      color: 'cyan',
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Turn your idea into a React Native or Next.js PWA with AI integrations built-in.',
      features: ['iOS + Android', 'AI-powered', 'Real-time data', 'Push notifications'],
      href: '/contact',
      color: 'amber',
    },
  ]

  return (
    <section id="services" className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-500 font-medium text-sm uppercase tracking-wider">Our Services</span>
          </div>

          <h2 className="font-space text-5xl font-bold text-slate-50 mb-6">
            End-to-End <span className="bg-gradient-to-r from-cyan-400 to-amber-500 bg-clip-text text-transparent">AI Solutions</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Four core offerings, one premium standard: production-ready, revenue-generating AI products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            const glowColor = service.color === 'cyan' ? 'hover:shadow-[0_10px_40px_rgba(0,217,255,0.3)]' : 'hover:shadow-[0_10px_40px_rgba(255,167,38,0.3)]'
            const borderColor = service.color === 'cyan' ? 'border-cyan-400/30' : 'border-amber-500/30'
            const iconColor = service.color === 'cyan' ? 'text-cyan-400' : 'text-amber-500'
            const bgColor = service.color === 'cyan' ? 'bg-cyan-400/10' : 'bg-amber-500/10'

            return (
              <Link
                key={index}
                href={service.href}
                className={`group relative p-8 bg-slate-900/50 backdrop-blur border ${borderColor} rounded-lg ${glowColor} transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-space font-bold text-slate-50 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-500 text-xs">
                      <div className={`w-1.5 h-1.5 rounded-full ${service.color === 'cyan' ? 'bg-cyan-400' : 'bg-amber-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${service.color === 'cyan' ? 'bg-cyan-400' : 'bg-amber-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg`} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

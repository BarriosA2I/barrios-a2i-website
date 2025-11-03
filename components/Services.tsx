'use client'

import React from 'react'
import { Check, Zap, Rocket, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: 'Architecture Consulting',
      price: 'Custom',
      features: [
        'System architecture audit and recommendations',
        'Agent workflow design with state machines',
        'Message queue topology and event schemas',
        'Observability and monitoring strategy',
      ],
      color: 'cyan',
    },
    {
      icon: Rocket,
      title: 'Turnkey Implementation',
      price: 'Custom',
      features: [
        'Production-ready orchestration server deployment',
        'Agent worker pool with autoscaling',
        'Message queue setup (RabbitMQ/Kafka/Redis)',
        'OpenTelemetry integration with dashboards',
      ],
      highlight: true,
      color: 'amber',
    },
    {
      icon: Building2,
      title: 'Managed Services',
      price: 'Custom',
      features: [
        '24/7 monitoring with on-call support',
        'Monthly performance reports',
        'Security patches and updates',
        'Incident response with RCA',
      ],
      color: 'cyan',
    },
  ]

  return (
    <section id="services" className="relative py-32 bg-slate-950">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
            <span className="text-cyan-400 font-medium text-sm">SERVICE OFFERINGS</span>
          </div>

          <h2 className="font-space text-5xl font-bold text-slate-50 mb-6">
            From Design to <span className="gradient-text">Production</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            const isHighlight = service.highlight
            const bgColor = service.color === 'cyan' ? 'bg-cyan-400/10' : 'bg-amber-500/10'
            const textColor = service.color === 'cyan' ? 'text-cyan-400' : 'text-amber-500'

            return (
              <div
                key={index}
                className={`relative p-8 bg-slate-900/80 backdrop-blur border-2 rounded-lg transition-all duration-500 hover:-translate-y-2 ${
                  isHighlight ? 'border-amber-500 scale-105' : 'border-slate-700'
                }`}
              >
                {isHighlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-950 text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className={`w-16 h-16 ${bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon size={32} className={textColor} />
                </div>

                <h3 className="text-2xl font-space font-bold text-slate-50 mb-4">
                  {service.title}
                </h3>

                <div className="mb-8">
                  <span className={`text-4xl font-space font-bold ${textColor}`}>
                    {service.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check size={20} className={`${textColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className="block w-full py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-950 font-bold text-center rounded hover:scale-105 transition-transform"
                >
                  Get Started
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

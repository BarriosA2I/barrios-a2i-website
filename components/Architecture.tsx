'use client'

import React, { useState } from 'react'
import { Database, Workflow, Shield, Activity, Server, Zap } from 'lucide-react'

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null)

  const layers = [
    {
      id: 'api',
      title: 'API Gateway',
      icon: Server,
      color: 'cyan',
      description: 'REST + GraphQL endpoints with rate limiting and authentication',
      tech: ['FastAPI', 'Kong', 'Auth0'],
    },
    {
      id: 'orchestrator',
      title: 'Agent Orchestrator',
      icon: Workflow,
      color: 'amber',
      description: 'State machine coordinator with LangGraph for complex workflows',
      tech: ['LangGraph', 'Temporal', 'Redis'],
    },
    {
      id: 'queue',
      title: 'Message Queue',
      icon: Zap,
      color: 'cyan',
      description: 'Event-driven async messaging with dead letter queues',
      tech: ['RabbitMQ', 'Kafka', 'SQS'],
    },
    {
      id: 'agents',
      title: 'Agent Workers',
      icon: Shield,
      color: 'amber',
      description: 'Containerized agent pools with autoscaling and circuit breakers',
      tech: ['Docker', 'K8s HPA', 'Celery'],
    },
    {
      id: 'observability',
      title: 'Observability',
      icon: Activity,
      color: 'cyan',
      description: 'Distributed tracing, metrics, and alerting infrastructure',
      tech: ['OpenTelemetry', 'Prometheus', 'Grafana'],
    },
    {
      id: 'storage',
      title: 'Data Layer',
      icon: Database,
      color: 'amber',
      description: 'Vector databases for embeddings, Redis for state, Postgres for logs',
      tech: ['Pinecone', 'Redis', 'PostgreSQL'],
    },
  ]

  return (
    <section id="architecture" className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-500 font-medium text-sm">SYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="font-space text-5xl font-bold text-slate-50 mb-6">
            Event-Driven <span className="gradient-text">Agent Orchestration</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Six-layer architecture designed for fault tolerance, horizontal scaling,
            and production-grade observability.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {layers.map((layer, index) => {
            const Icon = layer.icon
            const isActive = activeLayer === layer.id
            const borderColor = layer.color === 'cyan' ? 'border-cyan-400' : 'border-amber-500'
            const bgColor = layer.color === 'cyan' ? 'bg-cyan-400/10' : 'bg-amber-500/10'
            const textColor = layer.color === 'cyan' ? 'text-cyan-400' : 'text-amber-500'

            return (
              <div key={layer.id} className="relative">
                {index < layers.length - 1 && (
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-4 ${layer.color === 'cyan' ? 'bg-cyan-400/30' : 'bg-amber-500/30'}`} />
                )}

                <button
                  onClick={() => setActiveLayer(isActive ? null : layer.id)}
                  className={`w-full p-6 bg-slate-900/80 backdrop-blur border-2 rounded-lg transition-all duration-300 hover:-translate-y-1 ${
                    isActive ? `${borderColor}` : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon size={24} className={textColor} />
                      </div>

                      <div className="text-left">
                        <h3 className="text-xl font-space font-bold text-slate-50 mb-1">
                          {layer.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {layer.description}
                        </p>
                      </div>
                    </div>

                    <div className={`transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                      <svg width="24" height="24" fill="none" stroke="currentColor" className={textColor}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {isActive && (
                    <div className="mt-6 pt-6 border-t border-slate-700">
                      <div className="flex flex-wrap gap-2">
                        {layer.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 ${bgColor} border ${borderColor}/30 rounded text-sm font-mono ${textColor}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

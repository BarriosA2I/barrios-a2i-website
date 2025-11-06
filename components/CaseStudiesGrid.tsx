"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Zap, Users } from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    company: "Enterprise FinTech",
    industry: "Financial Services",
    title: "Scaling Document Processing to 1M+ Documents/Day",
    challenge:
      "Legacy monolithic AI system couldn't scale beyond 10K documents per day. Manual routing caused bottlenecks.",
    solution:
      "Migrated to Barrios A2I multi-agent architecture with RabbitMQ event bus and horizontal scaling.",
    results: [
      { metric: "100x", label: "Throughput Increase" },
      { metric: "18 days", label: "Migration Time" },
      { metric: "60%", label: "Cost Reduction" },
    ],
    icon: TrendingUp,
    color: "cyan",
  },
  {
    company: "Healthcare AI Startup",
    industry: "Healthcare",
    title: "Building HIPAA-Compliant Multi-Agent Diagnostic System",
    challenge:
      "Needed to orchestrate 15+ specialized medical AI agents while maintaining compliance and audit trails.",
    solution:
      "Implemented Barrios A2I with Postgres audit logs, Jaeger tracing, and circuit breakers for reliability.",
    results: [
      { metric: "99.9%", label: "Uptime SLA" },
      { metric: "15", label: "Agents Orchestrated" },
      { metric: "100%", label: "Compliance Audit Pass" },
    ],
    icon: Zap,
    color: "amber",
  },
  {
    company: "E-Commerce Platform",
    industry: "Retail",
    title: "Real-Time Personalization for 10M+ Monthly Users",
    challenge:
      "Existing recommendation system had 5-second latency. Couldn't handle Black Friday traffic spikes.",
    solution:
      "Deployed Barrios A2I with Redis caching and fast-path routing for sub-100ms response times.",
    results: [
      { metric: "50x", label: "Latency Improvement" },
      { metric: "10M+", label: "Monthly Active Users" },
      { metric: "40%", label: "Conversion Lift" },
    ],
    icon: Users,
    color: "emerald",
  },
];

export default function CaseStudiesGrid() {
  return (
    <section className="relative py-24 bg-[#0B1220]">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Case Studies */}
          <div className="space-y-12">
            {caseStudies.map((study, index) => {
              const IconComponent = study.icon;
              return (
                <motion.article
                  key={study.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                >
                  <div className="p-8 lg:p-12">
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-8">
                      <div
                        className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br from-${study.color}-400 to-${study.color}-600 rounded-xl flex items-center justify-center`}
                      >
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-slate-500">
                            {study.company}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                            {study.industry}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                          {study.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                          Challenge
                        </h4>
                        <p className="text-slate-300 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                          Solution
                        </h4>
                        <p className="text-slate-300 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="border-t border-white/10 pt-8">
                      <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-6">
                        Results
                      </h4>
                      <div className="grid grid-cols-3 gap-6">
                        {study.results.map((result) => (
                          <div key={result.label} className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">
                              {result.metric}
                            </div>
                            <div className="text-sm text-slate-400">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium hover:gap-3 transition-all"
                      >
                        Learn How We Can Help Your Team
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white">
                Ready to Scale Your AI Operations?
              </h3>
              <p className="text-slate-400 max-w-md">
                Book a 30-minute demo to see how Barrios A2I can transform your multi-agent architecture.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                >
                  Schedule Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

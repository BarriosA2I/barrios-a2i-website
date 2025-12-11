"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, Bookmark, Tag } from "lucide-react"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const guides = [
  {
    title: "Building Your First RAG Agent",
    description: "Step-by-step tutorial for creating a retrieval-augmented generation agent with LangGraph and Qdrant.",
    difficulty: "Beginner",
    time: "45 min",
    topics: ["RAG", "LangGraph", "Qdrant"],
    slug: "first-rag-agent"
  },
  {
    title: "Implementing Circuit Breakers",
    description: "Learn how to add fault tolerance to your AI pipelines with circuit breaker patterns.",
    difficulty: "Intermediate",
    time: "30 min",
    topics: ["Resilience", "Patterns", "Python"],
    slug: "circuit-breakers"
  },
  {
    title: "Multi-Agent Orchestration",
    description: "Coordinate multiple specialized AI agents using RabbitMQ and async messaging patterns.",
    difficulty: "Advanced",
    time: "60 min",
    topics: ["Agents", "RabbitMQ", "Async"],
    slug: "multi-agent-orchestration"
  },
  {
    title: "OpenTelemetry Setup",
    description: "Complete observability setup with distributed tracing, metrics, and logging.",
    difficulty: "Intermediate",
    time: "40 min",
    topics: ["Observability", "Jaeger", "Prometheus"],
    slug: "opentelemetry-setup"
  },
  {
    title: "Cost-Optimized Model Routing",
    description: "Route queries to the most cost-effective LLM based on complexity analysis.",
    difficulty: "Advanced",
    time: "50 min",
    topics: ["Optimization", "LLMs", "Routing"],
    slug: "model-routing"
  },
  {
    title: "Deploying to Production",
    description: "Best practices for deploying AI systems with Docker, Kubernetes, and proper health checks.",
    difficulty: "Intermediate",
    time: "35 min",
    topics: ["DevOps", "Docker", "K8s"],
    slug: "production-deployment"
  }
]

const difficultyColors: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "bg-green-500/20", text: "text-green-400" },
  Intermediate: { bg: "bg-cyber-gold/20", text: "text-cyber-gold" },
  Advanced: { bg: "bg-red-500/20", text: "text-red-400" }
}

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-navy-deep">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Implementation <span className="gradient-text">Guides</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Hands-on tutorials to build production-ready AI systems from scratch.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {["All Levels", "Beginner", "Intermediate", "Advanced"].map((level, index) => (
              <button
                key={level}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  index === 0
                    ? "bg-cyber-cyan text-navy-deep"
                    : "glass text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/30"
                }`}
              >
                {level}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => {
              const difficulty = difficultyColors[guide.difficulty]

              return (
                <motion.article
                  key={guide.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-2xl p-6 hover:border-cyber-cyan/30 transition-all group flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${difficulty.bg} ${difficulty.text}`}
                    >
                      {guide.difficulty}
                    </span>
                    <button className="text-slate-400 hover:text-cyber-cyan transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 flex-grow">
                    {guide.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-slate-400 text-xs rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{guide.time}</span>
                    </div>

                    <Link
                      href={`/guides/${guide.slug}`}
                      className="inline-flex items-center gap-1 text-cyber-cyan text-sm font-medium hover:gap-2 transition-all"
                    >
                      Start Guide
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 lg:p-12 text-center border-glow-cyan"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Our team can help you build production-grade AI infrastructure tailored to your needs.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyber-cyan text-navy-deep font-bold rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const featuredPost = {
  title: "Building Production-Ready RAG Systems with LangGraph",
  excerpt: "A comprehensive guide to architecting retrieval-augmented generation systems that scale. Learn the patterns we use to build 99.9% uptime AI infrastructure.",
  author: "Gary Barrios",
  date: "December 5, 2024",
  readTime: "12 min read",
  category: "Architecture",
  slug: "building-production-rag-systems"
}

const blogPosts = [
  {
    title: "Circuit Breakers in AI Systems",
    excerpt: "How to implement fault-tolerant AI pipelines that gracefully degrade under load.",
    author: "Gary Barrios",
    date: "December 2, 2024",
    readTime: "8 min read",
    category: "Infrastructure",
    slug: "circuit-breakers-ai-systems"
  },
  {
    title: "OpenTelemetry for LLM Observability",
    excerpt: "Complete tracing setup for multi-agent systems with Jaeger and Prometheus.",
    author: "Gary Barrios",
    date: "November 28, 2024",
    readTime: "10 min read",
    category: "Observability",
    slug: "opentelemetry-llm-observability"
  },
  {
    title: "Vector Database Showdown",
    excerpt: "Comparing Qdrant, Pinecone, and Weaviate for production workloads.",
    author: "Gary Barrios",
    date: "November 24, 2024",
    readTime: "15 min read",
    category: "Infrastructure",
    slug: "vector-database-showdown"
  },
  {
    title: "Multi-Agent Orchestration Patterns",
    excerpt: "Design patterns for coordinating multiple AI agents in complex workflows.",
    author: "Gary Barrios",
    date: "November 20, 2024",
    readTime: "11 min read",
    category: "Architecture",
    slug: "multi-agent-orchestration"
  },
  {
    title: "Cost Optimization with Model Routing",
    excerpt: "How to reduce LLM costs by 70% with intelligent request routing.",
    author: "Gary Barrios",
    date: "November 15, 2024",
    readTime: "9 min read",
    category: "Optimization",
    slug: "cost-optimization-model-routing"
  },
  {
    title: "Building AI Chatbots That Don't Suck",
    excerpt: "The engineering behind conversational AI that actually helps users.",
    author: "Gary Barrios",
    date: "November 10, 2024",
    readTime: "7 min read",
    category: "Product",
    slug: "building-ai-chatbots"
  }
]

const categories = ["All", "Architecture", "Infrastructure", "Observability", "Optimization", "Product"]

export default function BlogPage() {
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
              Engineering <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Deep dives into AI infrastructure, automation patterns, and production engineering.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  index === 0
                    ? "bg-cyber-cyan text-navy-deep"
                    : "glass text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/30"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 lg:p-12 border-glow-cyan"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan text-sm font-medium rounded-full">
                Featured
              </span>
              <span className="px-3 py-1 bg-cyber-gold/20 text-cyber-gold text-sm font-medium rounded-full">
                {featuredPost.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              {featuredPost.title}
            </h2>

            <p className="text-lg text-slate-300 mb-6 max-w-3xl">
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{featuredPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{featuredPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-cyber-cyan text-navy-deep font-bold rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
            >
              Read Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.article>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-xl p-6 hover:border-cyber-cyan/30 transition-all group"
              >
                <span className="inline-block px-3 py-1 bg-cyber-cyan/10 text-cyber-cyan text-xs font-medium rounded-full mb-4">
                  {post.category}
                </span>

                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-cyber-cyan text-sm font-medium hover:gap-2 transition-all"
                >
                  Read more
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Get notified when we publish new articles on AI infrastructure and automation.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyber-cyan/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cyber-cyan text-navy-deep font-bold rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

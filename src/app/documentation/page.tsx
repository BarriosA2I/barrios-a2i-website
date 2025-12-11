"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BookOpen, Code, Layers, Lightbulb, Terminal } from "lucide-react"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const docCategories = [
  {
    title: "Getting Started",
    description: "Quick setup guides and first steps with our AI infrastructure.",
    icon: Lightbulb,
    links: [
      { label: "Introduction", href: "/docs/introduction" },
      { label: "Quick Start", href: "/docs/quick-start" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Configuration", href: "/docs/configuration" }
    ],
    color: "cyan"
  },
  {
    title: "API Reference",
    description: "Complete API documentation for all endpoints and services.",
    icon: Code,
    links: [
      { label: "Authentication", href: "/docs/api/auth" },
      { label: "Query Endpoints", href: "/docs/api/query" },
      { label: "Agent APIs", href: "/docs/api/agents" },
      { label: "Webhooks", href: "/docs/api/webhooks" }
    ],
    color: "gold"
  },
  {
    title: "Architecture",
    description: "Deep dives into system design and infrastructure patterns.",
    icon: Layers,
    links: [
      { label: "System Overview", href: "/docs/architecture/overview" },
      { label: "Multi-Agent Design", href: "/docs/architecture/agents" },
      { label: "Data Flow", href: "/docs/architecture/data-flow" },
      { label: "Scaling Guide", href: "/docs/architecture/scaling" }
    ],
    color: "cyan"
  },
  {
    title: "Examples",
    description: "Real-world implementation examples and code samples.",
    icon: BookOpen,
    links: [
      { label: "RAG Pipeline", href: "/docs/examples/rag" },
      { label: "Chatbot Integration", href: "/docs/examples/chatbot" },
      { label: "Automation Workflows", href: "/docs/examples/automation" },
      { label: "Custom Agents", href: "/docs/examples/custom-agents" }
    ],
    color: "gold"
  }
]

const quickStartCode = `# Install the CLI
npm install -g @barriosa2i/cli

# Initialize your project
barrios init my-project

# Configure your API key
barrios config set API_KEY=your_key

# Deploy your first agent
barrios deploy --agent=assistant`

export default function DocumentationPage() {
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
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale AI-powered systems.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyber-cyan/50 pr-12"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/10 text-slate-400 text-xs rounded">
                ⌘K
              </kbd>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            {docCategories.map((category, index) => {
              const Icon = category.icon
              const isCyan = category.color === "cyan"

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-2xl p-8 hover:border-cyber-cyan/30 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCyan ? "bg-cyber-cyan/20" : "bg-cyber-gold/20"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isCyan ? "text-cyber-cyan" : "text-cyber-gold"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {category.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between text-slate-300 hover:text-cyber-cyan transition-colors group/link"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 lg:p-12 border-glow-cyan"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cyber-cyan/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyber-cyan" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white">
                Quick Start
              </h2>
            </div>

            <p className="text-slate-300 mb-6">
              Get up and running in under 5 minutes with our CLI tool.
            </p>

            {/* Code Block */}
            <div className="bg-black/50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-slate-300">
                {quickStartCode.split('\n').map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    {line.startsWith('#') ? (
                      <span className="text-slate-500">{line}</span>
                    ) : line.includes('barrios') ? (
                      <>
                        <span className="text-cyber-cyan">$</span>{' '}
                        <span className="text-white">{line}</span>
                      </>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </pre>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/docs/quick-start"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cyan text-navy-deep font-bold rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
              >
                Full Quick Start Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs/api"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:border-cyber-cyan/50 transition-all duration-300"
              >
                API Reference
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

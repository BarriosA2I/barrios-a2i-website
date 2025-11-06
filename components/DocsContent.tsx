"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Zap, Rocket, Server, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const docSections = [
  {
    icon: Rocket,
    title: "Quick Start",
    description: "Get up and running with Barrios A2I in under 10 minutes.",
    topics: [
      "Installation",
      "First Agent Setup",
      "Hello World Example",
      "Environment Configuration",
    ],
    link: "/docs/quickstart",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "Core Concepts",
    description: "Understand the architecture and key concepts behind multi-agent orchestration.",
    topics: [
      "Agent Communication",
      "Event Bus Patterns",
      "Query Routing",
      "Circuit Breakers",
    ],
    link: "/docs/concepts",
    color: "amber",
  },
  {
    icon: Server,
    title: "API Reference",
    description: "Complete API documentation for all endpoints and services.",
    topics: [
      "REST API Endpoints",
      "WebSocket Events",
      "Agent SDK",
      "Configuration Options",
    ],
    link: "/docs/api",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Integration Guides",
    description: "Step-by-step guides for integrating with popular frameworks and tools.",
    topics: [
      "Docker & Kubernetes",
      "RabbitMQ Setup",
      "Redis Configuration",
      "Qdrant Vector Store",
    ],
    link: "/docs/integrations",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Production Best Practices",
    description: "Learn how to deploy, monitor, and scale your agents in production.",
    topics: [
      "Horizontal Scaling",
      "Observability Setup",
      "Security Guidelines",
      "Performance Tuning",
    ],
    link: "/docs/production",
    color: "blue",
  },
  {
    icon: BookOpen,
    title: "Examples & Tutorials",
    description: "Real-world examples and step-by-step tutorials.",
    topics: [
      "Building a Chatbot",
      "Document Processing Pipeline",
      "Real-time Analytics",
      "Custom Agent Development",
    ],
    link: "/docs/examples",
    color: "rose",
  },
];

export default function DocsContent() {
  return (
    <section className="relative py-24 bg-[#0B1220]">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto">
          {/* Getting Started Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Browse by Category
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Find guides, tutorials, and references to help you build with Barrios A2I.
              </p>
            </motion.div>

            {/* Doc Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docSections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Link href={section.link}>
                      <div className="group h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer">
                        {/* Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <IconComponent size={24} className="text-white" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                          {section.description}
                        </p>

                        {/* Topics List */}
                        <ul className="space-y-2 mb-4">
                          {section.topics.map((topic) => (
                            <li
                              key={topic}
                              className="text-sm text-slate-500 flex items-center gap-2"
                            >
                              <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                              {topic}
                            </li>
                          ))}
                        </ul>

                        {/* Link */}
                        <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Help?
                </h3>
                <p className="text-slate-400 mb-6">
                  Our team is here to support your integration and deployment journey.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="block text-cyan-400 hover:text-amber-400 transition-colors"
                  >
                    → Schedule a Technical Consultation
                  </Link>
                  <Link
                    href="/blog"
                    className="block text-cyan-400 hover:text-amber-400 transition-colors"
                  >
                    → Read Technical Blog Posts
                  </Link>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-cyan-400 hover:text-amber-400 transition-colors"
                  >
                    → View on GitHub
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/docs/api"
                    className="block px-4 py-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                  >
                    <div className="font-semibold text-white mb-1">API Reference</div>
                    <div className="text-sm text-slate-400">Complete REST API documentation</div>
                  </Link>
                  <Link
                    href="/docs/quickstart"
                    className="block px-4 py-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                  >
                    <div className="font-semibold text-white mb-1">Quick Start Guide</div>
                    <div className="text-sm text-slate-400">Get running in 10 minutes</div>
                  </Link>
                  <Link
                    href="/docs/examples"
                    className="block px-4 py-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                  >
                    <div className="font-semibold text-white mb-1">Code Examples</div>
                    <div className="text-sm text-slate-400">Ready-to-use implementations</div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white">
                Full Documentation Coming Soon
              </h3>
              <p className="text-slate-400 max-w-md">
                We&apos;re actively building comprehensive documentation. Contact us for early access and technical support.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                >
                  Request Early Access
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

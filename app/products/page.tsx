import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Monitor, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products | Barrios A2I | AI Orchestration & Multi-Agent Systems',
  description: 'Explore Barrios A2I\'s enterprise-grade products including DYAD Orchestrator, Agent Framework, and Monitoring Suite for scaling AI agents with confidence.',
  openGraph: {
    title: 'Products | Barrios A2I | AI Orchestration & Multi-Agent Systems',
    description: 'Discover Barrios A2I\'s innovative products designed for robust AI orchestration, fault tolerance, observability, and horizontal scaling of multi-agent systems.',
    url: 'https://barrios-a2i-website.vercel.app/products',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Animation variants for staggered appearance of product cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function ProductsPage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Products Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
          {/* Animated background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
              animate={{
                x: [0, 80, 0],
                y: [0, -40, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 40, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
            />
          </div>

          <div className="container mx-auto px-5 py-20 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                Products & Platforms
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Empower your AI initiatives with Barrios A2I's suite of specialized tools, engineered for performance, scalability, and robust orchestration in production environments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all mx-auto"
                >
                  Request a Demo
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Product Showcase Grid */}
        <section className="py-20 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] relative z-10">
          <div className="container mx-auto px-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
            >
              Our Core Offerings
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {/* Product Card 1: DYAD Orchestrator */}
              <motion.div
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle gradient border effect on hover */}
                <div className="absolute inset-0 border border-transparent rounded-xl group-hover:bg-gradient-to-br group-hover:from-cyan-400/20 group-hover:to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center gap-4 mb-6">
                  <Cpu size={36} className="text-cyan-400" />
                  <h3 className="text-2xl font-semibold text-white">DYAD Orchestrator</h3>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  The heart of our system. DYAD provides enterprise-grade orchestration for complex, distributed multi-agent AI systems.
                </p>
                <ul className="space-y-3 mb-8 text-slate-200">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Fault Tolerance & Self-Healing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Horizontal Scalability (10,000+ Agents)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Dynamic Agent Routing & Load Balancing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Integrates with Existing Systems</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-md shadow-md hover:shadow-cyan-400/40 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Product Card 2: Agent Framework */}
              <motion.div
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-amber-400/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 border border-transparent rounded-xl group-hover:bg-gradient-to-br group-hover:from-amber-400/20 group-hover:to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center gap-4 mb-6">
                  <Layers size={36} className="text-amber-400" />
                  <h3 className="text-2xl font-semibold text-white">Agent Framework</h3>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  A robust framework for building and deploying your custom AI agents. Focus on logic, we handle the boilerplate.
                </p>
                <ul className="space-y-3 mb-8 text-slate-200">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Standardized Agent Interface</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Built-in Observability Hooks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Pre-built Connectors (LLMs, APIs)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Python & JavaScript SDKs</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-cyan-500 text-slate-900 font-semibold rounded-md shadow-md hover:shadow-amber-400/40 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Product Card 3: Monitoring Suite */}
              <motion.div
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 border border-transparent rounded-xl group-hover:bg-gradient-to-br group-hover:from-emerald-400/20 group-hover:to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center gap-4 mb-6">
                  <Monitor size={36} className="text-emerald-400" />
                  <h3 className="text-2xl font-semibold text-white">Monitoring Suite</h3>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Gain deep insights into your multi-agent systems with real-time observability, logging, and performance metrics.
                </p>
                <ul className="space-y-3 mb-8 text-slate-200">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Distributed Tracing (OpenTelemetry)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Real-time Agent Health Dashboards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Performance Bottleneck Identification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Customizable Alerting & Reporting</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-900 font-semibold rounded-md shadow-md hover:shadow-emerald-400/40 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action for Pricing/Consultation */}
        <section className="py-20 bg-gradient-to-t from-[#0B1220] to-[#0E1626] relative z-10">
          <div className="container mx-auto px-5 text-center max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Ready to Scale Your AI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Whether you're just starting or managing complex AI deployments, Barrios A2I has the solutions to accelerate your success.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                >
                  Book a Consultation
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>
              <Link href="/#features"> {/* Link to the Features section on the main page, or another relevant section */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all"
                >
                  Explore Features
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
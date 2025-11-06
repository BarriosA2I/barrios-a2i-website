import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Zap, Puzzle, TrendingUp, Cpu, Network, ShieldCheck, Telescope } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Barrios A2I | AI Orchestration Solutions',
  description: 'Explore Barrios A2I\'s enterprise-grade solutions for multi-agent systems, event-driven architecture, and advanced observability to scale your AI operations.',
  openGraph: {
    title: 'Barrios A2I | AI Orchestration Solutions',
    description: 'Empower your AI agents with Barrios A2I: robust orchestration, fault tolerance, and observability for complex, distributed systems.',
    url: 'https://barrios-a2i-website.vercel.app/solutions', // Adjust URL as needed
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SolutionsPage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Solutions Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
          {/* Animated background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
            />
          </div>

          <div className="container mx-auto px-5 py-20 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                {...fadeIn}
                transition={{ delay: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-100 mb-8"
              >
                <Box size={14} className="text-cyan-400" />
                Scalable AI for the Enterprise
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                {...fadeIn}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                AI Orchestration
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                  Solutions
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
              >
                Empowering enterprises to build, deploy, and scale multi-agent systems
                with unmatched reliability, performance, and insight.
              </motion.p>

              {/* CTAs */}
              <motion.div
                {...fadeIn}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                  >
                    Book a Demo
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>
                <Link href="#solutions-grid">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all"
                  >
                    <TrendingUp size={18} />
                    View Capabilities
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Solutions Grid Section */}
        <section id="solutions-grid" className="relative py-24 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
          <div className="container mx-auto px-5 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                {...fadeIn}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Our Core{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                  Capabilities
                </span>
              </motion.h2>
              <motion.p
                {...fadeIn}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-300 max-w-2xl mx-auto"
              >
                Barrios A2I provides a comprehensive suite of tools to manage the complexity of
                modern AI deployments, ensuring performance, reliability, and insight.
              </motion.p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Card 1: Multi-Agent Systems */}
              <motion.div
                variants={fadeIn}
                className="relative p-8 bg-gradient-to-br from-[#0E1626] to-[#0B1220] rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg"
              >
                <div className="p-3 bg-cyan-400/10 rounded-full inline-flex mb-6 border border-cyan-400/20">
                  <Puzzle size={24} className="text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Multi-Agent Systems</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Design, deploy, and manage complex AI ecosystems where multiple agents collaborate to achieve sophisticated goals.
                  Ensure seamless interaction and robust task execution.
                </p>
                <Link href="/contact"> {/* Placeholder link */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:text-amber-400 transition-colors"
                  >
                    Learn More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(0,217,255,0.15), transparent 70%)' }} />
              </motion.div>

              {/* Card 2: Event-Driven Architecture */}
              <motion.div
                variants={fadeIn}
                className="relative p-8 bg-gradient-to-br from-[#0E1626] to-[#0B1220] rounded-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 group shadow-lg"
              >
                <div className="p-3 bg-amber-400/10 rounded-full inline-flex mb-6 border border-amber-400/20">
                  <Network size={24} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Event-Driven Architecture</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Leverage asynchronous messaging with RabbitMQ and Redis for high-throughput, low-latency communication between agents.
                  Build resilient and reactive AI systems.
                </p>
                <Link href="/contact"> {/* Placeholder link */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-amber-400 font-semibold group-hover:text-cyan-400 transition-colors"
                  >
                    Learn More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundImage: 'radial-gradient(circle at 90% 90%, rgba(255,167,38,0.15), transparent 70%)' }} />
              </motion.div>

              {/* Card 3: Advanced Observability */}
              <motion.div
                variants={fadeIn}
                className="relative p-8 bg-gradient-to-br from-[#0E1626] to-[#0B1220] rounded-xl border border-white/10 hover:border-emerald-400/50 transition-all duration-300 group shadow-lg"
              >
                <div className="p-3 bg-emerald-400/10 rounded-full inline-flex mb-6 border border-emerald-400/20">
                  <Telescope size={24} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Advanced Observability</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Gain deep insights into your AI operations with OpenTelemetry. Monitor agent behavior, track workflows,
                  and troubleshoot issues across distributed systems.
                </p>
                <Link href="/contact"> {/* Placeholder link */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:text-cyan-400 transition-colors"
                  >
                    Learn More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(52,211,153,0.15), transparent 70%)' }} />
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-24 bg-gradient-to-t from-[#0B1220] via-[#0E1626] to-[#0B1220] text-center">
          <div className="container mx-auto px-5 relative z-10">
            <motion.h2
              {...fadeIn}
              className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto"
            >
              Ready to Orchestrate Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                AI Future
              </span>
              ?
            </motion.h2>
            <motion.p
              {...fadeIn}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Connect with our experts to discover how Barrios A2I can seamlessly integrate
              into your existing infrastructure and scale your AI initiatives.
            </motion.p>
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-xl hover:shadow-cyan-400/50 transition-all text-lg"
                >
                  Book Your Discovery Call
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
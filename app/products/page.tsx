import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Layers3, Rocket, BarChart2, ArrowRight, Lightbulb, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barrios A2I | Products & Platforms',
  description: 'Explore Barrios A2I\'s core products: DYAD Orchestrator, Agent Framework, and Monitoring Suite. Powerful tools for enterprise AI orchestration.',
  openGraph: {
    title: 'Barrios A2I | Products & Platforms',
    description: 'Explore Barrios A2I\'s core products for scaling AI agents with confidence. From orchestration to monitoring.',
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

// Framer Motion variants for consistent animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductsPage() {
  return (
    <div className="relative bg-[var(--ink)] text-slate-200">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] py-20 md:py-0">
          {/* Animated background gradient orbs (consistent with main Hero) */}
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
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-100 mb-8"
              >
                <Lightbulb size={14} className="text-emerald-400" />
                Innovating AI Infrastructure
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                Our{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
                  Products & Platforms
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
              >
                Built for the next generation of AI, our suite of tools provides everything you need to develop, deploy, and manage distributed multi-agent systems at scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                  >
                    Get a Demo
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Product Showcase Grid */}
        <section className="relative py-20 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] overflow-hidden">
          <div className="container mx-auto px-5 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            >
              Our Core Offerings
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Product Card: DYAD Orchestrator */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
                variants={itemVariants}
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <Layers3 size={48} className="text-cyan-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3">DYAD Orchestrator</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Enterprise-grade orchestration for distributed multi-agent systems. Ensure fault tolerance, observability, and horizontal scaling.
                  </p>
                  <ul className="list-disc list-inside text-slate-400 space-y-2 mb-8 text-sm">
                    <li>Decentralized agent coordination</li>
                    <li>Built-in fault recovery & redundancy</li>
                    <li>Real-time performance monitoring</li>
                    <li>Scalable across any cloud infrastructure</li>
                  </ul>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold group-hover:underline transition-colors">
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Product Card: Agent Framework */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
                variants={itemVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <Rocket size={48} className="text-amber-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3">Agent Framework</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    A robust framework for rapidly developing and deploying custom AI agents compatible with DYAD Orchestrator.
                  </p>
                  <ul className="list-disc list-inside text-slate-400 space-y-2 mb-8 text-sm">
                    <li>Simplified agent development</li>
                    <li>Seamless integration with existing codebases</li>
                    <li>Event-driven architecture support</li>
                    <li>Extensible for various AI models</li>
                  </ul>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold group-hover:underline transition-colors">
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Product Card: Monitoring Suite */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
                variants={itemVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <BarChart2 size={48} className="text-emerald-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3">Monitoring Suite</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Comprehensive observability for your multi-agent systems, providing deep insights into performance and behavior.
                  </p>
                  <ul className="list-disc list-inside text-slate-400 space-y-2 mb-8 text-sm">
                    <li>Real-time agent health dashboards</li>
                    <li>Distributed tracing with OpenTelemetry</li>
                    <li>Customizable alerts and notifications</li>
                    <li>Performance bottleneck identification</li>
                  </ul>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold group-hover:underline transition-colors">
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Get Started / CTA Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
          <div className="container mx-auto px-5 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Orchestrate Your AI Future?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Connect with our experts to find out how Barrios A2I can transform your AI deployments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all text-lg mx-auto"
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
  );
}
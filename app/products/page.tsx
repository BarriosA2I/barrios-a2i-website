import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Settings2, MonitorDot, Handshake } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Barrios A2I | Products & Platforms',
  description: 'Explore Barrios A2I\'s suite of enterprise-grade AI orchestration products: DYAD Orchestrator, Agent Framework, and Monitoring Suite. Build, deploy, and scale multi-agent systems with confidence.',
  openGraph: {
    title: 'Barrios A2I | Products & Platforms',
    description: 'Explore Barrios A2I\'s suite of enterprise-grade AI orchestration products.',
    url: 'https://barrios-a2i-website.vercel.app/products', // Assuming a /products path
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png', // Reusing the existing OG image
        width: 1200,
        height: 630,
      },
    ],
  },
}

const productData = [
  {
    icon: Settings2,
    title: 'DYAD Orchestrator',
    description: 'The core engine for distributed multi-agent systems. Ensure fault tolerance, dynamic scaling, and seamless integration with existing infrastructure.',
    features: [
      'Declarative workflow definitions',
      'Intelligent task scheduling',
      'Horizontal scalability',
      'Robust error handling & recovery',
    ],
    link: '#dyad-orchestrator',
    primaryColor: 'cyan-400',
    secondaryColor: 'cyan-700',
  },
  {
    icon: Brain,
    title: 'Agent Framework',
    description: 'Accelerate agent development with a flexible, modular framework. Build custom AI agents or integrate existing models with ease.',
    features: [
      'Standardized agent interfaces',
      'Pre-built common agent patterns',
      'Language agnostic integration',
      'Seamless orchestration compatibility',
    ],
    link: '#agent-framework',
    primaryColor: 'amber-400',
    secondaryColor: 'amber-700',
  },
  {
    icon: MonitorDot,
    title: 'Monitoring Suite',
    description: 'Gain real-time insights into your multi-agent deployments. Comprehensive observability with OpenTelemetry and custom dashboards.',
    features: [
      'End-to-end tracing & logging',
      'Real-time performance metrics',
      'Anomaly detection',
      'Customizable dashboards & alerts',
    ],
    link: '#monitoring-suite',
    primaryColor: 'emerald-400',
    secondaryColor: 'emerald-700',
  },
]

export default function ProductsPage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-100 mb-8"
              >
                <Handshake size={14} className="text-cyan-400" />
                Integrated AI Platforms
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                Products &{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                  Platforms
                </span>
                <br />
                for Enterprise AI
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
              >
                Barrios A2I offers a comprehensive suite of tools designed to streamline the development, deployment, and management of production-grade multi-agent AI systems.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <Link href="#product-showcase">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                  >
                    Explore Products
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all"
                  >
                    Contact Sales
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Product Showcase Grid */}
        <section id="product-showcase" className="py-20 md:py-32 bg-[var(--ink)] relative z-20">
          <div className="container mx-auto px-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-center text-white mb-16 leading-tight"
            >
              Our Core <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Offerings</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {productData.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col items-center text-center hover:border-${product.primaryColor}/50 transition-all shadow-lg`}
                >
                  <div
                    className={`p-4 rounded-full bg-${product.primaryColor}/10 mb-6`}
                  >
                    <product.icon size={36} className={`text-${product.primaryColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <ul className="text-left text-slate-400 text-sm space-y-2 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight size={16} className={`mr-2 flex-shrink-0 text-${product.primaryColor}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={product.link} className="mt-auto w-full">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center justify-center gap-2 px-6 py-3 w-full bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-${product.primaryColor}/50 transition-all`}
                    >
                      Learn More
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action for Pricing */}
        <section className="py-20 md:py-32 bg-[var(--ink)] relative z-20">
          <div className="container mx-auto px-5 text-center max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Transform</span> Your AI Operations?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 mb-10"
            >
              Our enterprise solutions are tailored to your unique needs. Contact us to discuss custom pricing, integration, and deployment options.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all text-lg"
                >
                  Get a Custom Quote
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
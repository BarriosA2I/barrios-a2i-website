import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Bot, Workflow, Eye, Bolt, LayoutGrid, CheckCircle2 } from 'lucide-react'

// Assuming Space Grotesk is already set globally in your tailwind config or layout.tsx
// If not, you'd import it here and apply it.

export const metadata: Metadata = {
  title: 'Barrios A2I | AI Orchestration Solutions',
  description: 'Explore Barrios A2I solutions for multi-agent systems, event-driven architectures, and advanced observability to scale your AI operations.',
  openGraph: {
    title: 'Barrios A2I | AI Orchestration Solutions',
    description: 'Discover how Barrios A2I empowers enterprise AI with robust orchestration for distributed multi-agent systems.',
    url: 'https://barrios-a2i-website.vercel.app/solutions', // Update with actual URL
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png', // Re-use existing OG image
        width: 1200,
        height: 630,
      },
    ],
  },
}

// Client component for the animated hero section
function SolutionsHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] py-20">
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-100 mb-8"
          >
            <LayoutGrid size={14} className="text-cyan-400" />
            Empowering Your AI Landscape
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            AI Orchestration{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
              Solutions
            </span>
            <br />
            For Production Scale
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            From complex multi-agent systems to robust event-driven architectures and deep observability, Barrios A2I offers tailored solutions for your enterprise AI challenges.
          </motion.p>

          {/* CTA */}
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
                Discuss Your Project
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
  )
}

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Bot,
      title: 'Multi-Agent Systems (MAS)',
      description: 'Design, deploy, and manage complex ecosystems of interacting AI agents with built-in fault tolerance and dynamic scaling.',
      link: '#multi-agent',
    },
    {
      icon: Workflow,
      title: 'Event-Driven Architectures',
      description: 'Orchestrate distributed AI workflows with Kafka, RabbitMQ, and Redis. Ensure real-time processing and seamless data flow.',
      link: '#event-driven',
    },
    {
      icon: Eye,
      title: 'Deep Observability & Monitoring',
      description: 'Gain unparalleled insights into your AI systems with OpenTelemetry integration for tracing, metrics, and logs across agents.',
      link: '#observability',
    },
    {
      icon: Bolt,
      title: 'Real-time Decision Engines',
      description: 'Build and deploy high-throughput decision engines for instantaneous AI-driven actions and dynamic response systems.',
      link: '#real-time',
    },
    {
      icon: CheckCircle2,
      title: 'Fault Tolerance & Resilience',
      description: 'Ensure continuous operation with automated retry mechanisms, circuit breakers, and distributed state management.',
      link: '#fault-tolerance',
    },
    {
      icon: LayoutGrid,
      title: 'Scalable Microservices for AI',
      description: 'Empower your AI with a robust microservices infrastructure, designed for horizontal scaling and independent deployment.',
      link: '#microservices',
    },
  ]

  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Solutions Hero */}
        <SolutionsHero />

        {/* Solutions Grid Section */}
        <section className="py-24 bg-gradient-to-b from-[#0B1220] to-[#0A1628] relative z-10">
          <div className="container mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Scalable Solutions for
                <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                  {" "}Modern AI
                </span>
              </h2>
              <p className="text-lg text-slate-300">
                We provide the critical infrastructure and expertise to elevate your AI initiatives from experimental to enterprise-grade production.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.1 * index }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col items-start text-left hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-6">
                    <solution.icon size={28} className="text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-slate-400 mb-6 flex-grow">
                    {solution.description}
                  </p>
                  <Link href={solution.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all text-sm"
                    >
                      Learn More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[var(--ink)] relative z-10">
          <div className="container mx-auto px-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Accelerate Your AI Initiatives?
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                Let&apos;s discuss how Barrios A2I can integrate seamlessly with your existing systems and empower your next generation of AI applications.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                  >
                    Book a Free Consultation
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>

                <Link href="#solutions"> {/* Link to top of solutions grid */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-amber-400/50 transition-all"
                  >
                    Learn More About Our Approach
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
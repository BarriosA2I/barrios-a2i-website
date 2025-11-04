import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Barrios A2I | Customer Success Stories',
  description: 'Explore how Barrios A2I helps enterprises scale AI agents, achieve fault tolerance, and gain observability. Read our customer success stories and real-world impact.',
  openGraph: {
    title: 'Barrios A2I | Customer Success Stories',
    description: 'Explore our customer success stories and see the real-world impact of Barrios A2I.',
    url: 'https://barrios-a2i-website.vercel.app/case-studies',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png', // Reusing existing OG image for simplicity, or provide a specific one
        width: 1200,
        height: 630,
      },
    ],
  },
}

// Placeholder data for case studies
const caseStudies = [
  {
    id: 1,
    company: 'Quantum Dynamics',
    logo: '/logos/quantum-dynamics-logo.svg', // Ensure this path exists in your public folder
    headline: 'Accelerating AI Model Deployment by 200%',
    quote: "Barrios A2I transformed our AI operations. We're deploying models twice as fast with unprecedented reliability.",
    metric1: { value: '200%', label: 'Faster Deployments' },
    metric2: { value: '99.9%', label: 'Uptime Achieved' },
    link: '/case-studies/quantum-dynamics',
  },
  {
    id: 2,
    company: 'Aether Innovations',
    logo: '/logos/aether-innovations-logo.svg', // Ensure this path exists in your public folder
    headline: 'Scaling Multi-Agent Systems to 10,000 Concurrent Agents',
    quote: "The ability to scale without rewriting our core logic was a game-changer. Barrios A2I delivered beyond expectations.",
    metric1: { value: '10,000+', label: 'Agents Orchestrated' },
    metric2: { value: '50%', label: 'Cost Reduction' },
    link: '/case-studies/aether-innovations',
  },
  {
    id: 3,
    company: 'Synaptic Solutions',
    logo: '/logos/synaptic-solutions-logo.svg', // Ensure this path exists in your public folder
    headline: 'Enhanced Observability and Fault Tolerance for Critical AI',
    quote: "Our engineers now have full visibility and confidence in our distributed AI systems. Outstanding product!",
    metric1: { value: '100%', label: 'Traceability' },
    metric2: { value: 'Zero', label: 'Production Downtime' },
    link: '/case-studies/synaptic-solutions',
  },
  {
    id: 4,
    company: 'Neural Nexus',
    logo: '/logos/neural-nexus-logo.svg', // Ensure this path exists in your public folder
    headline: 'Seamless Integration into Existing Infrastructure',
    quote: "Barrios A2I's plug-and-play approach saved us months of development. Truly remarkable.",
    metric1: { value: '18 Days', label: 'Avg Deployment Time' },
    metric2: { value: '3x', label: 'Throughput Increase' },
    link: '/case-studies/neural-nexus',
  },
  {
    id: 5,
    company: 'Cognitive Core',
    logo: '/logos/cognitive-core-logo.svg', // Ensure this path exists in your public folder
    headline: 'Empowering Complex Decision-Making AI Agents',
    quote: "With Barrios A2I, our multi-agent systems are more intelligent and robust than ever before.",
    metric1: { value: '$100M+', label: 'ARR Orchestrated' },
    metric2: { value: '95%', label: 'Decision Accuracy' },
    link: '/case-studies/cognitive-core',
  },
  {
    id: 6,
    company: 'InnovaTech',
    logo: '/logos/innovatech-logo.svg', // Ensure this path exists in your public folder
    headline: 'Future-Proofing AI Infrastructure with Advanced Orchestration',
    quote: "We're now equipped for the next generation of AI. Barrios A2I is a critical part of our strategy.",
    metric1: { value: '10+', label: 'Enterprise Deployments' },
    metric2: { value: 'Highly Scalable', label: 'Infrastructure' },
    link: '/case-studies/innovatech',
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Case Studies Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
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

          <div className="container mx-auto px-5 py-20 relative z-10 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-100 mb-8"
            >
              <Star size={14} className="text-amber-400" />
              Real Impact, Proven Results
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Customer{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              See how industry leaders are leveraging Barrios A2I to power their next-generation AI deployments with confidence and scale.
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
                  Book a Demo
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

        {/* Case Studies Grid Section */}
        <section className="py-20 bg-[var(--ink)] relative z-10">
          <div className="container mx-auto px-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            >
              Driving Innovation Across Industries
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#0e1626] border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-cyan-400/50 transition-colors"
                >
                  <div>
                    {/* Company Logo */}
                    {study.logo && (
                      <div className="mb-6 h-12 flex items-center">
                        <Image
                          src={study.logo}
                          alt={`${study.company} logo`}
                          width={120}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    )}

                    {/* Headline */}
                    <h3 className="text-xl font-bold text-white mb-4">
                      {study.headline}
                    </h3>

                    {/* Testimonial Quote */}
                    <p className="text-slate-400 text-base italic mb-6">
                      &quot;{study.quote}&quot;
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="text-center bg-white/5 rounded-lg p-3">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">{study.metric1.value}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">{study.metric1.label}</div>
                      </div>
                      <div className="text-center bg-white/5 rounded-lg p-3">
                        <div className="text-2xl font-bold text-amber-400 mb-1">{study.metric2.value}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">{study.metric2.label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Read Full Story Link */}
                  <Link href={study.link}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-center w-full gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all"
                    >
                      Read Full Story
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
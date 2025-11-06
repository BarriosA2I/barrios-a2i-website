import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image' // Using Image component for logos for optimization
import { ArrowRight, Star, TrendingUp } from 'lucide-react'

// --- Metadata ---
export const metadata: Metadata = {
  title: 'Barrios A2I | Customer Success Stories',
  description: 'Explore how Barrios A2I helps enterprises achieve unprecedented scale and efficiency with AI orchestration. Read our customer success stories and case studies.',
  openGraph: {
    title: 'Barrios A2I | Customer Success Stories',
    description: 'Real-world impact: See how Barrios A2I empowers businesses with multi-agent AI systems.',
    url: 'https://barrios-a2i-website.vercel.app/case-studies', // Update URL for this page
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image-case-studies.png', // Placeholder for specific OG image
        width: 1200,
        height: 630,
      },
    ],
  },
}

// --- Case Studies Data (Mock) ---
const caseStudies = [
  {
    id: 1,
    company: 'Global Innovations Inc.',
    logo: '/logos/company-logo-01.svg', // Placeholder, ensure these paths exist
    title: 'Scaling AI-driven Customer Service',
    description: 'Implemented Barrios A2I to orchestrate 5,000+ AI agents, reducing response times and improving customer satisfaction across global operations.',
    metrics: [
      { value: '300%', label: 'Faster AI deployment' },
      { value: '99.9%', label: 'Uptime reliability' },
    ],
    testimonial: {
      quote: "Barrios A2I transformed our AI operations. We can now deploy new agent workflows in days, not months, achieving unprecedented agility.",
      author: "Jane Doe, Head of AI, Global Innovations Inc.",
    },
    link: '/case-studies/global-innovations', // Placeholder link
    primaryColor: 'cyan', // For dynamic styling
  },
  {
    id: 2,
    company: 'Quantum Logistics',
    logo: '/logos/company-logo-02.svg',
    title: 'Optimizing Supply Chain with Multi-Agent Systems',
    description: 'Barrios A2I enabled real-time optimization of complex logistics networks, integrating with existing systems to deliver significant cost savings and efficiency gains.',
    metrics: [
      { value: '25%', label: 'Reduction in operational costs' },
      { value: '18 Days', label: 'Average deployment time' },
    ],
    testimonial: {
      quote: "The seamless integration and robust orchestration from Barrios A2I were game-changers for our supply chain, providing critical insights and automation.",
      author: "John Smith, CTO, Quantum Logistics",
    },
    link: '/case-studies/quantum-logistics',
    primaryColor: 'amber',
  },
  {
    id: 3,
    company: 'Fintech Solutions Ltd.',
    logo: '/logos/company-logo-03.svg',
    title: 'Enhancing Fraud Detection with Distributed AI',
    description: 'Deployed a network of AI agents to detect fraudulent activities with higher accuracy and speed, drastically improving our security posture without system overhauls.',
    metrics: [
      { value: '50%', label: 'Faster fraud detection' },
      { value: '10,000+', label: 'Agents orchestrated' },
    ],
    testimonial: {
      quote: "Our security posture is stronger than ever. Barrios A2I provided the stability and performance we needed to combat sophisticated fraud in real-time.",
      author: "Emily White, CISO, Fintech Solutions Ltd.",
    },
    link: '/case-studies/fintech-solutions',
    primaryColor: 'emerald', // Using emerald as a third accent color
  },
]

// --- CaseStudiesHero Component (Client Component) ---
// This component replicates the aesthetic of the main Hero component
function CaseStudiesHero() {
  'use client' // This component requires client-side rendering for framer-motion

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] py-20">
      {/* Background Video (re-used from main Hero) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/videos/Video_Optimization_Command_and_Generation.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay to blend video with background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-[#0E1626]/30 to-[#0B1220]/50" />
      </div>

      {/* Animated background gradient orbs (subtle, on top of video) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
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
            <Star size={14} className="text-cyan-400" />
            Proven Enterprise Impact
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Customer{' '}
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
            See how leading enterprises leverage Barrios A2I to orchestrate, scale,
            and manage their most ambitious AI agent deployments.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#case-studies-grid">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
              >
                Explore Case Studies
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

// --- CaseStudyCard Component (Client Component) ---
interface CaseStudyCardProps {
  study: typeof caseStudies[0]
  delay: number
}

function CaseStudyCard({ study, delay }: CaseStudyCardProps) {
  'use client' // This component requires client-side rendering for framer-motion

  // Tailwind JIT compiler needs full class names, cannot interpolate directly
  // We'll use style properties for dynamic colors or map to specific classes.
  // For simplicity and matching the prompt's implied dynamic coloring,
  // we'll rely on a basic color class and ensure the primary/amber gradient is consistent.
  const metricTextColor =
    study.primaryColor === 'cyan'
      ? 'text-cyan-400'
      : study.primaryColor === 'amber'
        ? 'text-amber-400'
        : 'text-emerald-400' // Using emerald as third distinct color

  const buttonGradientFrom =
    study.primaryColor === 'cyan'
      ? 'from-cyan-400'
      : study.primaryColor === 'amber'
        ? 'from-amber-500'
        : 'from-emerald-400'

  const hoverBorderClass =
    study.primaryColor === 'cyan'
      ? 'hover:border-cyan-400/50 hover:shadow-cyan-400/10'
      : study.primaryColor === 'amber'
        ? 'hover:border-amber-400/50 hover:shadow-amber-400/10'
        : 'hover:border-emerald-400/50 hover:shadow-emerald-400/10'

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 flex flex-col ${hoverBorderClass} transition-all duration-300 ease-in-out`}
    >
      <div className="mb-6">
        {/* Company Logo */}
        <Image
          src={study.logo}
          alt={`${study.company} Logo`}
          width={120} // Adjust width as needed for your logos
          height={48} // Adjust height as needed
          className="h-12 w-auto object-contain mb-4 opacity-70"
        />
        <h3 className="text-2xl font-bold text-white mb-2">{study.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{study.description}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 my-6">
        {study.metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className={`text-3xl font-bold ${metricTextColor} mb-1`}>{metric.value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Quote */}
      <div className="relative mb-8 pt-4 border-t border-white/10">
        <p className="italic text-slate-300 text-base leading-relaxed">
          &quot;{study.testimonial.quote}&quot;
        </p>
        <p className="mt-4 text-sm font-semibold text-slate-200">
          - {study.testimonial.author}
        </p>
      </div>

      {/* Read Full Story Button */}
      <div className="mt-auto">
        <Link href={study.link}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`group flex items-center justify-center w-full gap-2 px-6 py-3 bg-gradient-to-r ${buttonGradientFrom} to-amber-500 text-slate-900 font-semibold rounded-lg shadow-md hover:shadow-cyan-400/50 transition-all duration-200`}
          >
            Read Full Story
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

// --- Main Page Component ---
export default function CaseStudiesPage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        <CaseStudiesHero />

        <section id="case-studies-grid" className="py-20 bg-[var(--ink)] relative z-10">
          <div className="container mx-auto px-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            >
              Our Impact in{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                Numbers
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <CaseStudyCard key={study.id} study={study} delay={0.2 + index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to action for more info */}
        <section className="py-20 bg-[var(--ink)] relative z-10">
          <div className="container mx-auto px-5 text-center max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8"
            >
              Ready to create your own{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                success story?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto mb-10"
            >
              Connect with our experts to see how Barrios A2I can transform your AI
              infrastructure and drive your next big success.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                >
                  Book Your Free Consultation
                  <ArrowRight
                    size={18}
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
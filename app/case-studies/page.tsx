"use client";

import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Code2, Rocket, TrendingUp, Award } from 'lucide-react'

// Note: When "use client" is at the top of page.tsx, the metadata object is processed client-side.
// For optimal SEO, the metadata should ideally be exported from a Server Component.
// In a typical Next.js project, components like CaseStudiesHero and CaseStudiesGridSection
// that use 'framer-motion' would be extracted into their own client component files,
// allowing the main page.tsx to remain a Server Component and export metadata server-side.
// However, the request specifies "Generate ONLY the page.tsx file code."
export const metadata: Metadata = {
  title: 'Barrios A2I | Customer Success Stories',
  description: 'Explore how Barrios A2I helps enterprises scale their multi-agent AI systems, achieve faster deployments, and ensure production readiness with real-world case studies.',
  openGraph: {
    title: 'Barrios A2I | Customer Success Stories',
    description: 'Real-world examples of enterprise AI orchestration with Barrios A2I.',
    url: 'https://barrios-a2i-website.vercel.app/case-studies',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image-casestudies.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

// CaseStudiesHero component - replicates the styling and animation patterns of the existing Hero.
const CaseStudiesHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] pt-24 pb-16">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/Video_Optimization_Command_and_Generation.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay to blend video with background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 via-[#0E1626]/40 to-[#0B1220]/60" />
      </div>

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
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-100 mb-8"
          >
            <Award size={14} className="text-amber-400" />
            Proven Impact & Innovation
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Customer{" "}
            <span className="bg-gradient-to-r from-amber-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
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
            Discover how leading enterprises leverage Barrios A2I to power their production-grade AI
            deployments, achieving unprecedented scale, resilience, and operational efficiency.
          </motion.p>

          {/* CTAs */}
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
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
    </section>
  );
};

interface CaseStudyCardProps {
  logoSrc: string;
  companyName: string;
  metrics: { value: string; label: string; icon: React.ReactNode }[];
  quote: string;
  link: string;
  delay: number;
}

// CaseStudyCard component for displaying individual case studies
const CaseStudyCard = ({ logoSrc, companyName, metrics, quote, link, delay }: CaseStudyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-amber-500/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      <div className="relative z-10">
        <img src={logoSrc} alt={`${companyName} Logo`} className="h-12 object-contain mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{companyName}</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2 text-cyan-300 text-sm font-medium">
              {metric.icon}
              <span className="font-bold text-xl text-cyan-400 mr-1">{metric.value}</span>
              <span className="text-slate-400">{metric.label}</span>
            </div>
          ))}
        </div>

        <blockquote className="text-md text-slate-300 italic border-l-2 border-cyan-400 pl-4 mb-6">
          "{quote}"
        </blockquote>

        <Link href={link} className="inline-flex items-center gap-2 text-cyan-400 font-semibold group/link hover:text-amber-400 transition-colors">
          Read Full Story
          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

// CaseStudiesGridSection component - displays a grid of CaseStudyCards
const CaseStudiesGridSection = () => {
    const caseStudies = [
        {
            logoSrc: "/logos/company-a.svg", // Placeholder logo path
            companyName: "Global AI Innovators Inc.",
            metrics: [
                { value: "200%", label: "Faster Deployment", icon: <Rocket size={16} /> },
                { value: "99.9%", label: "Uptime Guarantee", icon: <Zap size={16} /> },
            ],
            quote: "Barrios A2I transformed our AI agent deployment from months to weeks, giving us a significant competitive edge.",
            link: "/case-studies/global-ai-innovators",
        },
        {
            logoSrc: "/logos/company-b.svg", // Placeholder logo path
            companyName: "Enterprise Solutions Corp.",
            metrics: [
                { value: "30%", label: "Cost Reduction", icon: <TrendingUp size={16} /> },
                { value: "10K+", label: "Agents Scaled", icon: <Code2 size={16} /> },
            ],
            quote: "The seamless integration and robust orchestration capabilities allowed us to scale without a single rewrite.",
            link: "/case-studies/enterprise-solutions",
        },
        {
            logoSrc: "/logos/company-c.svg", // Placeholder logo path
            companyName: "FinTech Innovations Ltd.",
            metrics: [
                { value: "60%", label: "Increased Throughput", icon: <Zap size={16} /> },
                { value: "24/7", label: "Observability", icon: <Code2 size={16} /> },
            ],
            quote: "Observability features are unparalleled, providing deep insights into our complex multi-agent workflows.",
            link: "/case-studies/fintech-innovations",
        },
        {
            logoSrc: "/logos/company-d.svg", // Placeholder logo path
            companyName: "Healthcare AI Partners",
            metrics: [
                { value: "40%", label: "Development Speed", icon: <Rocket size={16} /> },
                { value: "HIPAA", label: "Compliance", icon: <Award size={16} /> },
            ],
            quote: "Security and compliance are critical for us, and Barrios A2I delivered on all fronts.",
            link: "/case-studies/healthcare-ai-partners",
        },
        {
            logoSrc: "/logos/company-e.svg", // Placeholder logo path
            companyName: "Logistics Optimization Co.",
            metrics: [
                { value: "15%", label: "Efficiency Gain", icon: <TrendingUp size={16} /> },
                { value: "Real-time", label: "Adaptation", icon: <Code2 size={16} /> },
            ],
            quote: "Our distributed logistics agents now communicate flawlessly, adapting to dynamic changes in real-time.",
            link: "/case-studies/logistics-optimization",
        },
        {
            logoSrc: "/logos/company-f.svg", // Placeholder logo path
            companyName: "Retail Intelligence Group",
            metrics: [
                { value: "50%", label: "Reduced Latency", icon: <Zap size={16} /> },
                { value: "Scalable", label: "Personalization", icon: <Rocket size={16} /> },
            ],
            quote: "Barrios A2I enabled us to deploy highly personalized AI agents for millions of customers with minimal latency.",
            link: "/case-studies/retail-intelligence",
        },
    ];

    return (
        <section className="relative py-20 bg-[var(--ink)]">
            <div className="container mx-auto px-5 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
                >
                    Transforming AI Deployments for{" "}
                    <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
                        Industry Leaders
                    </span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((cs, index) => (
                        <CaseStudyCard key={cs.companyName} {...cs} delay={0.2 + index * 0.1} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: caseStudies.length * 0.1 + 0.3 }}
                    className="text-center mt-20"
                >
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                        Ready to see how Barrios A2I can accelerate your enterprise AI initiatives?
                    </p>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-cyan-400 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-amber-400/50 transition-all mx-auto"
                        >
                            Get Started
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
            {/* Top gradient fade for seamless blend with hero */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B1220] to-transparent pointer-events-none" />
        </section>
    );
};


export default function CaseStudiesPage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        <CaseStudiesHero />
        <CaseStudiesGridSection />
      </main>

      <Footer />
    </div>
  )
}
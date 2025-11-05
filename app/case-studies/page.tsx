import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Zap, Code2, Rocket, TrendingUp, Award } from 'lucide-react'

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

interface CaseStudyCardProps {
  logoSrc: string
  companyName: string
  metrics: { value: string; label: string; icon: React.ReactNode }[]
  quote: string
  link: string
}

function CaseStudyCard({ logoSrc, companyName, metrics, quote, link }: CaseStudyCardProps) {
  return (
    <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
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
    </div>
  )
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      logoSrc: "/logos/company-a.svg",
      companyName: "Global AI Innovators Inc.",
      metrics: [
        { value: "200%", label: "Faster Deployment", icon: <Rocket size={16} /> },
        { value: "99.9%", label: "Uptime Guarantee", icon: <Zap size={16} /> },
      ],
      quote: "Barrios A2I transformed our AI agent deployment from months to weeks, giving us a significant competitive edge.",
      link: "/case-studies/global-ai-innovators",
    },
    {
      logoSrc: "/logos/company-b.svg",
      companyName: "Enterprise Solutions Corp.",
      metrics: [
        { value: "30%", label: "Cost Reduction", icon: <TrendingUp size={16} /> },
        { value: "10K+", label: "Agents Scaled", icon: <Code2 size={16} /> },
      ],
      quote: "The seamless integration and robust orchestration capabilities allowed us to scale without a single rewrite.",
      link: "/case-studies/enterprise-solutions",
    },
    {
      logoSrc: "/logos/company-c.svg",
      companyName: "FinTech Innovations Ltd.",
      metrics: [
        { value: "60%", label: "Increased Throughput", icon: <Zap size={16} /> },
        { value: "24/7", label: "Observability", icon: <Code2 size={16} /> },
      ],
      quote: "Observability features are unparalleled, providing deep insights into our complex multi-agent workflows.",
      link: "/case-studies/fintech-innovations",
    },
    {
      logoSrc: "/logos/company-d.svg",
      companyName: "Healthcare AI Partners",
      metrics: [
        { value: "40%", label: "Development Speed", icon: <Rocket size={16} /> },
        { value: "HIPAA", label: "Compliance", icon: <Award size={16} /> },
      ],
      quote: "Security and compliance are critical for us, and Barrios A2I delivered on all fronts.",
      link: "/case-studies/healthcare-ai-partners",
    },
    {
      logoSrc: "/logos/company-e.svg",
      companyName: "Logistics Optimization Co.",
      metrics: [
        { value: "15%", label: "Efficiency Gain", icon: <TrendingUp size={16} /> },
        { value: "Real-time", label: "Adaptation", icon: <Code2 size={16} /> },
      ],
      quote: "Our distributed logistics agents now communicate flawlessly, adapting to dynamic changes in real-time.",
      link: "/case-studies/logistics-optimization",
    },
    {
      logoSrc: "/logos/company-f.svg",
      companyName: "Retail Intelligence Group",
      metrics: [
        { value: "50%", label: "Reduced Latency", icon: <Zap size={16} /> },
        { value: "Scalable", label: "Personalization", icon: <Rocket size={16} /> },
      ],
      quote: "Barrios A2I enabled us to deploy highly personalized AI agents for millions of customers with minimal latency.",
      link: "/case-studies/retail-intelligence",
    },
  ]

  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Hero Section */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 via-[#0E1626]/40 to-[#0B1220]/60" />
          </div>

          {/* Animated background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-5 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-100 mb-8">
                <Award size={14} className="text-amber-400" />
                Proven Impact & Innovation
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Customer{" "}
                <span className="bg-gradient-to-r from-amber-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                  Success Stories
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                Discover how leading enterprises leverage Barrios A2I to power their production-grade AI
                deployments, achieving unprecedented scale, resilience, and operational efficiency.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all hover:scale-105">
                    Book a Demo
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Case Studies Grid */}
        <section className="relative py-20 bg-[var(--ink)]">
          <div className="container mx-auto px-5 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
              Transforming AI Deployments for{" "}
              <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.companyName} {...cs} />
              ))}
            </div>

            <div className="text-center mt-20">
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                Ready to see how Barrios A2I can accelerate your enterprise AI initiatives?
              </p>
              <Link href="/contact">
                <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-cyan-400 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-amber-400/50 transition-all mx-auto hover:scale-105">
                  Get Started
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            </div>
          </div>
          {/* Top gradient fade for seamless blend with hero */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B1220] to-transparent pointer-events-none" />
        </section>
      </main>

      <Footer />
    </div>
  )
}

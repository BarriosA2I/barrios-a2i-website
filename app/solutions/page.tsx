import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Bot, GitFork, Eye, Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Barrios A2I | AI Orchestration Solutions',
  description: 'Explore enterprise-grade AI orchestration solutions for multi-agent systems, event-driven architectures, and comprehensive observability.',
  openGraph: {
    title: 'Barrios A2I | AI Orchestration Solutions',
    description: 'Discover how Barrios A2I empowers scalable and fault-tolerant multi-agent AI deployments.',
    url: 'https://barrios-a2i-website.vercel.app/solutions',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Bot,
      title: 'Multi-Agent Systems',
      description: 'Design, deploy, and manage complex interactions between autonomous AI agents with native support for message queues and distributed state.',
      link: '/solutions/multi-agent',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      icon: GitFork,
      title: 'Event-Driven Architecture',
      description: 'Build reactive, scalable AI applications that respond to real-time events, integrating seamlessly with your existing data streams and message brokers.',
      link: '/solutions/event-driven',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      icon: Eye,
      title: 'Comprehensive Observability',
      description: 'Gain deep insights into your AI agent workflows with end-to-end tracing, metrics, and logs, powered by OpenTelemetry for seamless integration.',
      link: '/solutions/observability',
      gradient: 'from-emerald-400 to-green-500',
    },
  ]

  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] text-white">
          {/* Background Video */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-[#0E1626]/30 to-[#0B1220]/50" />
          </div>

          {/* Animated background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-5 py-20 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-100 mb-8">
                <Zap size={14} className="text-cyan-400" />
                Empowering Your AI Vision
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                AI Orchestration{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                Leverage Barrios A2I to power your complex AI workflows, from distributed multi-agent systems to real-time event processing and robust observability.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link href="#solutions-grid">
                  <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all hover:scale-105">
                    Explore Solutions
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>

                <Link href="/contact">
                  <button className="group flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all">
                    Book a Demo
                    <Zap size={18} className="text-cyan-400" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Solutions Grid */}
        <section id="solutions-grid" className="py-20 bg-[#0B1220] text-white">
          <div className="container mx-auto px-5">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Our Core{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="group relative p-8 rounded-xl bg-white/5 border border-white/10 overflow-hidden shadow-xl hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${solution.gradient} inline-flex mb-6 w-fit`}>
                      <solution.icon size={28} className="text-slate-900" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      {solution.title}
                    </h3>
                    <p className="text-slate-300 text-md flex-grow">
                      {solution.description}
                    </p>
                    <Link href={solution.link} className="mt-6 inline-flex">
                      <button className="group flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm text-cyan-300 font-medium rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all">
                        Learn More
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-[#0E1626] text-white">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto">
              Ready to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Scale Your AI
              </span>
              ?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Connect with our experts to discover how Barrios A2I can transform your AI infrastructure with unmatched orchestration and reliability.
            </p>
            <Link href="/contact">
              <button className="group flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold text-lg rounded-lg shadow-xl hover:shadow-cyan-400/50 transition-all hover:scale-105 mx-auto">
                Book Your 30-Min Demo
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

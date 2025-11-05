"use client"; // Required because Framer Motion is used directly within this file's defined components.

import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, GitFork, Eye, Zap } from 'lucide-react'; // Icons

// Metadata definition
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
};

// Component for the Solutions Hero section
function SolutionsHero() {
  return (
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
        {/* Gradient overlay to blend video with background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-[#0E1626]/30 to-[#0B1220]/50" />
      </div>

      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
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
            <Zap size={14} className="text-cyan-400" />
            Empowering Your AI Vision
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
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Leverage Barrios A2I to power your complex AI workflows, from distributed multi-agent systems to real-time event processing and robust observability.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="#solutions-grid">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
              >
                Explore Solutions
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
                Book a Demo
                <Zap size={18} className="text-cyan-400" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
    </section>
  );
}

// Component for the Solutions Grid
function SolutionsGrid() {
  const solutions = [
    {
      icon: Bot,
      title: 'Multi-Agent Systems',
      description: 'Design, deploy, and manage complex interactions between autonomous AI agents with native support for message queues and distributed state.',
      link: '/solutions/multi-agent',
      gradientClass: 'from-cyan-400 to-blue-500', // For icon background
      orbColor: 'rgb(34, 211, 238)', // For subtle background orb effect (cyan-400)
    },
    {
      icon: GitFork,
      title: 'Event-Driven Architecture',
      description: 'Build reactive, scalable AI applications that respond to real-time events, integrating seamlessly with your existing data streams and message brokers.',
      link: '/solutions/event-driven',
      gradientClass: 'from-amber-400 to-orange-500',
      orbColor: 'rgb(251, 191, 36)', // amber-400
    },
    {
      icon: Eye,
      title: 'Comprehensive Observability',
      description: 'Gain deep insights into your AI agent workflows with end-to-end tracing, metrics, and logs, powered by OpenTelemetry for seamless integration.',
      link: '/solutions/observability',
      gradientClass: 'from-emerald-400 to-green-500',
      orbColor: 'rgb(52, 211, 153)', // emerald-400
    },
  ];

  return (
    <section id="solutions-grid" className="py-20 bg-[#0B1220] text-white">
      <div className="container mx-auto px-5">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Our Core{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
            Solutions
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-xl bg-white/5 border border-white/10 overflow-hidden shadow-xl hover:border-cyan-400/50 transition-all duration-300"
            >
              {/* Background gradient orb for each card */}
              <div
                className={`absolute -inset-10 opacity-10 blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-110`}
                style={{
                  background: `radial-gradient(circle at center, ${solution.orbColor}, transparent 50%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className={`p-3 rounded-full bg-gradient-to-br ${solution.gradientClass} inline-flex mb-6`}>
                  <solution.icon size={28} className="text-slate-900" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {solution.title}
                </h3>
                <p className="text-slate-300 text-md flex-grow">
                  {solution.description}
                </p>
                <Link href={solution.link} className="mt-6 inline-flex">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm text-cyan-300 font-medium rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all"
                  >
                    Learn More
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Component for the Call to Action section
function SolutionsCTA() {
  return (
    <section className="py-24 bg-[#0E1626] text-white">
      <div className="container mx-auto px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto"
        >
          Ready to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
            Scale Your AI
          </span>
          ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Connect with our experts to discover how Barrios A2I can transform your AI infrastructure with unmatched orchestration and reliability.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold text-lg rounded-lg shadow-xl hover:shadow-cyan-400/50 transition-all"
            >
              Book Your 30-Min Demo
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main Solutions Page component
export default function SolutionsPage() {
  return (
    <div className="relative bg-[var(--ink)]"> {/* Assumes Space Grotesk is globally applied */}
      <Navigation />

      <main>
        <SolutionsHero />
        <SolutionsGrid />
        <SolutionsCTA />
      </main>

      <Footer />
    </div>
  );
}
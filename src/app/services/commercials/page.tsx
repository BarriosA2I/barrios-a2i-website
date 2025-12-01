'use client';

import { Particles } from "@/components/Particles"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import TrinityTerminal from '@/components/TrinityTerminal'

export default function CommercialsPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a1e] overflow-x-hidden">
      {/* Layer 1: Animated Particles Background */}
      <Particles />

      {/* Layer 2: Static Gradient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top-left cyan glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.08] blur-[150px] rounded-full" />
        {/* Bottom-right gold glow */}
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[#F59E0B] opacity-[0.05] blur-[150px] rounded-full" />
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C2FF] opacity-[0.03] blur-[200px] rounded-full" />
      </div>

      {/* Layer 3: Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 194, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 194, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Layer 4: Content (Z-10 to sit above visual layers) */}
      <div className="relative z-10">
        <Nav />
        
        <main className="flex flex-col">
          {/* Hero Section */}
          <section className="px-6 pt-32 pb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">AI-Powered </span>
              <span className="text-[#00C2FF]">Commercial Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Harness the Trinity Orchestrator to generate market intelligence, 
              trend analysis, and competitive insights in seconds.
            </p>
          </section>

          {/* Trinity Terminal Section */}
          <section id="terminal" className="px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <TrinityTerminal />
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 py-16">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#00C2FF]/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#00C2FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
                <p className="text-gray-400">50+ prompt injection defenses, rate limiting, and comprehensive audit logging.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400">Multi-agent orchestration delivers comprehensive reports in under 5 seconds.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Deep Insights</h3>
                <p className="text-gray-400">12 RAG techniques, market sizing, persona clustering, and channel optimization.</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

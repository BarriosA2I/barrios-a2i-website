'use client';

import { Particles } from "@/components/Particles"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import CreativeDirectorChat from '@/components/CreativeDirectorChat'

export default function CommercialCreatorPage() {
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
          <section className="px-6 pt-32 pb-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">AI-Powered </span>
              <span className="text-[#00C2FF]">Commercial Creator</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-4">
              Have a conversation with our Creative Director AI. 
              Tell us about your business and we&apos;ll craft a stunning commercial together.
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Powered by RAGNAROK v7.0 APEX + Trinity Market Intelligence
            </p>
          </section>

          {/* Chat Section */}
          <section className="px-6 py-8">
            <div className="max-w-4xl mx-auto h-[600px]">
              <CreativeDirectorChat 
                serverUrl="ws://localhost:8000/ws/creative-director"
                onBriefComplete={(brief) => {
                  console.log('Brief complete:', brief);
                }}
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#00C2FF]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Chat</h3>
                  <p className="text-gray-400 text-sm">Tell our Creative Director about your business and goals</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Research</h3>
                  <p className="text-gray-400 text-sm">Trinity gathers market intelligence and competitor insights</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Create</h3>
                  <p className="text-gray-400 text-sm">RAGNAROK generates your Hollywood-grade commercial</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">4. Refine</h3>
                  <p className="text-gray-400 text-sm">Review and iterate until it&apos;s perfect</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="px-6 py-16 bg-white/[0.02]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-12">Powered By Advanced AI</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Creative Director AI</h3>
                  <p className="text-gray-400 text-sm">Claude-powered conversational AI that understands your vision</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Trinity Intelligence</h3>
                  <p className="text-gray-400 text-sm">Market research, trend analysis, and competitor insights</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">RAGNAROK Production</h3>
                  <p className="text-gray-400 text-sm">Hollywood-grade video generation with Veo 3.1 + Sora 2</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

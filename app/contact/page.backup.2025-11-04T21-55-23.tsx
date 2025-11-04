import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Barrios A2I | Schedule Demo',
  description: 'Book a 30-minute technical consultation with our AI orchestration experts. Discuss your multi-agent architecture and scaling challenges.',
  openGraph: {
    title: 'Contact Barrios A2I | Schedule Demo',
    description: 'Get in touch with Barrios A2I to discuss your AI orchestration needs.',
    url: 'https://barrios-a2i-website.vercel.app/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0B1220]">
        <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] min-h-screen">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-cyan-500/20"></div>
          </div>

          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 lg:flex-row lg:items-stretch lg:gap-10">
            <div className="flex-1">
              <div className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                ✨ Contact Barrios A2I
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                See Barrios A2I Handle{' '}
                <span className="bg-gradient-to-r from-amber-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  Your Agent Load
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-slate-300 leading-relaxed">
                We'll map your current system, identify scaling bottlenecks, and show exactly how Barrios A2I eliminates them.
                30 minutes, no sales pitch.
              </p>

              <div className="mt-8">
                <div className="space-y-4 p-8 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-4">Contact Us Directly</h3>

                  <p className="text-slate-300 mb-4">
                    We're currently updating our backend. Please reach out directly:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">📧 Email:</p>
                      <a
                        href="mailto:alienation2innovation@gmail.com"
                        className="text-cyan-300 hover:text-cyan-200 font-semibold break-all"
                      >
                        alienation2innovation@gmail.com
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400 mb-1">📞 Phone:</p>
                      <a
                        href="tel:+13049191193"
                        className="text-cyan-300 hover:text-cyan-200 font-semibold"
                      >
                        +1 (304) 919-1193
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-4">
                    We typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md lg:w-96">
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-white/0 p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,194,255,0.12)]">
                <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100 uppercase tracking-widest">
                  Production-Ready
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white">
                  AI Orchestration Platform
                </h2>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Event-driven, fault-tolerant multi-agent orchestration with OpenTelemetry, RabbitMQ, Redis, and LangGraph.
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Enterprise Deployments</span>
                    <span className="font-semibold text-cyan-300">10+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">ARR Orchestrated</span>
                    <span className="font-semibold text-cyan-300">$100M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Avg Deployment</span>
                    <span className="font-semibold text-amber-400">18 days</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-xs uppercase text-slate-400 tracking-wider mb-1">Email</p>
                    <a
                      href="mailto:alienation2innovation@gmail.com"
                      className="text-white hover:text-cyan-300 transition-colors break-all text-sm"
                    >
                      alienation2innovation@gmail.com
                    </a>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400 tracking-wider mb-1">Phone</p>
                    <a
                      href="tel:+13049191193"
                      className="text-white hover:text-cyan-300 transition-colors text-sm"
                    >
                      +1 (304) 919-1193
                    </a>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400 tracking-wider mb-1">Response Time</p>
                    <p className="text-white text-sm">Under 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

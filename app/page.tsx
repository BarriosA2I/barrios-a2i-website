import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import TrustedBy from '@/components/TrustedBy'
import Architecture from '@/components/Architecture'
import Services from '@/components/Services'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Barrios A2I | AI Orchestration & Multi-Agent Systems',
  description: 'Scale AI agents with confidence. Enterprise-grade orchestration for distributed multi-agent systems with fault tolerance, observability, and horizontal scaling.',
  openGraph: {
    title: 'Barrios A2I | AI Orchestration & Multi-Agent Systems',
    description: 'Scale AI agents with confidence. Enterprise-grade orchestration for production-scale AI deployments.',
    url: 'https://barrios-a2i-website.vercel.app',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function HomePage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        <Hero />
        <Features />
        <TrustedBy />
        <Architecture />
        <Services />
      </main>

      <Footer />
    </div>
  )
}

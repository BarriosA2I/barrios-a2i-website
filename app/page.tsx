import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import PreLaunch from '@/components/PreLaunch'
import ServicesGrid from '@/components/ServicesGrid'
import HowWeWork from '@/components/HowWeWork'
import WhyBarrios from '@/components/WhyBarrios'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Barrios A2I | AI Orchestration & Multi-Agent Systems',
  description: 'Scale AI agents with confidence. Enterprise-grade orchestration for distributed multi-agent systems with fault tolerance, observability, and horizontal scaling.',
  openGraph: {
    title: 'Barrios A2I | AI Orchestration & Multi-Agent Systems',
    description: 'Scale AI agents with confidence. Enterprise-grade orchestration for production-scale AI deployments.',
    url: 'https://www.barriosa2i.com',
    images: [
      {
        url: 'https://www.barriosa2i.com/og-image.png',
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
        <PreLaunch />
        <ServicesGrid />
        <HowWeWork />
        <WhyBarrios />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

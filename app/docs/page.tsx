import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DocsHero from '@/components/DocsHero'
import DocsContent from '@/components/DocsContent'

export const metadata: Metadata = {
  title: 'Documentation | Barrios A2I Developer Guides',
  description: 'Complete documentation for Barrios A2I multi-agent orchestration platform. API references, quick start guides, and integration tutorials.',
  openGraph: {
    title: 'Documentation | Barrios A2I Developer Guides',
    description: 'Get started with Barrios A2I multi-agent orchestration in minutes.',
    url: 'https://barrios-a2i-website.vercel.app/docs',
  },
}

export default function DocsPage() {
  return (
    <div className="relative bg-[#0B1220]">
      <Navigation />

      <main>
        <DocsHero />
        <DocsContent />
      </main>

      <Footer />
    </div>
  )
}

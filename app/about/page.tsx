import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutHero from '@/components/AboutHero'
import AboutTeam from '@/components/AboutTeam'
import AboutMission from '@/components/AboutMission'

export const metadata: Metadata = {
  title: 'About Barrios A2I | AI Orchestration Experts',
  description: 'Learn about Barrios A2I\'s mission to make enterprise AI orchestration accessible, scalable, and production-ready for every engineering team.',
  openGraph: {
    title: 'About Barrios A2I | AI Orchestration Experts',
    description: 'Meet the team building the future of multi-agent AI systems.',
    url: 'https://barrios-a2i-website.vercel.app/about',
  },
}

export default function AboutPage() {
  return (
    <div className="relative bg-[#0B1220]">
      <Navigation />

      <main>
        <AboutHero />
        <AboutMission />
        <AboutTeam />
      </main>

      <Footer />
    </div>
  )
}

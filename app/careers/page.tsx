import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CareersHero from '@/components/CareersHero'
import CareersPositions from '@/components/CareersPositions'
import CareersCulture from '@/components/CareersCulture'

export const metadata: Metadata = {
  title: 'Careers | Join Barrios A2I',
  description: 'Join our team building the future of AI orchestration. We\'re hiring engineers, researchers, and product leaders passionate about multi-agent systems.',
  openGraph: {
    title: 'Careers | Join Barrios A2I',
    description: 'Build the future of AI orchestration with us.',
    url: 'https://barrios-a2i-website.vercel.app/careers',
  },
}

export default function CareersPage() {
  return (
    <div className="relative bg-[#0B1220]">
      <Navigation />

      <main>
        <CareersHero />
        <CareersCulture />
        <CareersPositions />
      </main>

      <Footer />
    </div>
  )
}

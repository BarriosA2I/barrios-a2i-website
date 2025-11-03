import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import TrustedBy from '@/components/TrustedBy'
import Architecture from '@/components/Architecture'
import Services from '@/components/Services'
import Footer from '@/components/Footer'

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

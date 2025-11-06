import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogHero from '@/components/BlogHero'
import BlogGrid from '@/components/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog | Barrios A2I - AI Orchestration Insights',
  description: 'Technical articles, case studies, and insights on AI agent orchestration, multi-agent systems, and production AI architecture.',
  openGraph: {
    title: 'Blog | Barrios A2I - AI Orchestration Insights',
    description: 'Learn about AI orchestration best practices and real-world implementations.',
    url: 'https://barrios-a2i-website.vercel.app/blog',
  },
}

export default function BlogPage() {
  return (
    <div className="relative bg-[#0B1220]">
      <Navigation />

      <main>
        <BlogHero />
        <BlogGrid />
      </main>

      <Footer />
    </div>
  )
}

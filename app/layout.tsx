import type { Metadata } from 'next'
import { Space_Grotesk, Orbitron, Inter } from 'next/font/google'
import './globals.css'
import MouseTracer from '@/components/MouseTracer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-orbitron',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Barrios A2I | AI Orchestration & Multi-Agent Systems',
  description: 'Enterprise-grade AI orchestration platform for distributed multi-agent systems. Event-driven architecture with fault tolerance, observability, and horizontal scaling.',
  keywords: ['AI orchestration', 'multi-agent systems', 'LangGraph', 'event-driven architecture', 'distributed systems', 'automation', 'enterprise AI', 'SMB automation'],
  authors: [{ name: 'Barrios A2I' }],
  creator: 'Barrios A2I',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://barrios-a2i-website.vercel.app',
    siteName: 'Barrios A2I',
    title: 'Barrios A2I | AI Orchestration & Multi-Agent Systems',
    description: 'Enterprise-grade AI orchestration platform for distributed multi-agent systems.',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Barrios A2I - AI Orchestration Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barrios A2I | AI Orchestration & Multi-Agent Systems',
    description: 'Enterprise-grade AI orchestration platform for distributed multi-agent systems.',
    creator: '@BarriosA2I',
    images: ['https://barrios-a2i-website.vercel.app/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${inter.variable}`}
      style={{ backgroundColor: '#0B1220' }}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { background-color: #0B1220 !important; margin: 0; padding: 0; }
        `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Barrios A2I',
              url: 'https://barrios-a2i-website.vercel.app',
              logo: 'https://barrios-a2i-website.vercel.app/og-image.png',
              description: 'Enterprise-grade AI orchestration platform for distributed multi-agent systems',
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-304-919-1193',
                contactType: 'Sales',
                email: 'alienation2innovation@gmail.com',
              },
              sameAs: [
                'https://github.com/BarriosA2I',
              ],
            }),
          }}
        />
      </head>
      <body className="font-inter" style={{ backgroundColor: '#0B1220' }}>
        <MouseTracer />
        {children}
      </body>
    </html>
  )
}

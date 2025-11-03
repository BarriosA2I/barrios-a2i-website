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
  description: 'Enterprise-grade AI orchestration platform for distributed multi-agent systems. Event-driven architecture for production-scale AI deployments.',
  keywords: ['AI orchestration', 'multi-agent systems', 'automation', 'enterprise AI', 'SMB automation'],
  authors: [{ name: 'Barrios A2I Systems' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://barriosa2i.com',
    siteName: 'Barrios A2I',
    title: 'Barrios A2I | AI Orchestration Platform',
    description: 'Transform operational chaos into orchestrated precision with our AI infrastructure.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Barrios A2I - AI Orchestration Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barrios A2I | AI Orchestration Platform',
    description: 'Enterprise-grade multi-agent systems for production.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
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
      </head>
      <body className="font-inter" style={{ backgroundColor: '#0B1220' }}>
        <MouseTracer />
        {children}
      </body>
    </html>
  )
}

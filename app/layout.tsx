import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/src/components/CustomCursor'
import { Nav } from '@/src/components/Nav'
import { Footer } from '@/src/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Barrios A2I | Automated Operations. Engineered Attention.',
  description: 'The complete ROI stack. Event-driven AI systems to run your business, character-driven commercials to fuel it.',
  keywords: ['AI automation', 'video production', 'web development', 'business automation', 'commercial production'],
  authors: [{ name: 'Barrios A2I' }],
  creator: 'Barrios A2I',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.barriosa2i.com',
    siteName: 'Barrios A2I',
    title: 'Barrios A2I | Automated Operations. Engineered Attention.',
    description: 'The complete ROI stack. AI automation and commercial production.',
    images: [
      {
        url: 'https://www.barriosa2i.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Barrios A2I',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barrios A2I | Automated Operations. Engineered Attention.',
    description: 'The complete ROI stack. AI automation and commercial production.',
    images: ['https://www.barriosa2i.com/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

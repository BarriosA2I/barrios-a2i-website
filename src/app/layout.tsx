import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Barrios A2I | Automated Operations. Engineered Attention.',
  description: 'Event-driven AI systems to run your business and character-driven commercials to fuel it. The complete ROI stack for local businesses, service companies, and agencies.',
  keywords: ['AI automation', 'commercial production', 'business automation', 'AI agents', 'video production', 'Veo 3.1', 'Sora 2'],
  authors: [{ name: 'Barrios A2I Systems' }],
  openGraph: {
    title: 'Barrios A2I | Automated Operations. Engineered Attention.',
    description: 'Event-driven AI systems to run your business and character-driven commercials to fuel it.',
    url: 'https://barriosa2i.com',
    siteName: 'Barrios A2I',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barrios A2I | Automated Operations. Engineered Attention.',
    description: 'Event-driven AI systems to run your business and character-driven commercials to fuel it.',
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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#0a0a1e] text-white antialiased">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Barrios A2I | Future-Grade AI Engineering',
  description: 'We architect multi-agent AI systems that solve complex business logic. Bridging the gap between legacy chaos and future-grade automation.',
  keywords: ['AI Engineering', 'Multi-Agent Systems', 'Next.js', 'n8n', 'Automation', 'RAG', 'AI automation', 'business automation'],
  authors: [{ name: 'Barrios A2I Systems' }],
  openGraph: {
    title: 'Barrios A2I | Future-Grade AI Engineering',
    description: 'From Alienated to Innovated. Premium AI engineering and architecture.',
    url: 'https://barriosa2i.com',
    siteName: 'Barrios A2I',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barrios A2I | Future-Grade AI Engineering',
    description: 'From Alienated to Innovated. Premium AI engineering and architecture.',
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
      <body className={`${outfit.variable} ${jetbrainsMono.variable} min-h-screen bg-navy-950 text-white antialiased`}>
        {/* Noise Overlay for Film Grain Effect */}
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  )
}

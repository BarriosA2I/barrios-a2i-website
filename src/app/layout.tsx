import type { Metadata } from 'next'
import './globals.css'
import ChatWidget from '@/components/chat/ChatWidget'

export const metadata: Metadata = {
  title: 'Barrios A2I | Autonomous Infrastructure',
  description: 'We design, develop, and deploy AI-powered solutions — from websites and apps to commercials and automation systems. Build smarter. Launch faster.',
  keywords: ['AI automation', 'AI agents', 'web development', 'app development', 'AI commercials', 'business automation'],
  authors: [{ name: 'Barrios A2I Systems' }],
  openGraph: {
    title: 'Barrios A2I | Autonomous Infrastructure',
    description: 'We design, develop, and deploy AI-powered solutions — from websites and apps to commercials and automation systems.',
    url: 'https://barriosa2i.com',
    siteName: 'Barrios A2I',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barrios A2I | Autonomous Infrastructure',
    description: 'We design, develop, and deploy AI-powered solutions — from websites and apps to commercials and automation systems.',
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
      <body className="min-h-screen bg-navy-deep text-white antialiased">
        {children}
        <ChatWidget
          apiEndpoint="/api/chat"
          tenantId="barriosa2i"
          siteId="main"
          userTier="pro"
          position="bottom-right"
        />
      </body>
    </html>
  )
}

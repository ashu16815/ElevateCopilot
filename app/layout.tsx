import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReferralProvider from '@/components/ReferralProvider'
import LinkedInInsight from '@/components/LinkedInInsight'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'ElevateCopilot - Learn Copilot. Lead with AI.',
  description: 'Premium Microsoft Copilot training & certification for professionals and teams worldwide. Master AI productivity with expert-led sessions.',
  keywords: 'Microsoft Copilot, AI training, productivity, certification, corporate training, Microsoft 365',
  authors: [{ name: 'ElevateCopilot' }],
  creator: 'ElevateCopilot',
  publisher: 'ElevateCopilot',
  robots: 'index, follow',
  openGraph: {
    title: 'ElevateCopilot - Learn Copilot. Lead with AI.',
    description: 'Premium Microsoft Copilot training & certification for professionals and teams worldwide.',
    url: 'https://www.elevatecopilot.com',
    siteName: 'ElevateCopilot',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ElevateCopilot - Microsoft Copilot Training & Certification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElevateCopilot - Learn Copilot. Lead with AI.',
    description: 'Premium Microsoft Copilot training & certification for professionals and teams worldwide.',
    images: ['/og-cover.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0F172A" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ReferralProvider />
        <LinkedInInsight />
        <Analytics />
      </body>
    </html>
  )
}

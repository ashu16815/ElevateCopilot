import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElevateCopilot - Learn Copilot. Lead with AI.',
    description: 'Premium Microsoft Copilot training & certification for professionals and teams worldwide.',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

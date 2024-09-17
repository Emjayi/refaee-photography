import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar'
import { ImageCacheProvider } from '@/contexts/ImageCacheContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Alireza Refaei',
    template: 'Alireza Refaei | %s'
  },
  description: 'Alireza Refaei is a professional photographer specializing in capturing moments that tell stories.',
  keywords: ['photography', 'photographer', 'Alireza Refaei', 'portfolio', 'images'],
  authors: [{ name: 'Alireza Refaei' }],
  creator: 'Alireza Refaei',
  publisher: 'Alireza Refaei',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Alireza Refaei | Professional Photographer',
    description: 'Explore the captivating world of photography through the lens of Alireza Refaei.',
    url: 'https://www.alirezarefaei.com',
    siteName: 'Alireza Refaei Photography',
    images: [
      {
        url: 'https://www.alirezarefaei.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alireza Refaei Photography Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alireza Refaei | Professional Photographer',
    description: 'Discover the art of visual storytelling through Alireza Refaei\'s photography.',
    creator: '@alirezarefaei',
    images: ['https://www.alirezarefaei.com/twitter-image.jpg'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImageCacheProvider>
          <div className="cursor-dot"></div>
          <div className="cursor-outline"></div>
          <div className='fixed z-10 w-screen prevent-select'>
            <Navbar />
          </div>
          <main className="prevent-select bg-white min-h-[100dvh]">{children}</main>
        </ImageCacheProvider>
      </body>
    </html>
  )
}
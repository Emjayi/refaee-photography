
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Refaee',
  description: 'Photographer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="cursor-dot"></div>
        <div className="cursor-outline"></div>
        <div className='fixed z-10 w-screen prevent-select'>
          <Navbar />
        </div>

        <main className=" prevent-select bg-white min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

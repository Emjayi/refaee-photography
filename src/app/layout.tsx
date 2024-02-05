
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from './nav'

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

        <main className="flex flex-col items-center">

          <Navbar />

          {children}



          <footer className="footer absolute bottom-0">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-400 sm:text-center">© 2023 <a href="https://refaee.com/" className="hover:underline">Refaee™</a>. All Rights Reserved.
              </span>
            </div>
          </footer>


        </main>
      </body>
    </html>
  )
}

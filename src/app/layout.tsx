
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Nav from './nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col items-center px-24 py-4">

          <Nav />

          {children}

          <div className='bottom-4'>
            <h1>Alireza Refaee</h1>
          </div>

        </main>
      </body>
    </html>
  )
}

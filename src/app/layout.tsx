import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

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
          <nav className=''>
            <ul className='flex justify-evenly'>
              <li className='px-2'>
                <Link href={"/"}>Home</Link >
              </li>
              <li className='px-2'>
                <Link href={"information"}>Information</Link >
              </li>
            </ul>
          </nav>
        </main>
        {children}
      </body>
    </html>
  )
}

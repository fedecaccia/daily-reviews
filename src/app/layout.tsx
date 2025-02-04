import './globals.css'
import { Quicksand } from 'next/font/google'
import { Providers } from './providers'
import { AuthCheck } from '@/components/AuthCheck'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-quicksand'
})

export const metadata = {
  title: 'Goals Tracker',
  description: 'Track your daily goals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Daily Review</title>
      </head>
      <body className={`${quicksand.variable} font-sans relative`}>
        <Providers>
          <AuthCheck>
            {children}
          </AuthCheck>
        </Providers>
      </body>
    </html>
  )
}
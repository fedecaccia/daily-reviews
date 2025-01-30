import './globals.css'
import { Inter, Quicksand } from 'next/font/google'

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
        {children}
      </body>
    </html>
  )
}

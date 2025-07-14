import './globals.css'
import { Roboto_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} bg-terminal-black text-gray-100 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
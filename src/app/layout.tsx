import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'SysNevent - Eventos FATEC',
  description: 'Sistema de gerenciamento de eventos da FATEC',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: '#f1f1f1',
              color: '#131313',
              borderColor: 'rgba(255,255,255, 0.5)'
            }
          }}
        />
        {children}
      </body>
    </html>
  )
}

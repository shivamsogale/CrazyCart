import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import { Toaster } from "sonner"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CrazyCart - Your Ultimate Shopping Destination",
  description: "Discover extraordinary products with CrazyCart - where innovation meets elegance in online shopping",
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: '/CrazyCart.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/CrazyCart.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    apple: {
      url: '/CrazyCart.png',
      sizes: '180x180',
      type: 'image/png'
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
          }}
        />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"
import { LanguageProvider } from "@/context/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "DeepCalm AI — Free AI Psychological Counseling & Sleep Aid",
  description:
    "DeepCalm AI offers free AI-powered psychological counseling, anxiety analysis, and science-based sleep guidance. Nordic minimalist design, always free.",
  keywords: [
    "AI counseling",
    "sleep calculator",
    "anxiety relief",
    "mental health",
    "REM sleep",
    "cognitive restructuring",
    "free therapy",
  ],
  openGraph: {
    title: "DeepCalm AI — Free Psychological & Sleep Aid",
    description: "Free AI psychological counseling and science-based sleep guidance. Nordic minimalist, gentle companion.",
    type: "website",
    locale: "zh_CN",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

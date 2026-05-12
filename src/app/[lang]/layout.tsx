import type { Metadata } from "next"
import type { Locale } from "@/types"
import { LanguageProvider } from "@/context/LanguageContext"
import { ThemeProvider } from "@/context/ThemeContext"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import BackgroundCanvas from "@/components/BackgroundCanvas"
import Header from "@/components/Header"
import AudioFloatingTray from "@/components/AudioFloatingTray"

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  return {
    title: "DeepCalm AI — Midnight Sanctuary",
    description:
      "Find your calm in the quiet hours. AI-powered emotional support, sleep guidance, and a community that breathes with you.",
  }
}

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <LanguageProvider initialLocale={lang as Locale}>
      <ThemeProvider>
        <div className="dark min-h-screen bg-dc-deep text-dc-text">
          <BackgroundCanvas />
          <Header />
          {children}
          <ThemeSwitcher />
          <AudioFloatingTray />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

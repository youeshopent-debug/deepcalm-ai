import type { Metadata } from "next"
import { LanguageProvider } from "@/context/LanguageContext"
import Header from "@/components/Header"
import type { Locale } from "@/types"

const localeLabels: Record<Locale, string> = {
  zh: "zh-Hans",
  en: "en",
  ms: "ms",
  ja: "ja",
  ko: "ko",
  th: "th",
  es: "es",
}

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  const locales = Object.keys(localeLabels) as Locale[]
  const alternateUrls: Record<string, string> = {}
  const baseUrl = "https://deepcalm-ai.com"

  for (const locale of locales) {
    alternateUrls[localeLabels[locale]] = `${baseUrl}/${locale}`
  }

  return {
    title: "DeepCalm AI — Midnight Sanctuary",
    description:
      "Find your calm in the quiet hours. AI-powered emotional support, sleep guidance, and a community that breathes with you.",
    alternates: {
      languages: alternateUrls,
    },
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
      <div className="dark min-h-screen bg-dc-deep text-dc-text">
        <Header />
        {children}
      </div>
    </LanguageProvider>
  )
}

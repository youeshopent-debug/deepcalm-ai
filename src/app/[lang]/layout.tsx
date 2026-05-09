import type { Metadata } from "next"
import { LanguageProvider } from "@/context/LanguageContext"

export const metadata: Metadata = {
  title: "DeepCalm AI — Midnight Sanctuary",
  description:
    "Find your calm in the quiet hours. AI-powered emotional support, sleep guidance, and a community that breathes with you.",
}

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <LanguageProvider initialLocale={lang as "zh" | "en" | "ms"}>
      <div className="dark min-h-screen bg-dc-deep text-dc-text">{children}</div>
    </LanguageProvider>
  )
}

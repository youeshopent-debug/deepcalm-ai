import AudioFloatingTray from "@/components/AudioFloatingTray";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import BackgroundVideo from "@/components/BackgroundVideo";
import CookieConsent from "@/components/CookieConsent";
import Header from "@/components/Header";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import SitemapFooter from "@/components/SitemapFooter";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Locale } from "@/types";
import type { Metadata } from "next";

export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
  return {
    title: "DeepCalm AI — Midnight Sanctuary",
    description:
      "Find your calm in the quiet hours. AI-powered emotional support, sleep guidance, and a community that breathes with you.",
    metadataBase: new URL("https://deepcalm-ai.com"),
  }
}

const VALID_LOCALES: Locale[] = ['zh', 'en', 'ms', 'ja', 'ko', 'th', 'es']

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const safeLocale: Locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : 'zh'
  return (
    <LanguageProvider initialLocale={safeLocale} key={lang}>
      <ThemeProvider>
        <div className="dark min-h-screen bg-dc-deep text-dc-text">
          <BackgroundVideo theme="twilight" overlayOpacity={0.6} />
          <BackgroundCanvas videoMode={true} />
          <Header />
          {children}
          <SitemapFooter />
          <MedicalDisclaimer locale={safeLocale} />
          <ThemeSwitcher />
          <CookieConsent />
          <AudioFloatingTray />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

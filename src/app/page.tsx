"use client"

import { useCallback } from "react"

const LOCALE_COOKIE = "deepcalm-locale"

const languages = [
  {
    code: "zh",
    label: "中文",
    subtitle: "深夜庇护所 · AI 情绪陪伴",
    flag: "🇨🇳",
    description: "在寂静的深夜，AI 为您提供情感支持与睡眠指导。",
  },
  {
    code: "en",
    label: "English",
    subtitle: "Your Midnight Sanctuary",
    flag: "🇬🇧",
    description: "AI-powered emotional support & sleep guidance for the quiet hours.",
  },
  {
    code: "ms",
    label: "Bahasa Melayu",
    subtitle: "Kuil Tengah Malam Anda",
    flag: "🇲🇾",
    description: "Sokongan emosi dan panduan tidur berkuasa AI untuk waktu sunyi anda.",
  },
]

export default function LanguageLanding() {
  const selectLanguage = useCallback((code: string) => {
    document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
    window.location.href = `/${code}`
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dc-deep">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-gradient opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dc-aurora-1 rounded-full blur-[128px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dc-aurora-2 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-dc-muted mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-dc-accent animate-pulse" />
            DeepCalm AI
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-dc-text mb-3">
            Welcome · 欢迎 · Selamat Datang
          </h1>
          <p className="text-sm text-dc-muted max-w-md mx-auto">
            Choose your language to begin your journey.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className="group w-64 glass rounded-2xl p-6 text-left transition-all duration-300 hover:border-dc-accent/30 hover:shadow-[0_0_30px_-8px_var(--dc-accent)] cursor-pointer"
            >
              <div className="text-2xl mb-3">{lang.flag}</div>
              <div className="text-lg font-medium text-dc-text group-hover:text-dc-accent transition-colors mb-0.5">
                {lang.label}
              </div>
              <div className="text-xs text-dc-muted mb-2">{lang.subtitle}</div>
              <div className="text-xs text-dc-muted/60 leading-relaxed">
                {lang.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-6 text-xs text-dc-muted/40">
        DeepCalm AI &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}

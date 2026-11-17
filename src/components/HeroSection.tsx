"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useTheme, type ThemeType } from "@/context/ThemeContext"
import BreathingGuide from "./BreathingGuide"

const RELAX_LABELS: Record<string, string> = {
  zh: "🧘 1分钟快速放松",
  en: "🧘 1-Min Quick Relax",
  ms: "🧘 Relaksasi 1 Minit",
  ja: "🧘 1分クイックリラックス",
  ko: "🧘 1분 퀵 릴렉스",
  th: "🧘 ผ่อนคลายด่วน 1 นาที",
  es: "🧘 Relajación Rápida 1 Min",
}

const THEME_OPTIONS: { id: ThemeType; label: string; icon: string }[] = [
  { id: "forest", label: "Forest", icon: "🌲" },
  { id: "twilight", label: "Twilight", icon: "🌅" },
  { id: "deepsea", label: "Deep Sea", icon: "🌊" },
  { id: "starry", label: "Starry", icon: "✨" },
]

export default function HeroSection({
  title,
  subtitle,
  ctaText,
}: {
  title: string
  subtitle: string
  ctaText: string
}) {
  const [mounted, setMounted] = useState(false)
  const [showBreathing, setShowBreathing] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const { locale } = useLanguage()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentThemeLabel =
    THEME_OPTIONS.find((t) => t.id === theme) ||
    { id: "forest", label: "Forest", icon: "🌲" }

  return (
    <>
      <section className="relative min-h-[27vh] sm:min-h-[32vh] flex items-center justify-center px-3 pt-16 pb-4 sm:px-6">
        <div className="aurora-gradient pointer-events-none absolute inset-0" />

        <div className="relative z-20 mx-auto w-full max-w-3xl rounded-3xl border border-[#53746b] bg-[#132723] px-4 py-6 text-center shadow-xl sm:px-8 sm:py-7">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25443a] text-xs text-[#d6e8df] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c2f4df]" />
            Midnight Sanctuary
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#f4faf6] transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {title}
          </h1>

          <p className={`mt-5 text-base sm:text-lg text-[#d6e8df] leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {subtitle}
          </p>

          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button
              onClick={() => setShowBreathing(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#6e9888] bg-[#c2f4df] px-7 py-3 text-sm font-semibold text-[#132723] shadow-lg transition-colors hover:bg-[#d8f9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#377458]" />
              {RELAX_LABELS[locale] || RELAX_LABELS.en}
            </button>

            <a
              href="#ai-counselor"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#789588] bg-[#f8fcf9] px-6 py-3 text-sm font-semibold text-[#172a24] transition-colors hover:bg-[#e5f2e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {ctaText}
            </a>
          </div>

          {/* Theme selector */}
          <div className="relative mt-6 inline-flex items-center gap-1">
            <button
              type="button"
              aria-expanded={themeOpen}
              onClick={() => setThemeOpen((v) => !v)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#91b9ab] bg-[#203b33] px-3 text-sm text-[#f4faf6] transition-colors hover:bg-[#25443a]"
            >
              <span>{currentThemeLabel.icon}</span>
              <span>{currentThemeLabel.label}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${themeOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {themeOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 z-30 mt-2 grid w-56 grid-cols-2 gap-1 rounded-xl border border-[#91b9ab] bg-[#132723] p-1.5 shadow-xl">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setTheme(opt.id); setThemeOpen(false) }}
                    className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-[10px] transition-all ${
                      theme === opt.id
                        ? "bg-[#25443a] text-[#c2f4df]"
                        : "text-[#f4faf6] hover:bg-[#203b33]"
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Click-away handler for theme dropdown */}
      {themeOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setThemeOpen(false)}
        />
      )}

      {showBreathing && <BreathingGuide onClose={() => setShowBreathing(false)} />}
    </>
  )
}

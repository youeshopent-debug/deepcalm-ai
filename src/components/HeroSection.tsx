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
      <section className="relative min-h-[27vh] sm:min-h-[32vh] flex items-center justify-center overflow-hidden pt-14">
        <div className="aurora-gradient pointer-events-none absolute inset-0" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-dc-muted tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-dc-accent animate-pulse-soft" />
            Midnight Sanctuary
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-dc-text animate-breath-glow transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {title}
          </h1>

          <p className={`mt-5 text-base sm:text-lg text-dc-muted leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {subtitle}
          </p>

          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a
              href="#ai-counselor"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-dc-accent text-dc-deep font-semibold text-sm hover:bg-dc-accent/90 transition-all duration-300 shadow-lg shadow-dc-accent/20"
            >
              {ctaText}
            </a>

            <button
              onClick={() => setShowBreathing(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-dc-border/40 text-dc-text text-sm font-medium hover:bg-dc-accent/10 hover:border-dc-accent/30 transition-all duration-300 group"
            >
              <span className="w-2 h-2 rounded-full bg-dc-accent/60 group-hover:bg-dc-accent animate-pulse-soft transition-colors" />
              {RELAX_LABELS[locale] || RELAX_LABELS.en}
            </button>
          </div>

          {/* Theme selector */}
          <div className="relative mt-6 inline-flex items-center gap-1">
            <button
              onClick={() => setThemeOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-dc-border/30 text-dc-muted text-[11px] hover:text-dc-text hover:border-dc-accent/30 transition-all"
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
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex gap-1 p-1.5 glass border border-dc-border/30 rounded-xl shadow-xl z-20">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setTheme(opt.id); setThemeOpen(false) }}
                    className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-[10px] transition-all ${
                      theme === opt.id
                        ? "bg-dc-accent/15 text-dc-accent"
                        : "text-dc-muted hover:text-dc-text hover:bg-dc-surface/60"
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

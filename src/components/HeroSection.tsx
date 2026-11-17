"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
  const [showBreathing, setShowBreathing] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const { locale, tt } = useLanguage()
  const { theme, setTheme } = useTheme()

  const currentThemeLabel =
    THEME_OPTIONS.find((t) => t.id === theme) ||
    { id: "forest", label: "Forest", icon: "🌲" }

  return (
    <>
      <section className="relative z-20 mx-auto max-w-6xl px-4 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
        <div className="relative grid rounded-3xl border border-[#709488] bg-[#132723]/90 shadow-xl md:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 px-5 py-8 sm:px-9 sm:py-12">
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-[#f4faf6] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d6e8df] sm:text-lg">
              {subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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
                <div className="absolute top-full left-0 z-30 mt-2 grid w-56 grid-cols-2 gap-1 rounded-xl border border-[#91b9ab] bg-[#132723] p-1.5 shadow-xl">
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
          <div className="relative isolate flex min-h-40 items-end overflow-hidden rounded-b-3xl p-4 sm:p-6 md:rounded-bl-none md:rounded-r-3xl">
            <Image src="/images/sleep-forest.webp" alt="" fill priority sizes="(min-width: 768px) 45vw, 100vw" className="-z-20 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#10221c]/85 to-transparent" />
            <div className="flex flex-wrap gap-2">
              <Link href={`/${locale}/library`} className="rounded-xl bg-[#f8fcf9] px-4 py-2.5 text-sm font-semibold text-[#172a24] hover:bg-[#e5f2e9]">
                {tt("nav.library")} <span aria-hidden="true">→</span>
              </Link>
              {locale === "zh" && (
                <a href="/zh/downloads/sleep-diary.csv" download className="rounded-xl bg-[#203b33] px-4 py-2.5 text-sm font-semibold text-[#f4faf6] hover:bg-[#25443a]">
                  下载 7 天睡眠日记
                </a>
              )}
              {locale === "en" && (
                <a href="/en/downloads/sleep-diary.csv" download className="rounded-xl bg-[#203b33] px-4 py-2.5 text-sm font-semibold text-[#f4faf6] hover:bg-[#25443a]">
                  Download sleep diary
                </a>
              )}
            </div>
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

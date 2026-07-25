"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import type { Locale } from "@/types"
import { usePathname, useRouter } from "next/navigation"

const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "es", label: "Español", flag: "🇪🇸" },
]

export default function GlobeLangSwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { locale, setLocale } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function switchTo(code: Locale) {
    setLocale(code)
    setOpen(false)
    const segments = pathname.split("/")
    segments[1] = code
    router.push(segments.join("/"))
  }

  const current = locales.find((l) => l.code === locale) || locales[1]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-xs">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-48 py-1.5 bg-dc-surface/90 backdrop-blur-xl border border-dc-border rounded-xl shadow-2xl z-[200]">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors ${
                locale === l.code
                  ? "text-dc-accent bg-dc-accent/10"
                  : "text-dc-text/70 hover:text-dc-text hover:bg-white/5"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
              {locale === l.code && <span className="ml-auto text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

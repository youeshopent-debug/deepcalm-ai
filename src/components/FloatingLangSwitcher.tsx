"use client"

import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useRouter, usePathname } from "next/navigation"
import { Globe, X } from "lucide-react"
import type { Locale } from "@/types"

const locales: { code: Locale; label: string; emoji: string }[] = [
  { code: "zh", label: "中文", emoji: "🇨🇳" },
  { code: "en", label: "English", emoji: "🇬🇧" },
  { code: "ms", label: "Bahasa Melayu", emoji: "🇲🇾" },
  { code: "ja", label: "日本語", emoji: "🇯🇵" },
  { code: "ko", label: "한국어", emoji: "🇰🇷" },
  { code: "th", label: "ไทย", emoji: "🇹🇭" },
  { code: "es", label: "Español", emoji: "🇪🇸" },
]

export default function FloatingLangSwitcher() {
  const [open, setOpen] = useState(false)
  const { locale, setLocale } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const switchTo = (code: Locale) => {
    setLocale(code)
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length > 0 && ["zh", "en", "ms", "ja", "ko", "th", "es"].includes(segments[0])) {
      segments[0] = code
    } else {
      segments.unshift(code)
    }
    router.replace(`/${segments.join("/")}`)
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {open && (
        <div className="absolute bottom-16 right-0 glass-strong rounded-2xl p-2 min-w-[180px] shadow-xl border border-dc-border-glow animate-fade-in-up">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                locale === l.code
                  ? "bg-dc-accent/15 text-dc-accent font-semibold"
                  : "text-dc-muted hover:text-dc-text hover:bg-dc-surface/60"
              }`}
            >
              <span className="text-lg">{l.emoji}</span>
              <span>{l.label}</span>
              {locale === l.code && (
                <span className="ml-auto w-2 h-2 rounded-full bg-dc-accent" />
              )}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full glass-strong flex items-center justify-center shadow-lg border border-dc-border-glow hover:border-dc-accent/40 transition-all duration-200"
        aria-label="Switch language"
      >
        {open ? (
          <X className="w-5 h-5 text-dc-accent" />
        ) : (
          <Globe className="w-5 h-5 text-dc-accent" />
        )}
      </button>
    </div>
  )
}

"use client"

import { useLanguage } from "@/context/LanguageContext"
import { useRouter, usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import type { Locale } from "@/types"

const locales: { code: Locale; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
  { code: "ms", label: "Bahasa Melayu" },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const switchTo = (code: Locale) => {
    setLocale(code)
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length > 0 && ["zh", "en", "ms"].includes(segments[0])) {
      segments[0] = code
    } else {
      segments.unshift(code)
    }
    router.replace(`/${segments.join("/")}`)
  }

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-4 h-4 text-nord-muted" />
      <div className="flex gap-1">
        {locales.map((l) => (
          <button
            key={l.code}
            onClick={() => switchTo(l.code)}
            className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${
              locale === l.code
                ? "bg-nord-accent/20 text-nord-accent font-medium"
                : "text-nord-muted hover:text-nord-text hover:bg-nord-surface/50"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  )
}

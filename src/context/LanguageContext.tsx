"use client"

import { getDict, tt as t } from "@/lib/getDict";
import type { Locale } from "@/types";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  dict: Record<string, unknown>
  tt: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)
const FALLBACK_EN = getDict("en")
const FALLBACK_ZH = getDict("zh")

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || "en")
  const [dict, setDict] = useState<Record<string, unknown>>(() => {
    const d = getDict(initialLocale || "en")
    return d
  })

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    const d = getDict(newLocale)
    setDict(d)
    if (typeof window !== "undefined") {
      localStorage.setItem("deepcalm-locale", newLocale)
      document.cookie = `deepcalm-locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
    }
  }, [])

  const tt = useCallback(
    (path: string): string => {
      const primary = t(dict, path)
      if (primary) return primary

      const fallback = t(FALLBACK_EN, path) || t(FALLBACK_ZH, path)
      if (fallback) return fallback

      if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
        console.warn(`[LanguageContext] tt("${path}") missing in all dictionaries.`)
      }
      return ""
    },
    [dict]
  )

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict, tt }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}

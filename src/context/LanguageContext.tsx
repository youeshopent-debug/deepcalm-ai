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
    if (typeof window !== "undefined") {
      console.log("[LanguageContext] init dict locale:", initialLocale || "en", "keys:", Object.keys(d))
    }
    return d
  })

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    const d = getDict(newLocale)
    if (typeof window !== "undefined") {
      console.log("[LanguageContext] setLocale →", newLocale, "keys:", Object.keys(d))
    }
    setDict(d)
    if (typeof window !== "undefined") {
      localStorage.setItem("deepcalm-locale", newLocale)
      document.cookie = `deepcalm-locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
    }
  }, [])

  const tt = useCallback(
    (path: string): string => {
      const result = t(dict, path)
      if (typeof window !== "undefined" && !result) {
        console.warn(`[LanguageContext] tt("${path}") returned empty. dict keys:`, Object.keys(dict))
      }
      return result
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

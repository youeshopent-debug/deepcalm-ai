"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Locale } from "@/types"
import { getDictionary, t } from "@/lib/i18n"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  dict: Record<string, unknown>
  tt: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh")
  const [dict, setDict] = useState<Record<string, unknown>>(getDictionary("zh"))

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setDict(getDictionary(newLocale))
    if (typeof window !== "undefined") {
      localStorage.setItem("deepcalm-locale", newLocale)
    }
  }, [])

  const tt = useCallback(
    (path: string): string => t(dict, path),
    [dict]
  )

  useEffect(() => {
    const stored = localStorage.getItem("deepcalm-locale") as Locale | null
    if (stored && ["zh", "en", "ms"].includes(stored)) {
      setLocale(stored)
    }
  }, [setLocale])

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

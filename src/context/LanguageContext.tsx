"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Locale } from "@/types"
import { getDict, tt as t } from "@/lib/getDict"

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
  const [locale, setLocaleState] = useState<Locale>(initialLocale || "zh")
  const [dict, setDict] = useState<Record<string, unknown>>(getDict(initialLocale || "zh"))

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setDict(getDict(newLocale))
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
    if (stored && ["zh", "en", "ms"].includes(stored) && stored !== locale) {
      setLocale(stored)
    }
  }, [setLocale, locale])

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

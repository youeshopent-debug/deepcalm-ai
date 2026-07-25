"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const VALID_LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"]

/**
 * Reads the locale from the URL pathname (first segment) and sets
 * document.documentElement.lang on the client side.
 * This ensures SSR-served HTML always carries a valid lang attribute
 * even before the LanguageProvider hydration completes.
 */
export default function HtmlLangSetter() {
  const pathname = usePathname()
  const firstSegment = pathname.split("/").filter(Boolean)[0] || ""
  const locale = VALID_LOCALES.includes(firstSegment) ? firstSegment : "en"

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}

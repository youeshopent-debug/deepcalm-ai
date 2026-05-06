import type { Locale } from "@/types"

import ms from "../../public/locales/ms.json"
import zh from "../../public/locales/zh.json"
import en from "../../public/locales/en.json"

const dictionaries: Record<Locale, Record<string, unknown>> = {
  zh: zh as Record<string, unknown>,
  en: en as Record<string, unknown>,
  ms: ms as Record<string, unknown>,
}

export function getDictionary(locale: Locale): Record<string, unknown> {
  return dictionaries[locale]
}

export function t(
  dict: Record<string, unknown>,
  path: string
): string {
  const keys = path.split(".")
  let result: unknown = dict
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      return path
    }
  }
  return typeof result === "string" ? result : path
}

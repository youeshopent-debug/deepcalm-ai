import type { Locale } from "@/types"

import zh from "../../dictionaries/zh.json"
import en from "../../dictionaries/en.json"
import ms from "../../dictionaries/ms.json"

const dictionaries: Record<Locale, any> = {
  zh,
  en,
  ms,
}

export function getDict(locale: Locale): any {
  return dictionaries[locale]
}

export function tt(dict: any, path: string): string {
  const keys = path.split(".")
  let result = dict
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key]
    } else {
      return path
    }
  }
  return typeof result === "string" ? result : path
}

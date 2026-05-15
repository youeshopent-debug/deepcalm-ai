import type { Locale } from "@/types";

import en from "../../dictionaries/en.json";
import es from "../../dictionaries/es.json";
import ja from "../../dictionaries/ja.json";
import ko from "../../dictionaries/ko.json";
import ms from "../../dictionaries/ms.json";
import th from "../../dictionaries/th.json";
import zh from "../../dictionaries/zh.json";

const dictionaries: Record<Locale, any> = {
  zh,
  en,
  ms,
  ja,
  ko,
  th,
  es,
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
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] 缺失翻译键: "${path}"`)
      }
      return ""
    }
  }
  if (typeof result === "string") return result
  if (process.env.NODE_ENV === "development") {
    console.warn(`[i18n] 翻译值非字符串: "${path}"`, result)
  }
  return ""
}

import { getAllSlugs } from "@/content/topics"
import type { Locale } from "@/types"
import type { MetadataRoute } from "next"

const BASE_URL = "https://deepcalm-ai.com"
const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

/** 静态引导页 slug（不在 topicMeta 中，属于独立页面） */
const STATIC_GUIDE_SLUGS = ["cbt-i-7day-plan", "sleep-science-guide"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const topicSlugs = getAllSlugs() // 58 个 slug
  const entries: MetadataRoute.Sitemap = []

  // 1. 根页面（每个 locale 首页 + 默认根路径）
  //    ┌─ 默认根路径: https://deepcalm-ai.com
  //    ├─ /zh, /en, /ms, /ja, /ko, /th, /es
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  })
  for (const lang of locales) {
    entries.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })
  }

  // 2. Topic 页面: /[lang]/topic/[slug] (7 × 58 = 406 条)
  for (const lang of locales) {
    for (const slug of topicSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/topic/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })
    }
  }

  // 3. Library 页面: /[lang]/library/[slug] (7 × 58 = 406 条)
  for (const lang of locales) {
    for (const slug of topicSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/library/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  // 4. 独立引导页（不在 topicMeta 内）: /[lang]/library/cbt-i-7day-plan, sleep-science-guide (7 × 2 = 14 条)
  for (const lang of locales) {
    for (const slug of STATIC_GUIDE_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${lang}/library/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return entries
}

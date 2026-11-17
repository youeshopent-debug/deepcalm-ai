import { getAllSlugs } from "@/content/topics"
import type { Locale } from "@/types"
import type { MetadataRoute } from "next"

const BASE_URL = "https://deepcalm-ai.com"
const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

/** 静态引导页 slug（不在 topicMeta 中，属于独立页面） */
const STATIC_GUIDE_SLUGS = ["cbt-i-7day-plan", "sleep-science-guide"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const topicSlugs = getAllSlugs()
  const entries: MetadataRoute.Sitemap = []

  // Language homepages are canonical. The root redirects.
  for (const lang of locales) {
    entries.push({
      url: `${BASE_URL}/${lang}`,
      changeFrequency: "weekly",
      priority: 0.9,
    })
  }

  for (const lang of locales) {
    for (const page of ["support", "tools"]) {
      entries.push({ url: `${BASE_URL}/${lang}/${page}` })
    }
  }

  // Topic routes declare the corresponding library page as canonical.
  for (const lang of locales) {
    for (const slug of topicSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/library/${slug}`,
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
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return entries
}

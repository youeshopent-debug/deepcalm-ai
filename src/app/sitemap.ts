import type { MetadataRoute } from "next"
import { getGuides } from "@/content/guides"
import { getAnxietyScenarios } from "@/content/anxiety-scenarios"

const LANGS = ["zh", "en", "ms", "ja", "ko", "th", "es"]
const BASE = "https://deepcalm-ai.com"

function langAlternates(path: string = ""): Record<string, string> {
  return Object.fromEntries(LANGS.map((lang) => [lang, `${BASE}/${lang}${path}`]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of LANGS) {
    entries.push({
      url: `${BASE}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: langAlternates() },
    })
    entries.push({
      url: `${BASE}/${lang}/guide`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: { languages: langAlternates("/guide") },
    })
    entries.push({
      url: `${BASE}/${lang}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: { languages: langAlternates("/privacy") },
    })
    entries.push({
      url: `${BASE}/${lang}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: { languages: langAlternates("/terms") },
    })
    entries.push({
      url: `${BASE}/${lang}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: langAlternates("/about") },
    })
  }

  for (const guide of getGuides()) {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}/guide/${guide.slug}`,
        lastModified: new Date(guide.publishedAt),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: langAlternates(`/guide/${guide.slug}`) },
      })
    }
  }

  for (const scenario of getAnxietyScenarios()) {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}/anxiety/${scenario.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: langAlternates(`/anxiety/${scenario.slug}`) },
      })
    }
  }

  return entries
}

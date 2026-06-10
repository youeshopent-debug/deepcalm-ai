import type { MetadataRoute } from "next"
import { getGuides } from "@/content/guides"
import { getAnxietyScenarios } from "@/content/anxiety-scenarios"
import { getAllSlugs } from "@/content/topics"

export const dynamic = "force-dynamic"

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
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: langAlternates("") },
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
    entries.push({
      url: `${BASE}/${lang}/sanctuary`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: { languages: langAlternates("/sanctuary") },
    })
  }

  try {
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
  } catch {}

  try {
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
  } catch {}

  for (const lang of LANGS) {
    entries.push({
      url: `${BASE}/${lang}/library`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: { languages: langAlternates("/library") },
    })
  }

  try {
    for (const slug of getAllSlugs()) {
      for (const lang of LANGS) {
        entries.push({
          url: `${BASE}/${lang}/library/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: { languages: langAlternates(`/library/${slug}`) },
        })
      }
    }
  } catch {}

  // Standalone library pages not covered by getAllSlugs()
  try {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}/library/sleep-science-guide`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: langAlternates("/library/sleep-science-guide") },
      })
    }
  } catch {}

  return entries
}

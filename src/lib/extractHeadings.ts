import type { TopicContent } from "@/content/topics"

export interface TocHeading {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u0e00-\u0e7f]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function extractHeadings(content: TopicContent): TocHeading[] {
  const headings: TocHeading[] = []

  // Science section — always present
  headings.push({ id: "science", text: "science", level: 2 })

  // FitnessGuide — extract ## prefixed subheadings
  const guideLines = content.fitnessGuide.split("\n")
  for (const line of guideLines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).trim()
      const id = slugify(text)
      headings.push({ id, text, level: 3 })
    }
  }

  // FAQ section
  if (content.faqItems.length > 0) {
    headings.push({ id: "faq", text: "faq", level: 2 })
    content.faqItems.forEach((item, i) => {
      const id = `faq-${i}`
      const text = item.q.length > 60 ? item.q.slice(0, 57) + "..." : item.q
      headings.push({ id, text, level: 3 })
    })
  }

  return headings
}

export function getTocLabel(locale: string): string {
  const labels: Record<string, string> = {
    zh: "📖 目录",
    en: "📖 Contents",
    ms: "📖 Kandungan",
    ja: "📖 目次",
    ko: "📖 목차",
    th: "📖 สารบัญ",
    es: "📖 Contenido",
  }
  return labels[locale] || labels.en
}

import type { Locale } from "@/types"

const BASE = "https://deepcalm-ai.com"

interface FaqItem {
  q: string
  a: string
}

interface TopicData {
  title: string
  description: string
  keywords: string
  category: string
}

const SLUG_TO_EN: Record<string, string> = {
  sleep: "Sleep",
  anxiety: "Anxiety",
  grief_loss: "Grief & Loss",
  loneliness: "Loneliness",
  self_worth: "Self-Worth",
  relationships: "Relationships",
  identity: "Identity",
  mindfulness: "Mindfulness",
  emotional_health: "Emotional Health",
}

export function WebsiteJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DeepCalm AI",
    url: BASE,
    description:
      "AI-powered emotional support, breathing exercises, and mental wellness guidance. Find your calm in the quiet hours.",
    inLanguage: ["zh", "en", "ms", "ja", "ko", "th", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/{lang}/topic/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DeepCalm AI",
    url: BASE,
    description: "AI-powered emotional support and mental wellness platform.",
    foundingDate: "2025",
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

interface TopicJsonLdProps {
  locale: Locale
  slug: string
  topic: TopicData
  faqItems: FaqItem[]
  datePublished?: string
}

export function TopicJsonLd({ locale, slug, topic, faqItems, datePublished }: TopicJsonLdProps) {
  const pageUrl = `${BASE}/${locale}/topic/${slug}`
  const catLabel = SLUG_TO_EN[topic.category] || topic.category

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: topic.title,
      description: topic.description,
      keywords: topic.keywords,
      url: pageUrl,
      datePublished: datePublished || "2025-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: locale,
      about: { "@type": "Thing", name: catLabel },
      isPartOf: { "@type": "WebPage", "@id": pageUrl, url: pageUrl, inLanguage: locale },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#medical`,
      headline: topic.title,
      description: topic.description,
      url: pageUrl,
      inLanguage: locale,
      about: { "@type": "MedicalCondition", name: catLabel },
      isPartOf: { "@type": "WebPage", "@id": pageUrl },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    },
  ]

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
      isPartOf: { "@type": "WebPage", "@id": pageUrl },
    })
  }

  const json = { "@context": "https://schema.org", "@graph": graph }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

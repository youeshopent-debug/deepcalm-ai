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
    "@id": `${BASE}#organization`,
    name: "DeepCalm AI",
    url: BASE,
    description: "AI-powered emotional support and mental wellness platform. Evidence-based sleep guidance, anxiety management, and emotional fitness through cognitive science and AI technology.",
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      "@id": `${BASE}#person`,
      name: "DeepCalm AI Health Team",
    },
    sameAs: [
      "https://github.com/deepcalm-ai",
      "https://twitter.com/deepcalm_ai",
      "https://www.linkedin.com/company/deepcalm-ai",
      "https://www.instagram.com/deepcalm.ai",
      "https://www.facebook.com/deepcalm.ai",
      "https://www.youtube.com/@deepcalm-ai",
      "https://medium.com/@deepcalm-ai",
    ],
    knowsAbout: ["Sleep Science", "Anxiety Management", "Emotional Health", "Cognitive Behavioral Therapy", "Neuroscience", "Mindfulness"],
    areaServed: "Worldwide",
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

export function PersonJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}#person`,
    name: "DeepCalm AI Health Team",
    description: "Multidisciplinary team of clinical psychologists, neuroscientists, and AI engineers dedicated to making evidence-based mental health support accessible to everyone, anytime.",
    url: `${BASE}/en/about`,
    knowsAbout: ["Clinical Psychology", "Neuroscience", "Sleep Medicine", "Cognitive Behavioral Therapy", "Anxiety Disorders", "Emotional Regulation", "Mindfulness-Based Interventions", "AI in Mental Health"],
    alumniOf: {
      "@type": "Organization",
      name: "DeepCalm AI Research",
    },
    affiliation: {
      "@type": "Organization",
      "@id": `${BASE}#organization`,
    },
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
  const today = new Date().toISOString().split("T")[0]

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: topic.title,
      description: topic.description,
      keywords: topic.keywords,
      url: pageUrl,
      datePublished: datePublished || "2025-01-01",
      dateModified: today,
      inLanguage: locale,
      about: { "@type": "Thing", name: catLabel },
      isPartOf: { "@type": "WebPage", "@id": pageUrl, url: pageUrl, inLanguage: locale },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      author: {
        "@type": "Person",
        "@id": `${BASE}#person`,
        name: "DeepCalm AI Health Team",
        url: `${BASE}/en/about`,
        description: "AI-powered emotional support and mental wellness platform team, combining expertise in clinical psychology, neuroscience, and AI technology.",
      },
      publisher: {
        "@type": "Organization",
        "@id": `${BASE}#organization`,
        name: "DeepCalm AI",
        url: BASE,
      },
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
      author: {
        "@type": "Person",
        "@id": `${BASE}#person`,
        name: "DeepCalm AI Health Team",
        url: `${BASE}/en/about`,
      },
      reviewedBy: {
        "@type": "Person",
        name: "DeepCalm AI Clinical Review Board",
        description: "Multidisciplinary team of clinical psychologists, neuroscientists, and mental health researchers ensuring evidence-based accuracy of all content.",
      },
      lastReviewed: today,
      medicalSpecialty: {
        "@type": "MedicalSpecialty",
        name: "MentalHealth",
      },
      audience: {
        "@type": "Audience",
        audienceType: "Adults experiencing sleep difficulties, anxiety, or emotional distress",
      },
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

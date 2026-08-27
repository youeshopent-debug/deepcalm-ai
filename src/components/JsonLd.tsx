import type { Locale } from "@/types"
import { PRIMARY_REVIEWER } from "@/data/medical-review-board"

const BASE = "https://deepcalm-ai.com"

export interface FaqItem {
  q: string
  a: string
}

interface TopicData {
  title: string
  description: string
  keywords: string
  category: string
  image?: string
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
  references?: string[]
}

export function TopicJsonLd({ locale, slug, topic, faqItems, datePublished, references }: TopicJsonLdProps) {
  const pageUrl = `${BASE}/${locale}/topic/${slug}`
  const catLabel = SLUG_TO_EN[topic.category] || topic.category
  const today = new Date().toISOString().split("T")[0]

  const imageUrl = topic.image || `https://deepcalm-ai.com/og-images/library/${slug}.png`

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
      /** speakable — Google 推荐的 TTS 结构化数据，标识可朗读内容区域，增强无障碍和 AMP 合规 */
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#science", "#faq"],
      },
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
      author: {
        "@type": "Person",
        "@id": `${BASE}#reviewer-${PRIMARY_REVIEWER.id}`,
        name: PRIMARY_REVIEWER.name,
        url: PRIMARY_REVIEWER.linkedin,
        jobTitle: PRIMARY_REVIEWER.title.en,
        description: PRIMARY_REVIEWER.bio.en,
        sameAs: PRIMARY_REVIEWER.linkedin,
        knowsAbout: PRIMARY_REVIEWER.specialties.en,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${BASE}#organization`,
        name: "DeepCalm AI",
        url: BASE,
      },
      /** citation — 将参考文献注入 Article schema，强化 E-E-A-T 信号 */
      ...(references && references.length > 0
        ? { citation: references.map((r) => ({ "@type": "CreativeWork", url: r })) }
        : {}),
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
        "@id": `${BASE}#reviewer-${PRIMARY_REVIEWER.id}`,
        name: PRIMARY_REVIEWER.name,
        url: PRIMARY_REVIEWER.linkedin,
        jobTitle: PRIMARY_REVIEWER.title.en,
      },
      reviewedBy: {
        "@type": "Person",
        "@id": `${BASE}#reviewer-${PRIMARY_REVIEWER.id}`,
        name: PRIMARY_REVIEWER.name,
        url: PRIMARY_REVIEWER.linkedin,
        jobTitle: PRIMARY_REVIEWER.title.en,
        description: PRIMARY_REVIEWER.bio.en,
        sameAs: PRIMARY_REVIEWER.linkedin,
        knowsAbout: PRIMARY_REVIEWER.specialties.en,
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
      ...(references && references.length > 0
        ? { citation: references.map((r) => ({ "@type": "MedicalWebPage", url: r })) }
        : {}),
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
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    })
  }

  const json = { "@context": "https://schema.org", "@graph": graph }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

const SANCTUARY_NAME: Record<Locale, string> = {
  zh: "DeepCalm AI 心灵庇护所",
  en: "DeepCalm AI Sanctuary",
  ms: "Tempat Perlindungan AI DeepCalm",
  ja: "DeepCalm AIサンクチュアリ",
  ko: "DeepCalm AI 성소",
  th: "สถานที่ศักดิ์สิทธิ์ DeepCalm AI",
  es: "Santuario AI DeepCalm",
}

const SANCTUARY_DESC: Record<Locale, string> = {
  zh: "用认知科学重塑睡眠、用神经生物学化解焦虑。24/7 AI 陪伴，无需预约，没有评判。",
  en: "Reimagining sleep through cognitive science, dissolving anxiety through neurobiology. 24/7 AI companionship, no judgment.",
  ms: "Membentuk semula tidur melalui sains kognitif, meleraikan kebimbangan melalui neurobiologi. Teman AI 24/7, tanpa penghakiman.",
  ja: "認知科学で睡眠を再構築し、神経生物学で不安を溶解。24時間AI伴侶、判断なし。",
  ko: "인지과학으로 수면을 재구성하고 신경생물학으로 불안을 녹입니다. 24/7 AI 동반자, 판단 없이.",
  th: "ปรับโครงสร้างการนอนด้วยวิทยาศาสตร์การรู้คิด ละลายความวิตกกังวลด้วยประสาทชีววิทยา ผู้ร่วมทาง AI ตลอด 24 ชั่วโมง ไม่มีการตัดสิน",
  es: "Rediseñando el sueño a través de la ciencia cognitiva, disolviendo la ansiedad a través de la neurobiología. Acompañante AI 24/7, sin juicios.",
}

export function SanctuaryWebPageJsonLd({ locale }: { locale: Locale }) {
  const pageUrl = `${BASE}/${locale}/sanctuary`
  const today = new Date().toISOString().split("T")[0]

  const json = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: SANCTUARY_NAME[locale] || SANCTUARY_NAME.en,
    description: SANCTUARY_DESC[locale] || SANCTUARY_DESC.en,
    inLanguage: locale,
    isPartOf: { "@id": `${BASE}#website` },
    about: { "@type": "Thing", name: "Mental Health & Sleep Wellness" },
    dateModified: today,
    reviewedBy: {
      "@type": "Person",
      "@id": `${BASE}#reviewer-${PRIMARY_REVIEWER.id}`,
      name: PRIMARY_REVIEWER.name,
      url: PRIMARY_REVIEWER.linkedin,
      jobTitle: PRIMARY_REVIEWER.title.en,
      description: PRIMARY_REVIEWER.bio.en,
      sameAs: PRIMARY_REVIEWER.linkedin,
      knowsAbout: PRIMARY_REVIEWER.specialties.en,
    },
    lastReviewed: today,
    audience: {
      "@type": "Audience",
      audienceType: "Adults experiencing sleep difficulties, anxiety, or emotional distress",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

/**
 * Standalone FAQPage JSON-LD — inject into any page that needs FAQ schema.
 * Returns null when items array is empty (no empty <script> tags).
 */
export function FaqJsonLd({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  if (items.length === 0) return null

  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

/**
 * Standalone MedicalWebPage JSON-LD — signals medical/health vertical to Google.
 * Use on home page and sanctuary to boost E-E-A-T for health-related queries.
 */
export function MedicalWebPageJsonLd({ locale }: { locale: Locale }) {
  const pageUrl = `${BASE}/${locale}`
  const today = new Date().toISOString().split("T")[0]

  const json = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${pageUrl}#medical`,
    headline: "DeepCalm AI — Emotional Support & Sleep Wellness Platform",
    description:
      "AI-powered emotional support platform offering evidence-based sleep guidance, anxiety management, and emotional wellness through cognitive science and 24/7 AI companionship.",
    url: pageUrl,
    inLanguage: locale,
    about: { "@type": "MedicalCondition", name: "Mental Health" },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    reviewedBy: {
      "@type": "Person",
      "@id": `${BASE}#reviewer-${PRIMARY_REVIEWER.id}`,
      name: PRIMARY_REVIEWER.name,
      url: PRIMARY_REVIEWER.linkedin,
      jobTitle: PRIMARY_REVIEWER.title.en,
      description: PRIMARY_REVIEWER.bio.en,
      sameAs: PRIMARY_REVIEWER.linkedin,
      knowsAbout: PRIMARY_REVIEWER.specialties.en,
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
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

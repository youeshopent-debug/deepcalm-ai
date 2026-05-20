import type { Locale } from "@/types"
import { getTopics } from "@/content/topics"
import LibraryCard from "./LibraryCard"

interface LibraryPreviewProps {
  locale: Locale
}

const PREVIEW_SLUGS = ["insomnia", "deep-sleep", "stress-relief", "meditation-basics", "cbt-essentials", "mindful-eating"]

const SECTION_TEXT: Record<Locale, { heading: string; sub: string }> = {
  zh: {
    heading: "📚 深夜智慧馆",
    sub: "44 篇由睡眠科学、认知行为疗法与正念研究驱动的深度文章，陪你探索内心世界的每个角落。",
  },
  en: {
    heading: "📚 Midnight Wisdom Library",
    sub: "44 science-backed articles on sleep, anxiety, mindfulness, and emotional health — curated by DeepCalm AI.",
  },
  ms: {
    heading: "📚 Perpustakaan Kebijaksanaan Tengah Malam",
    sub: "44 artikel mendalam tentang tidur, kebimbangan, kesedaran, dan kesihatan emosi — disusun oleh DeepCalm AI.",
  },
  ja: {
    heading: "📚 深夜の知恵図書館",
    sub: "睡眠科学、認知行動療法、マインドフルネスに基づく44の深い記事。DeepCalm AIが厳選しました。",
  },
  ko: {
    heading: "📚 심야 지혜 도서관",
    sub: "수면 과학, 인지행동치료, 마음챙김에 기반한 44편의 깊이 있는 글을 만나보세요.",
  },
  th: {
    heading: "📚 ห้องสมุดแห่งปัญญายามค่ำคืน",
    sub: "44 บทความเชิงลึกเกี่ยวกับการนอนหลับ ความวิตกกังวล การมีสติ และสุขภาพทางอารมณ์ โดย DeepCalm AI",
  },
  es: {
    heading: "📚 Biblioteca de la Sabiduría Nocturna",
    sub: "44 artículos profundos sobre sueño, ansiedad, atención plena y salud emocional — seleccionados por DeepCalm AI.",
  },
}

export default function LibraryPreview({ locale }: LibraryPreviewProps) {
  const allTopics = getTopics(locale)
  const featured = allTopics.filter((t) => PREVIEW_SLUGS.includes(t.slug))
  const text = SECTION_TEXT[locale] || SECTION_TEXT.en

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-nord-bg via-nord-card/30 to-nord-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-nord-text mb-3">{text.heading}</h2>
          <p className="text-nord-text/50 max-w-2xl mx-auto leading-relaxed">{text.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((topic) => (
            <LibraryCard
              key={topic.slug}
              slug={topic.slug}
              title={topic.title}
              description={topic.description}
              category={topic.category}
              locale={locale}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={`/${locale}/library`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-nord-accent/10 hover:bg-nord-accent/20
              text-nord-accent font-medium rounded-xl border border-nord-accent/20
              hover:border-nord-accent/40 transition-all duration-300 text-sm"
          >
            Browse all 44 topics →
          </a>
        </div>
      </div>
    </section>
  )
}

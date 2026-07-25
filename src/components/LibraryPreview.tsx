import type { Locale } from "@/types"
import { getTopics } from "@/content/topics"
import Link from "next/link"

interface LibraryPreviewProps {
  locale: Locale
}

const SECTION_TEXT: Record<Locale, { heading: string; sub: string }> = {
  zh: {
    heading: "深夜智慧馆",
    sub: "44 篇科学驱动深度文章，覆盖睡眠、焦虑、情绪健康等主题。",
  },
  en: {
    heading: "Midnight Wisdom Library",
    sub: "44 science-backed articles on sleep, anxiety, mindfulness, and emotional health.",
  },
  ms: {
    heading: "Perpustakaan Kebijaksanaan Tengah Malam",
    sub: "44 artikel mendalam tentang tidur, kebimbangan, kesedaran, dan kesihatan emosi.",
  },
  ja: {
    heading: "深夜の知恵図書館",
    sub: "睡眠科学、認知行動療法、マインドフルネスに基づく44の深い記事。",
  },
  ko: {
    heading: "심야 지혜 도서관",
    sub: "수면 과학, 인지행동치료, 마음챙김에 기반한 44편의 깊이 있는 글.",
  },
  th: {
    heading: "ห้องสมุดแห่งปัญญายามค่ำคืน",
    sub: "44 บทความเชิงลึกเกี่ยวกับการนอนหลับ ความวิตกกังวล การมีสติ และสุขภาพทางอารมณ์",
  },
  es: {
    heading: "Biblioteca de la Sabiduría Nocturna",
    sub: "44 artículos profundos sobre sueño, ansiedad, atención plena y salud emocional.",
  },
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  zh: { sleep: "睡眠", anxiety: "焦虑", grief_loss: "失落", loneliness: "孤独", self_worth: "自我价值", relationships: "关系", identity: "身份", mindfulness: "正念", emotional_health: "情绪健康" },
  en: { sleep: "Sleep", anxiety: "Anxiety", grief_loss: "Grief & Loss", loneliness: "Loneliness", self_worth: "Self-Worth", relationships: "Relationships", identity: "Identity", mindfulness: "Mindfulness", emotional_health: "Emotional Health" },
  ms: { sleep: "Tidur", anxiety: "Kebimbangan", grief_loss: "Kehilangan", loneliness: "Kesepian", self_worth: "Harga Diri", relationships: "Hubungan", identity: "Identiti", mindfulness: "Kesedaran", emotional_health: "Kesihatan Emosi" },
  ja: { sleep: "睡眠", anxiety: "不安", grief_loss: "喪失", loneliness: "孤独", self_worth: "自己価値", relationships: "人間関係", identity: "アイデンティティ", mindfulness: "マインドフルネス", emotional_health: "感情的健康" },
  ko: { sleep: "수면", anxiety: "불안", grief_loss: "상실", loneliness: "외로움", self_worth: "자존감", relationships: "관계", identity: "정체성", mindfulness: "마음챙김", emotional_health: "정서 건강" },
  th: { sleep: "การนอนหลับ", anxiety: "ความวิตกกังวล", grief_loss: "การสูญเสีย", loneliness: "ความเหงา", self_worth: "คุณค่าในตนเอง", relationships: "ความสัมพันธ์", identity: "อัตลักษณ์", mindfulness: "การมีสติ", emotional_health: "สุขภาพทางอารมณ์" },
  es: { sleep: "Sueño", anxiety: "Ansiedad", grief_loss: "Duelo", loneliness: "Soledad", self_worth: "Autoestima", relationships: "Relaciones", identity: "Identidad", mindfulness: "Atención Plena", emotional_health: "Salud Emocional" },
}

export default function LibraryPreview({ locale }: LibraryPreviewProps) {
  const allTopics = getTopics(locale)
  const text = SECTION_TEXT[locale] || SECTION_TEXT.en
  const catLabels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.en

  const grouped = allTopics.reduce<Record<string, typeof allTopics>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dc-deep via-dc-surface/20 to-dc-deep pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-dc-text mb-3">{text.heading}</h2>
          <p className="text-dc-muted max-w-2xl leading-relaxed">{text.sub}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([category, topics]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-dc-muted uppercase tracking-wider mb-3">
                {catLabels[category] || category}
              </h3>
              <div
                className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin"
                style={{ scrollbarWidth: "thin", msOverflowStyle: "auto" }}
              >
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/${locale}/library/${topic.slug}`}
                    className="shrink-0 w-56 p-4 rounded-xl bg-dc-surface/60 border border-dc-border/30
                      hover:bg-dc-accent/5 hover:border-dc-accent/20
                      text-dc-text text-sm hover:text-dc-accent
                      transition-all duration-200 snap-start"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/library`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-dc-accent/10 hover:bg-dc-accent/20
              text-dc-accent font-medium rounded-xl border border-dc-accent/20
              hover:border-dc-accent/40 transition-all duration-300 text-sm"
          >
            {locale === "zh" ? "浏览全部话题 →" : "Browse all topics →"}
          </Link>
        </div>
      </div>
    </section>
  )
}

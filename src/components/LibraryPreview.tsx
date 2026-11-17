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
    <section aria-labelledby="library-preview-heading" className="relative px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#709488] bg-[#132723]/90 p-4 shadow-xl sm:p-8">
        <header className="mb-7">
          <h2 id="library-preview-heading" className="text-2xl font-bold text-[#f4faf6] sm:text-3xl">{text.heading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#d6e8df] sm:text-base">{text.sub}</p>
        </header>

        <div className="space-y-6">
          {Object.entries(grouped).map(([category, topics]) => (
            <div key={category} className="border-t border-[#53746b] pt-4">
              <h3 className="mb-3 text-sm font-semibold text-[#c2f4df] sm:text-base">
                {catLabels[category] || category}
              </h3>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
                {topics.map((topic) => (
                  <li key={topic.slug} className="min-w-0">
                    <Link
                      href={`/${locale}/library/${topic.slug}`}
                      className="flex h-full min-h-12 items-center justify-between gap-2 rounded-xl border border-[#c9d9d0] bg-[#f8fcf9] px-3 py-2.5 text-sm font-semibold text-[#172a24] transition-colors hover:bg-[#e2f2e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2f4df]"
                    >
                      <span className="min-w-0 break-words">{topic.title}</span>
                      <span aria-hidden="true" className="shrink-0 text-[#346653]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <Link
            href={`/${locale}/library`}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#c2f4df] px-5 py-2.5 text-sm font-semibold text-[#132723] transition-colors hover:bg-[#d8f9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2f4df]"
          >
            {locale === "zh" ? "浏览全部话题" : "Browse all topics"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

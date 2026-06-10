import type { Locale } from "@/types"
import { getAllSlugs, getTopicBySlug, getTopicContent, getTopicsByCategory, getTopics } from "@/content/topics"
import { getDict, tt } from "@/lib/getDict"
import { notFound } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"
import LibraryCard from "@/components/LibraryCard"
import AiEntrance from "@/components/AiEntrance"
import { BookOpen } from "lucide-react"

const categoryIcon: Record<string, string> = {
  sleep: "🌙", anxiety: "🫀", grief_loss: "💧", loneliness: "🌊",
  self_worth: "✨", relationships: "💞", identity: "🎭",
  mindfulness: "🧘", emotional_health: "💪",
}

const categoryColors: Record<string, string> = {
  sleep: "from-indigo-500/10 to-purple-500/10",
  anxiety: "from-rose-500/10 to-orange-500/10",
  grief_loss: "from-slate-500/10 to-zinc-500/10",
  loneliness: "from-sky-500/10 to-teal-500/10",
  self_worth: "from-emerald-500/10 to-teal-500/10",
  relationships: "from-pink-500/10 to-rose-500/10",
  identity: "from-violet-500/10 to-blue-500/10",
  mindfulness: "from-amber-500/10 to-yellow-500/10",
  emotional_health: "from-red-500/10 to-rose-500/10",
}

const CATEGORY_NAMES: Record<string, Record<Locale, string>> = {
  sleep: { zh: "睡眠", en: "Sleep", ms: "Tidur", ja: "睡眠", ko: "수면", th: "การนอนหลับ", es: "Sueño" },
  anxiety: { zh: "焦虑", en: "Anxiety", ms: "Kebimbangan", ja: "不安", ko: "불안", th: "ความกังวล", es: "Ansiedad" },
  grief_loss: { zh: "哀伤与失落", en: "Grief & Loss", ms: "Kesedihan & Kehilangan", ja: "悲しみと喪失", ko: "슬픔과 상실", th: "ความเศร้าและการสูญเสีย", es: "Duelo y Pérdida" },
  loneliness: { zh: "孤独", en: "Loneliness", ms: "Kesunyian", ja: "孤独", ko: "외로움", th: "ความเหงา", es: "Soledad" },
  self_worth: { zh: "自我价值", en: "Self-Worth", ms: "Harga Diri", ja: "自己価値", ko: "자존감", th: "คุณค่าในตนเอง", es: "Autoestima" },
  relationships: { zh: "人际关系", en: "Relationships", ms: "Hubungan", ja: "人間関係", ko: "관계", th: "ความสัมพันธ์", es: "Relaciones" },
  identity: { zh: "身份认同", en: "Identity", ms: "Identiti", ja: "アイデンティティ", ko: "정체성", th: "อัตลักษณ์", es: "Identidad" },
  mindfulness: { zh: "正念", en: "Mindfulness", ms: "Kesedaran", ja: "マインドフルネス", ko: "마음챙김", th: "การมีสติ", es: "Atención Plena" },
  emotional_health: { zh: "情绪健康", en: "Emotional Health", ms: "Kesihatan Emosi", ja: "感情的健康", ko: "정서 건강", th: "สุขภาพทางอารมณ์", es: "Salud Emocional" },
}

export const dynamic = "force-static"

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  const langs: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]
  const params: { lang: string; slug: string }[] = []
  for (const lang of langs) {
    for (const slug of slugs) {
      params.push({ lang, slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const topic = getTopicBySlug(slug, lang as Locale)
  if (!topic) return {}
  return {
    title: `${topic.title} - DeepCalm AI`,
    description: topic.description,
    keywords: topic.keywords,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/library/${slug}`,
      languages: {
        zh: `https://deepcalm-ai.com/zh/library/${slug}`, en: `https://deepcalm-ai.com/en/library/${slug}`, ms: `https://deepcalm-ai.com/ms/library/${slug}`,
        ja: `https://deepcalm-ai.com/ja/library/${slug}`, ko: `https://deepcalm-ai.com/ko/library/${slug}`, th: `https://deepcalm-ai.com/th/library/${slug}`, es: `https://deepcalm-ai.com/es/library/${slug}`,
      },
    },
    openGraph: { title: `${topic.title} - DeepCalm AI`, description: topic.description },
  }
}

export default async function LibraryDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const topic = getTopicBySlug(slug, locale)
  if (!topic) notFound()

  const dict = getDict(locale)
  const dictEn = getDict("en")
  const dictZh = getDict("zh")
  const content = getTopicContent(slug, locale)

  const catColor = categoryColors[topic.category] || "from-nord-accent/10 to-nord-accent/5"
  const icon = categoryIcon[topic.category] || "📖"
  const catName = CATEGORY_NAMES[topic.category]?.[locale] || topic.category

  const sameCat = getTopicsByCategory(topic.category, locale)
    .filter((t) => t.slug !== slug)
    .slice(0, 4)

  const others = getTopics(locale)
    .filter((t) => t.slug !== slug && t.category !== topic.category)
    .sort((a, b) => a.slug.localeCompare(b.slug))

  const related = sameCat.concat(others.slice(0, Math.max(0, 6 - sameCat.length)))

  const t = (key: string, fallback: string) => tt(dict, key) || tt(dictEn, key) || tt(dictZh, key) || fallback

  return (
    <div className="min-h-screen bg-nord-bg">
      <section className="py-24 relative">
        <div className={`absolute inset-0 bg-gradient-to-b ${catColor}`} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Library", href: `/${locale}/library` },
              { label: catName, href: `/${locale}/library#${topic.category}` },
              { label: topic.title, href: `/${locale}/library/${slug}` },
            ]}
            locale={locale}
          />

          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-nord-accent uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {catName}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-nord-text mt-3 mb-4">
              {icon} {topic.title}
            </h1>
            <p className="text-nord-text/60 leading-relaxed">{topic.description}</p>
          </div>

          <div className="space-y-8">
            <div className="p-6 sm:p-8 bg-nord-card border border-nord-border/30 rounded-2xl">
              <h2 className="text-lg font-bold text-nord-text mb-4">
                {locale === "zh" ? "🔬 科学原理" : locale === "ms" ? "🔬 Sains" : "🔬 The Science"}
              </h2>
              <div className="prose prose-invert max-w-none prose-p:text-nord-text/70 prose-p:leading-relaxed">
                {content.science.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-nord-accent/[0.06] to-nord-card border border-nord-accent/15 rounded-2xl">
              <h2 className="text-lg font-bold text-nord-text mb-4">
                {locale === "zh" ? "🏋️ 日常健身指南" : locale === "ms" ? "🏋️ Panduan Kecergasan" : "🏋️ Emotional Fitness Guide"}
              </h2>
              <div className="prose prose-invert max-w-none prose-p:text-nord-text/70 prose-p:leading-relaxed prose-strong:text-nord-text">
                {content.fitnessGuide.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h3 key={i} className="text-base font-semibold text-nord-text mt-4 mb-2">{line.slice(3)}</h3>
                  if (/^\d+\./.test(line.trim())) return <p key={i} className="text-nord-text/70 leading-relaxed mb-2">{line}</p>
                  if (line.trim() === "") return null
                  return <p key={i} className="text-nord-text/70 leading-relaxed">{line}</p>
                })}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-nord-card border border-nord-border/30 rounded-2xl">
              <h2 className="text-lg font-bold text-nord-text mb-6">
                {locale === "zh" ? "❓ 常见问题" : locale === "ms" ? "❓ Soalan Lazim" : "❓ FAQ"}
              </h2>
              <div className="space-y-4">
                {content.faqItems.map((item, i) => (
                  <div key={i} className="p-4 bg-nord-bg/50 rounded-xl border border-nord-border/20">
                    <p className="text-nord-text font-medium text-sm mb-2">{item.q}</p>
                    <p className="text-nord-text/60 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AiEntrance locale={locale} />

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-lg font-bold text-nord-text mb-6">
                {locale === "zh" ? "📖 相关阅读" : locale === "ms" ? "📖 Bacaan Berkaitan" : "📖 Related Reading"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <LibraryCard
                    key={r.slug}
                    slug={r.slug}
                    title={r.title}
                    description={r.description}
                    category={r.category}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

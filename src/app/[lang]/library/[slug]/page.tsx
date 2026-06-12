import type { Locale } from "@/types"
import { getAllSlugs, getTopicBySlug, getTopicContent } from "@/content/topics"
import { getRecommendations } from "@/lib/recommendation-engine"
import { getDict, tt } from "@/lib/getDict"
import { notFound } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"
import LibraryCard from "@/components/LibraryCard"
import AiEntrance from "@/components/AiEntrance"
import ExpertBadge from "@/components/ExpertBadge"
import ExternalReferences from "@/components/ExternalReferences"
import KnowledgeMap from "@/components/KnowledgeMap"
import SleepStreakBadge from "@/components/SleepStreakBadge"
import PrintPdfButtons from "@/components/PrintPdfButtons"
import TableOfContents from "@/components/TableOfContents"
import { TopicJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd"
import { extractHeadings } from "@/lib/extractHeadings"
import Link from "next/link"
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
  const locale = lang as Locale
  const topic = getTopicBySlug(slug, locale)
  if (!topic) return {}
  const catName = CATEGORY_NAMES[topic.category]?.[locale] || topic.category
  const suffix = locale === "zh" ? "心理健康指南" : locale === "ms" ? "Panduan Kesihatan Mental" : locale === "ja" ? "メンタルヘルスガイド" : locale === "ko" ? "정신 건강 가이드" : locale === "th" ? "คู่มือสุขภาพจิต" : locale === "es" ? "Guía de Salud Mental" : "Mental Health Guide"
  const seoTitle = `${topic.title} | ${catName} ${suffix} - DeepCalm AI`
  return {
    title: seoTitle,
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
    openGraph: { title: seoTitle, description: topic.description },
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

  const catColor = categoryColors[topic.category] || "from-sky-500/10 to-sky-500/5"
  const icon = categoryIcon[topic.category] || "📖"
  const catName = CATEGORY_NAMES[topic.category]?.[locale] || topic.category

  const related = getRecommendations(slug, locale, 6)

  const t = (key: string, fallback: string) => tt(dict, key) || tt(dictEn, key) || tt(dictZh, key) || fallback

  const headings = extractHeadings(content)

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-24 relative">
        <div className={`absolute inset-0 bg-gradient-to-b ${catColor}`} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Library", href: `/${locale}/library` },
              { label: catName, href: `/${locale}/library#${topic.category}` },
              { label: topic.title, href: `/${locale}/library/${slug}` },
            ]}
            locale={locale}
          />

          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {catName}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">
              {icon} {topic.title}
            </h1>
            <p className="text-slate-600 leading-relaxed">{topic.description}</p>
          </div>

          <ExpertBadge locale={locale} />

          {/* P3-B: 在沉浸模式中阅读 — 快捷入口 */}
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/sanctuary`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dc-accent/10 hover:bg-dc-accent/20 text-dc-accent text-sm font-medium border border-dc-accent/20 hover:border-dc-accent/40 transition-all"
            >
              🌙 {locale === "zh" ? "在沉浸模式中阅读" : locale === "ms" ? "Baca dalam Mod Imersif" : locale === "ja" ? "没入モードで読む" : locale === "ko" ? "몰입 모드로 읽기" : locale === "th" ? "อ่านในโหมดดื่มด่ำ" : locale === "es" ? "Leer en modo inmersivo" : "Read in Immersive Mode"}
            </Link>
          </div>

          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
            {/* TOC Sidebar - desktop sticky, mobile collapsible */}
            <div className="lg:order-1">
              <TableOfContents headings={headings} locale={locale} />
            </div>

            {/* Main Content */}
            <div className="lg:order-2 min-w-0">
              <div className="space-y-8 max-w-3xl">
                {/* Science Section */}
                <div id="science" className="p-6 sm:p-8 bg-white border border-slate-200/60 rounded-2xl scroll-mt-24">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    {locale === "zh" ? "🔬 科学原理" : locale === "ms" ? "🔬 Sains" : "🔬 The Science"}
                  </h2>
                  <div className="prose prose-invert max-w-none prose-p:text-slate-700 prose-p:leading-relaxed">
                    {content.science.split("\n").filter(Boolean).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {topic.references && topic.references.length > 0 && (
                    <ExternalReferences references={topic.references} locale={locale} />
                  )}
                </div>

                {/* Fitness Guide Section */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-sky-500/[0.06] to-white border border-sky-200/40 rounded-2xl">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    {locale === "zh" ? "🏋️ 日常健身指南" : locale === "ms" ? "🏋️ Panduan Kecergasan" : "🏋️ Emotional Fitness Guide"}
                  </h2>
                  <div className="prose prose-invert max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900">
                    {content.fitnessGuide.split("\n").map((line, i) => {
                      if (line.startsWith("## ")) {
                        const text = line.slice(3).trim()
                        const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "")
                        return <h3 key={i} id={id} className="text-base font-semibold text-slate-900 mt-4 mb-2 scroll-mt-24">{text}</h3>
                      }
                      if (/^\d+\./.test(line.trim())) return <p key={i} className="text-slate-700 leading-relaxed mb-2">{line}</p>
                      if (line.trim() === "") return null
                      return <p key={i} className="text-slate-700 leading-relaxed">{line}</p>
                    })}
                  </div>
                </div>

                {/* FAQ Section */}
                <div id="faq" className="p-6 sm:p-8 bg-white border border-slate-200/60 rounded-2xl scroll-mt-24">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">
                    {locale === "zh" ? "❓ 常见问题" : locale === "ms" ? "❓ Soalan Lazim" : "❓ FAQ"}
                  </h2>
                  <div className="space-y-4">
                    {content.faqItems.map((item, i) => (
                      <div key={i} id={`faq-${i}`} className="p-4 bg-slate-100/50 rounded-xl border border-slate-200/40 scroll-mt-24">
                        <p className="text-slate-900 font-medium text-sm mb-2">{item.q}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <PrintPdfButtons locale={locale} slug={slug} />

              <AiEntrance locale={locale} />

              <KnowledgeMap slug={slug} locale={locale} />

              {related.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">
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

              {/* 守夜勋章 — 每日阅读习惯游戏化 */}
              <SleepStreakBadge locale={locale} />
            </div>
          </div>

          <BreadcrumbJsonLd
            items={[
              { name: catName === "睡眠" ? "Library" : "Library", url: `https://deepcalm-ai.com/${locale}/library` },
              { name: catName, url: `https://deepcalm-ai.com/${locale}/library#${topic.category}` },
              { name: topic.title, url: `https://deepcalm-ai.com/${locale}/library/${slug}` },
            ]}
          />
          <TopicJsonLd
            locale={locale}
            slug={slug}
            topic={{
              title: topic.title,
              description: topic.description,
              keywords: topic.keywords,
              category: topic.category,
            }}
            faqItems={content.faqItems.map((item) => ({ q: item.q, a: item.a }))}
          />
        </div>
      </section>
    </div>
  )
}

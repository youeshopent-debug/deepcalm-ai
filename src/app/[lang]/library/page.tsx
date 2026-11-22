import type { Locale } from "@/types"
import { getTopics, getTopicsByCategory } from "@/content/topics"
import { getDict, tt } from "@/lib/getDict"
import Breadcrumb from "@/components/Breadcrumb"
import LibraryFilterableGrid from "@/components/LibraryFilterableGrid"
import { CATEGORY_ORDER, CATEGORY_NAMES, categoryIcon } from "@/lib/library-constants"
import { BookOpen } from "lucide-react"

export function generateStaticParams() {
  const langs: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]
  return langs.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDict(locale)
  const en = getDict("en")
  const topicCount = getTopics(locale).length
  const localeTitles: Record<Locale, string> = {
    zh: `心理健康百科 | ${topicCount} 篇科学文章 - DeepCalm AI`,
    en: `Mental Health Encyclopedia | ${topicCount} Science-Backed Articles - DeepCalm AI`,
    ms: `Ensiklopedia Kesihatan Mental | ${topicCount} Artikel Saintifik - DeepCalm AI`,
    ja: `メンタルヘルス百科 | ${topicCount}の科学記事 - DeepCalm AI`,
    ko: `정신 건강 백과 | ${topicCount}개의 과학 기사 - DeepCalm AI`,
    th: `สารานุกรมสุขภาพจิต | ${topicCount} บทความวิทยาศาสตร์ - DeepCalm AI`,
    es: `Enciclopedia de Salud Mental | ${topicCount} Artículos Científicos - DeepCalm AI`,
  }
  const title = tt(dict, "library.title") || localeTitles[locale] || localeTitles.en
  const desc = tt(dict, "library.desc") || tt(en, "library.desc") || `Explore ${topicCount} science-backed articles on sleep, anxiety, mindfulness, and emotional health.`
  return {
    title,
    description: desc,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/library`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/library", en: "https://deepcalm-ai.com/en/library", ms: "https://deepcalm-ai.com/ms/library",
        ja: "https://deepcalm-ai.com/ja/library", ko: "https://deepcalm-ai.com/ko/library", th: "https://deepcalm-ai.com/th/library", es: "https://deepcalm-ai.com/es/library",
      },
    },
    openGraph: { title, description: desc },
  }
}

export default async function LibraryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDict(locale)

  const allTopics = getTopics(locale)
  const topicCount = allTopics.length
  const categoriesWithTopics = CATEGORY_ORDER
    .map((cat) => ({ cat, topics: getTopicsByCategory(cat, locale) }))
    .filter(({ topics }) => topics.length > 0)

  const categories = CATEGORY_ORDER
    .map((cat) => {
      const topics = getTopicsByCategory(cat, locale)
      return {
        slug: cat,
        icon: categoryIcon[cat] || "📖",
        name: CATEGORY_NAMES[cat]?.[locale] || cat,
        count: topics.length,
      }
    })
    .filter((c) => c.count > 0)

  return (
    <div className="min-h-screen bg-nord-bg">
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-nord-card/50 via-nord-bg to-nord-bg pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-white/15 bg-[#11251e] px-5 py-6 shadow-lg sm:px-8 sm:py-8">
            <div className="[&_ol]:flex-wrap [&_ol]:text-[#e7f0eb] [&_a:hover]:text-white [&_a:hover]:underline">
              <Breadcrumb
                items={[{ label: locale === "zh" ? "深夜智慧馆" : "Library", href: `/${locale}/library` }]}
                locale={locale}
              />
            </div>

            <header className="text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b6e4cc] uppercase tracking-widest mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                {locale === "zh" ? "深夜智慧馆" : locale === "ms" ? "Perpustakaan" : locale === "ja" ? "深夜の知恵" : locale === "ko" ? "심야 지혜" : locale === "th" ? "คลังปัญญา" : locale === "es" ? "Biblioteca" : "Midnight Wisdom Library"}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {locale === "zh" ? `${topicCount} 个科学主题，陪你探索内心世界` : `${topicCount} science-backed topics for inner exploration`}
              </h1>
              <p className="text-[#e7f0eb] max-w-2xl mx-auto leading-relaxed">
                {locale === "zh"
                  ? "每一篇文章都融合了睡眠科学、认知行为疗法（CBT）与正念研究的真知灼见，帮助你理解自己，找到平静。"
                  : "Every article blends sleep science, Cognitive Behavioral Therapy (CBT), and mindfulness research to help you understand yourself and find calm."}
              </p>
            </header>
          </div>

          <LibraryFilterableGrid
            categories={categories}
            allTopics={allTopics}
            categoriesWithTopics={categoriesWithTopics}
            locale={locale}
          />
        </div>
      </section>
    </div>
  )
}

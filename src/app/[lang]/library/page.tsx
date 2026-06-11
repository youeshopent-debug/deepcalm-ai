import type { Locale } from "@/types"
import { getTopics, getTopicsByCategory } from "@/content/topics"
import { getDict, tt } from "@/lib/getDict"
import Breadcrumb from "@/components/Breadcrumb"
import LibraryFilterableGrid from "@/components/LibraryFilterableGrid"
import { CATEGORY_ORDER, CATEGORY_NAMES, CATEGORY_INTROS, categoryIcon } from "@/lib/library-constants"
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
  const localeTitles: Record<Locale, string> = {
    zh: "心理健康百科 | 44 篇科学文章 - DeepCalm AI",
    en: "Mental Health Encyclopedia | 44 Science-Backed Articles - DeepCalm AI",
    ms: "Ensiklopedia Kesihatan Mental | 44 Artikel Saintifik - DeepCalm AI",
    ja: "メンタルヘルス百科 | 44の科学記事 - DeepCalm AI",
    ko: "정신 건강 백과 | 44개의 과학 기사 - DeepCalm AI",
    th: "สารานุกรมสุขภาพจิต | 44 บทความวิทยาศาสตร์ - DeepCalm AI",
    es: "Enciclopedia de Salud Mental | 44 Artículos Científicos - DeepCalm AI",
  }
  const title = tt(dict, "library.title") || localeTitles[locale] || localeTitles.en
  const desc = tt(dict, "library.desc") || tt(en, "library.desc") || "Explore 44 science-backed articles on sleep, anxiety, mindfulness, and emotional health."
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
          <Breadcrumb
            items={[{ label: "Library", href: `/${locale}/library` }]}
            locale={locale}
          />

          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-nord-accent uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              {locale === "zh" ? "深夜智慧馆" : locale === "ms" ? "Perpustakaan" : locale === "ja" ? "深夜の知恵" : locale === "ko" ? "심야 지혜" : locale === "th" ? "คลังปัญญา" : locale === "es" ? "Biblioteca" : "Midnight Wisdom Library"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-nord-text mb-4">
              {locale === "zh" ? "44 个科学主题，陪你探索内心世界" : "44 science-backed topics for inner exploration"}
            </h1>
            <p className="text-nord-text/50 max-w-2xl mx-auto leading-relaxed">
              {locale === "zh"
                ? "每一篇文章都融合了睡眠科学、认知行为疗法（CBT）与正念研究的真知灼见，帮助你理解自己，找到平静。"
                : "Every article blends sleep science, Cognitive Behavioral Therapy (CBT), and mindfulness research to help you understand yourself and find calm."}
            </p>
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

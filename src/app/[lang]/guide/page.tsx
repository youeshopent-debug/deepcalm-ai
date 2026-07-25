import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { getGuides } from "@/content/guides"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }, { lang: "ms" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = await getDict(locale)
  const suffix = locale === "zh" ? "自助指南" : locale === "ms" ? "Panduan Bantuan Diri" : locale === "ja" ? "セルフヘルプガイド" : locale === "ko" ? "셀프헬프 가이드" : locale === "th" ? "คู่มือช่วยเหลือตนเอง" : locale === "es" ? "Guía de Autoayuda" : "Self-Help Guide"
  const seoTitle = `${dict.guide.meta_title} | ${suffix} - DeepCalm AI`
  return {
    title: seoTitle,
    description: dict.guide.meta_desc,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/guide`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/guide",
        en: "https://deepcalm-ai.com/en/guide",
        ms: "https://deepcalm-ai.com/ms/guide",
        ja: "https://deepcalm-ai.com/ja/guide",
        ko: "https://deepcalm-ai.com/ko/guide",
        th: "https://deepcalm-ai.com/th/guide",
        es: "https://deepcalm-ai.com/es/guide",
      },
    },
    openGraph: {
      title: seoTitle,
      description: dict.guide.meta_desc,
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  const guides = getGuides(lang)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-7 h-7 text-dc-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold text-dc-text">
              {dict.guide.title}
            </h1>
          </div>
          <p className="text-dc-muted/80 text-base sm:text-lg leading-relaxed">
            {dict.guide.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 mt-10">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${lang}/guide/${guide.slug}`}
              className="group glass rounded-2xl p-6 border border-dc-border/40 hover:border-dc-accent/30 transition-colors"
            >
              <span className="text-xs font-medium text-dc-accent uppercase tracking-wider">
                {dict.guide[`category_${guide.category}` as keyof typeof dict.guide] as string}
              </span>
              <h2 className="text-lg font-semibold text-dc-text mt-2 group-hover:text-dc-accent transition-colors">
                {guide.title}
              </h2>
              <p className="text-dc-muted/80 text-sm mt-2 line-clamp-2">{guide.description}</p>
              <span className="inline-block text-dc-accent text-sm font-medium mt-4">
                {dict.guide.readMore} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

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
  const dict = await getDict(lang as Locale)
  return {
    title: dict.guide.meta_title + " - DeepCalm AI",
    description: dict.guide.meta_desc,
    openGraph: {
      title: dict.guide.meta_title + " - DeepCalm AI",
      description: dict.guide.meta_desc,
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  const guides = getGuides(lang)

  return (
    <div className="min-h-screen bg-nord-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-nord-accent" />
          <h1 className="text-3xl sm:text-4xl font-bold text-nord-text">{dict.guide.title}</h1>
        </div>
        <p className="text-nord-text/70 text-lg mb-12">{dict.guide.subtitle}</p>
        <div className="grid gap-8 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${lang}/guide/${guide.slug}`}
              className="group bg-nord-card rounded-xl p-6 border border-nord-border/30 hover:border-nord-accent/50 transition-all"
            >
              <span className="text-xs font-medium text-nord-accent uppercase tracking-wider">
                {dict.guide[`category_${guide.category}` as keyof typeof dict.guide] as string}
              </span>
              <h2 className="text-lg font-semibold text-nord-text mt-2 group-hover:text-nord-accent transition-colors">
                {guide.title}
              </h2>
              <p className="text-nord-text/60 text-sm mt-2 line-clamp-2">{guide.description}</p>
              <span className="inline-block text-nord-accent text-sm font-medium mt-4">
                {dict.guide.readMore} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

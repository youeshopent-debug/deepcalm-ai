import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { Heart } from "lucide-react"

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }, { lang: "ms" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  return {
    title: dict.about.meta_title,
    description: dict.about.meta_desc,
    openGraph: {
      title: dict.about.meta_title,
      description: dict.about.meta_desc,
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  const a = dict.about

  const sections = [
    { title: a.section1_title, desc: a.section1_desc },
    { title: a.section2_title, desc: a.section2_desc },
    { title: a.section3_title, desc: a.section3_desc },
    { title: a.section4_title, desc: a.section4_desc },
  ]

  return (
    <div className="min-h-screen bg-nord-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-nord-accent" />
          <h1 className="text-3xl sm:text-4xl font-bold text-nord-text">{a.hero_title}</h1>
        </div>
        <p className="text-nord-text/80 text-lg leading-relaxed mb-16">{a.hero_desc}</p>
        <div className="space-y-14">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold text-nord-text mb-4">{s.title}</h2>
              <p className="text-nord-text/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

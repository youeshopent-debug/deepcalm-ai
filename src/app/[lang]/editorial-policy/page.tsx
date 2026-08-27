import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { FileCheck } from "lucide-react"

const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  return {
    title: dict.editorial.meta_title,
    description: dict.editorial.meta_desc,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/editorial-policy`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/editorial-policy",
        en: "https://deepcalm-ai.com/en/editorial-policy",
        ms: "https://deepcalm-ai.com/ms/editorial-policy",
        ja: "https://deepcalm-ai.com/ja/editorial-policy",
        ko: "https://deepcalm-ai.com/ko/editorial-policy",
        th: "https://deepcalm-ai.com/th/editorial-policy",
        es: "https://deepcalm-ai.com/es/editorial-policy",
      },
    },
    openGraph: {
      title: dict.editorial.meta_title,
      description: dict.editorial.meta_desc,
    },
  }
}

export default async function EditorialPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  const e = dict.editorial

  const sections = [
    { title: e.section1_title, desc: e.section1_desc },
    { title: e.section2_title, desc: e.section2_desc },
    { title: e.section3_title, desc: e.section3_desc },
    { title: e.section4_title, desc: e.section4_desc },
    { title: e.section5_title, desc: e.section5_desc },
    { title: e.section6_title, desc: e.section6_desc },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-7 h-7 text-dc-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold text-dc-text">{e.title}</h1>
          </div>
          <p className="text-sm text-dc-muted/70 mb-6">{e.updated}</p>
          <p className="text-dc-muted/80 leading-relaxed">{e.intro}</p>
        </div>

        <div className="space-y-8 mt-10">
          {sections.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-dc-border/40">
              <h2 className="text-xl font-semibold text-dc-text mb-3">{s.title}</h2>
              <p className="text-dc-muted/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

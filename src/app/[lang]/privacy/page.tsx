import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { Shield } from "lucide-react"

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }, { lang: "ms" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  return {
    title: dict.privacy.meta_title,
    description: dict.privacy.meta_desc,
    openGraph: {
      title: dict.privacy.meta_title,
      description: dict.privacy.meta_desc,
    },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  const p = dict.privacy

  const sections = [
    { title: p.section1_title, desc: p.section1_desc },
    { title: p.section2_title, desc: p.section2_desc },
    { title: p.section3_title, desc: p.section3_desc },
    { title: p.section4_title, desc: p.section4_desc },
    { title: p.section5_title, desc: p.section5_desc },
    { title: p.section6_title, desc: p.section6_desc },
  ]

  return (
    <div className="min-h-screen bg-nord-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-nord-accent" />
          <h1 className="text-3xl sm:text-4xl font-bold text-nord-text">{p.title}</h1>
        </div>
        <p className="text-sm text-nord-muted mb-6">{p.updated}</p>
        <p className="text-nord-text/80 leading-relaxed mb-12">{p.intro}</p>
        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-nord-text mb-3">{s.title}</h2>
              <p className="text-nord-text/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

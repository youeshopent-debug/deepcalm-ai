import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { Shield } from "lucide-react"

const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"];

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
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
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-7 h-7 text-dc-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold text-dc-text">{p.title}</h1>
          </div>
          <p className="text-sm text-dc-muted/70 mb-6">{p.updated}</p>
          <p className="text-dc-muted/80 leading-relaxed">{p.intro}</p>
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

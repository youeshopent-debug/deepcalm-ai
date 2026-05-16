import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { FileText } from "lucide-react"

const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"];

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  return {
    title: dict.terms.meta_title,
    description: dict.terms.meta_desc,
    openGraph: {
      title: dict.terms.meta_title,
      description: dict.terms.meta_desc,
    },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  const t = dict.terms

  const sections = [
    { title: t.section1_title, desc: t.section1_desc },
    { title: t.section2_title, desc: t.section2_desc },
    { title: t.section3_title, desc: t.section3_desc },
    { title: t.section4_title, desc: t.section4_desc },
    { title: t.section5_title, desc: t.section5_desc },
    { title: t.section6_title, desc: t.section6_desc },
  ]

  const disclaimerKeywords = ["免责", "Disclaimer", "penafian", "disclaimer"]

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-7 h-7 text-dc-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold text-dc-text">{t.title}</h1>
          </div>
          <p className="text-sm text-dc-muted/70 mb-6">{t.updated}</p>
          <p className="text-dc-muted/80 leading-relaxed">{t.intro}</p>
        </div>

        <div className="space-y-8 mt-10">
          {sections.map((s, i) => {
            const isDisclaimer = disclaimerKeywords.some((kw) => s.title.toLowerCase().includes(kw))
            return (
              <div
                key={i}
                className={
                  isDisclaimer
                    ? "glass rounded-2xl p-6 border border-dc-accent/25"
                    : "glass rounded-2xl p-6 border border-dc-border/40"
                }
              >
                <h2 className="text-xl font-semibold text-dc-text mb-3">{s.title}</h2>
                <p className="text-dc-muted/80 leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { PersonJsonLd } from "@/components/JsonLd"
import { getDict } from "@/lib/getDict"
import TechArchSection from "@/components/TechArchSection"
import type { Locale } from "@/types"

const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDict(locale)
  const suffix = locale === "zh" ? "关于我们" : locale === "ms" ? "Tentang Kami" : locale === "ja" ? "私たちについて" : locale === "ko" ? "소개" : locale === "th" ? "เกี่ยวกับเรา" : locale === "es" ? "Sobre Nosotros" : "About Us"
  const rawTitle = dict.about?.meta_title || "About DeepCalm AI"
  const seoTitle = rawTitle.includes("DeepCalm") ? `${rawTitle} | ${suffix}` : `${rawTitle} | ${suffix} - DeepCalm AI`
  return {
    title: seoTitle,
    description: dict.about?.meta_desc || "Learn about DeepCalm AI",
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/about`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/about",
        en: "https://deepcalm-ai.com/en/about",
        ms: "https://deepcalm-ai.com/ms/about",
        ja: "https://deepcalm-ai.com/ja/about",
        ko: "https://deepcalm-ai.com/ko/about",
        th: "https://deepcalm-ai.com/th/about",
        es: "https://deepcalm-ai.com/es/about",
      },
    },
    openGraph: {
      title: seoTitle,
      description: dict.about?.meta_desc || "Learn about DeepCalm AI",
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDict(lang as Locale)
  const d = dict.about || {}

  const sections = [
    { title: d.section1_title, desc: d.section1_desc },
    { title: d.section2_title, desc: d.section2_desc },
    { title: d.section3_title, desc: d.section3_desc },
    { title: d.section4_title, desc: d.section4_desc },
  ]

  return (
    <main className="min-h-screen bg-dc-deep text-dc-text">
      <PersonJsonLd />
      <section className="relative px-4 pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto glass rounded-2xl p-6 sm:p-10 border border-dc-border/40">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{d.hero_title}</h1>
          <p className="text-lg text-dc-muted/80 leading-relaxed">{d.hero_desc}</p>
        </div>
      </section>

      {sections.map((s, i) => (
        <section key={i} className="px-4 py-10 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{s.title}</h2>
            <p className="text-dc-muted/80 leading-relaxed whitespace-pre-line">{s.desc}</p>
          </div>
        </section>
      ))}

      <TechArchSection dict={dict} />
    </main>
  )
}

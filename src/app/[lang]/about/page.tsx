import { getDict } from "@/lib/getDict"
import TechArchSection from "@/components/TechArchSection"

type Locale = "zh" | "en" | "ms" | "ja" | "ko" | "th" | "es"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDict(lang as Locale)
  return {
    title: dict.about?.meta_title || "About DeepCalm AI",
    description: dict.about?.meta_desc || "Learn about DeepCalm AI",
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
      {/* Hero */}
      <section className="relative px-4 pt-32 pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{d.hero_title}</h1>
        <p className="text-lg text-dc-muted/80 max-w-2xl mx-auto leading-relaxed">{d.hero_desc}</p>
      </section>

      {/* Content Sections */}
      {sections.map((s, i) => (
        <section key={i} className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{s.title}</h2>
          <p className="text-dc-muted/80 leading-relaxed whitespace-pre-line">{s.desc}</p>
        </section>
      ))}

      {/* Tech Architecture */}
      <TechArchSection dict={dict} />
    </main>
  )
}

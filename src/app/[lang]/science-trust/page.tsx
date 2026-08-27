import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { MEDICAL_REVIEWERS } from "@/data/medical-review-board"
import { Award, BadgeCheck, BookOpenCheck, HeartHandshake, ShieldCheck, Linkedin } from "lucide-react"

const locales: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDict(lang as Locale)
  return {
    title: dict.scienceTrust.meta_title,
    description: dict.scienceTrust.meta_desc,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/science-trust`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/science-trust",
        en: "https://deepcalm-ai.com/en/science-trust",
        ms: "https://deepcalm-ai.com/ms/science-trust",
        ja: "https://deepcalm-ai.com/ja/science-trust",
        ko: "https://deepcalm-ai.com/ko/science-trust",
        th: "https://deepcalm-ai.com/th/science-trust",
        es: "https://deepcalm-ai.com/es/science-trust",
      },
    },
    openGraph: {
      title: dict.scienceTrust.meta_title,
      description: dict.scienceTrust.meta_desc,
    },
  }
}

export default async function ScienceTrustPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = await getDict(locale)
  const s = dict.scienceTrust

  const trustPillars = [
    { icon: <Award className="w-6 h-6" />, title: s.pillar1_title, desc: s.pillar1_desc },
    { icon: <BookOpenCheck className="w-6 h-6" />, title: s.pillar2_title, desc: s.pillar2_desc },
    { icon: <BadgeCheck className="w-6 h-6" />, title: s.pillar3_title, desc: s.pillar3_desc },
    { icon: <HeartHandshake className="w-6 h-6" />, title: s.pillar4_title, desc: s.pillar4_desc },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        {/* 头部：科学背书声明 */}
        <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-7 h-7 text-dc-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold text-dc-text">{s.title}</h1>
          </div>
          <p className="text-sm text-dc-muted/70 mb-6">{s.updated}</p>
          <p className="text-dc-muted/80 leading-relaxed">{s.intro}</p>
        </div>

        {/* 医学审核委员会专家档案 */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-dc-text mb-6">{s.board_title}</h2>
          <div className="space-y-6">
            {MEDICAL_REVIEWERS.map((reviewer) => (
              <div key={reviewer.id} className="glass rounded-2xl p-6 border border-dc-border/40">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-dc-accent/15 text-dc-accent flex items-center justify-center text-lg font-bold">
                    {reviewer.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-dc-text">{reviewer.name}</h3>
                    <p className="text-sm text-dc-accent mt-0.5">{reviewer.title[locale]}</p>
                    <p className="text-xs text-dc-muted/70 mt-1">
                      {s.license_label}: {reviewer.licenseNumber}
                    </p>
                  </div>
                  <a
                    href={reviewer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm text-dc-accent hover:text-dc-accent/80"
                  >
                    <Linkedin className="w-4 h-4" />
                    {s.linkedin_label}
                  </a>
                </div>
                <p className="text-sm text-dc-muted/80 leading-relaxed mt-4">{reviewer.bio[locale]}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {reviewer.specialties[locale].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-dc-accent/10 text-dc-accent text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 信任承诺支柱 */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-dc-text mb-6">{s.pillars_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustPillars.map((pillar, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-dc-border/40">
                <div className="text-dc-accent mb-3">{pillar.icon}</div>
                <h3 className="font-semibold text-dc-text mb-2">{pillar.title}</h3>
                <p className="text-sm text-dc-muted/80 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

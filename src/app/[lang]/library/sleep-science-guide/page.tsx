import type { Locale } from "@/types"
import { getDict, tt } from "@/lib/getDict"
import { notFound } from "next/navigation"
import Link from "next/link"
import Breadcrumb from "@/components/Breadcrumb"
import { ArrowLeft, BookOpen, Brain, Moon, Heart, Sparkles, Shield, Sunrise, Activity } from "lucide-react"

const ALL_LOCALES: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

export const dynamic = "force-static"

export async function generateStaticParams() {
  return ALL_LOCALES.map((lang) => ({ lang }))
}

const SECTION_KEYS: { icon: React.ReactNode; titleKey: string; bodyKeys: string[] }[] = [
  { icon: <Moon className="w-5 h-5" />, titleKey: "rem_title", bodyKeys: ["p2", "p3"] },
  { icon: <Brain className="w-5 h-5" />, titleKey: "nrem_title", bodyKeys: ["p4"] },
  { icon: <Activity className="w-5 h-5" />, titleKey: "cortisol_title", bodyKeys: ["cortisol1", "cortisol2"] },
  { icon: <Sunrise className="w-5 h-5" />, titleKey: "circadian_title", bodyKeys: ["circadian1"] },
  { icon: <Sparkles className="w-5 h-5" />, titleKey: "melatonin_title", bodyKeys: ["melatonin1"] },
  { icon: <Shield className="w-5 h-5" />, titleKey: "cbt_deep_title", bodyKeys: ["cbt_deep1"] },
  { icon: <Heart className="w-5 h-5" />, titleKey: "sleep_hygiene_title", bodyKeys: ["sleep_hygiene1"] },
  { icon: <Heart className="w-5 h-5" />, titleKey: "anxiety_title", bodyKeys: ["p8", "p9"] },
  { icon: <BookOpen className="w-5 h-5" />, titleKey: "micro_habits_title", bodyKeys: ["micro_habits1"] },
]

const SECTION_STYLES = [
  "from-indigo-500/8 to-purple-500/8",
  "from-sky-500/8 to-teal-500/8",
  "from-rose-500/8 to-orange-500/8",
  "from-amber-500/8 to-yellow-500/8",
  "from-violet-500/8 to-blue-500/8",
  "from-emerald-500/8 to-teal-500/8",
  "from-pink-500/8 to-rose-500/8",
  "from-slate-500/8 to-zinc-500/8",
  "from-teal-500/8 to-cyan-500/8",
]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDict(locale)
  const dictEn = getDict("en")

  const title = tt(dict, "seoContent.title") || tt(dictEn, "seoContent.title") || "Sleep Science Guide - DeepCalm AI"
  const description = (tt(dict, "seoContent.p1") || tt(dictEn, "seoContent.p1") || "").slice(0, 200)

  return {
    title,
    description,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${locale}/library/sleep-science-guide`,
      languages: Object.fromEntries(ALL_LOCALES.map((l) => [l, `https://deepcalm-ai.com/${l}/library/sleep-science-guide`])),
    },
    openGraph: { title, description },
  }
}

export default async function SleepScienceGuidePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale

  if (!ALL_LOCALES.includes(locale)) notFound()

  const dict = getDict(locale)
  const dictEn = getDict("en")
  const dictZh = getDict("zh")

  const t = (key: string, fallback: string) => tt(dict, key) || tt(dictEn, key) || tt(dictZh, key) || fallback

  const title = t("seoContent.title", "Sleep Science Guide")
  const intro = t("seoContent.p1", "")
  const disclaimer = t("seoContent.disclaimer", "")

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-slate-50 to-slate-50 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Library", href: `/${locale}/library` },
              { label: "Sleep Science Guide", href: `/${locale}/library/sleep-science-guide` },
            ]}
            locale={locale}
          />

          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {locale === "zh" ? "睡眠科学" : locale === "ms" ? "Sains Tidur" : "Sleep Science"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">{title}</h1>
            <p className="text-slate-800 leading-relaxed">{intro}</p>
          </div>

          <div className="space-y-8">
            {SECTION_KEYS.map((section, idx) => {
              const sectionTitle = t(`seoContent.${section.titleKey}`, "")
              if (!sectionTitle) return null

              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 bg-gradient-to-br ${SECTION_STYLES[idx]} border border-slate-200/30 rounded-2xl`}
                >
                  <h2 className="text-lg font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
                    {section.icon}
                    {sectionTitle}
                  </h2>
                  <div className="prose prose-slate max-w-none prose-p:text-slate-900 prose-p:leading-relaxed space-y-4">
                    {section.bodyKeys.map((key) => {
                      const text = t(`seoContent.${key}`, "")
                      return text ? <p key={key}>{text}</p> : null
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {disclaimer && (
            <div className="mt-10 p-4 bg-white/50 border border-slate-200/20 rounded-xl">
              <p className="text-xs text-slate-500 leading-relaxed">{disclaimer}</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 font-medium rounded-xl border border-sky-200/40 hover:border-sky-200/60 transition-all duration-300 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === "zh" ? "返回首页" : "Back to Home"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

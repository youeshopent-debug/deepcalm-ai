import type { Locale } from "@/types"
import { getDict, tt } from "@/lib/getDict"
import { notFound } from "next/navigation"
import Link from "next/link"
import Breadcrumb from "@/components/Breadcrumb"
import { MedicalWebPageJsonLd, FaqJsonLd, type FaqItem } from "@/components/JsonLd"
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

  const faqItems: FaqItem[] = [
    {
      q: locale === "zh" ? "什么是 REM 睡眠？" : "What is REM sleep?",
      a: locale === "zh"
        ? "REM（快速眼动）睡眠是睡眠周期中的一个重要阶段，大脑活动接近清醒状态，眼球快速运动。REM 睡眠对记忆巩固、情绪调节和创造力至关重要。成年人约 20-25% 的睡眠时间为 REM 阶段。"
        : "REM (Rapid Eye Movement) sleep is a crucial stage of the sleep cycle where brain activity resembles wakefulness and eyes move rapidly. REM sleep is essential for memory consolidation, emotional regulation, and creativity. Adults spend approximately 20-25% of sleep in REM stages.",
    },
    {
      q: locale === "zh" ? "皮质醇如何影响睡眠？" : "How does cortisol affect sleep?",
      a: locale === "zh"
        ? "皮质醇是人体主要的应激激素，遵循昼夜节律：夜间降至最低，清晨自然升高以唤醒身体。当压力导致皮质醇水平在夜间过高时，会干扰入睡、降低深睡眠比例，导致睡眠碎片化。"
        : "Cortisol is the body's primary stress hormone, following a circadian rhythm: lowest at night and naturally rising in the morning to wake you up. When stress keeps cortisol levels elevated at night, it disrupts sleep onset, reduces deep sleep, and causes sleep fragmentation.",
    },
    {
      q: locale === "zh" ? "什么是昼夜节律？" : "What is the circadian rhythm?",
      a: locale === "zh"
        ? "昼夜节律是人体内生的约 24 小时生物钟，调控睡眠-觉醒周期、体温、激素分泌和代谢。光线是调节昼夜节律最强的外部信号。现代生活中的夜间蓝光暴露是导致昼夜节律紊乱的主要原因。"
        : "The circadian rhythm is your body's internal 24-hour biological clock regulating sleep-wake cycles, body temperature, hormone secretion, and metabolism. Light is the strongest external signal regulating circadian rhythms. Nighttime blue light exposure is the primary cause of circadian disruption in modern life.",
    },
    {
      q: locale === "zh" ? "褪黑素补充剂有效吗？" : "Are melatonin supplements effective?",
      a: locale === "zh"
        ? "褪黑素补充剂对调整时差和昼夜节律紊乱（如轮班工作）有效，但对慢性失眠的效果有限。推荐剂量为 0.5-3 mg，睡前 1-2 小时服用。长期使用应在医生指导下进行。"
        : "Melatonin supplements are effective for jet lag and circadian rhythm disorders (like shift work), but have limited efficacy for chronic insomnia. Recommended dosage is 0.5-3 mg, taken 1-2 hours before bedtime. Long-term use should be under medical supervision.",
    },
    {
      q: locale === "zh" ? "CBT-I 的核心原理是什么？" : "What are the core principles of CBT-I?",
      a: locale === "zh"
        ? "失眠的认知行为疗法（CBT-I）是国际公认的慢性失眠一线治疗方案。其五大核心组件为：刺激控制（重建床与睡眠的正向关联）、睡眠限制（提高睡眠效率）、认知重建（纠正关于睡眠的错误信念）、睡眠卫生教育、放松训练。"
        : "Cognitive Behavioral Therapy for Insomnia (CBT-I) is internationally recognized as the first-line treatment for chronic insomnia. Its five core components are: stimulus control (rebuilding positive bed-sleep association), sleep restriction (improving sleep efficiency), cognitive restructuring (correcting false beliefs about sleep), sleep hygiene education, and relaxation training.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <MedicalWebPageJsonLd locale={locale} />
      <FaqJsonLd items={faqItems} locale={locale} />
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
                  className={`p-6 sm:p-8 bg-white/98 backdrop-blur-[100px] border border-slate-200/20 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]`}
                >
                  <h2 className="text-lg font-bold text-slate-900 mb-4 inline-flex items-center gap-2">
                    {section.icon}
                    {sectionTitle}
                  </h2>
                  <div className="space-y-4 text-slate-900 leading-relaxed">
                    {section.bodyKeys.map((key) => {
                      const text = t(`seoContent.${key}`, "")
                      return text ? <p key={key} className="text-slate-900 leading-relaxed">{text}</p> : null
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {disclaimer && (
            <div className="mt-10 p-4 bg-white/95 backdrop-blur-[50px] border border-slate-200/20 rounded-xl shadow">
              <p className="text-xs text-slate-600 leading-relaxed">{disclaimer}</p>
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

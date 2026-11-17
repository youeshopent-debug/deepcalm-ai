import Link from "next/link"
import type { Locale } from "@/types"
import DailyBriefing from "./DailyBriefing"
import InteractiveAreas from "./InteractiveAreas"
import PublisherContentBlock, { type PublisherTopic } from "./PublisherContentBlock"
import SsrAccordion from "./SsrAccordion"

export default function SanctuaryPage({
  lang,
  heroTitle,
  heroSubtitle,
  heroCtaText,
  healingIntro,
  publisherTitle,
  publisherIntro,
  publisherTopics,
  children,
}: {
  lang: Locale
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  healingIntro: string
  publisherTitle: string
  publisherIntro: string
  publisherTopics: PublisherTopic[]
  children?: React.ReactNode
}) {
  const featuredInsightTitle =
    lang === "zh"
      ? "前沿洞察：CBT-I 与睡眠科学"
      : "Featured Insight: CBT-I & Sleep Science"

  const featuredInsightBody =
    lang === "zh"
      ? "失眠的认知行为疗法（CBT-I）被美国内科医师学会推荐为慢性失眠的一线治疗方案，其疗效优于药物且无副作用。CBT-I 通过五大核心组件——刺激控制、睡眠限制、认知重建、睡眠卫生教育及放松训练——系统性地重建患者的睡眠驱动力与床的正向关联。临床研究显示，4-8 周的 CBT-I 干预可使 70-80% 的慢性失眠患者症状显著改善，且效果在治疗结束后可持续至少 12 个月。与安眠药不同，CBT-I 不产生药物依赖，不破坏睡眠结构，而是从根本上修复人体内在的睡眠调节机制。DeepCalm AI 将这套循证方案数字化、个性化，让你随时随地获得科学睡眠支持。"
      : "Cognitive Behavioral Therapy for Insomnia (CBT-I) is recommended by the American College of Physicians as the first-line treatment for chronic insomnia, outperforming medication with zero side effects. CBT-I systematically rebuilds sleep drive and positive bed associations through five core components—stimulus control, sleep restriction, cognitive restructuring, sleep hygiene education, and relaxation training. Clinical studies show that 4-8 weeks of CBT-I intervention leads to significant improvement in 70-80% of chronic insomnia patients, with benefits sustained for at least 12 months post-treatment. Unlike sleeping pills, CBT-I creates no dependency and doesn't disrupt sleep architecture—it fundamentally repairs the body's natural sleep regulation mechanisms. DeepCalm AI digitizes and personalizes this evidence-based protocol, giving you science-backed sleep support anytime, anywhere."

  return (
    <div className="relative min-h-screen">
      <main className="relative z-10">
        {/* ═══ Interactive layer (Hero + Tools + Counselor + Resonance) ═══ */}
        <InteractiveAreas
          lang={lang}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          heroCtaText={heroCtaText}
        >
          {children}
        </InteractiveAreas>

        {/* ═══ 入门层：简短疗愈 Intro — SSR visible ═══ */}
        <section aria-labelledby="sanctuary-intro" className="mx-auto max-w-3xl px-4 pb-5 sm:px-6">
          <div className="rounded-3xl border border-[#c4d8cd] bg-[#f8fcf9] p-5 shadow-xl sm:p-8">
            <h2 id="sanctuary-intro" className="text-lg font-semibold text-[#214b3a]">
              {lang === "zh" ? "你的心灵庇护所" : "Your Sanctuary"}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#263e34] sm:text-lg">
              {healingIntro}
            </p>
          </div>
        </section>

        {/* ── Daily Health Briefing — SSR ready ── */}
        <DailyBriefing lang={lang} />

        {/* ═══ 深度层：SSR 可折叠前沿洞察 — 1500+ chars visible in HTML ═══ */}
        <section className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 sm:pb-12">
          <SsrAccordion title={featuredInsightTitle}>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                {featuredInsightBody}
              </p>
              <div className="mt-6">
                <Link
                  href={`/${lang}/library/sleep-science-guide`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#214b3a] text-white font-semibold text-sm hover:bg-[#16382b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214b3a] transition-colors"
                >
                  {lang === "zh" ? "深入阅读 →" : "Read In-Depth →"}
                </Link>
              </div>
          </SsrAccordion>
        </section>

        {/* ═══ 发布商内容 — SSR 静态可见 ═══ */}
        <PublisherContentBlock
          lang={lang}
          title={publisherTitle}
          intro={publisherIntro}
          topics={publisherTopics}
        />
      </main>
    </div>
  )
}

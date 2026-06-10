import Link from "next/link"
import type { Locale } from "@/types"
import AiCounselor from "./AiCounselor"
import BackgroundCanvas from "./BackgroundCanvas"
import BackgroundVideo from "./BackgroundVideo"
import HealingToolbox from "./HealingToolbox"
import HeroSection from "./HeroSection"
import PublisherContentBlock, { type PublisherTopic } from "./PublisherContentBlock"
import ResonanceWall from "./ResonanceWall"

export default function SanctuaryPage({
  lang,
  heroTitle,
  heroSubtitle,
  heroCtaText,
  publisherTitle,
  publisherIntro,
  publisherTopics,
}: {
  lang: Locale
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  publisherTitle: string
  publisherIntro: string
  publisherTopics: PublisherTopic[]
}) {
  const videoMode = true

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
      <BackgroundVideo
        src="/videos/forest.mp4"
        overlayOpacity={0.5}
        enabled={videoMode}
      />
      <BackgroundCanvas videoMode={videoMode} />

      <div className="fixed inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full animate-breathing-halo-4-7"
          style={{
            background: "radial-gradient(circle, rgba(126,184,255,0.12) 0%, rgba(106,90,205,0.08) 40%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full animate-breathe-inner-4-7"
          style={{
            background: "radial-gradient(circle, rgba(126,184,255,0.1) 0%, rgba(78,205,196,0.06) 35%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <main className="relative z-10">
        <HeroSection title={heroTitle} subtitle={heroSubtitle} ctaText={heroCtaText} />

        {/* AI Counselor — elevated to above-the-fold visual center */}
        <section id="ai-counselor" className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-10">
          <div className="w-full">
            <AiCounselor />
          </div>
        </section>

        {/* Featured Insight: CBT-I deep content */}
        <section className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40 backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-dc-text leading-snug">
                {featuredInsightTitle}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-dc-muted leading-relaxed">
                {featuredInsightBody}
              </p>
              <div className="mt-6">
                <Link
                  href={`/${lang}/library/sleep-science-guide`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dc-accent text-dc-deep font-semibold text-sm hover:bg-dc-accent/90 transition-all duration-300 shadow-lg shadow-dc-accent/20"
                >
                  {lang === "zh" ? "深入阅读 →" : "Read In-Depth →"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PublisherContentBlock
          lang={lang}
          title={publisherTitle}
          intro={publisherIntro}
          topics={publisherTopics}
        />

        <HealingToolbox />

        <section id="resonance-wall" className="w-full py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <ResonanceWall />
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 text-xs text-dc-muted/40 pointer-events-none">
        DeepCalm AI · Midnight Sanctuary
      </div>
    </div>
  )
}

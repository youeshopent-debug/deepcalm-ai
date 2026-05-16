import SanctuaryPage from "@/components/SanctuaryPage"
import type { PublisherTopic } from "@/components/PublisherContentBlock"
import { getDict, tt } from "@/lib/getDict"
import type { Locale } from "@/types"

const DEFAULT_PUBLISHER_TOPICS: PublisherTopic[] = [
  { label: "#REM睡眠", slug: "deep-sleep" },
  { label: "#CBT-I", slug: "insomnia" },
  { label: "#焦虑管理", slug: "sleep-anxiety" },
  { label: "#皮质醇控制", slug: "sleep-anxiety" },
]

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (lang as Locale) || "zh"
  const dict = getDict(locale)

  const heroTitle = tt(dict, "hero.title") || "DeepCalm AI"
  const heroSubtitle = tt(dict, "hero.subtitle") || ""
  const heroCtaText = tt(dict, "hero.cta") || "Start"

  const publisherTitle = tt(dict, "seoContent.title") || "Sleep Science"
  const publisherIntro = tt(dict, "seoContent.p1") || ""

  return (
    <SanctuaryPage
      lang={locale}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      heroCtaText={heroCtaText}
      publisherTitle={publisherTitle}
      publisherIntro={publisherIntro}
      publisherTopics={DEFAULT_PUBLISHER_TOPICS}
    />
  )
}

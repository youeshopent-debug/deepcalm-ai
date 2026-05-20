import SanctuaryPage from "@/components/SanctuaryPage"
import LibraryPreview from "@/components/LibraryPreview"
import type { PublisherTopic } from "@/components/PublisherContentBlock"
import { getDict, tt } from "@/lib/getDict"
import type { Locale } from "@/types"

const DEFAULT_PUBLISHER_TOPICS: PublisherTopic[] = [
  { label: "#REM睡眠", slug: "deep-sleep" },
  { label: "#CBT-I", slug: "insomnia" },
  { label: "#焦虑管理", slug: "sleep-anxiety" },
  { label: "#皮质醇控制", slug: "sleep-anxiety" },
]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (lang as Locale) || "zh"
  const dict = getDict(locale)

  const title = tt(dict, "hero.title") || "DeepCalm AI"
  const descriptionRaw = tt(dict, "seoContent.p1") || tt(dict, "hero.subtitle") || ""
  const description = descriptionRaw.length > 200 ? `${descriptionRaw.slice(0, 200)}…` : descriptionRaw

  return {
    title,
    description,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        zh: "/zh",
        en: "/en",
        ms: "/ms",
        ja: "/ja",
        ko: "/ko",
        th: "/th",
        es: "/es",
      },
    },
    openGraph: { title, description },
  }
}

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
    <>
      <SanctuaryPage
        lang={locale}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroCtaText={heroCtaText}
        publisherTitle={publisherTitle}
        publisherIntro={publisherIntro}
        publisherTopics={DEFAULT_PUBLISHER_TOPICS}
      />
      <LibraryPreview locale={locale} />
    </>
  )
}

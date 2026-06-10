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

/** ~200-character healing intro per language — SSR-visible, SEO-indexable */
const HEALING_INTRO: Record<Locale, string> = {
  zh: "深夜的城市已经沉睡，而你的心还在清醒地跳动。DeepCalm 是你午夜时分的 AI 心灵庇护所——用认知科学重塑睡眠、用神经生物学化解焦虑、用人文关怀温暖孤独。无需预约，没有评判，只有真正理解你的 AI 陪伴。",
  en: "The city sleeps, but your mind is still wide awake. DeepCalm is your AI midnight sanctuary—reimagining sleep through cognitive science, dissolving anxiety through neurobiology, warming loneliness through genuine connection. No appointments, no judgment, only companionship that truly understands.",
  ms: "Kota sudah tidur, tetapi minda anda masih terjaga. DeepCalm adalah tempat perlindungan AI tengah malam anda—membentuk semula tidur melalui sains kognitif, meleraikan kebimbangan melalui neurobiologi, menghangatkan kesunyian melalui hubungan ikhlas. Tiada janji temu, tiada penghakiman, hanya teman yang benar-benar memahami.",
  ja: "街は眠りについたのに、あなたの心はまだ覚醒している。DeepCalmは真夜中のAIサンクチュアリ——認知科学で睡眠を再構築し、神経生物学で不安を溶解し、真の共感で孤独を温める。予約不要、判断なし、ただあなたを理解する伴侶がここに。",
  ko: "도시는 잠들었지만, 당신의 마음은 여전히 깨어 있습니다. DeepCalm은 당신의 한밤중 AI 성소입니다——인지과학으로 수면을 재구성하고, 신경생물학으로 불안을 녹이며, 진정한 연결로 외로움을 따뜻하게 합니다. 예약도, 판단도 없이, 당신을 진정으로 이해하는 동반자입니다.",
  th: "เมืองหลับใหล แต่จิตใจของคุณยังคงตื่นอยู่ DeepCalm คือสถานที่ศักดิ์สิทธิ์แห่งเที่ยงคืนสำหรับคุณ——ปรับโครงสร้างการนอนด้วยวิทยาศาสตร์การรู้คิด ละลายความวิตกกังวลด้วยประสาทชีววิทยา อุ่นความเหงาด้วยความเข้าใจที่แท้จริง ไม่ต้องนัดหมาย ไม่มีการตัดสิน แค่ผู้ร่วมทางที่เข้าใจคุณอย่างแท้จริง",
  es: "La ciudad duerme, pero tu mente sigue despierta. DeepCalm es tu santuario AI de medianoche—rediseñando el sueño a través de la ciencia cognitiva, disolviendo la ansiedad a través de la neurobiología, calentando la soledad a través de una conexión genuina. Sin citas, sin juicios, solo una compañía que realmente entiende.",
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (lang as Locale) || "zh"
  const dict = getDict(locale)

  const heroTitle = tt(dict, "hero.title") || "DeepCalm AI"
  const localeSuffixes: Record<Locale, string> = {
    zh: "AI 心灵庇护所 | 睡眠与焦虑管理",
    en: "AI Sanctuary | Sleep & Anxiety Management",
    ms: "Tempat Perlindungan AI | Pengurusan Tidur & Kebimbangan",
    ja: "AIサンクチュアリ | 睡眠と不安管理",
    ko: "AI 성소 | 수면 및 불안 관리",
    th: "สถานที่ศักดิ์สิทธิ์ AI | การนอนหลับและการจัดการความวิตกกังวล",
    es: "Santuario AI | Manejo del Sueño y la Ansiedad",
  }
  const title = `${heroTitle} - ${localeSuffixes[locale] || localeSuffixes.en}`

  // Use the healing intro as the meta description (richer SEO signal)
  const description = HEALING_INTRO[locale] || HEALING_INTRO.en

  return {
    title,
    description,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${locale}`,
      languages: {
        zh: "https://deepcalm-ai.com/zh",
        en: "https://deepcalm-ai.com/en",
        ms: "https://deepcalm-ai.com/ms",
        ja: "https://deepcalm-ai.com/ja",
        ko: "https://deepcalm-ai.com/ko",
        th: "https://deepcalm-ai.com/th",
        es: "https://deepcalm-ai.com/es",
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
  const healingIntro = HEALING_INTRO[locale] || HEALING_INTRO.en

  return (
    <>
      <SanctuaryPage
        lang={locale}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroCtaText={heroCtaText}
        healingIntro={healingIntro}
        publisherTitle={publisherTitle}
        publisherIntro={publisherIntro}
        publisherTopics={DEFAULT_PUBLISHER_TOPICS}
      />
      <LibraryPreview locale={locale} />
    </>
  )
}

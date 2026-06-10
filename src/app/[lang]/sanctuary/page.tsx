import SanctuaryPage from "@/components/SanctuaryPage"
import type { PublisherTopic } from "@/components/PublisherContentBlock"
import { getDict, tt } from "@/lib/getDict"
import type { Locale } from "@/types"

const ALL_LOCALES: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

const DEFAULT_PUBLISHER_TOPICS: PublisherTopic[] = [
  { label: "#REM睡眠", slug: "deep-sleep" },
  { label: "#CBT-I", slug: "insomnia" },
  { label: "#焦虑管理", slug: "sleep-anxiety" },
  { label: "#皮质醇控制", slug: "sleep-anxiety" },
]

/** ~200-character healing intro per locale — SSR-visible, SEO-indexable */
const HEALING_INTRO: Record<Locale, string> = {
  zh: "深夜的城市已经沉睡，而你的心还在清醒地跳动。DeepCalm 是你午夜时分的 AI 心灵庇护所——用认知科学重塑睡眠、用神经生物学化解焦虑、用人文关怀温暖孤独。无需预约，没有评判，只有真正理解你的 AI 陪伴。",
  en: "The city sleeps, but your mind is still wide awake. DeepCalm is your AI midnight sanctuary—reimagining sleep through cognitive science, dissolving anxiety through neurobiology, warming loneliness through genuine connection. No appointments, no judgment, only companionship that truly understands.",
  ms: "Kota sudah tidur, tetapi minda anda masih terjaga. DeepCalm adalah tempat perlindungan AI tengah malam anda—membentuk semula tidur melalui sains kognitif, meleraikan kebimbangan melalui neurobiologi, menghangatkan kesunyian melalui hubungan ikhlas. Tiada janji temu, tiada penghakiman, hanya teman yang benar-benar memahami.",
  ja: "街は眠りについたのに、あなたの心はまだ覚醒している。DeepCalmは真夜中のAIサンクチュアリ——認知科学で睡眠を再構築し、神経生物学で不安を溶解し、真の共感で孤独を温める。予約不要、判断なし、ただあなたを理解する伴侶がここに。",
  ko: "도시는 잠들었지만, 당신의 마음은 여전히 깨어 있습니다. DeepCalm은 당신의 한밤중 AI 성소입니다——인지과학으로 수면을 재구성하고, 신경생물학으로 불안을 녹이며, 진정한 연결로 외로움을 따뜻하게 합니다. 예약도, 판단도 없이, 당신을 진정으로 이해하는 동반자입니다.",
  th: "เมืองหลับใหล แต่จิตใจของคุณยังคงตื่นอยู่ DeepCalm คือสถานที่ศักดิ์สิทธิ์แห่งเที่ยงคืนสำหรับคุณ——ปรับโครงสร้างการนอนด้วยวิทยาศาสตร์การรู้คิด ละลายความวิตกกังวลด้วยประสาทชีววิทยา อุ่นความเหงาด้วยความเข้าใจที่แท้จริง ไม่ต้องนัดหมาย ไม่มีการตัดสิน แค่ผู้ร่วมทางที่เข้าใจคุณอย่างแท้จริง",
  es: "La ciudad duerme, pero tu mente sigue despierta. DeepCalm es tu santuario AI de medianoche—rediseñando el sueño a través de la ciencia cognitiva, disolviendo la ansiedad a través de la neurobiología, calentando la soledad a través de una conexión genuina. Sin citas, sin juicios, solo una compañía que realmente entiende.",
}

export async function generateStaticParams() {
  return ALL_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (lang as Locale) || "zh"
  const dict = getDict(locale)

  const heroTitle = tt(dict, "hero.title") || "DeepCalm AI"
  const sanctuarySuffixes: Record<Locale, string> = {
    zh: "AI 心灵庇护所 — 睡眠与焦虑管理",
    en: "AI Sanctuary — Sleep & Anxiety Management",
    ms: "Tempat Perlindungan AI — Pengurusan Tidur & Kebimbangan",
    ja: "AIサンクチュアリ — 睡眠と不安管理",
    ko: "AI 성소 — 수면 및 불안 관리",
    th: "สถานที่ศักดิ์สิทธิ์ AI — การนอนหลับและการจัดการความวิตกกังวล",
    es: "Santuario AI — Manejo del Sueño y la Ansiedad",
  }
  const sanctuarySuffix = sanctuarySuffixes[locale] || sanctuarySuffixes.en
  const seoTitle = `${heroTitle} — ${sanctuarySuffix}`

  const sanctuaryDescriptions: Record<Locale, string> = {
    zh: "DeepCalm AI 心灵庇护所——用认知科学重塑睡眠、用神经生物学化解焦虑。24/7 AI 陪伴，无需预约，没有评判。",
    en: "DeepCalm AI Sanctuary—reimagining sleep through cognitive science, dissolving anxiety through neurobiology. 24/7 AI companionship, no judgment.",
    ms: "Tempat Perlindungan AI DeepCalm—membentuk semula tidur melalui sains kognitif, meleraikan kebimbangan melalui neurobiologi. Teman AI 24/7, tanpa penghakiman.",
    ja: "DeepCalm AIサンクチュアリ——認知科学で睡眠を再構築し、神経生物学で不安を溶解。24時間AI伴侶、判断なし。",
    ko: "DeepCalm AI 성소——인지과학으로 수면을 재구성하고 신경생물학으로 불안을 녹입니다. 24/7 AI 동반자, 판단 없이.",
    th: "สถานที่ศักดิ์สิทธิ์ AI DeepCalm——ปรับโครงสร้างการนอนด้วยวิทยาศาสตร์การรู้คิด ละลายความวิตกกังวลด้วยประสาทชีววิทยา ผู้ร่วมทาง AI ตลอด 24 ชั่วโมง ไม่มีการตัดสิน",
    es: "Santuario AI DeepCalm—rediseñando el sueño a través de la ciencia cognitiva, disolviendo la ansiedad a través de la neurobiología. Acompañante AI 24/7, sin juicios.",
  }

  return {
    title: seoTitle,
    description: sanctuaryDescriptions[locale] || sanctuaryDescriptions.en,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${locale}/sanctuary`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/sanctuary",
        en: "https://deepcalm-ai.com/en/sanctuary",
        ms: "https://deepcalm-ai.com/ms/sanctuary",
        ja: "https://deepcalm-ai.com/ja/sanctuary",
        ko: "https://deepcalm-ai.com/ko/sanctuary",
        th: "https://deepcalm-ai.com/th/sanctuary",
        es: "https://deepcalm-ai.com/es/sanctuary",
      },
    },
    openGraph: { title: seoTitle, description: sanctuaryDescriptions[locale] || sanctuaryDescriptions.en },
  }
}

export default async function SanctuaryRoute({ params }: { params: Promise<{ lang: string }> }) {
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
  )
}

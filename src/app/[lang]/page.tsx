import { FaqJsonLd, MedicalWebPageJsonLd } from "@/components/JsonLd"
import type { FaqItem } from "@/components/JsonLd"
import SanctuaryPage from "@/components/SanctuaryPage"
import LibraryPreview from "@/components/LibraryPreview"
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

/** 3 FAQ items per locale — injected as FAQPage JSON-LD for E-E-A-T boost */
const HOME_FAQ_ITEMS: Record<Locale, FaqItem[]> = {
  zh: [
    { q: "DeepCalm AI 是什么？", a: "DeepCalm AI 是一个基于认知科学与神经生物学的 AI 心灵庇护所，提供 24/7 的睡眠指导、焦虑管理和情绪健康支持。无需预约，没有评判。" },
    { q: "CBT-I 如何帮助改善失眠？", a: "CBT-I（失眠认知行为疗法）通过识别并改变导致失眠的消极思维和行为模式来改善睡眠。DeepCalm 将 CBT-I 的核心技术融入互动指南中，提供循证支持。" },
    { q: "DeepCalm AI 是免费的吗？", a: "DeepCalm AI 提供免费的基础情绪支持和呼吸练习。高级功能（如个性化 AI 咨询师和深度睡眠引导）可通过订阅解锁。" },
  ],
  en: [
    { q: "What is DeepCalm AI?", a: "DeepCalm AI is an AI-powered sanctuary based on cognitive science and neurobiology, offering 24/7 sleep guidance, anxiety management, and emotional wellness support. No appointments, no judgment." },
    { q: "How does CBT-I help with insomnia?", a: "CBT-I (Cognitive Behavioral Therapy for Insomnia) improves sleep by identifying and changing negative thoughts and behaviors that cause or worsen sleep difficulties. DeepCalm integrates core CBT-I techniques into interactive guides." },
    { q: "Is DeepCalm AI free?", a: "DeepCalm AI offers free basic emotional support and breathing exercises. Premium features including personalized AI counselor and deep sleep guidance are available via subscription." },
  ],
  ms: [
    { q: "Apakah DeepCalm AI?", a: "DeepCalm AI adalah tempat perlindungan AI berdasarkan sains kognitif dan neurobiologi, menawarkan bimbingan tidur 24/7, pengurusan kebimbangan, dan sokongan kesihatan emosi. Tiada janji temu, tiada penghakiman." },
    { q: "Bagaimana CBT-I membantu mengatasi insomnia?", a: "CBT-I (Terapi Kognitif Tingkah Laku untuk Insomnia) meningkatkan tidur dengan mengenal pasti dan mengubah pemikiran serta tingkah laku negatif yang menyebabkan kesukaran tidur. DeepCalm mengintegrasikan teknik CBT-I ke dalam panduan interaktif." },
    { q: "Adakah DeepCalm AI percuma?", a: "DeepCalm AI menawarkan sokongan emosi asas dan latihan pernafasan secara percuma. Ciri premium seperti kaunselor AI peribadi dan panduan tidur nyenyak tersedia melalui langganan." },
  ],
  ja: [
    { q: "DeepCalm AI とは何ですか？", a: "DeepCalm AI は認知科学と神経生物学に基づく AI サンクチュアリで、24時間睡眠ガイダンス、不安管理、感情的健康サポートを提供します。予約不要、判断なし。" },
    { q: "CBT-I は不眠症にどのように役立ちますか？", a: "CBT-I（不眠症のための認知行動療法）は、睡眠障害を引き起こす否定的な思考や行動を特定し変えることで睡眠を改善します。DeepCalm は CBT-I の中核技術をインタラクティブガイドに統合しています。" },
    { q: "DeepCalm AI は無料ですか？", a: "DeepCalm AI は無料の基本的な感情サポートと呼吸法を提供しています。パーソナライズされた AI カウンセラーやディープスリープガイドなどのプレミアム機能はサブスクリプションで利用可能です。" },
  ],
  ko: [
    { q: "DeepCalm AI란 무엇인가요?", a: "DeepCalm AI는 인지과학과 신경생물학에 기반한 AI 성소로, 24/7 수면 가이드, 불안 관리, 정서 웰빙 지원을 제공합니다. 예약도, 판단도 없습니다." },
    { q: "CBT-I는 불면증에 어떻게 도움이 되나요?", a: "CBT-I(불면증 인지행동치료)는 수면 문제를 일으키는 부정적인 생각과 행동을 식별하고 변화시켜 수면을 개선합니다. DeepCalm은 CBT-I 핵심 기술을 대화형 가이드에 통합했습니다." },
    { q: "DeepCalm AI는 무료인가요?", a: "DeepCalm AI는 무료 기본 정서 지원과 호흡 운동을 제공합니다. 맞춤형 AI 상담사 및 깊은 수면 가이드를 포함한 프리미엄 기능은 구독을 통해 이용할 수 있습니다." },
  ],
  th: [
    { q: "DeepCalm AI คืออะไร?", a: "DeepCalm AI คือสถานที่ศักดิ์สิทธิ์ AI บนพื้นฐานของวิทยาศาสตร์การรู้คิดและประสาทชีววิทยา ให้คำแนะนำการนอนหลับตลอด 24 ชั่วโมง การจัดการความวิตกกังวล และการสนับสนุนสุขภาพทางอารมณ์ ไม่ต้องนัดหมาย ไม่มีการตัดสิน" },
    { q: "CBT-I ช่วยเรื่องนอนไม่หลับอย่างไร?", a: "CBT-I (การบำบัดทางความคิดและพฤติกรรมสำหรับอาการนอนไม่หลับ) ช่วยปรับปรุงการนอนหลับโดยการระบุและเปลี่ยนแปลงความคิดและพฤติกรรมเชิงลบที่ก่อให้เกิดปัญหาการนอนหลับ DeepCalm ผสานเทคนิค CBT-I หลักเข้ากับคำแนะนำแบบโต้ตอบ" },
    { q: "DeepCalm AI ฟรีหรือไม่?", a: "DeepCalm AI ให้บริการสนับสนุนทางอารมณ์ขั้นพื้นฐานและแบบฝึกหัดการหายใจฟรี คุณสมบัติพรีเมียมรวมถึงที่ปรึกษา AI ส่วนตัวและคำแนะนำการนอนหลับลึกสามารถเข้าถึงได้ผ่านการสมัครสมาชิก" },
  ],
  es: [
    { q: "¿Qué es DeepCalm AI?", a: "DeepCalm AI es un santuario AI basado en ciencia cognitiva y neurobiología, que ofrece orientación del sueño 24/7, manejo de la ansiedad y apoyo para el bienestar emocional. Sin citas, sin juicios." },
    { q: "¿Cómo ayuda la TCC-I con el insomnio?", a: "La TCC-I (Terapia Cognitivo-Conductual para el Insomnio) mejora el sueño identificando y cambiando pensamientos y conductas negativas que causan dificultades para dormir. DeepCalm integra técnicas centrales de TCC-I en guías interactivas." },
    { q: "¿DeepCalm AI es gratuito?", a: "DeepCalm AI ofrece apoyo emocional básico y ejercicios de respiración gratuitos. Las funciones premium, incluyendo consejero AI personalizado y guía de sueño profundo, están disponibles mediante suscripción." },
  ],
}

export async function generateStaticParams() {
  return ALL_LOCALES.map((lang) => ({ lang }))
}

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

  const faqItems = HOME_FAQ_ITEMS[locale] || HOME_FAQ_ITEMS.en

  return (
    <>
      <MedicalWebPageJsonLd locale={locale} />
      <FaqJsonLd items={faqItems} locale={locale} />
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

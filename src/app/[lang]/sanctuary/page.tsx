import { FaqJsonLd, MedicalWebPageJsonLd, SanctuaryWebPageJsonLd } from "@/components/JsonLd"
import type { FaqItem } from "@/components/JsonLd"
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

/** 2 FAQ items per locale — Sanctuary-specific FAQ schema for E-E-A-T boost */
const SANCTUARY_FAQ_ITEMS: Record<Locale, FaqItem[]> = {
  zh: [
    { q: "DeepCalm AI 心灵庇护所是什么？", a: "心灵庇护所是 DeepCalm 的夜间 AI 陪伴空间，融合呼吸引导、认知行为技术（CBT-I）与沉浸式视听氛围，帮助你缓解焦虑、改善睡眠。24/7 开放，无需预约。" },
    { q: "庇护所的呼吸引导如何使用？", a: "进入庇护所后，点击工具卡中的「呼吸引导」按钮即可启动。跟随屏幕上的动画进行 4-7-8 呼吸法（吸气4秒、屏息7秒、呼气8秒），有效激活副交感神经系统，降低焦虑水平。" },
  ],
  en: [
    { q: "What is the DeepCalm AI Sanctuary?", a: "The Sanctuary is DeepCalm's nighttime AI companionship space, combining breathing guidance, cognitive behavioral techniques (CBT-I), and immersive audiovisual ambiance to help relieve anxiety and improve sleep. Open 24/7, no appointment needed." },
    { q: "How do I use the breathing exercises in the Sanctuary?", a: "Enter the Sanctuary and click the 'Breathing Guide' button on the tool cards. Follow the on-screen animation for 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s) to activate the parasympathetic nervous system and reduce anxiety levels." },
  ],
  ms: [
    { q: "Apakah Tempat Perlindungan AI DeepCalm?", a: "Tempat Perlindungan adalah ruang teman AI malam DeepCalm, menggabungkan panduan pernafasan, teknik kognitif-tingkah laku (CBT-I), dan suasana audiovisual yang mendalam untuk membantu melegakan kebimbangan dan meningkatkan tidur. Buka 24/7, tiada janji temu diperlukan." },
    { q: "Bagaimana cara menggunakan latihan pernafasan di Tempat Perlindungan?", a: "Masuk ke Tempat Perlindungan dan klik butang 'Panduan Pernafasan' pada kad alat. Ikuti animasi pada skrin untuk pernafasan 4-7-8 (tarik nafas 4s, tahan 7s, hembus 8s) untuk mengaktifkan sistem saraf parasimpatetik dan mengurangkan tahap kebimbangan." },
  ],
  ja: [
    { q: "DeepCalm AI サンクチュアリとは何ですか？", a: "サンクチュアリは DeepCalm の夜間 AI 伴侶空間です。呼吸ガイダンス、認知行動テクニック（CBT-I）、没入型オーディオビジュアル環境を組み合わせ、不安を和らげ睡眠を改善します。24時間いつでも利用可能、予約不要。" },
    { q: "サンクチュアリの呼吸法はどう使いますか？", a: "サンクチュアリに入り、ツールカードの「呼吸ガイド」ボタンをクリックします。画面上のアニメーションに従って4-7-8呼吸法（4秒吸入、7秒停止、8秒呼出）を行い、副交感神経系を活性化して不安レベルを低下させます。" },
  ],
  ko: [
    { q: "DeepCalm AI 성소란 무엇인가요?", a: "성소는 DeepCalm의 야간 AI 동반자 공간입니다. 호흡 가이드, 인지행동 기법(CBT-I), 몰입형 오디오비주얼 환경을 결합하여 불안을 완화하고 수면을 개선합니다. 연중무휴 24시간 이용 가능, 예약 불필요." },
    { q: "성소에서 호흡 운동은 어떻게 사용하나요?", a: "성소에 입장한 후 도구 카드의 '호흡 가이드' 버튼을 클릭하세요. 화면의 애니메이션을 따라 4-7-8 호흡법(4초 흡입, 7초 유지, 8초 호기)을 수행하여 부교감 신경계를 활성화하고 불안 수준을 낮춥니다." },
  ],
  th: [
    { q: "สถานที่ศักดิ์สิทธิ์ DeepCalm AI คืออะไร?", a: "สถานที่ศักดิ์สิทธิ์คือพื้นที่ผู้ร่วมทาง AI ในยามค่ำคืนของ DeepCalm ผสมผสานการแนะนำการหายใจ เทคนิคการรู้คิดและพฤติกรรม (CBT-I) และบรรยากาศ视听ที่ดื่มด่ำเพื่อช่วยบรรเทาความวิตกกังวลและปรับปรุงการนอนหลับ เปิดตลอด 24 ชั่วโมง ไม่ต้องนัดหมาย" },
    { q: "จะใช้แบบฝึกหัดการหายใจในสถานที่ศักดิ์สิทธิ์อย่างไร?", a: "เข้าสู่สถานที่ศักดิ์สิทธิ์แล้วคลิกปุ่ม 'คำแนะนำการหายใจ' บนการ์ดเครื่องมือ ทำตามภาพเคลื่อนไหวบนหน้าจอสำหรับการหายใจแบบ 4-7-8 (หายใจเข้า 4 วินาที กลั้น 7 วินาที หายใจออก 8 วินาที) เพื่อกระตุ้นระบบประสาทพาราซิมพาเทติกและลดระดับความวิตกกังวล" },
  ],
  es: [
    { q: "¿Qué es el Santuario AI DeepCalm?", a: "El Santuario es el espacio nocturno de compañía AI de DeepCalm, combinando guía de respiración, técnicas cognitivo-conductuales (TCC-I) y ambiente audiovisual inmersivo para ayudar a aliviar la ansiedad y mejorar el sueño. Abierto 24/7, sin cita previa." },
    { q: "¿Cómo uso los ejercicios de respiración en el Santuario?", a: "Ingrese al Santuario y haga clic en el botón 'Guía de Respiración' en las tarjetas de herramientas. Siga la animación en pantalla para la respiración 4-7-8 (inhale 4s, sostenga 7s, exhale 8s) para activar el sistema nervioso parasimpático y reducir los niveles de ansiedad." },
  ],
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
  const faqItems = SANCTUARY_FAQ_ITEMS[locale] || SANCTUARY_FAQ_ITEMS.en

  return (
    <>
      <MedicalWebPageJsonLd locale={locale} />
      <FaqJsonLd items={faqItems} locale={locale} />
      <SanctuaryWebPageJsonLd locale={locale} />
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
    </>
  )
}

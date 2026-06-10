import type { Locale } from "@/types"
import { getTopics, getTopicsByCategory } from "@/content/topics"
import { getDict, tt } from "@/lib/getDict"
import LibraryCard from "@/components/LibraryCard"
import Breadcrumb from "@/components/Breadcrumb"
import { BookOpen } from "lucide-react"

const CATEGORY_ORDER = ["sleep", "anxiety", "grief_loss", "loneliness", "self_worth", "relationships", "identity", "mindfulness", "emotional_health"]

const CATEGORY_NAMES: Record<string, Record<Locale, string>> = {
  sleep: { zh: "睡眠科学", en: "Sleep Science", ms: "Sains Tidur", ja: "睡眠科学", ko: "수면 과학", th: "วิทยาศาสตร์การนอนหลับ", es: "Ciencia del Sueño" },
  anxiety: { zh: "焦虑管理", en: "Anxiety Management", ms: "Pengurusan Kebimbangan", ja: "不安管理", ko: "불안 관리", th: "การจัดการความกังวล", es: "Manejo de la Ansiedad" },
  grief_loss: { zh: "哀伤与失落", en: "Grief & Loss", ms: "Kesedihan & Kehilangan", ja: "悲しみと喪失", ko: "슬픔과 상실", th: "ความเศร้าและการสูญเสีย", es: "Duelo y Pérdida" },
  loneliness: { zh: "孤独感", en: "Loneliness", ms: "Kesunyian", ja: "孤独", ko: "외로움", th: "ความเหงา", es: "Soledad" },
  self_worth: { zh: "自我价值", en: "Self-Worth", ms: "Harga Diri", ja: "自己価値", ko: "자존감", th: "คุณค่าในตนเอง", es: "Autoestima" },
  relationships: { zh: "人际关系", en: "Relationships", ms: "Hubungan", ja: "人間関係", ko: "관계", th: "ความสัมพันธ์", es: "Relaciones" },
  identity: { zh: "身份认同", en: "Identity", ms: "Identiti", ja: "アイデンティティ", ko: "정체성", th: "อัตลักษณ์", es: "Identidad" },
  mindfulness: { zh: "正念练习", en: "Mindfulness", ms: "Kesedaran", ja: "マインドフルネス", ko: "마음챙김", th: "การมีสติ", es: "Atención Plena" },
  emotional_health: { zh: "情绪健康", en: "Emotional Health", ms: "Kesihatan Emosi", ja: "感情的健康", ko: "정서 건강", th: "สุขภาพทางอารมณ์", es: "Salud Emocional" },
}

const CATEGORY_INTROS: Record<string, Record<Locale, string>> = {
  sleep: {
    zh: "从 REM 睡眠周期到失眠的认知行为疗法，深入理解睡眠的神经机制与优化方法。",
    en: "From REM sleep cycles to CBT-I, explore the neuroscience of sleep and evidence-based optimization.",
    ms: "Dari kitaran REM ke CBT-I, terokai neurosains tidur dan pengoptimuman berasaskan bukti.",
    ja: "REM睡眠サイクルからCBT-Iまで、睡眠の神経科学と最適化方法を探求します。",
    ko: "REM 수면 주기부터 CBT-I까지, 수면의 신경과학과 최적화 방법을 탐구합니다.",
    th: "จากวงจรการนอนหลับ REM ถึง CBT-I สำรวจประสาทวิทยาศาสตร์ของการนอนหลับ",
    es: "Desde los ciclos REM hasta la CBT-I, explora la neurociencia del sueño y su optimización.",
  },
  anxiety: {
    zh: "理解焦虑的生理机制，学习基于 CBT 和正念的焦虑管理技术。",
    en: "Understand the physiology of anxiety and master CBT & mindfulness-based management techniques.",
    ms: "Fahami fisiologi kebimbangan dan kuasai teknik pengurusan berdasarkan CBT & kesedaran.",
    ja: "不安の生理学を理解し、CBTとマインドフルネスに基づく管理技術を習得します。",
    ko: "불안의 생리학을 이해하고 CBT 및 마음챙김 기반 관리 기술을 습득합니다.",
    th: "เข้าใจสรีรวิทยาของความวิตกกังวลและเรียนรู้เทคนิคการจัดการ",
    es: "Comprende la fisiología de la ansiedad y domina técnicas basadas en CBT y atención plena.",
  },
  grief_loss: {
    zh: "哀伤是爱的另一面。探索健康的哀伤过程与心理重建路径。",
    en: "Grief is love's shadow side. Explore healthy grieving and psychological rebuilding.",
    ms: "Kesedihan adalah sisi lain cinta. Terokai proses berduka yang sihat dan pembinaan semula psikologi.",
    ja: "悲しみは愛の裏返し。健全な悲嘆プロセスと心理的再構築を探ります。",
    ko: "슬픔은 사랑의 또 다른 얼굴입니다. 건강한 애도 과정과 심리적 재건을 탐구합니다.",
    th: "ความเศร้าคืออีกด้านของความรัก สำรวจกระบวนการเศร้าโศกที่ดีต่อสุขภาพ",
    es: "El duelo es la otra cara del amor. Explora procesos de duelo saludables y reconstrucción.",
  },
  loneliness: {
    zh: "孤独不是缺陷。理解孤独感的进化根源，学习与它共处。",
    en: "Loneliness is not a flaw. Understand its evolutionary roots and learn to coexist with it.",
    ms: "Kesunyian bukan kelemahan. Fahami punca evolusinya dan belajar hidup dengannya.",
    ja: "孤独は欠点ではありません。その進化的な根源を理解し、共存する方法を学びます。",
    ko: "외로움은 결함이 아닙니다. 진화적 뿌리를 이해하고 공존하는 법을 배웁니다.",
    th: "ความเหงาไม่ใช่ข้อบกพร่อง เข้าใจรากฐานทางวิวัฒนาการ",
    es: "La soledad no es un defecto. Comprende sus raíces evolutivas y aprende a coexistir.",
  },
  self_worth: {
    zh: "重建内在价值感，打破自我批评的循环，培养对自己的善意。",
    en: "Rebuild your sense of inner worth, break the cycle of self-criticism, and cultivate self-compassion.",
    ms: "Bina semula harga diri, putuskan kitaran kritikan diri, dan pupuk belas kasihan pada diri sendiri.",
    ja: "内面的な価値観を再構築し、自己批判のサイクルを断ち切り、自己慈しみを育みます。",
    ko: "내적 가치감을 재건하고 자기 비판의 순환을 끊으며 자기 연민을 기릅니다.",
    th: "สร้างความรู้สึกมีคุณค่าในตนเอง anew",
    es: "Reconstruye tu sentido de valor interno, rompe el ciclo de autocrítica.",
  },
  relationships: {
    zh: "从依恋理论到沟通技巧，建立更健康的人际关系模式。",
    en: "From attachment theory to communication skills, build healthier relationship patterns.",
    ms: "Dari teori lampiran hingga kemahiran komunikasi, bina corak perhubungan yang lebih sihat.",
    ja: "愛着理論からコミュニケーションスキルまで、より健全な人間関係パターンを築きます。",
    ko: "애착 이론에서 의사소통 기술까지, 더 건강한 관계 패턴을 구축합니다.",
    th: "จากทฤษฎีความผูกพันสู่ทักษะการสื่อสาร",
    es: "De la teoría del apego a las habilidades de comunicación, construye relaciones más saludables.",
  },
  identity: {
    zh: "探索身份认同的形成、文化适应与自我定义的多元面向。",
    en: "Explore identity formation, cultural adaptation, and the multidimensional self.",
    ms: "Terokai pembentukan identiti, penyesuaian budaya, dan diri multidimensi.",
    ja: "アイデンティティ形成、文化適応、多次元的自己を探求します。",
    ko: "정체성 형성, 문화 적응, 다차원적 자아를 탐구합니다.",
    th: "สำรวจการก่อตัวของอัตลักษณ์",
    es: "Explora la formación de identidad, adaptación cultural y el yo multidimensional.",
  },
  mindfulness: {
    zh: "正念不是逃避，而是更深刻地活在当下的能力。",
    en: "Mindfulness is not escape — it's the capacity to live more deeply in the present.",
    ms: "Kesedaran bukan pelarian — ia adalah keupayaan untuk hidup lebih mendalam pada masa kini.",
    ja: "マインドフルネスは逃避ではなく、今この瞬間をより深く生きる能力です。",
    ko: "마음챙김은 도피가 아니라 현재에 더 깊이 살아가는 능력입니다.",
    th: "การมีสติไม่ใช่การหลบหนี",
    es: "La atención plena no es escape — es la capacidad de vivir más profundamente el presente.",
  },
  emotional_health: {
    zh: "情绪不是敌人。理解情绪调节的科学，培养情绪韧性。",
    en: "Emotions are not enemies. Understand the science of emotional regulation and build resilience.",
    ms: "Emosi bukan musuh. Fahami sains pengawalan emosi dan bina ketahanan.",
    ja: "感情は敵ではありません。感情調節の科学を理解し、回復力を築きます。",
    ko: "감정은 적이 아닙니다. 감정 조절의 과학을 이해하고 회복력을 기릅니다.",
    th: "อารมณ์ไม่ใช่ศัตรู",
    es: "Las emociones no son enemigas. Comprende la ciencia de la regulación emocional.",
  },
}

const categoryIcon: Record<string, string> = {
  sleep: "🌙", anxiety: "🫀", grief_loss: "💧", loneliness: "🌊",
  self_worth: "✨", relationships: "💞", identity: "🎭",
  mindfulness: "🧘", emotional_health: "💪",
}

export function generateStaticParams() {
  const langs: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]
  return langs.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDict(lang as Locale)
  const en = getDict("en")
  const title = tt(dict, "library.title") || "Midnight Wisdom Library - DeepCalm AI"
  const desc = tt(dict, "library.desc") || tt(en, "library.desc") || "Explore 44 science-backed articles on sleep, anxiety, mindfulness, and emotional health."
  return {
    title,
    description: desc,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/library`,
      languages: {
        zh: "https://deepcalm-ai.com/zh/library", en: "https://deepcalm-ai.com/en/library", ms: "https://deepcalm-ai.com/ms/library",
        ja: "https://deepcalm-ai.com/ja/library", ko: "https://deepcalm-ai.com/ko/library", th: "https://deepcalm-ai.com/th/library", es: "https://deepcalm-ai.com/es/library",
      },
    },
    openGraph: { title, description: desc },
  }
}

export default async function LibraryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDict(locale)

  const allTopics = getTopics(locale)
  const categoriesWithTopics = CATEGORY_ORDER
    .map((cat) => ({ cat, topics: getTopicsByCategory(cat, locale) }))
    .filter(({ topics }) => topics.length > 0)

  return (
    <div className="min-h-screen bg-nord-bg">
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-nord-card/50 via-nord-bg to-nord-bg pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Library", href: `/${locale}/library` }]}
            locale={locale}
          />

          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-nord-accent uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              {locale === "zh" ? "深夜智慧馆" : locale === "ms" ? "Perpustakaan" : locale === "ja" ? "深夜の知恵" : locale === "ko" ? "심야 지혜" : locale === "th" ? "คลังปัญญา" : locale === "es" ? "Biblioteca" : "Midnight Wisdom Library"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-nord-text mb-4">
              {locale === "zh" ? "44 个科学主题，陪你探索内心世界" : "44 science-backed topics for inner exploration"}
            </h1>
            <p className="text-nord-text/50 max-w-2xl mx-auto leading-relaxed">
              {locale === "zh"
                ? "每一篇文章都融合了睡眠科学、认知行为疗法（CBT）与正念研究的真知灼见，帮助你理解自己，找到平静。"
                : "Every article blends sleep science, Cognitive Behavioral Therapy (CBT), and mindfulness research to help you understand yourself and find calm."}
            </p>
          </div>

          <div className="space-y-16">
            {categoriesWithTopics.map(({ cat, topics }) => {
              const icon = categoryIcon[cat] || "📖"
              const catName = CATEGORY_NAMES[cat]?.[locale] || cat
              const intro = CATEGORY_INTROS[cat]?.[locale] || ""
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{icon}</span>
                    <h2 className="text-xl font-bold text-nord-text">{catName}</h2>
                    <span className="text-xs text-nord-text/30 font-mono">({topics.length})</span>
                  </div>
                  {intro && (
                    <p className="text-sm text-nord-text/40 mb-6 ml-9 max-w-2xl">{intro}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {topics.map((topic) => (
                      <LibraryCard
                        key={topic.slug}
                        slug={topic.slug}
                        title={topic.title}
                        description={topic.description}
                        category={topic.category}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

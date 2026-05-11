import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { getGuideBySlug, getGuides } from "@/content/guides"
import ScientificGuide from "@/components/ScientificGuide"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

function getGuideScientificArticles(lang: string) {
  const isZH = lang === "zh"
  const isMS = lang === "ms"
  const isEN = lang === "en"

  const articles = [
    {
      heading: isZH ? "🧠 REM 睡眠周期科学" : isMS ? "🧠 Sains Kitaran Tidur REM" : "🧠 The Science of REM Sleep Cycles",
      paragraphs: [
        isZH
          ? "REM（快速眼动）睡眠是睡眠周期中最关键的阶段之一，通常出现在入睡后约 90 分钟。在这个阶段，大脑的活跃度接近清醒状态，眼球会快速左右移动。科学研究表明，REM 睡眠对记忆巩固和情绪调节至关重要。"
          : isMS
          ? "Tidur REM (Pergerakan Mata Pantas) adalah salah satu fasa paling kritikal dalam kitaran tidur, biasanya muncul kira-kira 90 minit selepas tidur. Dalam fasa ini, aktiviti otak hampir menyamai keadaan jaga, dan mata bergerak pantas ke kiri dan kanan. Penyelidikan saintifik menunjukkan tidur REM adalah penting untuk penyatuan memori dan pengawalan emosi."
          : "REM (Rapid Eye Movement) sleep is one of the most critical stages of the sleep cycle, typically occurring about 90 minutes after falling asleep. During this phase, brain activity nearly matches wakefulness, and eyes move rapidly side to side. Research shows REM sleep is essential for memory consolidation and emotional regulation.",
        isZH
          ? "一个完整的睡眠周期约 90 分钟，成年人每晚通常经历 4-6 个周期。每个周期中，REM 阶段的时间会逐渐延长：第一个周期约 10 分钟，最后一个周期可达 60 分钟。这就是为什么在后半夜被唤醒时更容易记住梦境。"
          : isMS
          ? "Satu kitaran tidur lengkap mengambil masa kira-kira 90 minit, dan orang dewasa biasanya melalui 4-6 kitaran setiap malam. Dalam setiap kitaran, tempoh fasa REM semakin panjang: kitaran pertama kira-kira 10 minit, kitaran terakhir sehingga 60 minit. Inilah sebabnya mengapa lebih mudah mengingati mimpi apabila terjaga pada lewat malam."
          : "A complete sleep cycle takes about 90 minutes, and adults typically go through 4-6 cycles per night. Within each cycle, REM duration gradually extends: the first cycle lasts about 10 minutes, the last can reach 60 minutes. This is why dreams are more easily recalled when waking during the latter half of the night.",
        isZH
          ? "睡眠计算器的最佳起床时间正是基于这一原理：在 REM 阶段结束时（即一个完整周期结束时）醒来，你会感觉更加清醒和精力充沛；而在深度睡眠阶段被叫醒，则会导致睡眠惯性——那种挥之不去的昏沉感可能持续数小时。"
          : isMS
          ? "Masa bangun optimum kalkulator tidur adalah berdasarkan prinsip ini: bangun pada akhir fasa REM (iaitu pada akhir kitaran lengkap) membuatkan anda berasa lebih segar dan bertenaga; manakala dikejutkan semasa tidur nyenyak menyebabkan inersia tidur — rasa mengantuk yang berlarutan sehingga berjam-jam."
          : "The optimal wake time of the sleep calculator is based on this principle: waking at the end of a REM phase (i.e., at the completion of a full cycle) leaves you feeling more alert and energized; being awakened during deep sleep causes sleep inertia — a lingering grogginess that can persist for hours.",
      ],
      findings: [
        isZH ? "成年人完整睡眠周期约 90 分钟，每晚 4-6 个周期" : isMS ? "Kitaran tidur lengkap dewasa ~90 minit, 4-6 kitaran setiap malam" : "Adult sleep cycle ~90 min, 4-6 cycles per night",
        isZH ? "REM 阶段在后半夜逐渐延长（10min → 60min）" : isMS ? "Fasa REM memanjang pada lewat malam (10min → 60min)" : "REM phase lengthens in late night (10min → 60min)",
        isZH ? "周期结束时起床减少睡眠惯性，提升日间表现" : isMS ? "Bangun pada akhir kitaran mengurangkan inersia tidur" : "Waking at cycle end reduces sleep inertia",
      ],
      reference: isZH ? "Walker, M. (2017). Why We Sleep. Scribner." : isMS ? "Walker, M. (2017). Why We Sleep. Scribner." : "Walker, M. (2017). Why We Sleep. Scribner.",
    },
    {
      heading: isZH ? "🫀 CBT 心理学原理与焦虑管理" : isMS ? "🫀 Prinsip CBT & Pengurusan Kebimbangan" : "🫀 CBT Principles & Anxiety Management",
      paragraphs: [
        isZH
          ? "认知行为疗法（CBT）是目前循证医学证明最有效的焦虑和失眠非药物干预手段之一。其核心原理在于：情绪和行为并非由事件本身直接引起，而是由我们对事件的认知（想法）所决定。改变思维方式，就能改变情绪反应。"
          : isMS
          ? "Terapi Tingkah Laku Kognitif (CBT) adalah salah satu intervensi bukan farmakologi yang paling berkesan untuk kebimbangan dan insomnia. Prinsip terasnya ialah: emosi dan tingkah laku tidak langsung disebabkan oleh peristiwa itu sendiri, tetapi oleh kognisi (pemikiran) kita terhadap peristiwa tersebut. Mengubah cara berfikir boleh mengubah reaksi emosi."
          : "Cognitive Behavioral Therapy (CBT) is one of the most effective non-pharmacological interventions for anxiety and insomnia. Its core principle: emotions and behaviors are not directly caused by events themselves, but by our cognitions (thoughts) about those events. Changing how we think can change how we feel.",
        isZH
          ? "在失眠治疗中，CBT-I（针对失眠的 CBT）包含刺激控制、睡眠限制和认知重建三大支柱。刺激控制要求你只在困倦时才上床；睡眠限制通过压缩卧床时间提高睡眠效率；认知重建则帮助你纠正'今晚肯定又睡不着'这类灾难化思维。"
          : isMS
          ? "Dalam rawatan insomnia, CBT-I (CBT untuk Insomnia) merangkumi tiga tonggak utama: kawalan rangsangan, had tidur, dan penyusunan semula kognitif. Kawalan rangsangan memerlukan anda tidur hanya apabila mengantuk; had tidur meningkatkan kecekapan tidur dengan memampatkan masa di katil; penyusunan semula kognitif membantu membetulkan pemikiran bencana seperti 'Saya pasti tak boleh tidur malam ini'."
          : "In insomnia treatment, CBT-I (CBT for Insomnia) comprises three pillars: stimulus control, sleep restriction, and cognitive restructuring. Stimulus control requires you to only go to bed when sleepy; sleep restriction improves sleep efficiency by compressing time in bed; cognitive restructuring helps correct catastrophic thinking like 'I'll definitely not sleep tonight.'",
        isZH
          ? "DeepCalm AI 的 AI 心理咨询师正是基于 CBT 原理设计：通过引导你识别和挑战负面自动思维，逐步建立更健康的认知模式。配合呼吸训练和正念冥想，这种方法已被全球多所顶尖睡眠医学中心采用。"
          : isMS
          ? "Kaunselor AI DeepCalm AI direka berdasarkan prinsip CBT: dengan membimbing anda mengenal pasti dan mencabar pemikiran automatik negatif, ia membantu membina corak kognitif yang lebih sihat secara berperingkat. Digabungkan dengan latihan pernafasan dan meditasi kesedaran, kaedah ini telah diguna pakai oleh banyak pusat perubatan tidur terkemuka dunia."
          : "DeepCalm AI's AI Counselor is designed based on CBT principles: by guiding you to identify and challenge negative automatic thoughts, it helps build healthier cognitive patterns gradually. Combined with breathing exercises and mindfulness meditation, this approach has been adopted by leading sleep medicine centers worldwide.",
      ],
      findings: [
        isZH ? "CBT-I 对慢性失眠的有效率高达 70-80%" : isMS ? "Keberkesanan CBT-I untuk insomnia kronik mencapai 70-80%" : "CBT-I efficacy for chronic insomnia reaches 70-80%",
        isZH ? "认知重建纠正灾难化思维，打破'失眠-焦虑'恶性循环" : isMS ? "Penyusunan semula kognitif membetulkan pemikiran bencana" : "Cognitive restructuring breaks the insomnia-anxiety cycle",
        isZH ? "效果可持续 12 个月以上，优于安眠药的短期缓解" : isMS ? "Kesan bertahan >12 bulan, lebih baik daripada ubat tidur" : "Effects last >12 months, superior to sleep medication",
      ],
      reference: isZH ? "Edinger, J.D., et al. (2021). Cognitive Behavioral Therapy for Insomnia. Sleep Medicine Reviews." : isMS ? "Edinger, J.D., et al. (2021). CBT for Insomnia. Sleep Medicine Reviews." : "Edinger, J.D., et al. (2021). Cognitive Behavioral Therapy for Insomnia. Sleep Medicine Reviews.",
    },
  ]

  return articles
}

export async function generateStaticParams() {
  const guides = getGuides()
  const langs = ["zh", "en", "ms"]
  const params: { lang: string; slug: string }[] = []
  for (const lang of langs) {
    for (const guide of guides) {
      params.push({ lang, slug: guide.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const guide = getGuideBySlug(slug, lang)
  if (!guide) return {}
  const dict = await getDict(lang as Locale)
  return {
    title: `${guide.title} - DeepCalm AI`,
    description: guide.description,
    keywords: guide.keywords,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `/${lang}/guide/${slug}`,
      languages: {
        zh: `/zh/guide/${slug}`,
        en: `/en/guide/${slug}`,
        ms: `/ms/guide/${slug}`,
        ja: `/ja/guide/${slug}`,
        ko: `/ko/guide/${slug}`,
        th: `/th/guide/${slug}`,
        es: `/es/guide/${slug}`,
      },
    },
    openGraph: {
      title: `${guide.title} - DeepCalm AI`,
      description: guide.description,
    },
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const guide = getGuideBySlug(slug, lang)
  if (!guide) notFound()
  const dict = await getDict(lang as Locale)

  return (
    <div className="min-h-screen bg-nord-bg">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href={`/${lang}/guide`}
          className="inline-flex items-center gap-2 text-nord-accent hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {dict.guide.backToList}
        </Link>
        <span className="text-xs font-medium text-nord-accent uppercase tracking-wider">
          {dict.guide[`category_${guide.category}` as keyof typeof dict.guide] as string}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-nord-text mt-2 mb-4">{guide.title}</h1>
        <p className="text-nord-text/60 mb-8">{guide.description}</p>
        <div className="prose prose-invert max-w-none
            prose-headings:text-nord-text prose-headings:font-semibold
            prose-p:text-nord-text/70 prose-p:leading-relaxed
            prose-strong:text-nord-text
            prose-ul:text-nord-text/70
            prose-li:text-nord-text/70">
          {guide.sections.map((s, i) => (
            <div key={i}>
              <h2>{s.heading}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-nord-card rounded-xl border border-nord-border/30">
          <p className="text-nord-text/60 text-sm">{dict.guide.helpText}</p>
        </div>

        <ScientificGuide articles={getGuideScientificArticles(lang)} />
      </article>
    </div>
  )
}

import { getAllSlugs, getTopicBySlug, getTopicContent, getTopicsByCategory } from "@/content/topics";
import { getDict, tt } from "@/lib/getDict";
import type { Locale } from "@/types";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SsrAccordion from "@/components/SsrAccordion";
import { TopicJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

const categoryColors: Record<string, string> = {
  sleep: "from-indigo-500/10 to-purple-500/10",
  anxiety: "from-rose-500/10 to-orange-500/10",
  grief_loss: "from-slate-500/10 to-zinc-500/10",
  loneliness: "from-sky-500/10 to-teal-500/10",
  self_worth: "from-emerald-500/10 to-teal-500/10",
  relationships: "from-pink-500/10 to-rose-500/10",
  identity: "from-violet-500/10 to-blue-500/10",
  mindfulness: "from-amber-500/10 to-yellow-500/10",
  emotional_health: "from-red-500/10 to-rose-500/10",
}
const categoryIcon: Record<string, string> = {
  sleep: "🌙", anxiety: "🫀", grief_loss: "💧", loneliness: "🌊",
  self_worth: "✨", relationships: "💞", identity: "🎭",
  mindfulness: "🧘", emotional_health: "💪",
}

const CLINICAL_EVIDENCE: Record<Locale, string> = {
  zh: "DeepCalm 的所有内容均基于经过同行评审的临床研究和权威医学指南。我们的睡眠科学内容参考了美国睡眠医学会（AASM）的临床实践指南、世界卫生组织（WHO）的睡眠健康建议，以及发表于《柳叶刀神经学》《睡眠医学评论》等顶级期刊的荟萃分析。焦虑与情绪健康板块参考了美国心理学会（APA）的循证治疗指南，包括认知行为疗法（CBT）和正念减压（MBSR）的标准方案。每篇文章在发布前均经过多轮事实核查，确保引用的统计数据（如患病率、效应量）源自原始研究或系统综述。内容的科学性是我们最优先的考量——如果你发现任何可能不准确的信息，欢迎通过电子邮件联系我们，我们将在核实后及时更正。",
  en: "All content on DeepCalm is grounded in peer-reviewed clinical research and authoritative medical guidelines. Our sleep science content references the American Academy of Sleep Medicine (AASM) Clinical Practice Guidelines, World Health Organization (WHO) sleep health recommendations, and meta-analyses published in leading journals including The Lancet Neurology and Sleep Medicine Reviews. Anxiety and emotional health content follows the American Psychological Association (APA) evidence-based treatment guidelines, including standardized protocols for Cognitive Behavioral Therapy (CBT) and Mindfulness-Based Stress Reduction (MBSR). Every article undergoes multiple rounds of fact-checking before publication, ensuring that all cited statistics—prevalence rates, effect sizes, risk ratios—are sourced from original research or systematic reviews. Scientific accuracy is our highest priority; if you identify any information that may be inaccurate, please contact us via email and we will correct it promptly after verification.",
  ms: "Semua kandungan di DeepCalm adalah berdasarkan penyelidikan klinikal yang telah disemak oleh rakan sebaya dan garis panduan perubatan yang berwibawa. Kandungan sains tidur kami merujuk kepada Garis Panduan Amalan Klinikal Akademi Perubatan Tidur Amerika (AASM), cadangan kesihatan tidur Pertubuhan Kesihatan Sedunia (WHO), dan meta-analisis yang diterbitkan dalam jurnal terkemuka termasuk The Lancet Neurology dan Sleep Medicine Reviews. Kandungan kebimbangan dan kesihatan emosi mengikuti garis panduan rawatan berasaskan bukti Persatuan Psikologi Amerika (APA), termasuk protokol piawai untuk Terapi Tingkah Laku Kognitif (CBT) dan Pengurangan Tekanan Berasaskan Kesedaran (MBSR). Ketepatan saintifik adalah keutamaan tertinggi kami.",
  ja: "DeepCalm のすべてのコンテンツは、査読済みの臨床研究と権威ある医学ガイドラインに基づいています。睡眠科学のコンテンツは、米国睡眠医学会（AASM）の臨床診療ガイドライン、世界保健機関（WHO）の睡眠健康勧告、および『The Lancet Neurology』『Sleep Medicine Reviews』などの主要ジャーナルに掲載されたメタ分析を参照しています。不安と感情的健康のコンテンツは、米国心理学会（APA）のエビデンスに基づく治療ガイドラインに従い、認知行動療法（CBT）とマインドフルネスストレス低減法（MBSR）の標準プロトコルを含みます。科学的正確性を最優先し、不正確な情報に気づいた場合はメールでご連絡ください。確認後、速やかに修正します。",
  ko: "DeepCalm의 모든 콘텐츠는 동료 검토를 거친 임상 연구와 권위 있는 의학 가이드라인에 기반합니다. 수면 과학 콘텐츠는 미국수면의학회(AASM)의 임상 진료 가이드라인, 세계보건기구(WHO)의 수면 건강 권고, 그리고 The Lancet Neurology 및 Sleep Medicine Reviews와 같은 주요 저널에 게재된 메타 분석을 참조합니다. 불안 및 정서 건강 콘텐츠는 미국심리학회(APA)의 근거 기반 치료 가이드라인을 따르며, 인지행동치료(CBT) 및 마음챙김 기반 스트레스 감소(MBSR)의 표준 프로토콜을 포함합니다. 과학적 정확성을 최우선으로 하며, 부정확한 정보를 발견하시면 이메일로 연락 주시기 바랍니다.",
  th: "เนื้อหาทั้งหมดบน DeepCalm มีพื้นฐานจากงานวิจัยทางคลินิกที่ผ่านการตรวจสอบโดยผู้ทรงคุณวุฒิและแนวทางการแพทย์ที่เชื่อถือได้ เนื้อหาวิทยาศาสตร์การนอนหลับอ้างอิงแนวปฏิบัติทางคลินิกของ American Academy of Sleep Medicine (AASM) คำแนะนำด้านสุขภาพการนอนหลับขององค์การอนามัยโลก (WHO) และการวิเคราะห์อภิมานที่ตีพิมพ์ในวารสารชั้นนำรวมถึง The Lancet Neurology และ Sleep Medicine Reviews เนื้อหาความวิตกกังวลและสุขภาพทางอารมณ์เป็นไปตามแนวทางการรักษาตามหลักฐานของ American Psychological Association (APA) รวมถึงโปรโตคอลมาตรฐานสำหรับการบำบัดทางความคิดและพฤติกรรม (CBT) และการลดความเครียดด้วยสติ (MBSR) ความถูกต้องทางวิทยาศาสตร์คือสิ่งสำคัญที่สุดของเรา",
  es: "Todo el contenido en DeepCalm se basa en investigaciones clínicas revisadas por pares y guías médicas autorizadas. Nuestro contenido sobre ciencia del sueño referencia las Guías de Práctica Clínica de la Academia Americana de Medicina del Sueño (AASM), las recomendaciones de salud del sueño de la Organización Mundial de la Salud (OMS) y metanálisis publicados en revistas líderes como The Lancet Neurology y Sleep Medicine Reviews. El contenido sobre ansiedad y salud emocional sigue las guías de tratamiento basadas en evidencia de la Asociación Americana de Psicología (APA), incluidos protocolos estandarizados para la Terapia Cognitivo-Conductual (TCC) y la Reducción del Estrés Basada en Mindfulness (MBSR). La precisión científica es nuestra máxima prioridad.",
}

const CATEGORY_NAMES: Record<string, Record<Locale, string>> = {
  sleep: { zh: "睡眠", en: "Sleep", ms: "Tidur", ja: "睡眠", ko: "수면", th: "การนอนหลับ", es: "Sueño" },
  anxiety: { zh: "焦虑", en: "Anxiety", ms: "Kebimbangan", ja: "不安", ko: "불안", th: "ความกังวล", es: "Ansiedad" },
  grief_loss: { zh: "哀伤与失落", en: "Grief & Loss", ms: "Kesedihan & Kehilangan", ja: "悲しみと喪失", ko: "슬픔과 상실", th: "ความเศร้าและการสูญเสีย", es: "Duelo y Pérdida" },
  loneliness: { zh: "孤独", en: "Loneliness", ms: "Kesunyian", ja: "孤独", ko: "외로움", th: "ความเหงา", es: "Soledad" },
  self_worth: { zh: "自我价值", en: "Self-Worth", ms: "Harga Diri", ja: "自己価値", ko: "자존감", th: "คุณค่าในตนเอง", es: "Autoestima" },
  relationships: { zh: "人际关系", en: "Relationships", ms: "Hubungan", ja: "人間関係", ko: "관계", th: "ความสัมพันธ์", es: "Relaciones" },
  identity: { zh: "身份认同", en: "Identity", ms: "Identiti", ja: "アイデンティティ", ko: "정체성", th: "อัตลักษณ์", es: "Identidad" },
  mindfulness: { zh: "正念", en: "Mindfulness", ms: "Kesedaran", ja: "マインドフルネス", ko: "마음챙김", th: "การมีสติ", es: "Atención Plena" },
  emotional_health: { zh: "情绪健康", en: "Emotional Health", ms: "Kesihatan Emosi", ja: "感情的健康", ko: "정서 건강", th: "สุขภาพทางอารมณ์", es: "Salud Emocional" },
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  const langs: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]
  const params: { lang: string; slug: string }[] = []
  for (const lang of langs) {
    for (const slug of slugs) {
      params.push({ lang, slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const topic = getTopicBySlug(slug, lang as Locale)
  if (!topic) return {}
  const locale = lang as Locale
  const catName = CATEGORY_NAMES[topic.category]?.[locale] || topic.category
  const seoTitle = `${topic.title} | ${catName} ${locale === "zh" ? "心理健康指南" : locale === "ms" ? "Panduan Kesihatan Mental" : locale === "ja" ? "メンタルヘルスガイド" : locale === "ko" ? "정신 건강 가이드" : locale === "th" ? "คู่มือสุขภาพจิต" : locale === "es" ? "Guía de Salud Mental" : "Mental Health Guide"} - DeepCalm AI`
  return {
    title: seoTitle,
    description: topic.description,
    keywords: topic.keywords,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${lang}/library/${slug}`,
      languages: {
        zh: `https://deepcalm-ai.com/zh/library/${slug}`,
        en: `https://deepcalm-ai.com/en/library/${slug}`,
        ms: `https://deepcalm-ai.com/ms/library/${slug}`,
        ja: `https://deepcalm-ai.com/ja/library/${slug}`,
        ko: `https://deepcalm-ai.com/ko/library/${slug}`,
        th: `https://deepcalm-ai.com/th/library/${slug}`,
        es: `https://deepcalm-ai.com/es/library/${slug}`,
      },
    },
    openGraph: { title: seoTitle, description: topic.description },
  }
}

export default async function TopicDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const topic = getTopicBySlug(slug, locale)
  if (!topic) notFound()

  const dict = getDict(locale)
  const dictEn = getDict("en")
  const dictZh = getDict("zh")
  const content = getTopicContent(slug, locale)

  const catColor = categoryColors[topic.category] || "from-nord-accent/10 to-nord-accent/5"
  const t = (key: string, fallback: string) => tt(dict, key) || tt(dictEn, key) || tt(dictZh, key) || fallback

  return (
    <div className="min-h-screen bg-nord-bg">
      <TopicJsonLd locale={locale} slug={slug} topic={topic} faqItems={content.faqItems} />
      <BreadcrumbJsonLd items={[
        { name: locale === "zh" ? "首页" : "Home", url: `https://deepcalm-ai.com/${locale}` },
        { name: CATEGORY_NAMES[topic.category]?.[locale] || topic.category, url: `https://deepcalm-ai.com/${locale}/library/${slug}` },
        { name: topic.title, url: `https://deepcalm-ai.com/${locale}/library/${slug}` },
      ]} />
      <section className="py-24 relative">
        <div className={`absolute inset-0 bg-gradient-to-b ${catColor}`} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-nord-muted hover:text-nord-accent text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.back", locale === "zh" ? "返回" : "Back")}
          </Link>

          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-nord-accent uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {CATEGORY_NAMES[topic.category]?.[locale] || topic.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-nord-text mt-3 mb-4">
              {categoryIcon[topic.category] || "📖"} {topic.title}
            </h1>
            <p className="text-nord-text/60 leading-relaxed">{topic.description}</p>
          </div>

          <div className="space-y-8">
            <SsrAccordion
              title={locale === "zh" ? "🔬 科学原理" : locale === "ms" ? "🔬 Sains" : "🔬 The Science"}
              className="!bg-nord-card !border-nord-border/30"
            >
              <div className="prose prose-invert max-w-none prose-p:text-nord-text/70 prose-p:leading-relaxed">
                {content.science.split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </SsrAccordion>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-nord-accent/[0.06] to-nord-card border border-nord-accent/15 rounded-2xl">
              <h2 className="text-lg font-bold text-nord-text mb-4">
                {locale === "zh" ? "🏋️ 日常健身指南" : locale === "ms" ? "🏋️ Panduan Kecergasan" : "🏋️ Emotional Fitness Guide"}
              </h2>
              <div className="prose prose-invert max-w-none prose-p:text-nord-text/70 prose-p:leading-relaxed prose-strong:text-nord-text">
                {content.fitnessGuide.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h3 key={i} className="text-base font-semibold text-nord-text mt-4 mb-2">{line.slice(3)}</h3>
                  if (/^\d+\./.test(line.trim())) return <p key={i} className="text-nord-text/70 leading-relaxed mb-2">{line}</p>
                  if (line.trim() === "") return null
                  return <p key={i} className="text-nord-text/70 leading-relaxed">{line}</p>
                })}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-nord-card border border-nord-border/30 rounded-2xl">
              <h2 className="text-lg font-bold text-nord-text mb-6">
                {locale === "zh" ? "❓ 常见问题" : locale === "ms" ? "❓ Soalan Lazim" : "❓ FAQ"}
              </h2>
              <div className="space-y-4">
                {content.faqItems.map((item, i) => (
                  <div key={i} className="p-4 bg-nord-bg/50 rounded-xl border border-nord-border/20">
                    <p className="text-nord-text font-medium text-sm mb-2">{item.q}</p>
                    <p className="text-nord-text/60 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-nord-card border border-nord-border/30 rounded-2xl">
              <h2 className="text-lg font-bold text-nord-text mb-4">
                {locale === "zh" ? "📋 临床依据与引用" : locale === "ms" ? "📋 Rujukan Klinikal" : "📋 Clinical Evidence & References"}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="nord-text/70 text-sm leading-relaxed">{CLINICAL_EVIDENCE[locale] || CLINICAL_EVIDENCE.en}</p>
              </div>
            </div>

            {/* ── 相关推荐 ── */}
            {(() => {
              const related = getTopicsByCategory(topic.category, locale).filter((t) => t.slug !== slug)
              if (related.length === 0) return null
              const visible = related.slice(0, 4)
              return (
                <div className="p-6 sm:p-8 bg-nord-card border border-nord-border/30 rounded-2xl">
                  <h2 className="text-lg font-bold text-nord-text mb-6">
                    {locale === "zh" ? "📖 推荐阅读" : locale === "ms" ? "📖 Bacaan Disyorkan" : "📖 Recommended Reading"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {visible.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/${locale}/topic/${r.slug}`}
                        className="block p-4 bg-nord-bg/50 rounded-xl border border-nord-border/20 hover:border-dc-accent/30 hover:bg-dc-accent/5 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-nord-text leading-snug block mb-1">
                          {categoryIcon[r.category] || "📖"} {r.title}
                        </span>
                        <span className="text-xs text-nord-text/50 line-clamp-2">{r.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </section>

    </div>
  )
}

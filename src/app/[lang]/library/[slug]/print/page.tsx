import type { Locale } from "@/types"
import { getAllSlugs, getTopicBySlug, getTopicContent } from "@/content/topics"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const ALL_LOCALES: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

export const dynamic = "force-static"

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  const params: { lang: string; slug: string }[] = []
  for (const lang of ALL_LOCALES) {
    for (const slug of slugs) {
      params.push({ lang, slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = lang as Locale
  const topic = getTopicBySlug(slug, locale)
  if (!topic) return {}
  return {
    title: topic.title + " - Printable Guide - DeepCalm AI",
    description: topic.description,
    metadataBase: new URL("https://deepcalm-ai.com"),
    robots: "noindex, nofollow",
    alternates: {
      canonical: `https://deepcalm-ai.com/${locale}/library/${slug}`,
    },
    openGraph: {
      title: topic.title + " (Printable Guide)",
      description: topic.description,
    },
  }
}

function getLocaleHeading(locale: Locale, key: "science" | "fitness" | "faq" | "references" | "knowledge_map" | "disclaimer"): string {
  const map: Record<string, Record<Locale, string>> = {
    science: {
      zh: "🔬 科学原理", en: "🔬 The Science", ms: "🔬 Sains", ja: "🔬 科学的原理",
      ko: "🔬 과학적 원리", th: "🔬 หลักการทางวิทยาศาสตร์", es: "🔬 La Ciencia",
    },
    fitness: {
      zh: "🏋️ 日常健身指南", en: "🏋️ Emotional Fitness Guide", ms: "🏋️ Panduan Kecergasan",
      ja: "🏋️ 日常フィットネスガイド", ko: "🏋️ 일상 피트니스 가이드",
      th: "🏋️ คู่มือการออกกำลังกาย", es: "🏋️ Guía de Ejercicios Diarios",
    },
    faq: {
      zh: "❓ 常见问题", en: "❓ FAQ", ms: "❓ Soalan Lazim",
      ja: "❓ よくある質問", ko: "❓ 자주 묻는 질문",
      th: "❓ คำถามที่พบบ่อย", es: "❓ Preguntas Frecuentes",
    },
    references: {
      zh: "📚 参考文献与延伸阅读", en: "📚 References & Further Reading", ms: "📚 Rujukan & Bacaan Lanjutan",
      ja: "📚 参考文献と関連資料", ko: "📚 참고 문헌 및 추가 자료",
      th: "📚 เอกสารอ้างอิงและการอ่านเพิ่มเติม", es: "📚 Referencias y Lecturas Adicionales",
    },
    knowledge_map: {
      zh: "🗺️ 相关知识地图", en: "🗺️ Knowledge Map", ms: "🗺️ Peta Pengetahuan",
      ja: "🗺️ 関連知識マップ", ko: "🗺️ 관련 지식 지도",
      th: "🗺️ แผนที่ความรู้", es: "🗺️ Mapa de Conocimiento",
    },
    disclaimer: {
      zh: "免责声明：本指南仅供教育参考，不构成医疗建议。如有严重心理困扰，请咨询专业心理健康服务提供者。",
      en: "Disclaimer: This guide is for educational purposes only and does not constitute medical advice. If you are experiencing severe distress, please consult a qualified mental health professional.",
      ms: "Penafian: Panduan ini adalah untuk tujuan pendidikan sahaja dan tidak membentuk nasihat perubatan. Jika anda mengalami kesusahan yang teruk, sila rujuk profesional kesihatan mental yang berkelayakan.",
      ja: "免責事項：このガイドは教育目的のみであり、医療アドバイスを構成するものではありません。深刻な精神的苦痛を感じている場合は、資格のあるメンタルヘルスの専門家に相談してください。",
      ko: "면책 조항: 이 가이드는 교육 목적으로만 제공되며 의학적 조언을 구성하지 않습니다. 심각한 정신적 고통을 겪고 계시다면 자격을 갖춘 정신 건강 전문가와 상담하십시오.",
      th: "ข้อจำกัดความรับผิดชอบ: คู่มือนี้มีวัตถุประสงค์เพื่อการศึกษาเท่านั้น และไม่ได้ให้คำแนะนำทางการแพทย์ หากคุณกำลังประสบกับความทุกข์ทางจิตใจอย่างรุนแรง โปรดปรึกษาผู้ให้บริการด้านสุขภาพจิตที่มีคุณสมบัติเหมาะสม",
      es: "Aviso legal: Esta guía es solo con fines educativos y no constituye consejo médico. Si está experimentando una angustia severa, consulte a un profesional de salud mental calificado.",
    },
  }
  return map[key]?.[locale] || map[key].en
}

function formatReferences(refs: string[]): string[] {
  const seen = new Set<string>()
  return refs.filter((r) => {
    const key = r.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function isExternalUrl(text: string): boolean {
  return text.startsWith("http://") || text.startsWith("https://")
}

function getRelatedSlugs(slug: string): string[] {
  const catMap: Record<string, string[]> = {
    sleep: ["insomnia","deep-sleep","sleep-anxiety","nightmare","circadian-rhythm","sleep-hygiene","rem-sleep","napping","circadian_rhythm_deep"],
    anxiety: ["stress-relief","panic-attack","social-anxiety","generalized-anxiety","health-anxiety","work-stress","exam-nerves","anxiety_depression","stress_management"],
    grief_loss: ["loss","bereavement","pet-loss","divorce","long-distance"],
    loneliness: ["solitude","isolation","friendship","social-skills","belonging"],
    self_worth: ["self-esteem","impostor-syndrome","perfectionism","body-image","comparison","self-compassion"],
    relationships: ["break-up","communication","trust","co-dependency","boundaries","parenting","family-conflict"],
    identity: ["purpose","career-change","quarter-life-crisis","midlife-crisis","cultural-identity"],
    mindfulness: ["meditation","body-scan","breathwork","gratitude","journaling","neural_meditation"],
    emotional_health: ["anger-management","emotional-regulation","mood-tracking","burnout","resilience","polyvagal_emotion"],
  }
  for (const [, slugs] of Object.entries(catMap)) {
    if (slugs.includes(slug)) {
      return slugs.filter((s) => s !== slug).slice(0, 6)
    }
  }
  return []
}

export default async function LibraryPrintPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const topic = getTopicBySlug(slug, locale)

  if (!topic) notFound()

  const content = getTopicContent(slug, locale)
  const relatedSlugs = getRelatedSlugs(slug)

  const scienceParagraphs = content.science.split("\n").filter(Boolean)
  const fitnessLines = content.fitnessGuide.split("\n")

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const dateStr = `${year}-${month}-${day}`

  return (
    <html lang={locale === "zh" ? "zh-Hans" : locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <title>{topic.title} - Printable Guide - DeepCalm AI</title>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.7;
            color: #1a1a1a;
            background: #ffffff;
            padding: 0;
          }
          .print-page {
            max-width: 800px;
            margin: 0 auto;
            padding: 60px 40px;
          }
          @media print {
            .print-page { padding: 0; }
            @page { margin: 2cm; size: A4; }
          }
          .print-header {
            border-bottom: 2px solid #2563eb;
            padding-bottom: 24px;
            margin-bottom: 32px;
          }
          .print-header .brand {
            font-size: 10pt;
            color: #2563eb;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .print-header h1 {
            font-size: 22pt;
            font-weight: 700;
            color: #111;
            margin-bottom: 8px;
            line-height: 1.3;
          }
          .print-header .description {
            font-size: 10.5pt;
            color: #555;
            line-height: 1.6;
          }
          .print-header .meta {
            font-size: 9pt;
            color: #888;
            margin-top: 12px;
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }
          .print-section {
            margin-bottom: 28px;
            page-break-inside: avoid;
          }
          .print-section h2 {
            font-size: 14pt;
            font-weight: 700;
            color: #111;
            margin-bottom: 12px;
            padding-bottom: 6px;
            border-bottom: 1px solid #e5e7eb;
          }
          .print-section p {
            margin-bottom: 10px;
            color: #333;
          }
          .print-section h3 {
            font-size: 12pt;
            font-weight: 600;
            color: #222;
            margin-top: 16px;
            margin-bottom: 8px;
          }
          .print-section ul, .print-section ol {
            margin: 8px 0 12px 24px;
            color: #333;
          }
          .print-section li {
            margin-bottom: 4px;
          }
          .faq-item {
            margin-bottom: 16px;
            padding: 12px 16px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
          .faq-item .q {
            font-weight: 600;
            color: #111;
            margin-bottom: 4px;
            font-size: 10.5pt;
          }
          .faq-item .a {
            color: #444;
            font-size: 10pt;
            line-height: 1.6;
          }
          .ref-list {
            list-style: none;
            padding: 0;
          }
          .ref-list li {
            margin-bottom: 6px;
            font-size: 9.5pt;
            color: #555;
            word-break: break-all;
          }
          .ref-list li a {
            color: #2563eb;
            text-decoration: none;
          }
          .ref-list li a::after {
            content: " (" attr(href) ")";
            font-size: 8.5pt;
            color: #888;
          }
          .knowledge-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
          }
          .knowledge-links a {
            display: inline-block;
            padding: 6px 14px;
            background: #f0f4ff;
            border: 1px solid #dbeafe;
            border-radius: 20px;
            font-size: 9.5pt;
            color: #2563eb;
            text-decoration: none;
          }
          .knowledge-links a::after {
            content: " (" attr(href) ")";
            font-size: 8pt;
            color: #888;
          }
          .print-footer {
            margin-top: 48px;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
            font-size: 8.5pt;
            color: #999;
            text-align: center;
          }
          .print-disclaimer {
            margin-top: 24px;
            padding: 12px 16px;
            background: #fefce8;
            border: 1px solid #fde68a;
            border-radius: 6px;
            font-size: 9pt;
            color: #92400e;
            line-height: 1.5;
          }
          .print-break {
            page-break-before: always;
          }
          @media print {
            .no-print { display: none !important; }
            .print-page { padding: 0; }
            .faq-item { break-inside: avoid; }
            .print-disclaimer { break-inside: avoid; }
          }
        `}</style>
      </head>
      <body>
        <div className="print-page">
          {/* ── 页眉 ── */}
          <header className="print-header">
            <div className="brand">DeepCalm AI — {getLocaleHeading(locale, "disclaimer").slice(0, 20)}</div>
            <h1>{topic.title}</h1>
            <p className="description">{topic.description}</p>
            <div className="meta">
              <span>
                {locale === "zh" ? "生成日期" : locale === "ms" ? "Tarikh" : locale === "ja" ? "作成日" : locale === "ko" ? "생성일" : locale === "th" ? "วันที่สร้าง" : locale === "es" ? "Fecha" : "Generated"}: {dateStr}
              </span>
              <span>
                {locale === "zh" ? "语种" : locale === "ms" ? "Bahasa" : locale === "ja" ? "言語" : locale === "ko" ? "언어" : locale === "th" ? "ภาษา" : locale === "es" ? "Idioma" : "Language"}: {locale.toUpperCase()}
              </span>
            </div>
          </header>

          {/* ── 科学原理 ── */}
          <section className="print-section">
            <h2>{getLocaleHeading(locale, "science")}</h2>
            {scienceParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* ── 日常健身指南 ── */}
          <section className="print-section">
            <h2>{getLocaleHeading(locale, "fitness")}</h2>
            {fitnessLines.map((line, i) => {
              if (line.startsWith("## ")) {
                return <h3 key={i}>{line.slice(3)}</h3>
              }
              if (/^\d+\./.test(line.trim())) {
                return <p key={i} style={{ marginBottom: 6 }}>{line}</p>
              }
              if (line.trim() === "") return null
              return <p key={i}>{line}</p>
            })}
          </section>

          {/* ── 常见问题 ── */}
          {content.faqItems.length > 0 && (
            <section className="print-section">
              <h2>{getLocaleHeading(locale, "faq")}</h2>
              {content.faqItems.map((item, i) => (
                <div key={i} className="faq-item">
                  <div className="q">{item.q}</div>
                  <div className="a">{item.a}</div>
                </div>
              ))}
            </section>
          )}

          {/* ── 参考文献 ── */}
          {topic.references && topic.references.length > 0 && (
            <section className="print-section">
              <h2>{getLocaleHeading(locale, "references")}</h2>
              <ul className="ref-list">
                {formatReferences(topic.references).map((ref, i) => (
                  <li key={i}>
                    [{i + 1}] {isExternalUrl(ref) ? <a href={ref} target="_blank" rel="noopener noreferrer">{ref.replace(/^https?:\/\//, "").split("/")[0]}</a> : ref}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── 相关知识地图 ── */}
          {relatedSlugs.length > 0 && (
            <section className="print-section">
              <h2>{getLocaleHeading(locale, "knowledge_map")}</h2>
              <div className="knowledge-links">
                {relatedSlugs.map((s) => {
                  const related = getTopicBySlug(s, locale)
                  if (!related) return null
                  const href = `https://deepcalm-ai.com/${locale}/library/${s}`
                  return (
                    <a key={s} href={href} target="_blank" rel="noopener noreferrer">
                      {related.title}
                    </a>
                  )
                })}
              </div>
            </section>
          )}

          {/* ── 免责声明 ── */}
          <div className="print-disclaimer">
            {getLocaleHeading(locale, "disclaimer")}
          </div>

          {/* ── 页脚 ── */}
          <footer className="print-footer">
            {locale === "zh" ? "由 DeepCalm AI 生成 · 心理健康自助指南" :
             locale === "ms" ? "Dijana oleh DeepCalm AI · Panduan Kesihatan Mental" :
             locale === "ja" ? "DeepCalm AI が生成 · メンタルヘルスガイド" :
             locale === "ko" ? "DeepCalm AI 생성 · 정신 건강 가이드" :
             locale === "th" ? "สร้างโดย DeepCalm AI · คู่มือสุขภาพจิต" :
             locale === "es" ? "Generado por DeepCalm AI · Guía de Salud Mental" :
             "Generated by DeepCalm AI · Mental Health Guide"}
            &nbsp;·&nbsp;Page 1 / 1
          </footer>
        </div>
      </body>
    </html>
  )
}

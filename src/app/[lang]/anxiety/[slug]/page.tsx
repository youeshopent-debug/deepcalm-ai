import type { Locale } from "@/types"
import { getDict } from "@/lib/getDict"
import { getAnxietyScenarios, getAnxietyScenarioBySlug, getLocalizedField } from "@/content/anxiety-scenarios"
import AiCounselor from "@/components/AiCounselor"
import ScientificGuide from "@/components/ScientificGuide"
import SitemapFooter from "@/components/SitemapFooter"
import { ArrowLeft, Brain, CheckCircle2, Lightbulb, Sparkles } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const scenarios = getAnxietyScenarios()
  const langs: Locale[] = ["zh", "en", "ms"]
  const params: { lang: string; slug: string }[] = []
  for (const lang of langs) {
    for (const scenario of scenarios) {
      params.push({ lang, slug: scenario.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const scenario = getAnxietyScenarioBySlug(slug)
  if (!scenario) return { title: "Not Found" }

  const title = getLocalizedField(lang as Locale, scenario.title) + " - DeepCalm AI"
  const description = getLocalizedField(lang as Locale, scenario.description)

  return {
    title,
    description,
    keywords: getLocalizedField(lang as Locale, scenario.keywords),
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `/${lang}/anxiety/${slug}`,
      languages: {
        zh: `/zh/anxiety/${slug}`,
        en: `/en/anxiety/${slug}`,
        ms: `/ms/anxiety/${slug}`,
        ja: `/ja/anxiety/${slug}`,
        ko: `/ko/anxiety/${slug}`,
        th: `/th/anxiety/${slug}`,
        es: `/es/anxiety/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      locale: lang === "zh" ? "zh_CN" : lang === "ms" ? "ms_MY" : "en_US",
      siteName: "DeepCalm AI",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function AnxietyScenarioPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const scenario = getAnxietyScenarioBySlug(slug)
  if (!scenario) notFound()

  const dict = await getDict(locale)
  const allScenarios = getAnxietyScenarios()
  const relatedScenarios = allScenarios.filter((s) => s.slug !== slug)

  const t = (key: string) => {
    const keys = key.split(".")
    let val: Record<string, unknown> = dict
    for (const k of keys) {
      val = val?.[k] as Record<string, unknown>
    }
    return (typeof val === "string" ? val : key) as string
  }

  return (
    <>
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-nord-bg via-nord-accent/[0.02] to-nord-bg" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-nord-muted hover:text-nord-accent text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.back")}
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-nord-accent/10 mb-4">
              <Brain className="w-7 h-7 text-nord-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-nord-text mb-4">
              {getLocalizedField(locale, scenario.title)}
            </h1>
            <p className="text-nord-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {getLocalizedField(locale, scenario.description)}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-nord-accent/[0.08] to-nord-card border border-nord-accent/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-nord-accent" />
                <span className="text-nord-accent font-semibold text-sm uppercase tracking-wider">
                  {locale === "zh" ? "开场导语" : locale === "ms" ? "Pembukaan" : "Opening"}
                </span>
              </div>
              <p className="text-nord-text text-sm sm:text-base leading-relaxed">
                {getLocalizedField(locale, scenario.opening)}
              </p>
            </div>

            {scenario.sections.map((section, i) => (
              <div key={i} className="p-6 sm:p-8 bg-nord-card border border-nord-border rounded-2xl">
                <h2 className="text-lg sm:text-xl font-bold text-nord-text mb-4 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-nord-accent shrink-0 mt-1" />
                  <span>{getLocalizedField(locale, section.heading)}</span>
                </h2>
                <p className="text-nord-muted text-sm sm:text-base leading-relaxed">
                  {getLocalizedField(locale, section.content)}
                </p>
              </div>
            ))}

            <div className="p-6 sm:p-8 bg-nord-accent/10 border border-nord-accent/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-nord-accent" />
                <span className="text-nord-accent font-semibold text-sm uppercase tracking-wider">
                  {locale === "zh" ? "常见思维模式" : locale === "ms" ? "Corak Pemikiran" : "Common Thinking Patterns"}
                </span>
              </div>
              <p className="text-nord-text text-sm sm:text-base leading-relaxed">
                {getLocalizedField(locale, scenario.thinkingPatterns)}
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-nord-card border border-nord-border rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
                  {locale === "zh" ? "改善步骤" : locale === "ms" ? "Langkah Pemulihan" : "Recovery Steps"}
                </span>
              </div>
              <ul className="space-y-4">
                {getLocalizedField(locale as Locale, scenario.steps).map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-400 text-sm font-bold">{i + 1}</span>
                    </span>
                    <span className="text-nord-text text-sm sm:text-base">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ScientificGuide
        articles={scenario.scientificGuide.map((article) => ({
          heading: getLocalizedField(locale, article.heading),
          paragraphs: getLocalizedField(locale, article.paragraphs),
          findings: getLocalizedField(locale, article.findings),
          reference: getLocalizedField(locale, article.reference),
        }))}
      />

      <AiCounselor />

      {relatedScenarios.length > 0 && (
        <section className="py-16 bg-nord-bg border-t border-nord-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-nord-text mb-8 text-center">
              {locale === "zh" ? "更多场景指南" : locale === "ms" ? "Panduan Lain" : "Related Guides"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedScenarios.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/anxiety/${related.slug}`}
                  className="p-5 bg-nord-card border border-nord-border rounded-xl hover:border-nord-accent/30 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-nord-text font-medium text-sm group-hover:text-nord-accent transition-colors">
                    {getLocalizedField(locale, related.title)}
                  </h3>
                  <p className="text-nord-muted text-xs mt-2 line-clamp-2">
                    {getLocalizedField(locale, related.description)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SitemapFooter />
    </>
  )
}

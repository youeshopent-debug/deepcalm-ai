import Link from "next/link"
import type { Locale } from "@/types"

export type PublisherTopic = {
  label: string
  slug: string
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  const trimmed = text.slice(0, maxLen)
  const lastSpace = trimmed.lastIndexOf(" ")
  const cut = lastSpace > maxLen * 0.8 ? lastSpace : maxLen
  return text.slice(0, cut).replace(/[,，\s]+$/, "") + "…"
}

export default function PublisherContentBlock({
  lang,
  title,
  intro,
  topics,
}: {
  lang: Locale
  title: string
  intro: string
  topics: PublisherTopic[]
}) {
  const excerpt = truncate(intro, 100)

  return (
    <section className="relative z-10 w-full px-4 sm:px-6 -mt-10 pb-8">
      <div className="max-w-3xl mx-auto">
        <div
          data-testid="publisher-content"
          className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40 backdrop-blur-xl"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-dc-text leading-snug">
            {title}
          </h2>
          <p
            className="mt-4 text-base sm:text-lg text-dc-muted leading-relaxed max-h-24 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, black 80%, transparent 96%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 96%)",
            }}
          >
            {excerpt}
          </p>

          <div className="mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
            <Link
              href={`/${lang}/library/sleep-science-guide`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dc-accent text-dc-deep font-semibold text-sm hover:bg-dc-accent/90 transition-all duration-300 shadow-lg shadow-dc-accent/20"
            >
              {lang === "zh" ? "阅读完整指南 →" : "Read Full Guide →"}
            </Link>
            <Link
              href={`/${lang}/guide`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-dc-accent/15 text-dc-text border border-dc-accent/25 hover:bg-dc-accent/20 transition-colors text-sm"
            >
              {lang === "zh" ? "科学指南总入口" : "Science Guide"}
            </Link>
          </div>

          {/* SSR crawlable full text for SEO */}
          <div className="hidden" aria-hidden="true">
            {intro}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-dc-muted/70">{lang === "zh" ? "深度探索：" : "Explore:"}</span>
            {topics.map((t) => (
              <Link
                key={t.slug}
                href={`/${lang}/topic/${t.slug}`}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-dc-surface/60 text-dc-muted border border-dc-border hover:border-dc-accent/30 hover:text-dc-text transition-colors text-sm"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

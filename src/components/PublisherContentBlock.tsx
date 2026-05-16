import Link from "next/link"
import type { Locale } from "@/types"

export type PublisherTopic = {
  label: string
  slug: string
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
          <p className="mt-4 text-base sm:text-lg text-dc-muted leading-relaxed">
            {intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link
              href={`/${lang}/guide`}
              className="inline-flex items-center px-4 py-2 rounded-full bg-dc-accent/15 text-dc-text border border-dc-accent/25 hover:bg-dc-accent/20 transition-colors text-sm"
            >
              科学指南总入口 →
            </Link>

            <div className="ml-1 text-xs text-dc-muted/70">深度探索：</div>

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


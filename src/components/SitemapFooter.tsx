"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/context/LanguageContext"
import { getTopicBySlug } from "@/content/topics"

const CATEGORY_KEYS: { i18nKey: string; items: string[] }[] = [
  { i18nKey: "sitemap.categories.sleep",      items: ["insomnia","deep-sleep","sleep-anxiety","nightmare","circadian-rhythm","sleep-hygiene","rem-sleep","napping"] },
  { i18nKey: "sitemap.categories.anxiety",    items: ["stress-relief","panic-attack","social-anxiety","generalized-anxiety","health-anxiety","work-stress","exam-nerves"] },
  { i18nKey: "sitemap.categories.grief_loss", items: ["loss","bereavement","pet-loss","divorce","long-distance"] },
  { i18nKey: "sitemap.categories.loneliness", items: ["solitude","isolation","friendship","social-skills","belonging"] },
  { i18nKey: "sitemap.categories.self_worth", items: ["self-esteem","impostor-syndrome","perfectionism","body-image","comparison","self-compassion"] },
  { i18nKey: "sitemap.categories.relationships", items: ["break-up","communication","trust","co-dependency","boundaries","parenting","family-conflict"] },
  { i18nKey: "sitemap.categories.identity",   items: ["purpose","career-change","quarter-life-crisis","midlife-crisis","cultural-identity"] },
  { i18nKey: "sitemap.categories.mindfulness", items: ["meditation","body-scan","breathwork","gratitude","journaling"] },
  { i18nKey: "sitemap.categories.emotional_health", items: ["anger-management","emotional-regulation","mood-tracking","burnout","resilience"] },
];

const linkStyle = "inline-flex min-h-9 items-center rounded-sm py-1 text-sm leading-snug text-[#e2eee8] underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2f4df]"

export default function SitemapFooter() {
  const { tt, locale } = useLanguage();

  const pathname = usePathname().replace(/\/$/, "")
  const compact = [`/${locale}`, `/${locale}/tools`, `/${locale}/support`].includes(pathname)

  return (
    <footer className="relative z-10 w-full border-t border-[#53746b] bg-[#132723] text-[#f4faf6]">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${compact ? "py-3" : "py-8 sm:py-12"}`}>
        {!compact && <>
          <Link href={`/${locale}/library`} className={`${linkStyle} mb-5 gap-2 font-semibold`}>
            {tt("nav.library")} <span aria-hidden="true" className="text-[#c2f4df]">→</span>
          </Link>
          <nav aria-label={tt("nav.library")} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_KEYS.map((cat) => (
              <section key={cat.i18nKey} className="min-w-0 rounded-2xl border border-[#53746b] bg-[#203b33] p-4">
                <h2 className="mb-1 text-base font-semibold text-[#c2f4df]">
                  {tt(cat.i18nKey)}
                </h2>
                <ul className="grid grid-cols-2 gap-x-3">
                  {cat.items.map((slug) => {
                    const topic = getTopicBySlug(slug, locale);
                    const href = `/${locale}/library/${slug}`;
                    return (
                      <li key={slug} className="min-w-0">
                        <Link
                          href={href}
                          className={linkStyle}
                        >
                          <span className="min-w-0 break-words">{topic?.title || slug.replace(/-/g, " ")}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </nav>
        </>}

        <div className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-[#d6e8df] ${compact ? "" : "mt-7 border-t border-[#53746b] pt-4"}`}>
          <span>&copy; {new Date().getFullYear()} DeepCalm AI &middot; Midnight Sanctuary</span>
          <div className="flex flex-wrap gap-x-4">
            <Link href={`/${locale}`} className={linkStyle}>{tt("sitemap.home")}</Link>
            <Link href={`/${locale}/tools?tool=checkin#healing-toolbox`} className={linkStyle}>{tt("sitemap.dailyCheckin")}</Link>
            {compact && <Link href={`/${locale}/sanctuary`} className={linkStyle}>{locale === "zh" ? "心灵庇护所" : "Sanctuary"}</Link>}
            <Link href={`/${locale}/editorial-policy`} className={linkStyle}>{locale === "zh" ? "编辑政策" : "Editorial policy"}</Link>
            <Link href={`/${locale}/privacy`} className={linkStyle}>{tt("sitemap.privacy")}</Link>
            <Link href={`/${locale}/terms`} className={linkStyle}>{tt("sitemap.terms")}</Link>
            <Link href={`/${locale}/about`} className={linkStyle}>{tt("sitemap.about")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

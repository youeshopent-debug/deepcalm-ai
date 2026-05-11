"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { getTopicBySlug } from "@/content/topics"
import type { Locale } from "@/types"

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

export default function SitemapFooter() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/") ? pathname.split("/")[1] : "en";
  const { tt } = useLanguage();

  return (
    <footer className="w-full border-t border-[var(--dc-border)]/40 bg-[var(--dc-surface)]/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORY_KEYS.map((cat) => (
            <div key={cat.i18nKey}>
              <h4 className="text-xs font-semibold text-[var(--dc-accent)] uppercase tracking-wider mb-2">
                {tt(cat.i18nKey)}
              </h4>
              <ul className="space-y-1">
                {cat.items.map((slug) => {
                  const topic = getTopicBySlug(slug, locale as Locale);
                  const href = `/${locale}/topic/${slug}`;
                  return (
                    <li key={slug}>
                      <Link
                        href={href}
                        scroll={false}
                        className="text-[11px] text-[var(--dc-muted)] hover:text-[var(--dc-accent)] transition-colors duration-200"
                      >
                        {topic?.title || slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--dc-border)]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[var(--dc-muted)]">
          <span>&copy; {new Date().getFullYear()} DeepCalm AI &middot; Midnight Sanctuary</span>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="hover:text-[var(--dc-accent)] transition-colors">{tt("sitemap.home")}</Link>
            <Link href={`/${locale}/#daily-checkin`} className="hover:text-[var(--dc-accent)] transition-colors">{tt("sitemap.dailyCheckin")}</Link>
            <a href="https://deepcalm-ai.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--dc-accent)] transition-colors">{tt("sitemap.privacy")}</a>
            <a href="https://deepcalm-ai.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--dc-accent)] transition-colors">{tt("sitemap.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

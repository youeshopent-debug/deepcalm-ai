"use client"

import { useCallback } from "react"
import type { Locale } from "@/types"

export interface CategoryInfo {
  slug: string
  icon: string
  name: string
  count: number
}

interface CategoryTagCloudProps {
  categories: CategoryInfo[]
  activeCategory: string | null
  onChange: (slug: string | null) => void
  locale: Locale
}

const ALL_LABEL: Record<Locale, string> = {
  zh: "全部",
  en: "All",
  ms: "Semua",
  ja: "すべて",
  ko: "전체",
  th: "ทั้งหมด",
  es: "Todas",
}

export default function CategoryTagCloud({ categories, activeCategory, onChange, locale }: CategoryTagCloudProps) {
  const allLabel = ALL_LABEL[locale] || ALL_LABEL.en

  const handleAll = useCallback(() => onChange(null), [onChange])
  const handleCategory = useCallback((slug: string) => onChange(slug), [onChange])

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      <button
        onClick={handleAll}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
          activeCategory === null
            ? "bg-nord-accent text-white border-nord-accent shadow-lg shadow-nord-accent/20"
            : "bg-nord-card/50 text-nord-text/50 border-nord-border/20 hover:border-nord-accent/30 hover:text-nord-text/70"
        }`}
      >
        {allLabel}
      </button>

      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug
        return (
          <button
            key={cat.slug}
            onClick={() => handleCategory(cat.slug)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              isActive
                ? "bg-nord-accent text-white border-nord-accent shadow-lg shadow-nord-accent/20"
                : "bg-nord-card/50 text-nord-text/50 border-nord-border/20 hover:border-nord-accent/30 hover:text-nord-text/70"
            }`}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            <span>{cat.name}</span>
            <span className={`text-xs ml-0.5 ${isActive ? "text-white/70" : "text-nord-text/25"}`}>
              ({cat.count})
            </span>
          </button>
        )
      })}
    </div>
  )
}

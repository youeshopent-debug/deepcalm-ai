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

const BUTTON_CLASS = "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
const ACTIVE_CLASS = "border-[#b6e4cc] bg-[#183d2f] text-white"
const INACTIVE_CLASS = "border-[#d8e5dd] bg-[#f5faf7] text-[#17382b] hover:border-[#a6d1ba] hover:bg-[#dcefe4]"

export default function CategoryTagCloud({ categories, activeCategory, onChange, locale }: CategoryTagCloudProps) {
  const allLabel = ALL_LABEL[locale] || ALL_LABEL.en

  const handleAll = useCallback(() => onChange(null), [onChange])
  const handleCategory = useCallback((slug: string) => onChange(slug), [onChange])

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      <button
        onClick={handleAll}
        aria-pressed={activeCategory === null}
        className={`${BUTTON_CLASS} ${activeCategory === null ? ACTIVE_CLASS : INACTIVE_CLASS}`}
      >
        {allLabel}
      </button>

      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug
        return (
          <button
            key={cat.slug}
            onClick={() => handleCategory(cat.slug)}
            aria-pressed={isActive}
            className={`${BUTTON_CLASS} ${isActive ? ACTIVE_CLASS : INACTIVE_CLASS}`}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="ml-0.5 text-xs">
              ({cat.count})
            </span>
          </button>
        )
      })}
    </div>
  )
}

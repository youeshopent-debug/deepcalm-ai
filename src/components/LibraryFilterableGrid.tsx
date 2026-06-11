"use client"

import { useState, useMemo } from "react"
import type { Topic } from "@/content/topics"
import type { Locale } from "@/types"
import LibraryCard from "@/components/LibraryCard"
import LibrarySearchBar from "@/components/LibrarySearchBar"
import CategoryTagCloud from "@/components/CategoryTagCloud"
import type { CategoryInfo } from "@/components/CategoryTagCloud"
import { CATEGORY_NAMES, CATEGORY_INTROS, categoryIcon } from "@/lib/library-constants"

interface LibraryFilterableGridProps {
  categories: CategoryInfo[]
  allTopics: Topic[]
  categoriesWithTopics: Array<{ cat: string; topics: Topic[] }>
  locale: Locale
}

export default function LibraryFilterableGrid({
  categories,
  allTopics,
  categoriesWithTopics,
  locale,
}: LibraryFilterableGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredSections = useMemo(() => {
    if (activeCategory === null) return categoriesWithTopics
    return categoriesWithTopics.filter(({ cat }) => cat === activeCategory)
  }, [activeCategory, categoriesWithTopics])

  return (
    <>
      <LibrarySearchBar topics={allTopics} locale={locale} />

      <CategoryTagCloud
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
        locale={locale}
      />

      <div className="space-y-16">
        {filteredSections.map(({ cat, topics }) => {
          const icon = categoryIcon[cat] || "📖"
          const catName = CATEGORY_NAMES[cat]?.[locale] || cat
          const intro = CATEGORY_INTROS[cat]?.[locale] || ""
          return (
            <div key={cat} id={`cat-${cat}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{icon}</span>
                <h2 className="text-xl font-bold text-nord-text">{catName}</h2>
                <span className="text-xs text-nord-text/30 font-mono">({topics.length})</span>
              </div>
              {intro && (
                <p className="text-sm text-nord-text/40 mb-6 ml-9 max-w-2xl">{intro}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {topics.map((topic) => (
                  <LibraryCard
                    key={topic.slug}
                    slug={topic.slug}
                    title={topic.title}
                    description={topic.description}
                    category={topic.category}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

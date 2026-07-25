"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import Fuse from "fuse.js"
import type { Topic } from "@/content/topics"
import type { Locale } from "@/types"
import LibraryCard from "@/components/LibraryCard"
import { Search, X, BookOpen } from "lucide-react"

interface LibrarySearchBarProps {
  topics: Topic[]
  locale: Locale
}

const SEARCH_PLACEHOLDER: Record<Locale, string> = {
  zh: "搜索话题...（支持中文/英文）",
  en: "Search topics...",
  ms: "Cari topik...",
  ja: "トピックを検索...",
  ko: "주제 검색...",
  th: "ค้นหาหัวข้อ...",
  es: "Buscar temas...",
}

const NO_RESULTS: Record<Locale, string> = {
  zh: "没有找到相关话题，试试其他关键词",
  en: "No topics found, try different keywords",
  ms: "Tiada topik ditemui, cuba kata kunci lain",
  ja: "トピックが見つかりませんでした。別のキーワードをお試しください",
  ko: "주제를 찾을 수 없습니다. 다른 키워드를 시도해보세요",
  th: "ไม่พบหัวข้อที่เกี่ยวข้อง ลองใช้คำค้นหาอื่น",
  es: "No se encontraron temas, prueba con otras palabras clave",
}

export default function LibrarySearchBar({ topics, locale }: LibrarySearchBarProps) {
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(
    () =>
      new Fuse(topics, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.3 },
          { name: "keywords", weight: 0.2 },
        ],
        threshold: 0.4,
        includeScore: true,
        findAllMatches: false,
        minMatchCharLength: 1,
      }),
    [topics],
  )

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query.trim()).map((r) => r.item).slice(0, 12)
  }, [query, fuse])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (e.target.value.trim()) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [])

  const handleClear = useCallback(() => {
    setQuery("")
    setShowResults(false)
    inputRef.current?.focus()
  }, [])

  const handleFocus = useCallback(() => {
    if (query.trim()) setShowResults(true)
  }, [query])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowResults(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const placeholder = SEARCH_PLACEHOLDER[locale] || SEARCH_PLACEHOLDER.en
  const noResultsText = NO_RESULTS[locale] || NO_RESULTS.en

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto mb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nord-text/30 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full h-12 pl-11 pr-10 bg-nord-card/80 border border-nord-border/30 rounded-xl text-sm text-nord-text placeholder:text-nord-text/25 outline-none focus:border-nord-accent/50 focus:bg-nord-card transition-all"
          aria-label={placeholder}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-nord-text/30 hover:text-nord-text/60 hover:bg-nord-bg/50 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-nord-card border border-nord-border/30 rounded-xl shadow-2xl shadow-black/20 backdrop-blur-xl z-50 max-h-[70vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-nord-accent/60" />
                <span className="text-xs text-nord-text/40">
                  {results.length}
                  {locale === "zh" ? " 个结果" : locale === "ja" ? " 件見つかりました" : ` result${results.length !== 1 ? "s" : ""}`}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((topic) => (
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
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-nord-text/40">{noResultsText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import type { TocHeading } from "@/lib/extractHeadings"
import { getTocLabel } from "@/lib/extractHeadings"
import { List } from "lucide-react"

interface TableOfContentsProps {
  headings: TocHeading[]
  locale: string
}

export default function TableOfContents({ headings, locale }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings.length > 0 ? headings[0].id : "")
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const label = getTocLabel(locale)

  // IntersectionObserver-based scroll spy
  useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading (from top)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    observerRef.current = observer

    return () => {
      observer.disconnect()
    }
  }, [headings])

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveId(id)
    }
    setIsMobileOpen(false)
  }, [])

  if (headings.length <= 1) return null

  const tocItems = headings.map((h) => {
    const isActive = activeId === h.id
    const isSection = h.level === 2

    return (
      <a
        key={h.id}
        href={`#${h.id}`}
        onClick={(e) => handleClick(e, h.id)}
        className={`block text-sm transition-all duration-200 border-l-2 py-1.5 ${
          h.level === 3 ? "pl-5" : "pl-3"
        } ${
          isActive
            ? "text-nord-accent border-nord-accent font-medium"
            : "text-nord-text/40 border-nord-border/20 hover:text-nord-text/60 hover:border-nord-text/30"
        }`}
      >
        {h.text === "science"
          ? locale === "zh" ? "🔬 科学原理" : "🔬 The Science"
          : h.text === "faq"
          ? "❓ FAQ"
          : h.text}
      </a>
    )
  })

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block" aria-label={label}>
        <div className="sticky top-24">
          <h3 className="text-xs font-semibold text-nord-text/30 uppercase tracking-widest mb-4">
            {label}
          </h3>
          <nav className="space-y-0.5" aria-label="Table of contents">
            {tocItems}
          </nav>
        </div>
      </aside>

      {/* Mobile: collapsible panel */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 w-full p-3 bg-nord-card border border-nord-border/20 rounded-xl text-sm text-nord-text/60 hover:text-nord-text/80 transition-colors"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-toc-panel"
        >
          <List className="w-4 h-4" />
          <span className="font-medium">{label}</span>
          <span className="ml-auto text-xs text-nord-text/30">
            {isMobileOpen ? "▲" : "▼"}
          </span>
        </button>
        {isMobileOpen && (
          <nav
            id="mobile-toc-panel"
            className="mt-2 p-3 bg-nord-card border border-nord-border/20 rounded-xl space-y-0.5"
            aria-label="Table of contents"
          >
            {tocItems}
          </nav>
        )}
      </div>
    </>
  )
}

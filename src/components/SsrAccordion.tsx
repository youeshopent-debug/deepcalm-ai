"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

interface SsrAccordionProps {
  /** Visible label on the collapsed header */
  title: string | React.ReactNode
  children: React.ReactNode
  /** If true, the accordion is expanded by default after hydration */
  defaultOpen?: boolean
  /** Optional CSS classes for the wrapper */
  className?: string
}

/**
 * SSR-visible accordion.
 * - On the server: the header is rendered but children are inside a `sr-only`
 *   container (screen-reader + SEO crawlable, visually hidden).
 * - After hydration: toggles open/close with smooth height animation.
 *
 * Purpose: reduce visual clutter on initial load while keeping content
 * indexable by search engines.  Improves LCP / CLS for content-heavy pages.
 */
export default function SsrAccordion({
  title,
  children,
  defaultOpen = false,
  className = "",
}: SsrAccordionProps) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0)
    }
  }, [mounted, open])

  const toggle = () => setOpen((v) => !v)

  return (
    <div className={`rounded-2xl border border-dc-border/30 bg-dc-surface/30 backdrop-blur-sm ${className}`}>
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-dc-text hover:text-dc-accent transition-colors"
        aria-expanded={mounted ? open : undefined}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-dc-muted transition-transform duration-300 ${
            mounted && open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Server render: hidden from visual but visible to SEO */}
      <div className={mounted ? "hidden" : "sr-only"} aria-hidden={!mounted}>
        {children}
      </div>

      {/* Client render: animated height transition */}
      {mounted && (
        <div
          ref={contentRef}
          style={{ height: height !== undefined ? `${height}px` : undefined }}
          className="overflow-hidden transition-[height] duration-400 ease-in-out"
        >
          <div className="px-5 pb-5">{children}</div>
        </div>
      )}
    </div>
  )
}

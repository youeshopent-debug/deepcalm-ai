"use client"

import { useEffect, useState } from "react"

export default function HeroSection({
  title,
  subtitle,
  ctaText,
}: {
  title: string
  subtitle: string
  ctaText: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[58vh] sm:min-h-[62vh] flex items-center justify-center overflow-hidden pt-14">
      <div className="aurora-gradient pointer-events-none absolute inset-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-dc-muted tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-dc-accent animate-pulse-soft" />
          Midnight Sanctuary
        </div>

        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-dc-text text-glow transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {title}
        </h1>

        <p className={`mt-5 text-base sm:text-lg text-dc-muted leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {subtitle}
        </p>

        <div className={`mt-10 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href="#ai-counselor"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-dc-accent text-dc-deep font-semibold text-sm hover:bg-dc-accent/90 transition-all duration-300 shadow-lg shadow-dc-accent/20"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}

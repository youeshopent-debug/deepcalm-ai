"use client"

import { BookOpen, Sparkles } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function SeoContent() {
  const { tt } = useLanguage()
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const sections = [
    { key: "section1_title", contentKey: "section1", id: "seo-s1" },
    { key: "section2_title", contentKey: "section2", id: "seo-s2" },
    { key: "section3_title", contentKey: "section3", id: "seo-s3" },
    { key: "section4_title", contentKey: "section4", id: "seo-s4" },
    { key: "section5_title", contentKey: "section5", id: "seo-s5" },
    { key: "section6_title", contentKey: "section6", id: "seo-s6" },
  ]

  return (
    <section id="science" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-nord-accent/10 mb-4">
            <BookOpen className="w-6 h-6 text-nord-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-nord-text mb-3">
            {tt("seo.title")}
          </h2>
          <p className="text-nord-muted max-w-2xl mx-auto text-sm">
            {tt("seo.intro")}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="p-6 sm:p-8 bg-nord-card border border-nord-border rounded-xl hover:border-nord-accent/20 transition-colors"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-nord-text mb-4">
                {tt(`seo.${s.key}`)}
              </h3>
              <p className="text-sm text-nord-muted leading-relaxed">
                {tt(`seo.${s.contentKey}`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => scrollTo("counselor")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-nord-accent text-white rounded-xl font-medium text-sm hover:bg-nord-accent/90 transition-all duration-300 shadow-lg shadow-nord-accent/20"
          >
            <Sparkles className="w-4 h-4" />
            {tt("seo.cta")}
          </button>
        </div>

        <p className="mt-8 text-xs text-nord-muted/60 text-center max-w-3xl mx-auto leading-relaxed">
          {tt("seo.references")}
        </p>
      </div>
    </section>
  )
}

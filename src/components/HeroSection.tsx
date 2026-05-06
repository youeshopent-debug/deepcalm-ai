"use client"

import { Sparkles, Moon, ArrowDown } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function HeroSection() {
  const { tt } = useLanguage()
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-nord-accent/5 via-transparent to-nord-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-nord-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nord-accent/10 border border-nord-accent/20 text-nord-accent text-xs sm:text-sm mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          {tt("hero.badge")}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-nord-text leading-tight mb-6 animate-slide-up">
          {tt("hero.title")}
        </h1>

        <p className="text-lg sm:text-xl text-nord-muted max-w-2xl mx-auto mb-10 animate-slide-up">
          {tt("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <button
            onClick={() => scrollTo("counselor")}
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-nord-accent text-white rounded-xl font-medium text-sm hover:bg-nord-accent/90 transition-all duration-300 shadow-lg shadow-nord-accent/20 hover:shadow-nord-accent/30 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {tt("hero.cta_counselor")}
          </button>
          <button
            onClick={() => scrollTo("hypnotist")}
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-nord-surface text-nord-text rounded-xl font-medium text-sm border border-nord-border hover:bg-nord-card transition-all duration-300 hover:-translate-y-0.5"
          >
            <Moon className="w-4 h-4 text-nord-accent group-hover:rotate-12 transition-transform" />
            {tt("hero.cta_sleep")}
          </button>
        </div>
      </div>

      <button
        onClick={() => scrollTo("counselor")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-nord-muted hover:text-nord-accent transition-colors animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  )
}

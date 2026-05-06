"use client"

import { Moon } from "lucide-react"
import LanguageSwitcher from "./LanguageSwitcher"
import { useLanguage } from "@/context/LanguageContext"

export default function Header() {
  const { tt } = useLanguage()
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nord-bg/80 backdrop-blur-xl border-b border-nord-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-nord-accent/20 flex items-center justify-center group-hover:bg-nord-accent/30 transition-colors">
              <Moon className="w-4 h-4 text-nord-accent" />
            </div>
            <span className="text-lg font-semibold text-nord-text tracking-tight">
              DeepCalm<span className="text-nord-accent"> AI</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: "counselor", key: "nav.counselor" },
              { id: "hypnotist", key: "nav.hypnotist" },
              { id: "science", key: "nav.science" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-nord-muted hover:text-nord-text transition-colors"
              >
                {tt(item.key)}
              </button>
            ))}
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

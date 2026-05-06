"use client"

import { Heart } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function Footer() {
  const { tt } = useLanguage()

  return (
    <footer className="bg-nord-card border-t border-nord-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2 text-nord-text">
            <Heart className="w-5 h-5 text-nord-accent" />
            <span className="text-sm">{tt("footer.tagline")}</span>
          </div>
          <p className="text-xs text-nord-muted max-w-2xl">
            {tt("footer.disclaimer")}
          </p>
          <div className="flex items-center gap-4 text-xs text-nord-muted">
            <span>{tt("footer.privacy")}</span>
            <span className="w-px h-3 bg-nord-border" />
            <span>{tt("footer.terms")}</span>
            <span className="w-px h-3 bg-nord-border" />
            <span>{tt("footer.copyright")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

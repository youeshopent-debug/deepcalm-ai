"use client"

import { useLanguage } from "@/context/LanguageContext"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const { locale, tt } = useLanguage()

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
            <Link href={`/${locale}/privacy`} className="hover:text-nord-accent transition-colors">
              {tt("footer.privacy")}
            </Link>
            <span className="w-px h-3 bg-nord-border" />
            <Link href={`/${locale}/terms`} className="hover:text-nord-accent transition-colors">
              {tt("footer.terms")}
            </Link>
            <span className="w-px h-3 bg-nord-border" />
            <Link href={`/${locale}/guide`} className="hover:text-nord-accent transition-colors">
              {tt("footer.guide")}
            </Link>
            <span className="w-px h-3 bg-nord-border" />
            <Link href={`/${locale}/about`} className="hover:text-nord-accent transition-colors">
              {tt("footer.about")}
            </Link>
            <span className="w-px h-3 bg-nord-border" />
            <span>{tt("footer.copyright")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

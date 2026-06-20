"use client"

import { Moon } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import GlobeLangSwitcher from "./GlobeLangSwitcher";

export default function Header() {
  const { tt, locale } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dc-deep/60 backdrop-blur-xl">
      {/* 渐变覆盖层：确保导航文字在任何亮色背景上保持可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none -z-10" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-dc-accent/20 flex items-center justify-center group-hover:bg-dc-accent/30 transition-colors">
                <Moon className="w-3.5 h-3.5 text-dc-accent" />
              </div>
              <span className="text-base font-semibold text-dc-text tracking-tight">
                DeepCalm<span className="text-dc-accent"> AI</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-sm text-dc-muted">
              <Link href={`/${locale}`} className="hover:text-dc-text transition-colors">
                {tt("nav.home")}
              </Link>
              <Link href={`/${locale}/guide`} className="hover:text-dc-text transition-colors">
                {tt("nav.guide")}
              </Link>
              <Link href={`/${locale}/about`} className="hover:text-dc-text transition-colors">
                {tt("nav.about")}
              </Link>
              <Link href={`/${locale}/privacy`} className="hover:text-dc-text transition-colors">
                {tt("nav.privacy")}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-dc-text transition-colors">
                {tt("nav.terms")}
              </Link>
            </nav>
          </div>

          <Suspense fallback={<div className="w-9 h-9" />}>
            <GlobeLangSwitcher />
          </Suspense>
        </div>
      </div>
    </header>
  )
}

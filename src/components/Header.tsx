"use client"

import { Moon } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import GlobeLangSwitcher from "./GlobeLangSwitcher";

export default function Header() {
  const { tt, locale } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <Moon className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                DeepCalm<span className="text-emerald-300"> AI</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-sm text-white/65">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {tt("nav.home")}
              </Link>
              <Link href={`/${locale}/guide`} className="hover:text-white transition-colors">
                {tt("nav.guide")}
              </Link>
              <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                {tt("nav.about")}
              </Link>
              <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                {tt("nav.privacy")}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
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

"use client"

import { Menu, Moon, X } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import GlobeLangSwitcher from "./GlobeLangSwitcher";

export default function Header() {
  const { tt, locale } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [locale])

  const navItems = [
    { href: `/${locale}`, label: tt("nav.home") },
    { href: `/${locale}/guide`, label: tt("nav.guide") },
    { href: `/${locale}/about`, label: tt("nav.about") },
    { href: `/${locale}/privacy`, label: tt("nav.privacy") },
    { href: `/${locale}/terms`, label: tt("nav.terms") },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#132723]/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <Moon className="w-3.5 h-3.5 text-[#c2f4df]" />
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                DeepCalm<span className="text-[#c2f4df]"> AI</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-sm text-[#d6e8df]">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <Suspense fallback={<div className="w-9 h-9" />}>
              <GlobeLangSwitcher />
            </Suspense>

            <div ref={mobileNavRef} className="relative md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[#d6e8df] hover:text-white hover:bg-white/10 transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {mobileOpen && (
                <nav
                  id="mobile-nav-menu"
                  className="absolute right-0 top-full mt-2 w-48 py-2 bg-[#132723] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl animate-fade-in-up"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[#d6e8df] hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

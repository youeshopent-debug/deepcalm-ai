"use client"

import { Moon } from "lucide-react"
import GlobeLangSwitcher from "./GlobeLangSwitcher"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dc-deep/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-full bg-dc-accent/20 flex items-center justify-center group-hover:bg-dc-accent/30 transition-colors">
              <Moon className="w-3.5 h-3.5 text-dc-accent" />
            </div>
            <span className="text-base font-semibold text-dc-text tracking-tight">
              DeepCalm<span className="text-dc-accent"> AI</span>
            </span>
          </div>

          <GlobeLangSwitcher />
        </div>
      </div>
    </header>
  )
}

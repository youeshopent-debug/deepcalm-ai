"use client"

import { useState, useRef, useEffect } from "react"
import { Palette, Leaf, Sunset, Sun, Sparkles } from "lucide-react"
import { useTheme, type ThemeType } from "@/context/ThemeContext"

const themes: { key: ThemeType; label: string; labelEn: string; icon: typeof Leaf; color: string }[] = [
  { key: "deepcalm", label: "深邃空间", labelEn: "Deep Space", icon: Sparkles, color: "#1A2238" },
  { key: "forest", label: "森林空间", labelEn: "Forest Space", icon: Leaf, color: "#9CAF88" },
  { key: "twilight", label: "暮色空间", labelEn: "Twilight Space", icon: Sunset, color: "#778899" },
  { key: "earth", label: "大地空间", labelEn: "Earth Space", icon: Sun, color: "#E5D3B3" },
]

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const current = themes.find((t) => t.key === theme) ?? themes[0]

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full glass flex items-center justify-center
          hover:scale-110 active:scale-95 transition-all duration-300
          shadow-lg hover:shadow-xl"
        aria-label="切换主题"
      >
        <Palette className="w-5 h-5 text-dc-accent" />
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute bottom-full right-0 mb-3 w-52 py-2 px-1
            bg-dc-surface/90 backdrop-blur-xl border border-dc-border/60
            rounded-xl shadow-2xl animate-fade-in-up"
        >
          <p className="px-3 py-1.5 text-xs text-dc-muted tracking-wider uppercase">
            氛围选择
          </p>
          {themes.map((t) => {
            const Icon = t.icon
            const active = theme === t.key
            return (
              <button
                key={t.key}
                onClick={() => {
                  setTheme(t.key)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200
                  ${active
                    ? "bg-dc-accent-soft text-dc-accent"
                    : "text-dc-muted hover:text-dc-text hover:bg-white/5"
                  }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white/10 flex-shrink-0"
                  style={{ backgroundColor: t.color }}
                />
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{t.label}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-dc-accent" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

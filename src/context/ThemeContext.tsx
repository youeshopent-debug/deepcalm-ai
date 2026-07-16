"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export type ThemeType = "deepcalm" | "forest" | "twilight" | "earth" | "deepsea" | "starry" | "winter_night"

const VALID_THEMES: ThemeType[] = ["deepcalm", "forest", "twilight", "earth", "deepsea", "starry", "winter_night"]

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const STORAGE_KEY = "deepcalm-theme"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("deepcalm")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeType | null
    if (stored && VALID_THEMES.includes(stored)) {
      setThemeState(stored)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, [theme, mounted])

  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

"use client"

import { useState, type FormEvent } from "react"
import { MessageCircle, Heart, CheckCircle2, Lightbulb, Loader2, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import type { AnxietyAnalysis } from "@/types"

export default function AiCounselor() {
  const { tt } = useLanguage()
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnxietyAnalysis | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const res = await fetch("/api/analyze-anxiety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.trim() }),
      })

      if (!res.ok) throw new Error("API error")

      const data: AnxietyAnalysis = await res.json()
      setResult(data)
    } catch {
      setError(tt("counselor.error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="counselor" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-nord-bg via-nord-accent/[0.02] to-nord-bg" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-nord-accent/10 mb-4">
            <MessageCircle className="w-6 h-6 text-nord-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-nord-text mb-3">
            {tt("counselor.title")}
          </h2>
          <p className="text-nord-muted max-w-xl mx-auto text-sm sm:text-base">
            {tt("counselor.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tt("counselor.placeholder")}
              rows={4}
              className="w-full px-5 py-4 bg-nord-card border border-nord-border rounded-xl text-nord-text placeholder-nord-muted/50 text-sm resize-none focus:outline-none focus:border-nord-accent/50 focus:ring-2 focus:ring-nord-accent/10 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-nord-accent text-white rounded-xl font-medium text-sm hover:bg-nord-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {tt("counselor.analyzing")}
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                {tt("counselor.analyze")}
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
            <div className="p-6 bg-nord-accent/10 border border-nord-accent/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-nord-accent" />
                <span className="text-nord-accent font-medium text-sm">
                  {tt("counselor.thinking_patterns")}
                </span>
              </div>
              <p className="text-nord-text text-sm leading-relaxed">
                {result.thinkingPatterns}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-nord-accent/10 to-nord-card border border-nord-accent/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-pink-400 font-medium text-sm">
                  {tt("counselor.encouragement")}
                </span>
              </div>
              <p className="text-nord-text text-sm leading-relaxed">
                {result.encouragement}
              </p>
            </div>

            <div className="p-6 bg-nord-card border border-nord-border rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-medium text-sm">
                  {tt("counselor.steps_title")}
                </span>
              </div>
              <ul className="space-y-3">
                {result.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-400 text-xs font-bold">{i + 1}</span>
                    </span>
                    <span className="text-nord-text text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <p className="mt-12 text-center text-xs text-nord-muted/60 max-w-lg mx-auto">
          {tt("counselor.disclaimer")}
        </p>
      </div>
    </section>
  )
}

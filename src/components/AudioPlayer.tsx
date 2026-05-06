"use client"

import { Headphones, Waves, FileText } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function AudioPlayer() {
  const { tt } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="p-6 bg-nord-card border border-nord-border rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-nord-accent/10 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-nord-accent" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-nord-text">
              {tt("hypnotist.audio_title")}
            </h4>
          </div>
        </div>

        <div className="relative h-20 bg-nord-surface rounded-lg border border-nord-border/50 flex items-center justify-center overflow-hidden">
          <Waves className="w-8 h-8 text-nord-muted/30" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nord-accent/20 via-nord-accent/40 to-nord-accent/20" />
        </div>

        <p className="text-xs text-nord-muted mt-3">{tt("hypnotist.audio_desc")}</p>
      </div>

      <div className="p-6 bg-nord-card border border-nord-border rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-nord-text">
              {tt("hypnotist.brief_title")}
            </h4>
          </div>
        </div>
        <p className="text-xs text-nord-muted">{tt("hypnotist.brief_desc")}</p>
      </div>
    </div>
  )
}

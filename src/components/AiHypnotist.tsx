"use client"

import { Moon } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import SleepCalculator from "./SleepCalculator"
import AudioPlayer from "./AudioPlayer"

export default function AiHypnotist() {
  const { tt } = useLanguage()

  return (
    <section id="hypnotist" className="py-24 bg-nord-card/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-nord-accent/10 mb-4">
            <Moon className="w-6 h-6 text-nord-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-nord-text mb-3">
            {tt("hypnotist.title")}
          </h2>
          <p className="text-nord-muted max-w-xl mx-auto text-sm sm:text-base">
            {tt("hypnotist.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <SleepCalculator />
          <AudioPlayer />
        </div>
      </div>
    </section>
  )
}

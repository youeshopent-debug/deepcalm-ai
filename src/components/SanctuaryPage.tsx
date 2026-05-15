"use client"

import { useState } from "react"
import BackgroundCanvas from "./BackgroundCanvas"
import BackgroundVideo from "./BackgroundVideo"
import HeroSection from "./HeroSection"
import AiCounselor from "./AiCounselor"
import DailyCheckin from "./DailyCheckin"
import SleepCalculator from "./SleepCalculator"
import SeoContent from "./SeoContent"
import ResonanceWall from "./ResonanceWall"
import SitemapFooter from "./SitemapFooter"
import { useLanguage } from "@/context/LanguageContext"

export default function SanctuaryPage() {
  const { tt } = useLanguage()
  const [videoMode] = useState(true)

  return (
    <div className="relative min-h-screen">
      <BackgroundVideo
        src="/videos/forest.mp4"
        overlayOpacity={0.5}
        enabled={videoMode}
      />
      <BackgroundCanvas videoMode={videoMode} />

      {/* 4s/7s Breathing Halo — guides user to breathe in sync */}
      <div className="fixed inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full animate-breathing-halo-4-7"
          style={{
            background: "radial-gradient(circle, rgba(126,184,255,0.12) 0%, rgba(106,90,205,0.08) 40%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full animate-breathe-inner-4-7"
          style={{
            background: "radial-gradient(circle, rgba(126,184,255,0.1) 0%, rgba(78,205,196,0.06) 35%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <main className="relative z-10">
        {/* Hero — brand intro */}
        <HeroSection
          title={tt("hero.title")}
          subtitle={tt("hero.subtitle")}
          ctaText={tt("hero.cta")}
        />

        {/* AI Counselor — main interaction */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16">
          <AiCounselor />
        </section>

        {/* Daily Check-in */}
        <section id="daily-checkin" className="w-full py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <DailyCheckin />
          </div>
        </section>

        {/* Sleep Calculator */}
        <section id="sleep-calculator" className="w-full py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <SleepCalculator />
          </div>
        </section>

        {/* SEO Content — 800字深度睡眠科学指南 */}
      <section id="seo-content" className="w-full py-16 sm:py-24 px-4 sm:px-6">
        <SeoContent />
      </section>

      {/* Resonance Wall — community mood board */}
      <section id="resonance-wall" className="w-full py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <ResonanceWall />
        </div>
      </section>
      </main>

      <SitemapFooter />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 text-xs text-dc-muted/40 pointer-events-none">
        DeepCalm AI · Midnight Sanctuary
      </div>
    </div>
  )
}

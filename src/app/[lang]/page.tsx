"use client"

import HeroSection from "@/components/HeroSection"
import AiCounselor from "@/components/AiCounselor"
import AudioMixer from "@/components/AudioMixer"
import BreathingCounter from "@/components/BreathingCounter"
import DailyCheckin from "@/components/DailyCheckin"
import AiHypnotist from "@/components/AiHypnotist"
import ResonanceWall from "@/components/ResonanceWall"
import SeoContent from "@/components/SeoContent"
import { useLanguage } from "@/context/LanguageContext"

export default function Home() {
  const { tt } = useLanguage()

  return (
    <main className="relative">
      <div className="biophilic-bg fixed inset-0 z-0 pointer-events-none" />
      <HeroSection
        title={tt("hero.title")}
        subtitle={tt("hero.subtitle")}
        ctaText={tt("hero.cta")}
      />

      <div className="relative">
        <div className="absolute inset-0 aurora-gradient opacity-50 pointer-events-none" />
        <div className="relative z-10 space-y-32 pb-32">
          <section id="ai-counselor">
            <AiCounselor />
          </section>

          <section id="ambient-audio">
            <AudioMixer />
          </section>

          <section id="tools" className="px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="glass rounded-2xl p-6 max-w-md mx-auto">
                <BreathingCounter />
              </div>
            </div>
          </section>

          <section id="daily-checkin" className="px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
              <DailyCheckin />
            </div>
          </section>

          <section id="hypnotist">
            <AiHypnotist />
          </section>

          <section id="resonance-wall">
            <ResonanceWall />
          </section>

          <section id="seo-content">
            <SeoContent />
          </section>
        </div>
      </div>

      <footer className="py-8 text-center text-sm text-dc-muted">
        <div className="max-w-4xl mx-auto px-4">
          <p>{tt("footer.copyright")}</p>
          <p className="mt-1">{tt("footer.tagline")}</p>
        </div>
      </footer>
    </main>
  )
}

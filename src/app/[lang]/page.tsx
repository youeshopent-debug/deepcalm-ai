import HeroSection from "@/components/HeroSection"
import AiCounselor from "@/components/AiCounselor"
import AmbientAudio from "@/components/AmbientAudio"
import BreathingCounter from "@/components/BreathingCounter"
import SleepCalculator from "@/components/SleepCalculator"
import DailyCheckin from "@/components/DailyCheckin"
import ResonanceWall from "@/components/ResonanceWall"
import SeoContent from "@/components/SeoContent"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection
        title="Your Midnight Sanctuary"
        subtitle="AI-powered emotional support & sleep guidance. You are not alone in the quiet hours."
        ctaText="Begin Your Journey"
      />

      <div className="relative">
        <div className="absolute inset-0 aurora-gradient opacity-50 pointer-events-none" />
        <div className="relative z-10 space-y-32 pb-32">
          <section id="ai-counselor">
            <AiCounselor />
          </section>

          <section id="ambient-audio">
            <AmbientAudio />
          </section>

          <section id="tools" className="px-4 sm:px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6">
                <BreathingCounter />
              </div>
              <div className="glass rounded-2xl p-6">
                <SleepCalculator />
              </div>
              <div className="glass rounded-2xl p-6">
                <DailyCheckin />
              </div>
            </div>
          </section>

          <section id="resonance-wall">
            <ResonanceWall />
          </section>

          <section id="seo-content">
            <SeoContent />
          </section>
        </div>
      </div>

      <footer className="border-t border-dc-border py-8 text-center text-sm text-dc-muted">
        <div className="max-w-4xl mx-auto px-4">
          <p>DeepCalm AI &copy; {new Date().getFullYear()} &mdash; Midnight Sanctuary</p>
          <p className="mt-1">
            This is not a substitute for professional medical advice. If you are in crisis, please contact your local emergency services.
          </p>
        </div>
      </footer>
    </main>
  )
}

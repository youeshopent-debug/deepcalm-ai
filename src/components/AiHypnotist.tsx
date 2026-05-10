"use client"

import { useState, useCallback } from "react"
import { Moon, CloudRain, Wind, Flame, Droplets, Bird, Volume2 } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import SleepCalculator from "./SleepCalculator"
import { audioEngine, type ChannelId } from "@/lib/audioEngine"

const TRACKS: { id: ChannelId; icon: React.ElementType; labelKey: string; color: string }[] = [
  { id: "rain", icon: CloudRain, labelKey: "audioPlayer.rain", color: "rgba(120,180,255,0.7)" },
  { id: "wind", icon: Wind, labelKey: "audioPlayer.wind", color: "rgba(180,220,200,0.7)" },
  { id: "fire", icon: Flame, labelKey: "audioPlayer.fire", color: "rgba(255,160,80,0.7)" },
  { id: "stream", icon: Droplets, labelKey: "audioPlayer.stream", color: "rgba(100,200,220,0.7)" },
  { id: "birds", icon: Bird, labelKey: "audioPlayer.birds", color: "rgba(200,180,120,0.7)" },
]

export default function AiHypnotist() {
  const { tt } = useLanguage()
  const [active, setActive] = useState<Set<ChannelId>>(new Set())

  const toggle = useCallback((id: ChannelId) => {
    audioEngine.init()
    const next = new Set(active)
    if (next.has(id)) {
      next.delete(id)
      audioEngine.toggleChannel(id, false)
    } else {
      next.add(id)
      audioEngine.toggleChannel(id, true)
    }
    setActive(next)
  }, [active])

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
          <div className="p-6 bg-dc-card/40 backdrop-blur-xl rounded-2xl glass flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-dc-accent/10 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-dc-accent" />
              </div>
              <div>
                <h4 className="text-base font-medium text-dc-text">{tt("audioPlayer.title")}</h4>
                <p className="text-xs text-dc-muted">{tt("audioPlayer.subtitle")}</p>
              </div>
            </div>
            {TRACKS.map(({ id, icon: Icon, labelKey, color }) => {
              const isOn = active.has(id)
              return (
                <button
                  key={id}
                  onClick={() => toggle(id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/5"
                  style={isOn ? { backgroundColor: color + "20" } : {}}
                >
                  <Icon size={18} style={{ color: isOn ? color : "rgba(255,255,255,0.4)" }} />
                  <span
                    className="text-sm flex-1 text-left"
                    style={{ color: isOn ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
                  >
                    {tt(labelKey)}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${isOn ? "opacity-100" : "opacity-0"}`}
                    style={{ backgroundColor: color, boxShadow: isOn ? `0 0 6px ${color}` : "none" }}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { audioEngine, type ChannelId } from "@/lib/audioEngine"

const ICONS: Record<ChannelId, string> = {
  rain: "💧",
  wind: "🌲",
  fire: "🔥",
}

const LABELS: Record<ChannelId, string> = {
  rain: "Rain",
  wind: "Forest Wind",
  fire: "Campfire",
}

const COLORS: Record<ChannelId, string> = {
  rain: "#7EB8FF",
  wind: "#4ECDC4",
  fire: "#FF9F43",
}

export default function AmbientAudio() {
  const [active, setActive] = useState<ChannelId | null>(null)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    return () => {
      audioEngine.destroy()
    }
  }, [])

  useEffect(() => {
    audioEngine.setMasterVolume(volume)
  }, [volume])

  const toggle = useCallback((channel: ChannelId) => {
    if (active === channel) {
      audioEngine.toggleChannel(channel, false)
      setActive(null)
      return
    }
    audioEngine.init()
    if (active) audioEngine.toggleChannel(active, false)
    audioEngine.toggleChannel(channel, true)
    audioEngine.setMasterVolume(volume)
    setActive(channel)
  }, [active, volume])

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
      <h2 className="text-2xl font-bold text-dc-text">Sound Sanctuary</h2>
      <p className="mt-1 text-sm text-dc-muted mb-8">
        Let nature&apos;s rhythm guide your breath
      </p>

      <div className="flex items-center justify-center gap-6">
        {(Object.keys(ICONS) as ChannelId[]).map((ch) => (
          <button
            key={ch}
            onClick={() => toggle(ch)}
            className={`relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-500 ${
              active === ch
                ? "glass-strong scale-105"
                : "glass hover:bg-dc-accent/10"
            }`}
            style={{
              boxShadow:
                active === ch
                  ? `0 0 24px ${COLORS[ch]}33, inset 0 0 12px ${COLORS[ch]}11`
                  : undefined,
            }}
          >
            <span
              className={`text-2xl transition-all duration-500 ${
                active === ch ? "animate-pulse-soft" : ""
              }`}
            >
              {ICONS[ch]}
            </span>
            <span className="text-xs text-dc-muted">{LABELS[ch]}</span>
            {active === ch && (
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full animate-pulse-soft"
                style={{ background: COLORS[ch] }}
              />
            )}
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-6 flex items-center justify-center gap-3 animate-slide-up">
          <span className="text-xs text-dc-muted">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-32 h-1 rounded-full appearance-none bg-dc-border cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dc-accent"
          />
        </div>
      )}
    </div>
  )
}

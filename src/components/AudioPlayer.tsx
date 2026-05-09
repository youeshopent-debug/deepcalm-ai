"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Headphones, Volume2 } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { audioEngine, type ChannelId } from "@/lib/audioEngine"

const CHANNELS: { id: ChannelId; labelKey: string }[] = [
  { id: "rain", labelKey: "audioPlayer.rain" },
  { id: "wind", labelKey: "audioPlayer.wind" },
  { id: "fire", labelKey: "audioPlayer.fire" },
]

function RaindropIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C12 2 6 10 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 2 12 2Z" />
    </svg>
  )
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20V8M12 8C12 8 6 4 3 8C1 11 4 14 12 20" />
      <path d="M12 8C12 8 18 4 21 8C23 11 20 14 12 20" />
    </svg>
  )
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C12 2 8 8 8 13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13C16 8 12 2 12 2Z" />
      <path d="M12 17V22" />
      <path d="M9 20H15" />
    </svg>
  )
}

const ICONS: Record<ChannelId, typeof RaindropIcon> = {
  rain: RaindropIcon,
  wind: LeafIcon,
  fire: FlameIcon,
}

const ACTIVE_COLORS: Record<ChannelId, string> = {
  rain: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  wind: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
  fire: "bg-orange-400/15 text-orange-400 border-orange-400/30",
}

const WAVE_COLORS: Record<ChannelId, string> = {
  rain: "bg-blue-400/40",
  wind: "bg-emerald-400/40",
  fire: "bg-orange-400/40",
}

export default function AudioPlayer() {
  const { tt } = useLanguage()
  const [activeChannels, setActiveChannels] = useState<Set<ChannelId>>(new Set())
  const [volume, setVolume] = useState(0.6)
  const [dimmed, setDimmed] = useState(false)
  const [inited, setInited] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>()
  const containerRef = useRef<HTMLDivElement>(null)

  const resetDim = useCallback(() => {
    setDimmed(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setDimmed(true), 3000)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(idleTimer.current)
      audioEngine.destroy()
    }
  }, [])

  const handleInit = useCallback(() => {
    if (inited) return
    audioEngine.init()
    audioEngine.setMasterVolume(volume)
    setInited(true)
  }, [inited, volume])

  const toggleChannel = useCallback((id: ChannelId) => {
    handleInit()
    const on = !audioEngine.isActive(id)
    audioEngine.toggleChannel(id, on)
    setActiveChannels(new Set(
      on
        ? [...activeChannels, id]
        : [...activeChannels].filter(c => c !== id)
    ))
    resetDim()
  }, [handleInit, activeChannels, resetDim])

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    audioEngine.setMasterVolume(v)
    resetDim()
  }, [resetDim])

  if (!inited && !activeChannels.size) {
    return (
      <div
        ref={containerRef}
        onMouseEnter={resetDim}
        onMouseMove={resetDim}
        className={`p-6 bg-nord-card border border-nord-border rounded-xl transition-opacity duration-700 ${dimmed ? "opacity-40" : "opacity-100"}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-nord-accent/10 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-nord-accent" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-nord-text">{tt("audioPlayer.title")}</h4>
            <p className="text-xs text-nord-muted">{tt("audioPlayer.subtitle")}</p>
          </div>
        </div>
        <div className="flex gap-3 mb-5">
          {CHANNELS.map(({ id, labelKey }) => {
            const Icon = ICONS[id]
            return (
              <button
                key={id}
                onClick={() => toggleChannel(id)}
                className="flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl border border-nord-border/50 bg-nord-surface/50 text-nord-muted hover:text-nord-text hover:border-nord-border transition-all duration-200"
              >
                <Icon className="w-6 h-6" />
                <span className="text-[11px] font-medium">{tt(labelKey)}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={resetDim}
      onMouseMove={resetDim}
      onMouseLeave={() => { clearTimeout(idleTimer.current); setDimmed(true) }}
      className={`p-6 bg-nord-card border border-nord-border rounded-xl transition-opacity duration-700 ${dimmed ? "opacity-40" : "opacity-100"}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-nord-accent/10 flex items-center justify-center">
          <Headphones className="w-5 h-5 text-nord-accent" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-nord-text">{tt("audioPlayer.title")}</h4>
          <p className="text-xs text-nord-muted">{tt("audioPlayer.subtitle")}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        {CHANNELS.map(({ id, labelKey }) => {
          const Icon = ICONS[id]
          const active = activeChannels.has(id)
          return (
            <button
              key={id}
              onClick={() => toggleChannel(id)}
              className={`flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl border transition-all duration-300 ${
                active
                  ? `${ACTIVE_COLORS[id]} shadow-sm`
                  : "border-nord-border/50 bg-nord-surface/50 text-nord-muted hover:text-nord-text hover:border-nord-border"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[11px] font-medium">{tt(labelKey)}</span>
              {active && (
                <div className="flex items-end gap-[2px] h-3 mt-1">
                  {[1,2,3,4].map(i => (
                    <div
                      key={i}
                      className={`w-[3px] rounded-full ${WAVE_COLORS[id]} animate-pulse`}
                      style={{
                        height: `${4 + i * 3}px`,
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: "0.8s",
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3 px-1">
        <Volume2 className="w-4 h-4 text-nord-muted shrink-0" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="flex-1 h-1.5 appearance-none rounded-full bg-nord-surface outline-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-nord-accent
            [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-110"
          style={{
            background: `linear-gradient(to right, #88C0D0 0%, #88C0D0 ${volume * 100}%, #3B4252 ${volume * 100}%, #3B4252 100%)`,
          }}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-[10px] text-nord-muted/50">{tt("audioPlayer.idleHint")}</p>
      </div>
    </div>
  )
}

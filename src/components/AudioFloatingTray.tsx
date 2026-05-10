"use client"

import { useState, useRef, useEffect } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"

const TRACKS = [
  { id: "rain", label: "Rain", emoji: "🌧" },
  { id: "crickets", label: "Crickets", emoji: "🦗" },
  { id: "stream", label: "Stream", emoji: "🌊" },
  { id: "birds", label: "Birds", emoji: "🐦" },
  { id: "brownNoise", label: "Brown Noise", emoji: "🌫" },
]

const AudioIcon = Music

export default function AudioFloatingTray() {
  const [expanded, setExpanded] = useState(false)
  const [volumes, setVolumes] = useState<Record<string, number>>(
    Object.fromEntries(TRACKS.map((t) => [t.id, 0]))
  )
  const trayRef = useRef<HTMLDivElement>(null)
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (trayRef.current && !trayRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isAnyPlaying = Object.values(volumes).some((v) => v > 0)

  function handleVolumeChange(id: string, vol: number) {
    setVolumes((prev) => ({ ...prev, [id]: vol }))
    const audio = audioRefs.current[id]
    if (audio) {
      audio.volume = vol
      if (vol > 0 && audio.paused) {
        audio.loop = true
        audio.play().catch(() => {})
      } else if (vol === 0 && !audio.paused) {
        audio.pause()
      }
    }
  }

  function setAudioRef(id: string, el: HTMLAudioElement | null) {
    if (el && !audioRefs.current[id]) {
      audioRefs.current[id] = el
    }
  }

  return (
    <div ref={trayRef} className="fixed bottom-6 left-6 z-[100]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dc-surface/60 backdrop-blur-lg border border-dc-border/50 shadow-lg hover:bg-dc-surface/80 transition-all text-dc-text/60 hover:text-dc-text"
      >
        {isAnyPlaying ? (
          <Volume2 className="w-4 h-4 text-dc-accent" />
        ) : (
          <AudioIcon className="w-4 h-4" />
        )}
        <span className="text-xs hidden sm:inline">
          {isAnyPlaying ? "Playing" : "Ambient"}
        </span>
      </button>

      {expanded && (
        <div className="absolute bottom-full left-0 mb-2 w-56 py-3 px-4 bg-dc-surface/90 backdrop-blur-xl border border-dc-border/60 rounded-xl shadow-2xl">
          <p className="text-xs text-dc-text/40 mb-2">Ambient Sound</p>
          <div className="space-y-3">
            {TRACKS.map((track) => (
              <div key={track.id} className="flex items-center gap-3">
                <span className="text-sm w-5 text-center">{track.emoji}</span>
                <span className="text-xs text-dc-text/70 w-16 shrink-0">
                  {track.label}
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volumes[track.id]}
                  onChange={(e) =>
                    handleVolumeChange(track.id, parseFloat(e.target.value))
                  }
                  className="flex-1 h-1 accent-dc-accent bg-white/10 rounded-full appearance-none cursor-pointer"
                />
                {track.id === "rain" && (
                  <audio
                    ref={(el) => setAudioRef(track.id, el)}
                    src="/audio/rain.mp3"
                    preload="none"
                  />
                )}
                {track.id === "crickets" && (
                  <audio
                    ref={(el) => setAudioRef(track.id, el)}
                    src="/audio/crickets.mp3"
                    preload="none"
                  />
                )}
                {track.id === "stream" && (
                  <audio
                    ref={(el) => setAudioRef(track.id, el)}
                    src="/audio/stream.mp3"
                    preload="none"
                  />
                )}
                {track.id === "birds" && (
                  <audio
                    ref={(el) => setAudioRef(track.id, el)}
                    src="/audio/birds.mp3"
                    preload="none"
                  />
                )}
                {track.id === "brownNoise" && (
                  <audio
                    ref={(el) => setAudioRef(track.id, el)}
                    src="/audio/brown-noise.mp3"
                    preload="none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

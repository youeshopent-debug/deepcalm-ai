"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, Music } from "lucide-react"
import { audioEngine, type ChannelId } from "@/lib/audioEngine"
import { useTheme } from "@/context/ThemeContext"

const TRACKS: { id: ChannelId; label: string; emoji: string }[] = [
  { id: "rain", label: "Rain", emoji: "🌧" },
  { id: "wind", label: "Wind", emoji: "💨" },
  { id: "stream", label: "Stream", emoji: "🌊" },
  { id: "birds", label: "Birds", emoji: "🐦" },
  { id: "fire", label: "Fire", emoji: "🔥" },
  { id: "insects", label: "Insects", emoji: "🦗" },
]

export default function AudioFloatingTray() {
  const [expanded, setExpanded] = useState(false)
  const [channelStates, setChannelStates] = useState<Record<ChannelId, boolean>>(
    { rain: false, wind: false, fire: false, stream: false, birds: false, insects: false }
  )
  const [masterVolume, setMasterVolume] = useState(audioEngine.volume)
  const trayRef = useRef<HTMLDivElement>(null)
  const hasInitRef = useRef(false)
  const { theme } = useTheme()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (trayRef.current && !trayRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    Promise.all([
      audioEngine.loadAudioBuffer('birds', '/audio/birds-nature.mp3'),
      audioEngine.loadAudioBuffer('rain', '/audio/rain-nature.mp3'),
      audioEngine.loadAudioBuffer('wind', '/audio/wind-nature.mp3'),
      audioEngine.loadAudioBuffer('fire', '/audio/fire-nature.mp3'),
      audioEngine.loadAudioBuffer('stream', '/audio/stream-nature.mp3'),
      audioEngine.loadAudioBuffer('insects', '/audio/insects-nature.mp3'),
    ]).then(() => {
      hasInitRef.current = true
      audioEngine.applyThemeAudio(theme)
    })
  }, [])

  useEffect(() => {
    if (!hasInitRef.current) return
    audioEngine.applyThemeAudio(theme)
    setChannelStates({
      rain: audioEngine.isActive('rain'),
      wind: audioEngine.isActive('wind'),
      fire: audioEngine.isActive('fire'),
      stream: audioEngine.isActive('stream'),
      birds: audioEngine.isActive('birds'),
      insects: audioEngine.isActive('insects'),
    })
  }, [theme])

  const isAnyPlaying = Object.values(channelStates).some((v) => v)

  function handleChannelToggle(id: ChannelId) {
    const next = !channelStates[id]
    setChannelStates((prev) => ({ ...prev, [id]: next }))
    audioEngine.toggleChannel(id, next)
  }

  function handleMasterVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const vol = parseFloat(e.target.value)
    setMasterVolume(vol)
    audioEngine.setMasterVolume(vol)
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
          <Music className="w-4 h-4" />
        )}
        <span className="text-xs hidden sm:inline">
          {isAnyPlaying ? "Playing" : "Ambient"}
        </span>
      </button>

      {expanded && (
        <div className="absolute bottom-full left-0 mb-2 w-64 py-4 px-4 bg-dc-surface/90 backdrop-blur-xl border border-dc-border/60 rounded-xl shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-dc-text/40">Ambient Sound</p>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={masterVolume}
              onChange={handleMasterVolumeChange}
              className="w-20 h-1 accent-dc-accent bg-white/10 rounded-full appearance-none cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            {TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => handleChannelToggle(track.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  channelStates[track.id]
                    ? "bg-dc-accent/15 text-dc-accent"
                    : "text-dc-text/60 hover:bg-dc-surface/60 hover:text-dc-text"
                }`}
              >
                <span className="text-base w-6 text-center">{track.emoji}</span>
                <span className="text-xs font-medium">{track.label}</span>
                {channelStates[track.id] && (
                  <span className="ml-auto text-[10px] text-dc-accent/60">ON</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

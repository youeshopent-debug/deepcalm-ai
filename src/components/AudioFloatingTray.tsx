"use client"

import { useTheme } from "@/context/ThemeContext";
import { audioEngine, type ChannelId, type BinauralType } from "@/lib/audioEngine";
import { Music, Volume2, Headphones } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TRACKS: { id: ChannelId; label: string; emoji: string }[] = [
  { id: "rain", label: "Rain", emoji: "🌧" },
  { id: "wind", label: "Wind", emoji: "💨" },
  { id: "stream", label: "Stream", emoji: "🌊" },
  { id: "birds", label: "Birds", emoji: "🐦" },
  { id: "fire", label: "Fire", emoji: "🔥" },
  { id: "insects", label: "Insects", emoji: "🦗" },
]

const BINAURAL_TYPES: { type: BinauralType; label: string; emoji: string; description: string }[] = [
  { type: 'delta',  label: 'Delta',  emoji: '🧠', description: 'Deep Sleep 3Hz' },
  { type: 'theta',  label: 'Theta',  emoji: '🧘', description: 'Meditation 6Hz' },
  { type: 'alpha',  label: 'Alpha',  emoji: '🌊', description: 'Relaxation 10Hz' },
  { type: 'beta',   label: 'Beta',   emoji: '⚡',  description: 'Alertness 18Hz' },
  { type: 'gamma',  label: 'Gamma',  emoji: '💎',  description: 'Peak Cognition 40Hz' },
]

export default function AudioFloatingTray() {
  const [expanded, setExpanded] = useState(false)
  const [channelStates, setChannelStates] = useState<Record<ChannelId, boolean>>(
    { rain: false, wind: false, fire: false, stream: false, birds: false, insects: false }
  )
  const [binauralMode, setBinauralMode] = useState(false)
  const [activeBinauralType, setActiveBinauralType] = useState<BinauralType | null>(null)
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
    audioEngine.init()
    // If binaural is active, stop it first (mutual exclusion)
    if (audioEngine.isBinauralActive()) {
      audioEngine.stopBinaural()
      setBinauralMode(false)
      setActiveBinauralType(null)
    }
    const next = !channelStates[id]
    setChannelStates((prev) => ({ ...prev, [id]: next }))
    audioEngine.toggleChannel(id, next)
  }

  function handleBinauralToggle(type: BinauralType) {
    audioEngine.init()
    if (activeBinauralType === type) {
      // Toggle off
      audioEngine.stopBinaural()
      setBinauralMode(false)
      setActiveBinauralType(null)
    } else {
      // Stop all ambient channels first
      setChannelStates({
        rain: false, wind: false, fire: false,
        stream: false, birds: false, insects: false,
      })
      audioEngine.startBinaural(type)
      setBinauralMode(true)
      setActiveBinauralType(type)
    }
  }

  function handleMasterVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    audioEngine.init()
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
        {binauralMode ? (
          <Headphones className="w-4 h-4 text-purple-400" />
        ) : isAnyPlaying ? (
          <Volume2 className="w-4 h-4 text-dc-accent" />
        ) : (
          <Music className="w-4 h-4" />
        )}
        <span className="text-xs hidden sm:inline">
          {binauralMode ? "3D Sound" : isAnyPlaying ? "Playing" : "Ambient"}
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

          {/* Divider */}
          <div className="my-3 border-t border-dc-border/30" />

          {/* Binaural Section */}
          <div>
            <p className="text-xs text-dc-text/40 mb-2">3D Sound · Binaural Beats</p>
            <div className="space-y-1">
              {BINAURAL_TYPES.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleBinauralToggle(item.type)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeBinauralType === item.type
                      ? "bg-purple-500/15 text-purple-400"
                      : "text-dc-text/60 hover:bg-dc-surface/60 hover:text-dc-text"
                  }`}
                >
                  <span className="text-base w-6 text-center">{item.emoji}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                  <span className="ml-auto text-[10px] text-dc-text/40">{item.description}</span>
                  {activeBinauralType === item.type && (
                    <span className="text-[10px] text-purple-400/60">ON</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

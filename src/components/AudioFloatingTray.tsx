"use client"

import { useLanguage } from "@/context/LanguageContext";
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
  const { locale } = useLanguage()

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
  const label = locale === "zh"
    ? binauralMode ? "3D 音效" : isAnyPlaying ? "播放中" : "环境音"
    : binauralMode ? "3D Sound" : isAnyPlaying ? "Playing" : "Ambient"

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
    <div ref={trayRef} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 sm:bottom-6 sm:left-6 z-[100]">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="flex min-h-11 items-center gap-2 rounded-xl border border-[#91b9ab] bg-[#132723] px-3 py-2 text-[#f4faf6] shadow-lg transition-colors hover:bg-[#25443a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2f4df]"
      >
        {binauralMode ? (
          <Headphones className="w-4 h-4 text-[#ead9ff]" />
        ) : isAnyPlaying ? (
          <Volume2 className="w-4 h-4 text-[#c2f4df]" />
        ) : (
          <Music className="w-4 h-4" />
        )}
        <span className="text-sm font-semibold">
          {label}
        </span>
      </button>

      {expanded && (
        <div className="absolute bottom-full left-0 mb-2 w-64 max-w-[calc(100vw-1.5rem)] max-h-[min(70dvh,32rem)] overflow-y-auto p-4 bg-[#132723] border border-[#91b9ab] rounded-xl shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#d6e8df]">Ambient Sound</p>
            <input
              type="range"
              aria-label={locale === "zh" ? "音量" : "Volume"}
              min={0}
              max={1}
              step={0.01}
              value={masterVolume}
              onChange={handleMasterVolumeChange}
              className="w-20 h-1 accent-[#c2f4df] bg-[#53746b] rounded-full appearance-none cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            {TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => handleChannelToggle(track.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  channelStates[track.id]
                    ? "bg-[#25443a] text-[#c2f4df]"
                    : "text-[#f4faf6] hover:bg-[#203b33]"
                }`}
              >
                <span className="text-base w-6 text-center">{track.emoji}</span>
                <span className="text-xs font-medium">{track.label}</span>
                {channelStates[track.id] && (
                  <span className="ml-auto text-[10px] text-[#c2f4df]">ON</span>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-[#53746b]" />

          {/* Binaural Section */}
          <div>
            <p className="text-xs text-[#d6e8df] mb-2">3D Sound · Binaural Beats</p>
            <div className="space-y-1">
              {BINAURAL_TYPES.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleBinauralToggle(item.type)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeBinauralType === item.type
                      ? "bg-purple-500/15 text-[#ead9ff]"
                      : "text-[#f4faf6] hover:bg-[#203b33]"
                  }`}
                >
                  <span className="text-base w-6 text-center">{item.emoji}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                  <span className="ml-auto text-[10px] text-[#d6e8df]">{item.description}</span>
                  {activeBinauralType === item.type && (
                    <span className="text-[10px] text-[#ead9ff]">ON</span>
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

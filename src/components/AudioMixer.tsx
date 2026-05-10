'use client'

import { useState, useEffect, useCallback } from 'react'
import { Volume2, CloudRain, Wind, Flame, Droplets, Bird, X } from 'lucide-react'
import { audioEngine, type ChannelId } from '@/lib/audioEngine'
import { useLanguage } from '@/context/LanguageContext'

const TRACKS: { id: ChannelId; icon: React.ElementType; labelKey: string; color: string }[] = [
  { id: 'rain', icon: CloudRain, labelKey: 'audio.rain', color: 'rgba(120,180,255,0.7)' },
  { id: 'wind', icon: Wind, labelKey: 'audio.wind', color: 'rgba(180,220,200,0.7)' },
  { id: 'fire', icon: Flame, labelKey: 'audio.fire', color: 'rgba(255,160,80,0.7)' },
  { id: 'stream', icon: Droplets, labelKey: 'audio.stream', color: 'rgba(100,200,220,0.7)' },
  { id: 'birds', icon: Bird, labelKey: 'audio.birds', color: 'rgba(200,180,120,0.7)' },
]

export default function AudioMixer() {
  const { tt } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState<Set<ChannelId>>(new Set())
  const [volume, setVolume] = useState(0.6)

  useEffect(() => {
    audioEngine.init()
    const v = audioEngine.volume
    setVolume(v)
  }, [])

  const toggle = useCallback((id: ChannelId) => {
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

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    audioEngine.setMasterVolume(v)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {expanded && (
        <div className="glass p-3 rounded-2xl flex flex-col gap-2 min-w-[180px] backdrop-blur-xl bg-black/30 transition-all duration-300">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs text-white/50">Audio Mixer</span>
            <button onClick={() => setExpanded(false)} className="text-white/40 hover:text-white/70 transition-colors">
              <X size={14} />
            </button>
          </div>
          {TRACKS.map(({ id, icon: Icon, labelKey, color }) => {
            const isOn = active.has(id)
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/10"
                style={isOn ? { backgroundColor: color + '20' } : {}}
              >
                <Icon size={16} style={{ color: isOn ? color : 'rgba(255,255,255,0.4)' }} />
                <span className="text-sm flex-1 text-left" style={{ color: isOn ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)' }}>
                  {tt(labelKey)}
                </span>
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isOn ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundColor: color, boxShadow: isOn ? `0 0 6px ${color}` : 'none' }} />
              </button>
            )
          })}
          <div className="flex items-center gap-2 px-3 mt-1">
            <Volume2 size={14} className="text-white/40" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolume}
              className="flex-1 h-1 accent-white/60"
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setExpanded(v => !v)}
        className="glass w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl bg-black/30 hover:bg-black/50 transition-all duration-300 group"
      >
        <span className="relative flex items-center justify-center">
          <Volume2 size={20} className="text-white/50 group-hover:text-white/80 transition-colors duration-300" />
          {active.size > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: TRACKS.find(t => active.has(t.id))?.color || 'white' }} />
          )}
        </span>
      </button>
    </div>
  )
}

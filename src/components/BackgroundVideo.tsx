"use client"

import { useEffect, useState } from "react";

interface Props {
  src: string
  overlayOpacity?: number
  enabled?: boolean
}

export default function BackgroundVideo({ src, overlayOpacity = 0.55, enabled = true }: Props) {
  const [mounted, setMounted] = useState(false)
  const [activated, setActivated] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!enabled) return null

  useEffect(() => {
    setMounted(true)

    const activate = () => setActivated(true)
    window.addEventListener("pointerdown", activate, { once: true })
    window.addEventListener("keydown", activate, { once: true })

    return () => {
      window.removeEventListener("pointerdown", activate)
      window.removeEventListener("keydown", activate)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {mounted && activated && (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onCanPlay={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: `rgba(10,10,18,${overlayOpacity})` }}
      />
    </div>
  )
}

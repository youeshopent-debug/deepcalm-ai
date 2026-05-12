"use client"

import { useRef, useEffect, useState } from "react"

interface Props {
  src: string
  overlayOpacity?: number
  enabled?: boolean
}

export default function BackgroundVideo({ src, overlayOpacity = 0.55, enabled = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!enabled || !videoRef.current) return
    videoRef.current.play().catch(() => {})
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: `rgba(10,10,18,${overlayOpacity})` }}
      />
    </div>
  )
}

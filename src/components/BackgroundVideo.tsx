"use client"

import { useRef, useState } from "react";

interface Props {
  src: string
  overlayOpacity?: number
  enabled?: boolean
}

export default function BackgroundVideo({ src, overlayOpacity = 0.55, enabled = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  if (!enabled) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: `rgba(10,10,18,${overlayOpacity})` }}
      />
    </div>
  )
}

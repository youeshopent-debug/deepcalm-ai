"use client"

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0f1729]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,180,255,0.03),transparent_70%)] animate-breath-orb-4-7" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-dc-accent/[0.015] via-dc-accent/[0.008] to-transparent rounded-full animate-aurora-drift" />

      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-dc-accent/[0.02] via-dc-accent/[0.008] to-transparent" />

      <div className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={`p-${i}`}
            className="absolute w-1 h-1 bg-dc-accent/30 rounded-full animate-float-particle"
            style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${12 + Math.random() * 10}s`,
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-[5%] left-0 right-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`w-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-dc-accent/[0.04] to-transparent"
            style={{
              left: `${10 + i * 20}%`,
              right: `${10 + i * 20}%`,
              bottom: `${i * 8}px`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-[8%] left-[15%] right-[15%] h-[120px] opacity-[0.015]">
        <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 Q50,20 100,60 T200,60 T300,60 T400,60"
            fill="none"
            stroke="rgba(126,184,255,0.3)"
            strokeWidth="0.5"
            className="animate-stream-glow"
          />
          <path
            d="M0,70 Q60,30 120,70 T240,70 T360,70 T400,70"
            fill="none"
            stroke="rgba(126,184,255,0.15)"
            strokeWidth="0.3"
            className="animate-stream-glow"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`l-${i}`}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-dc-accent/10 to-transparent rounded-full animate-leaf-sway"
          style={{
            left: `${5 + i * 18}%`,
            bottom: `${20 + Math.random() * 30}%`,
            width: `${20 + Math.random() * 40}px`,
            opacity: 0.08,
            animationDelay: `${i * 2}s`,
            animationDuration: `${10 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  )
}

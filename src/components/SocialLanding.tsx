"use client"

import socialDict from "@/public/locales/social-en.json";
import { ArrowRight, Brain, Clock, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const models = [
  { name: "GPT-4o", color: "from-teal-400 to-emerald-500" },
  { name: "Claude 4", color: "from-orange-400 to-rose-500" },
  { name: "DeepSeek V3", color: "from-blue-400 to-indigo-500" },
  { name: "Gemini 2.0", color: "from-blue-400 to-purple-500" },
  { name: "Llama 4", color: "from-purple-400 to-pink-500" },
  { name: "Claude 3.5", color: "from-orange-400 to-red-500" },
]

const flowSteps = [
  { icon: Brain, label: "Smart Intent Detection" },
  { icon: Zap, label: "Model Routing" },
  { icon: Clock, label: "Parallel Analysis" },
  { icon: Shield, label: "Unified Response" },
]

export default function SocialLanding() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const s = socialDict.social

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white overflow-x-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 18}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(126,184,255,0.15) 0%, transparent 60%)`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 mb-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {s.hook_badge}
          </div>

          {/* Hook Title */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              {s.hook_title}
            </span>
          </h1>

          {/* Hook Subtitle */}
          <p
            className={`text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {s.hook_subtitle}
          </p>

          {/* Stats Row */}
          <div
            className={`grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto mb-12 transition-all duration-1000 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {s.hook_stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-800 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <a
              href="#tech-section"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-[#0A0E1A] font-semibold text-base hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              {s.cta_primary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/en#sleep-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-600 text-slate-300 font-medium text-base hover:border-slate-500 hover:bg-slate-800/30 transition-all duration-300"
            >
              {s.cta_secondary}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-slate-500 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Tech Architecture Section */}
      <section id="tech-section" className="relative py-20 sm:py-32 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(126,184,255,0.08) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {s.tech_title}
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              {s.tech_subtitle}
            </p>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {models.map((m, i) => (
              <div
                key={m.name}
                className="relative group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-sm" />
                <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all duration-300">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center mx-auto mb-2 text-sm font-bold text-white`}>
                    {m.name[0]}
                  </div>
                  <div className="text-xs font-medium text-slate-300">{m.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Flow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-16">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="glass-card bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 text-center min-w-[140px]">
                  <step.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm font-medium text-slate-200">{step.label}</div>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="hidden md:block px-3">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Clinical Results */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">
              {s.clinical_title}
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              <div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {s.clinical_data1}
                </div>
                <div className="text-sm text-slate-400">{s.clinical_data1_desc}</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-700" />
              <div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                  {s.clinical_data2}
                </div>
                <div className="text-sm text-slate-400">{s.clinical_data2_desc}</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6">{s.clinical_note}</p>
          </div>
        </div>
      </section>

      {/* Sanctuary CTA Section */}
      <section className="relative py-20 sm:py-32 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, rgba(126,184,255,0.12) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🌙</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {s.sanctuary_title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            {s.sanctuary_desc}
          </p>

          <a
            href="/en"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-[#0A0E1A] font-bold text-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
          >
            {s.cta_primary}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Hashtags */}
          <div className="mt-12 text-sm text-slate-500 leading-relaxed">
            {s.hashtags}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center text-xs text-slate-600">
          <div className="mb-2">
            <span className="text-slate-400 font-medium">DeepCalm AI</span> · Midnight Sanctuary
          </div>
          <div>
            <a href="/en/privacy" className="hover:text-slate-400 transition-colors">Privacy</a>
            {" · "}
            <a href="/en/terms" className="hover:text-slate-400 transition-colors">Terms</a>
            {" · "}
            <a href="/en/about" className="hover:text-slate-400 transition-colors">About</a>
          </div>
          <div className="mt-2">© 2026 DeepCalm AI. All rights reserved.</div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-particle {
          0% { transform: translateY(100vh) translateX(0) scale(0.8); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-10vh) translateX(30px) scale(1.2); opacity: 0; }
        }
        .animate-float-particle {
          animation: float-particle 18s linear infinite;
        }
      `}</style>
    </div>
  )
}

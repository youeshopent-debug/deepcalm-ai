"use client"

import { useEffect, useState } from "react"

const models = [
  { name: "GPT-4o-mini", provider: "OpenAI", params: "~8B", color: "from-teal-400 to-emerald-500" },
  { name: "DeepSeek-Chat/V3", provider: "DeepSeek", params: "~671B MoE", color: "from-blue-400 to-indigo-500" },
  { name: "GPT-4o", provider: "OpenAI", params: "~1.8T MoE", color: "from-teal-400 to-emerald-500" },
  { name: "Claude Sonnet 4", provider: "Anthropic", params: "undisclosed", color: "from-orange-400 to-rose-500" },
  { name: "Claude 3.5 Haiku", provider: "Anthropic", params: "undisclosed", color: "from-orange-400 to-rose-500" },
  { name: "Gemini 2.0 Flash", provider: "Google", params: "undisclosed", color: "from-blue-400 to-purple-500" },
  { name: "Llama 4 Maverick", provider: "Meta", params: "~17B MoE", color: "from-purple-400 to-pink-500" },
  { name: "Llama 4 Scout", provider: "Meta", params: "~17B-16E", color: "from-purple-400 to-pink-500" },
]

const flowSteps = [
  { num: 1, icon: "💬" },
  { num: 2, icon: "🔀" },
  { num: 3, icon: "📊" },
  { num: 4, icon: "💚" },
]

export default function TechArchSection({ dict }: { dict: any }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const a = dict.about

  return (
    <section className="relative py-20 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full animate-breathing-halo"
          style={{
            background: "radial-gradient(circle, rgba(126,184,255,0.08) 0%, rgba(106,90,205,0.05) 40%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title + Subtitle */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-dc-text mb-4">{a.tech_arch_title}</h2>
          <p className="text-base sm:text-lg text-dc-muted leading-relaxed max-w-3xl mx-auto">{a.tech_arch_subtitle}</p>
        </div>

        {/* Model Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {models.map((m, i) => (
              <div
                key={m.name}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* breathing light backdrop */}
                <div className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-full h-full rounded-xl animate-breathing-halo"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(126,184,255,0.15) 0%, transparent 70%)`,
                      filter: "blur(6px)",
                    }}
                  />
                </div>
                <div className="relative glass rounded-xl p-4 h-full flex flex-col">
                  {/* Provider icon */}
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold mb-3`}>
                    {m.provider[0]}
                  </div>
                  {/* Model name */}
                  <div className="text-sm sm:text-base font-semibold text-dc-text mb-0.5">{m.name}</div>
                  {/* Provider */}
                  <div className="text-xs text-dc-muted mb-2">{m.provider}</div>
                  {/* Params */}
                  <div className="text-[10px] sm:text-xs text-dc-muted/60 mb-3 font-mono">{m.params}</div>
                  {/* Scene */}
                  <div className="mt-auto">
                    <span className="inline-block text-[11px] sm:text-xs text-dc-accent bg-dc-accent-soft px-2.5 py-1 rounded-full leading-tight">
                      {a.tech_arch_model_scenes[i]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Diagram */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
            {flowSteps.map((step, i) => (
              <div key={step.num} className="flex-1 w-full">
                <div className="glass rounded-xl p-5 text-center">
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <div className="w-7 h-7 rounded-full bg-dc-accent/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xs font-bold text-dc-accent">{step.num}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-dc-text mb-2">
                    {a[`tech_arch_flow_step${step.num}_title`]}
                  </h3>
                  <p className="text-xs text-dc-muted leading-relaxed">
                    {a[`tech_arch_flow_step${step.num}_desc`]}
                  </p>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="hidden md:flex justify-center py-2">
                    <span className="text-dc-accent/40 text-2xl">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Highlights */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 transition-all duration-1000 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg">🛡️</span>
              <h3 className="text-base sm:text-lg font-semibold text-dc-text">{a.tech_arch_highlight1_title}</h3>
            </div>
            <p className="text-sm text-dc-muted leading-relaxed">{a.tech_arch_highlight1_desc}</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg">🔒</span>
              <h3 className="text-base sm:text-lg font-semibold text-dc-text">{a.tech_arch_highlight2_title}</h3>
            </div>
            <p className="text-sm text-dc-muted leading-relaxed">{a.tech_arch_highlight2_desc}</p>
          </div>
        </div>

        {/* Clinical Data */}
        <div className={`transition-all duration-1000 delay-800 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="glass rounded-xl p-8 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-dc-text mb-6">{a.tech_arch_clinical_title}</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-4">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-dc-accent mb-1">{a.tech_arch_clinical_data1}</div>
                <div className="text-sm text-dc-muted">{a.tech_arch_clinical_data1_desc}</div>
              </div>
              <div className="w-px h-12 bg-dc-border hidden sm:block" />
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-dc-success mb-1">{a.tech_arch_clinical_data2}</div>
                <div className="text-sm text-dc-muted">{a.tech_arch_clinical_data2_desc}</div>
              </div>
            </div>
            <p className="text-xs text-dc-muted/60 mt-4">{a.tech_arch_clinical_note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 冥想脚本引擎（客户端版）
 *
 * 架构变更说明（Vercel → Cloudflare Pages 迁移）：
 * - 原为 Next.js Server Action（"use server"），不支持 static export
 * - 改为先调用 Cloudflare Function (/api/meditation-script)
 * - 网络不可用时降级到本地硬编码模板（FALLBACK_SCRIPTS）
 *
 * 调用链: MeditationController → generateMeditationScript()
 *   → fetch(/api/meditation-script) → Cloudflare Function → LLM
 *   → 失败 → getFallbackScript() (本地模板)
 */

import type { Locale } from "@/types"

/* ── Types ── */

export interface MeditationInput {
  emotion?: string
  topicSlug?: string
  locale: Locale
  duration?: "short" | "medium" | "long"
}

export interface MeditationLine {
  text: string
  startAt: number
  breathInstruction?: "inhale" | "hold" | "exhale" | "neutral"
  durationSec: number
}

export type VisualTheme = "forest" | "twilight" | "deepsea" | "starry"

export interface MeditationScript {
  lines: MeditationLine[]
  visualTheme: VisualTheme
  audioPreset: string
  totalSeconds: number
  title: string
}

/* ── Duration mapping ── */

const DURATION_MAP: Record<string, number> = {
  short: 180,
  medium: 300,
  long: 480,
}

/* ── Theme extraction from topic/category ── */

const TOPIC_THEME_MAP: Record<string, VisualTheme> = {
  insomnia: "deepsea",
  "deep-sleep": "deepsea",
  "sleep-anxiety": "twilight",
  nightmare: "twilight",
  "circadian-rhythm": "starry",
  "sleep-hygiene": "forest",
  anxiety: "forest",
  workplace_burnout: "twilight",
  public_speaking: "forest",
  student_exam: "starry",
  grief_loss: "deepsea",
  loneliness: "starry",
  self_worth: "forest",
  mindfulness: "forest",
  emotional_health: "twilight",
}

function inferTheme(input: MeditationInput): VisualTheme {
  if (input.topicSlug && TOPIC_THEME_MAP[input.topicSlug]) {
    return TOPIC_THEME_MAP[input.topicSlug]
  }
  const emotion = (input.emotion || "").toLowerCase()
  if (/焦虑|stress|anxious|stressed|不安|紧张/.test(emotion)) return "forest"
  if (/失眠|insomnia|sleep|tired|疲|困|眠/.test(emotion)) return "deepsea"
  if (/悲伤|sad|grief|depress|孤独|lonely|loss/.test(emotion)) return "starry"
  if (/愤怒|angry|frustrat|烦躁|irritat/.test(emotion)) return "twilight"
  return "forest"
}

/* ── Fallback script templates ── */

const FALLBACK_SCRIPTS: Partial<Record<Locale, MeditationScript[]>> = {
  zh: [
    {
      title: "月光下的呼吸",
      lines: [
        { text: "找一个舒服的姿势坐好……或者躺下……让身体完全被支撑着……", startAt: 0, breathInstruction: "inhale", durationSec: 15 },
        { text: "轻轻地闭上眼睛……", startAt: 15, breathInstruction: "hold", durationSec: 10 },
        { text: "慢慢地呼出一口气……让今天的疲惫随着呼吸离开……", startAt: 25, breathInstruction: "exhale", durationSec: 12 },
        { text: "现在，把注意力轻轻地放在呼吸上……不需要改变什么……只是感受气息自然地流入、流出……", startAt: 37, breathInstruction: "inhale", durationSec: 20 },
        { text: "想象你正站在一片安静的湖边……湖水如镜面般平静……月光洒在水面上……", startAt: 57, breathInstruction: "neutral", durationSec: 22 },
        { text: "每一次吸气……月光照亮湖面……每一次呼气……湖面泛起微微的涟漪……", startAt: 79, breathInstruction: "inhale", durationSec: 20 },
        { text: "水波轻轻地向外扩散……然后又归于平静……就像你内心的感受……来了……又走了……", startAt: 99, breathInstruction: "exhale", durationSec: 22 },
        { text: "你不需要抓住任何念头……也不需要推开任何情绪……只是看着它们……像看云飘过天空……", startAt: 121, breathInstruction: "neutral", durationSec: 25 },
        { text: "在这一刻……你什么都不需要做……什么都不需要成为……只需要在这里……安静地呼吸……", startAt: 146, breathInstruction: "hold", durationSec: 25 },
        { text: "现在……感受你的身体……它一直在支持着你……从脚底到头顶……每一寸都在替你承担……", startAt: 171, breathInstruction: "inhale", durationSec: 22 },
        { text: "慢慢地把注意力带回房间……感受空气在皮肤上的温度……", startAt: 193, breathInstruction: "exhale", durationSec: 18 },
        { text: "轻轻地动一下你的手指……动一下你的脚趾……", startAt: 211, breathInstruction: "neutral", durationSec: 15 },
        { text: "当你准备好了……可以慢慢地睁开眼睛……带着这份平静……回到此刻……", startAt: 226, breathInstruction: "inhale", durationSec: 14 },
      ],
      visualTheme: "forest",
      audioPreset: "relaxation",
      totalSeconds: 240,
    },
    {
      title: "深海的安宁",
      lines: [
        { text: "找一个安静的角落……让自己安顿下来……", startAt: 0, breathInstruction: "inhale", durationSec: 12 },
        { text: "闭上眼睛……仿佛沉入一片温暖的海水……", startAt: 12, breathInstruction: "hold", durationSec: 10 },
        { text: "慢慢呼出……让紧张像气泡一样浮上水面……消散……", startAt: 22, breathInstruction: "exhale", durationSec: 13 },
        { text: "想象你正悬浮在深海中……四周是温柔的蓝色……没有声音……只有无尽的宁静……", startAt: 35, breathInstruction: "inhale", durationSec: 22 },
        { text: "每一次吸气……你沉得更深一些……进入更安静的层次……", startAt: 57, breathInstruction: "inhale", durationSec: 18 },
        { text: "每一次呼气……你融化在水的怀抱里……所有的重力都消失了……", startAt: 75, breathInstruction: "exhale", durationSec: 18 },
        { text: "在这个深度……没有过去……没有未来……只有此刻……静止而完整……", startAt: 93, breathInstruction: "hold", durationSec: 25 },
        { text: "你的思绪像海中的鱼一样游过……你只是看着它们……不跟随……不评判……", startAt: 118, breathInstruction: "neutral", durationSec: 25 },
        { text: "海洋的深处有一种古老的平静……你也拥有这种平静……它一直在你之内……", startAt: 143, breathInstruction: "inhale", durationSec: 22 },
        { text: "现在……慢慢地上浮……感受水温柔地流过你的皮肤……", startAt: 165, breathInstruction: "exhale", durationSec: 20 },
        { text: "感受到光线越来越亮……你离水面越来越近……", startAt: 185, breathInstruction: "neutral", durationSec: 18 },
        { text: "轻轻地动一下手指和脚趾……感受身体回到了房间……", startAt: 203, breathInstruction: "inhale", durationSec: 15 },
        { text: "当你准备好了……慢慢地睁开眼睛……带着深海般的平静……", startAt: 218, breathInstruction: "exhale", durationSec: 12 },
      ],
      visualTheme: "deepsea",
      audioPreset: "deep_sleep",
      totalSeconds: 230,
    },
    {
      title: "森林的拥抱",
      lines: [
        { text: "找一个让你感到安全的位置……坐下或躺下……", startAt: 0, breathInstruction: "inhale", durationSec: 12 },
        { text: "轻轻闭上眼睛……像关上一扇通往安静的窗……", startAt: 12, breathInstruction: "hold", durationSec: 10 },
        { text: "长长地呼出一口气……让今天的故事……暂时放在一边……", startAt: 22, breathInstruction: "exhale", durationSec: 13 },
        { text: "想象你走进一片古老的森林……阳光透过树叶洒下斑驳的光影……脚下是松软的苔藓……", startAt: 35, breathInstruction: "inhale", durationSec: 22 },
        { text: "空气中弥漫着松木和泥土的气息……清凉而干净……", startAt: 57, breathInstruction: "neutral", durationSec: 18 },
        { text: "你听到风穿过树叶的声音……沙沙的……像大自然在轻声细语……", startAt: 75, breathInstruction: "exhale", durationSec: 20 },
        { text: "你找到一棵古老的大树……靠在它的树干上……感受它稳稳地支撑着你……", startAt: 95, breathInstruction: "hold", durationSec: 22 },
        { text: "这棵树已经在这里站立了很多年……经历了无数风雨……依然稳稳地扎根在大地上……", startAt: 117, breathInstruction: "neutral", durationSec: 22 },
        { text: "就像这棵树一样……你也有自己的根基……无论外界如何变化……你内在的平静从未离开……", startAt: 139, breathInstruction: "inhale", durationSec: 25 },
        { text: "每一次呼吸……你都与这棵树连接……与大地连接……与生命本身连接……", startAt: 164, breathInstruction: "inhale", durationSec: 20 },
        { text: "现在……感谢这片森林……感谢这棵树……然后慢慢转身……沿着来路走回……", startAt: 184, breathInstruction: "exhale", durationSec: 20 },
        { text: "感受到阳光重新照在脸上……听到周围日常的声音……", startAt: 204, breathInstruction: "neutral", durationSec: 18 },
        { text: "轻轻动一下你的手指和脚趾……感受身体……然后……慢慢睁开眼睛……", startAt: 222, breathInstruction: "inhale", durationSec: 15 },
      ],
      visualTheme: "forest",
      audioPreset: "relaxation",
      totalSeconds: 237,
    },
  ],
  en: [
    {
      title: "Breath of Moonlight",
      lines: [
        { text: "Find a comfortable position… sitting or lying down… let your body be fully supported…", startAt: 0, breathInstruction: "inhale", durationSec: 15 },
        { text: "Gently close your eyes…", startAt: 15, breathInstruction: "hold", durationSec: 10 },
        { text: "Slowly exhale… let the weight of today drift away with your breath…", startAt: 25, breathInstruction: "exhale", durationSec: 12 },
        { text: "Bring your attention lightly to your breath… no need to change anything… just feel it flowing naturally…", startAt: 37, breathInstruction: "inhale", durationSec: 20 },
        { text: "Imagine standing by a quiet lake… the water is like a mirror… moonlight softly touching the surface…", startAt: 57, breathInstruction: "neutral", durationSec: 22 },
        { text: "With each inhale… the moonlight brightens the water… with each exhale… gentle ripples spread outward…", startAt: 79, breathInstruction: "inhale", durationSec: 20 },
        { text: "The ripples slowly fade… and the water returns to stillness… just like your thoughts… they come… and they go…", startAt: 99, breathInstruction: "exhale", durationSec: 22 },
        { text: "You don't need to hold onto any thought… nor push any feeling away… just watch them… like clouds passing across the sky…", startAt: 121, breathInstruction: "neutral", durationSec: 25 },
        { text: "In this moment… you don't need to do anything… you don't need to be anything… just be here… breathing quietly…", startAt: 146, breathInstruction: "hold", durationSec: 25 },
        { text: "Now… feel your body… it has been supporting you all along… from your feet to the crown of your head…", startAt: 171, breathInstruction: "inhale", durationSec: 22 },
        { text: "Slowly bring your awareness back to the room… feel the temperature of the air on your skin…", startAt: 193, breathInstruction: "exhale", durationSec: 18 },
        { text: "Gently wiggle your fingers… wiggle your toes…", startAt: 211, breathInstruction: "neutral", durationSec: 15 },
        { text: "When you feel ready… slowly open your eyes… carrying this stillness with you…", startAt: 226, breathInstruction: "inhale", durationSec: 14 },
      ],
      visualTheme: "forest",
      audioPreset: "relaxation",
      totalSeconds: 240,
    },
    {
      title: "Ocean Deep Calm",
      lines: [
        { text: "Find a quiet corner… and settle in…", startAt: 0, breathInstruction: "inhale", durationSec: 12 },
        { text: "Close your eyes… as if sinking into warm ocean water…", startAt: 12, breathInstruction: "hold", durationSec: 10 },
        { text: "Exhale slowly… let tension float up like bubbles… dissolving…", startAt: 22, breathInstruction: "exhale", durationSec: 13 },
        { text: "Imagine floating in deep ocean… surrounded by gentle blue… no sound… only infinite stillness…", startAt: 35, breathInstruction: "inhale", durationSec: 22 },
        { text: "With each breath… you sink deeper… into quieter layers…", startAt: 57, breathInstruction: "inhale", durationSec: 18 },
        { text: "With each exhale… you melt into the water's embrace… all weight disappears…", startAt: 75, breathInstruction: "exhale", durationSec: 18 },
        { text: "At this depth… there is no past… no future… only this moment… still and complete…", startAt: 93, breathInstruction: "hold", durationSec: 25 },
        { text: "Your thoughts swim by like fish in the deep… you simply watch them… without following… without judging…", startAt: 118, breathInstruction: "neutral", durationSec: 25 },
        { text: "The deep ocean holds an ancient stillness… and you carry that same stillness within you…", startAt: 143, breathInstruction: "inhale", durationSec: 22 },
        { text: "Now… slowly rise back up… feel the water gently flowing past your skin…", startAt: 165, breathInstruction: "exhale", durationSec: 20 },
        { text: "The light grows brighter… you're nearing the surface…", startAt: 185, breathInstruction: "neutral", durationSec: 18 },
        { text: "Gently move your fingers and toes… feel your body back in the room…", startAt: 203, breathInstruction: "inhale", durationSec: 15 },
        { text: "When you're ready… slowly open your eyes… carrying the deep calm with you…", startAt: 218, breathInstruction: "exhale", durationSec: 12 },
      ],
      visualTheme: "deepsea",
      audioPreset: "deep_sleep",
      totalSeconds: 230,
    },
  ],
}

function getFallbackScript(input: MeditationInput): MeditationScript {
  const scripts = FALLBACK_SCRIPTS[input.locale] || FALLBACK_SCRIPTS.en || FALLBACK_SCRIPTS.zh!
  if (!scripts) {
    return {
      title: "Simple Breath",
      lines: [
        { text: "Sit comfortably… close your eyes…", startAt: 0, breathInstruction: "inhale", durationSec: 15 },
        { text: "Hold…", startAt: 15, breathInstruction: "hold", durationSec: 10 },
        { text: "Exhale slowly…", startAt: 25, breathInstruction: "exhale", durationSec: 12 },
        { text: "Breathe naturally… feel the air…", startAt: 37, breathInstruction: "neutral", durationSec: 20 },
        { text: "When ready… open your eyes…", startAt: 57, breathInstruction: "inhale", durationSec: 14 },
      ],
      visualTheme: "forest",
      audioPreset: "relaxation",
      totalSeconds: 71,
    }
  }
  const theme = inferTheme(input)
  const matched = scripts.find((s) => s.visualTheme === theme)
  if (matched) return { ...matched, lines: [...matched.lines] }
  return { ...scripts[0], lines: [...scripts[0].lines] }
}

/* ── Public entry point ── */

export async function generateMeditationScript(input: MeditationInput): Promise<{
  script: MeditationScript
  usage: { model: string; inputTokens: number; outputTokens: number; cost: number }
}> {
  // 优先调用 Cloudflare Function
  try {
    const res = await fetch("/api/meditation-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(15000), // 15s timeout
    })
    if (res.ok) {
      const data = await res.json()
      if (data.script && data.script.lines && data.script.lines.length >= 5) {
        return {
          script: data.script,
          usage: data.usage || { model: "cf-function", inputTokens: 0, outputTokens: 0, cost: 0 },
        }
      }
    }
    console.warn("Meditation API returned invalid response, falling back to local template")
  } catch (err) {
    console.warn("Meditation API call failed, using offline fallback:", (err as Error).message)
  }

  // 降级：本地模板
  return {
    script: getFallbackScript(input),
    usage: { model: "fallback-template", inputTokens: 0, outputTokens: 0, cost: 0 },
  }
}

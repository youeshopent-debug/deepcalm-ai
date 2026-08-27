"use client"

import { motion } from "framer-motion"

/**
 * TopicIcon — 微缩 SVG 动画图标
 *
 * 为 Midnight Wisdom Library 的每个话题卡片渲染专属动画图标。
 * 按 9 大类别映射不同的视觉隐喻与动画：
 *   - sleep            → 月亮与迷雾（呼吸漂浮）
 *   - anxiety          → 心跳波纹（脉动）
 *   - grief_loss       → 雨滴（下落涟漪）
 *   - loneliness       → 涟漪（扩散）
 *   - self_worth       → 星光（闪烁）
 *   - relationships    → 双心（同步跳动）
 *   - identity         → 面具（漂浮）
 *   - mindfulness      → 呼吸光晕（缩放呼吸）
 *   - emotional_health → 脉冲（波形）
 *
 * 纯内联 SVG + framer-motion，无外部资源，SSG 兼容。
 */

interface TopicIconProps {
  category: string
  className?: string
}

const DEFAULT_COLOR = "#a5b4fc" // indigo-300
const DEFAULT_GLOW = "rgba(165,180,252,0.35)"

/** 每个类别的主题色（用于 SVG stroke/fill） */
const CATEGORY_COLOR: Record<string, string> = {
  sleep: "#a5b4fc", // indigo
  anxiety: "#fda4af", // rose
  grief_loss: "#94a3b8", // slate
  loneliness: "#7dd3fc", // sky
  self_worth: "#6ee7b7", // emerald
  relationships: "#f9a8d4", // pink
  identity: "#c4b5fd", // violet
  mindfulness: "#fcd34d", // amber
  emotional_health: "#f87171", // red
}

const CATEGORY_GLOW: Record<string, string> = {
  sleep: "rgba(165,180,252,0.35)",
  anxiety: "rgba(253,164,175,0.35)",
  grief_loss: "rgba(148,163,184,0.35)",
  loneliness: "rgba(125,211,252,0.35)",
  self_worth: "rgba(110,231,183,0.35)",
  relationships: "rgba(249,168,212,0.35)",
  identity: "rgba(196,181,253,0.35)",
  mindfulness: "rgba(252,211,77,0.35)",
  emotional_health: "rgba(248,113,113,0.35)",
}

export default function TopicIcon({ category, className = "w-10 h-10" }: TopicIconProps) {
  const color = CATEGORY_COLOR[category] || DEFAULT_COLOR
  const glow = CATEGORY_GLOW[category] || DEFAULT_GLOW

  const common = {
    initial: "hidden" as const,
    animate: "visible" as const,
  }

  switch (category) {
    case "sleep":
      // 月亮与迷雾：月亮缓慢漂浮，迷雾横向流动
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.circle
            cx="24" cy="22" r="10"
            stroke={color} strokeWidth="2"
            fill={glow}
            {...common}
            variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M28 16a8 8 0 0 0 0 12"
            stroke={color} strokeWidth="2" strokeLinecap="round"
            {...common}
            variants={{ hidden: { opacity: 0.3 }, visible: { opacity: 1 } }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M8 34h32"
            stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"
            {...common}
            variants={{ hidden: { x: -6, opacity: 0.2 }, visible: { x: 6, opacity: 0.5 } }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M12 40h24"
            stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.25"
            {...common}
            variants={{ hidden: { x: 6, opacity: 0.1 }, visible: { x: -6, opacity: 0.35 } }}
            transition={{ duration: 3.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      )

    case "anxiety":
      // 心跳波纹：心电图脉动 + 波纹扩散
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.path
            d="M6 24h8l3-8 5 16 4-12 3 4h13"
            stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            {...common}
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="24" cy="24" r="18"
            stroke={color} strokeWidth="1" opacity="0.3"
            {...common}
            variants={{ hidden: { scale: 0.6, opacity: 0.4 }, visible: { scale: 1.1, opacity: 0 } }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </svg>
      )

    case "grief_loss":
      // 雨滴：雨滴下落 + 水面涟漪
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.path
            d="M24 8c4 6 6 9 6 13a6 6 0 1 1-12 0c0-4 2-7 6-13z"
            stroke={color} strokeWidth="2" strokeLinejoin="round"
            {...common}
            variants={{ hidden: { y: -6, opacity: 0.4 }, visible: { y: 0, opacity: 1 } }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="24" cy="34" rx="10" ry="3"
            stroke={color} strokeWidth="1.5" opacity="0.4"
            {...common}
            variants={{ hidden: { scaleX: 0.4, opacity: 0.2 }, visible: { scaleX: 1, opacity: 0.5 } }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      )

    case "loneliness":
      // 涟漪：同心圆扩散
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.circle
            cx="24" cy="24" r="5"
            stroke={color} strokeWidth="2"
            {...common}
            variants={{ hidden: { scale: 0.8, opacity: 0.6 }, visible: { scale: 1, opacity: 1 } }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="24" cy="24" r="5"
            stroke={color} strokeWidth="1.5" opacity="0.4"
            {...common}
            variants={{ hidden: { scale: 1, opacity: 0.5 }, visible: { scale: 2.2, opacity: 0 } }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="24" cy="24" r="5"
            stroke={color} strokeWidth="1" opacity="0.3"
            {...common}
            variants={{ hidden: { scale: 1, opacity: 0.4 }, visible: { scale: 3, opacity: 0 } }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
        </svg>
      )

    case "self_worth":
      // 星光：四角星闪烁
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.path
            d="M24 6l3 12 12 3-12 3-3 12-3-12-12-3 12-3z"
            stroke={color} strokeWidth="2" strokeLinejoin="round"
            {...common}
            variants={{ hidden: { scale: 0.7, opacity: 0.4 }, visible: { scale: 1, opacity: 1 } }}
            transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="36" cy="12" r="2" fill={color}
            {...common}
            variants={{ hidden: { opacity: 0.2 }, visible: { opacity: 0.9 } }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="12" cy="36" r="1.5" fill={color}
            {...common}
            variants={{ hidden: { opacity: 0.9 }, visible: { opacity: 0.2 } }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.4 }}
          />
        </svg>
      )

    case "relationships":
      // 双心：同步跳动
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.path
            d="M16 10c-5 0-9 4-9 9 0 6 9 12 9 12s9-6 9-12c0-5-4-9-9-9z"
            stroke={color} strokeWidth="2" strokeLinejoin="round"
            {...common}
            variants={{ hidden: { scale: 0.9 }, visible: { scale: 1.05 } }}
            transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path
            d="M32 10c-5 0-9 4-9 9 0 6 9 12 9 12s9-6 9-12c0-5-4-9-9-9z"
            stroke={color} strokeWidth="2" strokeLinejoin="round"
            {...common}
            variants={{ hidden: { scale: 1.05 }, visible: { scale: 0.9 } }}
            transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      )

    case "identity":
      // 面具：漂浮 + 轻微旋转
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.path
            d="M12 14h24v14a12 12 0 0 1-24 0z"
            stroke={color} strokeWidth="2" strokeLinejoin="round"
            {...common}
            variants={{ hidden: { y: 3, rotate: -3 }, visible: { y: 0, rotate: 0 } }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle cx="19" cy="22" r="2" fill={color} {...common}
            variants={{ hidden: { opacity: 0.5 }, visible: { opacity: 1 } }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }} />
          <motion.circle cx="29" cy="22" r="2" fill={color} {...common}
            variants={{ hidden: { opacity: 1 }, visible: { opacity: 0.5 } }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", delay: 0.3 }} />
          <motion.path
            d="M20 30c2 1.5 6 1.5 8 0"
            stroke={color} strokeWidth="1.5" strokeLinecap="round"
            {...common}
            variants={{ hidden: { opacity: 0.4 }, visible: { opacity: 0.8 } }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      )

    case "mindfulness":
      // 呼吸光晕：同心圆缩放呼吸
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.circle
            cx="24" cy="24" r="8"
            stroke={color} strokeWidth="2"
            {...common}
            variants={{ hidden: { scale: 0.7, opacity: 0.5 }, visible: { scale: 1.15, opacity: 1 } }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="24" cy="24" r="8"
            stroke={color} strokeWidth="1.5" opacity="0.35"
            {...common}
            variants={{ hidden: { scale: 1, opacity: 0.4 }, visible: { scale: 1.5, opacity: 0 } }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="24" cy="24" r="8"
            stroke={color} strokeWidth="1" opacity="0.25"
            {...common}
            variants={{ hidden: { scale: 1, opacity: 0.3 }, visible: { scale: 1.9, opacity: 0 } }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.4 }}
          />
        </svg>
      )

    case "emotional_health":
      // 脉冲：波形 + 圆点
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.path
            d="M4 24h9l3-8 6 16 4-12 3 4h15"
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            {...common}
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="24" cy="24" r="3" fill={glow}
            {...common}
            variants={{ hidden: { scale: 0.6, opacity: 0.4 }, visible: { scale: 1.2, opacity: 1 } }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      )

    default:
      // 通用：呼吸圆环
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <motion.circle
            cx="24" cy="24" r="10"
            stroke={color} strokeWidth="2"
            {...common}
            variants={{ hidden: { scale: 0.8, opacity: 0.5 }, visible: { scale: 1, opacity: 1 } }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      )
  }
}

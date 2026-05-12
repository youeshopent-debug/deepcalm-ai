import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dc: {
          deep: "#1A2238",
          surface: "#0F1729",
          card: "rgba(26, 34, 56, 0.75)",
          border: "rgba(168, 200, 255, 0.08)",
          "border-glow": "rgba(128, 180, 255, 0.15)",
          text: "#E8EDF5",
          muted: "rgba(180, 200, 230, 0.55)",
          accent: "#7EB8FF",
          "accent-soft": "rgba(126, 184, 255, 0.12)",
          danger: "#FF6B6B",
          success: "#4ECDC4",
        },
      },
      animation: {
        "breath-orb": "breath-orb 11s ease-in-out infinite",
        "breath-halo": "breathing-halo 11s ease-in-out infinite",
        "breath-orb-4-7": "breath-orb-4-7 11s ease-in-out infinite",
        "breathing-circle": "breathing-circle-4-7-8 19s ease-in-out infinite",
        "aurora-drift": "aurora-drift 20s ease-in-out infinite",
        "analysis-shimmer": "analysis-shimmer 2s ease-in-out infinite",
        "meteor-trail": "meteor-trail 4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "leaf-sway": "leaf-sway 12s ease-in-out infinite",
        "float-particle": "float-particle 18s linear infinite",
        "fade-in-glow": "fade-in-glow 1.5s ease-out forwards",
        "fade-out-glow": "fade-out-glow 2s ease-in forwards",
        "stream-glow": "stream-glow 8s ease-in-out infinite",
      },
      keyframes: {
        "breath-orb": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.15" },
          "33%": { transform: "scale(1.25)", opacity: "0.25" },
          "66%": { transform: "scale(0.85)", opacity: "0.1" },
        },
        "breathing-halo": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.06" },
          "33%": { transform: "scale(1.15)", opacity: "0.09" },
          "66%": { transform: "scale(0.85)", opacity: "0.04" },
        },
        "breath-orb-4-7": {
          "0%, 100%": { transform: "scale(0.85)", opacity: "0.04" },
          "36%": { transform: "scale(1.2)", opacity: "0.1" },
          "100%": { transform: "scale(0.85)", opacity: "0.04" },
        },
        "breathing-circle-expand": {
          "0%, 100%": { transform: "scale(0.85)", opacity: "0.5" },
          "36%": { transform: "scale(1.15)", opacity: "0.9" },
          "100%": { transform: "scale(0.85)", opacity: "0.5" },
        },
        "breathing-circle-4-7-8": {
          "0%, 5%": { transform: "scale(0.85)", opacity: "0.5" },
          "21%": { transform: "scale(1.15)", opacity: "0.9" },
          "58%": { transform: "scale(1.15)", opacity: "0.9" },
          "100%": { transform: "scale(0.85)", opacity: "0.5" },
        },
        "aurora-drift": {
          "0%": { transform: "translateX(0) translateY(0) scale(1)" },
          "25%": { transform: "translateX(5%) translateY(-3%) scale(1.05)" },
          "50%": { transform: "translateX(-3%) translateY(2%) scale(0.95)" },
          "75%": { transform: "translateX(3%) translateY(-1%) scale(1.02)" },
          "100%": { transform: "translateX(0) translateY(0) scale(1)" },
        },
        "analysis-shimmer": {
          "0%": { opacity: "0.3", transform: "translateX(-100%)" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "0.3", transform: "translateX(100%)" },
        },
        "meteor-trail": {
          "0%": { opacity: "0", transform: "translateX(-100%) scaleX(0)" },
          "5%": { opacity: "1", transform: "translateX(0%) scaleX(1)" },
          "20%": { opacity: "1", transform: "translateX(50%) scaleX(0.8)" },
          "35%": { opacity: "0.6", transform: "translateX(100%) scaleX(0.3)" },
          "50%": { opacity: "0", transform: "translateX(200%) scaleX(0)" },
          "100%": { opacity: "0", transform: "translateX(200%) scaleX(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)", opacity: "0.15" },
          "25%": { transform: "translateX(8px) translateY(-4px) rotate(3deg)", opacity: "0.2" },
          "50%": { transform: "translateX(-4px) translateY(2px) rotate(-2deg)", opacity: "0.12" },
          "75%": { transform: "translateX(6px) translateY(-2px) rotate(1deg)", opacity: "0.18" },
        },
        "float-particle": {
          "0%": { transform: "translateY(100vh) translateX(0) scale(0.8)", opacity: "0" },
          "10%": { opacity: "0.15" },
          "90%": { opacity: "0.1" },
          "100%": { transform: "translateY(-10vh) translateX(30px) scale(1.2)", opacity: "0" },
        },
        "fade-in-glow": {
          from: { opacity: "0", filter: "blur(8px)", transform: "translateY(8px)" },
          to: { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
        "fade-out-glow": {
          from: { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
          to: { opacity: "0", filter: "blur(6px)", transform: "translateY(-6px)" },
        },
        "stream-glow": {
          "0%, 100%": { opacity: "0.04", transform: "translateX(-2%) scaleY(1)" },
          "25%": { opacity: "0.07", transform: "translateX(1%) scaleY(1.02)" },
          "50%": { opacity: "0.05", transform: "translateX(2%) scaleY(0.98)" },
          "75%": { opacity: "0.08", transform: "translateX(-1%) scaleY(1.01)" },
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

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
        "aurora-drift": "aurora-drift 20s ease-in-out infinite",
        "analysis-shimmer": "analysis-shimmer 2s ease-in-out infinite",
        "meteor-trail": "meteor-trail 4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
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
      },
      fontFamily: {
        sans: [
          "Inter",
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

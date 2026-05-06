import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nord: {
          bg: "#0A1628",
          surface: "#111D35",
          card: "#162240",
          border: "#1E2D4A",
          text: "#F0F4F8",
          muted: "#8899B4",
          accent: "#60A5FA",
          beige: "#F5F0EB",
          "beige-dark": "#E8E0D6",
          "accent-dim": "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(96,165,250,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(96,165,250,0.3)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config

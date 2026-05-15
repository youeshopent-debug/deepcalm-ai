import SocialLanding from "@/components/SocialLanding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeepCalm AI - Sleep Optimization | #EmotionalFitness",
  description: "53% of global population affected by poor sleep. DeepCalm AI uses 8-model architecture for 100% availability. CBT-I validated: 46% faster sleep onset, 42% anxiety reduction.",
  keywords: "sleep optimization, AI mental health, CBT-I, insomnia, anxiety relief, emotional fitness, AI agents",
  openGraph: {
    title: "DeepCalm AI - Your Midnight Sanctuary",
    description: "Free AI sleep optimization. 8-model architecture. Clinically validated results.",
    type: "website",
    images: ["/og-social.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepCalm AI - Sleep Optimization",
    description: "53% affected by poor sleep. AI-powered solution with 46% faster sleep onset.",
  },
}

export default function SocialPage() {
  return <SocialLanding />
}

import type { Locale } from '@/types'
import type { TopicContent, TopicFaqItem } from '@/content/topics'
import { registerContentGenerator } from '@/content/topics'

import nappingData from './data/napping.json'
import panicAttackData from './data/panic-attack.json'
import sleepParalysisData from './data/sleep-paralysis.json'
import dependentPersonalityData from './data/dependent-personality.json'
import darkThoughtsData from './data/dark-thoughts.json'
import emotionalNumbnessData from './data/emotional-numbness.json'
import healthAnxietyData from './data/health-anxiety.json'
import longDistanceData from './data/long-distance.json'
import belongingData from './data/belonging.json'
import comparisonData from './data/comparison.json'
import coDependencyData from './data/co-dependency.json'
import culturalIdentityData from './data/cultural-identity.json'
import neuralMeditationData from './data/neural_meditation.json'
import polyvagalEmotionData from './data/polyvagal_emotion.json'

type L = Locale

/* ───────── helpers ───────── */
function makeContent(
  zh: { science: string; fitness: string; faq: [string, string][] },
  en: { science: string; fitness: string; faq: [string, string][] },
): (lang: L, topic: { title: string; description: string }) => TopicContent {
  return (lang, topic) => {
    const src = (lang === 'zh' || lang === 'ms' || lang === 'ja' || lang === 'ko' || lang === 'th') ? zh : en
    return {
      science: fill(src.science, topic.title),
      fitnessGuide: fill(src.fitness, topic.title),
      faqItems: src.faq.map(([q, a]) => ({ q: fill(q, topic.title), a: fill(a, topic.title) })),
    }
  }
}

function fill(t: string, title: string): string {
  return t.replace(/\{\{T\}\}/g, title)
}

/* ───────── 1. napping ───────── */
registerContentGenerator('napping', makeContent(nappingData.zh, nappingData.en))
registerContentGenerator('panic-attack', makeContent(panicAttackData.zh, panicAttackData.en))
registerContentGenerator('sleep-paralysis', makeContent(sleepParalysisData.zh, sleepParalysisData.en))
registerContentGenerator('dependent-personality', makeContent(dependentPersonalityData.zh, dependentPersonalityData.en))
registerContentGenerator('dark-thoughts', makeContent(darkThoughtsData.zh, darkThoughtsData.en))
registerContentGenerator('emotional-numbness', makeContent(emotionalNumbnessData.zh, emotionalNumbnessData.en))

/* ───────── 7. health-anxiety ───────── */
registerContentGenerator('health-anxiety', makeContent(healthAnxietyData.zh, healthAnxietyData.en))

/* ───────── 3. long-distance ───────── */
registerContentGenerator('long-distance', makeContent(longDistanceData.zh, longDistanceData.en))

/* ───────── 4. belonging ───────── */
registerContentGenerator('belonging', makeContent(belongingData.zh, belongingData.en))

/* ───────── 5. comparison ───────── */
registerContentGenerator('comparison', makeContent(comparisonData.zh, comparisonData.en))

/* ───────── 6. co-dependency ───────── */
registerContentGenerator('co-dependency', makeContent(coDependencyData.zh, coDependencyData.en))

/* ───────── 7. cultural-identity ───────── */
registerContentGenerator('cultural-identity', makeContent(culturalIdentityData.zh, culturalIdentityData.en))

/* ───────── 8. neural_meditation ───────── */
registerContentGenerator('neural_meditation', makeContent(neuralMeditationData.zh, neuralMeditationData.en))

/* ───────── 9. polyvagal_emotion ───────── */
registerContentGenerator('polyvagal-emotion', makeContent(polyvagalEmotionData.zh, polyvagalEmotionData.en))

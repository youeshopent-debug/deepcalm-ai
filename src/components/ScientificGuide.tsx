"use client"

import { Moon, Brain, ArrowRight, BookOpen, Quote } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

function FindingCard({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 bg-nord-accent/[0.04] border border-nord-accent/10 rounded-xl">
      <Quote className="w-4 h-4 text-nord-accent flex-shrink-0 mt-0.5" />
      <p className="text-sm text-nord-text/80 leading-relaxed">{text}</p>
    </div>
  )
}

interface ScientificArticleProp {
  heading: string
  paragraphs: string[]
  findings: string[]
  reference: string
}

interface ScientificGuideProps {
  articles?: ScientificArticleProp[]
}

const ICONS = [Moon, Brain]

function ArticleCard({
  icon: Icon,
  article,
  index,
}: {
  icon: typeof Moon
  article: ScientificArticleProp
  index: number
}) {
  return (
    <article className="p-6 sm:p-10 bg-nord-card border border-nord-border rounded-2xl hover:border-nord-accent/20 transition-all duration-500">
      <div className="flex items-start gap-4 sm:gap-6 mb-7">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-nord-accent/10 flex items-center justify-center mt-1">
          <Icon className="w-5.5 h-5.5 text-nord-accent" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-nord-text leading-snug">{article.heading}</h2>
        </div>
      </div>
      <div className="space-y-5">
        {article.paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-nord-muted leading-relaxed">{p}</p>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-semibold text-nord-accent uppercase tracking-wider mb-4">Key Findings</h3>
        {article.findings.map((f, i) => (
          <FindingCard key={i} text={f} />
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2 p-3 bg-nord-surface/50 rounded-lg">
        <BookOpen className="w-4 h-4 text-nord-muted flex-shrink-0 mt-0.5" />
        <p className="text-xs text-nord-muted/70 leading-relaxed">{article.reference}</p>
      </div>
    </article>
  )
}

export default function ScientificGuide({ articles }: ScientificGuideProps) {
  const { tt } = useLanguage()

  if (articles && articles.length > 0) {
    return (
      <section id="scientific-guide" className="py-24 bg-gradient-to-b from-transparent via-nord-accent/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {articles.map((article, i) => (
              <ArticleCard
                key={i}
                icon={ICONS[i % ICONS.length]}
                article={article}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="scientific-guide" className="py-24 bg-gradient-to-b from-transparent via-nord-accent/[0.02] to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          <ArticleCard
            icon={Moon}
            article={{
              heading: tt("scientificGuide.sleepTitle"),
              paragraphs: [tt("scientificGuide.sleepP1"), tt("scientificGuide.sleepP2"), tt("scientificGuide.sleepP3"), tt("scientificGuide.sleepP4")],
              findings: [tt("scientificGuide.sleepFinding1"), tt("scientificGuide.sleepFinding2"), tt("scientificGuide.sleepFinding3")],
              reference: tt("scientificGuide.sleepRef"),
            }}
            index={0}
          />
          <ArticleCard
            icon={Brain}
            article={{
              heading: tt("scientificGuide.anxietyTitle"),
              paragraphs: [tt("scientificGuide.anxietyP1"), tt("scientificGuide.anxietyP2"), tt("scientificGuide.anxietyP3"), tt("scientificGuide.anxietyP4")],
              findings: [tt("scientificGuide.anxietyFinding1"), tt("scientificGuide.anxietyFinding2"), tt("scientificGuide.anxietyFinding3")],
              reference: tt("scientificGuide.anxietyRef"),
            }}
            index={1}
          />
        </div>
      </div>
    </section>
  )
}

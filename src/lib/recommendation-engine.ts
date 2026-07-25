import type { Locale } from "@/types"
import type { Topic } from "@/content/topics"
import { getTopics, getTopicsByCategory } from "@/content/topics"
import { getKnowledgeMap } from "@/data/knowledge-graph"

/**
 * Recommendation scoring result for a single candidate topic.
 */
interface ScoredCandidate {
  slug: string
  score: number
}

/**
 * Tokenize a keyword string into a set of lowercase tokens.
 * Handles comma-separated, hash-tagged, and space-separated segments.
 */
function tokenize(keywords: string): Set<string> {
  const tokens = keywords
    .toLowerCase()
    .split(/[,，、#\s]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && !t.startsWith("#"))
  return new Set(tokens)
}

/**
 * Compute Jaccard similarity between two sets.
 * J(A, B) = |A ∩ B| / |A ∪ B|
 * Returns 0 for empty-union edge case.
 */
function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  const union = new Set([...a, ...b])
  if (union.size === 0) return 0
  let intersection = 0
  for (const token of a) {
    if (b.has(token)) intersection++
  }
  return intersection / union.size
}

/**
 * Normalize a raw score into [0, 1] range by max-score clamping.
 */
function normalize(scores: Map<string, number>): Map<string, number> {
  if (scores.size === 0) return scores
  const max = Math.max(...scores.values())
  if (max === 0) return scores
  const normalized = new Map<string, number>()
  for (const [k, v] of scores) {
    normalized.set(k, v / max)
  }
  return normalized
}

/**
 * Get top-N recommended topics for a given library article slug.
 *
 * Scoring methodology (3-stage weighted ensemble):
 * - **KG relations (0.6)**: Direct Knowledge Graph connections.
 *   A bidirectional triple match gives full weight; single-direction gives half.
 * - **Keyword Jaccard similarity (0.3)**: How similar the keyword sets are
 *   between the current topic and each candidate.
 * - **Same-category bonus (0.1)**: Topics in the same category get a modest bump.
 *
 * The final score for each candidate is:
 *   S = 0.6 × KG_norm + 0.3 × Jaccard_norm + 0.1 × Cat_norm
 *
 * Results are sorted descending by score; ties broken by slug order.
 *
 * @param slug  - Current topic slug (excluded from results).
 * @param locale - Current locale for topic data.
 * @param count  - Maximum number of recommendations (default 6).
 * @returns Array of Topic objects, ordered by relevance.
 */
export function getRecommendations(slug: string, locale: Locale, count: number = 6): Topic[] {
  const allTopics = getTopics(locale)
  const current = allTopics.find((t) => t.slug === slug)
  if (!current) return []

  const candidates = allTopics.filter((t) => t.slug !== slug)

  // ── Stage 1: Knowledge Graph score ──────────────────────────
  const kgScores = new Map<string, number>()
  const kgRelations = getKnowledgeMap(slug)
  const relatedSlugs = new Set(kgRelations.map((r) => r.slug))

  for (const c of candidates) {
    // Direct KG relation: full score (1.0)
    if (relatedSlugs.has(c.slug)) {
      kgScores.set(c.slug, 1.0)
      continue
    }
    // No direct KG relation: check if candidate has a relation back to current
    const candidateKG = getKnowledgeMap(c.slug)
    const hasReverse = candidateKG.some((r) => r.slug === slug)
    kgScores.set(c.slug, hasReverse ? 0.5 : 0)
  }

  // ── Stage 2: Keyword Jaccard similarity ─────────────────────
  const currentTokens = tokenize(current.keywords)
  const jaccardScores = new Map<string, number>()
  for (const c of candidates) {
    const candidateTokens = tokenize(c.keywords)
    jaccardScores.set(c.slug, jaccardSimilarity(currentTokens, candidateTokens))
  }

  // ── Stage 3: Same-category bonus ────────────────────────────
  const catScores = new Map<string, number>()
  for (const c of candidates) {
    catScores.set(c.slug, c.category === current.category ? 1 : 0)
  }

  // ── Normalize all scores to [0, 1] ──────────────────────────
  const kgNorm = normalize(kgScores)
  const jaccardNorm = normalize(jaccardScores)
  const catNorm = normalize(catScores)

  // ── Weighted ensemble ───────────────────────────────────────
  const finalScores: ScoredCandidate[] = candidates.map((c) => {
    const kg = kgNorm.get(c.slug) ?? 0
    const jc = jaccardNorm.get(c.slug) ?? 0
    const ct = catNorm.get(c.slug) ?? 0
    return {
      slug: c.slug,
      score: 0.6 * kg + 0.3 * jc + 0.1 * ct,
    }
  })

  // ── Sort descending by score, then slug for determinism ─────
  finalScores.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score
    return a.slug.localeCompare(b.slug)
  })

  // ── Take top N ──────────────────────────────────────────────
  const topSlugs = new Set(finalScores.slice(0, count).map((s) => s.slug))
  return allTopics.filter((t) => topSlugs.has(t.slug))
}

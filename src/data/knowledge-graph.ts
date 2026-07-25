export type RelationType =
  | "related_to"
  | "treats"
  | "treated_by"
  | "causes"
  | "symptom_of"
  | "prevents"
  | "aggravates"
  | "strengthens"

export interface Triple {
  sub: string
  pred: RelationType
  obj: string
}

/**
 * DeepCalm Entity-Relationship Knowledge Graph.
 * Inspired by MemPalace's temporal entity-relationship triples architecture.
 *
 * Each triple: Subject → Predicate → Object
 * Subjects and objects are topic slugs from topicMeta.
 * Predicates are semantic relationship types.
 */
export const KNOWLEDGE_GRAPH: Triple[] = [
  // ── Sleep Category ──────────────────────────────────────────
  { sub: "insomnia", pred: "related_to", obj: "sleep-anxiety" },
  { sub: "insomnia", pred: "related_to", obj: "anxiety" },
  { sub: "insomnia", pred: "treated_by", obj: "meditation" },
  { sub: "insomnia", pred: "treated_by", obj: "breathwork" },
  { sub: "insomnia", pred: "aggravates", obj: "stress-relief" },
  { sub: "insomnia", pred: "related_to", obj: "circadian-rhythm" },

  { sub: "deep-sleep", pred: "related_to", obj: "rem-sleep" },
  { sub: "deep-sleep", pred: "treated_by", obj: "sleep-hygiene" },
  { sub: "deep-sleep", pred: "strengthens", obj: "emotional-regulation" },
  { sub: "deep-sleep", pred: "prevents", obj: "burnout" },
  { sub: "deep-sleep", pred: "related_to", obj: "circadian-rhythm" },
  { sub: "deep-sleep", pred: "related_to", obj: "insomnia" },

  { sub: "sleep-anxiety", pred: "symptom_of", obj: "anxiety" },
  { sub: "sleep-anxiety", pred: "related_to", obj: "insomnia" },
  { sub: "sleep-anxiety", pred: "treated_by", obj: "relaxation" },
  { sub: "sleep-anxiety", pred: "treated_by", obj: "breathwork" },
  { sub: "sleep-anxiety", pred: "aggravates", obj: "insomnia" },

  { sub: "nightmare", pred: "related_to", obj: "rem-sleep" },
  { sub: "nightmare", pred: "symptom_of", obj: "stress-relief" },
  { sub: "nightmare", pred: "treated_by", obj: "meditation" },
  { sub: "nightmare", pred: "related_to", obj: "ptsd" },
  { sub: "nightmare", pred: "aggravates", obj: "sleep-anxiety" },

  { sub: "circadian-rhythm", pred: "related_to", obj: "deep-sleep" },
  { sub: "circadian-rhythm", pred: "related_to", obj: "insomnia" },
  { sub: "circadian-rhythm", pred: "strengthens", obj: "sleep-hygiene" },
  { sub: "circadian-rhythm", pred: "related_to", obj: "mood-tracking" },

  { sub: "sleep-hygiene", pred: "treats", obj: "insomnia" },
  { sub: "sleep-hygiene", pred: "strengthens", obj: "deep-sleep" },
  { sub: "sleep-hygiene", pred: "prevents", obj: "sleep-anxiety" },
  { sub: "sleep-hygiene", pred: "related_to", obj: "circadian-rhythm" },

  { sub: "rem-sleep", pred: "related_to", obj: "deep-sleep" },
  { sub: "rem-sleep", pred: "strengthens", obj: "emotional-regulation" },
  { sub: "rem-sleep", pred: "related_to", obj: "nightmare" },
  { sub: "rem-sleep", pred: "related_to", obj: "memory" },

  { sub: "napping", pred: "related_to", obj: "deep-sleep" },
  { sub: "napping", pred: "related_to", obj: "circadian-rhythm" },
  { sub: "napping", pred: "prevents", obj: "burnout" },

  // ── Anxiety Category ────────────────────────────────────────
  { sub: "stress-relief", pred: "related_to", obj: "anxiety" },
  { sub: "stress-relief", pred: "treated_by", obj: "meditation" },
  { sub: "stress-relief", pred: "treated_by", obj: "breathwork" },
  { sub: "stress-relief", pred: "related_to", obj: "burnout" },
  { sub: "stress-relief", pred: "prevents", obj: "panic-attack" },
  { sub: "stress-relief", pred: "related_to", obj: "emotional-regulation" },

  { sub: "panic-attack", pred: "symptom_of", obj: "anxiety" },
  { sub: "panic-attack", pred: "treated_by", obj: "breathwork" },
  { sub: "panic-attack", pred: "treated_by", obj: "meditation" },
  { sub: "panic-attack", pred: "related_to", obj: "health-anxiety" },
  { sub: "panic-attack", pred: "aggravates", obj: "sleep-anxiety" },

  { sub: "social-anxiety", pred: "symptom_of", obj: "anxiety" },
  { sub: "social-anxiety", pred: "related_to", obj: "self-esteem" },
  { sub: "social-anxiety", pred: "treated_by", obj: "meditation" },
  { sub: "social-anxiety", pred: "related_to", obj: "loneliness" },

  { sub: "generalized-anxiety", pred: "related_to", obj: "stress-relief" },
  { sub: "generalized-anxiety", pred: "related_to", obj: "insomnia" },
  { sub: "generalized-anxiety", pred: "treated_by", obj: "meditation" },
  { sub: "generalized-anxiety", pred: "related_to", obj: "health-anxiety" },

  { sub: "health-anxiety", pred: "related_to", obj: "anxiety" },
  { sub: "health-anxiety", pred: "related_to", obj: "panic-attack" },
  { sub: "health-anxiety", pred: "treated_by", obj: "meditation" },
  { sub: "health-anxiety", pred: "related_to", obj: "ocd" },

  { sub: "work-stress", pred: "related_to", obj: "stress-relief" },
  { sub: "work-stress", pred: "related_to", obj: "burnout" },
  { sub: "work-stress", pred: "causes", obj: "sleep-anxiety" },
  { sub: "work-stress", pred: "related_to", obj: "boundaries" },

  { sub: "exam-nerves", pred: "symptom_of", obj: "anxiety" },
  { sub: "exam-nerves", pred: "treated_by", obj: "breathwork" },
  { sub: "exam-nerves", pred: "treated_by", obj: "meditation" },
  { sub: "exam-nerves", pred: "related_to", obj: "self-esteem" },

  // ── Grief & Loss Category ───────────────────────────────────
  { sub: "loss", pred: "related_to", obj: "grief-loss" },
  { sub: "loss", pred: "related_to", obj: "loneliness" },
  { sub: "loss", pred: "treated_by", obj: "meditation" },
  { sub: "loss", pred: "related_to", obj: "emotional-regulation" },

  { sub: "bereavement", pred: "related_to", obj: "loss" },
  { sub: "bereavement", pred: "related_to", obj: "loneliness" },
  { sub: "bereavement", pred: "related_to", obj: "depression" },
  { sub: "bereavement", pred: "treated_by", obj: "journaling" },

  { sub: "pet-loss", pred: "related_to", obj: "loss" },
  { sub: "pet-loss", pred: "related_to", obj: "grief-loss" },
  { sub: "pet-loss", pred: "related_to", obj: "loneliness" },

  { sub: "divorce", pred: "related_to", obj: "loss" },
  { sub: "divorce", pred: "related_to", obj: "loneliness" },
  { sub: "divorce", pred: "related_to", obj: "self-esteem" },
  { sub: "divorce", pred: "related_to", obj: "break-up" },

  { sub: "long-distance", pred: "related_to", obj: "loneliness" },
  { sub: "long-distance", pred: "related_to", obj: "trust" },
  { sub: "long-distance", pred: "related_to", obj: "communication" },

  // ── Loneliness Category ─────────────────────────────────────
  { sub: "loneliness", pred: "related_to", obj: "social-anxiety" },
  { sub: "loneliness", pred: "related_to", obj: "self-esteem" },
  { sub: "loneliness", pred: "treated_by", obj: "friendship" },
  { sub: "loneliness", pred: "related_to", obj: "depression" },

  { sub: "solitude", pred: "related_to", obj: "loneliness" },
  { sub: "solitude", pred: "strengthens", obj: "meditation" },
  { sub: "solitude", pred: "related_to", obj: "self-compassion" },
  { sub: "solitude", pred: "related_to", obj: "mindfulness" },

  { sub: "isolation", pred: "related_to", obj: "loneliness" },
  { sub: "isolation", pred: "related_to", obj: "depression" },
  { sub: "isolation", pred: "related_to", obj: "social-anxiety" },

  { sub: "friendship", pred: "prevents", obj: "loneliness" },
  { sub: "friendship", pred: "strengthens", obj: "self-esteem" },
  { sub: "friendship", pred: "related_to", obj: "communication" },
  { sub: "friendship", pred: "related_to", obj: "belonging" },

  { sub: "social-skills", pred: "prevents", obj: "social-anxiety" },
  { sub: "social-skills", pred: "strengthens", obj: "friendship" },
  { sub: "social-skills", pred: "related_to", obj: "communication" },

  { sub: "belonging", pred: "prevents", obj: "loneliness" },
  { sub: "belonging", pred: "related_to", obj: "identity" },
  { sub: "belonging", pred: "related_to", obj: "friendship" },
  { sub: "belonging", pred: "related_to", obj: "cultural-identity" },

  // ── Self-Worth Category ─────────────────────────────────────
  { sub: "self-esteem", pred: "related_to", obj: "self-compassion" },
  { sub: "self-esteem", pred: "prevents", obj: "social-anxiety" },
  { sub: "self-esteem", pred: "related_to", obj: "body-image" },
  { sub: "self-esteem", pred: "related_to", obj: "impostor-syndrome" },
  { sub: "self-esteem", pred: "related_to", obj: "comparison" },

  { sub: "impostor-syndrome", pred: "related_to", obj: "self-esteem" },
  { sub: "impostor-syndrome", pred: "related_to", obj: "work-stress" },
  { sub: "impostor-syndrome", pred: "treated_by", obj: "self-compassion" },
  { sub: "impostor-syndrome", pred: "treated_by", obj: "meditation" },

  { sub: "perfectionism", pred: "related_to", obj: "impostor-syndrome" },
  { sub: "perfectionism", pred: "related_to", obj: "work-stress" },
  { sub: "perfectionism", pred: "treated_by", obj: "self-compassion" },
  { sub: "perfectionism", pred: "related_to", obj: "comparison" },

  { sub: "body-image", pred: "related_to", obj: "self-esteem" },
  { sub: "body-image", pred: "related_to", obj: "comparison" },
  { sub: "body-image", pred: "related_to", obj: "health-anxiety" },

  { sub: "comparison", pred: "related_to", obj: "self-esteem" },
  { sub: "comparison", pred: "related_to", obj: "perfectionism" },
  { sub: "comparison", pred: "prevents", obj: "gratitude" },

  { sub: "self-compassion", pred: "strengthens", obj: "self-esteem" },
  { sub: "self-compassion", pred: "treated_by", obj: "meditation" },
  { sub: "self-compassion", pred: "prevents", obj: "burnout" },
  { sub: "self-compassion", pred: "related_to", obj: "emotional-regulation" },

  // ── Relationships Category ──────────────────────────────────
  { sub: "break-up", pred: "related_to", obj: "loss" },
  { sub: "break-up", pred: "related_to", obj: "self-esteem" },
  { sub: "break-up", pred: "related_to", obj: "loneliness" },
  { sub: "break-up", pred: "treated_by", obj: "journaling" },

  { sub: "communication", pred: "strengthens", obj: "friendship" },
  { sub: "communication", pred: "prevents", obj: "break-up" },
  { sub: "communication", pred: "related_to", obj: "trust" },
  { sub: "communication", pred: "related_to", obj: "boundaries" },

  { sub: "trust", pred: "related_to", obj: "communication" },
  { sub: "trust", pred: "related_to", obj: "break-up" },
  { sub: "trust", pred: "related_to", obj: "co-dependency" },

  { sub: "co-dependency", pred: "related_to", obj: "boundaries" },
  { sub: "co-dependency", pred: "related_to", obj: "self-esteem" },
  { sub: "co-dependency", pred: "treated_by", obj: "self-compassion" },

  { sub: "boundaries", pred: "prevents", obj: "burnout" },
  { sub: "boundaries", pred: "prevents", obj: "co-dependency" },
  { sub: "boundaries", pred: "related_to", obj: "communication" },
  { sub: "boundaries", pred: "related_to", obj: "work-stress" },

  { sub: "parenting", pred: "related_to", obj: "emotional-regulation" },
  { sub: "parenting", pred: "related_to", obj: "stress-relief" },
  { sub: "parenting", pred: "related_to", obj: "self-compassion" },
  { sub: "parenting", pred: "related_to", obj: "boundaries" },

  { sub: "family-conflict", pred: "related_to", obj: "communication" },
  { sub: "family-conflict", pred: "related_to", obj: "boundaries" },
  { sub: "family-conflict", pred: "related_to", obj: "emotional-regulation" },
  { sub: "family-conflict", pred: "causes", obj: "stress-relief" },

  // ── Identity Category ───────────────────────────────────────
  { sub: "purpose", pred: "prevents", obj: "burnout" },
  { sub: "purpose", pred: "related_to", obj: "self-esteem" },
  { sub: "purpose", pred: "related_to", obj: "career-change" },
  { sub: "purpose", pred: "related_to", obj: "gratitude" },

  { sub: "career-change", pred: "related_to", obj: "purpose" },
  { sub: "career-change", pred: "related_to", obj: "work-stress" },
  { sub: "career-change", pred: "related_to", obj: "impostor-syndrome" },
  { sub: "career-change", pred: "related_to", obj: "quarter-life-crisis" },

  { sub: "quarter-life-crisis", pred: "related_to", obj: "purpose" },
  { sub: "quarter-life-crisis", pred: "related_to", obj: "career-change" },
  { sub: "quarter-life-crisis", pred: "related_to", obj: "anxiety" },

  { sub: "midlife-crisis", pred: "related_to", obj: "purpose" },
  { sub: "midlife-crisis", pred: "related_to", obj: "self-esteem" },
  { sub: "midlife-crisis", pred: "treated_by", obj: "meditation" },

  { sub: "cultural-identity", pred: "related_to", obj: "identity" },
  { sub: "cultural-identity", pred: "related_to", obj: "belonging" },
  { sub: "cultural-identity", pred: "related_to", obj: "self-esteem" },

  // ── Mindfulness Category ────────────────────────────────────
  { sub: "meditation", pred: "treats", obj: "stress-relief" },
  { sub: "meditation", pred: "treats", obj: "anxiety" },
  { sub: "meditation", pred: "treats", obj: "insomnia" },
  { sub: "meditation", pred: "strengthens", obj: "emotional-regulation" },
  { sub: "meditation", pred: "strengthens", obj: "self-compassion" },
  { sub: "meditation", pred: "related_to", obj: "breathwork" },
  { sub: "meditation", pred: "related_to", obj: "body-scan" },
  { sub: "meditation", pred: "related_to", obj: "gratitude" },

  { sub: "body-scan", pred: "related_to", obj: "meditation" },
  { sub: "body-scan", pred: "treats", obj: "stress-relief" },
  { sub: "body-scan", pred: "related_to", obj: "sleep-hygiene" },
  { sub: "body-scan", pred: "strengthens", obj: "body-image" },

  { sub: "breathwork", pred: "treats", obj: "panic-attack" },
  { sub: "breathwork", pred: "treats", obj: "stress-relief" },
  { sub: "breathwork", pred: "related_to", obj: "meditation" },
  { sub: "breathwork", pred: "prevents", obj: "sleep-anxiety" },

  { sub: "gratitude", pred: "strengthens", obj: "self-esteem" },
  { sub: "gratitude", pred: "prevents", obj: "comparison" },
  { sub: "gratitude", pred: "related_to", obj: "meditation" },
  { sub: "gratitude", pred: "related_to", obj: "purpose" },

  { sub: "journaling", pred: "related_to", obj: "meditation" },
  { sub: "journaling", pred: "strengthens", obj: "emotional-regulation" },
  { sub: "journaling", pred: "related_to", obj: "mood-tracking" },
  { sub: "journaling", pred: "treats", obj: "anxiety" },

  // ── Emotional Health Category ───────────────────────────────
  { sub: "anger-management", pred: "related_to", obj: "emotional-regulation" },
  { sub: "anger-management", pred: "related_to", obj: "stress-relief" },
  { sub: "anger-management", pred: "treated_by", obj: "meditation" },
  { sub: "anger-management", pred: "related_to", obj: "communication" },
  { sub: "anger-management", pred: "related_to", obj: "boundaries" },

  { sub: "emotional-regulation", pred: "strengthens", obj: "self-esteem" },
  { sub: "emotional-regulation", pred: "prevents", obj: "panic-attack" },
  { sub: "emotional-regulation", pred: "related_to", obj: "meditation" },
  { sub: "emotional-regulation", pred: "related_to", obj: "anger-management" },
  { sub: "emotional-regulation", pred: "related_to", obj: "resilience" },

  { sub: "mood-tracking", pred: "related_to", obj: "emotional-regulation" },
  { sub: "mood-tracking", pred: "related_to", obj: "journaling" },
  { sub: "mood-tracking", pred: "related_to", obj: "gratitude" },
  { sub: "mood-tracking", pred: "related_to", obj: "sleep-hygiene" },

  { sub: "burnout", pred: "related_to", obj: "work-stress" },
  { sub: "burnout", pred: "related_to", obj: "stress-relief" },
  { sub: "burnout", pred: "prevents", obj: "self-compassion" },
  { sub: "burnout", pred: "related_to", obj: "boundaries" },
  { sub: "burnout", pred: "treated_by", obj: "meditation" },

  { sub: "resilience", pred: "prevents", obj: "burnout" },
  { sub: "resilience", pred: "prevents", obj: "stress-relief" },
  { sub: "resilience", pred: "strengthens", obj: "emotional-regulation" },
  { sub: "resilience", pred: "related_to", obj: "meditation" },
  { sub: "resilience", pred: "related_to", obj: "purpose" },
]

/**
 * Get all related topics for a given slug.
 * Returns array of { slug: string; relation: RelationType }
 */
export function getRelatedTopics(slug: string): { slug: string; relation: RelationType }[] {
  const out: { slug: string; relation: RelationType }[] = []
  for (const t of KNOWLEDGE_GRAPH) {
    if (t.sub === slug) out.push({ slug: t.obj, relation: t.pred })
    if (t.obj === slug) {
      // Reverse the predicate for bidirectional navigation
      const reverse: RelationType =
        t.pred === "treats" ? "treated_by"
        : t.pred === "treated_by" ? "treats"
        : t.pred === "causes" ? "symptom_of"
        : t.pred === "symptom_of" ? "causes"
        : t.pred === "prevents" ? "prevents"
        : t.pred === "aggravates" ? "aggravates"
        : t.pred === "strengthens" ? "strengthens"
        : "related_to"
      out.push({ slug: t.sub, relation: reverse })
    }
  }
  return out
}

/**
 * Get all topics that share a direct relationship with the given slug,
 * deduplicated and sorted by relationship type.
 */
export function getKnowledgeMap(slug: string): { slug: string; relation: RelationType }[] {
  const seen = new Set<string>()
  const result: { slug: string; relation: RelationType }[] = []
  for (const item of getRelatedTopics(slug)) {
    if (!seen.has(item.slug)) {
      seen.add(item.slug)
      result.push(item)
    }
  }
  return result
}

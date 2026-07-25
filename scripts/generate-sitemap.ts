/**
 * Static sitemap.xml generator for DeepCalm.
 *
 * Run AFTER `next build` (with `output: "export"`):
 *   npx tsx scripts/generate-sitemap.ts
 *
 * Writes `out/sitemap.xml` with hreflang alternates for all 7 locales.
 */

import * as fs from "node:fs"
import * as path from "node:path"

import { getGuides } from "@/content/guides"
import { getAnxietyScenarios } from "@/content/anxiety-scenarios"
import { getAllSlugs } from "@/content/topics"

// ── Configuration ──────────────────────────────────────────────────────

const LANGS: ReadonlyArray<string> = ["zh", "en", "ms", "ja", "ko", "th", "es"]
const BASE = "https://deepcalm-ai.com"
const OUT_DIR = path.resolve(__dirname, "..", "out")
const SITEMAP_PATH = path.join(OUT_DIR, "sitemap.xml")

// ── XML helpers ────────────────────────────────────────────────────────

function xmlDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString().slice(0, 10)
}

interface UrlEntry {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: string
  alternates?: Record<string, string>
}

/**
 * XML-entity-escape a string for use in element text content.
 * Uses \x26, \x3C, \x3E to avoid literal `&`, `<`, `>` in source.
 */
function esc(s: string): string {
  const a = "\x26" // &
  return s
    .replace(/\x26/g, a + "amp;")
    .replace(/</g, a + "lt;")
    .replace(/>/g, a + "gt;")
}

function urlTag(e: UrlEntry): string {
  const lines: string[] = ["  <url>"]
  lines.push("    <loc>" + esc(e.loc) + "</loc>")
  if (e.lastmod) lines.push("    <lastmod>" + e.lastmod + "</lastmod>")
  if (e.changefreq) lines.push("    <changefreq>" + e.changefreq + "</changefreq>")
  if (e.priority) lines.push("    <priority>" + e.priority + "</priority>")
  if (e.alternates) {
    for (const [lang, href] of Object.entries(e.alternates)) {
      lines.push(
        '    <xhtml:link rel="alternate" hreflang="' +
          lang +
          '" href="' +
          esc(href) +
          '" />'
      )
    }
  }
  lines.push("  </url>")
  return lines.join("\n")
}

function langAlternates(pathPart: string): Record<string, string> {
  const r: Record<string, string> = {}
  for (const lang of LANGS) r[lang] = BASE + "/" + lang + pathPart
  return r
}

// ── Build entries ──────────────────────────────────────────────────────

function buildEntries(): UrlEntry[] {
  const entries: UrlEntry[] = []

  // ── Static pages ───────────────────────────────────────────────────
  const staticRoutes: Array<{ path: string; priority: string; changefreq: string }> = [
    { path: "", priority: "1.0", changefreq: "daily" },
    { path: "/guide", priority: "0.9", changefreq: "daily" },
    { path: "/privacy", priority: "0.3", changefreq: "monthly" },
    { path: "/terms", priority: "0.3", changefreq: "monthly" },
    { path: "/about", priority: "0.5", changefreq: "monthly" },
    { path: "/sanctuary", priority: "0.9", changefreq: "daily" },
    { path: "/library", priority: "0.9", changefreq: "daily" },
  ]

  for (const lang of LANGS) {
    for (const r of staticRoutes) {
      entries.push({
        loc: BASE + "/" + lang + r.path,
        lastmod: xmlDate(new Date()),
        changefreq: r.changefreq,
        priority: r.priority,
        alternates: langAlternates(r.path),
      })
    }
  }

  // ── Guide pages ────────────────────────────────────────────────────
  try {
    const guides = getGuides()
    for (const guide of guides) {
      for (const lang of LANGS) {
        entries.push({
          loc: BASE + "/" + lang + "/guide/" + guide.slug,
          lastmod: guide.publishedAt ? xmlDate(guide.publishedAt) : xmlDate(new Date()),
          changefreq: "weekly",
          priority: "0.8",
          alternates: langAlternates("/guide/" + guide.slug),
        })
      }
    }
  } catch (e) {
    console.warn("[sitemap] Warning: getGuides() failed:", e)
  }

  // ── Anxiety scenario pages ─────────────────────────────────────────
  try {
    const scenarios = getAnxietyScenarios()
    for (const scenario of scenarios) {
      for (const lang of LANGS) {
        entries.push({
          loc: BASE + "/" + lang + "/anxiety/" + scenario.slug,
          lastmod: xmlDate(new Date()),
          changefreq: "weekly",
          priority: "0.8",
          alternates: langAlternates("/anxiety/" + scenario.slug),
        })
      }
    }
  } catch (e) {
    console.warn("[sitemap] Warning: getAnxietyScenarios() failed:", e)
  }

  // ── Library topic pages ────────────────────────────────────────────
  try {
    const librarySlugs = getAllSlugs()
    for (const slug of librarySlugs) {
      for (const lang of LANGS) {
        entries.push({
          loc: BASE + "/" + lang + "/library/" + slug,
          lastmod: xmlDate(new Date()),
          changefreq: "weekly",
          priority: "0.8",
          alternates: langAlternates("/library/" + slug),
        })
      }
    }
  } catch (e) {
    console.warn("[sitemap] Warning: getAllSlugs() failed:", e)
  }

  // ── Standalone library pages ───────────────────────────────────────
  const standaloneLibraryPages = ["sleep-science-guide"]
  for (const slug of standaloneLibraryPages) {
    for (const lang of LANGS) {
      entries.push({
        loc: BASE + "/" + lang + "/library/" + slug,
        lastmod: xmlDate(new Date()),
        changefreq: "weekly",
        priority: "0.8",
        alternates: langAlternates("/library/" + slug),
      })
    }
  }

  return entries
}

// ── Main ───────────────────────────────────────────────────────────────

function main(): void {
  if (!fs.existsSync(OUT_DIR)) {
    console.error("[sitemap] ERROR: Build output directory not found: " + OUT_DIR)
    console.error("[sitemap] Run `next build` first to generate the `out/` directory.")
    process.exit(1)
  }

  const entries = buildEntries()
  const xmlLines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ]

  for (const entry of entries) {
    xmlLines.push(urlTag(entry))
  }
  xmlLines.push("</urlset>")

  const xml = xmlLines.join("\n") + "\n"

  fs.writeFileSync(SITEMAP_PATH, xml, "utf-8")
  console.log("[sitemap] Generated " + entries.length + " URL entries across " + LANGS.length + " locales.")
  console.log("[sitemap] Written " + SITEMAP_PATH)
}

main()

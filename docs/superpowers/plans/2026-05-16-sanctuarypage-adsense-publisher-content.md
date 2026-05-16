# SanctuaryPage AdSense Publisher Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `/{lang}` 首页首屏（1920×1080、无需滚动）静态呈现 ≥200 字“睡眠科学/心理学导论”发布商内容，并提供 `/guide` 与精选 `/topic/*` 内容入口以提升 AdSense 审核通过率。

**Architecture:** 将“发布商内容块”实现为 Server Component（SSR 可见），并重构 SanctuaryPage 为 Server Component 负责编排；交互模块继续使用现有 Client Components（AiCounselor、Video/Canvas 等）。

**Tech Stack:** Next.js 14 App Router、React Server Components、Tailwind CSS、Playwright（脚本验收）

---

## Files & Responsibilities

- Create: `src/components/PublisherContentBlock.tsx`（Server Component：首屏发布商内容块）
- Modify: `src/components/SanctuaryPage.tsx`（改为 Server Component：插入 PublisherContentBlock，调整 section id）
- Modify: `src/app/[lang]/page.tsx`（Server：读取 dict，向 SanctuaryPage 提供首屏文案 props）
- Modify: `src/components/HeroSection.tsx`（缩短 Hero 高度，确保首屏能露出 PublisherContentBlock 文本）
- Create: `check-adsense-fold.cjs`（Playwright 验收：无需滚动首屏可见 ≥200 字 + 链接存在）

---

### Task 1: Add SSR PublisherContentBlock (P0)

**Files:**
- Create: `src/components/PublisherContentBlock.tsx`

- [ ] **Step 1: Create a failing Playwright check skeleton**

Create `check-adsense-fold.cjs` (initial version should fail until component exists):

```js
const { chromium } = require("playwright")

const ORIGIN = "https://deepcalm-ai.com"
const URL = `${ORIGIN}/zh?v=${Date.now()}`

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
  const page = await context.newPage()

  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 })

  const block = page.locator('[data-testid="publisher-content"]')
  const count = await block.count()
  if (count === 0) {
    throw new Error("publisher content block not found")
  }

  await browser.close()
}

run().catch((err) => {
  process.stderr.write(String(err?.stack || err) + "\n")
  process.exit(1)
})
```

- [ ] **Step 2: Run the check to confirm it fails**

Run:
```bash
node check-adsense-fold.cjs
```

Expected: exit code 1 with `publisher content block not found`.

- [ ] **Step 3: Implement PublisherContentBlock (Server Component)**

Create `src/components/PublisherContentBlock.tsx`:

```tsx
import Link from "next/link"
import type { Locale } from "@/types"

export type PublisherTopic = {
  label: string
  slug: string
}

export default function PublisherContentBlock({
  lang,
  title,
  intro,
  topics,
}: {
  lang: Locale
  title: string
  intro: string
  topics: PublisherTopic[]
}) {
  return (
    <section className="relative z-10 w-full px-4 sm:px-6 -mt-10 pb-8">
      <div className="max-w-3xl mx-auto">
        <div
          data-testid="publisher-content"
          className="glass rounded-2xl p-6 sm:p-8 border border-dc-border/40 backdrop-blur-xl"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-dc-text leading-snug">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-dc-muted leading-relaxed">
            {intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link
              href={`/${lang}/guide`}
              className="inline-flex items-center px-4 py-2 rounded-full bg-dc-accent/15 text-dc-text border border-dc-accent/25 hover:bg-dc-accent/20 transition-colors text-sm"
            >
              科学指南总入口 →
            </Link>

            <div className="ml-1 text-xs text-dc-muted/70">
              深度探索：
            </div>

            {topics.map((t) => (
              <Link
                key={t.slug}
                href={`/${lang}/topic/${t.slug}`}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-dc-surface/60 text-dc-muted border border-dc-border hover:border-dc-accent/30 hover:text-dc-text transition-colors text-sm"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/PublisherContentBlock.tsx check-adsense-fold.cjs
git commit -m "feat: add ssr publisher content block"
```

---

### Task 2: Refactor SanctuaryPage as Server Component + Insert Block (P0/P1)

**Files:**
- Modify: `src/components/SanctuaryPage.tsx`

- [ ] **Step 1: Update SanctuaryPage to server-compose sections**

Key changes:
- Remove `"use client"` and `useLanguage` usage
- Accept `lang` + hero strings + publisher strings as props
- Insert `<PublisherContentBlock />` right after `<HeroSection />`
- Add `id="ai-counselor"` to the AI counselor section (Hero CTA anchor correctness)

Implementation sketch:

```tsx
import AiCounselor from "./AiCounselor"
import BackgroundCanvas from "./BackgroundCanvas"
import BackgroundVideo from "./BackgroundVideo"
import DailyCheckin from "./DailyCheckin"
import HeroSection from "./HeroSection"
import InlineScienceContent from "./InlineScienceContent"
import PublisherContentBlock, { type PublisherTopic } from "./PublisherContentBlock"
import ResonanceWall from "./ResonanceWall"
import SeoContent from "./SeoContent"
import SleepCalculator from "./SleepCalculator"
import type { Locale } from "@/types"

export default function SanctuaryPage({
  lang,
  heroTitle,
  heroSubtitle,
  heroCtaText,
  publisherTitle,
  publisherIntro,
  publisherTopics,
}: {
  lang: Locale
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  publisherTitle: string
  publisherIntro: string
  publisherTopics: PublisherTopic[]
}) {
  const videoMode = true

  return (
    <div className="relative min-h-screen">
      <BackgroundVideo src="/videos/forest.mp4" overlayOpacity={0.5} enabled={videoMode} />
      <BackgroundCanvas videoMode={videoMode} />

      <div className="fixed inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full animate-breathing-halo-4-7"
          style={{
            background: "radial-gradient(circle, rgba(126,184,255,0.12) 0%, rgba(106,90,205,0.08) 40%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full animate-breathe-inner-4-7"
          style={{
            background: "radial-gradient(circle, rgba(126,184,255,0.1) 0%, rgba(78,205,196,0.06) 35%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <main className="relative z-10">
        <HeroSection title={heroTitle} subtitle={heroSubtitle} ctaText={heroCtaText} />

        <PublisherContentBlock
          lang={lang}
          title={publisherTitle}
          intro={publisherIntro}
          topics={publisherTopics}
        />

        <section id="ai-counselor" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-10">
          <div className="w-full">
            <AiCounselor />
            <div className="mt-10">
              <InlineScienceContent />
            </div>
          </div>
        </section>

        <section id="daily-checkin" className="w-full py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <DailyCheckin />
          </div>
          <div className="mt-10">
            <InlineScienceContent />
          </div>
        </section>

        <section id="sleep-calculator" className="w-full py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <SleepCalculator />
          </div>
          <div className="mt-10">
            <InlineScienceContent />
          </div>
        </section>

        <section id="seo-content" className="w-full py-16 sm:py-24 px-4 sm:px-6">
          <SeoContent />
        </section>

        <section id="resonance-wall" className="w-full py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <ResonanceWall />
          </div>
          <div className="mt-10">
            <InlineScienceContent />
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 text-xs text-dc-muted/40 pointer-events-none">
        DeepCalm AI · Midnight Sanctuary
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SanctuaryPage.tsx
git commit -m "refactor: make sanctuary page server composed"
```

---

### Task 3: Move dict lookup to server page + wire props (P0/P1)

**Files:**
- Modify: `src/app/[lang]/page.tsx`

- [ ] **Step 1: Update page.tsx to pass SSR strings**

Implementation:

```tsx
import SanctuaryPage from "@/components/SanctuaryPage"
import { getDict, tt } from "@/lib/getDict"
import type { Locale } from "@/types"

const DEFAULT_PUBLISHER_TOPICS = [
  { label: "#REM睡眠", slug: "deep-sleep" },
  { label: "#CBT-I", slug: "insomnia" },
  { label: "#焦虑管理", slug: "sleep-anxiety" },
  { label: "#皮质醇控制", slug: "sleep-anxiety" },
]

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (lang as Locale) || "zh"
  const dict = getDict(locale)

  const heroTitle = tt(dict, "hero.title") || "DeepCalm AI"
  const heroSubtitle = tt(dict, "hero.subtitle") || ""
  const heroCtaText = tt(dict, "hero.cta") || "Start"

  const publisherTitle = tt(dict, "seoContent.title") || "Sleep Science"
  const publisherIntro = tt(dict, "seoContent.p1") || ""

  return (
    <SanctuaryPage
      lang={locale}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      heroCtaText={heroCtaText}
      publisherTitle={publisherTitle}
      publisherIntro={publisherIntro}
      publisherTopics={DEFAULT_PUBLISHER_TOPICS}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/[lang]/page.tsx
git commit -m "feat: ssr wire publisher content into home"
```

---

### Task 4: Ensure Above-the-Fold visibility by resizing Hero (P1)

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Reduce Hero vertical height**

Change the outer section from `min-h-screen` to a smaller desktop height so the PublisherContentBlock can appear in the first viewport.

Implementation change:

- Replace:
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
```

- With:
```tsx
<section className="relative min-h-[58vh] sm:min-h-[62vh] flex items-center justify-center overflow-hidden pt-14">
```

Also change the arrow container to avoid pushing fold content:

- Replace:
```tsx
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
```
- With:
```tsx
<div className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-float">
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "style: shrink hero for adsense above-the-fold content"
```

---

### Task 5: Verification (Acceptance Criteria)

**Files:**
- Modify: `check-adsense-fold.cjs`
- Run: `npm run build`

- [ ] **Step 1: Upgrade Playwright check to validate fold visibility + text length + links**

Update `check-adsense-fold.cjs`:

```js
const { chromium } = require("playwright")
const path = require("path")
const fs = require("fs")

const ORIGIN = "https://deepcalm-ai.com"
const URL = `${ORIGIN}/zh?v=${Date.now()}`

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
  const page = await context.newPage()

  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 })
  await page.waitForTimeout(1500)

  const block = page.locator('[data-testid="publisher-content"]')
  await block.waitFor({ timeout: 15000 })

  const text = await block.innerText()
  const normalized = text.replace(/\s+/g, " ").trim()
  if (normalized.length < 200) {
    throw new Error(`publisher content text too short: ${normalized.length}`)
  }

  const box = await block.boundingBox()
  if (!box) throw new Error("publisher content bounding box missing")
  if (box.y + box.height > 1080) {
    throw new Error(`publisher content not fully above fold: y+height=${box.y + box.height}`)
  }

  const guideLink = page.locator('a[href^="/zh/guide"]')
  if ((await guideLink.count()) === 0) {
    throw new Error("missing /zh/guide link")
  }

  const topicLinks = page.locator('a[href^="/zh/topic/"]')
  const topicCount = await topicLinks.count()
  if (topicCount < 3) {
    throw new Error(`expected >=3 topic links, got ${topicCount}`)
  }

  const screenshotPath = path.resolve(__dirname, "screenshots", "adsense_fold_zh.png")
  if (!fs.existsSync(path.dirname(screenshotPath))) fs.mkdirSync(path.dirname(screenshotPath), { recursive: true })
  await page.screenshot({ path: screenshotPath, fullPage: false })

  await browser.close()
  process.stdout.write(`OK: ${URL}\nScreenshot: ${screenshotPath}\n`)
}

run().catch((err) => {
  process.stderr.write(String(err?.stack || err) + "\n")
  process.exit(1)
})
```

- [ ] **Step 2: Build**

Run:
```bash
npm run build
```
Expected: exit code 0.

- [ ] **Step 3: Run fold check**

Run:
```bash
node check-adsense-fold.cjs
```
Expected: exit code 0 and screenshot path printed.

- [ ] **Step 4: Commit verification script**

```bash
git add check-adsense-fold.cjs
git commit -m "test: add adsense above-the-fold publisher content check"
```

---

### Task 6: Deploy & Backup

- [ ] **Step 1: Push to GitHub main**

```bash
git push
```

- [ ] **Step 2: Dropbox backup**

Mirror repo into:
`C:\Users\User\Dropbox\deepcalm-ai-backup\deepcalm-ai`
excluding: `.git`, `.next`, `node_modules`

---

## Spec Coverage Self-Review

- P0 PublisherContentBlock：Task 1 + Task 2 + Task 3
- P1 深度探索入口：Task 1 + Task 3
- P1 去调试感/无 key 泄露：依赖 LanguageContext fallback（已存在）+ 验收脚本不包含 key 检测可加一条：`normalized.includes("aiCounselor.")` 为 false（可选加固）
- 验收：Task 5（build + fold check + screenshot）


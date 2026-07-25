# DeepCalm GSC/AdSense 合规优化 执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标:** 完成 DeepCalm 项目的 4 项 GSC（Google Search Console）和 AdSense 合规改造：HTTPS 安全加固、站点地图与内容发现优化、低质内容 UI 整改、Core Web Vitals 性能优化。

**架构方案:**
- 全站基于 Next.js 14 App Router，`[lang]` 动态路由段实现 7 语种（zh, en, ms, ja, ko, th, es）
- 安全策略通过 `vercel.json` 的 HSTS + `next.config.js` 的 `Content-Security-Policy` 双层加固
- 诊断/学习/图书馆三大页面分别使用 `dc-*`（深色）、`nord-*`（中色）、`slate-*`（浅色）三套调色板
- `SsrAccordion` 组件通过 `className` 透传来适配不同调色板上下文
- Sitemap 通过 `src/app/sitemap.ts` 动态生成，覆盖所有 7 语种 × ~155 话题 + 7 图书馆页 ≈ 1087 URL

**技术栈:**
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- next-intl v4（国际化）
- Vercel 部署（vercel.json 配置）


---

### 任务 1: 根布局 canonical + hreflang 注入

**文件:**
- 修改: `_Projects/DeepCalm/src/app/[lang]/layout.tsx:14-21`

- [ ] **步骤 1: 更新 `generateMetadata` 添加 `alternates` 规范标签**

  修改 `src/app/[lang]/layout.tsx` 中 `generateMetadata` 函数，在返回对象中添加 `alternates.canonical` 和 `alternates.languages` 字段：

  ```tsx
  export function generateMetadata({ params: { lang } }: { params: { lang: string } }): Metadata {
    const baseUrl = "https://deepcalm-ai.com"

    return {
      title: "DeepCalm AI — Midnight Sanctuary",
      description:
        "Find your calm in the quiet hours. Breathwork, sleep stories, anxiety relief & AI-guided meditation for the midnight mind.",
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: `/${lang}`,
        languages: {
          "zh": "/zh",
          "en": "/en",
          "ms": "/ms",
          "ja": "/ja",
          "ko": "/ko",
          "th": "/th",
          "es": "/es",
          "x-default": "/en",
        },
      },
    }
  }
  ```

- [ ] **步骤 2: 验证编译通过**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无 `error` 输出，构建成功


### 任务 2: 根布局文字颜色对比度修正（AdSense 合规）

**文件:**
- 修改: `_Projects/DeepCalm/src/app/[lang]/layout.tsx:36`

- [ ] **步骤 1: 将 `text-dc-text` 替换为 `text-slate-800`**

  当前第 36 行:
  ```tsx
  <div className="dark min-h-screen bg-dc-deep text-dc-text">
  ```
  修改为:
  ```tsx
  <div className="dark min-h-screen bg-dc-deep text-slate-800">
  ```

  **说明:** `text-dc-text` 映射为 `#E8EDF5`（浅灰蓝），与深色背景对比度不足 AdSense 要求。`text-slate-800` (#1E293B) 提供更高对比度。

- [ ] **步骤 2: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 3: HSTS 安全头注入（`vercel.json`）

**文件:**
- 修改: `_Projects/DeepCalm/vercel.json:19-34`

- [ ] **步骤 1: 在 `/(.*)` 来源的 headers 中添加 `Strict-Transport-Security`**

  当前 `vercel.json` 的 headers 段:
  ```json
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      }
    ]
  }
  ```
  修改为:
  ```json
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      },
      {
        "key": "Strict-Transport-Security",
        "value": "max-age=31536000; includeSubDomains; preload"
      }
    ]
  }
  ```

- [ ] **步骤 2: 验证 JSON 格式正确**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && type vercel.json | findstr "Strict-Transport-Security"`

  预期: 包含 `"Strict-Transport-Security"` 条目


### 任务 4: Content-Security-Policy 注入（`next.config.js`）

**文件:**
- 修改: `_Projects/DeepCalm/next.config.js:1-7`

- [ ] **步骤 1: 在 `next.config.js` 中添加 `async headers()`**

  当前文件完整内容:
  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: { unoptimized: true },
  }
  module.exports = nextConfig
  ```
  修改为:
  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: { unoptimized: true },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://*.googletagmanager.com https://www.googletagmanager.com",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://pagead2.googlesyndication.com",
                "img-src 'self' data: blob: https:",
                "font-src 'self' data: https://fonts.gstatic.com",
                "connect-src 'self' https://deepcalm-ai.com https://*.googletagmanager.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
                "frame-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
                "media-src 'self' https: blob:",
                "worker-src 'self' blob:",
              ].join("; "),
            },
          ],
        },
      ]
    },
  }
  module.exports = nextConfig
  ```

  **说明:** CSP 策略允许 Google AdSense 脚本（`pagead2.googlesyndication.com`）、Google Tag Manager、Google Fonts 和 Google 广告图片 CDN，同时严格限制 `default-src 'self'`。

- [ ] **步骤 2: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 5: 创建 Sitemap 生成器

**文件:**
- 创建: `_Projects/DeepCalm/src/app/sitemap.ts`

- [ ] **步骤 1: 创建 `src/app/sitemap.ts`**

  ```ts
  import { MetadataRoute } from "next"

  const BASE_URL = "https://deepcalm-ai.com"
  const LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"] as const

  // 话题 slug 列表 —— 从内容层获取
  function getAllSlugs(): string[] {
    // 与 topic/[slug]/page.tsx 中的 getAllSlugs() 保持一致
    const slugs: string[] = [
      "sleep-reboot",
      "anxiety-relief",
      "rem-optimization",
      "stress-reset",
      "emotional-balance",
      "focus-clarity",
      "self-compassion",
      "inner-criticism",
      "relationship-repair",
      "deep-rest",
      "grief-processing",
      "burnout-recovery",
      "self-worth",
      "social-anxiety",
      "screen-addiction",
      "insomnia",
      "panic-attack",
      "chronic-pain-mindfulness",
      "adhd-focus",
      "anger-management",
      "impostor-syndrome",
      "limerence-recovery",
      "cptsd-grounding",
      "high-functioning-anxiety",
      "emotional-numbness",
      "perfectionism",
      "dpdr-grounding",
      "post-breakup-recovery",
      "pregnancy-anxiety",
      "postpartum-mental-health",
      "post-surgery-anxiety",
      "cancer-caregiver-burnout",
      "anticipatory-grief",
      "ptsd-sleep",
      "veteran-ptsd",
      "fear-of-flying",
      "needle-phobia",
      "dental-anxiety",
      "health-anxiety",
      "climate-anxiety",
      "eco-grief",
      "compassion-fatigue",
      "nurse-burnout",
      "alzheimers-caregiver",
      "artist-block",
      "creative-writers-block",
      "performer-anxiety",
      "competitive-pressure",
      "public-speaking-anxiety",
      "exam-anxiety",
      "academic-burnout",
      "impostor-student",
      "financial-anxiety",
      "gambling-urge",
      "minimalism-anxiety",
      "digital-minimalism",
      "aspd-emotional-regulation",
      "bpd-identity-disturbance",
      "quiet-bpd",
      "avpd-social-avoidance",
      "ocd-intrusive-thoughts",
      "ocd-just-right",
      "hoarding-anxiety",
      "bipolar-rumination",
      "cyclothymia-grounding",
      "pmdd-anxiety",
      "endometriosis-chronic-pain",
      "menopause-insomnia",
      "andropause-anxiety",
      "autoimmune-fatigue",
      "fibromyalgia-sleep",
      "ibs-gut-anxiety",
      "migraine-anxiety",
      "tinnitus-distress",
      "long-covid-brain-fog",
      "pots-anxiety",
      "concussion-recovery",
      "als-anxiety",
      "ms-emotional-health",
      "tourette-anxiety",
      "stuttering-anxiety",
      "tinnitus-anxiety",
      "misophonia-anxiety",
      "misokinesia-stress",
      "skin-picking-excoriation",
      "hair-pulling-trichotillomania",
      "body-dysmorphia",
      "muscle-dysmorphia",
      "orthorexia-recovery",
      "night-eating-syndrome",
      "pica-anxiety",
      "emetophobia",
      "thanatophobia",
      "nosophobia",
      "fear-of-darkness",
      "fear-of-thunder-astraphobia",
      "claustrophobia",
      "agoraphobia",
      "driving-phobia",
      "fear-of-heights-acrophobia",
      "blood-injection-injury-phobia",
      "social-media-anxiety",
      "ai-anxiety",
      "technostress",
      "nomophobia",
      "eco-anxiety",
      "climate-grief-children",
      "vegan-anxiety",
      "pandemic-anxiety",
      "covid-19-survivors",
      "quarantine-insomnia",
      "mask-anxiety-children",
      "long-covid-emotional",
      "war-anxiety",
      "existential-dread",
      "moral-injury",
      "intergenerational-trauma",
      "historical-trauma",
      "racial-trauma",
      "refugee-anxiety",
      "immigration-anxiety",
      "acculturation-stress",
      "deportation-anxiety",
      "expat-anxiety",
      "third-culture-kid-anxiety",
      "repatriation-anxiety",
      "single-parent-burnout",
      "only-child-anxiety",
      "adult-orphan-grief",
      "pet-loss-grief",
      "secondary-trauma",
      "abstract-art-anxiety",
      "math-anxiety",
      "impostor-creativity",
      "writer-anxiety",
      "reading-anxiety",
      "synesthesia-overload",
      "misophonia-relationships",
      "highly-sensitive-person",
      "empath-burnout",
      "emotional-contagion",
      "introvert-social-recovery",
      "extrovert-loneliness",
      "ambiguous-loss",
      "disenfranchised-grief",
      "complicated-grief",
      "absent-grief",
      "delayed-grief",
      "collective-grief",
      "solastalgia",
      "nostalgia-depression",
      "anemoia-anxiety",
      "hikikomori-recovery",
      "social-withdrawal",
      "quiet-quitting-burnout",
      "burnout-shame",
      "functional-freeze",
      "dissociation-grounding",
      "monotropism-anxiety",
      "sensory-overload-autism",
      "masking-autism-burnout",
      "audhd-emotional-regulation",
      "dyspraxia-anxiety",
      "alexithymia-emotional-awareness",
      "face-blindness-social-anxiety",
      "aphantasia-meditation",
      "savant-anxiety",
      "age-regression-stress",
      "inner-child-reparenting",
      "parts-work-anxiety",
      "shadow-work-fear",
    ]
    return slugs
  }

  export async function generateSitemaps() {
    // 当 slug 总数超过 50000 时分片，当前 ~155 个无需分片
    return [{ id: 0 }]
  }

  export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
    const slugs = getAllSlugs()

    // 所有语种的话题页面
    const topicEntries = slugs.flatMap((slug) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}/${locale}/topic/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    )

    // 所有语种的图书馆页面
    const libraryEntries = LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/library/science-of-calm`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    // 首页（各语种）
    const homeEntries = LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    }))

    return [...homeEntries, ...topicEntries, ...libraryEntries]
  }
  ```

  **说明:**
  - 7 locales × ~155 slugs = ~1085 topic pages
  - 7 locales × 1 library = 7 library pages
  - 7 home pages
  - 总计 ~1099 条 URL（覆盖要求的 1087+）
  - `changeFrequency` 和 `priority` 按页面类型分级

- [ ] **步骤 2: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 6: 修复 `topic/[slug]` 的 `generateStaticParams` —— 补全所有 7 语种

**文件:**
- 修改: `_Projects/DeepCalm/src/app/[lang]/topic/[slug]/page.tsx:48-58`

- [ ] **步骤 1: 将语种数组从 3 个扩展为 7 个**

  找到第 48-58 行的 `generateStaticParams`:
  ```tsx
  export async function generateStaticParams() {
    const slugs = getAllSlugs()
    const langs: Locale[] = ["zh", "en", "ms"]
    const params: { lang: string; slug: string }[] = []

    for (const lang of langs) {
      for (const slug of slugs) {
        params.push({ lang, slug })
      }
    }
    return params
  }
  ```
  修改为:
  ```tsx
  export async function generateStaticParams() {
    const slugs = getAllSlugs()
    const langs: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]
    const params: { lang: string; slug: string }[] = []

    for (const lang of langs) {
      for (const slug of slugs) {
        params.push({ lang, slug })
      }
    }
    return params
  }
  ```

- [ ] **步骤 2: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 7: 删除 `topic/[slug]` 中的死代码（不可达 `redirect`）

**文件:**
- 修改: `_Projects/DeepCalm/src/app/[lang]/topic/[slug]/page.tsx:215`

- [ ] **步骤 1: 删除第 215 行的不可达代码块**

  找到第 215 行的内容:
  ```tsx
    }
    redirect(`/${lang}/library/${slug}`, RedirectType.replace)
  ```

  这是 `try/catch` 块关闭后的不可达代码（`return notFound()` 之前已经 return）。直接删除 `redirect(...)` 这一整行。

  修改后第 215 行应该只是:
  ```tsx
  ```

  （空行，或直接删除该行。）

- [ ] **步骤 2: 确认没有 import 残留**

  检查文件头部，如果有 `import { redirect, RedirectType } from "next/navigation"`，且 `redirect` 不再被其他地方使用，删除 `redirect` 和 `RedirectType`。

  如果文件其他位置没有使用 `redirect` 和 `RedirectType`，将 import 行从:
  ```tsx
  import { redirect, RedirectType } from "next/navigation"
  ```
  修改为:
  ```tsx
  import { notFound } from "next/navigation"
  ```

- [ ] **步骤 3: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 8: 在 `topic/[slug]` 中封装 Science 段到 `SsrAccordion`

**文件:**
- 修改: `_Projects/DeepCalm/src/app/[lang]/topic/[slug]/page.tsx:134-143`
- 引用: `_Projects/DeepCalm/src/components/SsrAccordion.tsx`

- [ ] **步骤 1: 引入 `SsrAccordion`**

  在文件头部 imports 区域添加:
  ```tsx
  import { SsrAccordion } from "@/components/SsrAccordion"
  ```

- [ ] **步骤 2: 将 Science 原始 prose 包装进 `SsrAccordion`**

  找到第 134-143 行的 Science 段落:
  ```tsx
              {/* 🔬 The Science — full text for SEO */}
              <div className="mt-4 space-y-2 text-xs leading-relaxed text-nord-muted">
                <h3 className="text-sm font-bold">🔬 The Science</h3>
                {content.science.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
  ```
  修改为:
  ```tsx
              {/* 🔬 The Science — folded accordion for AdSense compliance */}
              <SsrAccordion
                title="🔬 The Science"
                defaultOpen={false}
                className="mt-4 border-nord-border/30 bg-nord-card/30 backdrop-blur-sm"
              >
                <div className="space-y-2 text-xs leading-relaxed text-nord-muted px-5 pb-4">
                  {content.science.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </SsrAccordion>
  ```

  **说明:** 通过 `className` 传入 `nord-*` 色调类名覆盖 `SsrAccordion` 内部默认的 `dc-*` 类名。`SsrAccordion` 已将 `className` 透传到外层 wrapper div。

- [ ] **步骤 3: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 9: 在 `library/[slug]` 中封装 Science 段到 `SsrAccordion`

**文件:**
- 修改: `_Projects/DeepCalm/src/app/[lang]/library/[slug]/page.tsx:157-169`
- 引用: `_Projects/DeepCalm/src/components/SsrAccordion.tsx`

- [ ] **步骤 1: 引入 `SsrAccordion`**

  在文件头部 imports 区域添加:
  ```tsx
  import { SsrAccordion } from "@/components/SsrAccordion"
  ```

- [ ] **步骤 2: 将 Science 段包装进 `SsrAccordion`（slate 调色板）**

  找到第 157-169 行的 Science 段:
  ```tsx
          <div id="science" className="p-6 sm:p-8 bg-white/98 backdrop-blur-[100px] border border-slate-200/30 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] scroll-mt-24">
            <h2 className="text-lg font-bold text-slate-900 mb-4">🔬 The Science</h2>
            <div className="prose prose-invert max-w-none prose-p:text-slate-800 prose-p:leading-relaxed">
              {content.science.split("\n").filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
  ```
  修改为:
  ```tsx
          <div id="science" className="scroll-mt-24">
            <SsrAccordion
              title="🔬 The Science"
              defaultOpen={false}
              className="border border-slate-200/30 bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              <div className="p-6 sm:p-8 pt-0">
                <div className="prose prose-invert max-w-none prose-p:text-slate-800 prose-p:leading-relaxed">
                  {content.science.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </SsrAccordion>
          </div>
  ```

  **说明:** 同时实现了两层优化:
  1. Science 内容折叠到 `SsrAccordion`（AdSense 低质内容合规）
  2. 背景不透明度从 `bg-white/98` 提升到 `bg-white/95`，`backdrop-blur-[100px]` 改为 `backdrop-blur-3xl`（AdSense 对比度要求）

- [ ] **步骤 3: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 10: 为 `ActionableToolCards` 添加"开始 5 分钟 AI 冥想"CTA 按钮

**文件:**
- 修改: `_Projects/DeepCalm/src/components/ActionableToolCards.tsx:17-91`

- [ ] **步骤 1: 在每张卡片的底部插入 CTA 按钮**

  找到 `CARDS` 数组中的每个卡片定义（第 17-91 行，每个卡片有 `title`、`hook` 和 `tools` 字段）。在每个卡片对象的 `tools` 数组末尾添加一个 CTA 按钮条目。

  修改 `CARDS` 数组，在每个卡片对象中添加 `tools` 数组的最后一个元素。

  当前每个卡片的结构示例（第 68-76 行 Sleep Reboot 卡片的 tools）:
  ```tsx
  export const CARDS: ToolCard[] = [
    {
      id: "sleep-reboot",
      badge: "E‑E‑A‑T",
      icon: "🌙",
      title: "Sleep Reboot",
      hook: "Fall asleep in 8 minutes with AI‑driven binaural guidance",
      gradient: "from-indigo-600/20 via-purple-600/10 to-transparent",
      href: "/en/topic/sleep-reboot",
      action: undefined,
      tools: [
        { label: "Sleep Story", href: "/en/topic/sleep-reboot#story", emoji: "📖" },
      ],
    },
  ```

  修改为（在每个卡片的 `tools` 末尾追加 CTA）:
  ```tsx
  export const CARDS: ToolCard[] = [
    {
      id: "sleep-reboot",
      badge: "E‑E‑A‑T",
      icon: "🌙",
      title: "Sleep Reboot",
      hook: "Fall asleep in 8 minutes with AI‑driven binaural guidance",
      gradient: "from-indigo-600/20 via-purple-600/10 to-transparent",
      href: "/en/topic/sleep-reboot",
      action: undefined,
      tools: [
        { label: "Sleep Story", href: "/en/topic/sleep-reboot#story", emoji: "📖" },
        { label: "Start 5‑Minute AI Meditation", href: "/en/topic/sleep-reboot", emoji: "🧘" },
      ],
    },
    {
      id: "anxiety-relief",
      badge: "E‑E‑A‑T",
      icon: "🌊",
      title: "Anxiety Relief",
      hook: "Calm your nervous system with resonant breathing",
      gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
      href: undefined,
      action: "breathing",
      tools: [
        { label: "4‑7‑8 Breathing", action: "breathing", emoji: "🌬️" },
        { label: "Start 5‑Minute AI Meditation", href: "/en/topic/anxiety-relief", emoji: "🧘" },
      ],
    },
    {
      id: "rem-optimization",
      badge: "E‑E‑A‑T",
      icon: "🧠",
      title: "REM Optimization",
      hook: "Deepen your sleep cycles with adaptive soundscapes",
      gradient: "from-violet-600/20 via-fuchsia-600/10 to-transparent",
      href: undefined,
      action: "anchor",
      tools: [
        { label: "REM Anchor", action: "anchor", emoji: "⚓" },
        { label: "Start 5‑Minute AI Meditation", href: "/en/topic/rem-optimization", emoji: "🧘" },
      ],
    },
  ]
  ```

- [ ] **步骤 2: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 11: `SsrAccordion` 组件调色板兼容性加固

**文件:**
- 修改: `_Projects/DeepCalm/src/components/SsrAccordion.tsx:29-57`

- [ ] **步骤 1: 添加 `defaultOpen` prop 支持并继承外部调色板**

  当前 `SsrAccordion` 第 29-57 行（简化）:
  ```tsx
  export function SsrAccordion({
    title,
    children,
    className,
  }: {
    title: string
    children: React.ReactNode
    className?: string
  }) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    // ... useEffect ...

    return (
      <div className={`rounded-2xl border border-dc-border/30 bg-dc-surface/30 backdrop-blur-sm ${className}`}>
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-dc-text hover:text-dc-accent transition-colors"
        >
          <span>{title}</span>
          <ChevronDown className={`w-4 h-4 shrink-0 text-dc-muted transition-transform duration-300 ${mounted && open ? "rotate-180" : ""}`} />
        </button>
        {mounted ? (
          open && <div className="px-5 pb-4">{children}</div>
        ) : (
          <div className="sr-only">{children}</div>
        )}
      </div>
    )
  }
  ```

  修改为:
  ```tsx
  export function SsrAccordion({
    title,
    children,
    className,
    defaultOpen = false,
  }: {
    title: string
    children: React.ReactNode
    className?: string
    defaultOpen?: boolean
  }) {
    const [open, setOpen] = useState(defaultOpen)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    return (
      <div className={`rounded-2xl border border-dc-border/30 bg-dc-surface/30 backdrop-blur-sm ${className ?? ""}`}>
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-dc-text hover:text-dc-accent transition-colors"
        >
          <span>{title}</span>
          <ChevronDown
            className={`w-4 h-4 shrink-0 text-dc-muted transition-transform duration-300 ${mounted && open ? "rotate-180" : ""}`}
          />
        </button>
        {mounted ? (
          open && <div>{children}</div>
        ) : (
          <div className="sr-only">{children}</div>
        )}
      </div>
    )
  }
  ```

  **关键改动:**
  1. 添加 `defaultOpen` prop（默认 `false`），允许调用方传递 `defaultOpen={false}` 使折叠闭合
  2. `className` 接上 `?? ""` 保证不为 null
  3. 移除了内部 `<div className="px-5 pb-4">` 的硬编码 padding —— 让调用方通过外层 div 或传入的 `className` 控制 padding，避免 dc-* padding 与 nord/slate 调色板冲突
  4. 保留 `dc-*` 默认样式作为后备，调用方通过 `className` 传入的 `border-nord-*` / `bg-white/95` 等类名会覆盖

- [ ] **步骤 2: 验证构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build 2>&1 | findstr /i "error"`

  预期: 无错误


### 任务 12: 全量构建验收

- [ ] **步骤 1: 运行完整生产构建**

  运行: `cd /d C:\Users\User\Desktop\_Projects\DeepCalm && npx next build`

  预期: 构建成功，无 TypeScript 错误、无 ESLint 错误


### 任务 13: Git 提交

- [ ] **步骤 1: 提交所有更改**

  ```bash
  cd /d C:\Users\User\Desktop\_Projects\DeepCalm
  git add src/app/[lang]/layout.tsx
  git add src/app/[lang]/topic/[slug]/page.tsx
  git add src/app/[lang]/library/[slug]/page.tsx
  git add src/components/ActionableToolCards.tsx
  git add src/components/SsrAccordion.tsx
  git add src/app/sitemap.ts
  git add vercel.json
  git add next.config.js
  git commit -m "feat: GSC/AdSense compliance - HSTS, CSP, sitemap, contrast, accordion folding, CTA buttons"
  ```

- [ ] **步骤 2: 推送**

  ```bash
  git push
  ```


## 自我审查

**1. Spec 覆盖:**

| 需求 | 对应任务 |
|------|----------|
| HTTPS 安全加固 — HSTS 头 | 任务 3 |
| HTTPS 安全加固 — CSP 头 | 任务 4 |
| Sitemap 覆盖 1087+ 页面 | 任务 5 |
| 全语种 canonical/hreflang 标签 | 任务 1 |
| 修复 topic generateStaticParams（3→7 语种）| 任务 6 |
| 文字颜色 #E8EDF5 → #1E293B | 任务 2 |
| 白色背景不透明度 → 95% + backdrop-blur-3xl | 任务 9 |
| Science 段折叠入 SsrAccordion（topic）| 任务 8 |
| Science 段折叠入 SsrAccordion（library）| 任务 9 |
| Night Wisdom Hall 卡片 CTA 按钮 | 任务 10 |
| 删除 topic/[slug] 死代码 | 任务 7 |
| Core Web Vitals — 背景视频懒加载 | ✅ 已完成 |
| Core Web Vitals — 音频引擎懒加载 | ✅ 已完成 |
| Core Web Vitals — INP 优化 | 外部组件（DailyCheckin）|

**2. 占位符扫描:** 无 TODO、TBD、"implement later" 等占位符。

**3. 类型一致性:** 所有组件 props、函数签名在任务间保持一致。`SsrAccordion` 的 `defaultOpen` prop 在所有调用点（任务 8、任务 9）统一使用 `defaultOpen={false}`。

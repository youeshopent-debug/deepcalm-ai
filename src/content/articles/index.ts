import type { Locale } from '@/types'
import insomnia from './insomnia.json'

/**
 * 独立文章内容注册表
 *
 * 设计目标：
 * 1. 让指定 slug 的正文（science / fitness / faq）脱离 topic-content-templates.ts 的模板生成，
 *    改由人工撰写的独立文章提供。
 * 2. 支持 7 语言：zh / en / ms / ja / ko / th / es。
 * 3. 语言缺失时按固定回退链兜底：目标语言 → en → zh。
 * 4. 向后兼容：未在此注册表中登记的 slug，行为与改造前完全一致（继续走模板）。
 *
 * 新增一篇文章只需两步：
 *   a. 在 src/content/articles/ 下新建 <slug>.json
 *   b. 在本文件 import 并登记到 ARTICLES
 */

/** 单语言的独立文章内容 */
export interface ArticleLocaleContent {
  /** 科学解读正文（纯段落文本，渲染器不支持 Markdown 标题语法） */
  science: string
  /** 身心调节建议正文（支持 "## " 小标题与 "1." 有序列表） */
  fitness: string
  /** 常见问答，[问题, 答案] 二元组数组 */
  faq: [string, string][]
}

/** 一篇文章的多语言集合，键为 Locale */
export type ArticleContent = Partial<Record<Locale, ArticleLocaleContent>>

/** 语言回退链：目标语言 → en → zh */
const FALLBACK_CHAIN: Locale[] = ['en', 'zh']

/** 独立文章注册表：slug → 多语言内容 */
const ARTICLES: Record<string, ArticleContent> = {
  insomnia: insomnia as unknown as ArticleContent,
}

/**
 * 判断某个语言条目是否为结构合法的独立内容。
 * 任一必需字段缺失或类型不符，即视为非法，交由回退链继续尝试。
 */
function isValidLocaleContent(value: unknown): value is ArticleLocaleContent {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  if (typeof v.science !== 'string' || v.science.trim().length === 0) return false
  if (typeof v.fitness !== 'string' || v.fitness.trim().length === 0) return false
  if (!Array.isArray(v.faq)) return false
  return v.faq.every(
    (item) =>
      Array.isArray(item) &&
      item.length === 2 &&
      typeof item[0] === 'string' &&
      typeof item[1] === 'string'
  )
}

/**
 * 取指定 slug 的独立文章（未登记则返回 undefined）。
 */
export function getArticle(slug: string): ArticleContent | undefined {
  return ARTICLES[slug]
}

/**
 * 按回退链解析出目标语言可用的独立内容。
 *
 * 顺序：目标语言 → en → zh。
 * 全部不可用（未登记 / 结构非法 / 字段为空）时返回 undefined，
 * 调用方据此落回模板生成，保证页面永不空白。
 */
export function resolveArticleLang(
  article: ArticleContent | undefined,
  lang: Locale
): ArticleLocaleContent | undefined {
  if (!article) return undefined

  const candidates: Locale[] = [lang, ...FALLBACK_CHAIN.filter((l) => l !== lang)]
  for (const candidate of candidates) {
    const content = article[candidate]
    if (isValidLocaleContent(content)) return content
  }
  return undefined
}

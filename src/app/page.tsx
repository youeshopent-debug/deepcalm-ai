/**
 * 根路由页面 — 静态重定向到 /en
 *
 * 里程碑说明（Vercel → Cloudflare Pages 迁移）：
 * - 原版使用 cookies() + redirect() 检测用户 locale cookie 后做 308 跳转
 * - 静态导出 (output: "export") 不支持 cookies() 等动态 API
 * - 该 locale 检测逻辑已迁移至 functions/_middleware.js 中实现
 * - 此处作为纯静态入口，Cloudflare 中间件在请求时接管路由
 *
 * @see functions/_middleware.js — Cloudflare Pages 中间件（locale 检测 + 308 重定向）
 */

export default function RootPage() {
  return null
}

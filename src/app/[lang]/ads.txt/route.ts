/**
 * 多语言 ads.txt 所有权验证路由
 *
 * 背景：Google AdSense 所有权验证要求 ads.txt 在根域名（deepcalm-ai.com/ads.txt）
 * 以及所有多语言子路由（/zh/ads.txt、/en/ads.txt 等）下均可直接访问。
 * 根域名由 public/ads.txt 静态文件覆盖；本 Route Handler 利用 [lang] 动态段
 * 为全部 7 个语言子路由返回相同内容，零重定向、零延迟。
 *
 * 内容必须与 public/ads.txt 严格保持一致，避免所有权验证不一致。
 */

const ADS_TXT_CONTENT =
  "google.com, pub-9587418043365530, DIRECT, f08c47fec0942fa0\n"

export const runtime = "nodejs"

export function GET() {
  return new Response(ADS_TXT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  })
}

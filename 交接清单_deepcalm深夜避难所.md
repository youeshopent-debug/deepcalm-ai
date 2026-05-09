# DeepCalm AI "深夜避难所" 升级 — 交接清单

## 改动文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/AmbientAudio.tsx` | 新建 | 深夜沉浸音频组件 |
| `src/components/ResonanceWall.tsx` | 新建 | 深夜共鸣墙组件 |
| `src/app/[lang]/page.tsx` | 修改 | 引入 AmbientAudio + ResonanceWall，置于 AiHypnotist 与 SeoContent 间 |
| `tailwind.config.ts` | 修改 | 新增 `breath-light` 动画 |
| `dictionaries/zh.json` | 修改 | 新增 `resonanceWall` 段落 |
| `dictionaries/en.json` | 修改 | 新增 `resonanceWall` 段落 |
| `dictionaries/ms.json` | 修改 | 新增 `resonanceWall` 段落 |
| `src/app/api/analyze-anxiety/route.ts` | 修改 | System Prompt 升级 — 共情意象首句+通俗化灾难思维拆解+感官锚点强化 |
| `src/app/sitemap.ts` | 修改 | hreflang alternates 从全部指向首页改为按页面路径 |

## 架构要点

- **音频组件**：依赖 `src/lib/audioEngine.ts` 单例，调用 `toggleChannel('rain'|'wind'|'fire', boolean)`，250ms 线性淡入淡出
- **共鸣墙**：纯客户端（localStorage），最多 30 条消息，500-2000 随机访客计数 ±10 每 30 秒抖动
- **关键词过滤**：13 个中英文黑名单词，简单 string.includes 匹配（小写归一化）
- **多语言**：zh/en/ms 三语各有 7 条预设留言
- **System Prompt**：已有 CBT 框架基础上加强共情表达和感官锚点
- **Sitemap**：`langAlternates(path)` 函数生成每个页面的三语 alternates

## 待确认事项

- [ ] 音频组件需要用户首次交互（click/tap）才能播放 Web Audio
- [ ] 共鸣墙暂无后台审核，关键词过滤为简单黑名单
- [ ] 如需部署到 Vercel，手动触发重新部署即可

## Build 状态

✅ `npm run build` 通过 — 35/35 静态页面生成，零报错

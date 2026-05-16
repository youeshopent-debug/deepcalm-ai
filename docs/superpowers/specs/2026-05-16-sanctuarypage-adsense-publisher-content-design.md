## 背景与目标

DeepCalm 需要通过 Google AdSense 审核。审核侧重点是“发布商内容”是否在页面上清晰可见、可读、可索引，而非开发者控制台噪音。

本任务的目标是执行方案 A：重构首页内容层级，在首屏（1920×1080，无需滚动）提供静态渲染的科学/心理学导论文本，并提供内容分发入口，降低“纯工具/尚在建设中”的审核观感。

## 范围（P0/P1）

### P0：新增 PublisherContentBlock（核心）

- 插入位置：HeroSection 之后，且必须在 AiCounselor 与其他工具模块之前。
- 内容来源：dictionaries 内的 seoContent.p1（约 300 字导论）。
- 渲染要求：
  - 文本必须 SSR 可见：不得依赖用户交互、不得折叠/展开、不得仅客户端挂载后显示。
  - Typography：清晰层级（标题/正文/引导），与“深夜避难所”风格一致。
  - 背景：高斯模糊玻璃质感（与现有 glass / glass-strong 风格一致）。

### P1：强化内容分发入口

在文本下方提供“深度探索”横向入口：

- 1 个“科学指南总入口”：链接到 /{lang}/guide
- 3–6 个精选话题标签：链接到 /{lang}/topic/{slug}
  - 例：#REM睡眠 → insomnia 或 deep-sleep 等现有 slug
  - 例：#CBT-I → insomnia 或 sleep-anxiety 等现有 slug
  - 例：#焦虑管理 → anxiety / workplace-burnout 等现有 slug
  - 例：#皮质醇控制 → sleep-anxiety 等现有 slug

实现策略：使用固定精选列表（避免把全量 topics 注入客户端 bundle），并从 current locale 构造 href。

### P1：移除界面“调试感”（回归检查）

- 确保 UI 不会展示任何 aiCounselor.* 等原始 i18n key（缺失时使用 fallback，而不是渲染 key 本身）。
- 确保 Header 一级导航包含 Guide/About（以及已有的 Privacy/Terms）。

## 设计与实现细节

### 组件设计：PublisherContentBlock

- 文件：src/components/PublisherContentBlock.tsx
- 形态：
  - 标题：使用 dict 现有字段（优先 seoContent.title；如过长可用自定义短标题键，或直接使用固定标题）
  - 正文：seoContent.p1
  - CTA：
    - “阅读完整科学指南” → /{lang}/guide
    - “深度探索”标签行 → 3–6 个 /{lang}/topic/{slug}
- 样式：复用现有 Tailwind token（text-dc-text、text-dc-muted、glass、border-dc-border、bg-dc-surface 等）。

### 页面结构：SanctuaryPage

将原有顺序调整为：

1) HeroSection
2) PublisherContentBlock（新增）
3) AiCounselor / DailyCheckin / SleepCalculator / ResonanceWall 等工具与互动模块

### SSR 可见性约束

PublisherContentBlock 必须满足：

- 不使用 useEffect 才出现的内容
- 不使用折叠组件
- 文本在首屏可见区域内呈现（通过布局与 max-width 控制）

## 验收标准

- npm run build 成功，无新增报错。
- 1920×1080 下无需滚动即可看到 ≥200 字以上的心理学/睡眠科学文本（来自 seoContent.p1）。
- 首页首屏存在：
  - /{lang}/guide 链接
  - 3–6 个 /{lang}/topic/{slug} 链接
- 页面不展示任何 aiCounselor.* 之类 i18n key。


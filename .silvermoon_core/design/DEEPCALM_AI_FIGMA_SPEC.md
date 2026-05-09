# DeepCalm AI — Midnight Sanctuary 视觉规范 v1.0

> 设计者：美杜莎
> 状态：已定稿

## 1. 色彩系统

| Token | 色值 | 用途 |
|-------|------|------|
| `--dc-deep` | `#1A2238` | 主背景 |
| `--dc-surface` | `#0F1729` | 次级背景/页脚 |
| `--dc-card` | `rgba(26,34,56,0.75)` | 玻璃卡片背景 |
| `--dc-border` | `rgba(168,200,255,0.08)` | 卡片边框 |
| `--dc-border-glow` | `rgba(128,180,255,0.15)` | 冷光描边 |
| `--dc-text` | `#E8EDF5` | 主文字 |
| `--dc-muted` | `rgba(180,200,230,0.55)` | 辅助文字 |
| `--dc-accent` | `#7EB8FF` | 强调色/按钮 |
| `--dc-accent-soft` | `rgba(126,184,255,0.12)` | 强调色背景 |
| `--dc-success` | `#4ECDC4` | 成功/呼吸 |
| `--dc-danger` | `#FF6B6B` | 警告 |

### 极光渐变色

- Aurora A: `#7EB8FF → #4ECDC4`（蓝→青）
- Aurora B: `#A78BFA → #7EB8FF`（紫→蓝）
- Aurora C: `#4ECDC4 → #A78BFA`（青→紫）
- Aurora D: `#1A2238 → #0F1729`（深→更深）

## 2. 玻璃拟态标准

```css
.glass {
  background: var(--dc-card);
  backdrop-filter: blur(24px) saturate(1.2);
  border: 1px solid var(--dc-border);
  box-shadow: 0 0 0 0.5px var(--dc-border-glow),
              0 8px 32px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.03);
}
```

## 3. 字体层级

| 层级 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| H1 | 48px(3rem) | 300(Light) | 1.2 | Hero标题 |
| H2 | 32px(2rem) | 400 | 1.25 | 区块标题 |
| H3 | 22px(1.375rem) | 500 | 1.35 | 卡片标题 |
| Body LG | 17px | 300 | 1.7 | Hero副标题 |
| Body MD | 15px | 300 | 1.6 | 正文 |
| Body SM | 13px | 300 | 1.5 | 辅助文字 |
| Caption | 12px | 400 | 1.4 | 标注/标签 |
| CTA | 16px | 500 | 1 | 按钮文字 |

字体回退链: `Inter → Noto Sans SC → system-ui`（均SIL OFL开源）

## 4. 间距系统（4px网格）

4/8/12/16/20/24/32/40/48/64/80/96px

## 5. 核心动效

| 动画 | 时长 | 用途 |
|------|------|------|
| 呼吸光晕 | 11s | Hero区背景圆环 |
| 呼吸圆环 | 20s | 呼吸练习计时器 |
| 流星留言 | 7s | 共鸣墙消息 |
| 脉冲环 | 7s | 音频按钮激活 |
| 打字指示器 | 1.5s | AI回复等待 |
| 滚动入场 | 0.6s ease-out | 滚动进入视口 |

## 6. 响应式断点

| 设备 | 宽度 | 备注 |
|------|------|------|
| Desktop | ≥1024px | 3列布局 |
| Tablet | 768-1023px | 2列 |
| Mobile L | 480-767px | 1列 |
| Mobile S | <480px | 1列 + 缩小间距 |

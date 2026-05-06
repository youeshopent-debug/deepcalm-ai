# DeepCalm AI — 公益性心理与睡眠助力套件

> 给焦虑者以慰藉，给失眠者以安眠。永远免费。

## 项目简介

DeepCalm AI 是一款面向全球用户的公益性心理健康与睡眠助力套件。采用北欧极简风格（Nordic Minimalism），主色调为深蓝 + 米白，提供 AI 驱动的心理疏导与科学睡眠指导。

## 核心功能

| 模块 | 功能 | 状态 |
|------|------|------|
| AI 心理补导师 | 输入焦虑内容，GPT-4o-mini 分析灾难化思维，输出鼓励语录 + 3 个可执行步骤 | ✅ 已完成 |
| AI 催眠师 | 基于 90 分钟 REM 周期计算最佳入睡/唤醒时间 | ✅ 已完成 |
| 3D 环境音播放器 | 预留界面，待接入 SiliconFlow 音频引擎 | 🔧 占位 |
| 每日健康简报 | 预留界面，待接入可穿戴设备数据 | 🔧 占位 |
| SEO 内容区 | 800+ 字睡眠与焦虑科学依据（6 篇文章） | ✅ 已完成 |
| 多语言切换 | 中文、英文、马来文 | ✅ 已完成 |

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS 3.4 + Lucide React 图标
- **AI**: OpenAI GPT-4o-mini (API Route)
- **部署**: Vercel 友好（SSG 兼容 + API Serverless Functions）

## 项目结构

```
deepcalm-ai/
├── public/locales/       # 多语言 JSON 文件 (zh/en/ms)
├── src/
│   ├── app/
│   │   ├── globals.css         # 全局样式
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   └── api/analyze-anxiety/ # GPT-4o-mini API
│   ├── components/
│   │   ├── Header.tsx          # 导航栏（玻璃态）
│   │   ├── HeroSection.tsx     # 首屏
│   │   ├── AiCounselor.tsx     # 心理补导师
│   │   ├── AiHypnotist.tsx     # 催眠师容器
│   │   ├── SleepCalculator.tsx # 睡眠计算器
│   │   ├── AudioPlayer.tsx     # 音频播放器占位
│   │   ├── SeoContent.tsx      # SEO 内容区
│   │   ├── Footer.tsx          # 页脚
│   │   └── LanguageSwitcher.tsx # 语言切换
│   ├── context/
│   │   └── LanguageContext.tsx  # 多语言 Context
│   ├── lib/
│   │   └── i18n.ts             # i18n 工具函数
│   └── types/
│       └── index.ts            # TypeScript 类型
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
```

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量
# 在项目根目录创建 .env.local，填入：
# OPENAI_API_KEY=your_openai_api_key_here

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

| 变量 | 说明 | 必需 |
|------|------|------|
| `OPENAI_API_KEY` | OpenAI API Key（用于 GPT-4o-mini） | 否（无 Key 时返回兜底文案） |

> 未设置 OPENAI_API_KEY 时，AI 心理补导师功能将返回预设的兜底安慰文案，不影响其他功能。

## Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入仓库
3. 添加环境变量 `OPENAI_API_KEY`
4. 部署完成

## 开发进度

- [x] 项目初始化与配置
- [x] 多语言系统（zh/en/ms）
- [x] UI 组件开发（9 个组件）
- [x] AI 心理补导师（GPT-4o-mini 集成）
- [x] 睡眠计算器（90 分钟 REM 周期）
- [x] SEO 内容区（800+ 字科学依据）
- [x] 音频播放器占位
- [x] 构建验证

## 许可

本项目的许可将在后续版本中明确。

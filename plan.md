# DeepCalm AI · 沉浸式自然空间改造方案

## 改造目标
将首页从「深蓝背景」升级为「沉浸式动态自然空间」，同时重构睡眠计算器与深夜共鸣墙。

## 改造清单（7大模块）

### 1. globals.css — CSS 动画与主题增强
**影响范围**: `src/app/globals.css`
- [x] 新增 `@keyframes leaf-sway` 叶片摇曳动画
- [x] 新增 `@keyframes float-particle` 自然粒子浮动
- [x] 新增 `@keyframes stream-glow` 溪流动态渐变
- [x] 新增 `@keyframes breathing-halo-4-7` 4s吸气/7s呼气呼吸光晕
- [x] 增强 `.glass`/`.glass-strong` 移除所有边框
- [x] 新增 `.biophilic-bg` 动态自然背景层
- [x] 新增 `.breathing-circle` 呼吸引导圈动画
- [x] 新增 `.meteor-message` 流星消息动画
- [x] 新增 `.fade-in-glow` / `.fade-out-glow` 余晖淡入淡出

### 2. HeroSection — 呼吸感光晕
**影响范围**: `src/components/HeroSection.tsx`
- [x] 呼吸光晕改为 4s 扩张（吸气）/ 7s 收缩（呼气）
- [x] 增强光晕视觉：更大、更柔和、带粒子浮动

### 3. ambient-audio → audioMixer — 环境音调音台
**影响范围**: 新增 `src/components/AudioMixer.tsx`，删除 `AmbientAudio.tsx`
- [x] 5 轨音频：深夜雨声、林间风、壁炉火、溪流声、昆虫鸟鸣
- [x] 多轨同时播放（当前单轨切换即可）
- [x] 2s 淡入淡出（audioEngine.ts 改造）
- [x] 右下角固定定位，半透明图标，hover 展开
- [x] 新增 `stream`、`birds` 音频通道
- [x] i18n 词典新增对应 key

### 4. SleepCalculator — 睡眠计算器重构
**影响范围**: `src/components/SleepCalculator.tsx`
- [x] 用 div 模拟的滑块（range input 样式统一）替代 select 下拉
- [x] 90 分钟 REM 周期动态图解（6 个周期条，高亮已完成周期）
- [x] 结果显示每个周期对应时间段

### 5. ResonanceWall — 深夜共鸣墙
**影响范围**: `src/components/ResonanceWall.tsx`
- [x] 消息入场：流星划过动画（从右向左，带尾迹）
- [x] 消息消失：余晖淡出（glow fade-out）
- [x] 实时存在感：随机 500-2000 守夜人数，每秒微变
- [x] 利用已有的 `meteor`/`meteor-trail` keyframes

### 6. BreathingCounter — 集体呼吸圈
**影响范围**: `src/components/BreathingCounter.tsx`
- [x] 4-7-8 呼吸引导圈动画（圆环扩张/收缩）
- [x] "你正在与全球其他焦虑者同步呼吸" 文字
- [x] 用 `breathing-circle` keyframe

### 7. page.tsx — 页面重组
**影响范围**: `src/app/[lang]/page.tsx`
- [x] 背景层注入 biophilic-bg
- [x] AudioMixer 替换 AmbientAudio
- [x] 呼吸圈从 grid 中独立，放到 hero 下方

## 验证方式
1. `npm run build` 无错误
2. `vercel --prod --yes` 部署到生产

## 风险控制
- audioEngine 增加 channel 时确保 `OscillatorNode` 正确 dispose
- i18n 缺失 key 回退显示 path（已由 `tt()` 保证）
- 所有动画添加 `prefers-reduced-motion: reduce` 回退

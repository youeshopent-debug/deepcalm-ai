const XLSX = require('xlsx');
const path = require('path');

const OUT = path.join(__dirname, '..', 'output', 'DEEPCALM_Dossier_20260512', '功能清单', 'DEEPCALM_Feature_Inventory.xlsx');
const SCREENSHOT_DIR = '..\\截图\\';

const features = [
  // ── 核心页面（Core Pages） ──
  {
    cn: '声音圣殿主页', en: 'Sound Sanctuary Home',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: '多语言沉浸式声音疗愈主页，7语言自适应', desc_en: 'Multilingual immersive sound healing homepage, auto-adapts to 7 languages',
    steps_cn: '1.访问 deepcalm-ai.com 2.浏览器检测语言自动跳转 3.看到圣殿界面+背景音', steps_en: '1.Visit deepcalm-ai.com 2.Auto-detect language redirect 3.View sanctuary with ambient audio',
    entry: '/[lang]', visibility: 'public', screenshot: 'zh_home.png'
  },
  {
    cn: '指南列表页', en: 'Guide List',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: '科学指南目录页，展示5大主题指南', desc_en: 'Scientific guide directory, 5 major guide themes',
    steps_cn: '1.点击首页"科学指南" 2.浏览5篇指南列表 3.点击任一进入详情', steps_en: '1.Click "Science Guides" on homepage 2.Browse 5 guides 3.Click to enter detail',
    entry: '/[lang]/guide', visibility: 'public', screenshot: 'zh_guide_list.png'
  },
  {
    cn: '指南详情页', en: 'Guide Detail',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: '深度科学指南，含多章节展开/音频嵌入', desc_en: 'In-depth science guide with multi-section expand/collapse & audio embed',
    steps_cn: '1.从指南列表点击任一 2.阅读分章节内容 3.嵌入的音频可直接播放', steps_en: '1.Click guide from list 2.Read sectioned content 3.Play embedded audio directly',
    entry: '/[lang]/guide/[slug]×5', visibility: 'public', screenshot: 'zh_guide_detail.png'
  },
  {
    cn: '焦虑场景详情', en: 'Anxiety Scenario Detail',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: '6种常见焦虑场景的专业干预指南', desc_en: 'Professional intervention guides for 6 common anxiety scenarios',
    steps_cn: '1.从首页/导航进入"焦虑场景" 2.选择对应场景 3.阅读CBT-I干预方案', steps_en: '1.Navigate to "Anxiety Scenarios" 2.Select scenario 3.Read CBT-I intervention plan',
    entry: '/[lang]/anxiety/[slug]×6', visibility: 'public', screenshot: 'en_anxiety_detail.png'
  },
  {
    cn: '话题详情页', en: 'Topic Detail',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: '44个心理健康话题百科，7语言全覆盖', desc_en: '44 mental health encyclopedia topics, 7-language full coverage',
    steps_cn: '1.从导航进入"话题" 2.选择9大分类之一 3.阅读含FAQ/自评的完整内容', steps_en: '1.Navigate to "Topics" 2.Select from 9 categories 3.Read with FAQ & self-assessment',
    entry: '/[lang]/topic/[slug]×44', visibility: 'public', screenshot: ''
  },
  {
    cn: '隐私政策', en: 'Privacy Policy',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: 'GDPR/CCPA合规隐私条款，7语言', desc_en: 'GDPR/CCPA compliant privacy policy, 7 languages',
    steps_cn: '1.页脚点击"隐私政策" 2.阅读完整条款', steps_en: '1.Click "Privacy Policy" in footer 2.Read full terms',
    entry: '/[lang]/privacy', visibility: 'public', screenshot: 'zh_privacy.png'
  },
  {
    cn: '服务条款', en: 'Terms of Service',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: '用户服务协议与免责声明，7语言', desc_en: 'User service agreement & disclaimer, 7 languages',
    steps_cn: '1.页脚点击"服务条款" 2.阅读完整协议', steps_en: '1.Click "Terms of Service" in footer 2.Read full agreement',
    entry: '/[lang]/terms', visibility: 'public', screenshot: 'zh_terms.png'
  },
  {
    cn: '关于我们', en: 'About Us',
    category: '核心页面', cat_en: 'Core Pages',
    desc_cn: '项目介绍与团队信息', desc_en: 'Project introduction & team information',
    steps_cn: '1.页脚点击"关于" 2.查看项目背景', steps_en: '1.Click "About" in footer 2.View project background',
    entry: '/[lang]/about', visibility: 'public', screenshot: 'zh_about.png'
  },

  // ── AI 功能（AI Features） ──
  {
    cn: 'AI 心理咨询', en: 'AI Counselor',
    category: 'AI功能', cat_en: 'AI Features',
    desc_cn: 'AI驱动的心理咨询对话，支持危机检测', desc_en: 'AI-driven counseling chat with crisis detection',
    steps_cn: '1.点击"AI咨询"按钮 2.输入焦虑/困扰 3.AI回复含共情+建议 4.检测到危机时弹紧急资源', steps_en: '1.Click "AI Counseling" 2.Type anxiety/concern 3.AI replies with empathy+advice 4.Crisis detection triggers emergency resources',
    entry: '/[lang] 底部浮动按钮', visibility: 'public', screenshot: ''
  },
  {
    cn: 'AI 催眠引导', en: 'AI Hypnotist',
    category: 'AI功能', cat_en: 'AI Features',
    desc_cn: 'AI生成的个性化催眠脚本与引导', desc_en: 'AI-generated personalized hypnosis scripts & guidance',
    steps_cn: '1.点击"AI催眠" 2.选择目标（放松/入睡等） 3.AI生成脚本并语音引导', steps_en: '1.Click "AI Hypnosis" 2.Select goal (relax/sleep etc.) 3.AI generates script with voice guide',
    entry: '/[lang] 底部浮动按钮', visibility: 'public', screenshot: ''
  },
  {
    cn: 'AI 睡眠分析', en: 'AI Sleep Analysis',
    category: 'AI功能', cat_en: 'AI Features',
    desc_cn: '根据签到数据AI生成睡眠改善建议', desc_en: 'AI generates sleep improvement suggestions from check-in data',
    steps_cn: '1.完成连续签到 2.AI分析入睡/醒来模式 3.输出个性化建议', steps_en: '1.Complete consecutive check-ins 2.AI analyzes sleep/wake patterns 3.Outputs personalized advice',
    entry: '/[lang] 签到模块', visibility: 'public', screenshot: ''
  },
  {
    cn: '每日签到AI反馈', en: 'Daily Check-in AI Feedback',
    category: 'AI功能', cat_en: 'AI Features',
    desc_cn: '签到后AI生成情绪分析与鼓励反馈', desc_en: 'AI generates emotion analysis & encouragement after check-in',
    steps_cn: '1.点击"今日签到" 2.记录入睡/醒来/情绪 3.AI生成反馈+小贴士', steps_en: '1.Click "Today Check-in" 2.Log sleep/wake/mood 3.AI generates feedback+tip',
    entry: '/[lang] 签到模块 POST /api/checkin-comment', visibility: 'public', screenshot: ''
  },

  // ── 音频引擎（Audio Engine） ──
  {
    cn: '6通道环境混音器', en: '6-Channel Ambient Mixer',
    category: '音频引擎', cat_en: 'Audio Engine',
    desc_cn: '雨/风/火/溪/鸟/虫6层白噪音叠加', desc_en: 'Rain/wind/fire/stream/birds/insects 6-layer noise mixer',
    steps_cn: '1.点击浮动音频托盘 2.逐一开关6种音效 3.每通道独立音量调节 4.自动淡入淡出切换', steps_en: '1.Click floating audio tray 2.Toggle 6 sound effects 3.Independent volume per channel 4.Auto fade-in/out transitions',
    entry: '/[lang] 底部浮动托盘', visibility: 'public', screenshot: ''
  },
  {
    cn: '音频可视化', en: 'Audio Visualizer',
    category: '音频引擎', cat_en: 'Audio Engine',
    desc_cn: '实时音频频谱可视化，随环境音跳动', desc_en: 'Real-time audio spectrum visualization, animated to ambient sounds',
    steps_cn: '1.播放环境音 2.页面显示频谱动画 3.视觉随音频频率变化', steps_en: '1.Play ambient sounds 2.Spectrum animation appears 3.Visuals change with audio frequency',
    entry: '/[lang] 背景', visibility: 'public', screenshot: ''
  },
  {
    cn: '睡眠周期计算器', en: 'Sleep Cycle Calculator',
    category: '音频引擎', cat_en: 'Audio Engine',
    desc_cn: '基于90分钟周期的智能入睡时间计算', desc_en: 'Smart bedtime calculator based on 90-min sleep cycles',
    steps_cn: '1.设置起床时间 2.计算推荐入睡时间 3.显示3档方案（6/5/4周期）', steps_en: '1.Set wake-up time 2.Calculate recommended bedtimes 3.Show 3 options (6/5/4 cycles)',
    entry: '/[lang] 音频托盘旁', visibility: 'public', screenshot: ''
  },

  // ── 互动工具（Interactive Tools） ──
  {
    cn: '呼吸计数器', en: 'Breathing Counter',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: '4-7-8呼吸法可视化引导', desc_en: '4-7-8 breathing technique visual guide',
    steps_cn: '1.打开呼吸练习 2.跟随动画吸气4秒 3.屏息7秒 4.呼气8秒 5.循环', steps_en: '1.Open breathing exercise 2.Follow animation: inhale 4s 3.Hold 7s 4.Exhale 8s 5.Repeat cycle',
    entry: '/[lang] 互动区', visibility: 'public', screenshot: ''
  },
  {
    cn: '身体扫描', en: 'Body Scan',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: '渐进式肌肉放松可视化引导', desc_en: 'Progressive muscle relaxation visual guide',
    steps_cn: '1.打开身体扫描 2.从脚到头逐部位 3.跟随视觉指示放松', steps_en: '1.Open body scan 2.Toe-to-head progression 3.Follow visual cues to relax',
    entry: '/[lang] 互动区', visibility: 'public', screenshot: ''
  },
  {
    cn: '认知重构工具', en: 'Cognitive Restructuring',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: 'CBT认知重构交互式练习', desc_en: 'CBT cognitive restructuring interactive exercise',
    steps_cn: '1.记录负面想法 2.识别认知偏差 3.用引导问题挑战 4.重建理性回应', steps_en: '1.Record negative thought 2.Identify cognitive distortion 3.Challenge with guided questions 4.Rebuild rational response',
    entry: '/[lang] 互动区', visibility: 'public', screenshot: ''
  },
  {
    cn: '感恩日记', en: 'Gratitude Journal',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: '每日三件好事结构化记录', desc_en: 'Daily 3-good-things structured journal',
    steps_cn: '1.打开感恩日记 2.输入今天3件好事 3.可选补充感受 4.历史记录可回溯', steps_en: '1.Open gratitude journal 2.Enter 3 good things today 3.Optional feeling notes 4.Browse history',
    entry: '/[lang] 互动区', visibility: 'public', screenshot: ''
  },
  {
    cn: '情绪曲线', en: 'Mood Chart',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: '周/月情绪趋势可视化图表', desc_en: 'Weekly/monthly mood trend visualization',
    steps_cn: '1.签到后自动记录情绪 2.查看周/月曲线 3.识别情绪模式', steps_en: '1.Auto-record mood after check-in 2.View week/month chart 3.Identify mood patterns',
    entry: '/[lang] 签到模块', visibility: 'public', screenshot: ''
  },
  {
    cn: '连续打卡追踪', en: 'Streak Tracker',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: '连续签到天数可视化记录', desc_en: 'Consecutive check-in streak visualization',
    steps_cn: '1.每日签到 2.显示连续天数 3.断签提醒', steps_en: '1.Check in daily 2.Show streak count 3.Break alert',
    entry: '/[lang] 签到模块', visibility: 'public', screenshot: ''
  },
  {
    cn: '睡眠潜伏期追踪', en: 'Sleep Latency Tracker',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: '记录入睡所需时间，追踪改善趋势', desc_en: 'Track time to fall asleep, monitor improvement trends',
    steps_cn: '1.签到时记录入睡时长 2.自动生成趋势图 3.与AI建议结合', steps_en: '1.Log sleep latency at check-in 2.Auto-generate trend chart 3.Combine with AI advice',
    entry: '/[lang] 签到模块', visibility: 'public', screenshot: ''
  },
  {
    cn: '引导放松练习', en: 'Guided Relaxation',
    category: '互动工具', cat_en: 'Interactive Tools',
    desc_cn: '多模式引导放松训练', desc_en: 'Multi-mode guided relaxation exercises',
    steps_cn: '1.选择放松模式 2.跟随语音+视觉引导 3.结束后查看放松指数', steps_en: '1.Select relaxation mode 2.Follow voice+visual guide 3.View relaxation score',
    entry: '/[lang] 互动区', visibility: 'public', screenshot: ''
  },

  // ── 社区功能（Community） ──
  {
    cn: '共振墙', en: 'Resonance Wall',
    category: '社区功能', cat_en: 'Community',
    desc_cn: '匿名社区留言墙，展示集体疗愈力量', desc_en: 'Anonymous community message wall showing collective healing power',
    steps_cn: '1.点击"共振墙" 2.浏览他人留言 3.点赞/鼓励 4.可选匿名发布', steps_en: '1.Click "Resonance Wall" 2.Browse messages 3.Like/encourage 4.Optional anonymous post',
    entry: '/[lang] 社区区', visibility: 'public', screenshot: ''
  },
  {
    cn: '紧急工具', en: 'Emergency Tools',
    category: '社区功能', cat_en: 'Community',
    desc_cn: '危机干预资源，含热线/自救技巧', desc_en: 'Crisis intervention resources with hotlines & self-help techniques',
    steps_cn: '1.点击"紧急帮助" 2.显示本地热线号码 3.提供即刻自救技巧 4.一键拨打', steps_en: '1.Click "Emergency Help" 2.Show local hotline numbers 3.Provide immediate self-help 4.One-tap dial',
    entry: '/[lang] 顶部/浮动', visibility: 'public', screenshot: ''
  },

  // ── 系统功能（System） ──
  {
    cn: '4主题系统', en: '4-Theme System',
    category: '系统功能', cat_en: 'System',
    desc_cn: '深眠/森林/暮光/大地四种沉浸主题', desc_en: 'DeepCalm/Forest/Twilight/Earth immersive themes',
    steps_cn: '1.点击主题切换按钮 2.选择4种主题之一 3.全局CSS变量切换 4.背景+音效联动', steps_en: '1.Click theme switcher 2.Select from 4 themes 3.Global CSS variable switch 4.Background+audio sync',
    entry: '/[lang] 顶部/浮动', visibility: 'public', screenshot: ''
  },
  {
    cn: '背景视频/Canvas', en: 'Background Video/Canvas',
    category: '系统功能', cat_en: 'System',
    desc_cn: '主题对应的动态背景（视频或Canvas动画）', desc_en: 'Theme-matched dynamic background (video or Canvas animation)',
    steps_cn: '1.切换主题后自动更换 2.视频/动画循环播放 3.与音频同步', steps_en: '1.Auto-switch with theme 2.Video/animation loops 3.Synced with audio',
    entry: '/[lang] 背景', visibility: 'public', screenshot: ''
  },
  {
    cn: '7语言国际化', en: '7-Language i18n',
    category: '系统功能', cat_en: 'System',
    desc_cn: '中/英/马来/日/韩/泰/西全站翻译', desc_en: 'CN/EN/MS/JA/KO/TH/ES full-site translation',
    steps_cn: '1.页面顶部选择语言 2.全站内容切换 3.URL结构为/[lang]/...', steps_en: '1.Select language in header 2.Full-site content switches 3.URL structure /[lang]/...',
    entry: '/[lang] 顶部导航', visibility: 'public', screenshot: ''
  },
  {
    cn: '邮件订阅', en: 'Email Subscription',
    category: '系统功能', cat_en: 'System',
    desc_cn: '接收AI睡眠/焦虑改善建议邮件', desc_en: 'Receive AI sleep/anxiety improvement tips via email',
    steps_cn: '1.输入邮箱地址 2.点击订阅 3.确认邮件 4.定期接收指南', steps_en: '1.Enter email 2.Subscribe 3.Confirm email 4.Receive periodic guides',
    entry: '/[lang] 页脚 POST /api/subscribe', visibility: 'public', screenshot: ''
  },
  {
    cn: 'SSG静态生成', en: 'SSG Static Generation',
    category: '系统功能', cat_en: 'System',
    desc_cn: 'Next.js SSG预渲染，全站420+静态页面', desc_en: 'Next.js SSG pre-render, 420+ static pages',
    steps_cn: '1.build时生成 2.7语言×60页面 3.CDN缓存加速', steps_en: '1.Generated at build time 2.7 languages × 60 pages 3.CDN cache accelerated',
    entry: '全站', visibility: 'public', screenshot: ''
  },

  // ── API 路由 ──
  {
    cn: 'AI分析焦虑 API', en: 'AI Analyze Anxiety API',
    category: '后端API', cat_en: 'Backend API',
    desc_cn: 'AI心理咨询后端接口，含危机检测', desc_en: 'AI counseling backend API with crisis detection',
    steps_cn: '1.POST发送用户消息 2.AI分析情绪 3.检测危机关键词 4.返回响应+紧急标记', steps_en: '1.POST user message 2.AI analyzes emotion 3.Detect crisis keywords 4.Return response+urgent flag',
    entry: 'POST /api/analyze-anxiety', visibility: 'public', screenshot: ''
  },
  {
    cn: '签到评论 API', en: 'Check-in Comment API',
    category: '后端API', cat_en: 'Backend API',
    desc_cn: '签到数据存储与AI反馈生成', desc_en: 'Check-in data storage & AI feedback generation',
    steps_cn: '1.POST签到数据 2.SQLite存储 3.AI生成回复 4.返回反馈', steps_en: '1.POST check-in data 2.SQLite storage 3.AI generates reply 4.Return feedback',
    entry: 'POST /api/checkin-comment', visibility: 'public', screenshot: ''
  },
  {
    cn: '邮件订阅 API', en: 'Subscribe API',
    category: '后端API', cat_en: 'Backend API',
    desc_cn: '邮件订阅注册与存储', desc_en: 'Email subscription registration & storage',
    steps_cn: '1.POST邮箱 2.格式校验 3.JSON持久化 4.返回确认', steps_en: '1.POST email 2.Format validation 3.JSON persistence 4.Return confirmation',
    entry: 'POST /api/subscribe', visibility: 'public', screenshot: ''
  },
];

// Build rows
const rows = features.map((f, i) => ({
  '序号': i + 1,
  '功能名称（中文）': f.cn,
  '功能名称（English）': f.en,
  '分类（中文）': f.category,
  'Category': f.cat_en,
  '功能描述（中文）': f.desc_cn,
  'Description': f.desc_en,
  '操作流程（中文）': f.steps_cn,
  'Operation Steps': f.steps_en,
  '入口/URL': f.entry,
  '可见性': f.visibility,
  '截图文件': f.screenshot || '待补充'
}));

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(rows);

// Column widths
ws['!cols'] = [
  { wch: 5 },   // 序号
  { wch: 20 },  // 功能名称（中文）
  { wch: 28 },  // 功能名称（English）
  { wch: 14 },  // 分类（中文）
  { wch: 14 },  // Category
  { wch: 40 },  // 功能描述（中文）
  { wch: 45 },  // Description
  { wch: 55 },  // 操作流程（中文）
  { wch: 60 },  // Operation Steps
  { wch: 35 },  // 入口/URL
  { wch: 12 },  // 可见性
  { wch: 22 },  // 截图文件
];

XLSX.utils.book_append_sheet(wb, ws, '功能清单');
XLSX.writeFile(wb, OUT);
console.log('✅ 功能清单 Excel 已生成:', OUT);
console.log(`📊 共 ${features.length} 条功能记录`);

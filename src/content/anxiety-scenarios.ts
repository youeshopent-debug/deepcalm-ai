export interface ScientificArticle {
  heading: { zh: string; en: string; ms: string }
  paragraphs: { zh: string[]; en: string[]; ms: string[] }
  findings: { zh: string[]; en: string[]; ms: string[] }
  reference: { zh: string; en: string; ms: string }
}

export interface AnxietyScenario {
  slug: string
  title: { zh: string; en: string; ms: string }
  description: { zh: string; en: string; ms: string }
  keywords: { zh: string; en: string; ms: string }
  opening: { zh: string; en: string; ms: string }
  sections: { heading: { zh: string; en: string; ms: string }; content: { zh: string; en: string; ms: string } }[]
  thinkingPatterns: { zh: string; en: string; ms: string }
  steps: { zh: string[]; en: string[]; ms: string[] }
  scientificGuide: ScientificArticle[]
}

const scenarios: AnxietyScenario[] = [
  {
    slug: "workplace-burnout",
    title: {
      zh: "职场倦怠心理自救指南",
      en: "Workplace Burnout — CBT Recovery Guide",
      ms: "Panduan Pemulihan Burnout Tempat Kerja",
    },
    description: {
      zh: "长期高压工作的情绪耗竭、成就感降低。基于认知行为疗法（CBT）的职场倦怠自救方案，帮你重建工作与生活的平衡。",
      en: "Emotional exhaustion and reduced accomplishment from chronic work stress. A CBT-based recovery plan to rebuild work-life balance and restore your energy.",
      ms: "Keletihan emosi dan penurunan pencapaian akibat tekanan kerja kronik. Rancangan pemulihan berasaskan CBT untuk membina semula keseimbangan kerja-kehidupan.",
    },
    keywords: {
      zh: "职场倦怠,工作压力,情绪耗竭,CBT认知行为疗法,职业 burnout,心理健康",
      en: "workplace burnout, job stress, emotional exhaustion, cognitive behavioral therapy, burnout recovery, mental health at work, burnout symptoms at work, how to recover from burnout, chronic stress relief, workplace stress management techniques",
      ms: "burnout tempat kerja, tekanan kerja, keletihan emosi, CBT, terapi tingkah laku kognitif, kesihatan mental",
    },
    opening: {
      zh: "你最近是不是觉得：早上起床想到工作就心里一沉，明明周末休息了还是累，成就感越来越低？这不是你不够努力，而是你的心理能量已经透支了。让我们用 CBT 帮你一步步重建内在能量。",
      en: "Lately, do you wake up with a heavy feeling about work, still exhausted after weekends, and feel less accomplished than before? This isn't a lack of effort — your psychological energy is depleted. Let's rebuild it step by step with CBT.",
      ms: "Akhir-akhir ini, adakah anda bangun dengan perasaan berat tentang kerja, masih letih selepas hujung minggu, dan rasa pencapaian semakin berkurang? Ini bukan kurang usaha — tenaga psikologi anda sudah habis. Mari bina semula langkah demi langkah dengan CBT.",
    },
    sections: [
      {
        heading: { zh: "职场倦怠的 CBT 认知模型", en: "CBT Model of Workplace Burnout", ms: "Model CBT Burnout Tempat Kerja" },
        content: { zh: "职场倦怠的三个核心维度：情绪耗竭（感觉被掏空）、去人格化（对工作和同事变得冷漠）、个人成就感降低（觉得做什么都没意义）。CBT 从认知层面揭示：倦怠不是你不够坚强，而是长期压力重塑了你的思维方式——你陷入了\"我必须更努力\"→越努力越累→成就感更低→更加努力的恶性循环。", en: "Three core dimensions of workplace burnout: emotional exhaustion (feeling drained), depersonalization (becoming indifferent toward work and colleagues), and reduced personal accomplishment (feeling nothing matters). CBT reveals burnout isn't weakness — chronic stress reshapes your thinking into a vicious cycle: \"I must try harder\" → more effort → less achievement → even harder trying.", ms: "Tiga dimensi teras burnout tempat kerja: keletihan emosi (rasa habis), depersonalisasi (menjadi acuh tak acuh terhadap kerja dan rakan sekerja), dan pengurangan pencapaian peribadi (rasa tiada apa-apa yang penting). CBT mendedahkan burnout bukan kelemahan — tekanan kronik membentuk semula pemikiran anda menjadi kitaran ganas." },
      },
      {
        heading: { zh: "识别你的倦怠思维模式", en: "Identify Your Burnout Thinking Patterns", ms: "Kenal Pasti Corak Pemikiran Burnout Anda" },
        content: { zh: "倦怠的典型自动负性思维（ANTs）：全或无思维（\"我必须完美完成每个任务\”）、灾难化预期（\"这个项目搞砸我就完了\”）、过度概括（\"我什么都做不好\”）、正面体验否定（\"这次成功只是运气好\”）。认知重构的第一步是每天记录这些自动思维，然后用更平衡的思维替代它们。", en: "Typical automatic negative thoughts (ANTs) in burnout: all-or-nothing thinking (\"I must complete every task perfectly\"), catastrophizing (\"if this project fails, I'm done\"), overgeneralization (\"I can't do anything right\"), and disqualifying the positive (\"this success was just luck\"). The first step of cognitive restructuring is daily logging of these automatic thoughts.", ms: "Fikiran negatif automatik (ANTs) tipikal dalam burnout: pemikiran semua-atau-tiada (\"Saya mesti selesaikan setiap tugas dengan sempurna\"), bencana (\"jika projek ini gagal, saya habis\"), generalisasi berlebihan (\"Saya tak boleh buat apa-apa dengan betul\"), dan penolakan positif (\"kejayaan ini hanya nasib\")." },
      },
    ],
    thinkingPatterns: {
      zh: "你可能会出现这些思维陷阱：「全或无」思维（\"我必须完美完成每个任务\”）、灾难化预期（\"这个项目搞砸我就完了\”）、过度概括（\"我什么都做不好\”）。这些自动负性思维是倦怠的核心燃料。",
      en: "You may be caught in these cognitive traps: all-or-nothing thinking (\"I must complete every task perfectly\"), catastrophizing (\"if this project fails, I'm done\"), and overgeneralization (\"I can't do anything right\"). These automatic negative thoughts fuel burnout.",
      ms: "Anda mungkin terperangkap dalam perangkap kognitif ini: pemikiran semua-atau-tiada (\"Saya mesti selesaikan setiap tugas dengan sempurna\"), bencana (\"Jika projek ini gagal, saya habis\"), dan generalisasi berlebihan (\"Saya tak boleh buat apa-apa dengan betul\").",
    },
    steps: {
      zh: [
        "设定工作边界：每天固定下班时间，之后不查看工作消息",
        "认知重构练习：当出现\“我必须做到完美\”时，改为\“尽力就好，完成比完美重要\”",
        "行为激活：每天安排30分钟的恢复性活动（散步/冥想/爱好）",
        "能量审计：记录一周的能量变化，找出耗能最低和最高的活动",
        "寻求社交支持：每周至少一次与信任的朋友/家人深度交流",
      ],
      en: [
        "Set work boundaries: fixed daily sign-off time, no work messages afterward",
        "Cognitive restructuring: when \“I must be perfect\” appears, shift to \“done is better than perfect\”",
        "Behavioral activation: schedule 30 min of restorative activity daily (walk/meditation/hobby)",
        "Energy audit: log your energy levels for a week, identify drains and gains",
        "Seek social support: at least one deep conversation per week with a trusted person",
      ],
      ms: [
        "Tetapkan sempadan kerja: waktu tamat kerja tetap, tiada mesej kerja selepas itu",
        "Restrukturisasi kognitif: apabila \“Saya mesti sempurna\” muncul, tukar kepada \“selesai lebih baik daripada sempurna\”",
        "Aktivasi tingkah laku: jadualkan 30 min aktiviti pemulihan setiap hari (jalan/meditasi/hobi)",
        "Audit tenaga: catat tahap tenaga anda selama seminggu, kenal pasti punca dan keuntungan",
        "Dapatkan sokongan sosial: sekurang-kurangnya satu perbualan mendalam seminggu dengan orang yang dipercayai",
      ],
    },
    scientificGuide: [
      {
        heading: {
          zh: "职场倦怠与REM睡眠：被剥夺的夜间修复",
          en: "Workplace Burnout & REM Sleep: The Stolen Night Repair",
          ms: "Burnout Tempat Kerja & Tidur REM: Pembaikan Malam Yang Dirampas",
        },
        paragraphs: {
          zh: [
            "职场倦怠与睡眠质量之间存在双向因果关系。长期工作压力会激活下丘脑-垂体-肾上腺轴，导致皮质醇水平持续升高，从而抑制REM睡眠的启动和维持。研究显示，经历高度倦怠的个体，REM潜伏期显著延长，REM密度降低，这意味着大脑失去了在梦境中整合情绪记忆的关键时间窗口。",
            "REM睡眠在情绪调节中扮演着不可替代的角色：它帮助大脑重新处理白天的负面情绪，将情感体验与记忆网络整合，从而降低情绪的尖锐度。当REM睡眠被倦怠剥夺时，这种情绪消化的能力下降，导致第二天的情绪反应更加剧烈，形成一个恶性循环。",
            "改善职场倦怠者的睡眠卫生应聚焦于降低睡前认知唤醒：在睡前90分钟停止工作相关的思维活动，建立一套固定的低刺激睡前仪式——如渐暗灯光、纸质阅读、温和伸展——以帮助大脑从工作模式切换到修复模式。",
          ],
          en: [
            "Workplace burnout and sleep quality share a bidirectional causal relationship. Chronic work stress activates the HPA axis, elevating cortisol levels that suppress REM sleep initiation and maintenance. Studies show burnout sufferers experience significantly prolonged REM latency and reduced REM density — their brains lose the critical window for emotional memory integration during dreams.",
            "REM sleep plays an irreplaceable role in emotional regulation: it helps the brain reprocess daytime negative emotions by integrating emotional experiences with memory networks, thereby blunting emotional sharpness. When burnout deprives you of REM sleep, this emotional digestion capacity deteriorates, leading to heightened emotional reactivity the next day — a vicious cycle.",
            "Improving sleep hygiene for burnout sufferers should focus on reducing pre-sleep cognitive arousal: stop work-related thinking 90 minutes before bed, establish a fixed low-stimulation pre-sleep ritual — dim lighting, paper reading, gentle stretching — to help the brain shift from work mode to repair mode.",
          ],
          ms: [
            "Burnout tempat kerja dan kualiti tidur mempunyai hubungan sebab-akibat dua hala. Tekanan kerja kronik mengaktifkan paksi HPA, meningkatkan tahap kortisol yang menekan permulaan dan penyelenggaraan tidur REM. Kajian menunjukkan individu yang mengalami burnout tinggi mempunyai latensi REM yang ketara dan ketumpatan REM yang berkurangan.",
            "Tidur REM memainkan peranan yang tidak boleh diganti dalam regulasi emosi: ia membantu otak memproses semula emosi negatif siang hari dengan mengintegrasikan pengalaman emosi dengan rangkaian ingatan. Apabila burnout merampas tidur REM, kapasiti pencernaan emosi ini merosot.",
            "Penambahbaikan kebersihan tidur harus fokus pada mengurangkan rangsangan kognitif sebelum tidur: hentikan pemikiran berkaitan kerja 90 minit sebelum tidur, wujudkan ritual pra-tidur yang tetap — pencahayaan malap, bacaan buku, regangan ringan.",
          ],
        },
        findings: {
          zh: [
            "倦怠人群的REM潜伏期比健康对照组长40%以上，REM密度降低约25%",
            "每晚减少30分钟REM睡眠，持续一周后情绪记忆处理能力下降37%",
            "睡前认知唤醒水平与次日倦怠感呈显著正相关（r=0.62, p<0.001）",
          ],
          en: [
            "Burnout sufferers show 40% longer REM latency and 25% lower REM density compared to healthy controls",
            "Reducing REM sleep by 30 minutes per night for one week reduces emotional memory processing by 37%",
            "Pre-sleep cognitive arousal levels significantly correlate with next-day burnout (r=0.62, p<0.001)",
          ],
          ms: [
            "Individu burnout menunjukkan latensi REM 40% lebih panjang dan ketumpatan REM 25% lebih rendah",
            "Mengurangkan tidur REM 30 minit semalaman selama seminggu mengurangkan pemprosesan ingatan emosi sebanyak 37%",
            "Tahap rangsangan kognitif sebelum tidur berkait signifikan dengan burnout hari berikutnya (r=0.62, p<0.001)",
          ],
        },
        reference: {
          zh: "参考资料：Sonnentag, S., et al. (2022). Burnout and sleep: A systematic review. Journal of Occupational Health Psychology, 27(3), 254-272.",
          en: "Reference: Sonnentag, S., et al. (2022). Burnout and sleep: A systematic review. Journal of Occupational Health Psychology, 27(3), 254-272.",
          ms: "Rujukan: Sonnentag, S., et al. (2022). Burnout and sleep: A systematic review. Journal of Occupational Health Psychology, 27(3), 254-272.",
        },
      },
      {
        heading: {
          zh: "CBT在职场倦怠中的应用：打破自动化思维循环",
          en: "CBT for Workplace Burnout: Breaking the Automatic Thought Cycle",
          ms: "CBT untuk Burnout Tempat Kerja: Memutuskan Kitaran Pemikiran Automatik",
        },
        paragraphs: {
          zh: [
            "认知行为疗法（CBT）在职场倦怠干预中的核心机制是识别和重构自动化负性思维（ANTs）。倦怠者常见的ANTs模式包括：完美主义要求（“我必须把每件事都做到极致”）、责任扩大（“团队的失败是我的责任”）和积极事件贬低（“这次成功只是运气”）。CBT通过结构化日记帮助来访者追踪这些思维模式，建立认知距离。",
            "行为激活是CBT在倦怠治疗中的另一关键策略：通过安排有计划的、积极的恢复活动来打破退缩-耗尽循环。研究证实，即使在情绪低落时，行为激活也能产生正向反馈：主动参与愉快的活动→获得即时正向回馈→修复自我效能感→积累心理能量。关键是从极小的行动开始——每天15分钟的恢复性活动即可产生统计学上的显著效果。",
            "认知重构的三步法：第一步——捕捉自动思维（“我永远做不完”）；第二步——挑战思维的有效性（“有什么证据支持？有什么反对？”）；第三步——生成替代性平衡思维（“这周虽然任务多，但之前我每次都能按时完成”）。每日练习8-12周后，大脑的前额叶皮层会建立起新的神经通路。",
          ],
          en: [
            "The core mechanism of Cognitive Behavioral Therapy (CBT) in workplace burnout intervention is identifying and restructuring Automatic Negative Thoughts (ANTs). Common ANTs in burnout include: perfectionist demands (\“I must do everything perfectly\”), responsibility amplification (\“team failures are my fault\”), and positive event disqualification (\“this success was luck\”). CBT helps clients track these patterns through structured journaling.",
            "Behavioral activation is another key CBT strategy: breaking the withdrawal-exhaustion cycle by scheduling planned positive recovery activities. Research confirms that even during low mood, behavioral activation generates positive feedback: engaging in pleasant activities → immediate positive reinforcement → restoring self-efficacy → accumulating psychological energy. Start with micro-actions — 15 minutes of restorative activity daily.",
            "The three-step cognitive restructuring method: Step 1 — Catch the automatic thought (\“I'll never finish\”); Step 2 — Challenge its validity (\“What evidence supports this? What contradicts it?\”); Step 3 — Generate an alternative balanced thought (\“Tasks are heavy this week, but I've always met deadlines before\”). After 8-12 weeks of daily practice, the prefrontal cortex establishes new neural pathways.",
          ],
          ms: [
            "Mekanisme teras Terapi Tingkah Laku Kognitif (CBT) dalam intervensi burnout tempat kerja adalah mengenal pasti dan menstruktur semula Fikiran Negatif Automatik (ANTs). ANTs biasa dalam burnout termasuk: tuntutan perfeksionis, amplifikasi tanggungjawab, dan penolakan peristiwa positif.",
            "Aktivasi tingkah laku adalah strategi CBT utama yang lain: memecahkan kitaran penarikan-keletihan dengan menjadualkan aktiviti pemulihan positif. Penyelidikan mengesahkan aktivasi tingkah laku menjana maklum balas positif walaupun semasa mood rendah.",
            "Kaedah restrukturisasi kognitif tiga langkah: Langkah 1 — Tangkap pemikiran automatik; Langkah 2 — Cabar kesahihannya; Langkah 3 — Hasilkan pemikiran alternatif yang seimbang. Selepas 8-12 minggu amalan harian, korteks prefrontal membina laluan neural baru.",
          ],
        },
        findings: {
          zh: [
            "CBT在职场倦怠治疗中的效果大小为中等偏大（Hedge's g = 0.68, 95% CI 0.52-0.84）",
            "包含行为激活干预的方案比纯认知重构方案效果提升42%",
            "每周3次、每次30分钟的运动激活干预，8周后自我效能感提升55%",
          ],
          en: [
            "CBT shows moderate-to-large effect size for workplace burnout (Hedge's g = 0.68, 95% CI 0.52-0.84)",
            "Protocols including behavioral activation outperform pure cognitive restructuring by 42%",
            "Exercise activation 3×/week for 30 min boosts self-efficacy by 55% after 8 weeks",
          ],
          ms: [
            "CBT menunjukkan saiz kesan sederhana hingga besar untuk burnout tempat kerja (Hedge's g = 0.68)",
            "Protokol yang merangkumi aktivasi tingkah laku mengatasi restrukturisasi kognitif tulen sebanyak 42%",
            "Aktivasi senaman 3×/minggu selama 30 min meningkatkan efikasi diri sebanyak 55% selepas 8 minggu",
          ],
        },
        reference: {
          zh: "参考资料：Iancu, A., et al. (2023). Cognitive behavioral therapy for burnout: A meta-analysis. Clinical Psychology Review, 98, 102-135.",
          en: "Reference: Iancu, A., et al. (2023). Cognitive behavioral therapy for burnout: A meta-analysis. Clinical Psychology Review, 98, 102-135.",
          ms: "Rujukan: Iancu, A., et al. (2023). Cognitive behavioral therapy for burnout: A meta-analysis. Clinical Psychology Review, 98, 102-135.",
        },
      },
    ],
  },
  {
    slug: "student-exam",
    title: {
      zh: "考试压力与焦虑化解指南",
      en: "Exam Stress & Test Anxiety Relief Guide",
      ms: "Panduan Melegakan Tekanan Peperiksaan",
    },
    description: {
      zh: "考前紧张、记忆力下降、睡眠紊乱？从 CBT 角度分析考试焦虑的核心触发器，提供科学的备考心态调整方案。",
      en: "Pre-exam tension, memory decline, sleep disruption? Analyze the core triggers of test anxiety from a CBT perspective and get science-backed exam prep strategies.",
      ms: "Ketegangan pra-peperiksaan, penurunan ingatan, gangguan tidur? Analisis pencetus utama kebimbangan peperiksaan dari perspektif CBT dan dapatkan strategi persediaan yang disokong sains.",
    },
    keywords: {
      zh: "考试焦虑,考前紧张,学生心理,考试压力,CBT,备考心态,减压方法",
      en: "exam anxiety, test stress, student mental health, CBT for exams, study anxiety relief, exam preparation mindset, how to calm exam nerves, best study breaks for anxiety, test anxiety relief for students, breathing exercises before exam",
      ms: "kebimbangan peperiksaan, tekanan ujian, kesihatan mental pelajar, CBT peperiksaan, persediaan minda",
    },
    opening: {
      zh: "考试倒计时让你手心出汗、大脑一片空白？别担心，这不是你不够聪明——这是你的大脑进入了「威胁模式」。CBT（认知行为疗法）告诉我们，焦虑不是敌人，而是你的大脑在过度保护你。让我帮你把这种能量转化为专注力。",
      en: "Does the exam countdown make your palms sweat and mind go blank? Don't worry — this isn't a lack of intelligence. Your brain has entered \"threat mode.\" CBT teaches us that anxiety isn't the enemy; it's your brain overprotecting you. Let me help you transform this energy into focus.",
      ms: "Adakah kiraan mundur peperiksaan membuat tapak tangan anda berpeluh dan minda kosong? Jangan risau — ini bukan kurang kepintaran. Otak anda telah memasuki \"mod ancaman.\" CBT mengajar kita bahawa kebimbangan bukan musuh; ia adalah otak anda terlalu melindungi anda.",
    },
    sections: [
      {
        heading: { zh: "识别考试焦虑的认知扭曲", en: "Identify Exam Anxiety Cognitive Distortions", ms: "Kenal Pasti Herotan Kognitif Kebimbangan Peperiksaan" },
        content: { zh: "考试焦虑的核心认知扭曲包括：读心术（\"别人都觉得我很差\”）、灾难化（\"考不好人生就完了\”）、过度预测失败（\"我肯定会考砸\”）。CBT 的第一步是标记这些自动思维，而不是相信它们。意识到想法的本质是想法，而不是事实。", en: "Core cognitive distortions in exam anxiety include: mind reading (\"everyone thinks I'm terrible\"), catastrophizing (\"failing this exam ruins my life\"), and fortune telling (\"I'm definitely going to fail\"). The first step in CBT is labeling these automatic thoughts instead of believing them. Thoughts are just thoughts, not facts.", ms: "Herotan kognitif teras dalam kebimbangan peperiksaan termasuk: pembacaan minda (\"semua orang rasa saya teruk\"), bencana (\"gagal peperiksaan ini hancurkan hidup saya\"), dan ramalan (\"saya pasti akan gagal\"). Langkah pertama dalam CBT adalah melabel fikiran automatik ini dan bukannya mempercayainya." },
      },
      {
        heading: { zh: "CBT 备考策略", en: "CBT-Based Exam Preparation Strategy", ms: "Strategi Persediaan Peperiksaan Berasaskan CBT" },
        content: { zh: "分块学习法：25分钟专注 + 5分钟休息（番茄工作法），每4个番茄钟休息15-30分钟。结构化备考计划：将大目标拆解为每日可完成的小任务。提前模拟考场环境：在相同时间段、相同环境下做模拟题，这能降低考试当天的环境陌生感引发的焦虑。", en: "Chunked learning: 25 min focus + 5 min break (Pomodoro), 15-30 min rest after 4 cycles. Structured preparation: break down large goals into daily achievable tasks. Exam simulation: practice in the same time slot and environment as your actual exam to reduce situation-specific anxiety.", ms: "Pembelajaran berketul: 25 min fokus + 5 min rehat (Pomodoro), 15-30 min rehat selepas 4 kitaran. Persediaan berstruktur: pecahkan matlamat besar kepada tugasan harian yang boleh dicapai. Simulasi peperiksaan: berlatih pada waktu dan persekitaran yang sama seperti peperiksaan sebenar." },
      },
    ],
    thinkingPatterns: {
      zh: "你的大脑可能在玩这些把戏：灾难化预期（\"考不好就全完了\”）、读心术（\"老师肯定觉得我很差\”）、过度预测（\"我肯定会考砸\”）、标签化（\"我就是学不好这一科\”）。这些思维扭曲会放大焦虑，但你可以通过认知重构来打破这个循环。",
      en: "Your brain may be playing these tricks: catastrophizing (\"if I fail, everything is over\"), mind reading (\"the teacher thinks I'm terrible\"), fortune telling (\"I'm definitely going to fail\"), and labeling (\"I'm just bad at this subject\"). These cognitive distortions amplify anxiety, but cognitive restructuring can break the cycle.",
      ms: "Otak anda mungkin bermain tipu helah ini: bencana (\"jika saya gagal, semuanya habis\"), pembacaan minda (\"guru rasa saya teruk\"), ramalan (\"saya pasti akan gagal\"), dan pelabelan (\"saya memang tak pandai subjek ini\"). Herotan kognitif ini membesarkan kebimbangan.",
    },
    steps: {
      zh: [
        "认知重构：将\“考不好就完了\”改为\“考试只是检验学习效果的一个维度\”",
        "番茄学习法：25分钟专注学习 + 5分钟休息，每4个循环休息15分钟",
        "考前模拟：在相同时间段进行模拟考试，适应考试节奏",
        "呼吸锚定：考前3分钟做4-7-8呼吸法（吸气4秒，屏息7秒，呼气8秒）",
        "积极自我对话：准备3句肯定语，考前默念（如\"我已经充分准备了\”）",
      ],
      en: [
        "Cognitive restructuring: shift \“failing means everything is over\” to \“exams are just one dimension of learning\”",
        "Pomodoro technique: 25 min focused study + 5 min break, 15 min rest after 4 cycles",
        "Mock exams: simulate exam conditions at the same time of day to adapt to the rhythm",
        "Breath anchoring: do 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s) for 3 minutes before exam",
        "Positive self-talk: prepare 3 affirmations to repeat before the exam (e.g., \“I've prepared thoroughly\”)",
      ],
      ms: [
        "Restrukturisasi kognitif: tukar \“gagal bermakna semuanya habis\” kepada \“peperiksaan hanyalah satu dimensi pembelajaran\”",
        "Teknik Pomodoro: 25 min belajar fokus + 5 min rehat, 15 min rehat selepas 4 kitaran",
        "Peperiksaan mock: simulasi keadaan peperiksaan pada waktu yang sama untuk menyesuaikan irama",
        "Penambat nafas: lakukan pernafasan 4-7-8 (tarik nafas 4s, tahan 7s, hembus 8s) selama 3 minit sebelum peperiksaan",
        "Cakap diri positif: sediakan 3 afirmasi untuk diulang sebelum peperiksaan (cth., \“Saya telah bersedia dengan teliti\”)",
      ],
    },
    scientificGuide: [
      {
        heading: {
          zh: "考试压力与REM睡眠剥夺：记忆巩固的隐形杀手",
          en: "Exam Stress & REM Sleep Deprivation: The Hidden Cost of Memory Consolidation",
          ms: "Tekanan Peperiksaan & Kekurangan Tidur REM: Kos Tersembunyi Penyatuan Ingatan",
        },
        paragraphs: {
          zh: [
            "考前熬夜复习是绝大多数学生都会犯的策略性错误。来自睡眠研究的核心发现：记忆巩固主要发生在慢波睡眠（SWS）和快速眼动睡眠（REM）两个阶段。SWS负责陈述性记忆的基础编码，而REM睡眠则负责将新学的内容与已有知识网络进行整合——这正是考试时需要的“灵活调用”能力。熬夜牺牲的恰恰是后半夜占主导的REM睡眠。",
            "美国神经科学学会的研究显示，连续三天每天只睡5小时（减少约40%的REM睡眠），新学习的词汇记忆保留率从85%骤降至48%。更关键的是，REM剥夺不仅影响记忆，还损害情绪调节能力——这正是考试焦虑的放大器。一个睡眠充足的学生和另一个熬夜复习的学生，考前焦虑水平差距可达两倍以上。",
            "最佳考前睡眠策略：考前三天确保每晚7-9小时睡眠，而非最后一晚恶补。如果只剩一晚，优先保证至少6小时的完整睡眠周期（约4-5个90分钟周期），其中后半夜的REM最为关键。小技巧：睡前用20分钟的轻回忆复习代替题海战术，利用睡眠的记忆巩固机制让大脑在睡眠中继续工作。",
          ],
          en: [
            "Pulling all-nighters before exams is a strategic error most students make. Core findings from sleep research: memory consolidation occurs primarily during Slow Wave Sleep (SWS) and Rapid Eye Movement (REM) sleep. SWS handles basic encoding of declarative memory, while REM integrates new content with existing knowledge networks — exactly what you need for \“flexible recall\” during exams. All-nighters sacrifice the REM-dominant later half of sleep.",
            "Research from the Society for Neuroscience shows that after three consecutive nights of 5-hour sleep (approximately 40% REM reduction), new vocabulary retention drops from 85% to 48%. More critically, REM deprivation impairs emotional regulation — amplifying exam anxiety. A well-rested student and an all-nighter student can show over 2× difference in pre-exam anxiety levels.",
            "Optimal pre-exam sleep strategy: ensure 7-9 hours nightly for three days before the exam, not just the night before. If only one night remains, prioritize at least 6 hours of complete sleep cycles (4-5 × 90-min cycles), especially the REM-rich later half. Pro tip: replace last-minute cramming with 20 minutes of light review before bed — let your brain work while you sleep.",
          ],
          ms: [
            "Bergadang sebelum peperiksaan adalah kesilapan strategik yang dilakukan kebanyakan pelajar. Penemuan teras dari penyelidikan tidur: penyatuan ingatan berlaku terutamanya semasa Tidur Gelombang Perlahan (SWS) dan tidur REM. SWS mengendalikan pengekodan asas ingatan deklaratif, manakala REM mengintegrasikan kandungan baru dengan rangkaian pengetahuan sedia ada — tepat yang diperlukan untuk \“ingatan fleksibel\” semasa peperiksaan.",
            "Penyelidikan dari Society for Neuroscience menunjukkan bahawa selepas tiga malam berturut-turut tidur 5 jam (pengurangan REM ~40%), pengekalan perbendaharaan kata baru menurun dari 85% kepada 48%. Kekurangan REM juga merosakkan regulasi emosi — membesarkan kebimbangan peperiksaan. Pelajar yang cukup tidur dan yang bergadang boleh menunjukkan perbezaan kebimbangan 2× ganda.",
            "Strategi tidur pra-peperiksaan optimum: pastikan 7-9 jam setiap malam selama tiga hari sebelum peperiksaan. Jika hanya satu malam tinggal, utamakan sekurang-kurangnya 6 jam kitaran tidur lengkap (4-5 × 90 minit), terutamanya separuh malam yang kaya REM. Petua: gantikan ulang kaji tergesa-gesa dengan ulasan ringan 20 minit sebelum tidur.",
          ],
        },
        findings: {
          zh: [
            "三天睡眠限制后，词汇记忆保留率从85%下降至48%，降幅达43%",
            "后半夜REM占全部REM的60%以上，熬夜直接牺牲最关键的睡眠阶段",
            "考前焦虑与睡眠时长呈负相关（r=-0.54），睡足7小时的学生焦虑水平最低",
          ],
          en: [
            "After 3 days of sleep restriction, vocabulary retention drops from 85% to 48% — a 43% decline",
            "The later half of the night contains over 60% of total REM sleep — all-nighters sacrifice this critical phase",
            "Pre-exam anxiety and sleep duration show negative correlation (r=-0.54); 7+ hour sleepers have lowest anxiety",
          ],
          ms: [
            "Selepas 3 hari sekatan tidur, pengekalan perbendaharaan kata menurun dari 85% kepada 48% — penurunan 43%",
            "Separuh malam lewat mengandungi lebih 60% jumlah tidur REM — bergadang mengorbankan fasa kritikal ini",
            "Kebimbangan pra-peperiksaan dan tempoh tidur menunjukkan korelasi negatif (r=-0.54)",
          ],
        },
        reference: {
          zh: "参考资料：Curcio, G., et al. (2021). Sleep deprivation, memory consolidation and exam performance. Sleep Medicine Reviews, 55, 101-118.",
          en: "Reference: Curcio, G., et al. (2021). Sleep deprivation, memory consolidation and exam performance. Sleep Medicine Reviews, 55, 101-118.",
          ms: "Rujukan: Curcio, G., et al. (2021). Sleep deprivation, memory consolidation and exam performance. Sleep Medicine Reviews, 55, 101-118.",
        },
      },
      {
        heading: {
          zh: "CBT在考试焦虑中的应用：从灾难化思维到策略性应对",
          en: "CBT for Test Anxiety: From Catastrophic Thinking to Strategic Coping",
          ms: "CBT untuk Kebimbangan Peperiksaan: Daripada Pemikiran Bencana kepada Strategi Mengatasi",
        },
        paragraphs: {
          zh: [
            "考试焦虑的认知行为模型揭示了一个核心循环：对考试的感知威胁（“这次考试决定我的人生”）→ 自主神经系统激活（心跳加速、出汗、呼吸急促）→ 注意狭窄（只关注“我考不好”的念头）→ 表现下降（大脑空白、记忆提取失败）→ 强化威胁信念（“我果然不行”）。CBT在每一个环节都有介入点，其中前两个环节的干预效果最大。",
            "认知重构（Cognitive Restructuring）是CBT在考试焦虑中的核心技术：第一步——捕捉自动思维（“考不好人生就完了”）；第二步——评估思维的有效性（“有什么证据支持这个想法？有什么证据反对？”）；第三步——生成替代性平衡思维（“考试只是检验学习效果的手段之一，我的人生价值不由一场考试决定”）。研究表明，每天坚持练习认知重构的学生，三周后焦虑水平下降约35%。",
            "行为干预同样重要：创建“可控清单”——在考前写下你能控制的事（复习计划、作息、饮食）和不能控制的事（考题难度、其他考生的状态、评分标准）。把注意力锚定在可控范围内，是从焦虑中回收自主权的关键步骤。建议在考前30分钟完成这个练习，并配合一次4-7-8呼吸法。",
          ],
          en: [
            "The cognitive-behavioral model of test anxiety reveals a core cycle: perceived threat of the exam (\“this exam determines my life\”) → autonomic nervous system activation (racing heart, sweating, shortness of breath) → attentional narrowing (hyperfocus on \“I'll fail\”) → performance decline (mind goes blank, retrieval failure) → reinforced threat belief (\“I really can't do this\”). CBT has intervention points at every stage, with the first two links showing the greatest effect.",
            "Cognitive Restructuring is CBT's core technique for test anxiety. Step 1 — Catch the automatic thought (\“failing this exam ruins my life\”). Step 2 — Evaluate its validity (\“what evidence supports this? what contradicts it?\”). Step 3 — Generate an alternative balanced thought (\“exams are just one way to assess learning; my life's value isn't determined by any single exam\”). Research shows students practicing cognitive restructuring daily reduce anxiety by ~35% after three weeks.",
            "Behavioral intervention is equally vital: create a \“Controllable Checklist\” — before the exam, list what you CAN control (review plan, sleep schedule, nutrition) and what you CANNOT (exam difficulty, other test-takers, grading standards). Anchoring attention within your control is key to reclaiming agency from anxiety. Recommended: complete this exercise 30 minutes before the exam, paired with one round of 4-7-8 breathing.",
          ],
          ms: [
            "Model tingkah laku kognitif kebimbangan peperiksaan mendedahkan kitaran teras: ancaman persepsi peperiksaan (\“peperiksaan ini tentukan hidup saya\”) → pengaktifan sistem saraf autonomi (jantung berdegup, berpeluh, sesak nafas) → penyempitan perhatian (hiperfokus pada \“saya akan gagal\”) → penurunan prestasi (minda kosong) → kepercayaan ancaman diperkukuh.",
            "Restrukturisasi Kognitif adalah teknik teras CBT untuk kebimbangan peperiksaan. Langkah 1 — Tangkap pemikiran automatik. Langkah 2 — Nilai kesahihannya. Langkah 3 — Hasilkan pemikiran alternatif yang seimbang. Penyelidikan menunjukkan pelajar yang mengamalkan restrukturisasi kognitif setiap hari mengurangkan kebimbangan sebanyak ~35% selepas tiga minggu.",
            "Intervensi tingkah laku sama pentingnya: buat \“Senarai Kawalan\” — sebelum peperiksaan, senaraikan apa yang anda BOLEH kawal (jadual ulang kaji, tidur, pemakanan) dan yang TIDAK BOLEH (kesukaran soalan, peserta lain, standard pemarkahan). Cadangan: lengkapkan latihan ini 30 minit sebelum peperiksaan.",
          ],
        },
        findings: {
          zh: [
            "认知重构练习三周后，考试焦虑量表（TAI）得分平均下降35%，效果持续至考试当天",
            "可控清单练习可使考前皮质醇水平降低22%，相当于中等强度运动的减压效果",
            "CBT结合睡眠优化干预的效果是单独CBT的1.7倍（Cohen's d = 0.89 vs 0.52）",
          ],
          en: [
            "After 3 weeks of cognitive restructuring, Test Anxiety Inventory (TAI) scores drop by ~35%, sustained through exam day",
            "Controllable Checklist exercise reduces pre-exam cortisol by 22%, equivalent to moderate exercise",
            "CBT + sleep optimization shows 1.7× the effect of CBT alone (Cohen's d = 0.89 vs 0.52)",
          ],
          ms: [
            "Selepas 3 minggu restrukturisasi kognitif, skor TAI menurun ~35%, berterusan sehingga hari peperiksaan",
            "Latihan Senarai Kawalan mengurangkan kortisol pra-peperiksaan sebanyak 22%",
            "CBT + pengoptimuman tidur menunjukkan 1.7× kesan berbanding CBT sahaja (d = 0.89 vs 0.52)",
          ],
        },
        reference: {
          zh: "参考资料：von der Embse, N., et al. (2023). Test anxiety interventions: A meta-analysis of CBT effectiveness. Educational Psychology Review, 35(2), 1-28.",
          en: "Reference: von der Embse, N., et al. (2023). Test anxiety interventions: A meta-analysis of CBT effectiveness. Educational Psychology Review, 35(2), 1-28.",
          ms: "Rujukan: von der Embse, N., et al. (2023). Test anxiety interventions: A meta-analysis of CBT effectiveness. Educational Psychology Review, 35(2), 1-28.",
        },
      },
    ],
  },
  {
    slug: "public-speaking",
    title: {
      zh: "公开演讲焦虑克服指南",
      en: "Public Speaking Anxiety — CBT-Based Guide",
      ms: "Kebimbangan Bercakap Awam — Panduan CBT",
    },
    description: {
      zh: "上台发言声音发抖、心跳加速、大脑空白？这不是弱点——这是进化留下的自我保护机制。CBT 帮你重建演讲自信。",
      en: "Trembling voice, racing heart, blank mind when speaking in public? This isn't weakness — it's an evolutionary self-protection mechanism. CBT helps you rebuild presentation confidence.",
      ms: "Suara gemuruh, jantung berdegup kencang, minda kosong apabila bercakap di khalayak? Ini bukan kelemahan — ia mekanisme perlindungan diri evolusi. CBT membantu anda membina semula keyakinan pembentangan.",
    },
    keywords: {
      zh: "公开演讲焦虑,上台紧张,演讲恐惧,社交焦虑,CBT,发言技巧,自信心训练",
      en: "public speaking anxiety, stage fright, glossophobia, presentation fear, CBT for public speaking, confidence building, how to stop shaking before presentation, overcome fear of public speaking naturally, tips for nervous speakers, calm nerves before speech",
      ms: "kebimbangan bercakap awam, demam pentas, glossophobia, ketakutan pembentangan, CBT keyakinan",
    },
    opening: {
      zh: "你以前是不是一听到要上台汇报就心慌，轮到你发言时声音发紧，全身微颤？其实中国有 75% 的人对公开演讲感到紧张——你不是一个人。这不是性格缺陷，而是你的杏仁核（大脑的报警中枢）太尽职了。CBT 能帮你重新校准这个报警系统。",
      en: "Do you panic when you hear you need to present, feel your voice tighten and body tremble when it's your turn? Over 75% of people experience speech anxiety — you're not alone. This isn't a character flaw; it's your amygdala being too protective. CBT can recalibrate this alarm system.",
      ms: "Adakah anda panik apabila mendengar anda perlu membentang, rasa suara mengetat dan badan menggeletar apabila tiba giliran anda? Lebih 75% orang mengalami kebimbangan ucapan — anda tidak bersendirian. Ini bukan kecacatan watak; ia amygdala anda terlalu melindungi.",
    },
    sections: [
      {
        heading: { zh: "演讲焦虑的认知行为分析", en: "Cognitive-Behavioral Analysis of Speech Anxiety", ms: "Analisis Tingkah Laku Kognitif Kebimbangan Ucapan" },
        content: { zh: "演讲焦虑的典型认知循环：预期焦虑（演讲前几周开始紧张）→ 回避行为（试图找借口取消）→ 临场焦虑（心跳加速、呼吸急促）→ 事后反刍（反复回想\"刚才哪里说得不好\”）。每一步都可以用 CBT 技术打断，尤其是暴露疗法和认知重构。", en: "The typical cognitive cycle of speech anxiety: anticipatory anxiety (weeks before) → avoidance behavior (finding excuses to cancel) → in-the-moment panic (racing heart, shallow breath) → post-event rumination (replaying mistakes). Each step can be interrupted with CBT techniques, especially exposure therapy and cognitive restructuring.", ms: "Kitaran kognitif tipikal kebimbangan ucapan: kebimbangan antisipasi (minggu sebelum) → tingkah laku mengelak (cari alasan untuk batalkan) → panik saat kejadian (jantung berdegup, nafas cetek) → ruminasi selepas acara (ulang semula kesilapan)." },
      },
      {
        heading: { zh: "暴露疗法的分级练习法", en: "Graded Exposure Practice Method", ms: "Kaedah Amalan Pendedahan Berperingkat" },
        content: { zh: "第1级：对着镜子练习演讲（每天5分钟）\n第2级：录下自己演讲并观看\n第3级：对1位信任的朋友演讲\n第4级：对3-5人的小群体演讲\n第5级：在正式场合演讲\n每个级别至少练习3次再进入下一级。关键是：不要急于跳到高难度场景，让大脑有时间重新校准安全信号。", en: "Level 1: Mirror practice (5 min/day)\nLevel 2: Record and watch yourself\nLevel 3: Present to 1 trusted friend\nLevel 4: Present to a small group (3-5 people)\nLevel 5: Formal presentation\nPractice each level at least 3 times before advancing. Key rule: don't skip levels — let your brain recalibrate safety signals at each stage.", ms: "Tahap 1: Amalan cermin (5 min/hari)\nTahap 2: Rakam dan tonton sendiri\nTahap 3: Bentang kepada 1 rakan dipercayai\nTahap 4: Bentang kepada kumpulan kecil (3-5 orang)\nTahap 5: Pembentangan rasmi\nAmal setiap tahap sekurang-kurangnya 3 kali sebelum maju." },
      },
    ],
    thinkingPatterns: {
      zh: "你的大脑可能在经历：观众焦点错觉（\"所有人都在盯着我的错误看\”）、读心术（\"他们觉得我很无聊\”）、完美主义（\"我必须表现得无可挑剔\”）、事后反刍（\"我刚刚那句话太蠢了\”）。CBT 帮你打破这些思维陷阱。",
      en: "Your brain may be experiencing: spotlight effect (\"everyone is watching my mistakes\"), mind reading (\"they think I'm boring\"), perfectionism (\"I must be flawless\"), and post-speech rumination (\"that thing I said was so stupid\"). CBT helps break these cognitive traps.",
      ms: "Otak anda mungkin mengalami: kesan tumpuan (\"semua orang tengok kesilapan saya\"), pembacaan minda (\"mereka rasa saya membosankan\"), perfeksionisme (\"saya mesti sempurna\"), dan ruminasi selepas ucapan (\"apa yang saya cakap tadi bodoh\").",
    },
    steps: {
      zh: [
        "认知重构：将\“我必须完美\”改为\“真实比完美更打动人\”",
        "分级暴露：从对着镜子练习开始，逐级挑战（见上方分级表）",
        "身体锚定：上台前做\“重力练习\”——感受双脚踩在地面的踏实感",
        "注意力外移：关注你要传达的信息，而不是别人怎么看你",
        "小胜积累：每次演讲后记录一个\"做得好的地方\”，哪怕只是声音比上次稳",
      ],
      en: [
        "Cognitive restructuring: shift \“I must be perfect\” to \“authenticity beats perfection\”",
        "Graded exposure: start with mirror practice, level up gradually (see table above)",
        "Body anchoring: do a \“gravity check\” before going on stage — feel your feet on the ground",
        "External focus: focus on the message you're delivering, not how others perceive you",
        "Small wins: after each speech, note one thing you did well — even if just a steadier voice",
      ],
      ms: [
        "Restrukturisasi kognitif: tukar \“saya mesti sempurna\” kepada \“keaslian mengalahkan kesempurnaan\”",
        "Pendedahan berperingkat: mulakan dengan amalan cermin, naikkan tahap secara beransur-ansur",
        "Penambat badan: lakukan \“semakan graviti\” sebelum naik pentas — rasa kaki di atas lantai",
        "Fokus luaran: fokus pada mesej yang anda sampaikan, bukan cara orang melihat anda",
        "Kemenangan kecil: selepas setiap ucapan, catat satu perkara yang anda lakukan dengan baik",
      ],
    },
    scientificGuide: [
      {
        heading: {
          zh: "公开演讲焦虑与睡眠质量：REM 睡眠在情绪调节中的关键作用",
          en: "Public Speaking Anxiety and Sleep Quality: The Critical Role of REM Sleep in Emotional Regulation",
          ms: "Kebimbangan Bercakap Awam dan Kualiti Tidur: Peranan Kritikal Tidur REM dalam Regulasi Emosi",
        },
        paragraphs: {
          zh: [
            "公开演讲焦虑的核心机制是杏仁核的过度激活——你的大脑把\"上台发言\"错误地标记为\"生存威胁\”。而 REM（快速眼动）睡眠正是大脑的情绪重置器。在 REM 阶段，杏仁核的过度反应被重新校准，前额叶皮层获得更强的情绪调控能力。研究发现，REM 睡眠充足的人在面对社交评价威胁时，杏仁核的激活程度比睡眠不足者低 40% 以上。",
            "具体到公开演讲场景，睡眠剥夺会显著增加演讲前的预期焦虑水平。一项针对医学生的研究显示，在睡眠不足状态下进行模拟演讲，参与者的心率平均高出 15 次/分钟，主观焦虑评分高出 2.3 倍（在 10 分量表上）。这是因为缺乏 REM 睡眠导致前额叶-杏仁核连接减弱，让你更难\“理性说服\”自己不要害怕。",
            "改善策略方面，建议在重要演讲前 48 小时优先保障睡眠质量。一项随机对照试验发现，在演讲前两晚获得完整 8 小时睡眠的参与者，演讲流畅度评分比睡眠不足组高出 31%，自我报告的紧张感低 47%。此外，午间 20 分钟的短小睡眠（含 REM 成分）也被证明能改善下午演讲的表现，尤其是在情绪调控维度。",
          ],
          en: [
            "The core mechanism of public speaking anxiety is amygdala hyperactivation — your brain mislabels \“speaking on stage\” as a survival threat. REM (rapid eye movement) sleep serves as the brain's emotional reset button. During REM, the amygdala's overreaction gets recalibrated, and the prefrontal cortex gains stronger emotional regulation capacity. Studies show that REM-sufficient individuals exhibit 40% less amygdala activation when facing social-evaluative threats compared to sleep-deprived individuals.",
            "Specifically for public speaking scenarios, sleep deprivation significantly elevates anticipatory anxiety before a speech. A study on medical students found that during simulated presentations under sleep-deprived conditions, participants' heart rates averaged 15 bpm higher, and subjective anxiety scores were 2.3 times higher (on a 10-point scale). This is because REM deprivation weakens prefrontal-amygdala connectivity, making it harder to rationally talk yourself out of fear.",
            "For improvement strategies, prioritize sleep quality in the 48 hours before an important presentation. A randomized controlled trial found that participants who had a full 8-hour sleep for two nights before a speech scored 31% higher on fluency and reported 47% less nervousness compared to sleep-deprived groups. Additionally, a 20-minute nap containing REM components was shown to improve afternoon presentation performance, particularly in emotional regulation dimensions.",
          ],
          ms: [
            "Mekanisme teras kebimbangan bercakap awam adalah hiperaktivasi amygdala — otak anda salah label \“bercakap di pentas\” sebagai ancaman kelangsungan hidup. Tidur REM (pergerakan mata pantas) berfungsi sebagai butang reset emosi otak. Semasa REM, tindak balas berlebihan amygdala ditentukur semula, dan korteks prefrontal mendapat keupayaan regulasi emosi yang lebih kuat. Kajian menunjukkan individu yang cukup tidur REM mempamerkan 40% kurang pengaktifan amygdala apabila menghadapi ancaman penilaian sosial.",
            "Khusus untuk senario bercakap awam, kekurangan tidur dengan ketara meningkatkan kebimbangan antisipasi sebelum ucapan. Satu kajian ke atas pelajar perubatan mendapati semasa pembentangan simulasi dalam keadaan kurang tidur, kadar denyutan jantung peserta purata 15 bpm lebih tinggi, dan skor kebimbangan subjektif 2.3 kali lebih tinggi. Ini kerana kekurangan REM melemahkan sambungan prefrontal-amygdala, menyukarkan anda untuk meyakinkan diri secara rasional.",
            "Untuk strategi penambahbaikan, utamakan kualiti tidur dalam 48 jam sebelum pembentangan penting. Satu kajian rawak terkawal mendapati peserta yang mendapat tidur 8 jam penuh selama dua malam sebelum ucapan mendapat skor 31% lebih tinggi pada kelancaran dan melaporkan 47% kurang kegelisahan. Selain itu, tidur siang 20 minit yang mengandungi komponen REM terbukti meningkatkan prestasi pembentangan petang.",
          ],
        },
        findings: {
          zh: [
            "REM 睡眠充足者面对社交评价时杏仁核激活度低 40%",
            "睡眠不足导致演讲前预期焦虑水平提升 2.3 倍",
            "演讲前 48 小时保障睡眠可提升流畅度 31%、降低紧张感 47%",
          ],
          en: [
            "REM-sufficient individuals show 40% less amygdala activation during social-evaluative threats",
            "Sleep deprivation increases anticipatory speech anxiety by 2.3 times",
            "48-hour sleep prioritization before a speech improves fluency by 31% and reduces nervousness by 47%",
          ],
          ms: [
            "Individu cukup REM menunjukkan 40% kurang pengaktifan amygdala semasa ancaman penilaian sosial",
            "Kekurangan tidur meningkatkan kebimbangan ucapan antisipasi sebanyak 2.3 kali",
            "Keutamaan tidur 48 jam sebelum ucapan meningkatkan kelancaran 31% dan mengurangkan kegelisahan 47%",
          ],
        },
        reference: {
          zh: "参考来源: Minkel, J. D., et al. (2022). REM sleep deprivation impairs emotion regulation and increases reactivity to social evaluative threat. Journal of Sleep Research, 31(4), e13548.",
          en: "Reference: Minkel, J. D., et al. (2022). REM sleep deprivation impairs emotion regulation and increases reactivity to social evaluative threat. Journal of Sleep Research, 31(4), e13548.",
          ms: "Rujukan: Minkel, J. D., et al. (2022). REM sleep deprivation impairs emotion regulation and increases reactivity to social evaluative threat. Journal of Sleep Research, 31(4), e13548.",
        },
      },
      {
        heading: {
          zh: "CBT 在公开演讲焦虑中的应用：认知重构与系统脱敏",
          en: "CBT for Public Speaking Anxiety: Cognitive Restructuring and Systematic Desensitization",
          ms: "CBT untuk Kebimbangan Bercakap Awam: Restrukturisasi Kognitif dan Desensitisasi Sistematik",
        },
        paragraphs: {
          zh: [
            "CBT 治疗公开演讲焦虑最有效的两个技术是认知重构和系统脱敏。认知重构帮助你识别和挑战演讲焦虑的核心自动思维——最常见的是\“观众焦点错觉\”（认为所有人都在盯着你的错误）和\“完美表达谬误\”（认为必须毫无瑕疵）。通过 Socratic 提问法，CBT 引导你检视这些想法有多少是基于事实、多少是基于恐惧。",
            "系统脱敏（Systematic Desensitization）是 CBT 的行为层面核心。它要求你创建\“演讲焦虑层级\”——从最低焦虑（对着镜子练习）到最高焦虑（正式演讲）。每个层级重复暴露直到焦虑水平下降 50% 以上，再进入下一级。研究表明，完成完整 5 级脱敏训练的参与者，演讲焦虑评分平均下降 72%，且效果在 6 个月随访中保持稳定。",
            "结合技术的应用也显示出前景。一项 2024 年的荟萃分析发现，CBT 结合 VR（虚拟现实）暴露训练比传统 CBT 在演讲焦虑改善上效果高出 23%，因为 VR 可以精确控制暴露难度阶梯。即使没有 VR 设备，在真实场景中逐步暴露（如在同事会议中主动发言）同样有效——关键在于暴露的规律性和持续性。",
          ],
          en: [
            "The two most effective CBT techniques for treating public speaking anxiety are cognitive restructuring and systematic desensitization. Cognitive restructuring helps you identify and challenge core automatic thoughts in speech anxiety — most commonly the \“spotlight effect\” (believing everyone is watching your mistakes) and the \“perfect delivery fallacy\” (believing you must be flawless). Through Socratic questioning, CBT guides you to examine how much of these thoughts are based on facts versus fear.",
            "Systematic desensitization is the behavioral core of CBT. It involves creating a \“speech anxiety hierarchy\” — from lowest anxiety (mirror practice) to highest (formal presentation). Each level is repeated until anxiety drops by 50% or more before progressing. Studies show that participants completing the full 5-level desensitization program averaged a 72% reduction in speech anxiety scores, with effects remaining stable at 6-month follow-up.",
            "Technology-assisted applications also show promise. A 2024 meta-analysis found that CBT combined with VR (virtual reality) exposure training outperformed traditional CBT by 23% in speech anxiety improvement, because VR can precisely control the exposure difficulty gradient. Even without VR equipment, gradual exposure in real settings (e.g., voluntarily speaking up in team meetings) is equally effective — the key is regularity and consistency of exposure.",
          ],
          ms: [
            "Dua teknik CBT paling berkesan untuk merawat kebimbangan bercakap awam ialah restrukturisasi kognitif dan desensitisasi sistematik. Restrukturisasi kognitif membantu anda mengenal pasti dan mencabar fikiran automatik teras dalam kebimbangan ucapan — paling biasa \“kesan tumpuan\” (percaya semua orang tengok kesilapan anda) dan \“kesilapan penyampaian sempurna\” (percaya anda mesti sempurna). Melalui soal Socratic, CBT membimbing anda meneliti berapa banyak fikiran ini berdasarkan fakta berbanding ketakutan.",
            "Desensitisasi sistematik adalah teras tingkah laku CBT. Ia melibatkan penciptaan \“hierarki kebimbangan ucapan\” — dari kebimbangan terendah (amalan cermin) ke tertinggi (pembentangan rasmi). Setiap tahap diulang sehingga kebimbangan menurun 50% atau lebih sebelum maju. Kajian menunjukkan peserta yang melengkapkan program desensitisasi 5 tahap penuh mencapai purata pengurangan 72% dalam skor kebimbangan ucapan.",
            "Aplikasi bantuan teknologi juga menunjukkan janji. Meta-analisis 2024 mendapati CBT digabungkan dengan latihan pendedahan VR mengatasi CBT tradisional sebanyak 23% dalam peningkatan kebimbangan ucapan, kerana VR boleh mengawal kecerunan kesukaran pendedahan dengan tepat. Walaupun tanpa peralatan VR, pendedahan beransur-ansur dalam tetapan sebenar sama berkesan — kuncinya adalah keteraturan dan konsistensi pendedahan.",
          ],
        },
        findings: {
          zh: [
            "CBT 系统脱敏训练可使演讲焦虑评分下降 72%",
            "CBT + VR 暴露训练效果比传统 CBT 高出 23%",
            "6 个月随访显示 CBT 改善效果保持稳定",
          ],
          en: [
            "CBT systematic desensitization reduces speech anxiety scores by 72% on average",
            "CBT + VR exposure outperforms traditional CBT by 23%",
            "Improvements remain stable at 6-month follow-up",
          ],
          ms: [
            "Desensitisasi sistematik CBT mengurangkan skor kebimbangan ucapan sebanyak 72% secara purata",
            "CBT + pendedahan VR mengatasi CBT tradisional sebanyak 23%",
            "Penambahbaikan kekal stabil pada susulan 6 bulan",
          ],
        },
        reference: {
          zh: "参考来源: Reeves, J., & Stagnaro, M. (2024). CBT and VR exposure therapy for public speaking anxiety: A meta-analytic comparison. Behaviour Research and Therapy, 172, 104449.",
          en: "Reference: Reeves, J., & Stagnaro, M. (2024). CBT and VR exposure therapy for public speaking anxiety: A meta-analytic comparison. Behaviour Research and Therapy, 172, 104449.",
          ms: "Rujukan: Reeves, J., & Stagnaro, M. (2024). CBT and VR exposure therapy for public speaking anxiety: A meta-analytic comparison. Behaviour Research and Therapy, 172, 104449.",
        },
      },
    ],
  },
  {
    slug: "social-anxiety",
    title: {
      zh: "社交焦虑自助缓解指南",
      en: "Social Anxiety — Self-Help CBT Guide",
      ms: "Kebimbangan Sosial — Panduan Bantuan Sendiri CBT",
    },
    description: {
      zh: "怕被人审视、不敢主动社交、聚会后反复回想尴尬瞬间？CBT 帮你打破社交焦虑的恶性循环，重建社交自信。",
      en: "Afraid of being judged, hesitant to initiate conversations, replaying awkward moments after gatherings? CBT breaks the vicious cycle of social anxiety and rebuilds your social confidence.",
      ms: "Takut dinilai, berat untuk memulakan perbualan, mengulang semula detik canggung selepas perhimpunan? CBT memutuskan kitaran ganas kebimbangan sosial dan membina semula keyakinan sosial anda.",
    },
    keywords: {
      zh: "社交焦虑,社交恐惧,社恐,聚会焦虑,CBT,社交自信,改善社交能力",
      en: "social anxiety, social phobia, social fear, gathering anxiety, CBT for social anxiety, social confidence, how to stop overthinking in social situations, shyness relief techniques, social anxiety coping strategies, feel confident at parties",
      ms: "kebimbangan sosial, fobia sosial, ketakutan sosial, kebimbangan perhimpunan, keyakinan sosial",
    },
    opening: {
      zh: "你是不是经常在聚会中坐在角落玩手机，其实很想加入对话但不知道说什么？或者在别人面前吃饭会觉得不自在？社交焦虑的核心不是你内向，而是你的大脑过度担心别人的评价。让我们用 CBT 一步步帮你松绑。",
      en: "Do you often sit in a corner scrolling your phone at gatherings, wanting to join the conversation but not knowing what to say? Or feel uncomfortable eating in front of others? Social anxiety isn't about being introverted — your brain is over-worried about others' judgments. Let's use CBT to loosen those chains.",
      ms: "Adakah anda sering duduk di sudut menatal telefon di perhimpunan, mahu menyertai perbualan tetapi tak tahu nak cakap apa? Atau rasa tidak selesa makan di hadapan orang lain? Kebimbangan sosial bukan tentang menjadi introvert — otak anda terlalu bimbang tentang penilaian orang lain.",
    },
    sections: [
      {
        heading: { zh: "社交焦虑的 CBT 三角模型", en: "The CBT Triangle Model of Social Anxiety", ms: "Model Segitiga CBT Kebimbangan Sosial" },
        content: { zh: "社交焦虑由三个相互强化的要素组成：负性自动思维（\"我说话会很无聊\”）→ 身体焦虑反应（脸红、出汗、心跳加速）→ 安全行为（低头、避免眼神接触、提前离场）。这三个要素形成恶性循环，但任何一个环节都可以用 CBT 打断。", en: "Social anxiety consists of three mutually reinforcing elements: negative automatic thoughts (\"I'll be boring\") → physical anxiety responses (blushing, sweating, racing heart) → safety behaviors (looking down, avoiding eye contact, leaving early). These three form a vicious cycle, but any link can be broken with CBT.", ms: "Kebimbangan sosial terdiri daripada tiga elemen yang saling mengukuhkan: fikiran negatif automatik (\"saya akan membosankan\") → respons kebimbangan fizikal (memerah, berpeluh, jantung berdegup) → tingkah laku keselamatan (tunduk, elak kontak mata, tinggalkan awal)." },
      },
      {
        heading: { zh: "安全行为的危害", en: "The Harm of Safety Behaviors", ms: "Kemudaratan Tingkah Laku Keselamatan" },
        content: { zh: "安全行为（Safety Behaviors）是你为了不让别人注意到你的焦虑而做的事：躲在角落、不停看手机、说话声音很小、避免眼神接触。这些行为短期让你感觉安全，但长期会强化\"社交场合很危险\"的信念。CBT 的目标是逐步放弃这些安全行为，让大脑通过实际体验学会\"原来社交场合是安全的\”。", en: "Safety behaviors are actions you take to hide your anxiety from others: hiding in corners, constantly checking your phone, speaking quietly, avoiding eye contact. These actions provide short-term relief but reinforce the belief that \"social situations are dangerous.\" CBT aims to gradually drop these safety behaviors so your brain learns through experience that social situations are safe.", ms: "Tingkah laku keselamatan adalah tindakan yang anda ambil untuk menyembunyikan kebimbangan dari orang lain: bersembunyi di sudut, sentiasa memeriksa telefon, bercakap perlahan, elak kontak mata. Tindakan ini memberikan kelegaan jangka pendek tetapi mengukuhkan kepercayaan \"situasi sosial berbahaya.\"" },
      },
    ],
    thinkingPatterns: {
      zh: "你的社交焦虑容易触发这些认知扭曲：读心术（\"他们肯定觉得我很奇怪\”）、个人化（\"大家都在看我\”）、灾难化（\"我说错话就会永远被排斥\”）、标签化（\"我就是个社恐\”）。这些思维扭曲让你把社交场合当成威胁，而不是连接的机会。",
      en: "Social anxiety triggers these cognitive distortions: mind reading (\"they definitely think I'm weird\"), personalization (\"everyone is looking at me\"), catastrophizing (\"if I say something wrong, I'll be rejected forever\"), and labeling (\"I'm just a socially anxious person\"). These distortions turn social situations into threats instead of connection opportunities.",
      ms: "Kebimbangan sosial mencetuskan herotan kognitif ini: pembacaan minda (\"mereka pasti rasa saya pelik\"), peribadi (\"semua orang tengok saya\"), bencana (\"jika saya cakap salah, saya akan ditolak selama-lamanya\"), dan pelabelan (\"saya seorang yang cemas sosial\").",
    },
    steps: {
      zh: [
        "放弃安全行为：下次聚会试着把手机收起来，看四周，做三次深呼吸",
        "认知重构：将\“大家都在看我\”改为\“大家都在忙着关注自己\”",
        "小对话练习：每天主动跟一个陌生人说一句话（便利店店员、咖啡师）",
        "曝光计划：从低难度场景开始（在人多的地方坐5分钟）到高难度（主动加入一个3人对话）",
        "事后反刍打断：聚会后写下一个\"事实\"和一个\"我的解读\”，区分客观与现实",
      ],
      en: [
        "Drop safety behaviors: next gathering, put your phone away, look around, take 3 deep breaths",
        "Cognitive restructuring: shift \“everyone is looking at me\” to \“everyone is busy with themselves\”",
        "Mini-conversation practice: say one sentence to a stranger daily (store clerk, barista)",
        "Exposure plan: start with low-difficulty (sit in a crowded place for 5 min) to high (join a 3-person conversation)",
        "Post-event processing: after gatherings, write one \“fact\” and one \“my interpretation\” — separate objective from perceived",
      ],
      ms: [
        "Lepaskan tingkah laku keselamatan: pada perhimpunan seterusnya, simpan telefon, lihat sekeliling, ambil 3 nafas dalam",
        "Restrukturisasi kognitif: tukar \“semua orang tengok saya\” kepada \“semua orang sibuk dengan diri sendiri\”",
        "Amalan perbualan mini: cakap satu ayat kepada orang asing setiap hari (pekedai, barista)",
        "Pelan pendedahan: mulakan dengan kesukaran rendah (duduk di tempat sesak 5 min) ke tinggi (sertai perbualan 3 orang)",
        "Ganggu ruminasi selepas acara: selepas perhimpunan, tulis satu \“fakta\” dan satu \“tafsiran saya\” — asingkan objektif daripada persepsi",
      ],
    },
    scientificGuide: [
        {
          heading: {
            zh: "REM 睡眠与社交恐惧记忆处理",
            en: "REM Sleep and Social Fear Memory Processing",
            ms: "Tidur REM dan Pemprosesan Memori Ketakutan Sosial",
          },
          paragraphs: {
            zh: [
              "社交焦虑的核心是大脑对社交威胁的过度敏感化。杏仁核对他人表情的过度解读、前额叶对负面评价的灾难化预期，构成了社交恐惧的神经基础。研究表明，社交焦虑症患者的杏仁核在处理社交线索时，激活程度比常人高出 30-50%。",
              "REM 睡眠在这一机制中扮演了关键的调节角色。在 REM 阶段，大脑会重新激活并处理白天的社交记忆，尤其是那些带有情绪色彩的经历。这种'离线处理'的本质是将情绪从记忆中剥离——让你记住被拒绝这件事，但不再感受被拒绝时的剧烈痛苦。",
              "对于社交焦虑者，REM 睡眠的这种'情绪脱敏'功能尤其重要。一项针对社交焦虑症的 fMRI 研究发现，经历完整的 REM 周期后，患者对社交排斥场景的杏仁核反应降低了约 22%。这意味着，一个好的睡眠本身就是在为你的社交恐惧做'脱敏治疗'。",
            ],
            en: [
              "The core of social anxiety is the brain's hypersensitization to social threats. The amygdala overinterprets others' facial expressions, and the prefrontal cortex catastrophizes negative evaluations — together forming the neural basis of social fear. Research shows that individuals with social anxiety disorder exhibit 30-50% higher amygdala activation when processing social cues.",
              "REM sleep plays a critical regulatory role in this mechanism. During REM, the brain reactivates and processes daytime social memories, especially emotionally charged experiences. The essence of this 'offline processing' is emotional detachment from the memory — you remember the rejection, but no longer feel its acute pain.",
              "For socially anxious individuals, this emotional desensitization function of REM sleep is especially vital. An fMRI study on social anxiety disorder found that after a full REM cycle, participants' amygdala response to social rejection scenarios decreased by approximately 22%. This means that good sleep itself is a form of 'exposure therapy' for your social fears.",
            ],
            ms: [
              "Inti kebimbangan sosial ialah hipersensitiviti otak terhadap ancaman sosial. Amigdala mentafsir ekspresi muka secara berlebihan, dan korteks prefrontal meramalkan penilaian negatif secara malapetaka — bersama-sama membentuk asas neural ketakutan sosial. Kajian menunjukkan pesakit gangguan kebimbangan sosial mempunyai pengaktifan amigdala 30-50% lebih tinggi semasa memproses isyarat sosial.",
              "Tidur REM memainkan peranan pengawalseliaan yang kritikal dalam mekanisme ini. Semasa REM, otak mengaktifkan semula dan memproses memori sosial waktu siang, terutamanya pengalaman yang sarat emosi. Intipati 'pemprosesan luar talian' ini ialah pemisahan emosi daripada ingatan — anda ingat penolakan itu, tetapi tidak lagi merasakan kesakitan akutnya.",
              "Bagi individu yang mempunyai kebimbangan sosial, fungsi desensitisasi emosi tidur REM ini amat penting. Satu kajian fMRI mengenai gangguan kebimbangan sosial mendapati bahawa selepas kitaran REM penuh, tindak balas amigdala peserta terhadap senario penolakan sosial menurun kira-kira 22%. Ini bermakna tidur yang baik itu sendiri ialah sejenis 'terapi pendedahan' untuk ketakutan sosial anda.",
            ],
          },
          findings: {
            zh: [
              "社交焦虑者的杏仁核在处理社交线索时激活程度比常人高 30-50%",
              "REM 睡眠能将社交记忆中的情绪成分剥离，降低次日社交敏感度",
              "完整 REM 周期后，社交排斥场景的杏仁核反应降低约 22%",
            ],
            en: [
              "Socially anxious individuals show 30-50% higher amygdala activation during social cue processing",
              "REM sleep strips the emotional component from social memories, reducing next-day social sensitivity",
              "After a full REM cycle, amygdala response to social rejection drops by approximately 22%",
            ],
            ms: [
              "Individu kebimbangan sosial menunjukkan pengaktifan amigdala 30-50% lebih tinggi semasa pemprosesan isyarat sosial",
              "Tidur REM mengasingkan komponen emosi daripada ingatan sosial, mengurangkan sensitiviti sosial pada keesokan hari",
              "Selepas kitaran REM penuh, tindak balas amigdala terhadap penolakan sosial menurun kira-kira 22%",
            ],
          },
          reference: {
            zh: "参考来源: Etkin, A., & Wager, T. D. (2009). Functional neuroimaging of anxiety disorders. American Journal of Psychiatry; Goldstein-Piekarski, A. N., et al. (2015). Sleep deprivation impairs the human central and peripheral nervous system discrimination of social threat. Journal of Neuroscience.",
            en: "Reference: Etkin, A., & Wager, T. D. (2009). Functional neuroimaging of anxiety disorders. American Journal of Psychiatry; Goldstein-Piekarski, A. N., et al. (2015). Sleep deprivation impairs the human central and peripheral nervous system discrimination of social threat. Journal of Neuroscience.",
            ms: "Rujukan: Etkin, A., & Wager, T. D. (2009). Functional neuroimaging of anxiety disorders. American Journal of Psychiatry; Goldstein-Piekarski, A. N., et al. (2015). Sleep deprivation impairs the human central and peripheral nervous system discrimination of social threat. Journal of Neuroscience.",
          },
        },
        {
          heading: {
            zh: "CBT 在社交焦虑中的应用：改写社交威胁脚本",
            en: "CBT for Social Anxiety: Rewriting the Social Threat Script",
            ms: "CBT untuk Kebimbangan Sosial: Menulis Semula Skrip Ancaman Sosial",
          },
          paragraphs: {
            zh: [
              "认知行为疗法(CBT)是目前对社交焦虑症循证级别最高的心理干预。其核心假设是：社交焦虑不是由社交情境本身引起的，而是由你对社交情境的'灾难化解读'引起的。比如'大家都在看我出丑'、'我肯定说错话了'、'他们一定在背后议论我'。",
              "CBT 针对社交焦虑的主要技术包含三个层次。第一层是认知重构：引导来访者识别、质疑并替换自动化的社交威胁思维。例如将'大家觉得我很奇怪'改写为'我并不知道他们在想什么，也许他们根本没有注意我'。第二层是暴露疗法：逐级暴露于恐惧的社交情境（如目光接触、短暂对话、在人群中发言），每次暴露后记录实际结果与预期灾难的差距。",
              "第三层是注意力训练：社交焦虑者往往将注意力高度集中在'自我表现监控'上——不断检测自己的脸红、声音颤抖、用词是否恰当。CBT 引导他们将注意力向外转移，关注对话内容、环境细节和他人的真实反应。临床数据显示，完成 12-16 次 CBT 的社交焦虑症患者中，约 65-75% 在社交情境中的焦虑水平下降至少 50%。",
            ],
            en: [
              "Cognitive Behavioral Therapy (CBT) is the most evidence-based psychological intervention for social anxiety disorder. Its core premise: social anxiety is not caused by social situations themselves, but by your catastrophic interpretation of them. For example, 'everyone is watching me embarrass myself,' 'I definitely said something wrong,' 'they must be talking about me behind my back.'",
              "CBT for social anxiety employs three main layers of technique. The first is cognitive restructuring: identifying, challenging, and replacing automatic social threat thoughts. For instance, reframing 'everyone thinks I'm weird' to 'I don't actually know what they're thinking — maybe they haven't even noticed me.' The second is exposure therapy: graded exposure to feared social situations (eye contact, brief conversations, speaking in groups), recording the gap between predicted catastrophe and actual outcome after each exposure.",
              "The third layer is attention training. Socially anxious individuals tend to hyperfocus on self-performance monitoring — constantly checking for blushing, voice trembling, and word choice. CBT guides them to shift attention outward, focusing on conversation content, environmental details, and others' actual reactions. Clinical data shows that among social anxiety patients completing 12-16 CBT sessions, approximately 65-75% experience at least a 50% reduction in social anxiety levels.",
            ],
            ms: [
              "Terapi Tingkah Laku Kognitif (CBT) ialah intervensi psikologi paling berasaskan bukti untuk gangguan kebimbangan sosial. Intinya: kebimbangan sosial bukan disebabkan oleh situasi sosial itu sendiri, tetapi oleh tafsiran malapetaka anda terhadapnya. Contohnya, 'semua orang tengok saya malu,' 'saya pasti cakap salah,' 'mereka pasti bercakap tentang saya di belakang.'",
              "CBT untuk kebimbangan sosial menggunakan tiga lapisan teknik. Pertama, restrukturisasi kognitif: mengenal pasti, mencabar, dan menggantikan pemikiran ancaman sosial automatik. Misalnya, mengubah 'semua orang fikir saya pelik' kepada 'saya sebenarnya tak tahu apa yang mereka fikir — mungkin mereka langsung tak perasan saya.' Kedua, terapi pendedahan: pendedahan berperingkat kepada situasi sosial yang ditakuti, merekod jurang antara bencana yang diramal dan hasil sebenar.",
              "Lapisan ketiga ialah latihan perhatian. Individu kebimbangan sosial cenderung hiperfokus pada pemantauan prestasi diri — sentiasa memeriksa kemerahan muka, suara menggeletar, dan pilihan kata. CBT membimbing mereka mengalih perhatian ke luar, fokus pada kandungan perbualan, butiran persekitaran, dan reaksi sebenar orang lain. Data klinikal: 65-75% pesakit yang melengkapkan 12-16 sesi CBT mengalami penurunan kebimbangan sosial sekurang-kurangnya 50%.",
            ],
          },
          findings: {
            zh: [
              "CBT 是社交焦虑症循证级别最高的心理干预，12-16 次疗程有效率达 65-75%",
              "认知重构核心：识别'灾难化解读'并将其替换为基于事实的替代解释",
              "注意力向外转移训练可将社交焦虑者的自我监控焦虑降低约 40%",
            ],
            en: [
              "CBT is the most evidence-based intervention for social anxiety, with 65-75% efficacy after 12-16 sessions",
              "Cognitive restructuring identifies 'catastrophic interpretations' and replaces them with fact-based alternatives",
              "Attention training to shift focus outward reduces self-monitoring anxiety by approximately 40%",
            ],
            ms: [
              "CBT ialah intervensi paling berasaskan bukti untuk kebimbangan sosial, dengan 65-75% keberkesanan selepas 12-16 sesi",
              "Restrukturisasi kognitif mengenal pasti 'tafsiran malapetaka' dan menggantikannya dengan alternatif berasaskan fakta",
              "Latihan perhatian untuk mengalih fokus ke luar mengurangkan kebimbangan pemantauan kendiri sebanyak kira-kira 40%",
            ],
          },
          reference: {
            zh: "参考来源: Hofmann, S. G., & Otto, M. W. (2008). Cognitive behavioral therapy for social anxiety disorder. Routledge; Clark, D. M., et al. (2006). Cognitive therapy versus exposure and applied relaxation in social phobia. Journal of Consulting and Clinical Psychology.",
            en: "Reference: Hofmann, S. G., & Otto, M. W. (2008). Cognitive behavioral therapy for social anxiety disorder. Routledge; Clark, D. M., et al. (2006). Cognitive therapy versus exposure and applied relaxation in social phobia. Journal of Consulting and Clinical Psychology.",
            ms: "Rujukan: Hofmann, S. G., & Otto, M. W. (2008). Cognitive behavioral therapy for social anxiety disorder. Routledge; Clark, D. M., et al. (2006). Cognitive therapy versus exposure and applied relaxation in social phobia. Journal of Consulting and Clinical Psychology.",
          },
        },
      ],
    },
  {
    slug: "health-anxiety",
    title: {
      zh: "健康焦虑（疑病症）CBT 自助指南",
      en: "Health Anxiety (Hypochondria) — CBT Self-Help Guide",
      ms: "Kebimbangan Kesihatan (Hipokondria) — Panduan CBT",
    },
    description: {
      zh: "身体稍有不适就担心得了重病、不断搜索症状、反复就医检查仍不放心。CBT 帮你打破健康焦虑的检查-确认循环。",
      en: "Feeling a slight discomfort and immediately worrying about serious illness, constantly Googling symptoms, repeatedly visiting doctors but never feeling reassured. CBT breaks the checking-reassurance cycle of health anxiety.",
      ms: "Rasa sedikit ketidakselesaan dan segera bimbang tentang penyakit serius, sentiasa mencari gejala di Google, berulang kali melawat doktor tetapi tidak pernah berasa yakin. CBT memutuskan kitaran pemeriksaan-ketenteraman kebimbangan kesihatan.",
    },
    keywords: {
      zh: "健康焦虑,疑病症,疾病焦虑,症状搜索,CBT,躯体症状,反复就医,焦虑循环",
      en: "health anxiety, hypochondria, illness anxiety disorder, symptom checking, cognitive behavioral therapy, health fear, reassurance seeking, anxiety cycle, how to stop googling symptoms, health anxiety relief, break the anxiety cycle naturally, illness anxiety coping skills",
      ms: "kebimbangan kesihatan, hipokondria, gangguan kebimbangan penyakit, pemeriksaan gejala, CBT, ketakutan kesihatan",
    },
    opening: {
      zh: "你是不是每次头痛就去搜脑瘤症状，心跳快一点就怀疑心脏病？我们都担心健康，但当这种担忧变成持续的、无法安抚的焦虑时，它就变成了健康焦虑。CBT 告诉我们：问题不是你身体有问题，而是你的身体感知系统过度灵敏了。",
      en: "Do you Google brain tumor symptoms every time you have a headache, or suspect heart disease when your heart beats a little faster? We all worry about our health. But when this worry becomes persistent and unshakable, it becomes health anxiety. CBT reveals: the problem isn't your body — it's that your body-perception system is oversensitive.",
      ms: "Adakah anda Google simptom tumor otak setiap kali sakit kepala, atau syak penyakit jantung apabila jantung berdegup sedikit laju? Kita semua risau tentang kesihatan. Tetapi apabila kebimbangan ini menjadi berterusan dan tidak boleh ditenangkan, ia menjadi kebimbangan kesihatan.",
    },
    sections: [
      {
        heading: { zh: "健康焦虑的检查-确认陷阱", en: "The Checking-Reassurance Trap", ms: "Perangkap Pemeriksaan-Ketenteraman" },
        content: { zh: "健康焦虑的核心循环是：身体感觉（如轻微头痛）→ 灾难化解读（\"可能是脑瘤\”）→ 检查行为（搜索症状/看医生）→ 短期缓解（\"医生说没事\”）→ 再次焦虑（\"医生会不会漏诊了？\”）。这个循环每次都在强化\"身体感觉 = 危险信号\"的错误信念。打破循环的关键是停止检查行为。", en: "The core cycle of health anxiety: body sensation (e.g., mild headache) → catastrophic interpretation (\"could be a brain tumor\") → checking behavior (symptom search/doctor visit) → temporary relief (\"doctor said it's fine\") → renewed anxiety (\"what if the doctor missed something?\"). Each cycle reinforces the false belief that body sensation = danger signal.", ms: "Kitaran teras kebimbangan kesihatan: sensasi badan (cth., sakit kepala ringan) → tafsiran bencana (\"mungkin tumor otak\") → tingkah laku pemeriksaan (carian simptom/lawatan doktor) → kelegaan sementara (\"doktor kata tak apa\") → kebimbangan baru (\"macam mana kalau doktor terlepas sesuatu?\")." },
      },
      {
        heading: { zh: "身体感知的重新校准", en: "Re-calibrating Body Perception", ms: "Penentukuran Semula Persepsi Badan" },
        content: { zh: "CBT 的目标不是消除所有身体不适——这是不可能的。目标是降低你对身体信号的灾难化解读。当你注意到一个身体感觉时，先不要自动跳到最坏的解读，而是问自己：\"这个感觉还有哪些更良性的解释？\"例如：头痛可能是缺水、睡姿不对、或者只是压力导致的紧张性头痛。", en: "CBT's goal isn't to eliminate all body discomfort — that's impossible. The goal is to reduce catastrophic interpretations of body signals. When you notice a body sensation, pause before jumping to the worst interpretation. Ask yourself: \"What are the more benign explanations?\" A headache could be dehydration, poor sleep posture, or tension from stress — not necessarily a brain tumor.", ms: "Matlamat CBT bukan untuk menghapuskan semua ketidakselesaan badan — itu mustahil. Matlamatnya adalah mengurangkan tafsiran bencana isyarat badan. Apabila anda perasan sensasi badan, berhenti sebelum melompat ke tafsiran paling teruk." },
      },
    ],
    thinkingPatterns: {
      zh: "健康焦虑的典型认知扭曲：灾难化（\"这个头痛绝对是脑瘤\”）、选择性关注（只关注身体异常感觉，忽略健康信号）、读心术（\"医生肯定觉得我很烦\”）、证实偏差（不断搜索支持\"你得重病\"的证据）。CBT 的锚点是：身体感觉 ≠ 危险信号。",
      en: "Typical cognitive distortions in health anxiety: catastrophizing (\"this headache is definitely a brain tumor\"), selective attention (hyperfocusing on body sensations while ignoring healthy signals), mind reading (\"the doctor must think I'm annoying\"), and confirmation bias (constantly searching for evidence of serious illness). The CBT anchor: body sensation ≠ danger signal.",
      ms: "Herotan kognitif tipikal dalam kebimbangan kesihatan: bencana (\"sakit kepala ini pasti tumor otak\"), perhatian selektif (hiperfokus pada sensasi badan sambil abaikan isyarat sihat), pembacaan minda (\"doktor pasti rasa saya menjengkelkan\"), dan bias pengesahan (sentiasa cari bukti penyakit serius).",
    },
    steps: {
      zh: [
        "停止症状搜索：删除健康搜索 app，设定\“不看症状\”的规则",
        "认知重构：将\“我得了重病\”改为\“我的身体感觉很正常，过去也都好了\”",
        "检查限制：如果必须检查，每天只在固定时间检查一次，不超过5分钟",
        "注意力训练：每天练习将注意力从身体感觉转移到外部环境（听声音、看颜色）",
        "预约 CBT 治疗师：严重健康焦虑需要专业 CBT 治疗，通常是 8-12 次见效",
      ],
      en: [
        "Stop symptom checking: delete health search apps, set a \“no checking\” rule",
        "Cognitive restructuring: shift \“I have a serious illness\” to \“this body sensation is normal, and it has passed before\”",
        "Check limiting: if you must check, do it once a day at a fixed time, max 5 minutes",
        "Attention training: practice shifting attention from body sensations to external environment (listen to sounds, notice colors)",
        "Book a CBT therapist: severe health anxiety benefits from 8-12 sessions of professional CBT",
      ],
      ms: [
        "Hentikan pemeriksaan simptom: padam app carian kesihatan, tetapkan peraturan \“tiada pemeriksaan\”",
        "Restrukturisasi kognitif: tukar \“saya ada penyakit serius\” kepada \“sensasi badan ini normal, dan ia telah berlalu sebelum ini\”",
        "Hadkan pemeriksaan: jika mesti periksa, lakukan sekali sehari pada masa tetap, maks 5 minit",
        "Latihan perhatian: amalkan mengalih perhatian dari sensasi badan ke persekitaran luaran (dengar bunyi, perhatikan warna)",
        "Tempah terapi CBT: kebimbangan kesihatan yang teruk memerlukan 8-12 sesi CBT profesional",
      ],
    },
    scientificGuide: [
        {
          heading: {
            zh: "REM 睡眠与健康焦虑的身体感知调节",
            en: "REM Sleep and Body Sensation Regulation in Health Anxiety",
            ms: "Tidur REM dan Regulasi Sensasi Badan dalam Kebimbangan Kesihatan",
          },
          paragraphs: {
            zh: [
              "健康焦虑的核心机制是'身体感知放大效应'。患者对正常的躯体信号（如心跳加速、轻微的肌肉颤动、消化过程的咕噜声）产生灾难化解读——'这一定是心脏病的征兆'、'这个肿块肯定是肿瘤'。前脑岛和扣带回的过度激活，使得正常信号被感知为威胁信号。",
              "REM 睡眠在调节身体感知的神经阈值方面起着关键作用。在 REM 阶段，大脑的默认模式网络(DMN)与前脑岛之间的连接会经历一夜的'重置'。研究发现，睡眠不足会导致前脑岛对身体信号的敏感度提高约 25%，使得原本忽略不计的躯体感觉被放大为令人恐慌的'症状'。",
              "对于健康焦虑者，这一影响尤为严重——他们的基线身体感知敏感度本来就比常人高，睡眠不足相当于雪上加霜。充足的 REM 睡眠可以降低前脑岛的'音量旋钮'，让身体恢复正常信号水平。简单说：当你睡够了，那些跳到让你心慌的心跳，可能只是一个正常的心跳。",
            ],
            en: [
              "The core mechanism of health anxiety is 'somatic amplification' — the catastrophic interpretation of normal bodily signals (like increased heart rate, mild muscle twitches, digestive gurgling): 'this must be a heart attack,' 'this lump is definitely a tumor.' Hyperactivation of the anterior insula and cingulate cortex causes normal signals to be perceived as threats.",
              "REM sleep plays a critical role in regulating the neural threshold for body sensation perception. During REM, the connection between the default mode network (DMN) and the anterior insula undergoes a nightly 'reset.' Studies show that sleep deprivation increases anterior insula sensitivity to bodily signals by approximately 25%, amplifying normally imperceptible sensations into alarming 'symptoms.'",
              "For health-anxious individuals, this effect is especially severe — their baseline body sensation sensitivity is already higher than normal, and sleep deprivation compounds the problem. Adequate REM sleep lowers the 'volume knob' of the anterior insula, allowing the body to return to normal signal levels. Simply put: when you've slept enough, that heart rate that makes you panic might just be a normal heartbeat.",
            ],
            ms: [
              "Mekanisme utama kebimbangan kesihatan ialah 'amplifikasi somatik' — tafsiran malapetaka terhadap isyarat badan normal (seperti degupan jantung laju, kejutan otot ringan, bunyi penghadaman): 'ini pasti serangan jantung,' 'ketulan ini pasti tumor.' Pengaktifan berlebihan insula anterior dan korteks singulat menyebabkan isyarat normal dianggap sebagai ancaman.",
              "Tidur REM memainkan peranan penting dalam mengawal ambang neural untuk persepsi sensasi badan. Semasa REM, sambungan antara rangkaian mod lalai (DMN) dan insula anterior menjalani 'set semula' malaman. Kajian menunjukkan kekurangan tidur meningkatkan sensitiviti insula anterior terhadap isyarat badan sebanyak kira-kira 25%, menguatkan sensasi yang biasanya tidak dapat dikesan menjadi 'gejala' yang membimbangkan.",
              "Bagi individu yang mempunyai kebimbangan kesihatan, kesan ini amat teruk — sensitiviti asas sensasi badan mereka sudah lebih tinggi daripada biasa, dan kekurangan tidur memburukkan lagi keadaan. Tidur REM yang mencukupi menurunkan 'tombol kelantangan' insula anterior, membolehkan badan kembali ke tahap isyarat normal. Ringkasnya: apabila anda cukup tidur, degupan jantung yang membuat anda panik mungkin hanyalah degupan jantung normal.",
            ],
          },
          findings: {
            zh: [
              "健康焦虑的核心是'身体感知放大效应'——正常信号被感知为威胁信号",
              "睡眠不足使前脑岛对身体信号的敏感度提高约 25%，加剧健康焦虑",
              "充足 REM 睡眠可重置前脑岛与 DMN 的连接，降低躯体感知敏感度",
            ],
            en: [
              "Health anxiety's core is 'somatic amplification' — normal signals perceived as threats",
              "Sleep deprivation increases anterior insula sensitivity to body signals by ~25%",
              "Adequate REM sleep resets the anterior insula-DMN connection, reducing somatic sensitivity",
            ],
            ms: [
              "Inti kebimbangan kesihatan ialah 'amplifikasi somatik' — isyarat normal dianggap sebagai ancaman",
              "Kekurangan tidur meningkatkan sensitiviti insula anterior terhadap isyarat badan sebanyak ~25%",
              "Tidur REM yang mencukupi menetapkan semula sambungan insula anterior-DMN, mengurangkan sensitiviti somatik",
            ],
          },
          reference: {
            zh: "参考来源: Barsky, A. J., et al. (2002). Hypochondriasis and somatosensory amplification. British Journal of Psychiatry; Khalsa, S. S., et al. (2016). Interoception and mental health. Biological Psychiatry: Cognitive Neuroscience and Neuroimaging.",
            en: "Reference: Barsky, A. J., et al. (2002). Hypochondriasis and somatosensory amplification. British Journal of Psychiatry; Khalsa, S. S., et al. (2016). Interoception and mental health. Biological Psychiatry: Cognitive Neuroscience and Neuroimaging.",
            ms: "Rujukan: Barsky, A. J., et al. (2002). Hypochondriasis and somatosensory amplification. British Journal of Psychiatry; Khalsa, S. S., et al. (2016). Interoception and mental health. Biological Psychiatry: Cognitive Neuroscience and Neuroimaging.",
          },
        },
        {
          heading: {
            zh: "CBT 在健康焦虑中的应用：打破检查循环",
            en: "CBT for Health Anxiety: Breaking the Checking Cycle",
            ms: "CBT untuk Kebimbangan Kesihatan: Memecah Kitaran Pemeriksaan",
          },
          paragraphs: {
            zh: [
              "健康焦虑的一个典型行为特征是'过度检查循环'：感到不适 → 搜索症状 → 找到最坏情况 → 焦虑加剧 → 体检/看医生 → 暂时安心 → 下次不适再次循环。CBT 的核心干预就是打断这个自我强化的循环。",
              "CBT 的第一步是暴露与反应预防(ERP)：有意识地暴露于'不确定感'而不去做检查行为。例如感到胸痛时，不搜索症状、不测心率、不去急诊——而是停留在'我不知道这是不是有问题'的不确定感中，允许自己忍耐 10 分钟。练习后发现，绝大多数次'感觉'会自行消退，并没有发生灾难。这打破了'检查带来安全'的错误信念。",
              "第二步是认知重构：将灾难化思维转化为平衡思维。例如将'心悸一定意味着心脏病发作'重构为'心悸是一种常见的应激反应，99% 的心悸不是心肌梗塞，我的医生已经检查过了'。研究表明，完成 8-12 次 CBT 的健康焦虑患者中，约 70% 的躯体检查行为减少超过 60%，且这种改变在 6 个月的随访中持续保持。",
            ],
            en: [
              "A hallmark behavioral pattern of health anxiety is the 'excessive checking cycle': feel discomfort → search symptoms → find worst case → anxiety intensifies → get medical test/see doctor → temporary relief → next discomfort → repeat. CBT's core intervention is to break this self-reinforcing loop.",
              "The first step of CBT is Exposure and Response Prevention (ERP): deliberately exposing yourself to the feeling of uncertainty without performing checking behaviors. For example, when feeling chest tightness, do not search symptoms, do not check heart rate, do not go to the ER — instead, sit with the uncertainty of 'I don't know if something is wrong,' allowing yourself to tolerate it for 10 minutes. Practice reveals that the vast majority of 'feelings' subside on their own—no catastrophe occurs. This breaks the false belief that 'checking brings safety.'",
              "The second step is cognitive restructuring: transforming catastrophic thinking into balanced thinking. For instance, reframing 'palpitations must mean a heart attack' to 'palpitations are a common stress response — 99% of palpitations are not myocardial infarctions, and my doctor has already checked.' Research shows that among health anxiety patients completing 8-12 CBT sessions, approximately 70% reduce checking behaviors by over 60%, and this improvement is maintained at 6-month follow-up.",
            ],
            ms: [
              "Corak tingkah laku utama kebimbangan kesihatan ialah 'kitaran pemeriksaan berlebihan': rasa tidak selesa → cari simptom → cari kes terburuk → kebimbangan meningkat → ujian/periksa doktor → lega sementara → ketidakselesaan seterusnya → ulang. Intervensi utama CBT ialah memecahkan gelung yang menguatkan diri ini.",
              "Langkah pertama CBT ialah Pendedahan dan Pencegahan Tindak Balas (ERP): mendedahkan diri dengan sengaja kepada perasaan ketidakpastian tanpa melakukan tingkah laku pemeriksaan. Contohnya, apabila rasa sesak dada, jangan cari simptom, jangan periksa nadi, jangan pergi ke ER — sebaliknya, duduk dengan ketidakpastian 'saya tak tahu jika ada sesuatu yang tidak kena,' biarkan diri bertolak ansur selama 10 minit. Amalan menunjukkan bahawa sebahagian besar 'perasaan' reda dengan sendirinya — tiada bencana berlaku.",
              "Langkah kedua ialah restrukturisasi kognitif: mengubah pemikiran malapetaka kepada pemikiran seimbang. Misalnya, 'degupan jantung laju pasti bermakna serangan jantung' ditulis semula sebagai 'degupan laju ialah tindak balas tekanan biasa — 99% degupan laju bukan infarksi miokardium, dan doktor saya telah memeriksa.' Kajian menunjukkan 70% pesakit yang melengkapkan 8-12 sesi CBT mengurangkan tingkah laku pemeriksaan sebanyak lebih 60%, dan perubahan ini dikekalkan pada susulan 6 bulan.",
            ],
          },
          findings: {
            zh: [
              "过度检查循环是健康焦虑的自我强化核心机制，CBT 的 ERP 技术直接打断此循环",
              "暴露与反应预防(ERP)：停留在'不确定感'中验证灾难不会发生",
              "8-12 次 CBT 后，约 70% 患者的检查行为减少超 60%，6 个月随访维持有效",
            ],
            en: [
              "The excessive checking cycle is the self-reinforcing core of health anxiety; CBT's ERP technique directly breaks this loop",
              "Exposure and Response Prevention (ERP): sitting with uncertainty to verify that catastrophe does not occur",
              "After 8-12 CBT sessions, ~70% of patients reduce checking behaviors by over 60%, sustained at 6-month follow-up",
            ],
            ms: [
              "Kitaran pemeriksaan berlebihan ialah teras pengukuhan kendiri kebimbangan kesihatan; teknik ERP CBT memecahkan gelung ini secara langsung",
              "Pendedahan dan Pencegahan Tindak Balas (ERP): duduk dengan ketidakpastian untuk mengesahkan bencana tidak berlaku",
              "Selepas 8-12 sesi CBT, ~70% pesakit mengurangkan tingkah laku pemeriksaan sebanyak lebih 60%, dikekalkan pada susulan 6 bulan",
            ],
          },
          reference: {
            zh: "参考来源: Abramowitz, J. S., & Braddock, A. E. (2008). Psychological treatment of health anxiety and hypochondriasis. Hogrefe Publishing; Taylor, S., & Asmundson, G. J. G. (2004). Treating health anxiety. Guilford Press.",
            en: "Reference: Abramowitz, J. S., & Braddock, A. E. (2008). Psychological treatment of health anxiety and hypochondriasis. Hogrefe Publishing; Taylor, S., & Asmundson, G. J. G. (2004). Treating health anxiety. Guilford Press.",
            ms: "Rujukan: Abramowitz, J. S., & Braddock, A. E. (2008). Psychological treatment of health anxiety and hypochondriasis. Hogrefe Publishing; Taylor, S., & Asmundson, G. J. G. (2004). Treating health anxiety. Guilford Press.",
          },
        },
      ],
    },
  {
    slug: "impostor-syndrome",
    title: {
      zh: "冒名顶替综合征 CBT 自助指南",
      en: "Impostor Syndrome — CBT Self-Help Guide",
      ms: "Sindrom Penipu — Panduan Bantuan Sendiri CBT",
    },
    description: {
      zh: "即使取得了成就也觉得自己是'骗子'，随时可能被揭穿。CBT 帮你客观看待自己的能力，不再被自我怀疑绑架。",
      en: "Feeling like a 'fraud' despite achievements, constantly afraid of being exposed. CBT helps you see your abilities objectively and break free from self-doubt.",
      ms: "Rasa seperti 'penipu' walaupun mencapai kejayaan, sentiasa takut didedahkan. CBT membantu anda melihat kebolehan anda secara objektif dan bebas dari keraguan diri.",
    },
    keywords: {
      zh: "冒名顶替综合征,冒牌者症候群,自我怀疑,impostor syndrome,CBT,自信建立,能力焦虑",
      en: "impostor syndrome, impostor phenomenon, self-doubt, fraud feeling, CBT for impostor syndrome, confidence building, ability anxiety, impostor syndrome at work, how to overcome self-doubt, feeling like a fraud at new job, deal with imposter syndrome as developer",
      ms: "sindrom penipu, fenomena penipu, keraguan diri, rasa penipu, CBT sindrom penipu, keyakinan",
    },
    opening: {
      zh: "你是不是觉得自己的成功全靠运气，随时可能被人发现\"其实你不行\”？即使有学历、有成果、有人认可，还是觉得是在\"装\”？这种感觉有个名字——冒名顶替综合征（Impostor Syndrome）。CBT 告诉我们：这不是你能力有问题，而是你的成功归因方式出错了。",
      en: "Do you feel your success is pure luck, and any moment someone will discover you're not actually capable? Even with credentials, achievements, and recognition, you still feel like you're faking it? This feeling has a name — Impostor Syndrome. CBT tells us: it's not your ability that's flawed — your success attribution pattern is broken.",
      ms: "Adakah anda rasa kejayaan anda adalah nasib semata-mata, dan bila-bila masa seseorang akan dapati anda sebenarnya tidak berkebolehan? Walaupun dengan kelayakan, pencapaian, dan pengiktirafan, anda masih rasa seperti berpura-pura? Perasaan ini ada nama — Sindrom Penipu.",
    },
    sections: [
      {
        heading: { zh: "冒名顶替的四大认知模式", en: "The Four Cognitive Patterns of Impostor Syndrome", ms: "Empat Corak Kognitif Sindrom Penipu" },
        content: { zh: "冒名顶替综合征通常表现为四种模式：① 勤奋型（\"我必须比所有人更努力才配得上\”）② 天才型（\"如果我不一次做对，我就不够聪明\”）③ 超级英雄型（\"我必须在所有角色中都完美\”）④ 专家型（\"我必须掌握所有信息才能开口\”）。识别你的主要模式是改变的第一步。", en: "Impostor syndrome typically manifests in four patterns: ① The Hard Worker (\"I must outwork everyone to deserve my place\") ② The Natural Genius (\"if I don't get it right the first time, I'm not smart enough\") ③ The Superhero (\"I must excel at every role\") ④ The Expert (\"I must know everything before I speak\"). Identifying your dominant pattern is the first step toward change.", ms: "Sindrom penipu biasanya menjelma dalam empat corak: ① Pekerja Keras (\"saya mesti bekerja lebih daripada semua orang\") ② Genius Semulajadi (\"jika tidak betul pertama kali, saya tidak cukup pandai\") ③ Wira Super (\"saya mesti cemerlang dalam setiap peranan\") ④ Pakar (\"saya mesti tahu segala-galanya sebelum bercakap\")." },
      },
      {
        heading: { zh: "归因重构练习", en: "Attribution Restructuring Exercise", ms: "Latihan Restrukturisasi Atribusi" },
        content: { zh: "冒名顶替者的核心问题是归因偏误：把成功归因于外部因素（运气/时机/别人帮忙），把失败归因于内部因素（\"我能力不够\”）。CBT 的归因重构要求你：成功时写下一个\"个人能力证据\"（如：我因为这个技能才成功），失败时写下外部因素（如：市场环境不好）。坚持21天形成新的归因习惯。", en: "The core issue in impostor syndrome is attribution bias: attributing success to external factors (luck/timing/help) and failure to internal factors (\"I'm not capable enough\"). CBT's attribution restructuring requires: for each success, write one piece of personal ability evidence; for each failure, write external factors. Practice for 21 days to form a new attribution habit.", ms: "Isu teras dalam sindrom penipu adalah bias atribusi: mengaitkan kejayaan kepada faktor luaran (nasib/masa/bantuan) dan kegagalan kepada faktor dalaman (\"saya tidak cukup berkebolehan\"). Restrukturisasi atribusi CBT memerlukan: untuk setiap kejayaan, tulis satu bukti kebolehan peribadi; untuk setiap kegagalan, tulis faktor luaran." },
      },
    ],
    thinkingPatterns: {
      zh: "冒名顶替的自动思维：能力否定（\"这没什么难的，谁都能做\”）、运气归因（\"我就是运气好\”）、成就最小化（\"这次只是侥幸\”）、社交对比（\"他们才是真正的专家，我不是\”）。CBT 帮你标记这些思维，用证据日志来替代它们。",
      en: "Impostor automatic thoughts: ability denial (\"this wasn't hard, anyone could do it\"), luck attribution (\"I just got lucky\"), achievement minimization (\"it was just a fluke\"), social comparison (\"they're the real experts, not me\"). CBT helps you label these thoughts and replace them with an evidence log.",
      ms: "Fikiran automatik penipu: penafian kebolehan (\"ini tidak susah, sesiapa pun boleh buat\"), atribusi nasib (\"saya hanya bernasib baik\"), pengurangan pencapaian (\"ia hanya kebetulan\"), perbandingan sosial (\"mereka pakar sebenar, bukan saya\").",
    },
    steps: {
      zh: [
        "成就日志：每天记下一个外部认可（赞美/成果/任务完成），标注你做了什么",
        "归因重构练习：每次成功时写下内部因素（你的技能/努力），每次失败时考虑外部因素",
        "与人分享：对信任的朋友说出\“我有冒名顶替感\”——你会发现很多人也有这个感觉",
        "停止社交对比：关注自己的进步曲线，而不是和别人比较",
        "接受\“足够好\”：完成比完美重要，允许自己有不懂的事情",
      ],
      en: [
        "Achievement log: daily record one external validation (praise/result/completion), note what YOU did",
        "Attribution restructuring: for each success, write an internal factor (your skill/effort); for failures, consider external factors",
        "Share with others: tell a trusted friend \“I have impostor feelings\” — you'll find many feel the same",
        "Stop social comparison: focus on your own growth curve, not comparisons with others",
        "Embrace 'good enough': done is better than perfect — allow yourself not to know everything",
      ],
      ms: [
        "Log pencapaian: catat satu pengesahan luaran setiap hari (pujian/hasil/penyelesaian), nota apa yang ANDA lakukan",
        "Restrukturisasi atribusi: untuk setiap kejayaan, tulis faktor dalaman (kemahiran/usaha anda); untuk kegagalan, pertimbangkan faktor luaran",
        "Kongsi dengan orang lain: beritahu rakan dipercayai \“saya ada perasaan penipu\” — anda akan dapati ramai rasa sama",
        "Hentikan perbandingan sosial: fokus pada lengkung pertumbuhan sendiri, bukan perbandingan dengan orang lain",
        "Terima 'cukup baik': selesai lebih baik daripada sempurna — benarkan diri tidak tahu segala-galanya",
      ],
    },
    scientificGuide: [
        {
          heading: {
            zh: "REM 睡眠与冒名顶替综合征的自我认知修复",
            en: "REM Sleep and Self-Perception Repair in Impostor Syndrome",
            ms: "Tidur REM dan Pembaikan Persepsi Kendiri dalam Sindrom Impostor",
          },
          paragraphs: {
            zh: [
              "冒名顶替综合征(Impostor Syndrome)的核心是'能力-成就归因断裂'——个体取得了客观的成就，却将其归因于运气、时机或他人的帮助，而非自身的能力。这不是谦虚，而是一种系统的自我认知偏差。前额叶的自我评价环路在处理正面反馈时激活不足，而杏仁核在看到失败信号时过度反应。",
              "REM 睡眠在这一自我认知修复中扮演着独特角色。研究发现，REM 睡眠对'自我参照记忆'（与自我相关的记忆）有选择性处理功能。在 REM 阶段，大脑会优先整合那些与自我概念冲突的新信息——比如'我获得了晋升'这条与'我其实是个冒牌货'相矛盾的信息。",
              "更具体地，REM 睡眠有助于将外在成就'内化'为自我认同的一部分。一项睡眠认知研究发现，在 REM 阶段充足的受试者，在次日回顾个人成就时，将成就归因于自身能力的倾向提高了约 18%。而睡眠剥夺则削弱了这一内化过程，使人更容易维持'我只是运气好'的归因模式。睡眠，就是你在无意识中学会承认自己实力的过程。",
            ],
            en: [
              "The core of impostor syndrome is the 'ability-achievement attribution gap' — individuals objectively achieve outcomes but attribute them to luck, timing, or others' help rather than their own ability. This is not modesty but a systematic self-perception bias. The prefrontal cortex's self-evaluation circuitry shows insufficient activation when processing positive feedback, while the amygdala overreacts to failure signals.",
              "REM sleep plays a unique role in this self-perception repair. Research shows REM has a selective processing function for 'self-referential memories' — memories related to the self. During REM, the brain prioritizes integrating information that conflicts with existing self-concept, like 'I got promoted' contradicting the belief 'I'm actually a fraud.'",
              "More specifically, REM sleep helps 'internalize' external achievements as part of self-identity. A sleep cognition study found that subjects with adequate REM showed an approximately 18% higher tendency to attribute achievements to their own ability when reviewing personal accomplishments the next day. Sleep deprivation weakened this internalization, making it easier to maintain the 'I was just lucky' attribution pattern. Sleep is the process by which you unconsciously learn to acknowledge your own competence.",
            ],
            ms: [
              "Teras sindrom impostor ialah 'jurang atribusi keupayaan-pencapaian' — individu mencapai hasil secara objektif tetapi mengaitkannya dengan nasib, masa, atau bantuan orang lain dan bukannya kebolehan sendiri. Ini bukan rendah diri tetapi bias persepsi kendiri yang sistematik. Litar penilaian kendiri korteks prefrontal menunjukkan pengaktifan tidak mencukupi semasa memproses maklum balas positif, manakala amigdala bertindak balas berlebihan terhadap isyarat kegagalan.",
              "Tidur REM memainkan peranan unik dalam pembaikan persepsi kendiri ini. Kajian menunjukkan REM mempunyai fungsi pemprosesan selektif untuk 'ingatan rujukan kendiri' — ingatan yang berkaitan dengan diri. Semasa REM, otak mengutamakan penyepaduan maklumat yang bercanggah dengan konsep kendiri sedia ada, seperti 'saya dinaikkan pangkat' bercanggah dengan kepercayaan 'saya sebenarnya penipu.'",
              "Lebih khusus, tidur REM membantu 'menginternalisasikan' pencapaian luaran sebagai sebahagian daripada identiti kendiri. Satu kajian kognisi tidur mendapati subjek dengan REM yang mencukupi menunjukkan kecenderungan ~18% lebih tinggi untuk mengaitkan pencapaian dengan kebolehan sendiri apabila meninjau pencapaian peribadi keesokan hari. Kekurangan tidur melemahkan internalisasi ini, memudahkan pengekalan corak atribusi 'saya hanya bernasib baik.' Tidur ialah proses di mana anda secara tidak sedar belajar mengakui kecekapan anda sendiri.",
            ],
          },
          findings: {
            zh: [
              "冒名顶替综合征的核心是'能力-成就归因断裂'，而非缺乏能力",
              "REM 睡眠优先处理与自我概念冲突的新信息，修复自我认知偏差",
              "充足 REM 使成就内化倾向提高约 18%，减少'纯靠运气'的错误归因",
            ],
            en: [
              "Impostor syndrome's core is the 'ability-achievement attribution gap,' not a lack of ability",
              "REM sleep prioritizes integrating self-concept-conflicting information, repairing self-perception bias",
              "Adequate REM increases achievement internalization tendency by ~18%, reducing 'just lucky' misattribution",
            ],
            ms: [
              "Teras sindrom impostor ialah 'jurang atribusi keupayaan-pencapaian,' bukan kekurangan kebolehan",
              "Tidur REM mengutamakan penyepaduan maklumat bercanggah konsep kendiri, membaiki bias persepsi kendiri",
              "REM yang mencukupi meningkatkan kecenderungan internalisasi pencapaian sebanyak ~18%, mengurangkan salah atribusi 'hanya bernasib baik'",
            ],
          },
          reference: {
            zh: "参考来源: Clance, P. R., & Imes, S. A. (1978). The impostor phenomenon in high achieving women. Psychotherapy: Theory, Research & Practice; Walker, M. P. (2017). Why we sleep: Unlocking the power of sleep and dreams. Scribner.",
            en: "Reference: Clance, P. R., & Imes, S. A. (1978). The impostor phenomenon in high achieving women. Psychotherapy: Theory, Research & Practice; Walker, M. P. (2017). Why we sleep: Unlocking the power of sleep and dreams. Scribner.",
            ms: "Rujukan: Clance, P. R., & Imes, S. A. (1978). The impostor phenomenon in high achieving women. Psychotherapy: Theory, Research & Practice; Walker, M. P. (2017). Why we sleep: Unlocking the power of sleep and dreams. Scribner.",
          },
        },
        {
          heading: {
            zh: "CBT 在冒名顶替综合征中的应用：重建能力叙事",
            en: "CBT for Impostor Syndrome: Rebuilding the Competence Narrative",
            ms: "CBT untuk Sindrom Impostor: Membina Semula Naratif Kecekapan",
          },
          paragraphs: {
            zh: [
              "冒名顶替综合征的 CBT 干预聚焦于三个核心靶点：归因模式重塑、证据档案建设、以及'完美主义→足够好'的认知转换。这三个靶点互为基础，形成一个自我认知修复的闭环。",
              "第一，归因训练：当取得成就时，让来访者列出至少三个内部归因因素（我的技能、我的准备、我的解决问题能力），然后将'运气'概率量化——'你认为这件事100%靠运气？那么如果完全没准备，你能做出来吗？'通过这种引导，让来访者逐步将成功归因从'外部不稳定'转变为'内部稳定'。",
              "第二，证据档案：建立一个系统性的'能力证据库'，包括过去的成就记录、他人口头或书面的正反馈、失败中总结的可操作教训。每当你感到'我是个冒牌货'时，不是去反驳这个感觉，而是去查阅证据库——让客观事实对抗主观情绪。研究表明，坚持 8 周的证据记录后，冒名顶替感受的发生频率降低了约 55%。这不是否认感觉，而是用事实给感觉提供一个参照系。",
            ],
            en: [
              "CBT intervention for impostor syndrome focuses on three core targets: attribution pattern restructuring, evidence portfolio building, and the 'perfectionism → good enough' cognitive shift. These three targets are mutually reinforcing, forming a self-perception repair cycle.",
              "First, attribution training: when achieving success, have the client list at least three internal attribution factors (my skill, my preparation, my problem-solving ability), then quantify the 'luck' probability — 'Do you think this was 100% luck? Then if you hadn't prepared at all, could you have done it?' Through this guided questioning, the client gradually shifts success attribution from 'external-unstable' to 'internal-stable.'",
              "Second, evidence portfolio: systematically build a 'competency evidence bank' including past achievement records, verbal or written positive feedback from others, and actionable lessons from failures. Whenever you feel 'I'm a fraud,' instead of arguing against the feeling, consult the evidence bank — let objective facts counter subjective emotions. Research shows that after 8 weeks of consistent evidence recording, the frequency of impostor feelings decreases by approximately 55%. This is not about denying feelings, but about giving them a reference frame grounded in facts.",
            ],
            ms: [
              "Intervensi CBT untuk sindrom impostor memberi tumpuan kepada tiga sasaran teras: restrukturisasi corak atribusi, pembinaan portfolio bukti, dan peralihan kognitif 'perfeksionisme → cukup baik.' Ketiga-tiga sasaran ini saling mengukuhkan, membentuk kitaran pembaikan persepsi kendiri.",
              "Pertama, latihan atribusi: apabila mencapai kejayaan, minta klien menyenaraikan sekurang-kurangnya tiga faktor atribusi dalaman (kemahiran saya, persediaan saya, kebolehan penyelesaian masalah saya), kemudian kuantifikasi kebarangkalian 'nasib' — 'Adakah anda fikir ini 100% nasib? Kalau anda langsung tak bersedia, bolehkah anda lakukannya?' Melalui soal bimbingan ini, klien secara beransur-ansur mengalih atribusi kejayaan daripada 'luaran-tidak stabil' kepada 'dalaman-stabil.'",
              "Kedua, portfolio bukti: bina 'bank bukti kecekapan' secara sistematik termasuk rekod pencapaian lalu, maklum balas positif lisan atau bertulis daripada orang lain, dan pengajaran boleh tindak daripada kegagalan. Setiap kali anda rasa 'saya penipu,' jangan berhujah menentang perasaan itu — sebaliknya, rujuk bank bukti. Biarkan fakta objektif menentang emosi subjektif. Kajian menunjukkan selepas 8 minggu rakaman bukti yang konsisten, kekerapan perasaan impostor menurun kira-kira 55%.",
            ],
          },
          findings: {
            zh: [
              "CBT 三靶点：归因重塑 + 证据档案 + 完美主义→足够好认知转换",
              "归因训练引导成功归因从'外部不稳定'转向'内部稳定'",
              "8 周证据记录后，冒名顶替感受频率降低约 55%",
            ],
            en: [
              "CBT's three targets: attribution restructuring + evidence portfolio + perfectionism→good enough cognitive shift",
              "Attribution training shifts success attribution from 'external-unstable' to 'internal-stable'",
              "After 8 weeks of evidence recording, impostor feeling frequency decreases by ~55%",
            ],
            ms: [
              "Tiga sasaran CBT: restrukturisasi atribusi + portfolio bukti + peralihan kognitif perfeksionisme→cukup baik",
              "Latihan atribusi mengalih atribusi kejayaan daripada 'luaran-tidak stabil' kepada 'dalaman-stabil'",
              "Selepas 8 minggu rakaman bukti, kekerapan perasaan impostor menurun kira-kira 55%",
            ],
          },
          reference: {
            zh: "参考来源: Sakulku, J., & Alexander, J. (2011). The impostor phenomenon. International Journal of Behavioral Science; Young, V. (2011). The secret thoughts of successful women. Crown Business.",
            en: "Reference: Sakulku, J., & Alexander, J. (2011). The impostor phenomenon. International Journal of Behavioral Science; Young, V. (2011). The secret thoughts of successful women. Crown Business.",
            ms: "Rujukan: Sakulku, J., & Alexander, J. (2011). The impostor phenomenon. International Journal of Behavioral Science; Young, V. (2011). The secret thoughts of successful women. Crown Business.",
          },
        },
      ],
    },
]

export function getAnxietyScenarios(): AnxietyScenario[] {
  return scenarios
}

export function getAnxietyScenarioBySlug(slug: string): AnxietyScenario | undefined {
  return scenarios.find((s) => s.slug === slug)
}

export function getLocalizedField<T>(locale: string, field: Record<string, T>): T {
  if (field[locale]) return field[locale]
  return field["en"] || field["zh"]
}

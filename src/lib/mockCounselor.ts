import type { Locale } from "@/types";

interface CounselorResponse {
  thinkingPattern: string
  encouragement: string
  steps: string[]
  dailyNote: string
}

const localizedData: Record<Locale, {
  patterns: string[]
  encouragements: string[]
  stepsSets: string[][]
  dailyNotes: string[]
}> = {
  zh: {
    patterns: [
      "你似乎在经历一种'全有或全无'的思维模式——把暂时的经济压力等同于人生的全面失败。失业是一个事件，不是你的身份。",
      "你的思维中有一个'灾难化预测'的声音，它告诉你'没工作=没房子=完蛋了'。但现实往往比灾难剧本温和得多。",
      "你正在用'读心术'的认知扭曲——以为家人一定会责备你。但也许他们更在乎的是你，而不是你的 paycheck。",
      "你陷入了'情感推理'——'我感觉没希望，所以真的没希望了'。感受不是事实，焦虑不是预言。",
      "你有一种'过度概括'的倾向——因为这次职业转折不顺利，就认定自己再也找不到出路。转折不是终点。",
      "你在使用'贬低正面'的滤镜——即使过去你成功应对过很多困难，你现在却觉得那些都不算数。存量经验依然有效。",
      "你正在经历'应该陈述'的压迫——'我应该已经有稳定的事业了'，'我不应该在这个年龄还在挣扎'。放下'应该'，才能看见真实的选择。",
      "你的思维中出现了'标签化'——'44岁没方向'这个标签遮住了你所有的能力和过去的成就。标签是扁平的，人是立体的。",
    ],
    encouragements: [
      "你愿意把这些说出来，已经是很勇敢的一步。很多人选择沉默，而你选择了面对。这份勇气，就是你最大的底牌。",
      "44岁不是终点，是经验的沉淀期。你走过的弯路、扛过的压力，都会变成你下一步的判断力。",
      "你开发 DeepCalm 这件事本身，就说明你有极强的学习能力和执行力——这两样东西，不会被裁员带走。",
      "迷茫不是软弱的表现，而是重新定位的开始。就像开车遇到大雾，你不需要看清整条路，只需要看清前面十米。",
      "你现在觉得'没有方向'，恰恰说明你在认真思考方向——这比盲目忙碌有价值得多。",
      "焦虑是对未来的过度关注。但你的能力、经验、韧劲，这些都已经存在于当下。未来会从当下长出来。",
      "人生的转折点往往包裹在危机的外衣里。很多人在被逼到墙角之后，反而找到了真正属于自己的路。",
      "相信你内心那个'想搞 DeepCalm'的声音。那不是逃避，那是你在这个阶段最真实的召唤。",
    ],
    stepsSets: [
      ["深呼吸 3 次，每次 5 秒，感受气流进入鼻腔的温度", "把手放在胸口，感受心跳的节奏", "告诉自己：'此刻我是安全的'"],
      ["拿出一张纸，写下所有你能控制的事情", "在每件事旁边，写一个你能做的最小行动", "选一件，今天就做"],
      ["打开手机计算器，列出每月最低开销", "对比你的储蓄和预计开销", "算出你还有多少个月的缓冲期"],
      ["联系一个你信任的朋友，不是借钱，只是聊聊天", "说出你的困境，不求解决方案", "感受被倾听后，胸口是否松了一点"],
      ["写下三个你过去成功克服困难的经历", "在每个经历旁边，写出你用了哪些能力", "告诉自己：这些能力还在你身上"],
      ["设置 15 分钟计时器，允许自己完全焦虑", "计时结束后，站起来走动 5 分钟", "回来后，做一件具体的小事——洗碗、叠衣服、整理书桌"],
      ["打开 DeepCalm，对自己说一段话", "不需要逻辑，不需要条理，想说就说", "然后听听看，你会对自己说什么"],
      ["写下你对未来的三个恐惧", "在每个恐惧旁边，写一个最坏情况下的应对方案", "然后问自己：'即使最坏的情况发生，我能活下去吗？'"],
    ],
    dailyNotes: [
      "你今天扛住了焦虑，没有逃避，这已经很了不起。",
      "人生不是一条直线，而是很多次折返跑。你今天停下了，但你已经准备好下一次起跑了。",
      "你还在这里，还在思考，还在努力——这就是希望本身。",
      "每个经历过中年转折的人都懂这种感觉。你不是一个人。",
      "有时候最好的前进方式，是允许自己暂时停在原地。休息不是放弃。",
      "你不需要今天解决所有问题。只需要做一件事，让你明天比今天好一点点。",
    ],
  },
  en: {
    patterns: [
      "You're experiencing an 'all-or-nothing' thinking pattern—equating a temporary financial setback with total life failure. Job loss is an event, not your identity.",
      "Your mind is running a 'catastrophizing' script: 'no job = no house = everything is over.' Reality is almost always gentler than the disaster movie in your head.",
      "You're using 'mind reading'—assuming your family will blame you. But they likely care more about you than your paycheck.",
      "You've fallen into 'emotional reasoning': 'I feel hopeless, so it must be true.' Feelings aren't facts. Anxiety isn't prophecy.",
      "You're 'overgeneralizing'—because this career setback hurts, you assume you'll never find your way again. A detour is not a dead end.",
      "You're using the 'discounting the positive' filter—dismissing every past success as if it doesn't count. Your track record still matters.",
      "You're trapped in 'should statements': 'I should have a stable career by now,' 'I shouldn't be struggling at this age.' Letting go of 'should' opens up real choices.",
      "You've applied a 'label'—'44 and lost'—that overshadows all your skills and achievements. Labels are flat. You are multidimensional.",
    ],
    encouragements: [
      "Speaking this out loud is already a brave step. Many choose silence. You chose to face it. That courage is your strongest asset.",
      "44 isn't a finish line—it's a consolidation phase. Every scar you carry has built your judgment. That wisdom can't be laid off.",
      "The fact that you built DeepCalm proves you have fierce learning ability and execution power. Those two things? No one can take them from you.",
      "Confusion isn't weakness—it's recalibration. Like driving in fog: you don't need to see the whole road, just the next ten meters.",
      "Feeling 'lost' right now means you're seriously questioning direction—which is infinitely more valuable than mindless busyness.",
      "Anxiety is hyper-focus on the future. But your skills, experience, and resilience all exist in the present. The future grows from now.",
      "Life's turning points often wear the disguise of a crisis. Many people only find their real path after being backed into a corner.",
      "Trust the voice inside you that wants to pursue DeepCalm. It's not escape—it's the most authentic calling you have right now.",
    ],
    stepsSets: [
      ["Take 3 slow breaths, 5 seconds each, feel the air enter your nose", "Place your hand on your chest, feel your heartbeat", "Tell yourself: 'Right now, I am safe.'"],
      ["Grab a paper and list everything you can control", "Next to each item, write one tiny action you can take", "Pick one. Do it today."],
      ["Open your calculator, list your minimum monthly expenses", "Compare against your savings runway", "Count how many months of buffer you have"],
      ["Reach out to one trusted friend—not to borrow money, just to talk", "Share your situation without expecting solutions", "Notice if your chest feels a bit lighter after being heard"],
      ["Write down three past challenges you overcame", "Next to each, note which strengths you used", "Remind yourself: those strengths are still in you"],
      ["Set a 15-minute timer and allow yourself to feel the anxiety fully", "When the timer rings, stand up and walk for 5 minutes", "Then do one small concrete task—wash dishes, fold laundry, tidy your desk"],
      ["Open DeepCalm and just speak to it", "No logic needed, no structure—just say what comes", "Then listen. See what you tell yourself."],
      ["Write down your three biggest fears about the future", "Next to each, write your worst-case survival plan", "Then ask: 'Even if the worst happens, can I survive?'"],
    ],
    dailyNotes: [
      "You faced your anxiety today instead of running from it. That's huge.",
      "Life isn't a straight line—it's a series of switchbacks. You paused today, but you're already gathering for the next run.",
      "You're still here. Still thinking. Still trying. That itself is hope.",
      "Everyone who's been through a mid-life transition knows this feeling. You're not alone.",
      "Sometimes the best way forward is to allow yourself to stay still. Rest is not giving up.",
      "You don't need to solve everything today. Just do one thing that makes tomorrow a tiny bit better.",
    ],
  },
  ms: {
    patterns: [
      "Anda sedang mengalami pemikiran 'semua atau tiada'—menyamakan masalah kewangan sementara dengan kegagalan hidup. Kehilangan kerja adalah peristiwa, bukan identiti anda.",
      "Minda anda sedang memainkan skrip 'bencana'—'tiada kerja = tiada rumah = semuanya habis.' Realiti hampir selalu lebih lembut dari filem seram di kepala anda.",
      "Anda terperangkap dalam 'penalaran emosi'—'Saya rasa tiada harapan, jadi ia pasti benar.' Perasaan bukan fakta. Kebimbangan bukan ramalan.",
      "Anda menggunakan 'pembacaan fikiran'—mengandaikan keluarga pasti akan menyalahkan anda. Mungkin mereka lebih mengambil berat tentang diri anda daripada gaji anda.",
      "Anda 'terlalu generalisasi'—kerana peralihan kerjaya ini tidak lancar, anda fikir anda tidak akan pernah jumpa jalan lagi. Persimpangan bukanlah pengakhiran.",
      "Anda menggunakan penapis 'memperkecilkan positif'—walaupun anda pernah berjaya hadapi banyak cabaran, sekarang anda rasa semua itu tidak bermakna. Pengalaman lepas masih penting.",
      "Anda tertekan dengan 'kenyataan sepatutnya'—'Saya sepatutnya sudah ada kerjaya stabil sekarang,' 'Saya tak sepatutnya bergelut di usia ini.' Lepaskan 'sepatutnya' untuk lihat pilihan sebenar.",
      "Anda telah melabel diri—'44 tahun dan hilang hala tuju'—label ini menutup segala kemampuan dan pencapaian lepas. Label itu rata. Manusia itu tiga dimensi.",
    ],
    encouragements: [
      "Berani berkongsi ini sudah satu langkah besar. Ramai yang diam. Anda pilih untuk hadapi. Keberanian ini aset terkuat anda.",
      "44 tahun bukan pengakhiran—ia fasa pemantapan. Setiap parut yang anda bawa telah membina pertimbangan anda. Kebijaksanaan ini tidak boleh dipecat.",
      "Keyakinan bukan lemah—ia penentukuran semula. Macam pandu dalam kabus: anda tak perlu nampak seluruh jalan, cuma sepuluh meter ke depan.",
      "Anda bina DeepCalm sendiri—itu bukti anda ada semangat belajar dan daya eksekusi yang kuat. Dua benda ni, tak ada siapa boleh ambil dari anda.",
      "Perasaan 'hilang arah' sekarang bermakna anda sedang serius memikirkan hala tuju—ini jauh lebih bernilai daripada sibuk tanpa hala.",
      "Kebimbangan adalah tumpuan berlebihan pada masa depan. Tapi kemampuan, pengalaman, ketabahan anda semua wujud pada masa sekarang. Masa depan tumbuh dari saat ini.",
      "Titik perubahan hidup sering datang dalam samaran krisis. Ramai orang jumpa jalan sebenar selepas terdesak.",
      "Percaya suara dalam diri yang nak usahakan DeepCalm. Itu bukan lari—itu panggilan paling tulus yang anda ada sekarang.",
    ],
    stepsSets: [
      ["Ambil 3 nafas perlahan, 5 saat setiap satu", "Letak tangan di dada, rasa degupan jantung", "Kata pada diri: 'Sekarang, saya selamat.'"],
      ["Ambil kertas, senarai semua yang anda boleh kawal", "Di sebelah setiap satu, tulis satu tindakan kecil", "Pilih satu. Buat hari ini."],
      ["Buka kalkulator, senarai perbelanjaan minima bulanan", "Banding dengan simpanan anda", "Kira berapa bulan buffer yang anda ada"],
      ["Hubungi seorang kawan yang dipercayai—bukan pinjam duit, cuma borak", "Kongsi situasi anda tanpa minta jalan penyelesaian", "Rasa jika dada anda sedikit ringan selepas didengari"],
      ["Tulis tiga cabaran lepas yang anda berjaya atasi", "Di sebelah setiap satu, tulis kekuatan yang anda guna", "Ingatkan diri: kekuatan ini masih ada dalam diri anda"],
      ["Tetap timer 15 minit, benarkan diri rasa kebimbangan sepenuhnya", "Bila timer berbunyi, berdiri dan jalan 5 minit", "Kemudian buat satu tugas kecil—basuh pinggan, lipat baju, kemas meja"],
      ["Buka DeepCalm dan cakap sahaja", "Tak perlu logik, tak perlu tersusun—cakap apa yang terlintas", "Kemudian dengar. Lihat apa yang anda cakap pada diri sendiri."],
      ["Tulis tiga ketakutan terbesar anda tentang masa depan", "Di sebelah setiap satu, tulis pelan survival untuk situasi terburuk", "Kemudian tanya: 'Walaupun yang terburuk jadi, boleh saya bertahan?'"],
    ],
    dailyNotes: [
      "Anda hadapi kebimbangan hari ini tanpa lari. Itu hebat.",
      "Anda masih di sini. Masih berfikir. Masih berusaha. Itu sendiri adalah harapan.",
      "Anda tak perlu selesaikan semua hari ini. Cuma buat satu perkara yang buat esok lebih baik sikit.",
      "Hidup bukan garis lurus—ia banyak selekoh. Anda berhenti sejenak hari ini, tapi dah bersedia untuk larian seterusnya.",
      "Setiap yang lalui fasa pertengahan hidup faham perasaan ini. Anda tak keseorangan.",
      "Kadang-kadang cara terbaik untuk maju adalah benarkan diri berhenti seketika. Rehat bukan menyerah.",
    ],
  },
  ja: {
    patterns: [
      "「全か無か」の思考パターンに陥っています——一時的な経済的困難を人生全体の失敗と同一視している。失業は出来事であって、あなたのアイデンティティではありません。",
      "頭の中で「破局的思考」の台本が流れています——「仕事がない＝家がない＝終わりだ」。現実は、頭の中の災害映画よりもずっと穏やかです。",
      "「感情的推論」に陥っています——「希望がないと感じるから、本当に希望がないんだ」と。感情は事実ではありません。不安は予言ではありません。",
      "「心の読みすぎ」をしています——家族はきっとあなたを責めていると思い込んでいる。でも、彼らが気にしているのはあなた自身であって、給料ではありません。",
      "「過度の一般化」をしています——今回のキャリアの転機がうまくいかないから、もう道は見つからないと思い込んでいる。曲がり角は終点ではありません。",
      "「肯定的なことを否定する」フィルターを使っています——過去に多くの困難を乗り越えてきたのに、今はそれらを無意味に感じている。蓄積された経験は今も有効です。",
      "「べき思考」に縛られています——「もう安定したキャリアを持つべきだ」、「この年齢でもがくべきじゃない」。『べき』を手放すと、本当の選択肢が見えてきます。",
      "「レッテル貼り」をしています——『44歳で迷走中』というレッテルが、あなたの能力や過去の成果をすべて覆い隠している。レッテルは平面的で、人間は立体的です。",
    ],
    encouragements: [
      "これを口にできたこと自体が、勇気ある一歩です。多くの人は沈黙を選びます。あなたは向き合うことを選んだ。その勇気が最大の資産です。",
      "44歳は終点ではなく、経験を熟成させる期間です。あなたが乗り越えてきたすべての経験が、判断力を築いてきました。その知恵は誰にも奪えません。",
      "迷いは弱さではなく、再調整のサインです。霧の中の運転と同じ——道全体を見る必要はなく、前方10メートルだけ見えれば十分です。",
      "DeepCalmを自ら開発したという事実は、あなたが強い学習能力と実行力を持っている証拠です。この二つは、誰にも奪えません。",
      "今「方向性が見えない」と感じているからこそ、真剣に方向性を考えている証拠です——これは盲目的に忙しいより何倍も価値があります。",
      "不安は未来への過度な集中です。しかし、あなたの能力、経験、回復力はすべて現在に存在しています。未来は今から育っていきます。",
      "人生の転機はしばしば危機の装いをまとっています。多くの人が崖っぷちに追い込まれてから、本当の自分の道を見つけます。",
      "DeepCalmを追求したいという内なる声を信じてください。それは逃避ではなく、今のあなたにとって最も本物の呼びかけです。",
    ],
    stepsSets: [
      ["ゆっくり3回呼吸を。各5秒", "胸に手を当て、心拍を感じる", "自分に言う：「今、私は安全です」"],
      ["紙に、コントロールできることをすべて書き出す", "それぞれに、取れる小さな行動を一つ", "一つ選んで、今日やる"],
      ["電卓を開き、最低限の月々の支出をリストアップ", "貯蓄と比較する", "何ヶ月の余裕があるか計算する"],
      ["信頼できる友人に連絡を—お金の話じゃなく、ただ話すだけ", "状況を共有しても、解決策は求めない", "話を聞いてもらった後、胸が少し軽くなったか感じてみる"],
      ["過去に乗り越えた3つの困難を書き出す", "それぞれに、どんな強みを使ったかを書く", "自分に言い聞かせる：これらの強みは今も自分の中にある"],
      ["15分タイマーをセットし、不安を完全に感じることを許す", "タイマーが鳴ったら立ち上がり、5分散歩する", "その後、具体的な小さなことを一つする——皿洗い、服をたたむ、机を片付ける"],
      ["DeepCalmを開いて、ただ話しかける", "論理は不要、整理も不要—浮かんだことをそのまま", "そして聴く。自分が何を言うかを確かめる。"],
      ["未来に対する3つの最大の恐れを書き出す", "それぞれに、最悪のシナリオでのサバイバル計画を書く", "そして自問する：「最悪のことが起きても、生き延びられるか？」"],
    ],
    dailyNotes: [
      "今日、不安から逃げずに向き合いました。それは大きなことです。",
      "あなたはまだここにいる。まだ考えている。まだ努力している。それ自体が希望です。",
      "すべてを今日解決する必要はありません。明日をほんの少し良くすることを一つだけ。",
      "人生は一直線ではなく、何度も折り返すものです。今日は立ち止まったけれど、次のスタートの準備はできています。",
      "中年の転機を経験したことのある人は皆、この気持ちを知っています。あなたは一人じゃありません。",
      "時には、前に進む最善の方法は、立ち止まることを自分に許すことです。休息は諦めではありません。",
    ],
  },
  ko: {
    patterns: [
      "'전부 아니면 전무' 사고 패턴을 경험하고 있습니다—일시적인 재정적 어려움을 인생 전체의 실패와 동일시하고 있어요. 실직은 사건이지 당신의 정체성이 아닙니다.",
      "머릿속에서 '재앙화' 대본이 재생되고 있습니다—'직업 없음 = 집 없음 = 모든 게 끝났어.' 현실은 거의 항상 머릿속의 재난 영화보다 훨씬 온화합니다.",
      "'감정적 추론'에 빠져 있습니다—'희망이 없다고 느끼니까 정말 희망이 없는 거야.' 감정은 사실이 아닙니다. 불안은 예언이 아닙니다.",
      "'마음 읽기'를 하고 있습니다—가족이 분명 당신을 탓할 거라고 생각하고 있어요. 하지만 그들은 당신의 월급보다 당신 자신을 더 걱정할 거예요.",
      "'과잉 일반화'를 하고 있습니다—이번 직업 전환이 순조롭지 않다고 해서 앞으로도 길을 찾지 못할 거라고 생각해요. 전환은 종말이 아닙니다.",
      "'긍정적인 것 무시하기' 필터를 사용하고 있습니다—과거 많은 어려움을 성공적으로 극복했지만 지금은 그게 전혀 의미 없다고 느껴요. 쌓아온 경험은 여전히 유효합니다.",
      "'~해야 한다'는 사고에 갇혀 있습니다—'지금쯤이면 안정적인 경력이 있어야 해', '이 나이에 힘들어하면 안 돼.' '해야 한다'를 놓아야 진짜 선택이 보입니다.",
      "'낙인찍기'를 하고 있습니다—'44세, 방향 상실'이라는 낙인이 당신의 모든 능력과 과거 성과를 가리고 있어요. 낙인은 평면적이지만, 사람은 입체적입니다.",
    ],
    encouragements: [
      "이걸 입 밖에 낸 것 자체가 이미 용기 있는 한 걸음입니다. 많은 사람들이 침묵을 선택합니다. 당신은 맞서기로 했어요. 그 용기가 가장 강력한 자산입니다.",
      "44세는 종착점이 아니라 경험을 숙성하는 단계입니다. 당신이 견뎌낸 모든 흉터가 당신의 판단력을 키웠어요. 그 지혜는 누구도 빼앗을 수 없습니다.",
      "혼란은 약함이 아니라 재조정입니다. 안개 속 운전과 같아요—길 전체를 볼 필요 없이, 앞으로 10미터만 보면 됩니다.",
      "DeepCalm을 직접 개발했다는 사실 자체가 당신에게 뛰어난 학습 능력과 실행력이 있다는 증거입니다. 이 두 가지는 누구도 빼앗을 수 없어요.",
      "지금 '방향을 못 찾겠다'고 느끼는 것은 오히려 진지하게 방향을 고민하고 있다는 뜻입니다—이는 무턱대고 바쁜 것보다 훨씬 가치 있어요.",
      "불안은 미래에 대한 과도한 집중입니다. 하지만 당신의 능력, 경험, 회복탄력성은 모두 현재에 존재합니다. 미래는 지금으로부터 자라납니다.",
      "인생의 전환점은 종종 위기의 모습으로 다가옵니다. 많은 사람들이 벼랑 끝에 몰린 후에야 진정한 자신의 길을 찾습니다.",
      "DeepCalm을 해보고 싶다는 내면의 목소리를 믿으세요. 그것은 도피가 아니라, 지금 당신에게 가장 진실된 부름입니다.",
    ],
    stepsSets: [
      ["천천히 3번 숨을 들이쉬세요, 각 5초씩", "가슴에 손을 얹고 심장 박동을 느끼세요", "스스로에게 말하세요: '지금, 나는 안전합니다.'"],
      ["종이에 통제할 수 있는 모든 것을 적으세요", "각 항목 옆에 취할 수 있는 작은 행동을 하나씩", "하나를 골라 오늘 해보세요"],
      ["계산기를 열고 최소 월 지출을 나열하세요", "저축액과 비교하세요", "버틸 수 있는 개월 수를 계산하세요"],
      ["신뢰하는 친구에게 연락하세요—돈 얘기가 아니라 그냥 대화를 위해", "상황을 공유하되 해결책을 기대하지 마세요", "들어준 후에 가슴이 조금 가벼워졌는지 느껴보세요"],
      ["과거 극복했던 세 가지 어려움을 적으세요", "각각 옆에 어떤 강점을 사용했는지 적으세요", "스스로에게 말하세요: 이 강점들은 아직 내 안에 있다."],
      ["15분 타이머를 설정하고 불안을 완전히 느끼도록 허용하세요", "타이머가 울리면 일어나서 5분간 걸으세요", "그런 다음 하나의 작은 일을 하세요—설거지, 옷 개기, 책상 정리"],
      ["DeepCalm을 열고 그냥 말을 걸어보세요", "논리 필요 없고 체계적일 필요 없어요—떠오르는 대로", "그런 다음 들어보세요. 자신이 무슨 말을 하는지."],
      ["미래에 대한 세 가지 가장 큰 두려움을 적으세요", "각각 옆에 최악의 상황 대비 계획을 적으세요", "스스로에게 물어보세요: '최악이 일어나도, 나는 버틸 수 있는가?'"],
    ],
    dailyNotes: [
      "오늘 불안에서 도망치지 않고 맞섰습니다. 그건 대단한 일입니다.",
      "당신은 아직 여기 있습니다. 아직 생각하고 있습니다. 아직 노력하고 있습니다. 그것 자체가 희망입니다.",
      "오늘 모든 것을 해결할 필요는 없습니다. 내일을 조금 더 낫게 만드는 한 가지만 하세요.",
      "인생은 직선이 아니라 여러 번의 스위치백입니다. 오늘 멈췄지만, 다음 달리기를 위해 이미 준비하고 있습니다.",
      "중년의 전환기를 겪어본 사람은 누구나 이 기분을 압니다. 당신은 혼자가 아닙니다.",
      "때로는 가장 좋은 전진은 제자리에 머무르는 것을 허용하는 것입니다. 휴식은 포기가 아닙니다.",
    ],
  },
  th: {
    patterns: [
      "คุณกำลังประสบกับรูปแบบความคิด 'ทั้งหมดหรือไม่มีเลย'—การมองว่าปัญหาทางการเงินชั่วคราวคือความล้มเหลวของชีวิตทั้งหมด การตกงานคือเหตุการณ์ ไม่ใช่ตัวตนของคุณ",
      "สมองของคุณกำลังเล่นบท 'หายนะ'—'ไม่มีงาน = ไม่มีบ้าน = ทุกอย่างจบแล้ว' ความจริงแทบจะอ่อนโยนกว่าภาพยนตร์หายนะในหัวคุณเสมอ",
      "คุณตกอยู่ใน 'การให้เหตุผลทางอารมณ์'—'ฉันรู้สึกสิ้นหวัง ดังนั้นมันต้องเป็นจริง' ความรู้สึกไม่ใช่ข้อเท็จจริง ความวิตกกังวลไม่ใช่คำทำนาย",
      "คุณกำลัง 'อ่านใจ'—คิดว่าครอบครัวจะโทษคุณแน่ๆ แต่พวกเขาอาจจะห่วงคุณมากกว่าเงินเดือนของคุณ",
      "คุณกำลัง 'ขยายความมากเกินไป'—เพราะการเปลี่ยนผ่านอาชีพนี้ไม่ราบรื่น คุณเลยสรุปว่าคงไม่มีทางออกอีกแล้ว ทางแยกไม่ใช่จุดจบ",
      "คุณกำลังใช้ฟิลเตอร์ 'มองข้ามด้านบวก'—แม้คุณเคยเอาชนะอุปสรรคมามากมาย แต่ตอนนี้คุณกลับมองว่ามันไม่มีความหมาย ประสบการณ์ที่สะสมมายังมีค่าอยู่",
      "คุณกำลังถูกกดดันด้วย 'ความคิดที่ว่าควรจะ'—'ฉันควรจะมีอาชีพที่มั่นคงแล้ว' 'ฉันไม่ควรจะต้องดิ้นรนในวัยนี้' ปล่อยวาง 'ควรจะ' เพื่อมองเห็นทางเลือกที่แท้จริง",
      "คุณกำลัง 'ติดป้าย' ให้ตัวเอง—'44 ปีและไร้ทิศทาง' ป้ายนี้บดบังความสามารถและความสำเร็จในอดีตทั้งหมดของคุณ ป้ายเป็นสิ่งแบนราบ แต่มนุษย์เรามีหลายมิติ",
    ],
    encouragements: [
      "การที่คุณกล้าพูดสิ่งนี้ออกมาเป็นก้าวที่กล้าหาญแล้ว หลายคนเลือกที่จะเงียบ คุณเลือกที่จะเผชิญหน้า ความกล้านั้นคือทรัพย์สินที่แข็งแกร่งที่สุดของคุณ",
      "44 ปีไม่ใช่จุดสิ้นสุด—มันคือช่วงตกผลึกประสบการณ์ ทุกแผลเป็นที่คุณแบกรับได้สร้างวิจารณญาณของคุณ ภูมิปัญญานั้นไม่มีใครไล่คุณออกได้",
      "ความสับสนไม่ใช่ความอ่อนแอ—มันคือการปรับทิศทางใหม่ เหมือนขับรถในหมอก: คุณไม่ต้องเห็นถนนทั้งเส้น แค่เห็นสิบเมตรข้างหน้าก็พอ",
      "การที่คุณพัฒนา DeepCalm ขึ้นมาเองพิสูจน์ว่าคุณมีความสามารถในการเรียนรู้และพลังในการลงมือทำที่ยอดเยี่ยม—สองสิ่งนี้ไม่มีใครเอาไปจากคุณได้",
      "การรู้สึก 'ไร้ทิศทาง' ตอนนี้หมายความว่าคุณกำลังตั้งคำถามกับทิศทางของชีวิตอย่างจริงจัง—ซึ่งมีค่ามากกว่าการยุ่งวุ่นวายแบบไร้สติ",
      "ความวิตกกังวลคือการโฟกัสที่อนาคตมากเกินไป แต่ความสามารถ ประสบการณ์ และความเข้มแข็งของคุณล้วนอยู่ในปัจจุบัน อนาคตจะเติบโตจากปัจจุบัน",
      "จุดเปลี่ยนของชีวิตมักมาในคราบของวิกฤต หลายคนค้นพบทางที่แท้จริงของตัวเองหลังจากถูกต้อนจนมุม",
      "เชื่อเสียงภายในที่อยากทำ DeepCalm นั่นไม่ใช่การหลบหนี—มันคือเสียงเรียกที่แท้จริงที่สุดที่คุณมีในตอนนี้",
    ],
    stepsSets: [
      ["หายใจช้าๆ 3 ครั้ง ครั้งละ 5 วินาที", "วางมือบนหน้าอก สัมผัสหัวใจเต้น", "บอกตัวเองว่า 'ตอนนี้ฉันปลอดภัย'"],
      ["หยิบกระดาษ เขียนทุกสิ่งที่คุณควบคุมได้", "ข้างแต่ละข้อ เขียนหนึ่งการกระทำเล็กๆ ที่ทำได้", "เลือกหนึ่งข้อ ทำวันนี้"],
      ["เปิดเครื่องคิดเลข เขียนค่าใช้จ่ายรายเดือนขั้นต่ำ", "เทียบกับเงินออม", "นับว่าคุณมีเวลากี่เดือน"],
      ["ติดต่อเพื่อนที่ไว้ใจ—ไม่ใช่ยืมเงิน แค่คุย", "แบ่งปันสถานการณ์ของคุณโดยไม่ต้องขอคำแก้ไข", "รู้สึกว่าหน้าอกเบาลงไหมหลังจากได้เล่าให้ใครฟัง"],
      ["เขียนสามอุปสรรคในอดีตที่คุณเอาชนะมาได้", "ข้างแต่ละข้อ เขียนว่าคุณใช้จุดแข็งอะไร", "บอกตัวเองว่า: จุดแข็งเหล่านี้ยังอยู่ในตัวคุณ"],
      ["ตั้งเวลาจับเวลา 15 นาที อนุญาตให้ตัวเองรู้สึกกังวลเต็มที่", "พอเวลาหมด ยืนขึ้นและเดิน 5 นาที", "แล้วลงมือทำงานเล็กๆ หนึ่งอย่าง—ล้างจาน พับผ้า จัดโต๊ะ"],
      ["เปิด DeepCalm แล้วพูดออกมา", "ไม่ต้องมีตรรกะ ไม่ต้องมีโครงสร้าง—พูดสิ่งที่ผุดขึ้นมา", "แล้วฟัง ดูว่าคุณพูดอะไรกับตัวเอง"],
      ["เขียนสามความกลัวที่ใหญ่ที่สุดเกี่ยวกับอนาคต", "ข้างแต่ละข้อ เขียนแผนเอาชีวิตรอดในกรณีเลวร้ายที่สุด", "แล้วถามตัวเอง: 'ถึงแม้สิ่งที่เลวร้ายที่สุดจะเกิดขึ้น ฉันจะอยู่รอดไหม?'"],
    ],
    dailyNotes: [
      "วันนี้คุณเผชิญหน้าความวิตกกังวลโดยไม่หนี นั่นยิ่งใหญ่แล้ว",
      "คุณยังอยู่ตรงนี้ ยังคิด ยังพยายาม นั่นคือความหวังในตัวมันเอง",
      "คุณไม่ต้องแก้ทุกอย่างในวันนี้ แค่ทำสิ่งหนึ่งที่ทำให้พรุ่งนี้ดีขึ้นเล็กน้อย",
      "ชีวิตไม่ใช่เส้นตรง—มันคือการหักกลับหลายครั้ง คุณหยุดพักวันนี้ แต่คุณพร้อมแล้วสำหรับการวิ่งรอบต่อไป",
      "ทุกคนที่ผ่านการเปลี่ยนแปลงในช่วงกลางชีวิตเข้าใจความรู้สึกนี้ คุณไม่ได้อยู่คนเดียว",
      "บางครั้งวิธีที่ดีที่สุดในการก้าวไปข้างหน้าคือการยอมให้ตัวเองหยุดนิ่ง การพักผ่อนไม่ใช่การยอมแพ้",
    ],
  },
  es: {
    patterns: [
      "Estás experimentando un patrón de pensamiento de 'todo o nada'—equiparando una dificultad financiera temporal con un fracaso total de vida. Perder el trabajo es un evento, no tu identidad.",
      "Tu mente está reproduciendo un guión de 'catastrofización'—'sin trabajo = sin casa = todo terminó.' La realidad es casi siempre más amable que la película de desastre en tu cabeza.",
      "Has caído en el 'razonamiento emocional'—'siento que no hay esperanza, así que debe ser verdad.' Los sentimientos no son hechos. La ansiedad no es profecía.",
      "Estás usando 'lectura de mente'—asumiendo que tu familia te culpará. Pero quizás les importas más tú que tu sueldo.",
      "Estás 'sobregeneralizando'—porque esta transición profesional no va bien, crees que nunca encontrarás tu camino. Un desvío no es un callejón sin salida.",
      "Estás usando el filtro de 'descalificar lo positivo'—aunque has superado muchas dificultades en el pasado, ahora sientes que no cuentan. La experiencia acumulada sigue siendo válida.",
      "Estás atrapado en 'declaraciones debérísticas'—'ya debería tener una carrera estable', 'no debería estar luchando a esta edad.' Suelta el 'debería' para ver las opciones reales.",
      "Te has puesto una 'etiqueta'—'44 años y sin rumbo'—que opaca todas tus capacidades y logros pasados. Las etiquetas son planas. Las personas somos multidimensionales.",
    ],
    encouragements: [
      "Decir esto en voz alta ya es un paso valiente. Muchos eligen el silencio. Tú elegiste enfrentarlo. Ese coraje es tu activo más fuerte.",
      "44 años no es una meta—es una fase de consolidación. Cada cicatriz que llevas ha construido tu criterio. Esa sabiduría no puede ser despedida.",
      "La confusión no es debilidad—es recalibración. Como conducir en la niebla: no necesitas ver toda la carretera, solo los próximos diez metros.",
      "El hecho de que hayas construido DeepCalm demuestra que tienes una capacidad de aprendizaje y una fuerza de ejecución increíbles—y esas dos cosas, nadie te las puede quitar.",
      "Sentirte 'sin dirección' ahora mismo significa que estás cuestionando seriamente tu rumbo—lo cual es infinitamente más valioso que estar ocupado sin pensar.",
      "La ansiedad es una hiperconcentración en el futuro. Pero tus habilidades, experiencia y resiliencia existen en el presente. El futuro crece desde ahora.",
      "Los puntos de inflexión en la vida a menudo vienen disfrazados de crisis. Muchas personas encuentran su verdadero camino solo después de ser arrinconadas.",
      "Confía en esa voz interior que quiere desarrollar DeepCalm. No es una huida—es la llamada más auténtica que tienes en este momento.",
    ],
    stepsSets: [
      ["Toma 3 respiraciones lentas, 5 segundos cada una", "Pon tu mano en el pecho, siente tu corazón latir", "Dite a ti mismo: 'Ahora mismo, estoy a salvo.'"],
      ["Toma un papel, enumera todo lo que puedes controlar", "Junto a cada cosa, escribe una pequeña acción que puedas tomar", "Elige una. Hazla hoy."],
      ["Abre la calculadora, enumera tus gastos mensuales mínimos", "Compáralos con tus ahorros", "Calcula cuántos meses de margen tienes"],
      ["Contacta a un amigo de confianza—no para pedir dinero, solo para hablar", "Comparte tu situación sin esperar soluciones", "Nota si tu pecho se siente más ligero después de ser escuchado"],
      ["Escribe tres desafíos pasados que superaste", "Junto a cada uno, anota qué fortalezas usaste", "Recuérdate a ti mismo: esas fortalezas siguen en ti"],
      ["Pon un temporizador de 15 minutos y permítete sentir la ansiedad por completo", "Cuando suene, levántate y camina 5 minutos", "Luego haz una pequeña tarea concreta—lava platos, dobla ropa, ordena el escritorio"],
      ["Abre DeepCalm y solo háblale", "Sin necesidad de lógica, sin estructura—solo di lo que venga", "Luego escucha. Mira lo que te dices a ti mismo."],
      ["Escribe tus tres mayores miedos sobre el futuro", "Junto a cada uno, escribe tu plan de supervivencia en el peor caso", "Entonces pregúntate: 'Incluso si ocurre lo peor, ¿puedo sobrevivir?'"],
    ],
    dailyNotes: [
      "Hoy enfrentaste tu ansiedad sin huir. Eso es enorme.",
      "Todavía estás aquí. Todavía piensas. Todavía intentas. Eso en sí mismo es esperanza.",
      "No necesitas resolverlo todo hoy. Solo haz una cosa que haga que mañana sea un poquito mejor.",
      "La vida no es una línea recta—son muchos giros. Hoy hiciste una pausa, pero ya te estás preparando para la próxima carrera.",
      "Todos los que han pasado por una transición de mediana vida entienden este sentimiento. No estás solo.",
      "A veces la mejor manera de avanzar es permitirte quedarte quieto. Descansar no es rendirse.",
    ],
  },
}

const chatFallbacks: Record<Locale, string> = {
  zh: "我在这里倾听。请告诉我更多，是什么让你感到困扰？",
  en: "I'm here to listen. Tell me more—what's been weighing on your heart?",
  ms: "Saya di sini untuk mendengar. Ceritakan lebih lanjut—apa yang membebani hati anda?",
  ja: "ここで聴いています。もっと教えてください——何があなたの心を重くしていますか？",
  ko: "여기서 듣고 있습니다. 더 이야기해 주세요—무엇이 당신의 마음을 무겁게 하고 있나요?",
  th: "ฉันอยู่ตรงนี้เพื่อฟัง เล่าให้ฉันฟังมากขึ้น—อะไรที่กำลังถ่วงจิตใจคุณอยู่?",
  es: "Estoy aquí para escuchar. Cuéntame más—¿qué está pesando en tu corazón?",
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * [CRITICAL: RESPONSE_LANGUAGE_LOCK]
 * 此兜底函数严格遵循用户 locale 参数选择对应语言的数据源。
 * 即使主 LLM 降级到此 mock，回复语言也必须由调用方传入的 locale 强制锁定，
 * 严禁在没有 locale 参数的情况下返回默认英文。
 * locale 默认值"zh"确保即使参数丢失也不会滑向英文。
 */
export function mockAnalyze(locale: Locale = "zh", _text?: string): CounselorResponse {
  const data = localizedData[locale] || localizedData.zh
  const allFirst = data.stepsSets.map(s => s[0])
  const allSecond = data.stepsSets.map(s => s[1])
  const allThird = data.stepsSets.map(s => s[2])
  return {
    thinkingPattern: pick(data.patterns),
    encouragement: pick(data.encouragements),
    steps: [pick(allFirst), pick(allSecond), pick(allThird)],
    dailyNote: pick(data.dailyNotes),
  }
}

export function mockChatReply(
  locale: Locale = "zh",
  text?: string,
  history?: { role: string; content: string }[]
): string {
  const data = localizedData[locale] || localizedData.zh
  const keyword = text?.slice(0, 36) || (history && history.length > 0 ? history[history.length - 1].content.slice(0, 36) : "")

  const encouragement = pick(data.encouragements)
  const pattern = pick(data.patterns)

  const zhLineBreak = "\n\n"

  if (keyword && locale === "zh") {
    return `${encouragement}${zhLineBreak}我听到你提到「${keyword}」。有时当我们深陷其中，很容易滑向"如果……就完了"的灾难化思维。${pattern}${zhLineBreak}如果你愿意，我们可以一起试试三件小事：\n1. 闭上眼睛，慢慢做三次深呼吸——吸气4秒，屏住，呼气7秒\n2. 拿起手机，用三个词写下此刻脑海中最担心的那个想法\n3. 给自己倒一杯温水，双手握住杯子，感受它的温度\n\n一步一步来，不用急。`
  }
  if (keyword && locale === "en") {
    return `${encouragement}${zhLineBreak}I hear you mentioning "${keyword}". Sometimes when we're in it, it's easy to slide into "if this happens, everything is over" thinking. ${pattern}${zhLineBreak}If you're open to it, let's try three small things together:\n1. Close your eyes, take three slow deep breaths — 4 seconds in, hold, 7 seconds out\n2. Pick up your phone, write down the worry in three words\n3. Pour yourself a glass of water, hold it in both hands, feel its warmth\n\nOne step at a time. No rush.`
  }
  if (keyword && locale === "ms") {
    return `${encouragement}${zhLineBreak}Saya dengar awak sebut "${keyword}". Kadang-kadang bila kita berada dalam situasi ini, mudah untuk jatuh ke dalam pemikiran "kalau ini berlaku, semuanya habis". ${pattern}${zhLineBreak}Kalau awak sudi, jom cuba tiga perkara kecil bersama:\n1. Tutup mata, tarik nafas dalam tiga kali — tarik 4 saat, tahan, hembus 7 saat\n2. Ambil telefon, tulis kebimbangan itu dalam tiga patah perkataan\n3. Tuang segelas air, pegang dengan dua tangan, rasa kehangatannya\n\nLangkah demi langkah. Jangan tergesa-gesa.`
  }
  if (keyword && locale === "ja") {
    return `${encouragement}${zhLineBreak}「${keyword}」という言葉をお聞きしています。時々、私たちは「もしこうなったらもう終わりだ」という破局的思考に陥りがちです。${pattern}${zhLineBreak}よろしければ、3つの小さなことを一緒に試してみませんか：\n1. 目を閉じて、ゆっくりと深呼吸を3回——4秒吸って、止めて、7秒で吐く\n2. スマホを手に取り、今の心配事を3つの言葉で書き出す\n3. コップに水を注ぎ、両手で包み込み、その温もりを感じる\n\n一歩ずつでいいんです。急がなくて大丈夫。`
  }
  if (keyword && locale === "ko") {
    return `${encouragement}${zhLineBreak}"${keyword}"에 대해 말씀하셨네요. 때로는 우리가 그 상황에 빠지면 "이렇게 되면 끝이야"라는 파국적 사고에 빠지기 쉽습니다. ${pattern}${zhLineBreak}함께 세 가지 작은 일을 시도해볼까요:\n1. 눈을 감고 천천히 세 번 깊게 숨을 쉬어보세요 — 4초 들이마시고, 멈추고, 7초 내쉬기\n2. 핸드폰을 들어 지금 가장 걱정되는 생각을 세 단어로 적어보세요\n3. 물 한 잔을 따라 두 손으로 감싸고 그 온기를 느껴보세요\n\n한 걸음씩 천천히. 서두르지 마세요.`
  }
  if (keyword && locale === "th") {
    return `${encouragement}${zhLineBreak}ฉันได้ยินคุณพูดถึง "${keyword}" บางครั้งเมื่อเราอยู่ในสถานการณ์นั้น มันง่ายที่จะคิดแบบหายนะ — "ถ้าเป็นแบบนี้คงจบเห่" ${pattern}${zhLineBreak}ถ้าคุณพร้อม ลองทำสามสิ่งเล็กๆ ด้วยกันไหม:\n1. หลับตา หายใจลึกๆ ช้าๆ สามครั้ง — หายใจเข้า 4 วินาที กลั้นไว้ หายใจออก 7 วินาที\n2. หยิบโทรศัพท์ขึ้นมา เขียนความกังวลนั้นเป็นสามคำ\n3. เทน้ำหนึ่งแก้ว ถือด้วยสองมือ สัมผัสความอุ่น\n\nทีละก้าว ไม่ต้องรีบ`
  }
  if (keyword && locale === "es") {
    return `${encouragement}${zhLineBreak}Escucho que mencionas "${keyword}". A veces cuando estamos inmersos en esto, es fácil caer en el pensamiento catastrófico de "si esto pasa, todo se acaba". ${pattern}${zhLineBreak}Si te parece bien, probemos tres pequeñas cosas juntos:\n1. Cierra los ojos, toma tres respiraciones profundas y lentas — inhala 4 segundos, sostén, exhala 7 segundos\n2. Toma tu teléfono, escribe la preocupación en tres palabras\n3. Sírvete un vaso de agua, sosténlo con ambas manos, siente su calidez\n\nPaso a paso. Sin prisas.`
  }
  return encouragement
}

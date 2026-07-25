import type { Locale } from "@/types"
import { getDict, tt } from "@/lib/getDict"
import { notFound } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"
import ExpertBadge from "@/components/ExpertBadge"
import AiEntrance from "@/components/AiEntrance"
import { BreadcrumbJsonLd, TopicJsonLd } from "@/components/JsonLd"
import { ArrowLeft, CheckCircle, Moon, Sparkles } from "lucide-react"
import Link from "next/link"

const ALL_LOCALES: Locale[] = ["zh", "en", "ms", "ja", "ko", "th", "es"]

export const dynamic = "force-static"

export async function generateStaticParams() {
  return ALL_LOCALES.map((lang) => ({ lang }))
}

interface DayData {
  day: number
  emoji: string
  title: string
  principle: string
  action: string
  anchor: string
}

const DAYS_BY_LOCALE: Record<Locale, DayData[]> = {
  zh: [
    { day: 1, emoji: "📋", title: "建立睡眠日志", principle: "睡眠日志是 CBT-I 的基石工具。连续记录一周的入睡时间、醒来时间、夜间醒来次数和日间困倦程度，能帮你和 AI 补导师精确识别你的睡眠模式。研究显示，仅通过自我监测，约 30% 的轻度失眠者就会出现症状改善——因为记录本身就在重建你对睡眠的觉察力。", action: "今晚睡前，记录你的预计入睡时间和实际入睡时间。不需要精确到分钟，大致估计即可。连续记录 7 天。", anchor: "把手放在日记本封面上，感受纸张的温度。这是你和自己之间的第一个诚实约定。" },
    { day: 2, emoji: "⏰", title: "固定起床时间", principle: "无论前一晚睡了多久，每天在同一时间起床是重置生物钟最有效的方法。固定起床时间会帮助你的身体建立稳定的睡眠-觉醒节律，这是 CBT-I 中刺激控制疗法的核心。即使你只睡了 4 小时，也要在固定时间起床——这会在当晚产生更强的睡眠驱动力。", action: "设定一个你能坚持的起床时间（建议不晚于早上 8 点），设置闹钟。起床后立即拉开窗帘接触自然光，帮助抑制褪黑素分泌。", anchor: "双脚踩在地板上，感受脚掌与地面接触的触感。深呼吸一次，对自己说：'新的一天开始了。'" },
    { day: 3, emoji: "🛋️", title: "刺激控制——重建床的催眠力", principle: "你的大脑已经学会了把床和清醒、焦虑联系在一起。刺激控制的目标是打破这个连接：只在困倦时才上床，不在床上做任何与睡眠无关的事（工作、刷手机、焦虑）。如果躺下 20 分钟还没睡着，就起床到另一个房间，做一件安静的事，直到再次感到困倦再回床上。", action: "今天开始执行'20 分钟规则'：如果躺下约 20 分钟仍无法入睡，就起床到客厅，在昏暗灯光下阅读纸质书或听轻柔音乐，直到困意来临再回床上。", anchor: "起身时，用手轻轻拍拍大腿，感受布料的纹理。这个动作会帮你标记'离开床'的物理边界。" },
    { day: 4, emoji: "🧘", title: "睡眠限制——压缩时间换取质量", principle: "睡眠限制疗法通过缩短在床时间，增加睡眠效率（实际睡眠时间 ÷ 在床时间）。初期你会感到轻微困倦，但这会在短期内重建你的睡眠驱动力。当你的睡眠效率连续一周超过 85% 后，可以逐步延长在床时间。注意：癫痫或躁狂症患者请在医生指导下进行。", action: "计算你过去一周的平均实际睡眠时间（来自睡眠日志）。今晚只在这个时间量上加 30 分钟作为在床时间。例如平均睡 5 小时，今晚最多在床上待 5.5 小时。", anchor: "躺下后，把一只手放在腹部，感受呼吸时腹部的起伏。不要试图控制呼吸，只是感受它。" },
    { day: 5, emoji: "🔄", title: "认知重构——改写'睡不着的剧本'", principle: "失眠的核心维持因素是灾难化思维（'今晚又睡不着了''明天肯定完蛋了'）。认知重构帮你识别这些自动负性思维，并用更平衡的替代思维替换它们。CBT-I 研究证明，仅通过认知重构干预，42% 的慢性失眠患者的睡眠效率即可提高到 85% 以上。", action: "写下你今晚睡前最担心的三个想法。在每个想法旁边，写一个更温和、更现实的替代版本。例如'今晚肯定又睡不着'→'即使今晚睡得不好，我过去也熬过来了，明天依然可以应对'。", anchor: "把写下的纸条折好放进枕头套里。这是一种象征性的释放——把担忧交给枕头，让夜晚承载它们。" },
    { day: 6, emoji: "🌿", title: "放松训练与感官锚点", principle: "渐进式肌肉放松和正念呼吸已被证明可以有效降低睡前皮质醇水平。当你的身体进入放松状态时，大脑会自然跟随。关键在于'不努力放松'——越努力越焦虑。只需要把注意力放在一个感官锚点上（呼吸、心跳、体温），让放松自然发生。", action: "今晚进行 5 分钟的渐进式放松：从脚趾开始，依次绷紧每块肌肉 5 秒然后放松 10 秒，逐步向上到面部。感受紧张释放后的沉重感和温暖感。", anchor: "关注你口腔上颚的温度——这是身体放松时的一个微妙信号。随着放松加深，上颚会变得微凉。" },
    { day: 7, emoji: "🎯", title: "综合评估与长期策略", principle: "经过一周的 CBT-I 干预，你的身体已经开始重新学习如何睡眠。今天的任务是回顾你的睡眠日志，评估哪些策略对你最有效。睡眠改善不是线性的——你可能有好有坏的日子，这是完全正常的。关键是识别你的个人模式，建立一个你可以长期坚持的'睡眠维护计划'。", action: "回顾 7 天的睡眠日志，回答三个问题：1）哪种策略对你的入睡时间改善最大？2）哪种策略最难坚持？3）未来一周你打算优先执行哪项策略？写下你的答案。", anchor: "把手放在心口，感受心脏稳定的跳动。对这颗心说声谢谢——它陪你度过了这七天，无论白天黑夜，从未停歇。" },
  ],
  en: [
    { day: 1, emoji: "📋", title: "Build Your Sleep Log", principle: "A sleep log is the foundation of CBT-I. Recording your sleep onset, wake time, night awakenings, and daytime drowsiness for one week helps you and your AI counselor pinpoint your exact sleep pattern. Studies show that self-monitoring alone improves symptoms in ~30% of mild insomnia cases—because the act of recording rebuilds your awareness of sleep.", action: "Before bed tonight, write down your estimated time of going to bed and actual time of falling asleep. Approximations are fine. Keep recording for 7 consecutive days.", anchor: "Place your hand on the cover of your journal, feeling the texture of the paper. This is the first honest agreement between you and yourself." },
    { day: 2, emoji: "⏰", title: "Set a Fixed Wake Time", principle: "Regardless of how many hours you slept, waking up at the same time every day is the most effective way to reset your circadian rhythm. A fixed wake time helps your body establish a stable sleep-wake rhythm—the core of stimulus control therapy. Even if you only slept 4 hours, get up at your fixed time—this builds stronger sleep drive for the following night.", action: "Set a wake-up time you can commit to (no later than 8 AM recommended). Set your alarm. Immediately after waking, open curtains to expose yourself to natural light to suppress melatonin.", anchor: "Plant both feet on the floor, feel the contact between your soles and the ground. Take one deep breath and tell yourself: 'A new day has begun.'" },
    { day: 3, emoji: "🛋️", title: "Stimulus Control—Rebuild Bed-Sleep Association", principle: "Your brain has learned to associate your bed with wakefulness and anxiety. Stimulus control aims to break this connection: only go to bed when sleepy, and don't do anything unrelated to sleep in bed (work, phone scrolling, worrying). If you can't fall asleep within ~20 minutes, get up and go to another room, do something quiet until you feel sleepy again.", action: "Start the '20-minute rule' tonight: if you can't fall asleep after ~20 minutes, get up and go to the living room. Read a physical book under dim light or listen to soft music until drowsiness returns.", anchor: "When you get up, gently pat your thigh and feel the fabric texture. This action marks the physical boundary of 'leaving the bed.'" },
    { day: 4, emoji: "🧘", title: "Sleep Restriction—Compress Time for Quality", principle: "Sleep restriction therapy increases sleep efficiency (actual sleep ÷ time in bed) by reducing time in bed. You may feel mild sleepiness initially, but this quickly rebuilds your sleep drive. Once your sleep efficiency exceeds 85% for a week, you can gradually extend time in bed. Note: People with epilepsy or mania should consult a doctor before attempting.", action: "Calculate your average actual sleep time from the past week (from your sleep log). Add 30 minutes to this as your time in bed tonight. If you averaged 5 hours, spend no more than 5.5 hours in bed tonight.", anchor: "Lie down and place one hand on your abdomen. Feel the rise and fall with each breath. Don't try to control your breathing—just observe it." },
    { day: 5, emoji: "🔄", title: "Cognitive Restructuring—Rewrite the Sleepless Script", principle: "The main maintaining factor of insomnia is catastrophic thinking ('I'll never sleep tonight,''I'll be ruined tomorrow'). Cognitive restructuring helps you identify these automatic negative thoughts and replace them with more balanced alternatives. CBT-I research shows that cognitive restructuring alone improves sleep efficiency above 85% in 42% of chronic insomnia patients.", action: "Write down your three biggest worries before bed tonight. Next to each, write a gentler, more realistic alternative. Example: 'I'll definitely not sleep tonight' → 'Even if I sleep poorly, I've gotten through it before. Tomorrow I'll still manage.'", anchor: "Fold the paper and tuck it inside your pillowcase. This is a symbolic release—handing your worries to the pillow, letting the night carry them." },
    { day: 6, emoji: "🌿", title: "Relaxation Training & Sensory Anchoring", principle: "Progressive muscle relaxation and mindful breathing have been proven to effectively lower pre-sleep cortisol levels. When your body enters a relaxed state, your mind naturally follows. The key is 'not trying to relax'—the more you try, the more anxious you get. Simply place your attention on a sensory anchor and let relaxation happen naturally.", action: "Tonight, do 5 minutes of progressive relaxation: starting from your toes, tense each muscle group for 5 seconds then release for 10 seconds, working your way up to your face. Notice the heaviness and warmth after release.", anchor: "Notice the temperature of the roof of your mouth—a subtle signal of relaxation. As relaxation deepens, the palate will feel slightly cooler." },
    { day: 7, emoji: "🎯", title: "Review & Long-Term Strategy", principle: "After a week of CBT-I intervention, your body has begun relearning how to sleep. Today's task is to review your sleep log and evaluate which strategies worked best for you. Sleep improvement isn't linear—you'll have good and bad days, which is completely normal. The key is to identify your personal patterns and build a 'sleep maintenance plan' you can sustain long-term.", action: "Review your 7-day sleep log and answer three questions: 1) Which strategy improved your sleep onset the most? 2) Which was hardest to stick with? 3) Which strategy will you prioritize next week? Write down your answers.", anchor: "Place your hand over your heart and feel its steady beat. Say thank you to this heart—it stayed with you through these seven days, day and night, never stopping." },
  ],
  ms: [
    { day: 1, emoji: "📋", title: "Bina Log Tidur", principle: "Log tidur adalah asas CBT-I. Mencatat masa tidur, masa bangun, keterjagaan malam, dan rasa mengantuk siang selama seminggu membantu anda dan kaunselor AI mengenal pasti corak tidur anda. Kajian menunjukkan pemantauan kendiri sahaja memperbaiki gejala dalam ~30% kes insomnia ringan—kerana tindakan mencatat membina semula kesedaran anda tentang tidur.", action: "Sebelum tidur malam ini, catat anggaran masa anda tidur dan masa sebenar anda tertidur. Anggaran kasar pun memadai. Teruskan mencatat selama 7 hari berturut-turut.", anchor: "Letakkan tangan pada kulit buku catatan anda, rasakan tekstur kertas. Ini adalah perjanjian jujur pertama antara anda dan diri sendiri." },
    { day: 2, emoji: "⏰", title: "Tetapkan Waktu Bangun Tetap", principle: "Tanpa mengira berapa jam anda tidur, bangun pada waktu yang sama setiap hari adalah cara paling berkesan untuk menetapkan semula irama sirkadian. Waktu bangun tetap membantu badan membina irama tidur-bangun yang stabil. Walaupun anda hanya tidur 4 jam, bangunlah pada waktu tetap—ini membina dorongan tidur yang lebih kuat untuk malam berikutnya.", action: "Tetapkan waktu bangun yang boleh anda komited (disyorkan selewat-lewatnya 8 pagi). Tetapkan alarm. Selepas bangun, buka langsir untuk mendedahkan diri kepada cahaya semula jadi.", anchor: "Tapakkan kedua kaki di lantai, rasakan sentuhan tapak kaki dengan tanah. Tarik nafas dalam dan katakan: 'Hari baru telah bermula.'" },
    { day: 3, emoji: "🛋️", title: "Kawalan Rangsangan—Bina Semula Hubungan Tidur-Katil", principle: "Otak anda telah belajar mengaitkan katil dengan kewaspadaan dan kebimbangan. Kawalan rangsangan bertujuan memutuskan hubungan ini: hanya tidur bila mengantuk, jangan lakukan aktiviti lain di katil. Jika tidak dapat tidur dalam ~20 minit, bangun dan pergi ke bilik lain.", action: "Mulakan 'peraturan 20 minit' malam ini: jika tidak dapat tidur selepas 20 minit, bangun dan pergi ke ruang tamu. Baca buku fizikal di bawah cahaya malap hingga rasa mengantuk kembali.", anchor: "Apabila bangun, tepuk perlahan paha dan rasakan tekstur kain. Tindakan ini menandakan sempadan fizikal 'meninggalkan katil.'" },
    { day: 4, emoji: "🧘", title: "Sekatan Tidur—Mampatkan Masa untuk Kualiti", principle: "Terapi sekatan tidur meningkatkan kecekapan tidur dengan mengurangkan masa di katil. Anda mungkin rasa mengantuk ringan pada awalnya, tetapi ini membina semula dorongan tidur. Apabila kecekapan tidur melebihi 85% selama seminggu, anda boleh memanjangkan masa di katil secara beransur.", action: "Kira purata masa tidur sebenar anda dari minggu lepas. Tambah 30 minit sebagai masa di katil malam ini. Jika purata 5 jam, jangan lebih 5.5 jam di katil malam ini.", anchor: "Baring dan letakkan satu tangan di perut. Rasakan naik turun setiap nafas. Jangan cuba kawal nafas—hanya perhatikan." },
    { day: 5, emoji: "🔄", title: "Restruktur Kognitif—Tulis Semula Skrip Insomnia", principle: "Faktor utama yang mengekalkan insomnia adalah pemikiran bencana. Restruktur kognitif membantu mengenal pasti pemikiran negatif automatik ini dan menggantikannya dengan alternatif yang lebih seimbang. Kajian CBT-I menunjukkan restruktur kognitif sahaja meningkatkan kecekapan tidur melebihi 85% dalam 42% pesakit insomnia kronik.", action: "Tulis tiga kebimbangan terbesar sebelum tidur malam ini. Di sebelah setiap satu, tulis alternatif yang lebih lembut dan realistik.", anchor: "Lipat kertas dan selitkan dalam sarung bantal. Ini pelepasan simbolik—menyerahkan kebimbangan kepada bantal." },
    { day: 6, emoji: "🌿", title: "Latihan Relaksasi & Sauh Deria", principle: "Relaksasi otot progresif dan pernafasan minda terbukti berkesan menurunkan paras kortisol sebelum tidur. Apabila badan memasuki keadaan relaks, minda akan mengikut secara semula jadi. Kuncinya adalah 'tidak cuba untuk relaks'—semakin anda cuba, semakin cemas.", action: "Malam ini, lakukan 5 minit relaksasi progresif: dari jari kaki, tegangkan setiap kumpulan otot selama 5 saat kemudian lepaskan 10 saat, naik ke muka.", anchor: "Perhatikan suhu lelangit mulut anda—isyarat halus relaksasi. Apabila relaksasi mendalam, lelangit terasa lebih sejuk." },
    { day: 7, emoji: "🎯", title: "Penilaian & Strategi Jangka Panjang", principle: "Selepas seminggu intervensi CBT-I, badan anda mula belajar semula cara tidur. Tugas hari ini adalah menilai log tidur anda dan strategi mana yang paling berkesan. Peningkatan tidur tidak linear—akan ada hari baik dan buruk, itu normal.", action: "Semak log tidur 7 hari dan jawab tiga soalan: 1) Strategi mana paling membantu? 2) Mana paling sukar? 3) Strategi mana akan anda utamakan minggu depan?", anchor: "Letakkan tangan di dada dan rasakan degupan jantung yang stabil. Ucap terima kasih pada hati ini—ia setia menemani tujuh hari ini." },
  ],
  ja: [
    { day: 1, emoji: "📋", title: "睡眠ログを作成する", principle: "睡眠ログはCBT-Iの基礎です。1週間、入眠時刻、起床時刻、夜間覚醒、日中の眠気を記録することで、あなたとAIカウンセラーが正確な睡眠パターンを把握できます。研究によると、自己モニタリングだけで軽度不眠症の約30%に改善が見られます。", action: "今夜寝る前に、就寝予定時刻と実際の入眠時刻を記録してください。おおよその時間で構いません。7日間連続で記録を続けましょう。", anchor: "日記の表紙に手を置き、紙の質感を感じてください。これはあなた自身との最初の正直な約束です。" },
    { day: 2, emoji: "⏰", title: "起床時間を固定する", principle: "前夜の睡眠時間に関わらず、毎日同じ時間に起床することが体内時計をリセットする最も効果的な方法です。固定された起床時間は安定した睡眠-覚醒リズムを構築します。たとえ4時間しか眠れなくても、決まった時間に起きることで翌晩の睡眠圧が高まります。", action: "守れる起床時間を設定してください（遅くとも午前8時までを推奨）。アラームをセットし、起きたらすぐにカーテンを開けて自然光を浴びましょう。", anchor: "両足を床につけ、足裏が地面に触れる感覚を味わってください。深く息を吸い、'新しい一日が始まった'と自分に言い聞かせましょう。" },
    { day: 3, emoji: "🛋️", title: "刺激統制法—ベッドと睡眠の関係を再構築する", principle: "あなたの脳はベッドと覚醒・不安を結びつけることを学習しています。刺激統制法の目標はこの結びつきを断つことです：眠いときだけベッドに行き、ベッドでは睡眠以外のことをしない。20分経っても眠れなければ、別の部屋に移動して静かなことをしましょう。", action: "今夜から'20分ルール'を始めましょう：横になって約20分経っても眠れなければ、起きてリビングに移動し、薄暗い照明の下で読書をするか柔らかい音楽を聴いてください。", anchor: "起きる時に、太ももを軽く叩き布の質感を感じてください。この動作が'ベッドを離れる'という物理的な境界を示します。" },
    { day: 4, emoji: "🧘", title: "睡眠制限法—時間を圧縮して質を高める", principle: "睡眠制限法はベッドでの時間を短縮することで睡眠効率を高めます。初期には軽い眠気を感じるかもしれませんが、これが睡眠圧を迅速に再構築します。睡眠効率が1週間連続で85%を超えたら、ベッドでの時間を徐々に延ばすことができます。", action: "過去1週間の平均実睡眠時間を計算してください（睡眠ログから）。今夜はその時間に30分を加えた時間だけベッドにいるようにしましょう。平均5時間なら、今夜は最大5.5時間です。", anchor: "横になり、片方の手を腹部に当ててください。呼吸に合わせて腹部が上下するのを感じましょう。呼吸をコントロールしようとせず、ただ観察してください。" },
    { day: 5, emoji: "🔄", title: "認知再構成—不眠のシナリオを書き換える", principle: "不眠を維持する主な要因は破局的思考です（'今夜も眠れない''明日は絶対ダメだ'）。認知再構成はこれらの自動的否定的思考を特定し、よりバランスの取れた代替思考に置き換えるのを助けます。CBT-I研究によると、認知再構成だけで慢性不眠症患者の42%で睡眠効率が85%以上に改善します。", action: "今夜寝る前に最も心配していることを3つ書き出してください。それぞれの横に、より優しく現実的な代替バージョンを書いてみましょう。", anchor: "書いた紙を折りたたんで枕カバーの中に入れてください。これは象徴的な解放—悩みを枕に預け、夜にそれらを運ばせることです。" },
    { day: 6, emoji: "🌿", title: "リラクセーション訓練と感覚アンカー", principle: "プログレッシブ筋弛緩法とマインドフル呼吸は就寝前のコルチゾール値を効果的に下げることが証明されています。身体がリラックス状態に入ると、心も自然に従います。鍵は'リラックスしようとしないこと'—努力すればするほど不安になります。", action: "今夜は5分間のプログレッシブリラクセーションを行いましょう：つま先から始めて、各筋肉群を5秒間緊張させてから10秒間解放し、顔まで順に進みます。", anchor: "口蓋の温度に注意を向けてください—リラックスの微妙なサインです。リラックスが深まると、口蓋がやや冷たく感じられます。" },
    { day: 7, emoji: "🎯", title: "総合評価と長期戦略", principle: "1週間のCBT-I介入後、あなたの体は睡眠を再学習し始めています。今日の課題は睡眠ログを振り返り、どの戦略が最も効果的だったかを評価することです。睡眠の改善は直線的ではありません—良い日も悪い日もあります。それは完全に正常です。", action: "7日間の睡眠ログを振り返り、3つの質問に答えてください：1）どの戦略が入眠時間の改善に最も効果的でしたか？2）どの戦略が最も継続が難しかったですか？3）来週はどの戦略を優先しますか？", anchor: "手を心臓に当て、安定した鼓動を感じてください。この心臓に感謝の気持ちを伝えましょう—昼夜を問わず、休むことなくあなたとともにありました。" },
  ],
  ko: [
    { day: 1, emoji: "📋", title: "수면 일지 작성하기", principle: "수면 일지는 CBT-I의 기초입니다. 일주일 동안 취침 시간, 기상 시간, 야간 각성, 주간 졸음 정도를 기록하면 AI 상담사와 함께 정확한 수면 패턴을 파악할 수 있습니다. 연구에 따르면 자기 모니터링만으로도 경도 불면증 환자의 약 30%에서 증상이 개선됩니다.", action: "오늘 밤 취침 전, 예상 취침 시간과 실제 입면 시간을 기록하세요. 대략적인 시간이어도 괜찮습니다. 7일 연속으로 기록을 유지하세요.", anchor: "일지 표지에 손을 얹고 종이의 질감을 느껴보세요. 이것은 자신과의 첫 번째 정직한 약속입니다." },
    { day: 2, emoji: "⏰", title: "고정 기상 시간 설정하기", principle: "전날 잠을 얼마나 잤든 매일 같은 시간에 기상하는 것이 생체 리듬을 재설정하는 가장 효과적인 방법입니다. 고정된 기상 시간은 안정적인 수면-각성 리듬을 구축하는 데 도움을 줍니다. 4시간밖에 자지 못했더라도 정해진 시간에 일어나세요—그러면 다음 날 밤 더 강한 수면 압력이 형성됩니다.", action: "지킬 수 있는 기상 시간을 설정하세요 (늦어도 오전 8시 이전 권장). 알람을 맞추고, 기상 후 즉시 커튼을 열어 자연광을 쬐세요.", anchor: "두 발을 바닥에 딛고 발바닥이 지면에 닿는 감각을 느껴보세요. 심호흡을 한 번 하고 '새로운 하루가 시작되었다'고 자신에게 말하세요." },
    { day: 3, emoji: "🛋️", title: "자극 통제—침대-수면 연관성 재구축", principle: "당신의 뇌는 침대를 각성과 불안과 연결 짓도록 학습되었습니다. 자극 통제의 목표는 이 연결을 끊는 것입니다: 졸릴 때만 침대에 가고, 침대에서는 수면과 관련 없는 일을 하지 마세요. 약 20분 후에도 잠이 들지 않으면 일어나서 다른 방으로 이동하세요.", action: "오늘 밤부터 '20분 규칙'을 시작하세요: 누워서 약 20분 후에도 잠들지 못하면 일어나 거실로 이동해 은은한 조명 아래에서 책을 읽거나 부드러운 음악을 들어보세요.", anchor: "일어날 때 허벅지를 가볍게 두드리며 천의 질감을 느껴보세요. 이 동작은 '침대 떠나기'의 물리적 경계를 표시합니다." },
    { day: 4, emoji: "🧘", title: "수면 제한—시간을 압축하여 질 확보", principle: "수면 제한 요법은 침대에 있는 시간을 줄여 수면 효율을 높입니다. 초기에는 가벼운 졸음을 느낄 수 있지만, 이것이 수면 압력을 빠르게 재구축합니다. 일주일 연속으로 수면 효율이 85%를 초과하면 침대 시간을 점진적으로 늘릴 수 있습니다.", action: "지난주 평균 실제 수면 시간을 계산하세요 (수면 일지에서). 오늘 밤은 그 시간에 30분을 더한 시간만 침대에 머무르세요. 평균 5시간이면 최대 5.5시간만 침대에 있습니다.", anchor: "누워서 한 손을 복부에 얹으세요. 호흡에 따라 복부가 오르내리는 것을 느껴보세요. 호흡을 통제하려 하지 말고 그저 관찰하세요." },
    { day: 5, emoji: "🔄", title: "인지 재구성—불면증 대본 다시 쓰기", principle: "불면증을 유지하는 주요 요인은 파국적 사고입니다 ('오늘 밤도 못 잘 거야', '내일 망했어'). 인지 재구성은 이러한 자동적 부정적 사고를 식별하고 더 균형 잡힌 대안으로 교체하도록 돕습니다.", action: "오늘 밤 취침 전 가장 걱정되는 세 가지를 적어보세요. 각각 옆에 더 부드럽고 현실적인 대안 버전을 써보세요.", anchor: "적은 종이를 접어 베갯잇 안에 넣으세요. 이것은 상징적인 해방입니다—걱정을 베개에 맡기고 밤이 그것을 싣고 가게 하는 것입니다." },
    { day: 6, emoji: "🌿", title: "이완 훈련과 감각 앵커", principle: "점진적 근육 이완법과 마음챙김 호흡은 취침 전 코르티솔 수치를 효과적으로 낮추는 것으로 입증되었습니다. 신체가 이완 상태에 들어가면 마음도 자연스럽게 따라옵니다. 핵심은 '이완하려고 하지 않는 것'입니다—애쓸수록 더 불안해집니다.", action: "오늘 밤 5분간 점진적 이완을 실시하세요: 발가락부터 시작하여 각 근육군을 5초간 긴장시킨 후 10초간 이완하며 얼굴까지 올라갑니다.", anchor: "입천장의 온도에 주목하세요—이완의 미묘한 신호입니다. 이완이 깊어질수록 입천장이 약간 시원하게 느껴집니다." },
    { day: 7, emoji: "🎯", title: "종합 평가와 장기 전략", principle: "일주일 간의 CBT-I 중재 후, 당신의 몸은 수면 방법을 다시 배우기 시작했습니다. 오늘의 과제는 수면 일지를 검토하고 어떤 전략이 가장 효과적이었는지 평가하는 것입니다. 수면 개선은 선형적이지 않습니다—좋은 날도 있고 나쁜 날도 있습니다. 그것은 완전히 정상입니다.", action: "7일간의 수면 일지를 검토하고 세 가지 질문에 답하세요: 1) 어떤 전략이 입면 시간 개선에 가장 효과적이었나요? 2) 어떤 전략이 지속하기 가장 어려웠나요? 3) 다음 주에 어떤 전략을 우선할 건가요?", anchor: "손을 심장 위에 얹고 안정적인 박동을 느껴보세요. 이 심장에 감사를 전하세요—밤낮으로 쉬지 않고 당신과 함께했습니다." },
  ],
  th: [
    { day: 1, emoji: "📋", title: "สร้างบันทึกการนอน", principle: "บันทึกการนอนคือรากฐานของ CBT-I การบันทึกเวลาเข้านอน เวลาตื่น การตื่นกลางดึก และอาการง่วงตอนกลางวันเป็นเวลาหนึ่งสัปดาห์ช่วยให้คุณและที่ปรึกษา AI ระบุรูปแบบการนอนที่แม่นยำของคุณ งานวิจัยแสดงว่าการติดตามด้วยตนเองเพียงอย่างเดียวช่วยปรับปรุงอาการในผู้ป่วยนอนไม่หลับเล็กน้อยประมาณ 30%", action: "ก่อนนอนคืนนี้ บันทึกเวลาโดยประมาณที่คุณเข้านอนและเวลาที่คุณหลับจริง โดยประมาณก็พอ ดำเนินการบันทึกต่อเนื่อง 7 วัน", anchor: "วางมือบนปกสมุดบันทึก สัมผัสพื้นผิวของกระดาษ นี่คือสัญญาที่ซื่อสัตย์ครั้งแรกระหว่างคุณกับตัวคุณเอง" },
    { day: 2, emoji: "⏰", title: "กำหนดเวลาตื่นที่แน่นอน", principle: "ไม่ว่าคุณจะนอนไปกี่ชั่วโมง การตื่นเวลาเดียวกันทุกวันเป็นวิธีที่มีประสิทธิภาพที่สุดในการรีเซ็ตนาฬิกาชีวภาพ เวลาตื่นที่แน่นอนช่วยให้ร่างกายสร้างจังหวะการนอน-ตื่นที่ stable แม้คุณนอนเพียง 4 ชั่วโมง ก็จงตื่นตามเวลาที่กำหนด—สิ่งนี้สร้างแรงขับการนอนที่ stronger สำหรับคืนถัดไป", action: "กำหนดเวลาตื่นที่คุณสามารถทำตามได้ (แนะนำไม่เกิน 8 โมงเช้า) ตั้งปลุก หลังจากตื่น ให้เปิดผ้าม่านเพื่อรับแสงธรรมชาติ", anchor: "วางเท้าทั้งสองข้างบนพื้น สัมผัสการสัมผัสระหว่างฝ่าเท้ากับพื้น หายใจเข้าลึก ๆ และบอกตัวเองว่า 'วันใหม่ได้เริ่มต้นแล้ว'" },
    { day: 3, emoji: "🛋️", title: "การควบคุมสิ่งกระตุ้น—สร้างความสัมพันธ์การนอน-เตียงใหม่", principle: "สมองของคุณเรียนรู้ที่จะเชื่อมโยงเตียงนอนกับความตื่นตัวและความกังวล การควบคุมสิ่งกระตุ้นมีเป้าหมายเพื่อทำลายความเชื่อมโยงนี้: ไปนอนเมื่อง่วงเท่านั้น อย่าทำกิจกรรมอื่นบนเตียง ถ้าหลับไม่ลงใน ~20 นาที ให้ลุกขึ้นไปห้องอื่นทำสิ่งที่เงียบสงบ", action: "เริ่ม 'กฎ 20 นาที' คืนนี้: ถ้าหลับไม่ลงหลังจาก 20 นาที ให้ลุกขึ้นไปที่ห้องนั่งเล่น อ่านหนังสือภายใต้แสงสลัวจนกว่าจะรู้สึกง่วงอีกครั้ง", anchor: "เมื่อคุณลุกขึ้น ตบต้นขาเบา ๆ และสัมผัสพื้นผิวของผ้า การกระทำนี้เป็นการทำเครื่องหมายขอบเขตทางกายภาพของ 'การออกจากเตียง'" },
    { day: 4, emoji: "🧘", title: "การจำกัดการนอน—บีบอัดเวลาเพื่อคุณภาพ", principle: "การบำบัดด้วยการจำกัดการนอนเพิ่มประสิทธิภาพการนอนโดยลดเวลาในการอยู่บนเตียง คุณอาจรู้สึกง่วงเล็กน้อยในช่วงแรก แต่สิ่งนี้จะสร้างแรงขับการนอนขึ้นใหม่อย่างรวดเร็ว เมื่อประสิทธิภาพการนอนเกิน 85% ติดต่อกันหนึ่งสัปดาห์ คุณสามารถค่อยๆ เพิ่มเวลาในการอยู่บนเตียงได้", action: "คำนวณเวลาเฉลี่ยที่คุณนอนจริงจากสัปดาห์ที่ผ่านมา (จากบันทึกการนอน) คืนนี้ให้เพิ่มอีก 30 นาทีเป็นเวลาอยู่บนเตียงของคุณ ถ้าเฉลี่ย 5 ชั่วโมง อย่าอยู่บนเตียงเกิน 5.5 ชั่วโมง", anchor: "นอนราบและวางมือข้างหนึ่งบนท้อง สัมผัสการขึ้นลงของท้องตามลมหายใจ อย่าพยายามควบคุมลมหายใจ—แค่สังเกตมัน" },
    { day: 5, emoji: "🔄", title: "การปรับเปลี่ยนความคิด—เขียนบทใหม่ของอาการนอนไม่หลับ", principle: "ปัจจัยหลักที่รักษาอาการนอนไม่หลับคือความคิดเชิงหายนะ ('คืนนี้ก็คงนอนไม่หลับอีก''พรุ่งนี้พังแน่') การปรับเปลี่ยนความคิดช่วยให้คุณระบุความคิดอัตโนมัติเชิงลบเหล่านี้และแทนที่ด้วยทางเลือกที่สมดุลมากขึ้น", action: "เขียนสามความกังวลที่มากที่สุดก่อนนอนคืนนี้ ถัดจากแต่ละข้อ เขียนเวอร์ชันที่อ่อนโยนและสมจริงมากขึ้น ตัวอย่าง: 'คืนนี้คงนอนไม่หลับแน่' → 'ถึงจะนอนไม่ดี ก็เคยผ่านมาแล้ว พรุ่งนี้ยังไหว'", anchor: "พับกระดาษและสอดไว้ในปลอกหมอน นี่คือการปลดปล่อยเชิงสัญลักษณ์—มอบความกังวลให้หมอน ปล่อยให้กลางคืนพามันไป" },
    { day: 6, emoji: "🌿", title: "การฝึกผ่อนคลายและจุดยึดประสาทสัมผัส", principle: "การผ่อนคลายกล้ามเนื้อแบบก้าวหน้าและการหายใจอย่างมีสติได้รับการพิสูจน์ว่าสามารถลดระดับคอร์ติซอลก่อนนอนได้อย่างมีประสิทธิภาพ เมื่อร่างกายเข้าสู่สภาวะผ่อนคลาย จิตใจจะตามมาโดยธรรมชาติ หัวใจสำคัญคือ 'ไม่ต้องพยายามผ่อนคลาย'—ยิ่งพยายามยิ่งกังวล", action: "คืนนี้ ทำการผ่อนคลายแบบก้าวหน้า 5 นาที: เริ่มจากปลายเท้า เกร็งกล้ามเนื้อแต่ละกลุ่ม 5 วินาทีแล้วผ่อน 10 วินาที ค่อยๆ ขึ้นไปถึงใบหน้า", anchor: "สังเกตอุณหภูมิของเพดานปาก—สัญญาณ sübil ของการผ่อนคลาย เมื่อผ่อนคลายลึกขึ้น เพดานปากจะรู้สึกเย็นขึ้นเล็กน้อย" },
    { day: 7, emoji: "🎯", title: "การประเมินผลและกลยุทธ์ระยะยาว", principle: "หลังจากหนึ่งสัปดาห์ของการแทรกแซง CBT-I ร่างกายของคุณเริ่มเรียนรู้วิธีการนอนใหม่อีกครั้ง งานของวันนี้คือการทบทวนบันทึกการนอนและประเมินว่ากลยุทธ์ใดได้ผลดีที่สุดสำหรับคุณ การปรับปรุงการนอนไม่เป็นเส้นตรง—คุณจะมีวันที่ดีและไม่ดี ซึ่งเป็นเรื่องปกติ", action: "ทบทวนบันทึกการนอน 7 วันและตอบสามคำถาม: 1) กลยุทธ์ใดช่วยปรับปรุงการหลับได้มากที่สุด? 2) กลยุทธ์ใดทำตามได้ยากที่สุด? 3) สัปดาห์หน้าคุณจะให้ความสำคัญกับกลยุทธ์ใด?", anchor: "วางมือบนหัวใจและสัมผัสการเต้นที่มั่นคง กล่าวขอบคุณหัวใจดวงนี้—มันอยู่กับคุณตลอดเจ็ดวันนี้ ทั้งกลางวันและกลางคืน ไม่เคยหยุด" },
  ],
  es: [
    { day: 1, emoji: "📋", title: "Crea tu Diario de Sueño", principle: "Un diario de sueño es la base de la TCC-I. Registrar tu inicio de sueño, hora de despertar, despertares nocturnos y somnolencia diurna durante una semana te ayuda a ti y a tu consejero AI a identificar tu patrón exacto de sueño. Estudios muestran que el auto-monitoreo solo mejora síntomas en ~30% de casos de insomnio leve.", action: "Esta noche antes de dormir, anota tu hora estimada de acostarte y la hora real en que te quedaste dormido. Aproximaciones están bien. Continúa registrando por 7 días consecutivos.", anchor: "Coloca tu mano sobre la portada de tu diario, sintiendo la textura del papel. Este es el primer acuerdo honesto entre tú y ti mismo." },
    { day: 2, emoji: "⏰", title: "Establece una Hora Fija de Despertar", principle: "Sin importar cuántas horas hayas dormido, despertar a la misma hora cada día es la forma más efectiva de restablecer tu ritmo circadiano. Una hora fija de despertar ayuda a tu cuerpo a establecer un ritmo sueño-vigilia estable. Incluso si solo dormiste 4 horas, levántate a tu hora fija.", action: "Establece una hora de despertar que puedas cumplir (se recomienda no más tarde de las 8 AM). Pon tu alarma. Al despertar, abre las cortinas para exponerte a la luz natural.", anchor: "Apoya ambos pies en el suelo, siente el contacto de tus plantas con el piso. Toma una respiración profunda y díte a ti mismo: 'Un nuevo día ha comenzado.'" },
    { day: 3, emoji: "🛋️", title: "Control de Estímulos—Reconstruye la Asociación Cama-Sueño", principle: "Tu cerebro ha aprendido a asociar tu cama con vigilia y ansiedad. El control de estímulos busca romper esta conexión: solo ve a la cama cuando tengas sueño, no hagas nada no relacionado con dormir en la cama. Si no puedes dormir en ~20 minutos, levántate y ve a otra habitación.", action: "Comienza la 'regla de los 20 minutos' esta noche: si no puedes dormir después de ~20 minutos, levántate y ve a la sala. Lee un libro físico bajo luz tenue hasta que el sueño regrese.", anchor: "Al levantarte, da una palmada suave en tu muslo y siente la textura de la tela. Esta acción marca el límite físico de 'dejar la cama.'" },
    { day: 4, emoji: "🧘", title: "Restricción de Sueño—Comprime Tiempo por Calidad", principle: "La terapia de restricción del sueño aumenta la eficiencia del sueño reduciendo el tiempo en cama. Puedes sentir somnolencia leve inicialmente, pero esto reconstruye rápidamente tu impulso de sueño. Cuando tu eficiencia de sueño supere el 85% durante una semana, puedes extender gradualmente el tiempo en cama.", action: "Calcula tu tiempo real promedio de sueño de la semana pasada (de tu diario de sueño). Añade 30 minutos como tu tiempo en cama esta noche. Si promediaste 5 horas, no pases más de 5.5 horas en cama.", anchor: "Acuéstate y coloca una mano sobre tu abdomen. Siente el ascenso y descenso con cada respiración. No intentes controlar tu respiración—solo obsérvala." },
    { day: 5, emoji: "🔄", title: "Reestructuración Cognitiva—Reescribe el Guión del Insomnio", principle: "El principal factor mantenedor del insomnio es el pensamiento catastrófico ('Nunca dormiré esta noche', 'Mañana estaré arruinado'). La reestructuración cognitiva te ayuda a identificar estos pensamientos negativos automáticos y reemplazarlos con alternativas más equilibradas.", action: "Escribe tus tres mayores preocupaciones antes de dormir esta noche. Al lado de cada una, escribe una versión alternativa más suave y realista.", anchor: "Dobla el papel y mételo dentro de tu funda de almohada. Esta es una liberación simbólica—entregar tus preocupaciones a la almohada, dejar que la noche las lleve." },
    { day: 6, emoji: "🌿", title: "Entrenamiento de Relajación y Anclaje Sensorial", principle: "La relajación muscular progresiva y la respiración consciente han demostrado reducir efectivamente los niveles de cortisol antes de dormir. Cuando tu cuerpo entra en un estado de relajación, tu mente sigue naturalmente. La clave es 'no intentar relajarse'—cuanto más lo intentas, más ansioso te pones.", action: "Esta noche, haz 5 minutos de relajación progresiva: comenzando desde los dedos de los pies, tensa cada grupo muscular por 5 segundos y luego relaja por 10 segundos, subiendo hasta la cara.", anchor: "Nota la temperatura del paladar de tu boca—una señal sutil de relajación. A medida que la relajación se profundiza, el paladar se sentirá ligeramente más fresco." },
    { day: 7, emoji: "🎯", title: "Evaluación Integral y Estrategia a Largo Plazo", principle: "Después de una semana de intervención TCC-I, tu cuerpo ha comenzado a reaprender cómo dormir. La tarea de hoy es revisar tu diario de sueño y evaluar qué estrategias funcionaron mejor para ti. La mejora del sueño no es lineal—tendrás días buenos y malos, eso es completamente normal.", action: "Revisa tu diario de sueño de 7 días y responde tres preguntas: 1) ¿Qué estrategia mejoró más tu inicio de sueño? 2) ¿Cuál fue la más difícil de mantener? 3) ¿Qué estrategia priorizarás la próxima semana?", anchor: "Coloca tu mano sobre tu corazón y siente su latido constante. Agradécele a este corazón—estuvo contigo durante estos siete días, día y noche, sin detenerse nunca." },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDict(locale)
  const dictEn = getDict("en")

  const siteName = tt(dict, "hero.title") || tt(dictEn, "hero.title") || "DeepCalm AI"
  const titleSuffixes: Record<Locale, string> = {
    zh: "7天睡眠重塑计划 — CBT-I 科学干预",
    en: "7-Day Sleep Reboot — CBT-I Protocol",
    ms: "Program Sleep 7 Hari — Intervensi CBT-I",
    ja: "7日間睡眠再構築計画 — CBT-I プロトコル",
    ko: "7일 수면 재구축 계획 — CBT-I 프로토콜",
    th: "แผนปรับการนอน 7 วัน — โปรโตคอล CBT-I",
    es: "Plan de Reinicio de Sueño de 7 Días — Protocolo TCC-I",
  }
  const seoTitle = `${siteName} — ${titleSuffixes[locale] || titleSuffixes.en}`
  const descPrefix: Record<Locale, string> = {
    zh: "基于 CBT-I（失眠认知行为疗法）的 7 天循证睡眠重塑计划。每日科学原理、行动指南与感官锚点练习。",
    en: "A 7-day evidence-based sleep reboot program grounded in CBT-I. Daily science principles, actionable steps, and sensory anchoring exercises.",
    ms: "Program sleep 7 hari berasaskan CBT-I. Prinsip sains harian, langkah tindakan, dan latihan sauh deria.",
    ja: "CBT-Iに基づく7日間のエビデンスベース睡眠再構築プログラム。毎日の科学原理、行動指針、感覚アンカーエクササイズ。",
    ko: "CBT-I 기반 7일 과학적 수면 재구축 프로그램. 매일의 과학 원리, 실행 지침, 감각 앵커 운동.",
    th: "โปรแกรมปรับการนอน 7 วันที่มีหลักฐานทางวิทยาศาสตร์อ้างอิงจาก CBT-I หลักการวิทยาศาสตร์รายวัน ขั้นตอนการปฏิบัติ และแบบฝึกหัดจุดยึดประสาทสัมผัส",
    es: "Un programa de reinicio de sueño de 7 días basado en evidencia con TCC-I. Principios científicos diarios, pasos prácticos y ejercicios de anclaje sensorial.",
  }

  return {
    title: seoTitle,
    description: descPrefix[locale] || descPrefix.en,
    metadataBase: new URL("https://deepcalm-ai.com"),
    alternates: {
      canonical: `https://deepcalm-ai.com/${locale}/library/cbt-i-7day-plan`,
      languages: Object.fromEntries(ALL_LOCALES.map((l) => [l, `https://deepcalm-ai.com/${l}/library/cbt-i-7day-plan`])),
    },
    openGraph: { title: seoTitle, description: descPrefix[locale] || descPrefix.en },
  }
}

export default async function Cbti7DayPlanPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale

  if (!ALL_LOCALES.includes(locale)) notFound()

  const days = DAYS_BY_LOCALE[locale] || DAYS_BY_LOCALE.en

  const pageTitle: Record<Locale, string> = {
    zh: "🧘 7天睡眠重塑计划",
    en: "🧘 7-Day Sleep Reboot Plan",
    ms: "🧘 Program Sleep 7 Hari",
    ja: "🧘 7日間睡眠再構築計画",
    ko: "🧘 7일 수면 재구축 계획",
    th: "🧘 แผนปรับการนอน 7 วัน",
    es: "🧘 Plan de Reinicio de Sueño de 7 Días",
  }
  const pageSubtitle: Record<Locale, string> = {
    zh: "基于 CBT-I 的一周循证干预，每日一个核心策略，从根源改善你的睡眠。",
    en: "One week of evidence-based CBT-I intervention. One core strategy each day to transform your sleep from the root.",
    ms: "Satu minggu intervensi CBT-I berasaskan bukti. Satu strategi teras setiap hari untuk mengubah tidur anda dari akar umbi.",
    ja: "エビデンスに基づいた一週間のCBT-I介入。毎日一つの核戦略で、睡眠を根本から変える。",
    ko: "증거 기반 CBT-I 중재 1주일. 매일 하나의 핵심 전략으로 수면을 근본부터 변화시킵니다.",
    th: "การแทรกแซง CBT-I หนึ่งสัปดาห์ที่มีหลักฐานทางวิทยาศาสตร์ หนึ่งกลยุทธ์หลักในแต่ละวันเพื่อเปลี่ยนแปลงการนอนของคุณจากรากฐาน",
    es: "Una semana de intervención TCC-I basada en evidencia. Una estrategia central cada día para transformar tu sueño desde la raíz.",
  }
  const introText: Record<Locale, string> = {
    zh: "这个计划基于失眠认知行为疗法（CBT-I）的核心原理，被美国内科医师学会、美国睡眠医学会和英国国家健康与临床优化研究所推荐为慢性失眠的一线治疗方案。CBT-I 不依赖药物，而是通过系统性地重建你的睡眠行为、认知模式和生理节律，从根本上恢复你身体天然的睡眠能力。研究表明，完成 7 天 CBT-I 干预后，70-80% 的参与者报告入睡时间显著缩短，睡眠效率提升至 85% 以上。",
    en: "This plan is grounded in Cognitive Behavioral Therapy for Insomnia (CBT-I), recommended by the American College of Physicians, the American Academy of Sleep Medicine, and NICE as the first-line treatment for chronic insomnia. Rather than relying on medication, CBT-I systematically rebuilds your sleep behaviors, cognitive patterns, and circadian rhythms to restore your body's natural ability to sleep. Studies show that after completing a 7-day CBT-I protocol, 70-80% of participants report significantly reduced sleep onset time and improved sleep efficiency above 85%.",
    ms: "Program ini berasaskan prinsip teras CBT-I, disyorkan oleh American College of Physicians sebagai rawatan pertama untuk insomnia kronik. CBT-I tidak bergantung pada ubat, tetapi membina semula tingkah laku tidur, corak kognitif, dan irama sirkadian secara sistematik. Kajian menunjukkan 70-80% peserta melaporkan pengurangan masa tidur yang ketara selepas program 7 hari.",
    ja: "この計画はCBT-I（不眠症のための認知行動療法）の中核原理に基づいており、米国内科医師会によって慢性不眠症の第一選択治療として推奨されています。薬物に頼らず、睡眠行動、認知パターン、概日リズムを体系的に再構築します。研究によると、7日間のCBT-Iプロトコル完了後、70-80%の参加者が入眠時間の大幅な短縮を報告しています。",
    ko: "이 계획은 미국 내과학회에서 만성 불면증의 일차 치료법으로 권장하는 CBT-I의 핵심 원리에 기반합니다. 약물에 의존하지 않고 수면 행동, 인지 패턴, 일주기 리듬을 체계적으로 재구축합니다. 연구에 따르면 7일 CBT-I 프로토콜 완료 후 70-80%의 참가자가 입면 시간이 크게 단축되었다고 보고했습니다.",
    th: "แผนนี้อ้างอิงจากหลักการสำคัญของ CBT-I ซึ่งถูกแนะนำโดย American College of Physicians เป็นการรักษาแรกสำหรับอาการนอนไม่หลับเรื้อรัง CBT-I ไม่พึ่งพายา แต่สร้างพฤติกรรมการนอน รูปแบบความคิด และจังหวะชีวภาพขึ้นใหม่อย่างเป็นระบบ การศึกษาแสดงว่าผู้เข้าร่วม 70-80% รายงานว่าระยะเวลาการหลับลดลงอย่างมีนัยสำคัญหลังจากโปรแกรม 7 วัน",
    es: "Este plan se basa en los principios centrales de la TCC-I, recomendada por el American College of Physicians como tratamiento de primera línea para el insomnio crónico. La TCC-I no depende de medicamentos, sino que reconstruye sistemáticamente tus comportamientos de sueño, patrones cognitivos y ritmos circadianos. Estudios muestran que el 70-80% de los participantes reportan una reducción significativa en el tiempo de inicio del sueño tras completar el protocolo de 7 días.",
  }

  return (
    <div className="min-h-screen bg-nord-bg">
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-nord-accent/5 via-nord-bg to-nord-bg pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Library", href: `/${locale}/library` },
              { label: "CBT-I 7-Day Plan", href: `/${locale}/library/cbt-i-7day-plan` },
            ]}
            locale={locale}
          />

          <div className="mb-8">
            <Link
              href={`/${locale}/library`}
              className="inline-flex items-center gap-1.5 text-xs text-nord-accent/70 hover:text-nord-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {locale === "zh" ? "返回图书馆" :
               locale === "ms" ? "Kembali" :
               locale === "ja" ? "戻る" :
               locale === "ko" ? "돌아가기" :
               locale === "th" ? "กลับ" :
               locale === "es" ? "Volver" : "Back"}
            </Link>
          </div>

          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-nord-text mb-4">
              {pageTitle[locale] || pageTitle.en}
            </h1>
            <p className="text-nord-text/60 leading-relaxed mb-6">
              {pageSubtitle[locale] || pageSubtitle.en}
            </p>

            {/* Clinical introduction */}
            <div className="p-5 sm:p-6 bg-nord-card border border-nord-border/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-nord-accent shrink-0 mt-0.5" />
                <p className="text-sm text-nord-text/70 leading-relaxed">
                  {introText[locale] || introText.en}
                </p>
              </div>
            </div>
          </div>

          <ExpertBadge locale={locale} />

          {/* Day-by-day plan */}
          <div className="space-y-6 mb-16">
            {days.map((day) => (
              <div
                key={day.day}
                id={`day-${day.day}`}
                className="p-5 sm:p-6 bg-nord-card border border-nord-border/30 rounded-2xl scroll-mt-24"
              >
                {/* Day header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{day.emoji}</span>
                  <div>
                    <span className="text-xs text-nord-accent font-medium uppercase tracking-wider">
                      {locale === "zh" ? `第 ${day.day} 天` :
                       locale === "ms" ? `Hari ${day.day}` :
                       locale === "ja" ? `${day.day}日目` :
                       locale === "ko" ? `${day.day}일차` :
                       locale === "th" ? `วันที่ ${day.day}` :
                       locale === "es" ? `Día ${day.day}` : `Day ${day.day}`}
                    </span>
                    <h2 className="text-lg font-bold text-nord-text">{day.title}</h2>
                  </div>
                </div>

                {/* Science principle */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-nord-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5" />
                    {locale === "zh" ? "科学原理" :
                     locale === "ms" ? "Prinsip Sains" :
                     locale === "ja" ? "科学的原则" :
                     locale === "ko" ? "과학 원리" :
                     locale === "th" ? "หลักการทางวิทยาศาสตร์" :
                     locale === "es" ? "Principio Científico" : "Science Principle"}
                  </h3>
                  <p className="text-sm text-nord-text/70 leading-relaxed">{day.principle}</p>
                </div>

                {/* Action guide */}
                <div className="mb-4 p-4 bg-nord-accent/[0.06] border border-nord-accent/15 rounded-xl">
                  <h3 className="text-xs font-semibold text-nord-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {locale === "zh" ? "今日行动" :
                     locale === "ms" ? "Tindakan Hari Ini" :
                     locale === "ja" ? "今日のアクション" :
                     locale === "ko" ? "오늘의 행동" :
                     locale === "th" ? "การปฏิบัติวันนี้" :
                     locale === "es" ? "Acción de Hoy" : "Today's Action"}
                  </h3>
                  <p className="text-sm text-nord-text/80 leading-relaxed">{day.action}</p>
                </div>

                {/* Sensory anchor */}
                <div className="flex items-start gap-2.5">
                  <span className="text-dc-accent/60 text-sm leading-relaxed">🌱</span>
                  <p className="text-xs text-nord-text/50 leading-relaxed italic">{day.anchor}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing note */}
          <div className="p-6 bg-gradient-to-br from-nord-accent/[0.08] to-nord-card border border-nord-accent/15 rounded-2xl mb-12">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌟</span>
              <div>
                <p className="text-sm font-semibold text-nord-text mb-2">
                  {locale === "zh" ? "恭喜你完成了 7 天计划" :
                   locale === "ms" ? "Tahniah! Anda telah menyelesaikan program 7 hari" :
                   locale === "ja" ? "おめでとうございます。7日間のプログラムを完了しました" :
                   locale === "ko" ? "축하합니다! 7일 프로그램을 완료하셨습니다" :
                   locale === "th" ? "ยินดีด้วย! คุณทำโปรแกรม 7 วันสำเร็จแล้ว" :
                   locale === "es" ? "¡Felicidades! Has completado el programa de 7 días" :
                   "Congratulations! You've completed the 7-day program"}
                </p>
                <p className="text-sm text-nord-text/60 leading-relaxed">
                  {locale === "zh" ? "睡眠改善是一场马拉松，不是短跑。即使你的睡眠问题没有在 7 天内完全解决——这完全正常——你已经在正确的轨道上。CBT-I 的效果是累积的：坚持 4-8 周，70-80% 的慢性失眠患者会看到显著改善。DeepCalm 会一直在这里，陪你度过每一个难眠的夜晚。" :
                   locale === "ms" ? "Peningkatan tidur adalah marathon, bukan pecut. Walaupun masalah tidur anda tidak selesai sepenuhnya dalam 7 hari—itu normal—anda sudah berada di landasan yang betul. Kesan CBT-I adalah kumulatif: 70-80% pesakit insomnia kronik melihat peningkatan ketara selepas 4-8 minggu konsisten. DeepCalm akan sentiasa di sini, menemani setiap malam yang sukar." :
                   locale === "ja" ? "睡眠改善はマラソンであって、短距離走ではありません。7日間で睡眠の問題が完全に解決しなくても—それは全く正常です—あなたは正しい軌道に乗っています。CBT-Iの効果は累積的です：4〜8週間継続すると、慢性不眠症患者の70-80%に顕著な改善が見られます。DeepCalmはいつでもここにいます。眠れない夜を共に過ごすために。" :
                   locale === "ko" ? "수면 개선은 마라톤이지 단거리 질주가 아닙니다. 7일 안에 수면 문제가 완전히 해결되지 않더라도—그것은 완전히 정상입니다—여러분은 올바른 길 위에 있습니다. CBT-I의 효과는 누적됩니다: 4-8주 꾸준히 실천하면 만성 불면증 환자의 70-80%가 현저한 개선을 봅니다. DeepCalm은 언제나 여기 있습니다. 잠들기 힘든 모든 밤을 함께하기 위해." :
                   locale === "th" ? "การปรับปรุงการนอนคือมาราธอน ไม่ใช่ sprint ถึงแม้ปัญหาการนอนของคุณจะไม่หายไปหมดภายใน 7 วัน—นั่นเป็นเรื่องปกติ—คุณมาถูกทางแล้ว ผลของ CBT-I คือการสะสม: ผู้ป่วยนอนไม่หลับเรื้อรัง 70-80% เห็นการปรับปรุงที่ชัดเจนหลังจากปฏิบัติอย่างสม่ำเสมอ 4-8 สัปดาห์ DeepCalm จะอยู่ที่นี่เสมอ เพื่อ陪你度过ทุกคืนที่หลับยาก" :
                   locale === "es" ? "La mejora del sueño es un maratón, no un sprint. Incluso si tu problema de sueño no se resuelve completamente en 7 días—esto es completamente normal—ya estás en el camino correcto. Los efectos de la TCC-I son acumulativos: 70-80% de los pacientes con insomnio crónico ven una mejora significativa después de 4-8 semanas de práctica constante. DeepCalm estará siempre aquí, acompañándote en cada noche difícil." :
                   "Sleep improvement is a marathon, not a sprint. Even if your sleep issues aren't fully resolved in 7 days—this is completely normal—you're on the right track. The effects of CBT-I are cumulative: 70-80% of chronic insomnia patients see significant improvement after 4-8 weeks of consistent practice. DeepCalm will always be here, with you through every difficult night."}
                </p>
              </div>
            </div>
          </div>

          <AiEntrance locale={locale} />

          <BreadcrumbJsonLd
            items={[
              { name: "Library", url: `https://deepcalm-ai.com/${locale}/library` },
              { name: "CBT-I 7-Day Plan", url: `https://deepcalm-ai.com/${locale}/library/cbt-i-7day-plan` },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

/* ============================================================
   مولّد النصائح التوعوية — قاعدة المعرفة (DNA من 13 مرجعاً رسمياً)
   كل موضوع: عناوين + سطور داعمة + شعارات + وسوم + استعارات بصرية
   النبرات: warn (تحذيرية) · honor (تكريمية) · rebuild (إعمارية)
   ============================================================ */

window.AW_ENTITIES = [
  { ar: "محافظة دمشق",        en: "DAMASCUS GOVERNORATE",      handle: "@DamascusGov" },
  { ar: "محافظة ريف دمشق",    en: "RIF DIMASHQ GOVERNORATE",   handle: "@RifDimashqGov" },
  { ar: "محافظة حلب",         en: "ALEPPO GOVERNORATE",        handle: "@AleppoGov" },
  { ar: "محافظة حمص",         en: "HOMS GOVERNORATE",          handle: "@HomsGov" },
  { ar: "محافظة حماة",        en: "HAMA GOVERNORATE",          handle: "@HamaGov" },
  { ar: "محافظة اللاذقية",    en: "LATAKIA GOVERNORATE",       handle: "@LattakiaGov" },
  { ar: "محافظة طرطوس",       en: "TARTOUS GOVERNORATE",       handle: "@TartousGov" },
  { ar: "محافظة إدلب",        en: "IDLIB GOVERNORATE",         handle: "@IdlibGov" },
  { ar: "محافظة درعا",        en: "DARAA GOVERNORATE",         handle: "@DaraaGov" },
  { ar: "محافظة الرقة",       en: "RAQQA GOVERNORATE",         handle: "@raqqaagov" },
  { ar: "محافظة دير الزور",   en: "DEIR EZZOR GOVERNORATE",    handle: "@DeirEzzorGov" },
  { ar: "محافظة الحسكة",      en: "AL-HASAKAH GOVERNORATE",    handle: "@HasakahGov" },
  { ar: "محافظة السويداء",    en: "AS-SUWAYDA GOVERNORATE",    handle: "@SuwaydaGov" },
  { ar: "محافظة القنيطرة",    en: "QUNEITRA GOVERNORATE",      handle: "@QuneitraGov" },
  { ar: "مديرية إعلام حماة",  en: "HAMA MEDIA DIRECTORATE",    handle: "@HamaMD" },
  { ar: "مديرية إعلام الرقة", en: "RAQQA MEDIA DIRECTORATE",   handle: "@RaqqaMD" },
  { ar: "مجلس مدينة جبلة",    en: "JABLEH CITY COUNCIL",       handle: "@JablehCity" },
  { ar: "وزارة الصحة",        en: "MINISTRY OF HEALTH",        handle: "@SyrianMoH" }
];

window.AW_TONES = {
  warn:    { label: "تحذيرية", note: "نبرة صادمة تنبّه للخطر", dark: true  },
  honor:   { label: "تكريمية", note: "نبرة احترام وامتنان",   dark: false },
  rebuild: { label: "إعمارية", note: "نبرة تفاؤل وإحياء",     dark: true  }
};

/* لكل موضوع: نبرته الافتراضية + بنوك النصوص + الاستعارات (ar=وصف، en=concept للبرومبت) */
window.AW_TOPICS = [
  {
    id: "phone-driving", label: "الهاتف أثناء القيادة", emoji: "📱", tone: "warn",
    kw: ["هاتف","قيادة","سياقة","سواقة","موبايل","تلفون","سيارة","طريق","حادث"],
    heads: ["ثوانٍ على الهاتف قد تكلّفك الكثير","نظرةٌ واحدةٌ تكفي لتخسر كلَّ شيء","عينُك على الشاشة… حياتُك على المحك","رسالةٌ لا تساوي عمراً"],
    subs:  ["مصيرك بيدك، لا على شاشتك","الطريق لا يمنحك فرصةً ثانية","ارفع عينك… يكفي ربعُ ثانية لتنجو","أوقِف السيارة قبل أن ترد"],
    slogans:["مصيرك بيدك","عينُك تحمي عمرك","الطريق أمانة","لا تراهن بحياتك"],
    tags:  ["#قيادة_آمنة","#مصيرك_بيدك","#لا_للتشتت_أثناء_القيادة"],
    concepts:[
      { ar:"يدٌ على المقود ويدٌ تمسك هاتفاً، وشاشة الهاتف تتحوّل إلى رمالٍ متحركة تبتلع الإصبع", en:"a driver's hand on the steering wheel, the other holding a phone whose screen morphs into quicksand swallowing the finger, dark green car-interior light" },
      { ar:"مرآة السيارة تعكس الطريق، بينما الهاتف في اليد يعكس حادثاً مشتعلاً", en:"car side-mirror reflecting a calm road, while the phone screen in hand reflects a fiery crash, conceptual split reflection" },
      { ar:"عقارب ساعةٍ على شاشة الهاتف تتحوّل إلى حطام سيارة", en:"a clock on a phone screen whose hands bend into twisted car wreckage, single object metaphor on dark" }
    ]
  },
  {
    id: "drowning", label: "الغرق / السباحة في النهر", emoji: "🌊", tone: "warn",
    kw: ["غرق","نهر","سباحة","بحر","ماء","أطفال","بركة","سد","شاطئ"],
    heads: ["لحظةُ غفلةٍ قد تتحوّل إلى مأساة","النهرُ لا يُنذِر قبل أن يأخذ","متعةٌ تنتهي بفاجعة","قاعُ النهر لا يرحم"],
    subs:  ["راقب أطفالك قرب النهر","عينُك على طفلك أقوى من أيّ طوق نجاة","لا تترك صغيرك وحده عند الماء","ثوانٍ من الغفلة تكفي"],
    slogans:["عينُك طوقُ نجاته","راقب… تَسلَم","حياتهم في انتباهك","لا للسباحة في الأماكن غير الآمنة"],
    tags:  ["#احذر_الغرق","#راقب_أطفالك","#السلامة_قرب_الماء"],
    concepts:[
      { ar:"طفلان يجلسان على ضفة النهر يراقبان آخر يقفز في الماء عند الغروب", en:"two boys sitting on a riverbank watching another child leap into the water at golden sunset, warm documentary tone" },
      { ar:"يدُ طفلٍ صغيرة تختفي تحت سطح ماءٍ هادئ تاركةً دوائر متّسعة", en:"a small child's hand vanishing beneath a calm water surface leaving expanding ripples, minimal, ominous calm" },
      { ar:"حذاءٌ صغير متروكٌ وحيداً على صخرةٍ عند حافة النهر", en:"a small empty shoe left alone on a rock at the river's edge, soft melancholic light, lots of negative space" }
    ]
  },
  {
    id: "drugs", label: "المخدرات / الكبتاغون", emoji: "💊", tone: "warn",
    kw: ["مخدرات","كبتاغون","حبوب","إدمان","سجن","ظلام","تعاطي"],
    heads: ["عندما تنعكس حياتك إلى ظلام","وسجنٌ بلا حرية","جرعةٌ تسرق عمرك كلَّه","الطريق إلى القاع يبدأ بحبّة"],
    subs:  ["وعيُك حصنُك الأول","لا تراهن بمستقبلك على لحظة","الحرية أغلى من نشوةٍ زائلة","انتبه قبل أن تسقط"],
    slogans:["#اليوم_العالمي_لمكافحة_المخدرات","وعيُك حريتُك","لا للقاع","حياتك أغلى"],
    tags:  ["#اليوم_العالمي_لمكافحة_المخدرات","#لا_للمخدرات","#وعيك_حريتك"],
    concepts:[
      { ar:"قنينةٌ زجاجية مملوءة بحبوبٍ بيضاء، ظلّها على الأرض يرسم سجيناً خلف القضبان", en:"a glass vial full of white pills on cream surface, its cast shadow forming a prisoner behind bars, clean studio key light" },
      { ar:"حبةٌ بيضاء واحدة تتحوّل نصفها إلى قفلٍ مغلق", en:"a single white pill, one half morphing into a closed padlock, macro, minimal cream background" },
      { ar:"يدٌ ممدودةٌ تتلقّى حبّة، وظلّ اليد على الجدار يدٌ مكبّلة بالأصفاد", en:"an open hand receiving a pill, its wall-shadow showing a hand bound in handcuffs, conceptual shadow play" }
    ]
  },
  {
    id: "smoking", label: "التدخين", emoji: "🚬", tone: "warn",
    kw: ["تدخين","سيجارة","دخان","تبغ","نرجيلة","أركيلة","رئة"],
    heads: ["كلُّ نفَسٍ يقترب من النهاية","سيجارةٌ تشتعل… وعمرٌ يحترق","لا تراهن بأنفاسك","الدخان يسرقك ببطء"],
    subs:  ["قرارُ الإقلاع يبدأ من وعيك","رئتاك تستحقّان هواءً نظيفاً","كلُّ يومٍ بلا دخان مكسبٌ لك ولِمن تحب","ابدأ اليوم"],
    slogans:["نفَسُك حياتك","أقلِع… تنجُ","صحتك قرارك","دخّن أملاً لا دخاناً"],
    tags:  ["#الإقلاع_عن_التدخين","#نفسك_حياتك","#حياة_بلا_دخان"],
    concepts:[
      { ar:"سيجارةٌ مشتعلة تتحوّل إلى إصبعٍ يحترق مع زرّ Ctrl+Z معلّق بجانبه", en:"a burning cigarette morphing into a burning finger, a floating Ctrl+Z key beside it, conceptual minimal" },
      { ar:"شجرةُ رئةٍ خضراء يتحوّل نصفها إلى رمادٍ متطاير", en:"a green lung shaped like a tree, one half crumbling into drifting ash, cream background, single metaphor" },
      { ar:"شمعة عمرٍ على هيئة سيجارة، شعلتها تذوب بسرعة", en:"a life-candle shaped like a cigarette, its flame melting fast, soft documentary light" }
    ]
  },
  {
    id: "sanitation", label: "احترام عمال النظافة", emoji: "🧹", tone: "honor",
    kw: ["نظافة","عمال","كناس","احترام","كرامة","عامل"],
    heads: ["حَنَوْا ظهورهم لأجلنا","أيدٍ تنظّف… تستحقّ أن تُكرَّم","خلف نظافة المدينة وجوهٌ تتعب","كرامتُهم مسؤوليتُنا"],
    subs:  ["فلتنحنِ أخلاقنا احتراماً لهم","كرامته تبدأ من وعيك","لا ترمِ ما يجمعه بكدّه","ابتسامةٌ وشكرٌ لا يكلّفانك شيئاً"],
    slogans:["كرامته تبدأ من وعيك","احترمهم… ترقَ بهم","نظافةٌ بكرامة","شكراً لمن يخدمنا"],
    tags:  ["#كرامته_تبدأ_من_وعيك","#احترم_عامل_النظافة","#شكراً_لجنود_النظافة"],
    concepts:[
      { ar:"عاملُ نظافةٍ مسنٌّ بكمامةٍ وسترةٍ عاكسة يمدّ يده، عيناه متعبتان كريمتان", en:"an elderly sanitation worker in a reflective vest and mask reaching out, tired dignified eyes, soft respectful light on cream" },
      { ar:"يدان متشقّقتان تمسكان مكنسةً، وخلفهما المدينة نظيفةٌ مشرقة", en:"two weathered hands gripping a broom, a clean bright city behind them, warm honoring tone" },
      { ar:"ظلُّ عامل نظافةٍ ينحني، يتحوّل ظلّه إلى تاجٍ من ضوء", en:"the bending shadow of a cleaner transforming into a crown of light, conceptual dignity" }
    ]
  },
  {
    id: "parks", label: "الحدائق والمساحات العامة", emoji: "🌳", tone: "rebuild",
    kw: ["حديقة","حدائق","تأهيل","إعمار","مساحات","عامة","إحياء","مقعد"],
    heads: ["ماذا لو عادت الحياة لهذا المكان؟","حدائقُنا تستعيد أنفاسها","من الركام… تولد الخُضرة","المكانُ ينتظر عودتنا"],
    subs:  ["مرحلةٌ جديدة من التأهيل والإحياء","معاً نُعيد للمدينة رئتها الخضراء","حافظ عليها… فهي مِلكُك","غدٌ أجمل يبدأ بزرعة"],
    slogans:["نحو سوريا أجمل","نُعيد الحياة","أرضُنا أمانة","معاً نُعمّر"],
    tags:  ["#نعيد_الحياة","#سوريا_تُزهر","#تأهيل_الحدائق"],
    concepts:[
      { ar:"مقعدُ حديقةٍ مقلوبٌ وصدئ، وفي الخلفية تذكارُ حديقةٍ كانت نابضة", en:"an overturned rusty park bench foreground, a once-vibrant park ghosting behind in green duotone, melancholic-hopeful" },
      { ar:"نصفُ الصورة ركامٌ رمادي ونصفها حديقةٌ خضراء مزهرة، خطّ التحوّل في المنتصف", en:"split image: grey rubble on one half, lush green blooming park on the other, transition line down the center" },
      { ar:"برعمٌ أخضر يشقّ الإسفلت المتشقّق نحو الضوء", en:"a single green sprout breaking through cracked asphalt toward the light, hopeful macro" }
    ]
  },
  {
    id: "seatbelt", label: "حزام الأمان", emoji: "🚗", tone: "warn",
    kw: ["حزام","أمان","مقعد","قيادة","سلامة مرورية"],
    heads: ["حزامٌ يفصل بين النجاة والندم","ثوانٍ لتربطه… عمرٌ لتحفظه","لا تبدأ قبل أن تربطه","قبضةٌ تحميك من المجهول"],
    subs:  ["اربط الحزام… مهما قصُرت المسافة","حياتُك لا تحتمل الاستثناء","الحزام عادةٌ تنقذ","علّمه لأطفالك"],
    slogans:["اربط… تَسلَم","الحزام أولاً","ثوانٍ تنقذ عمراً","سلامتُك قرارك"],
    tags:  ["#اربط_الحزام","#السلامة_المرورية","#الحزام_أولاً"],
    concepts:[
      { ar:"حزام أمانٍ ممدودٌ يتحوّل نسيجُه إلى يدٍ تحتضن صدر سائق", en:"a stretched seatbelt whose webbing turns into a hand embracing a driver's chest, conceptual protection, dark interior" },
      { ar:"إبزيمُ الحزام على شكل قلبٍ يُغلق", en:"a seatbelt buckle shaped like a closing heart-lock, macro on dark" }
    ]
  },
  {
    id: "speeding", label: "السرعة الزائدة", emoji: "⏱️", tone: "warn",
    kw: ["سرعة","سرعه","تهور","مرور","عداد","طريق سريع"],
    heads: ["السرعةُ تختصر الطريق… وتختصر العمر","كلّما زادت سرعتك، قصُرت فرصتك","عدّادٌ يرتفع… وأملٌ ينخفض","تأخيرُ دقيقةٍ خيرٌ من غيابٍ أبدي"],
    subs:  ["خفّف… ينتظرك من تحب","الوصولُ سالماً أهمُّ من الوصول أولاً","الطريق ليس حلبة سباق","رويدك على الطريق"],
    slogans:["خفّف تصل","العجلةُ ندم","الوصولُ سالماً غاية","لا للتهور"],
    tags:  ["#خفف_السرعة","#قيادة_آمنة","#السلامة_المرورية"],
    concepts:[
      { ar:"عدّاد سرعةٍ تتحوّل أرقامه العالية إلى شواهد قبور", en:"a speedometer whose high numbers morph into tombstones, dark conceptual, single object" },
      { ar:"طريقٌ سريع يتحوّل في نهايته إلى ساعةٍ رمليةٍ شارفت على النفاد", en:"a highway whose vanishing point becomes a near-empty hourglass, moody dusk" }
    ]
  },
  {
    id: "water", label: "ترشيد المياه", emoji: "💧", tone: "rebuild",
    kw: ["مياه","ماء","ترشيد","توفير","جفاف","صنبور","حنفية"],
    heads: ["كلُّ قطرةٍ تحفظها… حياةٌ تستمر","الماءُ لا يُعوَّض حين يجفّ","نقطةٌ تُهدر… ونهرٌ يموت","غدُهم في قطرةٍ توفّرها اليوم"],
    subs:  ["أغلِق الصنبور حين لا تحتاجه","ترشيدُ الماء مسؤوليةُ الجميع","علّم أطفالك قيمة كلّ قطرة","الوفرةُ تبدأ بالوعي"],
    slogans:["كلُّ قطرةٍ تهمّ","الماءُ حياة","رشِّد… يدُم","قطرةٌ بقطرة"],
    tags:  ["#رشّد_المياه","#كل_قطرة_تهم","#الماء_حياة"],
    concepts:[
      { ar:"صنبورٌ تتساقط منه قطرةٌ أخيرة تتحوّل إلى كرةٍ أرضيةٍ متشقّقة", en:"a faucet dripping one last drop that becomes a cracked dry planet, minimal cream, single metaphor" },
      { ar:"كفٌّ تجمع ماءً يتسرّب بين الأصابع وينبت من القطرة الباقية نبتة", en:"cupped hands holding water slipping through fingers, a sprout growing from the last drop, hopeful" }
    ]
  },
  {
    id: "electricity", label: "ترشيد الكهرباء", emoji: "💡", tone: "rebuild",
    kw: ["كهرباء","طاقة","ترشيد","استهلاك","لمبة","إنارة"],
    heads: ["وعيُك بالاستهلاك… نورٌ يدوم","كلُّ واطٍ توفّره يضيء بيتاً آخر","الطاقةُ نعمةٌ لا تُبدَّد","نورٌ نتقاسمه بوعي"],
    subs:  ["أطفئ ما لا تحتاجه","الترشيدُ يعني نوراً لكلّ البيوت","عادةٌ صغيرة… أثرٌ كبير","معاً نُضيء سوريا"],
    slogans:["رشِّد… يَدُم النور","نورٌ نتقاسمه","الطاقةُ أمانة","أطفئ ما لا يلزم"],
    tags:  ["#رشّد_الكهرباء","#نور_نتقاسمه","#ترشيد_الطاقة"],
    concepts:[
      { ar:"مصباحٌ مضيءٌ نصفه مدينةٌ نائمة في العتمة ونصفه بيوتٌ دافئة بالنور", en:"a glowing bulb: one half a city in darkness, the other warm lit homes, split conceptual on dark" },
      { ar:"سلسلةُ مصابيح متّصلة كأيدٍ متشابكة تضيء بالتتابع", en:"a chain of bulbs linked like joined hands lighting up in sequence, warm unity" }
    ]
  },
  {
    id: "fire", label: "السلامة من الحرائق", emoji: "🔥", tone: "warn",
    kw: ["حريق","نار","حرائق","سلامة","إطفاء","اشتعال","غابة"],
    heads: ["شرارةٌ واحدة تكفي للدمار","لحظةُ إهمالٍ… رمادُ سنين","النارُ لا تفرّق","انتبه قبل أن تشتعل"],
    subs:  ["تفقّد الغاز والكهرباء قبل خروجك","لا تترك ناراً دون رقيب","المطفأةُ تبدأ من وعيك","الوقايةُ أرخص من الندم"],
    slogans:["وعيُك يطفئ الخطر","لا تترك شرارة","السلامةُ أولاً","انتبه… تَسلَم"],
    tags:  ["#السلامة_من_الحرائق","#لا_للإهمال","#وقاية_أولاً"],
    concepts:[
      { ar:"عودُ ثقابٍ مشتعل ينعكس ظلّه على الجدار غابةً تحترق", en:"a lit matchstick whose wall-shadow is a burning forest, conceptual shadow, dark" },
      { ar:"مقبسٌ كهربائي محمّلٌ بأسلاكٍ متشابكة على وشك الاشتعال", en:"an overloaded electrical socket tangled with wires sparking, macro warning, moody" }
    ]
  },
  {
    id: "litter", label: "النظافة العامة", emoji: "🗑️", tone: "honor",
    kw: ["قمامة","نظافة","رمي","نفايات","تلوث","شارع","بيئة"],
    heads: ["نظافةُ مدينتك… مرآةُ أخلاقك","ما ترميه اليوم يلاحق غدك","المدينةُ بيتُنا الكبير","يدٌ نظيفة تصنع وطناً نظيفاً"],
    subs:  ["ضعها في مكانها الصحيح","لا ترمِ ما يجمعه غيرك بكدّه","سلّةٌ أقرب من الأرض","الجمالُ يبدأ منك"],
    slogans:["مدينتُك أمانتك","النظافةُ من الإيمان","ضعها في مكانها","وطنٌ نظيف"],
    tags:  ["#نظّف_مدينتك","#لا_للتلوث","#النظافة_مسؤولية"],
    concepts:[
      { ar:"كيسُ قمامةٍ مرميٌّ في شارعٍ جميل، يتحوّل ظلّه إلى يدٍ تلوّث المدينة", en:"a tossed garbage bag on a beautiful street, its shadow a hand staining the city, conceptual" },
      { ar:"يدٌ تضع نفايةً في سلّةٍ فتتفتّح المدينة خلفها زهوراً", en:"a hand placing litter into a bin while the city behind blooms into flowers, hopeful split" }
    ]
  },
  {
    id: "bullying", label: "مكافحة التنمر", emoji: "🛡️", tone: "honor",
    kw: ["تنمر","تنمّر","أطفال","مدرسة","عنف","سخرية"],
    heads: ["كلمةٌ تجرح أعمق من جرح","التنمّرُ ليس مزاحاً","خلف صمتِه ألمٌ لا تراه","لطفُك قد ينقذ حياة"],
    subs:  ["علّم طفلك أن يكون سنداً لا خصماً","الاختلافُ جمالٌ لا عيب","كن صوتاً ضدّ التنمّر","ابدأ باللطف"],
    slogans:["لطفُك قوة","قف ضدّ التنمّر","كلمتُك تبني","معاً ضدّ الأذى"],
    tags:  ["#لا_للتنمر","#لطفك_قوة","#معاً_ضد_التنمر"],
    concepts:[
      { ar:"طفلٌ يجلس وحيداً في زاوية، يمتدّ من الإطار ظلُّ يدٍ كبيرةٍ تحتضنه", en:"a child sitting alone in a corner, a large gentle hand-shadow reaching to embrace, soft empathetic light" },
      { ar:"ورقةٌ مكتوبٌ عليها كلماتٌ جارحة تتحوّل حوافها إلى شظايا زجاج", en:"a paper with hurtful words whose edges turn into glass shards, conceptual minimal" }
    ]
  },
  {
    id: "heritage", label: "الحفاظ على الآثار", emoji: "🏛️", tone: "rebuild",
    kw: ["آثار","تراث","حضارة","قلعة","تاريخ","معالم","إرث"],
    heads: ["حجارتُنا تروي من نكون","تراثٌ نحرسه… أو ذاكرةٌ نخسرها","سوريا متحفُ الإنسانية","الماضي أمانةٌ في يدك"],
    subs:  ["لا تعبث بما صنعه الأجداد","كلُّ حجرٍ يحكي قصة وطن","نحمي إرثنا للأجيال","الحضارةُ هويتُنا"],
    slogans:["تراثُنا هويتُنا","احفظ الذاكرة","سوريا حضارة","إرثٌ لا يُقدَّر"],
    tags:  ["#احفظ_تراثك","#سوريا_حضارة","#تراثنا_هويتنا"],
    concepts:[
      { ar:"عمودٌ أثريٌّ قديم نصفه مرمّمٌ مضيءٌ ونصفه متآكل، يدٌ تلمسه بحنان", en:"an ancient column, one half restored and glowing, the other eroded, a gentle hand touching it, warm heritage light" },
      { ar:"قلعةٌ سورية شامخة ينبثق ضوؤها من شقوق الحجر القديم", en:"a proud Syrian citadel with light emanating from cracks in old stone, golden hour, dignified" }
    ]
  },
  {
    id: "blood", label: "التبرع بالدم", emoji: "🩸", tone: "honor",
    kw: ["تبرع","دم","تبرّع","حياة","مريض","مستشفى"],
    heads: ["قطرةٌ منك… حياةٌ لغيرك","بين يديك أن تمنح عمراً","تبرّعُك جسرٌ بين قلبين","أنت بطلٌ لا يعرفه أحد"],
    subs:  ["وحدةُ دمٍ تنقذ ثلاث أرواح","لا تنتظر الحاجة لتعطي","العطاءُ لا يكلّفك سوى دقائق","كن سبباً في نجاة"],
    slogans:["تبرّع… تمنح حياة","دمُك حياة","العطاءُ بطولة","قطرةٌ تُحيي"],
    tags:  ["#تبرع_بالدم","#دمك_حياة","#كن_بطلاً"],
    concepts:[
      { ar:"قطرةُ دمٍ تتحوّل في داخلها إلى قلبٍ ينبض لشخصٍ آخر", en:"a blood drop containing a beating heart for another person, warm conceptual minimal" },
      { ar:"كيسُ دمٍ معلّق يمدّ أنبوبه كحبلِ نجاةٍ إلى يدٍ ضعيفة", en:"a hanging blood bag whose tube extends like a lifeline to a weak reaching hand, hopeful clinical warmth" }
    ]
  }
];

/* ===== مؤلّف عام لأي موضوع حرّ غير مفهرس ===== */
window.AW_GENERIC = {
  heads: t => [
    `لحظةُ وعيٍ تجاه ${t} تصنع الفرق`,
    `${t}… مسؤوليةٌ تبدأ منك`,
    `لا تستهِن بأثر ${t}`,
    `${t} قرارٌ بين يديك`
  ],
  subs: t => [
    `وعيُك تجاه ${t} يحمي من حولك`,
    `خطوةٌ صغيرة اليوم… أثرٌ كبير غداً`,
    `ابدأ التغيير من نفسك`,
    `معاً نحو وعيٍ أكبر بـ${t}`
  ],
  slogans: ["وعيُك حمايتُك","مصيرك بيدك","ابدأ من نفسك","معاً نرتقي"],
  tags: t => [`#${String(t).trim().replace(/\s+/g,"_")}`, "#وعيك_حمايتك", "#سوريا_الجديدة"],
  concepts: t => [
    { ar:`استعارةٌ بصريةٌ مفردة تجسّد فكرة «${t}»: كائنٌ واحد + ظلٌّ دلالي + فراغٌ سلبي`, en:`a single visual metaphor expressing "${t}": one object, one meaningful cast shadow, intentional negative space, conceptual minimal` }
  ]
};

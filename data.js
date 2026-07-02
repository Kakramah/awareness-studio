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

/* ============================================================
   محرّك الإبداع v2 — أساليب بلاغية + أفكار متماسكة + وصفات بصرية
   الفكرة وحدة واحدة: عنوان + سطر + شعار + استعارة من روح واحدة
   ============================================================ */

window.AW_DEVICES = [
  { id:"question", label:"سؤال صادم",   hint:"سؤال يوقف القارئ ويجبره على الإجابة" },
  { id:"paradox",  label:"مفارقة",      hint:"تضاد يكشف الحقيقة (تشعلها فتطفئك)" },
  { id:"persona",  label:"الجماد يتكلم", hint:"النهر/الطريق/الحبّة تخاطبك بنفسها" },
  { id:"whatif",   label:"ماذا لو",      hint:"سيناريو افتراضي يفتح الخيال" },
  { id:"dialog",   label:"حوار مقتضب",   hint:"سطران من حوار يرويان قصة كاملة" },
  { id:"fact",     label:"حقيقة/رقم",    hint:"معلومة موجزة تصفع بالواقع" },
  { id:"call",     label:"نداء مباشر",   hint:"يا من… خطاب شخصي يمسّ القارئ" },
  { id:"twist",    label:"قلب المألوف",  hint:"نهاية غير متوقعة تقلب الصورة" }
];

/* لكل موضوع ٦ أفكار متماسكة بأساليب مختلفة */
window.AW_IDEAS = {
  "phone-driving": [
    { dev:"dialog",  head:"— وصلتَ يا بابا؟", sub:"رسالةٌ لم تُقرأ… وطريقٌ لم يكتمل", slogan:"أوقِف السيارة ثم أجب",
      concept:{ ar:"فقاعة رسالةٍ متوهجة معلّقة فوق زجاجٍ أماميٍّ مهشّم عند الغسق", en:"a glowing unread chat bubble hovering above a shattered windshield at dusk, single beam of light, cinematic minimal, no people" } },
    { dev:"fact",    head:"ثلاثُ ثوانٍ = ملعبٌ أعمى", sub:"بسرعة ١٠٠ كم/سا تقطع ٨٣ متراً وأنت لا ترى", slogan:"ارفع عينك",
      concept:{ ar:"طريقٌ ليليٌّ يتلاشى نصفه البعيد في سوادٍ تام كأنّ أحداً أطفأه", en:"a night highway whose far half dissolves into pure black as if switched off, headlights stopping mid-road, ominous cinematic" } },
    { dev:"persona", head:"أنا الطريق… لا أقرأ الرسائل", sub:"كلُّ التفاتةٍ عنّي أقتطعها من عمرك", slogan:"عينُك عليّ",
      concept:{ ar:"خطوط الطريق البيضاء تتحوّل فقاعاتِ محادثةٍ فارغة تمتد نحو الأفق", en:"white road lane-markings morphing into empty speech bubbles receding to the horizon, dawn light, surreal minimal" } },
    { dev:"paradox", head:"أسرعُ ردٍّ… أبطأُ وصول", sub:"الرسالة تصل بثانية، وأنت قد لا تصل", slogan:"الوصول أولاً",
      concept:{ ar:"هاتفٌ يعرض علامة إرسالٍ ناجح بينما تنعكس على شاشته أضواء إسعاف", en:"a phone showing a sent-message checkmark while ambulance lights reflect across its dark screen, shallow depth, night" } },
    { dev:"whatif",  head:"ماذا لو رنّ ولم تُجب؟", sub:"لا شيء… ستصل، وتُجيب من البيت", slogan:"يستحق الانتظار",
      concept:{ ar:"هاتفٌ يرنّ على المقعد المجاور، وضوء بيتٍ دافئ يلوح آخر الطريق", en:"a ringing phone lying on the passenger seat, a warm lit home glowing at the end of the road ahead, hopeful dusk" } },
    { dev:"twist",   head:"رسالته الأخيرة لم يكتبها هو", sub:"كتبها محضرُ الحادث", slogan:"لا تكتب وأنت تقود",
      concept:{ ar:"سطورُ محضرٍ رسميّ تلتفّ آخرَ الصفحة على هيئة فقاعة رسالة", en:"close-up of an official report page whose final lines curl into the shape of a chat bubble, cold documentary light, no readable text" } }
  ],
  "drowning": [
    { dev:"persona", head:"أنا النهر… لا أعرف المزاح", sub:"أُلاعبكم صيفاً، وأخطف في لحظة غفلة", slogan:"راقب أطفالك",
      concept:{ ar:"سطحُ نهرٍ هادئ يرسم انعكاسُه ظلاً غامضاً بلا ملامح", en:"a calm river surface whose reflection subtly forms a faceless silhouette, golden hour, eerie stillness" } },
    { dev:"fact",    head:"الغرق يحدث بصمت", sub:"لا صراخَ كما في الأفلام… ثوانٍ وينتهي كل شيء", slogan:"عينُك طوق نجاة",
      concept:{ ar:"ساعةُ يدٍ صغيرة مبتلّة توقّفت عقاربها، ملقاةٌ على حصى الضفة", en:"a small wet child's wristwatch stopped, lying on river pebbles, soft mournful light, macro" } },
    { dev:"dialog",  head:"— أين وليد؟ … كان هنا قبل قليل", sub:"«قبل قليل»: أطولُ جملةٍ في حياة أمّ", slogan:"لا تغفل عنهم",
      concept:{ ar:"كرةُ شاطئٍ ملوّنة تطفو وحيدةً وسط نهرٍ عريض لا أحد حوله", en:"a colorful beach ball floating alone in the middle of a wide river, no one around, late afternoon, vast empty water" } },
    { dev:"whatif",  head:"ماذا لو تأخّرتْ نظرتُك؟", sub:"النهرُ لا يمهل أحداً", slogan:"راقب… تسلَم",
      concept:{ ar:"نظّاراتُ سباحةٍ صغيرة معلّقة على غصنٍ فوق ماءٍ داكنٍ يجري", en:"kids' swim goggles hanging on a bare branch above fast dark water, shallow focus, held breath" } },
    { dev:"paradox", head:"ماءٌ يُحيي… وماءٌ يُنهي", sub:"النهرُ نفسه: متعةٌ برقابة، فاجعةٌ بغفلة", slogan:"السلامة قرارك",
      concept:{ ar:"كادرٌ منقسم لنهرٍ واحد: ضفةٌ مشمسةٌ صاخبة وضفةٌ معتمةٌ صامتة", en:"split-frame of the same river: one bank sunlit and lively, the other dark and silent, razor-straight center line" } },
    { dev:"call",    head:"يا من تصحب صغارك للنهر", sub:"عينُك عليهم أثمن من كل طوق نجاة", slogan:"لحظةُ انتباهٍ = عمر",
      concept:{ ar:"يدُ أبٍ كبيرة تُمسك معصمَ طفلٍ مبتلّ والنهر خلفهما ضبابيّ", en:"a father's large hand gripping a child's wet wrist, river blurred behind, warm protective light" } }
  ],
  "drugs": [
    { dev:"persona", head:"أنا الحبّة… أَعِدُ ولا أفي", sub:"أبيعك جنّةَ دقيقةٍ، وأسجنك عمراً", slogan:"لا تفتح الباب",
      concept:{ ar:"حبّةٌ بيضاء على طاولة يمتد ظلُّها ممرَّ سجنٍ طويلاً", en:"a single white pill on a table casting an impossibly long shadow shaped like a prison corridor, hard side light" } },
    { dev:"paradox", head:"حرّيةٌ تُبلَع… قيدٌ يبقى", sub:"أقصر طريقٍ إلى القاع يبدأ بحبّة", slogan:"وعيُك حريتك",
      concept:{ ar:"مفتاحٌ يذوب ويتحوّل قرصاً أبيض داخل كفٍّ مفتوحة", en:"a key melting into a white pill inside an open palm, macro, cream background, quiet dread" } },
    { dev:"whatif",  head:"ماذا لو قلتَها: لا؟", sub:"تخسر لحظةَ مجاملة… وتربح عمرك كله", slogan:"قوّتك في رفضك",
      concept:{ ar:"بابُ زنزانةٍ مفتوح يتسرّب منه ضوء فجرٍ ذهبي", en:"a prison cell door half-open with dawn light pouring through, hopeful, symbolic escape" } },
    { dev:"dialog",  head:"— جرّب مرة… — صارت المرةُ عشراً", sub:"لا أحد خطّط يوماً أن يُدمن", slogan:"المرة الأولى فخ",
      concept:{ ar:"أحجارُ دومينو بيضاء كالحبوب تتساقط في خطٍّ نحو قضبان", en:"white domino pieces shaped like pills toppling in a line toward prison bars, dramatic low angle" } },
    { dev:"twist",   head:"يبدأ ضيفاً… وينتهي سجّاناً", sub:"الإدمان لا يستأذن أحداً", slogan:"أغلق الباب اليوم",
      concept:{ ar:"كرسيُّ ضيافةٍ وثير تنحني أرجلُه وترتفع قضباناً حول الجالس", en:"a welcoming armchair whose legs bend upward into cage bars around the seat, surreal minimal, muted palette" } },
    { dev:"call",    head:"يا من تحمل همَّ ولدك", sub:"صارِحه قبل أن يصارحه الشارع", slogan:"الحوار وقاية",
      concept:{ ar:"كفّا أبٍ وابنه فوق طاولة، بينهما ظلُّ زجاجة حبوبٍ يتلاشى", en:"a father's and son's hands on a table, the fading shadow of a pill bottle between them, warm reconciliation light" } }
  ],
  "smoking": [
    { dev:"paradox", head:"تُشعلها… فتُطفئك", sub:"كلُّ سيجارةٍ تدخّنها تُدخّنك", slogan:"أطفئها الآن",
      concept:{ ar:"سيجارةٌ منتصبة كشمعة عيد ميلادٍ فوق كعكةٍ من رماد", en:"a cigarette standing like a birthday candle on a cake made entirely of gray ash, dark humor minimal" } },
    { dev:"fact",    head:"سبعُ دقائق تحترق", sub:"كلُّ سيجارةٍ تسرق دقائقَ من عمرك", slogan:"استعد وقتك",
      concept:{ ar:"ساعةٌ رملية رمالُها المتساقطة رمادُ سجائر", en:"an hourglass whose falling sand is cigarette ash, macro, moody studio light" } },
    { dev:"persona", head:"أنا رئتك… أختنق بصمت", sub:"أنظّف ما تُفسده كلَّ ليلة… إلى متى؟", slogan:"ارحمني",
      concept:{ ar:"شجرتان على هيئة رئتين: واحدةٌ مورقة وأخرى متفحّمة تدخّن", en:"two lung-shaped trees, one lush green, one charred and smoldering, split composition, still air" } },
    { dev:"whatif",  head:"ماذا لو كانت الأخيرة؟", sub:"قرارٌ واحد يُعيد لك أنفاسك", slogan:"ابدأ اليوم",
      concept:{ ar:"عقبُ سيجارةٍ مُطفأ مغروسٌ في تربة تنبت منه ورقةٌ خضراء", en:"a stubbed-out cigarette butt planted in dark soil with a fresh green sprout growing from it, hopeful macro" } },
    { dev:"dialog",  head:"— متى تُقلع؟ … غداً", sub:"يقولها منذ عشر سنين… اجعل غدك اليوم", slogan:"اليوم لا غداً",
      concept:{ ar:"تقويمُ مكتبٍ تتصاعد من أوراقه خيوطُ دخانٍ إلا ورقةَ اليوم، فوقها عودُ ثقابٍ منطفئ", en:"a desk calendar with smoke wisps rising from every page except today's, where a spent match rests, no readable text" } },
    { dev:"call",    head:"يا من تدخّن قرب طفلك", sub:"هو يُدخّن معك… رغماً عنه", slogan:"هواؤه أمانة",
      concept:{ ar:"دخانُ سيجارةٍ يتشكّل قطارَ لعبةٍ يزحف نحو سرير طفل", en:"cigarette smoke forming the shape of a toy train drifting toward a child's crib, soft nursery light, unsettling calm" } }
  ],
  "sanitation": [
    { dev:"call",    head:"سلِّم عليه اليوم", sub:"كلمةُ شكرٍ تغسل تعبَ نهاره كله", slogan:"كرامتُه من وعيك",
      concept:{ ar:"يدٌ تمدّ كوبَ شايٍ ساخن ليدٍ بقفّاز عملٍ متّسخ", en:"a hand offering a steaming tea glass to a worker's soiled work glove, golden morning light, human warmth" } },
    { dev:"paradox", head:"ينظّف المدينة… ونلوّث تعبه", sub:"أنظفُ الأيدي هي التي تحمل المكنسة", slogan:"احترامه واجب",
      concept:{ ar:"مكنسةٌ مهترئة متكئةٌ على جدار، يرتفع ظلُّها صولجاناً ملكياً", en:"a worn broom leaning on a wall, its shadow rising as a royal scepter, dignified side light" } },
    { dev:"persona", head:"أنا من يوقظ الشوارع", sub:"أمرُّ قبل الفجر كي تصحو مدينتُك جميلة", slogan:"شكراً لجنود الفجر",
      concept:{ ar:"شارعٌ فجريّ يلمع بلاطُه، وعربةُ نظافةٍ تبتعد في الضباب", en:"a spotless dawn street glistening, a cleaning cart silhouetted walking away into mist, cinematic reverence" } },
    { dev:"whatif",  head:"ماذا لو غابوا يوماً واحداً؟", sub:"أربعٌ وعشرون ساعة بلا أياديهم… وتختنق المدينة", slogan:"قدّرهم",
      concept:{ ar:"كادرٌ منقسم للشارع نفسه: مشرقٌ نظيف، وغارقٌ بالأكياس", en:"split-frame of the same street: pristine and bright versus buried in garbage bags, harsh honest contrast" } },
    { dev:"dialog",  head:"— لماذا يعمل ليلاً يا أمي؟", sub:"— كي تصحو مدينتُنا نظيفةً يا حبيبتي", slogan:"قصتهم تستحق",
      concept:{ ar:"ظلُّ عاملٍ تحت إنارة شارعٍ ليلية يرتسم على الجدار بطلاً بعباءة", en:"a night street-lamp casting a sanitation worker's shadow as a caped hero on the wall, tender cinematic" } },
    { dev:"fact",    head:"قبل أذان الفجر يبدأون", sub:"آلافُ الكيلومترات تُكنس كلَّ ليلةٍ بصمت", slogan:"جهدُهم يُرى",
      concept:{ ar:"خطوطُ مكنسةٍ على رصيفٍ مبلّل تشبه دوّامات مجرّة", en:"broom sweep-lines on a wet pavement resembling galaxy swirls, overhead shot, dawn blue hour" } }
  ],
  "parks": [
    { dev:"whatif",  head:"ماذا لو ضحكت الحديقة من جديد؟", sub:"مقعدٌ يُصلَح… طفلٌ يعود", slogan:"نعيد الحياة",
      concept:{ ar:"أرجوحةٌ صدئة يتقوّس مكانَ جلوسها شريطُ ضوءٍ ذهبي كأن طفلاً يتأرجح", en:"a rusty swing with a ribbon of golden light arcing where a child would sit, magical realism, dusk" } },
    { dev:"persona", head:"أنا الحديقة… أشتاق للضجيج", sub:"صمتي ليس راحةً… صمتي انتظار", slogan:"أعيدوني",
      concept:{ ar:"مقعدُ حديقةٍ متشقق تنمو من شقوقه زهورٌ برية", en:"a lone cracked park bench with wildflowers growing through its slats, morning haze, bittersweet hope" } },
    { dev:"paradox", head:"رماديةٌ بالإهمال… خضراءُ بالقرار", sub:"بين الخراب والجمال التفاتةٌ منا", slogan:"معاً نُعمّر",
      concept:{ ar:"نصفُ الكادر حديقةٌ يابسة رمادية ونصفه عشبٌ مورق، بينهما خطٌّ مستقيم", en:"half-frame dead gray park, half lush green lawn, razor-straight dividing line, conceptual overhead" } },
    { dev:"call",    head:"يا جارَ الحديقة", sub:"غرسةٌ منك تُظلّل حيّاً كاملاً", slogan:"ازرع أثرك",
      concept:{ ar:"يدٌ تغرس شتلةً صغيرة وظلُّها على الأرض شجرةٌ وارفة", en:"a hand planting a tiny seedling whose ground shadow is a huge mature tree, warm afternoon light" } },
    { dev:"dialog",  head:"— أين نلعب؟ … هنا كان ملعب", sub:"الأطفال لا ينسون أماكن الفرح", slogan:"أعيدوا لهم الملعب",
      concept:{ ar:"كرةُ قدمٍ قديمة نصفُها مدفونٌ بالتراب وسط عشبٍ جاف", en:"an old half-buried football in dry weeds where a playground once stood, nostalgic golden light" } },
    { dev:"fact",    head:"كلُّ حديقةٍ تعود = رئةٌ تعود", sub:"عشرات الحدائق على موعدٍ مع الإحياء", slogan:"سوريا تُزهر",
      concept:{ ar:"خريطةُ مدينةٍ من ترابٍ تنبت في نقاطها أوراقٌ خضرٌ صغيرة", en:"an aerial dirt-map of a city with tiny green leaves sprouting at scattered points, overhead macro" } }
  ],
  "seatbelt": [
    { dev:"paradox", head:"قيدٌ يُحرّرك", sub:"ثانيتان لربطه… وعمرٌ يشكرك", slogan:"اربط تسلم",
      concept:{ ar:"حزامُ أمانٍ يلتفّ على شكل قلبٍ فوق مقعدٍ فارغ", en:"a seatbelt curved into a heart shape across an empty car seat, soft cabin light" } },
    { dev:"dialog",  head:"— المشوار قريب… — وكذلك كان الحادث", sub:"معظم الحوادث على بُعد دقائق من البيت", slogan:"مهما قصُر الطريق",
      concept:{ ar:"مفاتيحُ بيتٍ تتدلى من مقود سيارة، وخلفها زجاجٌ متشقق ضبابيّ", en:"house keys dangling from a car's steering column, a spider-cracked windshield softly blurred behind, dusk" } },
    { dev:"persona", head:"أنا الحزام… يدُك الثالثة", sub:"أُمسكك حين تعجز يداك", slogan:"لا تُهملني",
      concept:{ ar:"نسيجُ حزامٍ ممدود على هيئة ذراعٍ تحتضن صدر المقعد", en:"a seatbelt webbing shaped like a protective arm across the seat's chest, conceptual studio" } },
    { dev:"whatif",  head:"ماذا لو فرملتَ الآن؟", sub:"بلا حزام… أنت أولُ من يغادر السيارة", slogan:"اربطه قبل الحركة",
      concept:{ ar:"كوبُ قهوةٍ متجمّد في الهواء أمام زجاج السيارة", en:"a coffee cup frozen mid-air in front of a windshield, frozen-moment photography, suspended tension" } },
    { dev:"fact",    head:"يُنصّف الخطر", sub:"الحزام أرخصُ تأمينٍ على حياتك", slogan:"ثانيتان تكفيان",
      concept:{ ar:"إبزيمُ حزامٍ يلمع كدرعٍ معدنيّ وسط عتمة المقصورة", en:"a seatbelt buckle gleaming like a metal shield in a dark car interior, macro hero shot" } },
    { dev:"call",    head:"يا من في المقعد الخلفي", sub:"الخلف ليس درعاً سحرياً", slogan:"الكل يربط",
      concept:{ ar:"ثلاثةُ أحزمةٍ مربوطة تلمع في مقصورةٍ ليلية كأوتار آلةٍ واحدة", en:"three fastened seatbelts glowing in a night cabin like strings of one instrument, family safety mood" } }
  ],
  "speeding": [
    { dev:"fact",    head:"كلُّ ١٠ كم/سا تضاعف الخطر", sub:"الفيزياء لا تجامل أحداً", slogan:"خفّف تصل",
      concept:{ ar:"إبرةُ عدّاد سرعةٍ تنحني وتذوب بعد رقمها الأقصى", en:"a speedometer needle bending and melting past its limit, dashboard noir, surreal detail" } },
    { dev:"paradox", head:"توفّر دقيقةً… وتخسر العمر", sub:"أسرعُ طريقٍ للغياب: العجلة", slogan:"الوصول غاية",
      concept:{ ar:"ساعةُ يدٍ يلتف حولها طريقٌ سريع كحبلٍ مشدود", en:"a wristwatch with a highway wrapping around it like a tightening rope, conceptual macro" } },
    { dev:"persona", head:"أنا المنعطف الأخير", sub:"قابلني كثيرون مسرعين… ولم يكملوا الحكاية", slogan:"تمهّل عندي",
      concept:{ ar:"منعطفٌ جبليّ تقف عنده إشارةُ تحذيرٍ محنيّة كأنها تنحني حزناً", en:"a mountain road curve with a bent, bowed warning sign as if mourning, overcast mood, no text on sign" } },
    { dev:"dialog",  head:"— لحق بالموعد؟", sub:"— هو الموعد الوحيد الذي لم يفوّته", slogan:"تأخيرُ ساعةٍ أهون",
      concept:{ ar:"كرسيٌّ فارغ على رأس طاولة اجتماعٍ والضوء ينسحب عنه ببطء", en:"an empty chair at the head of a meeting table, light slowly withdrawing from it, quiet grief" } },
    { dev:"whatif",  head:"ماذا لو سبقك طفلٌ بكرته؟", sub:"بسرعتك الحالية… هل ستتوقف؟", slogan:"السرعة قرار",
      concept:{ ar:"كرةٌ حمراء تتدحرج من الرصيف نحو منتصف شارعٍ فارغ", en:"a red ball rolling off a sidewalk into an empty street, low angle, held-breath moment" } },
    { dev:"call",    head:"يا صاحب المحرّك القويّ", sub:"قوّتك الحقيقية في كبح جماحه", slogan:"القوة في التحكّم",
      concept:{ ar:"دوّاسةُ وقودٍ يمتد من تحتها ظلٌّ على هيئة حافة هاوية", en:"a gas pedal casting a shadow shaped like a cliff edge, macro, dramatic single light" } }
  ],
  "water": [
    { dev:"persona", head:"أنا القطرة… لا تحسبني قليلة", sub:"منّي يبدأ النهر، وبإهمالك ينتهي", slogan:"كل قطرةٍ وطن",
      concept:{ ar:"قطرةُ ماءٍ واحدة يتلألأ داخلها انعكاسُ نهرٍ كامل", en:"a single water drop containing the reflection of an entire river landscape, macro, crystalline" } },
    { dev:"fact",    head:"صنبورٌ يقطر = ٢٠ لتراً يومياً", sub:"إصلاحٌ بسيط يوفّر نهراً صغيراً كل شهر", slogan:"رشّد يدُم",
      concept:{ ar:"صنبورٌ يقطر وتحته دلاءٌ تكبر تدريجياً حتى تصير خزاناً", en:"a dripping tap over buckets growing progressively into a huge water tank, escalating scale, clean studio" } },
    { dev:"whatif",  head:"ماذا لو فتحتَه فلم يجرِ؟", sub:"يومٌ واحد بلا ماء يعلّمك قيمته كلها", slogan:"لا تنتظر الدرس",
      concept:{ ar:"صنبورٌ مفتوح ينساب منه رملٌ ناعم بدل الماء", en:"an open faucet pouring fine dry sand instead of water, arid tone, stark minimal" } },
    { dev:"paradox", head:"يفيض عندك… ويغيب عن غيرك", sub:"ما تهدره هنا يُعطّش هناك", slogan:"الماء شراكة",
      concept:{ ar:"كوبٌ يفيض على طاولة، وفي عمق الكادر كوبٌ فارغ مقلوب", en:"an overflowing glass on a table, a distant empty overturned glass in the deep background, moral depth-of-field" } },
    { dev:"dialog",  head:"— دقيقة فقط! … صارت الدقيقةُ نهراً", sub:"الهدر يتسلل بالدقائق", slogan:"انتبه للدقائق",
      concept:{ ar:"ساعةُ حائطٍ تسيل أرقامُها قطراتِ ماء", en:"a wall clock whose numerals drip away as water droplets, surreal minimal, cream background" } },
    { dev:"call",    head:"يا من يغسل بالخرطوم", sub:"دلوان يكفيان… والباقي للحياة", slogan:"وفّر للأجيال",
      concept:{ ar:"خرطومُ ماءٍ ملفوف على شكل علامة استفهام تتدلى من طرفها قطرة", en:"a garden hose coiled into a question-mark shape, a single drop hanging at its tip, clean conceptual" } }
  ],
  "electricity": [
    { dev:"paradox", head:"مصباحٌ زائد هنا… عتمةٌ هناك", sub:"ما توفّره ليلاً يضيء بيتاً آخر", slogan:"نورٌ نتقاسمه",
      concept:{ ar:"مدينةٌ ليلية من الأعلى نصفها مضاء ونصفها معتم، وخيطُ ضوءٍ يعبر بينهما", en:"an aerial night city half-lit half-dark, a single thread of light crossing from bright to dark side, cinematic" } },
    { dev:"persona", head:"أنا الكهرباء… لا أحب السهر عبثاً", sub:"أطفئني حين تغادر، أصِلك حين تحتاج", slogan:"أطفئ ما لا يلزم",
      concept:{ ar:"مصباحٌ متوهج يتصبب قطراتِ ضوءٍ كأنه يعرق", en:"an incandescent bulb sweating glowing droplets of light, humorous surreal, dark background" } },
    { dev:"fact",    head:"الشاحن الفارغ يسرق أيضاً", sub:"الأجهزة الخاملة تقتطع من فاتورتك بصمت", slogan:"افصل ما لا تستخدم",
      concept:{ ar:"شاحنٌ في الجدار تمتد منه خيوطُ ضوءٍ تُسحب من الغرفة كجذور", en:"a plugged wall charger drawing faint glowing threads from the room like roots, subtle night interior" } },
    { dev:"whatif",  head:"ماذا لو أطفأنا الزائد معاً؟", sub:"ساعةُ ترشيدٍ جماعي = مدينةٌ تتنفس", slogan:"معاً نضيء أطول",
      concept:{ ar:"أفقُ مدينةٍ تخفت لافتاتُها الزائدة وتبقى نوافذ البيوت دافئةً مضيئة", en:"a city skyline dimming its excess signage while warm home windows stay glowing, serene night" } },
    { dev:"dialog",  head:"— من ترك الضوء مشتعلاً؟", sub:"— البيتُ كلُّه نام… والنورُ ساهرٌ وحده", slogan:"آخرُ الخارجين يطفئ",
      concept:{ ar:"مصباحٌ وحيد مضاء في بيتٍ نائم يرسم ظلاً أكبر من البيت", en:"one lit lamp in a sleeping house casting a shadow larger than the house itself, moody, quiet excess" } },
    { dev:"call",    head:"يا صاحب المكيّف السخيّ", sub:"درجةٌ واحدة أعلى توفّر الكثير", slogan:"درجةٌ تصنع فرقاً",
      concept:{ ar:"ورقةٌ بيضاء مطويّة على شكل مروحةِ يدٍ فوق طاولةٍ صيفية", en:"a plain white paper folded into a hand fan on a summer table, witty clean studio shot" } }
  ],
  "fire": [
    { dev:"persona", head:"أنا الحريق… أبدأ صغيراً جداً", sub:"شرارة، فغفلة، فوليمة", slogan:"اخنقني مبكراً",
      concept:{ ar:"عودُ ثقابٍ مشتعل ينتصب كعملاقٍ وسط غرفة جلوسٍ مصغّرة", en:"a lit matchstick towering like a giant inside a miniature living-room diorama, scale-play, ominous" } },
    { dev:"fact",    head:"مطبخُك أولُ المشتبهين", sub:"معظم حرائق البيوت تبدأ من موقدٍ مُهمَل", slogan:"لا تغادر والنار تعمل",
      concept:{ ar:"مقبضُ طنجرةٍ على موقد يمتد ظلُّه فتيلَ ديناميت", en:"a pot handle on a stove casting a shadow shaped like a lit dynamite fuse, kitchen noir" } },
    { dev:"whatif",  head:"ماذا لو استيقظتَ على دخان؟", sub:"كاشفٌ صغير يشتري لك دقائقَ النجاة", slogan:"ركّب كاشف دخان",
      concept:{ ar:"كاشفُ دخانٍ يتوهج كنجمةِ حراسةٍ فوق سريرٍ نائم", en:"a smoke detector glowing like a guardian star above a sleeping bed, protective calm night" } },
    { dev:"dialog",  head:"— أطفأتَ الغاز؟ … أظن", sub:"«أظن» لا تُطفئ حريقاً", slogan:"تفقّد قبل أن تغفو",
      concept:{ ar:"لقطةٌ قريبة جداً لمفتاح موقدٍ بين وضعَين وظلُّ شعلةٍ خافت يحوم", en:"extreme close-up of a stove knob caught between on and off, a faint flame shadow hovering, suspense macro" } },
    { dev:"paradox", head:"تدفئك… وتأكل بيتك", sub:"النار خادمٌ مطيع وسيّدٌ رهيب", slogan:"أبقِها خادماً",
      concept:{ ar:"مدفأةٌ دافئة يتسلل من طرف سجادتها خيطُ دخانٍ رفيع", en:"a cozy fireplace with one thin smoke thread rising from the rug's corner, hidden danger, warm-cold tension" } },
    { dev:"call",    head:"يا من يحرق بقايا حقله", sub:"شرارةُ حقلك قد تأكل قرية", slogan:"لا للحرق المكشوف",
      concept:{ ar:"سنابلُ قمحٍ ذهبية ينعكس عليها وهجٌ برتقاليّ بعيد", en:"golden wheat stalks reflecting a distant orange glow, dread at the horizon, rural dusk" } }
  ],
  "litter": [
    { dev:"paradox", head:"ترميها بثانية… وتبقى قرناً", sub:"كيسُ النايلون يعيش أطول منا جميعاً", slogan:"مكانها السلة",
      concept:{ ar:"كيسُ نايلون عالقٌ بغصنٍ عارٍ كرايةِ استسلام", en:"a plastic bag snagged on a bare branch like a surrender flag, gray sky, quiet shame" } },
    { dev:"persona", head:"أنا الشارع… ذاكرتي بصماتُكم", sub:"كلُّ ورقةٍ تُرمى توقيعٌ باسم صاحبها", slogan:"وقّع بجمالك",
      concept:{ ar:"رصيفٌ نظيف تلمع بلاطةٌ واحدة منه كمرآةٍ تعكس السماء", en:"a clean sidewalk with one tile shining like a mirror reflecting the sky, subtle civic pride" } },
    { dev:"dialog",  head:"— السلةُ بعيدة…", sub:"— والمدينةُ أليست قريبةً من قلبك؟", slogan:"خطوتان تكفيان",
      concept:{ ar:"سلةُ مهملاتٍ يرتسم ظلُّها طوقَ كرة سلة، وكرةٌ ورقية في الهواء", en:"a trash bin casting a basketball-hoop shadow, a crumpled paper ball frozen mid-air toward it, playful" } },
    { dev:"whatif",  head:"ماذا لو رمى الجميعُ مثلك؟", sub:"ورقةٌ من كل ساكنٍ = جبل", slogan:"ابدأ بورقتك",
      concept:{ ar:"ورقةٌ مكوّمة واحدة تتضاعف في مرايا متقابلة حتى تصير جبلاً", en:"one crumpled paper multiplied into a mountain through facing infinite mirrors, conceptual" } },
    { dev:"call",    head:"يا من نظّف بيته للعيد", sub:"الشارعُ بيتُك الثاني… والعيد يعمّ", slogan:"مدينتُك بيتُك",
      concept:{ ar:"ممسحةُ عتبةٍ تمتد وتتسع حتى تفرش الشارع كله كسجادة احتفال", en:"a doormat extending into an endless celebration carpet covering the whole street, warm festive light" } },
    { dev:"fact",    head:"أصغرُ نفايةٍ أطولُ أثراً", sub:"عقبُ سيجارةٍ واحد يسمّم ماءً كثيراً", slogan:"صغيرةٌ لكن سامة",
      concept:{ ar:"عقبُ سيجارةٍ في بِركة ماءٍ تنتشر منه حلقاتٌ داكنة", en:"a cigarette butt in a clear puddle radiating dark ripple rings, macro, environmental noir" } }
  ],
  "bullying": [
    { dev:"persona", head:"أنا الكلمة… أَشفي وأجرح", sub:"اخترني بحكمة، فأثري لا يُمحى", slogan:"كلمتُك مسؤولية",
      concept:{ ar:"ريشةٌ بيضاء ناعمة تُلقي على الجدار ظلَّ سكين", en:"a soft white feather casting a sharp knife shadow on the wall, stark duality, single light" } },
    { dev:"dialog",  head:"— كنا نمزح فقط…", sub:"— وهو لم يضحك يوماً", slogan:"انتبه لضحكتك",
      concept:{ ar:"بالونُ حفلةٍ مفرَّغ من الهواء وحيدٌ على أرض ملعب المدرسة", en:"a deflated party balloon alone on a schoolyard floor, muted colors, aftermath silence" } },
    { dev:"whatif",  head:"ماذا لو كان ابنُك الصامت؟", sub:"الضحية غالباً لا تتكلم… تنطفئ", slogan:"اسأل، احتضن، تدخّل",
      concept:{ ar:"حقيبةٌ مدرسية مغلقة ينبض من داخلها ضوءٌ خافت", en:"a closed school backpack with a faint light pulsing from inside, tender mystery, help unseen" } },
    { dev:"paradox", head:"القويُّ لا يحتاج ضحية", sub:"القسوةُ ضعفٌ يتنكّر بصوتٍ عال", slogan:"اللطف شجاعة",
      concept:{ ar:"قبضةٌ ورقية ضخمة تتفكك أوراقُها أمام زهرةٍ صغيرة صامدة", en:"a giant paper fist unraveling into scraps before a small unbending flower, wind-blown, poetic defiance" } },
    { dev:"call",    head:"يا شاهدَ الزاوية", sub:"صمتُك تصفيقٌ للمتنمِّر", slogan:"كن الصوت",
      concept:{ ar:"صفُّ كراسٍ مدرسية أحدها مضاءٌ بضوءٍ شجاع وسط العتمة", en:"a row of school chairs, one lit by a brave spotlight in the gloom, stand-up moment" } },
    { dev:"fact",    head:"الجرح النفسي لا يشيخ", sub:"كلماتُ الطفولة تسكن العمرَ كلَّه", slogan:"ازرع أماناً",
      concept:{ ar:"دفترُ طفولةٍ قديم مفتوحٌ على زهرةٍ محفوظة بين صفحاته", en:"an old childhood notebook opened to a pressed flower between its pages, soft archival light, healed memory" } }
  ],
  "heritage": [
    { dev:"persona", head:"أنا الحجر… حفظتُ أسماءكم", sub:"قرونٌ وأنا أحرس الحكاية، فاحرسوني", slogan:"تراثُنا هويتُنا",
      concept:{ ar:"عمودٌ أثريّ يلتفّ حوله وشاحٌ من ضوءٍ ذهبي", en:"an ancient column wrapped in a scarf of golden light, reverent dusk, temple silence" } },
    { dev:"fact",    head:"أولُ أبجديةٍ وُلدت هنا", sub:"أوغاريت علّمت العالم أن يكتب", slogan:"سوريا أصل الحكاية",
      concept:{ ar:"رُقَيمٌ طينيّ مضاءٌ كجوهرةٍ في عتمة متحف", en:"a small clay tablet lit like a jewel in museum darkness, macro heritage grandeur" } },
    { dev:"whatif",  head:"ماذا لو نطقت القلعة؟", sub:"لحدّثتك عن ألف عامٍ من الصمود", slogan:"احفظ الذاكرة",
      concept:{ ar:"بوابةُ قلعةٍ تنبعث من فتحتها موجةُ صوتٍ ذهبية مرئية", en:"a citadel gate emitting a visible golden sound-wave ripple, magical documentary, twilight" } },
    { dev:"paradox", head:"ينهار بصمت… ويُبنى بوعي", sub:"الإهمالُ معول، والالتفاتةُ ترميم", slogan:"التفت إليه",
      concept:{ ar:"قوسٌ حجريّ نصفه يتفتت غباراً ونصفه يلتئم من الغبار نفسه", en:"a stone arch half crumbling to dust, half reassembling from the same dust, time-reversal split" } },
    { dev:"dialog",  head:"— ما هذه الحجارة القديمة؟", sub:"— هذه أوراقُك الثبوتية يا ولدي", slogan:"جذورك عنوانك",
      concept:{ ar:"كفُّ طفلٍ على حجرٍ منقوش تتطابق خطوطُ كفّه مع النقش", en:"a child's palm resting on carved ancient stone, palm lines merging with the engraving, intimate macro" } },
    { dev:"call",    head:"يا من يخربش على الأثر", sub:"قلمُك يمحو ما عجزت عنه الحروب", slogan:"لا توقّع على التاريخ",
      concept:{ ar:"قلمٌ ضخم كمعولٍ أمام جدارٍ أثري وظلُّه يتراجع خجلاً", en:"a pencil looming like a pickaxe over an ancient wall, its shadow recoiling, guilt conceptual" } }
  ],
  "blood": [
    { dev:"dialog",  head:"— لا أعرفه…", sub:"— لكنّ دمك عرفه قبل أن تلتقيا", slogan:"تبرّع تمنح حياة",
      concept:{ ar:"خيطا دمٍ رفيعان يلتقيان في الهواء على هيئة مصافحة", en:"two slender red threads meeting mid-air in a handshake shape, white void, elegant minimal" } },
    { dev:"fact",    head:"كيسٌ واحد = ثلاثُ أرواح", sub:"عشرُ دقائق منك… أعمارٌ لغيرك", slogan:"قطرةٌ تُحيي",
      concept:{ ar:"كيسُ دمٍ يضيء كفانوسٍ في ممرّ مستشفى معتم", en:"a blood bag glowing like a lantern in a dim hospital corridor, hope light, cinematic" } },
    { dev:"whatif",  head:"ماذا لو احتجتَه غداً؟", sub:"تبرّعُ اليوم يُودَع في رصيد الجميع", slogan:"البنك الحقيقي",
      concept:{ ar:"حصّالةٌ زجاجية تسقط فيها قطرةٌ حمراء كعملةٍ ثمينة", en:"a glass piggy-bank receiving a single red drop like a precious coin, clean studio wit" } },
    { dev:"persona", head:"أنا وريدُك… عندي فائضُ كرم", sub:"خُلق الدمُ ليجري لا ليُحتَكر", slogan:"أجرِ الخير",
      concept:{ ar:"نهرٌ أحمر رقيق يجري بين ضفتين على هيئة ذراعين مسترخيتين", en:"a delicate red river flowing between two banks shaped like resting arms, poetic abstraction" } },
    { dev:"paradox", head:"ينقص منك… ليكتمل غيرُك", sub:"جسدُك يعوّضه بأيام، والمريضُ لا يُعوَّض", slogan:"اكتمل بالعطاء",
      concept:{ ar:"دائرتان حمراوان تتقاطعان فيتوهّج تقاطعُهما هلالاً", en:"two red circles intersecting, their overlap glowing as a bright crescent, geometric warmth" } },
    { dev:"call",    head:"يا صاحب الفصيلة النادرة", sub:"ندرتُك مسؤوليةٌ مضاعفة", slogan:"كن الاحتياط",
      concept:{ ar:"قطرةُ دمٍ وحيدة تحت ضوءٍ مسرحيّ على خشبةٍ فارغة", en:"a single blood drop under a theatrical spotlight on an empty stage, rare-hero staging" } }
  ]
};

/* وصفات بصرية للتوليف الحر (موضوع غير مفهرس) */
window.AW_RECIPES = [
  { id:"shadow",  ar:c=>`جسمٌ واحد يخص «${c}» يُلقي ظلاً يكشف الحقيقة الخفية`, en:c=>`one object central to "${c}" casting a shadow that reveals its hidden truth or consequence, hard single light, conceptual minimal` },
  { id:"split",   ar:c=>`كادرٌ منقسم: «${c}» بوعيٍ في نصفٍ مشرق، وبإهمالٍ في نصفٍ معتم`, en:c=>`split-frame composition: "${c}" handled with care on the bright half versus neglected on the dark half, razor-straight dividing line` },
  { id:"morph",   ar:c=>`الجسم الرئيس في «${c}» يتحوّل تدريجياً إلى عاقبته`, en:c=>`the key object of "${c}" gradually morphing into its consequence, seamless surreal transformation, clean background` },
  { id:"scale",   ar:c=>`تفصيلٌ صغير من «${c}» يظهر عملاقاً يطغى على المشهد`, en:c=>`a tiny detail related to "${c}" towering like a giant over a miniature scene, dramatic scale-play` },
  { id:"void",    ar:c=>`فراغٌ شاسع يعزل جسماً واحداً يروي قصة «${c}»`, en:c=>`vast intentional negative space isolating one storytelling object about "${c}", cinematic emptiness` },
  { id:"ghost",   ar:c=>`حضورٌ شبه شفاف لما قد يضيع بسبب إهمال «${c}»`, en:c=>`a translucent ghost-like presence of what could be lost regarding "${c}", ethereal double-exposure feel` },
  { id:"reflect", ar:c=>`انعكاسٌ يُظهر حقيقةً مختلفة عمّا فوق السطح في «${c}»`, en:c=>`a reflection revealing a different truth than the surface reality of "${c}", mirror/water reflection concept` },
  { id:"frozen",  ar:c=>`لحظةٌ متجمدة قبل وقوع ما لا تُحمد عقباه في «${c}»`, en:c=>`a frozen split-second right before the irreversible moment of "${c}", suspended objects, held breath` }
];

/* قوالب أساليب للموضوع الحر — فتحة اسمٍ واحدة آمنة نحوياً */
window.AW_GENERIC_DEV = {
  question:{ head:t=>`كم ننتظر حتى ننتبه لـ«${t}»؟`,      sub:()=>`السؤال أولُ أبواب الوعي` },
  paradox: { head:()=>`صغيرةٌ في العين… كبيرةٌ في الأثر`,  sub:t=>`«${t}» لا يُقاس بحجمه بل بعاقبته` },
  persona: { head:t=>`لو نطق «${t}» لعاتبنا`,              sub:()=>`كلُّ إهمالٍ رسالةٌ نأسف عليها لاحقاً` },
  whatif:  { head:()=>`ماذا لو التفتنا اليوم؟`,             sub:t=>`غدُ «${t}» يُكتب بقرار اليوم` },
  dialog:  { head:()=>`— ليس شأني… — بل شأنُنا جميعاً`,     sub:t=>`«${t}» مسؤوليةٌ لا تتجزأ` },
  fact:    { head:()=>`دقيقةُ وعيٍ تسبق الندم`,             sub:t=>`في «${t}» الوقايةُ أوفر دائماً` },
  call:    { head:()=>`يا من يمرّ سريعاً`,                  sub:t=>`توقف لحظةً عند «${t}»… تكفي لتغيّر شيئاً` },
  twist:   { head:()=>`ليس عادياً كما يبدو`,                sub:t=>`الاعتيادُ أخطرُ ما في «${t}»` }
};

/* المقاسات والهويات وثوابت العقاب */
const FORMATS={
  post:     {w:1080,h:1350,ratio:'4:5',   label:'منشور',       use:'إنستغرام وفيسبوك'},
  square:   {w:1080,h:1080,ratio:'1:1',   label:'مربّع',        use:'كل المنصات'},
  portrait: {w:1080,h:1440,ratio:'3:4',   label:'عمودي',       use:'شبكة إنستغرام'},
  story:    {w:1080,h:1920,ratio:'9:16',  label:'ستوري وريلز',  use:'ستوري · ريلز · تيك توك'},
  landscape:{w:1920,h:1080,ratio:'16:9',  label:'أفقي',        use:'يوتيوب · إكس · شاشات'},
  link:     {w:1200,h:630, ratio:'1.91:1',label:'رابط',        use:'رابط فيسبوك ولينكدإن'},
  tall:     {w:1080,h:1620,ratio:'2:3',   label:'طويل',        use:'بنترست'}
};
/* هوامش واجهة الستوري حيث تقع أزرار المنصة فوق التصميم */
function safeInsets(doc){const f=doc.fmt;if(f.id==='story')return {t:Math.round(f.h*0.083),b:Math.round(f.h*0.11)};return {t:0,b:0};}

/* ألوان العقاب: البدائل المعتمدة وحدها (poster-for-jableh/scripts/compose.py · SCHEMES).
   الذهبي هو الأصل بلا صبغ، والبقية لون مسطّح. لا لون حرّ للعقاب: canonical-values §العقاب. */
const EAGLE_RATIO=754.1/1000;
const EAGLE_MIN_W=48, EAGLE_MIN_OPACITY=0.3;
const EAGLE_SCHEMES={
  gold:      {label:'الذهبي الأصلي',color:null},
  light:     {label:'فاتح',color:C('eagle-light')},
  dark:      {label:'كحلي معدني',color:C('eagle-dark')},
  forest:    {label:'غابة',color:C('eagle-forest')},
  navy_amber:{label:'كحلي عميق',color:C('eagle-navy-amber')},
  cream_navy:{label:'كريمي',color:C('eagle-cream-navy')}
};

const ROLE_LABELS={photo:'الصورة',scrim:'التعتيم',ornament:'الزخرفة',eagle:'العقاب',entAr:'اسم الجهة',entEn:'الاسم بالإنجليزية',
  head:'العنوان',sub:'السطر الداعم',slogan:'الشعار',tag:'الوسم',handle:'الحساب',watermark:'علامة غير حكومي',avatar:'الأفاتار',signature:'التوقيع',
  free:'نص',logo:'صورة',shape:'شكل'};

const KITS={
  syria:{label:'سوريا الجديدة',
    palettes:{
      dark:{bg1:C('syria-dark-bg1'),bg2:C('syria-dark-bg2'),head:C('syria-dark-head'),sub:C('syria-dark-sub'),entAr:C('syria-dark-entAr'),entEn:C('syria-dark-entEn'),slogan:C('syria-dark-slogan'),tag:C('syria-dark-tag'),handle:C('syria-dark-handle'),text:C('syria-dark-text'),accent:C('syria-dark-accent'),orn:'201,168,106',scrim:'11,42,38',scrimEdge:'11,42,38'},
      light:{bg1:C('syria-light-bg1'),bg2:C('syria-light-bg2'),head:C('syria-light-head'),sub:C('syria-light-sub'),entAr:C('syria-light-entAr'),entEn:C('syria-light-entEn'),slogan:C('syria-light-slogan'),tag:C('syria-light-tag'),handle:C('syria-light-handle'),text:C('syria-light-text'),accent:C('syria-light-accent'),orn:'184,146,79',scrim:'20,40,36',scrimEdge:'243,238,228'}},
    fonts:{head:['Cairo',900],sub:['Cairo',600],entAr:['Cairo',700],entEn:['Tajawal',700],slogan:['Cairo',700],tag:['Tajawal',500],handle:['Tajawal',500],free:['Cairo',700],watermark:['Tajawal',700]},
    marks:{eagle:true,ornament:true,avatar:false,signature:false},
    swatches:[C('syria-sw1'),C('syria-sw2'),C('syria-sw3'),C('syria-sw4'),C('syria-sw5'),C('syria-sw6'),C('syria-sw7'),C('syria-sw8')]},
  khaldoun:{label:'خلدون عكرمة',
    palettes:{
      dark:{bg1:C('khaldoun-dark-bg1'),bg2:C('khaldoun-dark-bg2'),head:C('khaldoun-dark-head'),sub:C('khaldoun-dark-sub'),entAr:C('khaldoun-dark-entAr'),entEn:C('khaldoun-dark-entEn'),slogan:C('khaldoun-dark-slogan'),tag:C('khaldoun-dark-tag'),handle:C('khaldoun-dark-handle'),text:C('khaldoun-dark-text'),accent:C('khaldoun-dark-accent'),orn:'201,165,87',scrim:'6,37,56',scrimEdge:'6,37,56'},
      light:{bg1:C('khaldoun-light-bg1'),bg2:C('khaldoun-light-bg2'),head:C('khaldoun-light-head'),sub:C('khaldoun-light-sub'),entAr:C('khaldoun-light-entAr'),entEn:C('khaldoun-light-entEn'),slogan:C('khaldoun-light-slogan'),tag:C('khaldoun-light-tag'),handle:C('khaldoun-light-handle'),text:C('khaldoun-light-text'),accent:C('khaldoun-light-accent'),orn:'201,165,87',scrim:'6,37,56',scrimEdge:'250,247,242'}},
    fonts:{head:['Noto Kufi Arabic',700],sub:['Noto Sans Arabic',400],entAr:['Noto Kufi Arabic',700],entEn:['Tajawal',700],slogan:['Noto Kufi Arabic',700],tag:['Tajawal',500],handle:['Tajawal',500],free:['Noto Kufi Arabic',700],watermark:['Tajawal',700]},
    marks:{eagle:false,ornament:false,avatar:true,signature:true},
    swatches:[C('khaldoun-sw1'),C('khaldoun-sw2'),C('khaldoun-sw3'),C('khaldoun-sw4'),C('khaldoun-sw5'),C('khaldoun-sw6'),C('khaldoun-sw7'),C('khaldoun-sw8')]},
  free:{label:'حرّ',
    palettes:{
      dark:{bg1:C('free-dark-bg1'),bg2:C('free-dark-bg2'),head:C('free-dark-head'),sub:C('free-dark-sub'),entAr:C('free-dark-entAr'),entEn:C('free-dark-entEn'),slogan:C('free-dark-slogan'),tag:C('free-dark-tag'),handle:C('free-dark-handle'),text:C('free-dark-text'),accent:C('free-dark-accent'),orn:'255,255,255',scrim:'0,0,0',scrimEdge:'0,0,0'},
      light:{bg1:C('free-light-bg1'),bg2:C('free-light-bg2'),head:C('free-light-head'),sub:C('free-light-sub'),entAr:C('free-light-entAr'),entEn:C('free-light-entEn'),slogan:C('free-light-slogan'),tag:C('free-light-tag'),handle:C('free-light-handle'),text:C('free-light-text'),accent:C('free-light-accent'),orn:'0,0,0',scrim:'0,0,0',scrimEdge:'255,255,255'}},
    fonts:{head:['Cairo',900],sub:['Cairo',600],entAr:['Cairo',700],entEn:['Tajawal',700],slogan:['Cairo',700],tag:['Tajawal',500],handle:['Tajawal',500],free:['Cairo',700],watermark:['Tajawal',700]},
    marks:{eagle:false,ornament:false,avatar:false,signature:false},
    swatches:[C('free-sw1'),C('free-sw2'),C('free-sw3'),C('free-sw4'),C('free-sw5'),C('free-sw6'),C('free-sw7'),C('free-sw8')]}
};
function theme(doc){const k=KITS[doc.kit]||KITS.syria;return Object.assign({},k.palettes[doc.palette]||k.palettes.dark,doc.themeOverride||{});}
function kitFont(doc,role){const k=KITS[doc.kit]||KITS.syria;return k.fonts[role]||k.fonts.free;}

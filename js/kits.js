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
  syria:{label:'سوريا الجديدة',summary:'أخضر صنوبر · ذهبي · العقاب الرسمي',
    palettes:{
      dark:{bg1:C('syria-dark-bg1'),bg2:C('syria-dark-bg2'),head:C('syria-dark-head'),sub:C('syria-dark-sub'),entAr:C('syria-dark-entAr'),entEn:C('syria-dark-entEn'),slogan:C('syria-dark-slogan'),tag:C('syria-dark-tag'),handle:C('syria-dark-handle'),text:C('syria-dark-text'),accent:C('syria-dark-accent'),orn:'201,168,106',scrim:'11,42,38',scrimEdge:'11,42,38'},
      light:{bg1:C('syria-light-bg1'),bg2:C('syria-light-bg2'),head:C('syria-light-head'),sub:C('syria-light-sub'),entAr:C('syria-light-entAr'),entEn:C('syria-light-entEn'),slogan:C('syria-light-slogan'),tag:C('syria-light-tag'),handle:C('syria-light-handle'),text:C('syria-light-text'),accent:C('syria-light-accent'),orn:'184,146,79',scrim:'20,40,36',scrimEdge:'243,238,228'}},
    fonts:{head:['Cairo',900],sub:['Cairo',600],entAr:['Cairo',700],entEn:['Tajawal',700],slogan:['Cairo',700],tag:['Tajawal',500],handle:['Tajawal',500],free:['Cairo',700],watermark:['Tajawal',700]},
    marks:{eagle:true,ornament:true,avatar:false,signature:false},
    swatches:[C('syria-sw1'),C('syria-sw2'),C('syria-sw3'),C('syria-sw4'),C('syria-sw5'),C('syria-sw6'),C('syria-sw7'),C('syria-sw8')]},
  khaldoun:{label:'خلدون عكرمة',summary:'كحلي · ذهبي · الأفاتار والتوقيع',
    palettes:{
      dark:{bg1:C('khaldoun-dark-bg1'),bg2:C('khaldoun-dark-bg2'),head:C('khaldoun-dark-head'),sub:C('khaldoun-dark-sub'),entAr:C('khaldoun-dark-entAr'),entEn:C('khaldoun-dark-entEn'),slogan:C('khaldoun-dark-slogan'),tag:C('khaldoun-dark-tag'),handle:C('khaldoun-dark-handle'),text:C('khaldoun-dark-text'),accent:C('khaldoun-dark-accent'),orn:'201,165,87',scrim:'6,37,56',scrimEdge:'6,37,56'},
      light:{bg1:C('khaldoun-light-bg1'),bg2:C('khaldoun-light-bg2'),head:C('khaldoun-light-head'),sub:C('khaldoun-light-sub'),entAr:C('khaldoun-light-entAr'),entEn:C('khaldoun-light-entEn'),slogan:C('khaldoun-light-slogan'),tag:C('khaldoun-light-tag'),handle:C('khaldoun-light-handle'),text:C('khaldoun-light-text'),accent:C('khaldoun-light-accent'),orn:'201,165,87',scrim:'6,37,56',scrimEdge:'250,247,242'}},
    fonts:{head:['Noto Kufi Arabic',700],sub:['Noto Sans Arabic',400],entAr:['Noto Kufi Arabic',700],entEn:['Tajawal',700],slogan:['Noto Kufi Arabic',700],tag:['Tajawal',500],handle:['Tajawal',500],free:['Noto Kufi Arabic',700],watermark:['Tajawal',700]},
    marks:{eagle:false,ornament:false,avatar:true,signature:true},
    swatches:[C('khaldoun-sw1'),C('khaldoun-sw2'),C('khaldoun-sw3'),C('khaldoun-sw4'),C('khaldoun-sw5'),C('khaldoun-sw6'),C('khaldoun-sw7'),C('khaldoun-sw8')]},
  free:{label:'حرّ',summary:'ألوان وخطوط بلا شعار مفروض',
    palettes:{
      dark:{bg1:C('free-dark-bg1'),bg2:C('free-dark-bg2'),head:C('free-dark-head'),sub:C('free-dark-sub'),entAr:C('free-dark-entAr'),entEn:C('free-dark-entEn'),slogan:C('free-dark-slogan'),tag:C('free-dark-tag'),handle:C('free-dark-handle'),text:C('free-dark-text'),accent:C('free-dark-accent'),orn:'255,255,255',scrim:'0,0,0',scrimEdge:'0,0,0'},
      light:{bg1:C('free-light-bg1'),bg2:C('free-light-bg2'),head:C('free-light-head'),sub:C('free-light-sub'),entAr:C('free-light-entAr'),entEn:C('free-light-entEn'),slogan:C('free-light-slogan'),tag:C('free-light-tag'),handle:C('free-light-handle'),text:C('free-light-text'),accent:C('free-light-accent'),orn:'0,0,0',scrim:'0,0,0',scrimEdge:'255,255,255'}},
    fonts:{head:['Cairo',900],sub:['Cairo',600],entAr:['Cairo',700],entEn:['Tajawal',700],slogan:['Cairo',700],tag:['Tajawal',500],handle:['Tajawal',500],free:['Cairo',700],watermark:['Tajawal',700]},
    marks:{eagle:false,ornament:false,avatar:false,signature:false},
    swatches:[C('free-sw1'),C('free-sw2'),C('free-sw3'),C('free-sw4'),C('free-sw5'),C('free-sw6'),C('free-sw7'),C('free-sw8')]},
  goldblack:{label:'ذهبي وأسود',summary:'أسود فحمي · ذهب معتدل',defaultPalette:'dark',promptGrade:'rich black and charcoal, restrained metallic gold, warm ivory text, high contrast, elegant editorial lighting',
    palettes:{
      dark:{bg1:C('goldblack-dark-bg1'),bg2:C('goldblack-dark-bg2'),head:C('goldblack-dark-head'),sub:C('goldblack-dark-sub'),entAr:C('goldblack-dark-entAr'),entEn:C('goldblack-dark-entEn'),slogan:C('goldblack-dark-slogan'),tag:C('goldblack-dark-tag'),handle:C('goldblack-dark-handle'),text:C('goldblack-dark-text'),accent:C('goldblack-dark-accent'),orn:'215,180,90',scrim:'0,0,0',scrimEdge:'9,9,9'},
      light:{bg1:C('goldblack-light-bg1'),bg2:C('goldblack-light-bg2'),head:C('goldblack-light-head'),sub:C('goldblack-light-sub'),entAr:C('goldblack-light-entAr'),entEn:C('goldblack-light-entEn'),slogan:C('goldblack-light-slogan'),tag:C('goldblack-light-tag'),handle:C('goldblack-light-handle'),text:C('goldblack-light-text'),accent:C('goldblack-light-accent'),orn:'169,130,63',scrim:'0,0,0',scrimEdge:'244,241,233'}},
    fonts:{head:['Noto Kufi Arabic',800],sub:['Tajawal',500],entAr:['Noto Kufi Arabic',700],entEn:['Tajawal',700],slogan:['Noto Kufi Arabic',700],tag:['Tajawal',500],handle:['Tajawal',500],free:['Noto Kufi Arabic',700],watermark:['Tajawal',700]},
    marks:{eagle:false,ornament:false,avatar:false,signature:false},
    swatches:[C('goldblack-sw1'),C('goldblack-sw2'),C('goldblack-sw3'),C('goldblack-sw4'),C('goldblack-sw5'),C('goldblack-sw6'),C('goldblack-sw7'),C('goldblack-sw8')]},
  jableh:{label:'جبلة',summary:'أزرق البحر · حمضيات · رملي',defaultPalette:'light',promptGrade:'Jableh coastal palette: Mediterranean azure and deep sea blue, citrus orange accents, warm sand and paper cream, natural documentary light',
    palettes:{
      dark:{bg1:C('jableh-dark-bg1'),bg2:C('jableh-dark-bg2'),head:C('jableh-dark-head'),sub:C('jableh-dark-sub'),entAr:C('jableh-dark-entAr'),entEn:C('jableh-dark-entEn'),slogan:C('jableh-dark-slogan'),tag:C('jableh-dark-tag'),handle:C('jableh-dark-handle'),text:C('jableh-dark-text'),accent:C('jableh-dark-accent'),orn:'224,123,46',scrim:'6,37,56',scrimEdge:'6,37,56'},
      light:{bg1:C('jableh-light-bg1'),bg2:C('jableh-light-bg2'),head:C('jableh-light-head'),sub:C('jableh-light-sub'),entAr:C('jableh-light-entAr'),entEn:C('jableh-light-entEn'),slogan:C('jableh-light-slogan'),tag:C('jableh-light-tag'),handle:C('jableh-light-handle'),text:C('jableh-light-text'),accent:C('jableh-light-accent'),orn:'224,123,46',scrim:'15,42,68',scrimEdge:'250,247,242'}},
    fonts:{head:['Amiri',700],sub:['Tajawal',400],entAr:['Amiri',700],entEn:['IBM Plex Sans Arabic',600],slogan:['El Messiri',700],tag:['IBM Plex Sans Arabic',400],handle:['Tajawal',500],free:['Amiri',700],watermark:['Tajawal',700]},
    marks:{eagle:false,ornament:false,avatar:false,signature:false},
    swatches:[C('jableh-sw1'),C('jableh-sw2'),C('jableh-sw3'),C('jableh-sw4'),C('jableh-sw5'),C('jableh-sw6'),C('jableh-sw7'),C('jableh-sw8')]}
};
function theme(doc){const k=KITS[doc.kit]||KITS.syria;return Object.assign({},k.palettes[doc.palette]||k.palettes.dark,doc.themeOverride||{});}
function kitFont(doc,role){const k=KITS[doc.kit]||KITS.syria;return k.fonts[role]||k.fonts.free;}

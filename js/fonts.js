/* مكتبة الخطوط: كلها محلية (OFL) في fonts/، وتُضاف إليها خطوط يرفعها المستخدم.
   var = خط متغيّر يغطي مدى الأوزان بملف واحد. */
const FONT_LIBRARY=[
  {family:'Cairo',label:'القاهرة',kind:'عصري',var:[200,1000],file:'Cairo.woff2'},
  {family:'Tajawal',label:'تجوال',kind:'عصري',files:{400:'Tajawal-Regular.woff2',500:'Tajawal-Medium.woff2',700:'Tajawal-Bold.woff2'}},
  {family:'Noto Kufi Arabic',label:'نوتو كوفي',kind:'كوفي',var:[100,900],file:'NotoKufiArabic.woff2'},
  {family:'Noto Sans Arabic',label:'نوتو سانس',kind:'عصري',var:[100,900],file:'NotoSansArabic.woff2'},
  {family:'Noto Naskh Arabic',label:'نوتو نسخ',kind:'نسخ',var:[400,700],file:'NotoNaskhArabic.woff2'},
  {family:'Amiri',label:'أميري',kind:'نسخ أدبي',files:{400:'Amiri-Regular.woff2',700:'Amiri-Bold.woff2'}},
  {family:'IBM Plex Sans Arabic',label:'بليكس',kind:'عصري',files:{400:'IBMPlexSansArabic-Regular.woff2',600:'IBMPlexSansArabic-SemiBold.woff2',700:'IBMPlexSansArabic-Bold.woff2'}},
  {family:'Almarai',label:'المراعي',kind:'عصري',files:{400:'Almarai-Regular.woff2',700:'Almarai-Bold.woff2',800:'Almarai-ExtraBold.woff2'}},
  {family:'Readex Pro',label:'ريدكس',kind:'عصري',var:[160,700],file:'ReadexPro.woff2'},
  {family:'Changa',label:'تشانغا',kind:'عناوين',var:[200,800],file:'Changa.woff2'},
  {family:'Reem Kufi',label:'ريم كوفي',kind:'كوفي',var:[400,700],file:'ReemKufi.woff2'},
  {family:'El Messiri',label:'المسيري',kind:'عناوين',var:[400,700],file:'ElMessiri.woff2'},
  {family:'Lalezar',label:'لاله زار',kind:'عناوين عريضة',files:{400:'Lalezar-Regular.woff2'}},
  {family:'Rakkas',label:'رقّاص',kind:'عناوين عريضة',files:{400:'Rakkas-Regular.woff2'}},
  {family:'Marhey',label:'مرحي',kind:'مرِح',var:[300,700],file:'Marhey.woff2'},
  {family:'Aref Ruqaa',label:'رقعة عارف',kind:'رقعة',files:{400:'ArefRuqaa-Regular.woff2',700:'ArefRuqaa-Bold.woff2'}}
];
/* التوقيع بحروف رياضية لاتينية لا يحملها أيّ خط عربي؛ يُترك لخطوط النظام */
const SIG_FONT_STACK='"STIX Two Math","Cambria Math","Apple Symbols","Segoe UI Symbol","Noto Sans Math",serif';
const CUSTOM_FONTS=[]; /* {id,family,label} */

function fontWeights(family){
  const f=FONT_LIBRARY.find(x=>x.family===family);
  if(!f)return [400];
  if(f.var){return [100,200,300,400,500,600,700,800,900,1000].filter(w=>w>=f.var[0]&&w<=f.var[1]);}
  return Object.keys(f.files).map(Number);
}
function nearestWeight(family,w){const ws=fontWeights(family);return ws.reduce((a,b)=>Math.abs(b-w)<Math.abs(a-w)?b:a,ws[0]);}
function allFonts(){return FONT_LIBRARY.map(f=>({family:f.family,label:f.label,kind:f.kind})).concat(CUSTOM_FONTS.map(f=>({family:f.family,label:f.label,kind:'مرفوع'})));}

/* الخطوط المكتبية معرّفة في style.css (@font-face ثابتة)، فهذه تبقى للاحتياط إن غابت الورقة */
function injectFontFaces(){if([...document.styleSheets].some(ss=>{try{return [...ss.cssRules].some(r=>r.constructor.name==='CSSFontFaceRule');}catch(e){return false;}}))return;
  let css='';
  for(const f of FONT_LIBRARY){
    if(f.var)css+=`@font-face{font-family:'${f.family}';src:url('fonts/${f.file}') format('woff2');font-weight:${f.var[0]} ${f.var[1]};font-display:swap}\n`;
    else for(const w in f.files)css+=`@font-face{font-family:'${f.family}';src:url('fonts/${f.files[w]}') format('woff2');font-weight:${w};font-display:swap}\n`;
  }
  const st=document.createElement('style');st.id='fontFaces';st.textContent=css;document.head.appendChild(st);
}

async function loadCustomFonts(){
  try{
    const list=(await DB.get('fonts'))||[];
    for(const f of list){const data=await DB.get('font:'+f.id);if(!data)continue;
      try{const ff=new FontFace(f.family,data);await ff.load();document.fonts.add(ff);CUSTOM_FONTS.push(f);}catch(e){console.warn('font',f.family,e);}}
  }catch(e){}
}
async function uploadFont(file){
  const buf=await file.arrayBuffer();
  const base=file.name.replace(/\.(ttf|otf|woff2?|TTF|OTF)$/,'').replace(/[^\w؀-ۿ -]/g,'').trim()||'خط';
  const family='U-'+base;
  const ff=new FontFace(family,buf);await ff.load();document.fonts.add(ff);
  const rec={id:uid('f'),family,label:base};
  CUSTOM_FONTS.push(rec);
  await DB.set('font:'+rec.id,buf);await DB.set('fonts',CUSTOM_FONTS.map(x=>({id:x.id,family:x.family,label:x.label})));
  return rec;
}

function fontString(l,scale){return `${l.weight||400} ${(l.size||40)*(scale||1)}px "${l.font||'Cairo'}", "Cairo", sans-serif`;}
async function ensureDocFonts(doc){
  const set=new Set();
  for(const l of doc.layers)if(l.type==='text'&&l.visible!==false)set.add(`${l.weight||400} 40px "${l.font||'Cairo'}"`);
  set.add('700 24px "Tajawal"');
  try{await Promise.all([...set].map(f=>document.fonts.load(f,'أبج abc')));}catch(e){}
}

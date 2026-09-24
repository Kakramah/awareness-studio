/* ===================== التصدير والسلسلة والمشاريع والقوالب ===================== */

/* ZIP بلا ضغط (PNG وJPG مضغوطة أصلاً): ملف واحد بدل تنزيلات متتالية يحجبها المتصفح */
const CRC_T=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
function crc32(b){let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRC_T[(c^b[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0;}
function makeZip(files){
  const enc=new TextEncoder(),parts=[],central=[];let off=0;
  for(const f of files){
    const name=enc.encode(f.name),crc=crc32(f.data),sz=f.data.length;
    const h=new DataView(new ArrayBuffer(30));
    h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);
    h.setUint32(14,crc,true);h.setUint32(18,sz,true);h.setUint32(22,sz,true);h.setUint16(26,name.length,true);
    parts.push(new Uint8Array(h.buffer),name,f.data);
    const c=new DataView(new ArrayBuffer(46));
    c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);
    c.setUint32(16,crc,true);c.setUint32(20,sz,true);c.setUint32(24,sz,true);c.setUint16(28,name.length,true);c.setUint32(42,off,true);
    central.push(new Uint8Array(c.buffer),name);off+=30+name.length+sz;
  }
  const cd=central.reduce((a,b)=>a+b.length,0),e=new DataView(new ArrayBuffer(22));
  e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cd,true);e.setUint32(16,off,true);
  return new Blob([...parts,...central,new Uint8Array(e.buffer)],{type:'application/zip'});
}
function canvasBlob(cv,type,q){return new Promise(r=>cv.toBlob(r,type,q));}
async function blobBytes(b){return new Uint8Array(await b.arrayBuffer());}
function exportOpts(){const e=S.ui.export;return {type:e.type==='jpg'?'image/jpeg':'image/png',ext:e.type==='jpg'?'jpg':'png',q:e.quality/100,scale:e.scale};}
async function renderForExport(doc){const o=exportOpts();const d=clone(doc);autoLayout(d);const cv=await renderDoc(d,{scale:o.scale});return {cv,o};}
function slug(){const t=roleText(S.doc,'head')||'design';return (S.gen.topicId||'design')+'-'+S.doc.fmt.w+'x'+S.doc.fmt.h;}

async function exportCurrent(){
  toast('جارٍ التصدير…');
  try{const {cv,o}=await renderForExport(S.doc);downloadBlob(await canvasBlob(cv,o.type,o.q),slug()+'.'+o.ext);toast('تم التحميل ✓');}
  catch(e){console.error(e);toast('تعذّر التصدير: '+e.message);}
}
/* التصميم نفسه بكل المقاسات: ما حرّكه المستخدم ينتقل بنسبته، والباقي يعيد التخطيط ترتيبه */
async function exportAllFormats(ids){
  if(!ids.length){toast('اختر مقاساً واحداً على الأقل');return;}
  toast('جارٍ تجهيز '+ids.length+' مقاسات…');const files=[];const o=exportOpts();
  try{for(const id of ids){const d=clone(S.doc);resizeDoc(d,id);const cv=await renderDoc(d,{scale:o.scale});files.push({name:`${id}-${d.fmt.w}x${d.fmt.h}.${o.ext}`,data:await blobBytes(await canvasBlob(cv,o.type,o.q))});}
    downloadBlob(makeZip(files),'all-formats.zip');toast('تم ✓ '+files.length+' ملفات');}
  catch(e){console.error(e);toast('تعذّر التصدير: '+e.message);}
}

/* ---------- السلسلة ---------- */
function snapState(){return JSON.stringify({v:2,doc:S.doc,gen:S.gen});}
async function thumbOf(doc){const cv=await renderDoc(doc,{scale:84/doc.fmt.w});return cv.toDataURL('image/jpeg',.8);}
async function addSlide(){S.series.push({snap:snapState(),thumb:await thumbOf(S.doc)});saveSeries();renderFilmstrip();if(S.ui.section==='series')renderProps();toast('أُضيف للسلسلة ('+S.series.length+') ✓');}
async function selectSlide(i){const s=S.series[i];if(!s)return;loadSnap(s.snap);S.ui.slide=i;renderFilmstrip();}
async function updateSlide(i){if(!S.series[i])return;S.series[i]={snap:snapState(),thumb:await thumbOf(S.doc)};saveSeries();renderFilmstrip();toast('حُدّثت الشريحة '+(i+1));}
function deleteSlide(i){S.series.splice(i,1);saveSeries();renderFilmstrip();if(S.ui.section==='series')renderProps();}
function saveSeries(){DB.set('series',S.series).catch(saveFail);}
function renderFilmstrip(){
  const el=$('#fsThumbs');
  el.innerHTML=S.series.map((s,i)=>`<span class="fs-item${S.ui.slide===i?' active':''}"><img class="fs-thumb" src="${s.thumb}" data-slide="${i}" title="شريحة ${i+1}"><button class="fs-del" data-delslide="${i}" aria-label="حذف">×</button></span>`).join('');
  el.querySelectorAll('[data-slide]').forEach(x=>x.onclick=()=>selectSlide(+x.dataset.slide));
  el.querySelectorAll('[data-delslide]').forEach(x=>x.onclick=e=>{e.stopPropagation();deleteSlide(+x.dataset.delslide);});
  $('#fsExportAll').hidden=S.series.length===0;
}
async function exportSeries(){
  if(!S.series.length){toast('لا سلسلة بعد');return;}
  toast('جارٍ تجهيز '+S.series.length+' شرائح…');const o=exportOpts(),files=[];
  try{for(let i=0;i<S.series.length;i++){const st=upgradeSnapshot(S.series[i].snap);await ensureDocImgs(st.doc);autoLayout(st.doc);const cv=await renderDoc(st.doc,{scale:o.scale});
      files.push({name:'slide-'+String(i+1).padStart(2,'0')+'.'+o.ext,data:await blobBytes(await canvasBlob(cv,o.type,o.q))});}
    downloadBlob(makeZip(files),'series.zip');toast('تم تصدير السلسلة ✓');}
  catch(e){console.error(e);toast('تعذّر التصدير: '+e.message);}
}

/* ---------- المشاريع والقوالب ---------- */
function saveProject(name){if(!name)return;const updating=!!S.projects[name];S.projects[name]={data:snapState(),at:Date.now()};DB.set('projects',S.projects).then(()=>toast(updating?'تحدّث المشروع ✓':'حُفظ المشروع ✓')).catch(saveFail);renderProps();}
function loadProject(name){const p=S.projects[name];if(!p)return;loadSnap(p.data);toast('فُتح المشروع ✓');}
function deleteProject(name){delete S.projects[name];DB.set('projects',S.projects).catch(saveFail);renderProps();}
/* نسخة احتياطية كاملة تشمل الصور والخطوط المخزنة محلياً. الاستعادة تستبدل بيانات هذا المتصفح بعد تأكيد المستخدم. */
function bytesToBase64(buf){const bytes=buf instanceof ArrayBuffer?new Uint8Array(buf):new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength);let s='';for(let i=0;i<bytes.length;i+=0x8000)s+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(s);}
function base64ToBuffer(s){const raw=atob(s),out=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)out[i]=raw.charCodeAt(i);return out.buffer;}
async function exportBackup(){
  try{
    await Promise.all([DB.set('autosave',snapState()),DB.set('projects',S.projects),DB.set('templates',S.templates),DB.set('series',S.series)]);
    const entries=(await DB.all()).map(([k,v])=>[k,v instanceof ArrayBuffer||ArrayBuffer.isView(v)?{__awBinary:bytesToBase64(v)}:v]);
    const pack={format:'awareness-studio-backup',version:1,createdAt:new Date().toISOString(),entries};
    const blob=new Blob([JSON.stringify(pack)],{type:'application/json'});if(blob.size>250*1024*1024)throw new Error('النسخة تتجاوز 250MB');downloadBlob(blob,'awareness-studio-backup.json');toast('نُزّلت النسخة الاحتياطية ✓');
  }catch(e){console.error(e);toast('تعذّر إنشاء النسخة الاحتياطية');}
}
async function restoreBackup(file){
  if(!file)return;if(file.size>250*1024*1024){toast('حجم النسخة أكبر من الحد المسموح (250MB)');return;}
  try{const pack=JSON.parse(await file.text());if(pack.format!=='awareness-studio-backup'||pack.version!==1||!Array.isArray(pack.entries))throw new Error('صيغة النسخة غير معروفة');
    const allowed=k=>typeof k==='string'&&/^(autosave|projects|templates|series|fonts|welcomeSeen|img:[\w-]+|font:[\w-]+)$/.test(k);
    if(pack.entries.length>5000||pack.entries.some(x=>!Array.isArray(x)||x.length!==2||!allowed(x[0])))throw new Error('محتوى النسخة غير صالح');
    if(!confirm('ستستبدل الاستعادة المشاريع والقوالب والصور والخطوط المحفوظة حالياً في هذا المتصفح. تأكد من تنزيل نسخة حالية أولاً. هل تريد المتابعة؟'))return;
    const entries=pack.entries.map(([k,v])=>[k,v&&typeof v==='object'&&typeof v.__awBinary==='string'?base64ToBuffer(v.__awBinary):v]);
    await DB.replaceAll(entries);toast('اكتملت الاستعادة، سيُعاد تحميل الاستوديو');setTimeout(()=>location.reload(),700);
  }catch(e){console.error(e);toast('تعذّرت الاستعادة: '+(e.message||'ملف غير صالح'));}
}
function saveTemplate(name){if(!name)return;S.templates[name]={doc:docToTemplate(S.doc),at:Date.now()};DB.set('templates',S.templates).then(()=>toast('حُفظ القالب ✓')).catch(saveFail);renderProps();}
function useTemplate(name){const t=S.templates[name];if(!t)return;commit(()=>{S.doc=applyTemplate(t.doc,S.doc);});S.sel=[];renderProps();toast('طُبّق القالب ✓');}
function deleteTemplate(name){delete S.templates[name];DB.set('templates',S.templates).catch(saveFail);renderProps();}
/* قوالب البداية: هوية × موضع صورة، تُبنى من التخطيط التلقائي نفسه */
const STARTERS=[
  {id:'syria-full',label:'سوريا · صورة كاملة',kit:'syria',palette:'dark',il:'full'},
  {id:'syria-panel',label:'سوريا · لوحة سفلية',kit:'syria',palette:'dark',il:'panel-bottom'},
  {id:'syria-text',label:'سوريا · نصّ وزخرفة',kit:'syria',palette:'light',il:'full',noPhoto:true},
  {id:'kh-full',label:'خلدون · صورة كاملة',kit:'khaldoun',palette:'dark',il:'full'},
  {id:'kh-framed',label:'خلدون · صورة في إطار',kit:'khaldoun',palette:'light',il:'framed'},
  {id:'kh-top',label:'خلدون · لوحة علوية',kit:'khaldoun',palette:'dark',il:'panel-top'},
  {id:'goldblack-full',label:'ذهبي وأسود · صورة كاملة',kit:'goldblack',palette:'dark',il:'full'},
  {id:'goldblack-editorial',label:'ذهبي وأسود · لوحة سفلية',kit:'goldblack',palette:'light',il:'panel-bottom'},
  {id:'jableh-coast',label:'جبلة · صورة كاملة',kit:'jableh',palette:'dark',il:'full'},
  {id:'jableh-editorial',label:'جبلة · لوحة سفلية',kit:'jableh',palette:'light',il:'panel-bottom'},
  {id:'free-side',label:'حرّ · جانبي (أفقي)',kit:'free',palette:'dark',il:'side',fmt:'landscape'},
  {id:'free-only',label:'حرّ · الصورة وحدها',kit:'free',palette:'dark',il:'only'}
];
function useStarter(id){const s=STARTERS.find(x=>x.id===id);if(!s)return;
  commit(()=>{const cur=S.doc;const d=newDoc(s.kit,s.fmt||cur.fmt.id,s.palette);if(!FORMATS[cur.fmt.id]&&!s.fmt)d.fmt=clone(cur.fmt);d.layout.imageLayout=s.il;
    S.doc=applyTemplate(d,cur);if(s.noPhoto){const p=photoLayer(S.doc);p.imgId=null;}});S.sel=[];renderProps();toast('طُبّق: '+s.label);}

/* ---------- التحذيرات ---------- */
function warnings(){
  const d=S.doc,w=[];const h=roleText(d,'head');
  if(h.length>40)w.push('العنوان طويل؛ من كلمتين إلى ست كلمات أقوى أثراً.');
  d.layers.forEach(l=>{if(l.type==='text'&&l.visible!==false&&!l._lh&&l.text&&l.role!=='signature'&&l._cr&&l._cr<3)w.push(`«${layerName(l)}» ضعيف التباين مع ما خلفه (${l._cr.toFixed(1)}:1). جرّب ظلاً أو خلفية نصّ أو لوناً آخر.`);});
  if(d.kit==='khaldoun'){const av=byRole(d,'avatar'),sg=byRole(d,'signature');if(!av.visible||!sg.visible)w.push('هوية خلدون: التوقيع والأفاتار وحدة إلزامية (canonical-values §1ب).');}
  if(d.entIdx>=0&&!byRole(d,'watermark').visible)w.push('جهة رسمية بلا علامة «غير حكومي»: لا تنشره إلا بتفويضٍ منها.');
  const p=photoLayer(d);if(p&&p.imgId&&IMGS[p.imgId]&&p.visible!==false&&!p._lh){const im=_imgDims[p.imgId];if(im){const pw=im.w*p.crop.w,ph=im.h*p.crop.h;if(pw<p.w*0.6||ph<p.h*0.6)w.push('الصورة (أو قصّها) أصغر من إطارها، فستظهر مبكسلة.');}}
  d.layers.forEach(l=>{if(l.visible!==false&&!l._lh&&l.manual&&(l.x>d.fmt.w-10||l.y>d.fmt.h-10||l.x+l.w<10||l.y+l.h<10))w.push(`«${layerName(l)}» خارج الإطار.`);});
  return w;
}
const _imgDims={};
function warnHTML(){const w=warnings();if(!w.length)return '';return `<div class="warn">${w.map(x=>`<div><i class="ti ti-alert-triangle"></i> ${esc(x)}</div>`).join('')}</div>`;}

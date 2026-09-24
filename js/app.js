/* ===================== الحالة والتاريخ والتشغيل ===================== */
const S={
  doc:null,
  gen:{topicQuery:'',topicId:null,tone:'warn',seed:0,device:'auto',usedIdeas:{},last:null,campTag:'',promptMode:'plate'},
  sel:[],series:[],projects:{},templates:{},clip:null,styleClip:null,
  ui:{section:'content',viewZ:1,grid:false,rulers:false,snap:true,safe:false,guides:[],slide:null,topicCategory:'all',topicSearch:'',export:{type:'png',quality:92,scale:1},allFmts:['post','square','story','landscape']}
};

/* التاريخ: لقطة JSON للمستند والمولّد (الصور خارجها بـ imgId) */
let hist=[],hi=-1;
function snapshot(){return JSON.stringify({doc:S.doc,gen:S.gen});}
function pushHist(){const s=snapshot();if(hist[hi]===s)return;hist=hist.slice(0,hi+1);hist.push(s);if(hist.length>80)hist.shift();hi=hist.length-1;updUndo();}
function updUndo(){$('#undoBtn').disabled=hi<=0;$('#redoBtn').disabled=hi>=hist.length-1;}
function restoreSnap(s){const o=JSON.parse(s);S.doc=o.doc;S.gen=o.gen;S.sel=S.sel.filter(id=>S.doc.layers.some(l=>l.id===id));}
function undo(){if(hi<=0)return;hi--;restoreSnap(hist[hi]);afterChange(false);}
function redo(){if(hi>=hist.length-1)return;hi++;restoreSnap(hist[hi]);afterChange(false);}
const autosave=debounce(()=>DB.set('autosave',JSON.stringify({v:2,doc:S.doc,gen:S.gen})).catch(saveFail),500);
function afterChange(record){autoLayout(S.doc);if(record!==false)pushHist();else updUndo();autosave();requestRender();renderPropsSoft();}
/* كل تعديلٍ يمرّ من هنا: يطبّق، يعيد التخطيط، يسجّل في التاريخ، يحفظ، يرسم */
function commit(fn){if(fn)fn();afterChange(true);}

function loadSnap(str){
  const st=upgradeSnapshot(str);S.doc=st.doc;S.gen=Object.assign(S.gen,st.gen||{});S.sel=[];
  ensureDocImgs(S.doc).then(()=>{rememberDims(S.doc);commit(()=>{});renderProps();});
}
async function rememberDims(doc){for(const id of docImgIds(doc)){if(_imgDims[id]||!IMGS[id])continue;try{const im=await loadImage(IMGS[id]);_imgDims[id]={w:im.width,h:im.height};}catch(e){}}}

/* ---------- رفع الصور ---------- */
async function uploadPhoto(file){
  if(!file||!file.type.startsWith('image/')){toast('هذا ليس ملف صورة');return;}
  try{const r=await storeImageFile(file);_imgDims[r.id]={w:r.w,h:r.h};
    const p=photoLayer(S.doc);
    commit(()=>{Object.assign(p,{imgId:r.id,name:r.name,crop:{x:0,y:0,w:1,h:1},rot90:0,straighten:0,flipH:false,flipV:false,visible:true});
      if(S.doc.layout.imageLayout==='none')S.doc.layout.imageLayout='full';});
    toast(`أُضيفت الصورة: ${orientName(r.w,r.h)} ${ratioName(r.w,r.h)} · ${r.w}×${r.h}`);
    selectSection('image');openCropModal(p.id);
  }catch(e){console.error(e);toast('تعذّر فتح الصورة');}
}
async function addImageLayer(file){
  try{const r=await storeImageFile(file);_imgDims[r.id]={w:r.w,h:r.h};
    const W=S.doc.fmt.w,H=S.doc.fmt.h,w=Math.round(Math.min(W,H)*0.3),h=Math.round(w*r.h/r.w);
    const l=imageLayer('logo',{imgId:r.id,name:r.name,fit:'contain',fill:'none',x:Math.round((W-w)/2),y:Math.round((H-h)/2),w,h,manual:true});
    commit(()=>S.doc.layers.push(l));select([l.id]);
  }catch(e){toast('تعذّر فتح الصورة');}
}
function addText(){const W=S.doc.fmt.w,H=S.doc.fmt.h;const l=textLayer('free','نصّ جديد',{x:Math.round(W*0.15),y:Math.round(H*0.45),w:Math.round(W*0.7),size:Math.round(Math.min(W,H)*0.05),sizeLock:true,manual:true});commit(()=>S.doc.layers.push(l));select([l.id]);}
function addShape(shape){const W=S.doc.fmt.w,H=S.doc.fmt.h,s=Math.round(Math.min(W,H)*0.25);
  const l=baseLayer('shape','shape',{shape,fill:null,fillOn:true,stroke:C('white'),strokeW:0,radius:shape==='rect'?16:0,x:Math.round((W-s*(shape==='line'?2:1))/2),y:Math.round((H-s)/2),w:shape==='line'?s*2:s,h:shape==='line'?6:(shape==='band'?Math.round(s*0.4):s),manual:true});
  if(shape==='band'){l.shape='rect';l.x=0;l.w=W;l.radius=0;l.fill=C('black');l.opacity=.55;}
  commit(()=>{const i=S.doc.layers.findIndex(x=>x.role==='head');S.doc.layers.splice(shape==='band'&&i>0?i:S.doc.layers.length,0,l);});select([l.id]);}
function addEagle(){const e=byRole(S.doc,'eagle');if(e&&!e.visible){commit(()=>{e.visible=true;});select([e.id]);toast('ظهر العقاب');return;}
  const W=S.doc.fmt.w,w=150;const l=baseLayer('eagle','eagleX',{scheme:'gold',x:Math.round((W-w)/2),y:60,w,h:Math.round(w*EAGLE_RATIO),manual:true});commit(()=>S.doc.layers.push(l));select([l.id]);}

/* ---------- الأقسام ---------- */
const SECTIONS={
  content:{icon:'ti-text-size',title:'المحتوى',desc:'الموضوع والفكرة والنصوص'},
  format:{icon:'ti-aspect-ratio',title:'المقاس',desc:'المنصة والنسبة والتخطيط'},
  image:{icon:'ti-photo',title:'الصورة',desc:'رفع وقصّ وضبط كامل'},
  layers:{icon:'ti-stack-front',title:'الطبقات والعناصر',desc:'أضِف ورتّب وحاذِ'},
  edit:{icon:'ti-adjustments-horizontal',title:'تحرير العنصر',desc:'كل خصائص ما اخترته'},
  brand:{icon:'ti-palette',title:'الهوية',desc:'الهوية والجهة والعقاب والخلفية'},
  series:{icon:'ti-stack-2',title:'السلسلة',desc:'شرائح الحملة'},
  export:{icon:'ti-file-export',title:'التصدير',desc:'الملفات والنص والمشاريع'}
};
function selectSection(sec){
  S.ui.section=sec;$$('#sidebar .nav').forEach(n=>n.classList.toggle('active',n.dataset.sec===sec));
  const m=SECTIONS[sec];$('#secIcon').className='ti '+m.icon;$('#secTitle').textContent=m.title;$('#secDesc').textContent=m.desc;
  renderProps();$('#props').scrollTop=0;
}

async function migrateLegacyLS(){
  let ls;try{ls=window.localStorage;}catch(e){return;}
  try{
    const conv=async s=>{const o=JSON.parse(s);if(o.imgData){const id=uid('i');IMGS[id]=o.imgData;await DB.set('img:'+id,o.imgData);o.imgId=id;delete o.imgData;}return JSON.stringify(o);};
    const a=ls.getItem('aw_autosave');if(a)await DB.set('autosave',await conv(a));
    const p=JSON.parse(ls.getItem('aw_projects')||'{}');for(const k in p)p[k].data=await conv(p[k].data);if(Object.keys(p).length)await DB.set('projects',p);
    const sv=JSON.parse(ls.getItem('aw_series')||'[]');for(const x of sv)x.snap=await conv(x.snap);if(sv.length)await DB.set('series',sv);
    ['aw_autosave','aw_projects','aw_series'].forEach(k=>ls.removeItem(k));
  }catch(e){console.warn('legacy',e);}
}
async function gcImages(){
  try{const used=new Set();const add=s=>{try{const st=upgradeSnapshot(s);docImgIds(st.doc).forEach(i=>used.add(i));}catch(e){}};
    add(snapshotForGC());Object.values(S.projects).forEach(p=>add(p.data));S.series.forEach(x=>add(x.snap));
    Object.values(S.templates).forEach(t=>docImgIds(t.doc).forEach(i=>used.add(i)));
    for(const k of await DB.keys())if(String(k).startsWith('img:')&&!used.has(k.slice(4)))await DB.del(k);}catch(e){}
}
function snapshotForGC(){return JSON.stringify({v:2,doc:S.doc,gen:S.gen});}

function wireChrome(){
  $$('#sidebar .nav').forEach(n=>n.onclick=()=>selectSection(n.dataset.sec));
  $('#exportTop').onclick=exportCurrent;
  $('#undoBtn').onclick=undo;$('#redoBtn').onclick=redo;
  $('#paletteToggle').onclick=()=>commit(()=>{S.doc.palette=S.doc.palette==='dark'?'light':'dark';});
  $('#helpTop').onclick=()=>{$('#helpModal').hidden=false;};
  $('#helpClose').onclick=()=>{$('#helpModal').hidden=true;};
  const closeWelcome=()=>{$('#welcomeModal').hidden=true;DB.set('welcomeSeen',true).catch(saveFail);};
  $('#welcomeStart').onclick=closeWelcome;$('#welcomeClose').onclick=closeWelcome;
  $('#welcomeReplay').onclick=()=>{$('#helpModal').hidden=true;$('#welcomeModal').hidden=false;};
  $('#zoomIn').onclick=()=>setZoom(S.ui.viewZ*1.25);$('#zoomOut').onclick=()=>setZoom(S.ui.viewZ/1.25);$('#zoomLbl').onclick=()=>setZoom(1);
  $('#fsAdd').onclick=addSlide;$('#fsExportAll').onclick=exportSeries;
  $('#imgInput').addEventListener('change',async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const tg=S._imgTarget||'photo';
    if(tg==='layer')addImageLayer(f);
    else if(tg.startsWith('replace:')){const l=layerById(tg.slice(8));if(!l)return;try{const r=await storeImageFile(f);_imgDims[r.id]={w:r.w,h:r.h};commit(()=>{l.imgId=r.id;l.name=r.name;l.crop={x:0,y:0,w:1,h:1};});renderProps();}catch(err){toast('تعذّر فتح الصورة');}}
    else uploadPhoto(f);});
  $('#fontInput').addEventListener('change',async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;try{const r=await uploadFont(f);toast('أُضيف الخط: '+r.label);
    const ls=selLayers().filter(l=>l.type==='text');if(ls.length)commit(()=>ls.forEach(l=>{l.font=r.family;l.weight=400;}));renderProps();}catch(err){toast('تعذّر قراءة الخط');}});
  /* إفلات صورة على اللوحة يجعلها صورة التصميم */
  const st=$('.stage');st.addEventListener('dragover',e=>{e.preventDefault();st.classList.add('dz-over');});st.addEventListener('dragleave',()=>st.classList.remove('dz-over'));
  st.addEventListener('drop',e=>{e.preventDefault();st.classList.remove('dz-over');const f=e.dataTransfer.files[0];if(f)uploadPhoto(f);});
}

(async function init(){
  injectFontFaces();
  wireChrome();wireEditor();wireCropModal();wireProps();
  S.doc=newDoc('syria','post','dark');autoLayout(S.doc);
  try{
    await migrateLegacyLS();
    await loadCustomFonts();
    const auto=await DB.get('autosave');
    S.projects=(await DB.get('projects'))||{};S.templates=(await DB.get('templates'))||{};S.series=(await DB.get('series'))||[];
    if(auto){const st=upgradeSnapshot(auto);S.doc=st.doc;Object.assign(S.gen,st.gen||{});await ensureDocImgs(S.doc);await rememberDims(S.doc);}
    /* الشرائح والمشاريع القديمة تُرقّى عند فتحها؛ صورها المصغّرة تبقى كما هي */
    gcImages();
  }catch(e){console.warn(e);toast('الحفظ غير متاح في هذا المتصفح');}
  autoLayout(S.doc);hist=[snapshot()];hi=0;updUndo();
  renderFilmstrip();selectSection('content');
  await document.fonts.ready;autoLayout(S.doc);renderPreview();
  try{if(!await DB.get('welcomeSeen')&&!auto&&Object.keys(S.projects).length===0)$('#welcomeModal').hidden=false;}catch(e){}
})();

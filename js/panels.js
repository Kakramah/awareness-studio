/* ===================== لوحات التحكم =====================
   ربطٌ واحد: كل عنصر تحكّم يحمل data-t (الهدف) وdata-k (المسار)، فلا يُكتب مستمعٌ لكل منزلق. */

function getTarget(t){
  if(!t)return null;
  if(t.startsWith('L:'))return layerById(t.slice(2));
  return {doc:S.doc,gen:S.gen,layout:S.doc.layout,scrim:S.doc.scrim,bg:S.doc.bg,theme:S.doc.themeOverride,ent:S.doc.customEnt,ui:S.ui,exp:S.ui.export}[t];
}
function getPath(o,p){return p.split('.').reduce((a,k)=>a==null?a:a[k],o);}
function setPath(o,p,v){const ks=p.split('.');let a=o;for(let i=0;i<ks.length-1;i++){if(a[ks[i]]==null)a[ks[i]]={};a=a[ks[i]];}a[ks[ks.length-1]]=v;}
const NO_RENDER=['gen','ui','exp'];

/* ---------- بُناة عناصر التحكم ---------- */
const A=(t,k,act,num)=>`data-t="${t}" data-k="${k}"${act?` data-act="${act}"`:''}${num?' data-num="1"':''}`;
function sl(t,k,label,min,max,step,val,def,act,fmt){const v=val??def;return `<div class="ctl"><label>${label}</label><input type="range" ${A(t,k,act,1)} min="${min}" max="${max}" step="${step}" value="${v}"><span class="sv" data-fmt="${fmt||''}">${fmtV(v,fmt)}</span>${def!=null?`<button class="rs" data-reset="${def}" ${A(t,k,act,1)} title="أعِد"><i class="ti ti-refresh"></i></button>`:''}</div>`;}
function fmtV(v,f){v=+v;if(f==='%')return Math.round(v*100)+'٪';if(f==='px')return Math.round(v)+'px';if(f==='deg')return v+'°';if(f==='x')return v.toFixed(2);return Math.round(v*10)/10;}
function numIn(t,k,label,val,act){return `<label class="mini">${label}<input type="number" ${A(t,k,act,1)} value="${Math.round(val)}"></label>`;}
function chips(t,k,opts,cur,act,num){return `<div class="chips">${opts.map(([v,l,ic])=>`<button class="chip${String(cur)===String(v)?' active':''}" data-v="${escAttr(v)}" ${A(t,k,act,num)}>${ic?`<i class="ti ${ic}"></i>`:''}${l}</button>`).join('')}</div>`;}
function check(t,k,label,val,act){return `<label class="check"><input type="checkbox" ${A(t,k,act)}${val?' checked':''}> ${label}</label>`;}
function txt(t,k,label,val,act,ph,dir){return `<div class="field"><label>${label}</label><input type="text" ${A(t,k,act)} value="${escAttr(val??'')}"${ph?` placeholder="${escAttr(ph)}"`:''}${dir?` dir="${dir}"`:''}></div>`;}
function selectCtl(t,k,label,opts,cur,act,num){return `<div class="field"><label>${label}</label><select ${A(t,k,act,num)}>${opts.map(([v,l])=>`<option value="${escAttr(v)}"${String(cur)===String(v)?' selected':''}>${l}</option>`).join('')}</select></div>`;}
function colorCtl(t,k,label,val,sw,resetable,act){
  const v=val||'';const hex=/^#[0-9a-f]{6}$/i.test(v)?v:C('black');
  return `<div class="field"><label>${label}${resetable&&v?` <button class="link" data-reset="" ${A(t,k,act)}>افتراضي الهوية</button>`:''}</label><div class="swrow">${(sw||[]).map(c=>`<button class="sw${v.toLowerCase()===c.toLowerCase()?' on':''}" style="background:${c}" data-v="${c}" ${A(t,k,act)} title="${c}"></button>`).join('')}<input type="color" ${A(t,k,act)} value="${hex}" title="لون حرّ"></div></div>`;}
function group(id,title,body,open){const o=S.ui.open&&S.ui.open[id]!=null?S.ui.open[id]:open;return `<details class="grp" data-d="${id}"${o?' open':''}><summary>${title}</summary><div class="grp-b">${body}</div></details>`;}
function btn(act,label,icon,cls){return `<button class="btn ${cls||'ghost'} sm" data-do="${act}">${icon?`<i class="ti ${icon}"></i>`:''} ${label}</button>`;}
const SW=()=>KITS[S.doc.kit].swatches;

/* ---------- الأقسام ---------- */
function renderProps(){
  const P=$('#props');const sec=S.ui.section;let h='';
  try{h=({content:secContent,format:secFormat,image:secImage,layers:secLayers,edit:secEdit,brand:secBrand,series:secSeries,export:secExport}[sec]||secContent)();}
  catch(e){console.error(e);h=`<div class="hint">تعذّر عرض هذا القسم: ${esc(e.message)}</div>`;}
  P.innerHTML=h;
  P.querySelectorAll('details[data-d]').forEach(d=>d.addEventListener('toggle',()=>{S.ui.open=S.ui.open||{};S.ui.open[d.dataset.d]=d.open;}));
  if(sec==='content')wireContent();
}
function renderPropsSoft(){const a=document.activeElement;if(a&&$('#props').contains(a)&&a!==document.body)return;renderProps();}

function secContent(){
  const g=S.gen,d=S.doc;const L=r=>byRole(d,r);
  const lastTopic=g.last&&(AW_TOPICS.find(t=>t.id===g.last.topicId)||AW_TOPICS.find(t=>t.label===g.last.topicLabel));
  const lastEditorial=g.last?(g.last.editorial!=null?g.last.editorial:!!(lastTopic&&AW_IDEAS[lastTopic.id])):false;
  const lastSource=g.last&&(g.last.source||(lastEditorial&&window.AW_TOPIC_SOURCES&&lastTopic?AW_TOPIC_SOURCES[lastTopic.id]:null));
  return `
  <div class="field"><label><i class="ti ti-bulb"></i> موضوع التوعية</label><input type="text" id="topicInput" placeholder="اكتب موضوعاً أو اختر من الجاهز" value="${escAttr(g.topicQuery)}" autocomplete="off"></div>
  <div class="field"><label>مواضيع جاهزة (${AW_TOPICS.length})</label><div class="chips topic-categories" id="topicCategories">${AW_TOPIC_CATEGORIES.map(c=>{const count=c.id==='all'?AW_TOPICS.length:AW_TOPICS.filter(t=>t.category===c.id).length;return `<button class="chip${S.ui.topicCategory===c.id?' active':''}" data-category="${c.id}">${c.label} · ${count}</button>`;}).join('')}</div>
    <input class="topic-search" type="search" id="topicSearch" placeholder="ابحث عن موضوع" aria-label="ابحث عن موضوع" value="${escAttr(S.ui.topicSearch)}">
    <div class="chips topic-chips" id="topicChips">${AW_TOPICS.map(t=>`<button class="chip${g.topicId===t.id?' active':''}" data-id="${t.id}" data-category="${t.category}"><span>${t.emoji}</span>${t.label}</button>`).join('')}</div>
    <div class="topic-empty hint" id="topicEmpty" hidden>لا توجد مواضيع مطابقة. اكتب موضوعك في الحقل أعلاه.</div></div>
  <div class="field"><label>النبرة</label><div class="chips" id="toneChips">${Object.entries(AW_TONES).map(([k,v])=>`<button class="chip${g.tone===k?' active':''}" data-tone="${k}" title="${v.note}">${v.label}</button>`).join('')}</div></div>
  <div class="field"><label><i class="ti ti-wand"></i> الأسلوب البلاغي</label><div class="chips" id="devChips">
    <button class="chip${g.device==='auto'?' active':''}" data-dev="auto">تلقائي</button>${AW_DEVICES.map(dv=>`<button class="chip${g.device===dv.id?' active':''}" data-dev="${dv.id}" title="${dv.hint}">${dv.label}</button>`).join('')}<button class="chip${g.device==='classic'?' active':''}" data-dev="classic">كلاسيكي</button></div></div>
  <div class="row" style="margin-bottom:14px"><button class="btn primary" id="genBtn"><i class="ti ti-sparkles"></i> ولّد</button><button class="btn ghost" id="brainBtn" style="flex:0 0 auto"><i class="ti ti-bolt"></i> عصف ٦</button><button class="btn ghost" id="shuffleBtn" style="flex:0 0 46px" title="فكرة أخرى"><i class="ti ti-refresh"></i></button></div>
  ${brainIdeas?`<div class="field"><label><i class="ti ti-bolt"></i> اختر فكرة</label><div class="ideas">${brainIdeas.map((it,i)=>`<button class="idea" data-i="${i}"><span class="idev">${devLabel(it.dev)}</span><span class="ihead">${esc(it.head)}</span><span class="icpt">${esc(it.concept.ar)}</span></button>`).join('')}</div><button class="btn ghost sm" id="brainClose" style="margin-top:8px"><i class="ti ti-x"></i> إغلاق</button></div>`:''}
  <div id="warnBox">${warnHTML()}</div>
  <div class="field"><label>العنوان</label><textarea ${A('L:'+L('head').id,'text')} rows="2">${esc(L('head').text)}</textarea></div>
  <div class="field"><label>السطر الداعم</label><textarea ${A('L:'+L('sub').id,'text')} rows="2">${esc(L('sub').text)}</textarea></div>
  <div class="field"><label>الشعار الختامي</label><input type="text" ${A('L:'+L('slogan').id,'text')} value="${escAttr(L('slogan').text)}"></div>
  <div class="row"><div class="field" style="flex:1"><label>الوسم</label><input type="text" ${A('L:'+L('tag').id,'text','tag')} value="${escAttr(L('tag').text)}"></div>
  <div class="field" style="flex:1"><label>وسم موحّد للحملة</label><input type="text" ${A('gen','campTag')} value="${escAttr(g.campTag)}" placeholder="#حملة"></div></div>
  ${g.last?`<div class="field"><label>مصدر الفكرة</label><div class="idea-provenance"><b class="${lastEditorial?'curated':'generic'}">${lastEditorial?'فكرة محرّرة':'صياغة عامة'}</b><span>${lastEditorial?'اختيرت من بنك هذا الموضوع.':'ولّدها المحرّك العام لموضوعك.'}</span>${lastSource?`<a href="${escAttr(lastSource.url)}" target="_blank" rel="noopener noreferrer">${esc(lastSource.label)} <i class="ti ti-external-link"></i></a><small>مرجع للتحرير؛ راجع الإرشادات المحلية قبل النشر.</small>`:''}</div></div>${g.last.concept?`<div class="field"><label>فكرة الصورة (الاستعارة)</label><div class="note">${esc(g.last.concept.ar)}</div></div>`:''}`:''}
  <div class="hint"><i class="ti ti-hand-click"></i> انقر أي عنصرٍ على اللوحة لتحرّكه وتضبطه، وانقر الصورة مرتين لتقصّها.</div>`;
}
function wireContent(){
  const g=S.gen;
  const filterTopics=()=>{const category=S.ui.topicCategory,q=S.ui.topicSearch.trim().toLocaleLowerCase();let shown=0;$$('#topicChips .chip').forEach(c=>{const visible=(category==='all'||c.dataset.category===category)&&c.textContent.toLocaleLowerCase().includes(q);c.hidden=!visible;if(visible)shown++;});$('#topicEmpty').hidden=shown>0;};
  $('#topicInput').addEventListener('input',e=>{g.topicQuery=e.target.value;const m=matchTopic(e.target.value.trim());g.topicId=m?m.id:null;$$('#topicChips .chip').forEach(c=>c.classList.toggle('active',!!m&&c.dataset.id===m.id));});
  $('#topicInput').addEventListener('keydown',e=>{if(e.key==='Enter')generate(false);});
  $('#topicSearch').addEventListener('input',e=>{S.ui.topicSearch=e.target.value;filterTopics();});
  $$('#topicCategories .chip').forEach(c=>c.onclick=()=>{S.ui.topicCategory=c.dataset.category;$$('#topicCategories .chip').forEach(x=>x.classList.toggle('active',x===c));filterTopics();});
  $$('#topicChips .chip').forEach(c=>c.onclick=()=>{const tp=AW_TOPICS.find(x=>x.id===c.dataset.id);g.topicId=tp.id;g.topicQuery=tp.label;g.tone=tp.tone;
    if(S.doc.kit==='syria')commit(()=>{S.doc.palette=AW_TONES[tp.tone].dark?'dark':'light';});renderProps();});
  $$('#toneChips .chip').forEach(c=>c.onclick=()=>{g.tone=c.dataset.tone;if(S.doc.kit==='syria')commit(()=>{S.doc.palette=AW_TONES[g.tone].dark?'dark':'light';});renderProps();});
  $$('#devChips .chip').forEach(c=>c.onclick=()=>{g.device=c.dataset.dev;renderProps();});
  $('#genBtn').onclick=()=>generate(false);$('#brainBtn').onclick=brainstorm;$('#shuffleBtn').onclick=()=>generate(true);
  $$('#props .idea').forEach(b=>b.onclick=()=>applyIdea(+b.dataset.i));
  const bc=$('#brainClose');if(bc)bc.onclick=()=>{brainIdeas=null;renderProps();};
  filterTopics();
}

function secFormat(){
  const d=S.doc,cur=d.fmt.id;
  return `
  <div class="fmtgrid">${Object.entries(FORMATS).map(([id,f])=>{const r=f.w/f.h,bw=r>=1?34:Math.round(34*r),bh=r>=1?Math.round(34/r):34;
    return `<button class="fmt${cur===id?' active':''}" data-do="fmt:${id}"><span class="fshape" style="width:${bw}px;height:${bh}px"></span><b>${f.label}</b><small>${f.ratio} · ${f.w}×${f.h}</small><small class="use">${f.use}</small></button>`;}).join('')}</div>
  <div class="field" style="margin-top:12px"><label>مقاس حرّ ${cur==='custom'?'<span class="badge">مفعّل</span>':''}</label>
    <div class="row"><input type="number" id="cw" value="${d.fmt.w}" min="100" max="6000" placeholder="العرض"><span class="x">×</span><input type="number" id="ch" value="${d.fmt.h}" min="100" max="6000" placeholder="الارتفاع"><button class="btn green sm" data-do="customFmt" style="flex:0 0 70px">طبّق</button></div></div>
  ${hasPhoto(d)?`<button class="btn ghost sm" data-do="matchImage"><i class="ti ti-photo-scan"></i> اجعل التصميم بمقاس الصورة</button>`:''}
  ${group('lay','التخطيط التلقائي',`
    <div class="field"><label>موضع العنوان</label>${chips('layout','titlePos',[['top','أعلى'],['center','وسط'],['bottom','أسفل']],d.layout.titlePos)}</div>
    ${sl('layout','titleOffset','إزاحة',-400,400,4,d.layout.titleOffset,0,null,'px')}
    <button class="btn ghost sm" data-do="resetLayout"><i class="ti ti-layout-dashboard"></i> أعِد كل العناصر إلى التخطيط التلقائي</button>
    <div class="hint">كل عنصرٍ تحرّكه بيدك يبقى حيث وضعته عند تغيير المقاس أو النص، حتى تضغط «أعِد».</div>`,true)}
  ${group('guides','الأدلة',`${check('ui','safe','أظهر الهوامش الآمنة',S.ui.safe)}${check('ui','grid','الشبكة',S.ui.grid)}${check('ui','rulers','المساطر',S.ui.rulers)}${check('ui','snap','المغناطيس',S.ui.snap)}`,false)}`;
}

function imageControls(l,isPhoto){
  const t='L:'+l.id,a=l.adj,dims=_imgDims[l.imgId];
  return `
  <div class="imgcard">${dims?`<b>${orientName(dims.w,dims.h)} <bdi dir="ltr">${ratioName(dims.w,dims.h)}</bdi></b> · <bdi dir="ltr">${dims.w}×${dims.h}px</bdi>`:''}${l.name?`<small>${esc(l.name)}</small>`:''}</div>
  <div class="row">${btn('crop:'+l.id,'قصّ وتدوير','ti-crop','green')}${btn(isPhoto?'replacePhoto':'replaceLayerImg:'+l.id,'استبدل','ti-replace')}${btn('removeImg:'+l.id,'أزِل','ti-trash')}</div>
  <div class="field" style="margin-top:12px"><label>داخل الإطار</label>${chips(t,'fit',[['cover','ملء الإطار (قصّ)','ti-arrows-maximize'],['contain','احتواء كامل (بلا قصّ)','ti-arrows-minimize']],l.fit)}</div>
  ${l.fit==='contain'?`<div class="field"><label>الفراغ حول الصورة</label>${chips(t,'fill',[['blur','نسخة مغبّشة'],['color','لون'],['none','شفاف']],l.fill)}</div>${l.fill==='color'?colorCtl(t,'fillColor','لون الفراغ',l.fillColor,SW()):''}`:''}
  <div class="field"><label>فلاتر جاهزة</label><div class="chips">${Object.entries(IMAGE_PRESETS).map(([k,p])=>`<button class="chip${l.preset===k?' active':''}" data-do="preset:${l.id}:${k}">${p.label}</button>`).join('')}</div></div>
  ${group('light','الضوء',[['exposure','تعريض'],['brightness','سطوع'],['contrast','تباين'],['highlights','إضاءات عالية'],['shadows','ظلال'],['whites','أبيض'],['blacks','أسود']].map(([k,n])=>sl(t,'adj.'+k,n,-100,100,1,a[k],0)).join(''),true)}
  ${group('color','اللون',[['saturation','تشبّع'],['vibrance','حيوية'],['temp','حرارة'],['tint','صبغة']].map(([k,n])=>sl(t,'adj.'+k,n,-100,100,1,a[k],0)).join('')+check(t,'adj.bw','أبيض وأسود',a.bw)+check(t,'adj.duotone','دوتون',a.duotone)+(a.duotone?colorCtl(t,'adj.duoA','لون الظلال',a.duoA,SW())+colorCtl(t,'adj.duoB','لون الإضاءات',a.duoB,SW()):''),false)}
  ${group('detail','التفاصيل',sl(t,'adj.sharpen','حدّة',0,100,1,a.sharpen,0)+sl(t,'adj.soften','تنعيم',0,100,1,a.soften,0)+sl(t,'adj.grain','حبيبات',0,100,1,a.grain,0)+sl(t,'adj.vignette','تظليل الحواف',0,100,1,a.vignette,0)+sl(t,'adj.vigSize','حجم التظليل',10,100,1,a.vigSize,60),false)}
  ${group('shape','الشكل والدمج',sl(t,'opacity','الشفافية',0,1,.01,l.opacity,1,null,'%')+sl(t,'radius','حواف مستديرة',0,400,1,l.radius,0,'radiusLock','px')+sl(t,'border.w','سماكة الإطار',0,60,1,l.border.w,0,null,'px')+(l.border.w?colorCtl(t,'border.color','لون الإطار',l.border.color,SW()):'')
    +'<div class="sub-h">تلاشي الحواف</div>'+[['t','أعلى'],['b','أسفل'],['r','يمين'],['l','يسار']].map(([k,n])=>sl(t,'fade.'+k,n,0,100,1,l.fade[k],0,null)).join('')
    +selectCtl(t,'blend','الدمج مع الخلفية',[['source-over','عادي'],['multiply','مضاعفة'],['screen','شاشة'],['overlay','تراكب'],['soft-light','ضوء ناعم'],['luminosity','إضاءة']],l.blend),false)}
  <div class="row" style="margin-top:10px">${btn('resetAdj:'+l.id,'أعِد كل الضبط','ti-restore')}<button class="btn ghost sm" id="cmpBtn" data-cmp="${l.id}"><i class="ti ti-eye"></i> اضغط مطوّلاً: قبل</button></div>`;
}
function secImage(){
  const d=S.doc,p=photoLayer(d);
  if(!p||!p.imgId||!IMGS[p.imgId])return `
    <button class="up-btn" data-do="uploadPhoto"><i class="ti ti-upload"></i> ارفع صورة التصميم أو أفلِتها على اللوحة</button>
    <div class="hint" style="margin-top:10px">بعد الرفع تُفتح نافذة القصّ فوراً، وترى نسبة الصورة (16:9 أو 9:16 أو 1:1…). للصور التي فيها كتابة اختر «احتواء كامل» فلا يُقصّ منها شيء.</div>`;
  const s=d.scrim;
  return `
  <div class="field"><label>مكان الصورة في التصميم</label>${chips('layout','imageLayout',[['full','تملأ الإطار'],['panel-top','لوحة علوية'],['panel-bottom','لوحة سفلية'],['side','جانبية (أفقي)'],['framed','داخل إطار'],['only','الصورة وحدها']],d.layout.imageLayout)}</div>
  ${imageControls(p,true)}
  ${group('scrim','التعتيم خلف النص',`${chips('scrim','mode',[['auto','ذكي'],['manual','يدوي'],['off','بلا']],s.mode)}
    ${s.mode==='manual'?sl('scrim','strength','القوّة',0,100,1,s.strength,55)+sl('scrim','pos','الموضع',0,100,1,s.pos,50)+`<div class="field"><label>الاتجاه</label>${chips('scrim','dir',[['vertical','رأسي'],['horizontal','أفقي']],s.dir==='auto'?'vertical':s.dir)}</div>`:''}`,true)}
  ${check('L:'+p.id,'visible','أظهِر الصورة',p.visible!==false)}`;
}

function secLayers(){
  const d=S.doc;const rows=d.layers.slice().reverse().filter(l=>l.type!=='scrim'&&!(l.role==='photo'&&!l.imgId)&&l.role!=='rule');
  return `
  <div class="field"><label>أضِف</label><div class="addgrid">
    ${btn('addText','نص','ti-typography')}${btn('addImage','صورة أو شعار','ti-photo-plus')}${btn('addShape:rect','مستطيل','ti-square')}${btn('addShape:ellipse','دائرة','ti-circle')}${btn('addShape:line','خط','ti-line')}${btn('addShape:band','شريط','ti-layout-bottombar')}${btn('addEagle','العقاب','ti-feather')}</div></div>
  <div class="field"><label>المحاذاة ${S.sel.length>1?'(بين المختار)':'(مع الإطار)'}</label><div class="tools">
    ${[['right','ti-layout-align-right','يمين'],['cx','ti-layout-align-center','وسط أفقي'],['left','ti-layout-align-left','يسار'],['top','ti-layout-align-top','أعلى'],['cy','ti-layout-align-middle','وسط رأسي'],['bottom','ti-layout-align-bottom','أسفل']].map(([k,i,n])=>`<button class="tool" data-do="align:${k}" title="${n}"><i class="ti ${i}"></i></button>`).join('')}
    <button class="tool" data-do="dist:x" title="توزيع أفقي"><i class="ti ti-layout-distribute-vertical"></i></button><button class="tool" data-do="dist:y" title="توزيع رأسي"><i class="ti ti-layout-distribute-horizontal"></i></button>
    <button class="tool" data-do="group" title="جمّع (Ctrl+G)"><i class="ti ti-box-multiple"></i></button><button class="tool" data-do="ungroup" title="فكّ (Ctrl+Shift+G)"><i class="ti ti-box-off"></i></button>
    <button class="tool" data-do="dup" title="كرّر (Ctrl+D)"><i class="ti ti-copy"></i></button><button class="tool" data-do="copy" title="انسخ (Ctrl+C)"><i class="ti ti-clipboard-copy"></i></button><button class="tool" data-do="paste" title="الصق (Ctrl+V)"><i class="ti ti-clipboard"></i></button><button class="tool danger" data-do="del" title="احذف"><i class="ti ti-trash"></i></button></div></div>
  <div class="field"><label>الطبقات (الأعلى أولاً)</label><div class="llist">${rows.map(l=>`
    <div class="lrow${S.sel.includes(l.id)?' on':''}${l.visible===false||l._lh?' off':''}" data-sel="${l.id}">
      <i class="ti ${layerIcon(l)}"></i><span class="ln" data-rename="${l.id}">${esc(layerName(l))}${l.type==='text'&&l.text?`<small>${esc(String(l.text).slice(0,24))}</small>`:''}</span>
      ${l._lh?'<em title="أخفاه التخطيط">تلقائي</em>':''}
      <button data-do="vis:${l.id}" title="إظهار/إخفاء"><i class="ti ${l.visible===false?'ti-eye-off':'ti-eye'}"></i></button>
      <button data-do="lock:${l.id}" title="قفل"><i class="ti ${l.locked?'ti-lock':'ti-lock-open'}"></i></button>
      <button data-do="up:${l.id}" title="للأعلى"><i class="ti ti-chevron-up"></i></button><button data-do="down:${l.id}" title="للأسفل"><i class="ti ti-chevron-down"></i></button></div>`).join('')}</div></div>
  <div class="row">${btn('help','الاختصارات','ti-keyboard')}${btn('resetLayout','أعِد التخطيط','ti-layout-dashboard')}</div>`;
}
function layerIcon(l){return {text:'ti-typography',image:'ti-photo',eagle:'ti-feather',shape:'ti-square',ornament:'ti-star',avatar:'ti-user',scrim:'ti-contrast'}[l.type]||'ti-square';}

function secEdit(){
  const ls=selLayers();
  if(!ls.length)return `<div class="hint"><i class="ti ti-hand-click"></i> انقر أي عنصرٍ على اللوحة، أو اختره من «الطبقات». Shift للاختيار المتعدّد.</div>${secLayers()}`;
  if(ls.length>1)return `<div class="note">مختار: ${ls.length} عناصر</div>${secLayers()}`;
  const l=ls[0],t='L:'+l.id;let h=`<div class="edit-h"><input type="text" ${A(t,'name')} value="${escAttr(layerName(l))}" class="namein"><span class="kind">${ROLE_LABELS[l.role]||l.type}</span></div>`;
  if(l.type==='text'&&l.role!=='signature')h+=textControls(l);
  else if(l.type==='image')h+=imageControls(l,l.role==='photo');
  else if(l.type==='eagle')h+=eagleControls(l);
  else if(l.type==='shape')h+=shapeControls(l);
  else if(l.type==='avatar')h+=`<div class="note">الأفاتار المعتمد، لا يُلوَّن ولا يُقلب. شفافيته تُحسب من الخلفية تحته بمعادلة هوية.py (الآن ${Math.round((l._alpha||0)*100)}٪).</div>${sl(t,'hPct','الارتفاع من التصميم',0.05,0.06,0.001,l.hPct,0.055,null,'%')}<div class="field"><label>الجهة</label>${chips(t,'side',[['auto','الأهدأ تلقائياً'],['right','يمين'],['left','يسار']],l.side||'auto','manualOff')}</div>`;
  else if(l.role==='signature')h+=`<div class="note">التوقيع البصري الوحيد، ولونه من المشهد. شفافيته بين 12٪ و18٪ فقط (canonical-values §2).</div>${sl(t,'opacity','الشفافية',0.12,0.18,0.01,l.opacity,0.15,null,'%')}`;
  else if(l.type==='ornament')h+=`<div class="note">زخرفة النجمة الثمانية. غيّر حجمها من زوايا اللوحة.</div>${sl(t,'opacity','الشفافية',0,1,.01,l.opacity,1,null,'%')}`;
  h+=group('pos','الموضع والحجم',`<div class="row nums">${numIn(t,'x','س',l.x,'manual')}${numIn(t,'y','ص',l.y,'manual')}${numIn(t,'w','عرض',l.w,'manualW')}${l.type==='text'?'':numIn(t,'h','ارتفاع',l.h,'manualH')}</div>
    ${l.type!=='eagle'&&l.role!=='signature'&&l.type!=='avatar'&&l.type!=='image'&&l.type!=='ornament'?sl(t,'opacity','الشفافية',0,1,.01,l.opacity,1,null,'%'):''}
    ${l.type!=='eagle'&&l.type!=='avatar'&&l.role!=='signature'?selectCtl(t,'blend','الدمج',[['source-over','عادي'],['multiply','مضاعفة'],['screen','شاشة'],['overlay','تراكب'],['soft-light','ضوء ناعم']],l.blend):''}
    <div class="row">${check(t,'visible','ظاهر',l.visible!==false)}${check(t,'locked','مقفل',l.locked)}</div>
    <div class="tools">${btn('front:'+l.id,'للمقدّمة','ti-arrow-bar-to-up')}${btn('up:'+l.id,'','ti-chevron-up')}${btn('down:'+l.id,'','ti-chevron-down')}${btn('back:'+l.id,'للخلف','ti-arrow-bar-to-down')}</div>
    <div class="row">${btn('unmanual:'+l.id,'أعِده للتخطيط التلقائي','ti-layout-dashboard')}${btn('dup','كرّر','ti-copy')}${btn('del','احذف','ti-trash')}</div>`,true);
  return h;
}
function textControls(l){
  const t='L:'+l.id,f=layerFont(S.doc,l),ar=isArabic(l.text);
  const fonts=allFonts();
  return `
  <div class="field"><label>النص</label><textarea ${A(t,'text')} rows="3" dir="${textDir(l)}">${esc(l.text)}</textarea></div>
  <div class="field"><label>الخط <button class="link" data-do="uploadFont">+ ارفع خطاً</button></label>
    <select ${A(t,'font','font')} class="fontsel">${fonts.map(x=>`<option value="${escAttr(x.family)}" style="font-family:'${x.family}'"${x.family===f.family?' selected':''}>${x.label} · ${x.kind}</option>`).join('')}</select>
    <div class="fontprev" style="font-family:'${f.family}';font-weight:${f.weight}">${esc(String(l.text||'نصّ تجريبي').slice(0,40))}</div></div>
  <div class="field"><label>الوزن</label>${chips(t,'weight',fontWeights(f.family).map(w=>[w,String(w)]),f.weight,'fontLock',true)}</div>
  ${sl(t,'size','الحجم',8,400,1,l.size,null,'sizeLock','px')}
  ${colorCtl(t,'color','اللون',l.color,SW(),true)}
  <div class="field"><label>المحاذاة والاتجاه</label><div class="row">${chips(t,'align',[['right','','ti-align-right'],['center','','ti-align-center'],['left','','ti-align-left']],l.align)}${chips(t,'dir',[['auto','تلقائي'],['rtl','يمين←'],['ltr','→يسار']],l.dir||'auto')}</div></div>
  ${sl(t,'lh','تباعد الأسطر',0.8,2.4,0.02,l.lh,1.3,null,'x')}
  ${ar?sl(t,'kashida','الكشيدة (تطويل عربي)',0,6,1,l.kashida,0):sl(t,'ls','تباعد الحروف',0,40,0.5,l.ls,0,'lsLock','px')}
  ${ar?'<div class="hint">تباعد الحروف يقطع وصل العربية، فالكشيدة بديله.</div>':''}
  <div class="row">${check(t,'balance','توازن الأسطر',l.balance)}${numIn(t,'maxLines','أقصى أسطر (0 = بلا حد)',l.maxLines)}</div>
  ${group('tshadow','الظل',check(t,'shadow.on','ظل خلف النص',l.shadow.on,'shadowLock')+(l.shadow.on?sl(t,'shadow.blur','التمويه',0,80,1,l.shadow.blur,20)+sl(t,'shadow.y','الإزاحة',-40,40,1,l.shadow.y,3)+sl(t,'shadow.opacity','الكثافة',0,1,.01,l.shadow.opacity,.5,null,'%')+colorCtl(t,'shadow.color','لون الظل',l.shadow.color,[C('black'),C('pine'),C('navy-deep'),C('white')]):''),l.shadow.on)}
  ${group('tbox','خلفية النص (للصور التي فيها كتابة)',check(t,'box.on','صندوق خلف النص',l.box.on)+(l.box.on?colorCtl(t,'box.color','لونه',l.box.color,SW())+sl(t,'box.opacity','كثافته',0,1,.01,l.box.opacity,.55,null,'%')+sl(t,'box.padX','حشو أفقي',0,120,1,l.box.padX,18,null,'px')+sl(t,'box.padY','حشو رأسي',0,80,1,l.box.padY,10,null,'px')+sl(t,'box.radius','استدارة',0,120,1,Math.min(120,l.box.radius),14,null,'px'):''),l.box.on)}
  ${group('tstroke','حدّ الحروف',check(t,'stroke.on','حدّ حول الحروف',l.stroke.on)+(l.stroke.on?sl(t,'stroke.w','السماكة',1,30,.5,l.stroke.w,3,null,'px')+colorCtl(t,'stroke.color','اللون',l.stroke.color,SW()):''),l.stroke.on)}
  <div class="row">${btn('copyStyle','انسخ النمط','ti-brush')}${btn('pasteStyle','الصق النمط','ti-paint')}</div>`;
}
function eagleControls(l){
  const t='L:'+l.id;
  return `
  <div class="note"><i class="ti ti-shield-check"></i> العقاب الرسمي المعتمد. النسبة مقفلة، والتدوير والقلب والظل والتوهّج ممنوعة، واللون من البدائل المعتمدة فقط (canonical-values §العقاب).</div>
  <div class="field"><label>اللون</label><div class="chips">${Object.entries(EAGLE_SCHEMES).map(([k,s])=>`<button class="chip${l.scheme===k?' active':''}" data-v="${k}" ${A(t,'scheme')}><span class="dot" style="background:${s.color||'linear-gradient(135deg,var(--eagle-grad-a),var(--eagle-grad-b))'}"></span>${s.label}</button>`).join('')}</div></div>
  ${sl(t,'w','العرض',EAGLE_MIN_W,Math.round(Math.min(S.doc.fmt.w,S.doc.fmt.h)*0.6),1,l.w,null,'eagleW','px')}
  ${sl(t,'opacity','الشفافية',EAGLE_MIN_OPACITY,1,.01,l.opacity,1,null,'%')}
  <div class="field"><label>الموضع</label><div class="chips">${[['top','أعلى الوسط'],['tr','زاوية يمنى'],['tl','زاوية يسرى'],['center','الوسط'],['bottom','أسفل الوسط']].map(([k,n])=>`<button class="chip" data-do="eaglePos:${l.id}:${k}">${n}</button>`).join('')}</div></div>
  <div class="hint">اسحبه على اللوحة لأي ارتفاع؛ الإطار المتقطّع حوله هو الحيّز الآمن (ربع عرضه).</div>`;
}
function shapeControls(l){
  const t='L:'+l.id;
  return `<div class="field"><label>الشكل</label>${chips(t,'shape',[['rect','مستطيل'],['ellipse','دائرة'],['line','خط']],l.shape)}</div>
  ${check(t,'fillOn','تعبئة',l.fillOn!==false)}${colorCtl(t,'fill','لون التعبئة',l.fill,SW(),true)}
  ${l.shape==='rect'?sl(t,'radius','استدارة',0,500,1,l.radius,0,null,'px'):''}
  ${sl(t,'strokeW','سماكة الحدّ',0,40,.5,l.strokeW,0,null,'px')}${l.strokeW?colorCtl(t,'stroke','لون الحدّ',l.stroke,SW()):''}
  ${sl(t,'opacity','الشفافية',0,1,.01,l.opacity,1,null,'%')}`;
}

function secBrand(){
  const d=S.doc,th=theme(d),eg=byRole(d,'eagle'),wm=byRole(d,'watermark'),av=byRole(d,'avatar'),sg=byRole(d,'signature');
  return `
  <div class="field"><label>الهوية</label><div class="kits">${Object.entries(KITS).map(([k,v])=>`<button class="kit${d.kit===k?' active':''}" data-do="kit:${k}"><span class="kdots">${v.swatches.slice(0,4).map(c=>`<i style="background:${c}"></i>`).join('')}</span>${v.label}<small>${v.summary||''}</small></button>`).join('')}</div></div>
  ${d.kit==='jableh'?'<div class="note">هوية جبلة: أزرق البحر ورملي دافئ وبرتقالي الحمضيات، مع أميري وتجوال وبليكس. لا يتضمن القالب شعاراً رسمياً للمدينة، ويمكنك إضافة أصل موثّق كطبقة صورة.</div>':''}
  ${d.kit==='goldblack'?'<div class="note">هوية ذهبي وأسود: خلفية فحمية أو ورقية، ولمسات ذهبية وخط كوفي محلي.</div>':''}
  <div class="field"><label>الباليتة</label>${chips('doc','palette',[['dark','داكنة'],['light','فاتحة']],d.palette)}</div>
  ${d.kit!=='khaldoun'?`
  <div class="field"><label><i class="ti ti-building-bank"></i> الجهة الموقِّعة</label><select ${A('doc','entIdx','entIdx',1)}><option value="-1"${d.entIdx<0?' selected':''}>جهة مخصّصة</option><optgroup label="جهات رسمية">${AW_ENTITIES.map((e,i)=>`<option value="${i}"${i===d.entIdx?' selected':''}>${e.ar}</option>`).join('')}</optgroup></select></div>
  ${d.entIdx<0?txt('ent','ar','اسم الجهة بالعربية',d.customEnt.ar,'ent')+txt('ent','en','الاسم بالإنجليزية (اختياري)',d.customEnt.en,'ent','','ltr')+txt('ent','handle','الحساب (اختياري، تحقّق منه قبل النشر)',d.customEnt.handle,'ent','@handle','ltr')
    :`<div class="warnbox"><i class="ti ti-alert-triangle"></i> بوسترٌ باسم جهةٍ رسمية ينتشر كأنه صادرٌ عنها. لا تنشره إلا بتفويضٍ منها، وأبقِ علامة «غير حكومي» إن لم يكن.</div>`}
  <div class="row">${check('L:'+byRole(d,'entAr').id,'visible','اسم الجهة',byRole(d,'entAr').visible)}${check('L:'+byRole(d,'entEn').id,'visible','الإنجليزي',byRole(d,'entEn').visible)}</div>`:''}
  <div class="row">${check('L:'+eg.id,'visible','العقاب',eg.visible)}${eg.visible?btn('editRole:eagle','تحكّم بالعقاب','ti-adjustments'):''}</div>
  ${d.kit==='khaldoun'?`<div class="note">هوية خلدون: التوقيع والأفاتار وحدة إلزامية، يُركَّبان من الأصل المعتمد (canonical-values §1ب).</div><div class="row">${check('L:'+av.id,'visible','الأفاتار',av.visible)}${check('L:'+sg.id,'visible','التوقيع',sg.visible)}</div>`:`<div class="row">${check('L:'+av.id,'visible','أفاتار خلدون',av.visible)}${check('L:'+sg.id,'visible','توقيع خلدون',sg.visible)}</div>`}
  ${check('L:'+wm.id,'visible','علامة «غير حكومي»',wm.visible)}${wm.visible?txt('L:'+wm.id,'text','نص العلامة',wm.text):''}
  ${group('bg','الخلفية',`${chips('bg','type',[['gradient','تدرّج'],['solid','لون واحد']],d.bg.type)}
    ${colorCtl('bg','c1','اللون الأول',d.bg.c1,SW(),true)}${d.bg.type==='gradient'?colorCtl('bg','c2','اللون الثاني',d.bg.c2,SW(),true)+sl('bg','angle','زاوية التدرّج',0,360,1,d.bg.angle,160,null,'deg'):''}
    ${check('bg','pattern','نقش النجمة الثمانية',d.bg.pattern)}${d.bg.pattern?sl('bg','patternOpacity','كثافة النقش',0,4,.05,d.bg.patternOpacity??1,1,null,'x')+sl('bg','patternSize','حجم النقش',40,400,1,d.bg.patternSize||135,135,null,'px'):''}`,true)}
  ${group('themec','ألوان عناصر الهوية',[['head','العنوان'],['sub','السطر الداعم'],['slogan','الشعار'],['accent','اللون المميّز (الأشكال)'],['text','النصوص الحرّة']].map(([k,n])=>colorCtl('theme',k,n+(d.themeOverride[k]?'':' <small>('+th[k]+')</small>'),d.themeOverride[k],SW(),true)).join('')+btn('resetTheme','أعِد ألوان الهوية','ti-restore'),d.kit==='free')}`;
}

function secSeries(){
  return `<div class="row">${btn('addSlide','أضِف التصميم الحالي','ti-plus','green')}${S.ui.slide!=null&&S.series[S.ui.slide]?btn('updateSlide','حدّث الشريحة '+(S.ui.slide+1),'ti-refresh'):''}</div>
  <div class="field" style="margin-top:12px"><label>شرائح الحملة (${S.series.length})</label><div class="plist">${S.series.map((s,i)=>`<div class="pitem"><img src="${s.thumb}" class="pthumb"><span class="pn" data-do="slide:${i}">شريحة ${i+1}</span><button data-do="delSlide:${i}"><i class="ti ti-trash"></i></button></div>`).join('')||'<div class="hint">لا شرائح بعد.</div>'}</div></div>
  ${S.series.length?btn('exportSeries','صدّر السلسلة ZIP ('+S.series.length+')','ti-package','primary'):''}
  <div class="hint" style="margin-top:12px">وحّد الوسم من «المحتوى» ليتّسق عبر الحملة، واحفظ قالباً من «التصدير» لتبدأ كل شريحة منه.</div>`;
}

function secExport(){
  const e=S.ui.export,d=S.doc,cap=d.caption||'',tags=roleText(d,'tag');
  const full=(cap+(tags?'\n\n'+tags:'')).trim(),n=[...full].length;
  const lim=[['إنستغرام',2200],['فيسبوك',63206],['إكس',280],['لينكدإن',3000]];
  return `
  <div class="field"><label>الملف</label><div class="row">${chips('exp','type',[['png','PNG'],['jpg','JPG']],e.type)}${chips('exp','scale',[['1','×1'],['2','×2']],e.scale,null,true)}</div></div>
  ${e.type==='jpg'?sl('exp','quality','الجودة',50,100,1,e.quality,92):''}
  <button class="btn primary" data-do="export"><i class="ti ti-download"></i> حمّل ${d.fmt.w*e.scale}×${d.fmt.h*e.scale}</button>
  ${group('allf','صدّر لكل المنصات',`<div class="chips">${Object.entries(FORMATS).map(([id,f])=>`<button class="chip${S.ui.allFmts.includes(id)?' active':''}" data-do="togFmt:${id}">${f.label} ${f.ratio}</button>`).join('')}</div>
    <button class="btn green sm" data-do="exportAll" style="margin-top:8px"><i class="ti ti-package"></i> ZIP بالمقاسات المختارة (${S.ui.allFmts.length})</button>
    <div class="hint">ما حرّكته بيدك ينتقل بنسبته، والباقي يعيد التخطيط ترتيبه لكل مقاس.</div>`,true)}
  ${group('cap','نصّ المنشور',`<textarea ${A('doc','caption')} rows="6" placeholder="اكتب نصّ المنشور هنا…">${esc(cap)}</textarea>
    <div class="caplim">${lim.map(([p,m])=>`<span class="${n>m?'over':''}">${p}: ${n}/${m}</span>`).join('')}</div>
    <div class="row">${btn('copyCaption','انسخ النصّ مع الوسم','ti-copy')}${btn('copyAll','انسخ كل نصوص التصميم','ti-clipboard-text')}</div>`,true)}
  ${group('proj','مشاريعي',`<div class="row"><input type="text" id="projName" placeholder="اسم المشروع"><button class="btn green sm" data-do="saveProject" style="flex:0 0 70px">احفظ</button></div>
    <input class="project-search" type="search" id="projectSearch" placeholder="ابحث في المشاريع" aria-label="ابحث في المشاريع" ${Object.keys(S.projects).length?'':'hidden'}>
    <div class="plist" id="projectList">${Object.keys(S.projects).sort((a,b)=>(S.projects[b].at||0)-(S.projects[a].at||0)).map(k=>`<div class="pitem" data-project-name="${escAttr(k.toLocaleLowerCase())}"><span class="pn" data-do="loadProject:${escAttr(k)}"><i class="ti ti-file"></i> ${esc(k)}</span><small class="project-meta">${S.projects[k].at?new Date(S.projects[k].at).toLocaleDateString('ar'):'محفوظ'}</small><button aria-label="حذف ${escAttr(k)}" data-do="delProject:${escAttr(k)}"><i class="ti ti-trash"></i></button></div>`).join('')||'<div class="hint">لا مشاريع بعد. أدخل اسماً واحفظ التصميم الحالي.</div>'}</div>`,false)}
  ${group('tpl','القوالب',`<div class="row"><input type="text" id="tplName" placeholder="اسم القالب"><button class="btn green sm" data-do="saveTemplate" style="flex:0 0 70px">احفظ</button></div>
    <div class="plist">${Object.keys(S.templates).map(k=>`<div class="pitem"><span class="pn" data-do="useTemplate:${escAttr(k)}"><i class="ti ti-template"></i> ${esc(k)}</span><button data-do="delTemplate:${escAttr(k)}"><i class="ti ti-trash"></i></button></div>`).join('')}</div>
    <div class="sub-h">قوالب البداية</div><div class="chips">${STARTERS.map(s=>`<button class="chip" data-do="starter:${s.id}">${s.label}</button>`).join('')}</div>
    <div class="hint">القالب يحفظ الطبقات والمواضع والأنماط بلا نصوص، ويُطبَّق على نصوصك وصورتك الحالية.</div>`,false)}
  ${group('backup','نسخ احتياطي واستعادة',`<div class="row"><button class="btn sm" data-do="exportBackup"><i class="ti ti-download"></i> نزّل نسخة احتياطية</button><button class="btn sm" data-do="restoreBackup"><i class="ti ti-upload"></i> استعد نسخة</button></div><div class="hint">تتضمن المشاريع والقوالب والسلسلة والصور والخطوط. الاستعادة تستبدل البيانات المحفوظة في هذا المتصفح بعد التأكيد.</div>`,false)}
  <div class="hint export-review"><b>قبل النشر:</b> راجع صحة المعلومات وحقوق الصور والشعارات، وتأكد من تفويض استخدام هوية الجهة.</div>
  ${group('prm','برومبت الصورة',`${chips('gen','promptMode',[['plate','خلفية فقط · موصى'],['full','بوستر كامل']],S.gen.promptMode)}
    <div class="prompt-box">${esc(buildPrompt(d))}</div>${btn('copyPrompt','انسخ البرومبت','ti-code')}`,false)}`;
}

/* ---------- الربط العام ---------- */
function parseVal(el){
  if(el.type==='checkbox')return el.checked;
  const raw=el.dataset.v!=null&&el.tagName==='BUTTON'?el.dataset.v:el.value;
  return el.dataset.num?(raw===''?0:+raw):raw;
}
function applyHook(act,tgt,k,v){
  const d=S.doc;
  switch(act){
    case 'sizeLock':tgt.sizeLock=true;break;
    case 'fontLock':tgt.fontLock=true;break;
    case 'font':tgt.fontLock=true;tgt.weight=nearestWeight(v,tgt.weight||layerFont(d,tgt).weight);break;
    case 'lsLock':tgt.lsLock=true;break;
    case 'shadowLock':tgt.shadowLock=true;break;
    case 'radiusLock':tgt.radiusLock=true;break;
    case 'manual':tgt.manual=true;break;
    case 'manualW':tgt.manual=true;if(tgt.type==='eagle'){tgt.w=Math.max(EAGLE_MIN_W,tgt.w);tgt.h=Math.round(tgt.w*EAGLE_RATIO);tgt.sizeLock=true;}if(tgt.type==='avatar'){tgt.h=Math.round(tgt.w/AVATAR_ASPECT);tgt.hPct=clamp(tgt.h/d.fmt.h,0.05,0.06);}break;
    case 'manualH':tgt.manual=true;if(tgt.type==='eagle'){tgt.w=Math.max(EAGLE_MIN_W,Math.round(tgt.h/EAGLE_RATIO));tgt.h=Math.round(tgt.w*EAGLE_RATIO);tgt.sizeLock=true;}break;
    case 'manualOff':tgt.manual=false;break;
    case 'eagleW':{const cx=tgt.x+tgt.w/2;tgt.w=Math.max(EAGLE_MIN_W,tgt.w);tgt.h=Math.round(tgt.w*EAGLE_RATIO);tgt.x=Math.round(cx-tgt.w/2);tgt.sizeLock=true;break;}
    case 'ent':applyEntity(d);break;
    case 'entIdx':applyEntity(d);if(d.entIdx>=0)byRole(d,'watermark').visible=true;break;
    case 'tag':break;
  }
}
function onCtl(el,final){
  const t=el.dataset.t,k=el.dataset.k;if(!t||!k)return;
  const tgt=getTarget(t);if(!tgt)return;
  const v=el.hasAttribute('data-reset')?(el.dataset.reset===''?null:(el.dataset.num?+el.dataset.reset:el.dataset.reset)):parseVal(el);
  setPath(tgt,k,v);applyHook(el.dataset.act,tgt,k,v);
  const sv=el.parentElement&&el.parentElement.querySelector('.sv');if(sv&&el.type==='range')sv.textContent=fmtV(v,sv.dataset.fmt);
  if(t==='ui'){drawOverlay();drawRulers();if(final)renderProps();return;}
  if(NO_RENDER.includes(t)){if(t==='exp'||k==='promptMode')renderProps();autosave();return;}
  if(final)commit(()=>{});else liveUpdate(true);
}
function wireProps(){
  const P=$('#props');
  P.addEventListener('input',e=>{const el=e.target;if(el.id==='projectSearch'){const q=el.value.trim().toLocaleLowerCase();P.querySelectorAll('#projectList [data-project-name]').forEach(row=>row.hidden=!row.dataset.projectName.includes(q));return;}if(el.dataset&&el.dataset.k&&el.tagName!=='SELECT'&&el.type!=='checkbox'){onCtl(el,false);if(el.dataset.k==='caption')updCaption();}});
  P.addEventListener('change',e=>{const el=e.target;if(el.dataset&&el.dataset.k){onCtl(el,true);if(el.tagName==='SELECT'||el.type==='checkbox'||el.type==='color')renderProps();}});
  P.addEventListener('click',e=>{
    const b=e.target.closest('button,[data-do],[data-sel],[data-rename]');if(!b||!P.contains(b))return;
    if(b.matches('[data-v][data-k]')||b.matches('[data-reset][data-k]')){onCtl(b,true);renderProps();return;}
    if(b.dataset.do){e.preventDefault();doAction(b.dataset.do);return;}
    if(b.dataset.sel&&!e.target.closest('button')){select([b.dataset.sel],e.shiftKey);return;}
  });
  P.addEventListener('dblclick',e=>{const r=e.target.closest('[data-rename]');if(!r)return;const l=layerById(r.dataset.rename);const n=prompt('اسم الطبقة',layerName(l));if(n!=null)commit(()=>{l.name=n.trim();}),renderProps();});
  /* قبل/بعد: ضغطٌ مطوّل يعرض الصورة بلا ضبط */
  let cmp=null;
  P.addEventListener('pointerdown',e=>{const b=e.target.closest('#cmpBtn');if(!b)return;const l=layerById(b.dataset.cmp);if(!l)return;cmp={l,adj:l.adj,preset:l.preset};l.adj=clone(ADJ_DEFAULT);requestRender();});
  const cmpEnd=()=>{if(!cmp)return;cmp.l.adj=cmp.adj;cmp=null;requestRender();};
  P.addEventListener('pointerup',cmpEnd);P.addEventListener('pointerleave',cmpEnd);
}
function updCaption(){const d=S.doc,full=((d.caption||'')+(roleText(d,'tag')?'\n\n'+roleText(d,'tag'):'')).trim(),n=[...full].length;$$('.caplim span').forEach((s,i)=>{const m=[2200,63206,280,3000][i];s.textContent=s.textContent.split(':')[0]+': '+n+'/'+m;s.classList.toggle('over',n>m);});}

function doAction(a){
  const [cmd,arg,arg2]=a.split(':');const d=S.doc;
  switch(cmd){
    case 'fmt':commit(()=>resizeDoc(d,arg));renderProps();break;
    case 'customFmt':{const w=clamp(+$('#cw').value||1080,100,6000),h=clamp(+$('#ch').value||1080,100,6000);commit(()=>resizeDoc(d,null,{w,h}));renderProps();break;}
    case 'matchImage':{const p=photoLayer(d),dm=_imgDims[p.imgId];if(!dm)return;const r=((p.rot90||0)%180)===90;const w=(r?dm.h:dm.w)*p.crop.w,h=(r?dm.w:dm.h)*p.crop.h;const k=1080/Math.min(w,h);
      commit(()=>{resizeDoc(d,null,{w:Math.min(4000,Math.round(w*k)),h:Math.min(4000,Math.round(h*k))});d.layout.imageLayout='full';});renderProps();toast('صار التصميم '+ratioName(w,h));break;}
    case 'resetLayout':commit(()=>d.layers.forEach(l=>{l.manual=false;if(l.type==='text'&&FIXED_ROLES.includes(l.role))l.sizeLock=false;if(l.type==='eagle')l.sizeLock=false;}));renderProps();toast('عادت العناصر إلى التخطيط التلقائي');break;
    case 'unmanual':commit(()=>{const l=layerById(arg);if(l){l.manual=false;l.sizeLock=false;}});renderProps();break;
    case 'uploadPhoto':case 'replacePhoto':S._imgTarget='photo';$('#imgInput').click();break;
    case 'addImage':S._imgTarget='layer';$('#imgInput').click();break;
    case 'replaceLayerImg':S._imgTarget='replace:'+arg;$('#imgInput').click();break;
    case 'removeImg':commit(()=>{const l=layerById(arg);if(!l)return;if(l.role==='photo'){l.imgId=null;l.adj=clone(ADJ_DEFAULT);l.preset='none';}else d.layers.splice(d.layers.indexOf(l),1);});S.sel=S.sel.filter(x=>x!==arg);renderProps();break;
    case 'crop':openCropModal(arg);break;
    case 'preset':{const l=layerById(arg);commit(()=>{l.adj=Object.assign(clone(ADJ_DEFAULT),{duoA:l.adj.duoA,duoB:l.adj.duoB},IMAGE_PRESETS[arg2].adj);l.preset=arg2;});renderProps();break;}
    case 'resetAdj':{const l=layerById(arg);commit(()=>{l.adj=clone(ADJ_DEFAULT);l.preset='none';l.opacity=1;l.radius=0;l.border={w:0,color:C('white')};l.fade={t:0,b:0,l:0,r:0};l.blend='source-over';});renderProps();break;}
    case 'addText':addText();break;
    case 'addShape':addShape(arg);break;
    case 'addEagle':addEagle();break;
    case 'align':alignSel(arg);break;
    case 'dist':distributeSel(arg);break;
    case 'group':groupSel();break;case 'ungroup':ungroupSel();break;
    case 'dup':duplicateSel();break;case 'copy':copyLayers();break;case 'paste':pasteLayers();break;case 'del':deleteSel();break;
    case 'vis':commit(()=>{const l=layerById(arg);l.visible=l.visible===false;});renderProps();break;
    case 'lock':commit(()=>{const l=layerById(arg);l.locked=!l.locked;});renderProps();break;
    case 'up':case 'down':case 'front':case 'back':moveLayer(arg,cmd);break;
    case 'help':$('#helpModal').hidden=false;break;
    case 'uploadFont':$('#fontInput').click();break;
    case 'copyStyle':copyStyle();break;case 'pasteStyle':pasteStyle();break;
    case 'eaglePos':{const l=layerById(arg),W=d.fmt.w,H=d.fmt.h,m=Math.round(Math.min(W,H)*0.06),ins=safeInsets(d);
      commit(()=>{if(arg2==='top'){l.x=Math.round((W-l.w)/2);l.y=ins.t+m;}else if(arg2==='tr'){l.x=W-m-l.w;l.y=ins.t+m;}else if(arg2==='tl'){l.x=m;l.y=ins.t+m;}else if(arg2==='center'){l.x=Math.round((W-l.w)/2);l.y=Math.round((H-l.h)/2);}else{l.x=Math.round((W-l.w)/2);l.y=H-ins.b-m-l.h;}l.manual=true;});break;}
    case 'editRole':{const l=byRole(d,arg);if(l){S.sel=[l.id];selectSection('edit');drawOverlay();}break;}
    case 'kit':commit(()=>{applyKit(d,arg);if(KITS[arg].defaultPalette)d.palette=KITS[arg].defaultPalette;});renderProps();toast('الهوية: '+KITS[arg].label);break;
    case 'resetTheme':commit(()=>{d.themeOverride={};d.bg.c1=null;d.bg.c2=null;});renderProps();break;
    case 'addSlide':addSlide();break;case 'updateSlide':updateSlide(S.ui.slide);break;
    case 'slide':selectSlide(+arg);break;case 'delSlide':deleteSlide(+arg);break;case 'exportSeries':exportSeries();break;
    case 'export':exportCurrent();break;
    case 'togFmt':{const i=S.ui.allFmts.indexOf(arg);if(i>-1)S.ui.allFmts.splice(i,1);else S.ui.allFmts.push(arg);renderProps();break;}
    case 'exportAll':exportAllFormats(S.ui.allFmts);break;
    case 'copyCaption':copyText(((d.caption||'')+(roleText(d,'tag')?'\n\n'+roleText(d,'tag'):'')).trim());break;
    case 'copyAll':copyText(d.layers.filter(l=>l.type==='text'&&l.visible!==false&&l.text&&l.role!=='signature').map(l=>l.text).join('\n'));break;
    case 'copyPrompt':copyText(buildPrompt(d));break;
    case 'exportBackup':exportBackup();break;
    case 'restoreBackup':$('#backupInput').click();break;
    case 'saveProject':saveProject(($('#projName').value||'').trim()||('مشروع '+new Date().toLocaleString('ar')));break;
    case 'loadProject':loadProject(a.slice(12));break;case 'delProject':deleteProject(a.slice(11));break;
    case 'saveTemplate':saveTemplate(($('#tplName').value||'').trim()||('قالب '+(Object.keys(S.templates).length+1)));break;
    case 'useTemplate':useTemplate(a.slice(12));break;case 'delTemplate':deleteTemplate(a.slice(12));break;
    case 'starter':useStarter(arg);break;
  }
}

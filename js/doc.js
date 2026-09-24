/* ===================== نموذج المستند =====================
   التصميم = مستند فيه طبقات بإحداثيات بكسل المقاس. الطبقة التي يحرّكها المستخدم تُعلَّم manual
   فلا يعود التخطيط التلقائي يلمس موضعها، وsizeLock تحفظ حجم الخط الذي اختاره. */

const ADJ_DEFAULT={exposure:0,brightness:0,contrast:0,highlights:0,shadows:0,whites:0,blacks:0,
  saturation:0,vibrance:0,temp:0,tint:0,bw:false,duotone:false,duoA:C('pine'),duoB:C('goldSoft'),
  sharpen:0,soften:0,grain:0,vignette:0,vigSize:60};

function baseLayer(type,role,extra){return Object.assign({id:uid('l'),type,role,name:'',x:0,y:0,w:100,h:100,visible:true,locked:false,opacity:1,manual:false,blend:'source-over'},extra||{});}
function textLayer(role,text,extra){return baseLayer('text',role,Object.assign({text:text||'',font:null,weight:null,size:40,sizeLock:false,color:null,align:'center',lh:1.3,ls:0,kashida:0,dir:'auto',balance:true,maxLines:0,
  shadow:{on:false,blur:20,y:3,color:C('black'),opacity:.5},box:{on:false,color:C('black'),opacity:.55,padX:18,padY:10,radius:14,stroke:'',strokeW:0},stroke:{on:false,color:C('black'),w:3}},extra||{}));}
function imageLayer(role,extra){return baseLayer('image',role,Object.assign({imgId:null,crop:{x:0,y:0,w:1,h:1},rot90:0,straighten:0,flipH:false,flipV:false,fit:'cover',fill:'blur',fillColor:C('black'),
  adj:clone(ADJ_DEFAULT),radius:0,border:{w:0,color:C('white')},fade:{t:0,b:0,l:0,r:0},preset:'none'},extra||{}));}

function newDoc(kit,fmtId,palette){
  kit=kit||'syria';const F=FORMATS[fmtId]||FORMATS.post;
  const doc={v:2,fmt:{id:FORMATS[fmtId]?fmtId:'post',w:F.w,h:F.h},kit,palette:palette||'dark',themeOverride:{},
    bg:{type:'gradient',c1:null,c2:null,angle:160,pattern:kit==='syria',patternOpacity:1,patternSize:135},
    layout:{titlePos:'top',titleOffset:0,imageLayout:'full'},
    scrim:{mode:'auto',strength:55,dir:'auto',pos:50},
    entIdx:kit==='syria'?-1:-1,customEnt:{ar:'خلدون عكرمة',en:'KHALDOUN AKRAMAH',handle:''},
    caption:'',layers:[]};
  const L=doc.layers;
  L.push(imageLayer('photo',{name:'الصورة'}));
  L.push(baseLayer('scrim','scrim'));
  L.push(baseLayer('ornament','ornament'));
  L.push(baseLayer('shape','rule',{shape:'rect',fill:null,fillOn:true,stroke:C('white'),strokeW:0,radius:2}));
  L.push(baseLayer('eagle','eagle',{scheme:'gold'}));
  L.push(textLayer('entAr',''));
  L.push(textLayer('entEn','',{dir:'ltr',ls:4}));
  L.push(textLayer('head',''));
  L.push(textLayer('sub',''));
  L.push(textLayer('slogan','',{balance:false}));
  L.push(textLayer('tag','',{balance:false,maxLines:1}));
  L.push(textLayer('handle','',{dir:'ltr',balance:false,maxLines:1}));
  L.push(textLayer('watermark','هذا الإعلان غير حكومي',{balance:false,maxLines:1,color:C('cream'),
    box:{on:true,color:C('ink'),opacity:.74,padX:18,padY:11,radius:999,stroke:'rgba(201,168,106,.6)',strokeW:1.2}}));
  L.push(baseLayer('avatar','avatar',{side:'auto',hPct:0.055}));
  L.push(textLayer('signature','@𝓚𝓱𝓪𝓵𝓭𝓸𝓾𝓷𝓐𝓴𝓻𝓪𝓶𝓪𝓱',{dir:'ltr',balance:false,maxLines:1,opacity:.15,align:'right'}));
  applyKit(doc,kit,true);
  applyEntity(doc);
  return doc;
}
const byRole=(doc,r)=>doc.layers.find(l=>l.role===r);
function photoLayer(doc){return byRole(doc,'photo');}
function hasPhoto(doc){const p=photoLayer(doc);return !!(p&&p.imgId&&p.visible!==false&&IMGS[p.imgId]);}

/* الهوية تقرّر ظهور العلامات. العقاب والزخرفة لسوريا، والأفاتار والتوقيع لخلدون (canonical-values §1ب). */
function applyKit(doc,kit,initial){
  doc.kit=kit;const m=KITS[kit].marks;
  const set=(r,v)=>{const l=byRole(doc,r);if(l)l.visible=v;};
  set('eagle',m.eagle);set('ornament',m.ornament);set('avatar',m.avatar);set('signature',m.signature);
  set('entAr',kit!=='khaldoun');set('entEn',kit!=='khaldoun');set('handle',kit!=='khaldoun');
  set('watermark',kit==='syria');
  doc.bg.pattern=kit==='syria';
  doc.themeOverride={};
  if(!initial)doc.layers.forEach(l=>{if(l.type==='text'&&!l.fontLock)l.font=null,l.weight=null;});
}
function currentEnt(doc){return doc.entIdx>=0&&AW_ENTITIES[doc.entIdx]?AW_ENTITIES[doc.entIdx]:doc.customEnt;}
function applyEntity(doc){const e=currentEnt(doc);byRole(doc,'entAr').text=e.ar||'';byRole(doc,'entEn').text=e.en||'';byRole(doc,'handle').text=e.handle||'';}
function setRoleTexts(doc,t){['head','sub','slogan','tag'].forEach(r=>{if(t[r]!=null){const l=byRole(doc,r);if(l)l.text=t[r];}});}
function roleText(doc,r){const l=byRole(doc,r);return l?l.text:'';}

/* ===================== قياس النص ===================== */
const _mctx=document.createElement('canvas').getContext('2d');
const NO_JOIN_AFTER='اأإآٱدذرزوؤةءى';
/* الكشيدة: تطويلٌ بعد حرفٍ يتّصل بما بعده، لأن letterSpacing يقطع وصل الحروف العربية */
function applyKashida(text,n){if(!n)return text;const tat='ـ'.repeat(n);
  return String(text).split(' ').map(w=>{const ch=[...w];if(ch.length<3)return w;
    for(let i=ch.length-2;i>=1;i--){const a=ch[i],b=ch[i+1];if(AR_RE.test(a)&&AR_RE.test(b)&&!NO_JOIN_AFTER.includes(a)&&!/[ً-ْ]/.test(b)){ch.splice(i+1,0,tat);return ch.join('');}}
    return w;}).join(' ');}
function wrapLines(ctx,text,maxW){const out=[];for(const para of String(text).split('\n')){const words=para.split(' ');let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){out.push(cur);cur=w;}else cur=t;}out.push(cur);}return out;}
/* توازن الأسطر: أضيق عرضٍ يعطي عدد الأسطر نفسه، فلا تبقى كلمةٌ يتيمة في السطر الأخير */
function wrapBalanced(ctx,text,maxW){const base=wrapLines(ctx,text,maxW);if(base.length<2||String(text).includes('\n'))return base;let lo=maxW*0.35,hi=maxW;for(let i=0;i<14;i++){const m=(lo+hi)/2;if(wrapLines(ctx,text,m).length<=base.length)hi=m;else lo=m;}return wrapLines(ctx,text,hi);}
function layerFont(doc,l){
  if(l.role==='signature')return {family:null,weight:400};
  const kf=kitFont(doc,l.role);const family=l.font||kf[0];return {family,weight:nearestWeight(family,l.weight||kf[1])};
}
function layerCtxFont(doc,l){const f=layerFont(doc,l);if(l.role==='signature')return `400 ${l.size}px ${SIG_FONT_STACK}`;return `${f.weight} ${l.size}px "${f.family}", "Cairo", sans-serif`;}
function spacedWidth(ctx,s,ls){let t=0;for(const ch of s)t+=ctx.measureText(ch).width+ls;return t-ls;}
function measureTextLayer(doc,l){
  const ctx=_mctx;ctx.font=layerCtxFont(doc,l);ctx.direction=textDir(l);
  const txt=applyKashida(l.text,l.kashida);
  const useLs=l.ls&&!isArabic(txt);
  const mw=Math.max(10,l.w);
  let lines=l.maxLines===1?[txt]:(l.balance?wrapBalanced(ctx,txt,mw):wrapLines(ctx,txt,mw));
  if(l.maxLines>1&&lines.length>l.maxLines)lines=lines.slice(0,l.maxLines);
  const lineH=l.size*(l.lh||1.3);
  const widths=lines.map(s=>useLs?spacedWidth(ctx,s,l.ls):ctx.measureText(s).width);
  return {lines,lineH,h:Math.max(lineH,lines.length*lineH),contentW:Math.max(0,...widths),widths,useLs};
}
/* يُقلّص حجم النص حتى يسكن عدد أسطر وارتفاعاً محدّدين */
function fitText(doc,l,start,maxLines,maxH,min){
  l.size=start;
  for(;;){const m=measureTextLayer(doc,l);if((m.lines.length<=maxLines&&m.h<=maxH)||l.size<=min)return m;l.size=Math.max(min,l.size-Math.max(2,Math.round(l.size*0.05)));}
}

/* ===================== التخطيط التلقائي =====================
   نُقل من drawPoster القديم: رأس ثم منطقة عنوان ثم تذييل، والعنوان يتقلّص حتى يسكن منطقته.
   أضيف: الأعمدة الأفقية، ومواضع الصورة الستة، وخلدون (الأفاتار والتوقيع). */
function autoLayout(doc){
  const W=doc.fmt.w,H=doc.fmt.h,ins=safeInsets(doc),k=Math.min(W,H)/1080;
  const land=W/H>=1.3, photo=hasPhoto(doc), P=photoLayer(doc);
  let IL=doc.layout.imageLayout||'full';
  if(IL==='side'&&!land)IL='panel-bottom';
  if(!photo)IL='none';
  const m=Math.round(Math.min(W,H)*0.07);
  let colX0=m,colX1=W-m;
  if(land&&(IL==='side'||IL==='full')){colX0=Math.round(W*0.48);colX1=W-m;}
  else if(land&&IL==='none'){colX0=Math.round(W*0.12);colX1=Math.round(W*0.88);}
  const cx=(colX0+colX1)/2,colW=colX1-colX0;
  const L=r=>byRole(doc,r);
  doc.layers.forEach(l=>{l._lh=false;});
  const auto=l=>l&&!l.manual;
  const setBox=(l,x,y,w,h)=>{if(auto(l)){l.x=Math.round(x);l.y=Math.round(y);l.w=Math.round(w);if(h!=null)l.h=Math.round(h);}};
  const autoSize=(l,s)=>{if(l&&!l.sizeLock)l.size=Math.round(s);};

  /* الصورة أولاً لأن «لوحة علوية» تدفع الرأس تحتها */
  let top=ins.t+Math.round(H*(land?0.08:0.074));
  if(photo&&IL==='panel-top'){setBox(P,0,0,W,Math.round(H*0.46));top=Math.round(H*0.46)+Math.round(40*k);}

  /* الرأس */
  const eg=L('eagle'),ea=L('entAr'),ee=L('entEn');
  let y=top;
  if(eg&&eg.visible){
    if(!eg.sizeLock)eg.w=Math.round(clamp(Math.min(W,H)*0.139,70,230));
    eg.w=Math.max(EAGLE_MIN_W,eg.w);eg.h=Math.round(eg.w*EAGLE_RATIO);
    if(auto(eg)){eg.x=Math.round(cx-eg.w/2);eg.y=y;}
    y+=eg.h+Math.round(eg.w*0.25);
  }
  if(ea&&ea.visible&&ea.text){autoSize(ea,36*k);setBox(ea,cx-colW/2,y,colW);const mm=measureTextLayer(doc,ea);ea.h=Math.round(mm.h);if(auto(ea))y+=mm.h+2*k;}
  if(ee&&ee.visible&&ee.text){autoSize(ee,19*k);if(!ee.lsLock)ee.ls=Math.round(4*k*10)/10;setBox(ee,cx-colW/2,y,colW);const mm=measureTextLayer(doc,ee);ee.h=Math.round(mm.h);if(auto(ee))y+=mm.h;}
  const anyHead=(eg&&eg.visible)||(ea&&ea.visible&&ea.text)||(ee&&ee.visible&&ee.text);
  const lockBottom=anyHead?y+Math.round(22*k):top;

  /* الأفاتار والتوقيع: canonical-values §1ب، والقياسات من wiki/_tools/هوية.py */
  const av=L('avatar'),sg=L('signature');
  let footReserve=0;
  if(av&&av.visible){
    const th=Math.round(H*clamp(av.hPct||0.055,0.05,0.06)),tw=Math.round(th*AVATAR_ASPECT),mg=Math.round(H*0.035);
    av.h=th;av.w=tw;if(auto(av)){av.x=W-mg-tw;av.y=H-mg-th;}
    footReserve=th+mg-Math.round(H*0.035)+Math.round(14*k);
  }
  if(sg&&sg.visible&&av){
    const th=av.h;if(!sg.sizeLock)sg.size=Math.max(9,Math.round(th*0.4));
    const mm=measureTextLayer(doc,Object.assign({},sg,{w:4000}));sg.w=Math.ceil(mm.contentW)+4;sg.h=Math.round(mm.h);
    if(auto(sg)){const gap=Math.round(av.w*0.55);sg.x=av.x-gap-sg.w;sg.y=av.y+av.h-sg.h;}
  }

  /* التذييل */
  const tg=L('tag'),hd=L('handle'),sl=L('slogan');
  const bottom=H-ins.b-Math.round(H*0.055)-footReserve;
  let rowTop=bottom;
  const rowItems=[tg,hd].filter(l=>l&&l.visible&&l.text);
  if(rowItems.length){
    rowItems.forEach(l=>{autoSize(l,26*k);});
    const ms=rowItems.map(l=>measureTextLayer(doc,Object.assign({},l,{w:4000})));
    const gap=Math.round(34*k),total=ms.reduce((a,b)=>a+b.contentW,0)+gap*(ms.length-1);
    let xr=cx+total/2;const rh=Math.max(...ms.map(x=>x.h));rowTop=bottom-rh;
    rowItems.forEach((l,i)=>{const w=Math.ceil(ms[i].contentW)+2;setBox(l,xr-w,rowTop,w,ms[i].h);xr-=w+gap;});
  }
  let footTop=rowTop;
  if(sl&&sl.visible&&sl.text){autoSize(sl,35*k);setBox(sl,cx-colW/2,0,colW);const mm=measureTextLayer(doc,sl);sl.h=Math.round(mm.h);
    if(auto(sl))sl.y=Math.round(rowTop-Math.round(10*k)-mm.h);footTop=(auto(sl)?sl.y:rowTop)-Math.round(20*k);}

  /* منطقة العنوان */
  const hdL=L('head'),sb=L('sub'),rule=L('rule');
  const photoUnder=photo&&(IL==='full'||IL==='panel-bottom'||IL==='only');
  const textOnPhoto=photo&&(IL==='full'||IL==='only');
  const bandTop=lockBottom+Math.round(14*k);
  let bandBot=footTop-Math.round(24*k);
  if(IL==='panel-bottom')bandBot=Math.min(bandBot,Math.round(H*0.64)-Math.round(30*k));
  if(IL==='framed')bandBot=bandTop+Math.round((footTop-bandTop)*0.40);
  const bandH=Math.max(60,bandBot-bandTop);
  const hideTitle=IL==='only';
  [hdL,sb,sl,rule].forEach(l=>{if(l&&hideTitle)l._lh=true;});
  let titleTop=bandTop,titleH=0,headH=0,gap=0;
  if(!hideTitle&&hdL&&sb){
    const maxW=colW*(photo?0.9:0.94);
    const subOn=sb.visible&&sb.text, headOn=hdL.visible&&hdL.text;
    if(!sb.sizeLock)sb.size=Math.round((photo?38:40)*k);
    sb.w=auto(sb)?Math.round(colW*0.86):sb.w;
    const sm=subOn?measureTextLayer(doc,sb):{h:0};
    gap=subOn&&headOn?Math.round((textOnPhoto||IL==='panel-bottom'?10:34)*k):0;
    if(auto(hdL))hdL.w=Math.round(maxW);
    const start=Math.round((photo?(land?86:76):(land?110:(W===H?92:108)))*k);
    let hm={h:0};
    if(headOn){hm=hdL.sizeLock?measureTextLayer(doc,hdL):fitText(doc,hdL,start,photo?3:4,Math.max(40,bandH-sm.h-gap),Math.round(40*k));}
    headH=hm.h;titleH=headH+gap+sm.h;
    const posK={top:photo?0:0.3,center:0.5,bottom:1}[doc.layout.titlePos]??0;
    titleTop=bandTop+(bandH-titleH)*posK;
    titleTop=Math.max(bandTop,Math.min(bandBot-titleH,titleTop+(doc.layout.titleOffset||0)));
    if(auto(hdL)){hdL.x=Math.round(cx-hdL.w/2);hdL.y=Math.round(titleTop);}hdL.h=Math.round(headH);
    if(auto(sb)){sb.x=Math.round(cx-sb.w/2);sb.y=Math.round(titleTop+headH+gap);}sb.h=Math.round(sm.h);
    if(rule){rule._lh=!!photo||!subOn||!headOn;if(auto(rule)){rule.w=Math.round(72*k);rule.h=Math.max(2,Math.round(3*k));rule.x=Math.round(cx-rule.w/2);rule.y=Math.round(titleTop+headH+gap/2-rule.h/2);}}
  }
  doc._titleCenter=(titleTop+titleH/2)/H;

  /* الصورة في بقية المواضع */
  if(photo&&auto(P)){
    if(IL==='full'||IL==='only')setBox(P,0,0,W,H);
    else if(IL==='side')setBox(P,0,0,Math.round(W*0.44),H);
    else if(IL==='panel-bottom'){const py=Math.round(clamp(titleTop+titleH+36*k,H*0.42,H*0.64));setBox(P,0,py,W,H-py);}
    else if(IL==='framed'){const fy=Math.round(titleTop+titleH+30*k),fh=Math.max(Math.round(H*0.18),footTop-Math.round(20*k)-fy);setBox(P,m,fy,W-2*m,fh);if(!P.radiusLock)P.radius=Math.round(22*k);}
  }
  if(P&&!photo)P._lh=true;

  /* التعتيم يغطي الصورة ويتبع موضعها */
  const sc=L('scrim');
  if(sc){sc._lh=!photo||!(IL==='full'||IL==='only'||IL==='panel-bottom'||IL==='panel-top');if(auto(sc))Object.assign(sc,{x:P.x,y:P.y,w:P.w,h:P.h});}

  /* الزخرفة بلا صورة، في مركز العنوان */
  const orn=L('ornament');
  if(orn){orn._lh=!!photo;
    if(auto(orn)){const R=Math.min(colW*0.44,Math.max(bandH*0.5,titleH*0.75));const s=Math.round(R*2.2);orn.w=orn.h=s;orn.x=Math.round(cx-s/2);orn.y=Math.round(titleTop+titleH/2-s/2);}}

  /* علامة غير حكومي: زاوية عليا يسرى */
  const wm=L('watermark');
  if(wm&&wm.visible){autoSize(wm,23*k);const mm=measureTextLayer(doc,Object.assign({},wm,{w:4000}));wm.w=Math.ceil(mm.contentW)+2;wm.h=Math.round(mm.h);
    if(auto(wm)){const bx=wm.box.padX*(wm.size/23);wm.x=Math.round(30*k+bx);wm.y=Math.round(ins.t+30*k+wm.box.padY);}}

  /* النصوص الحرّة: ارتفاعها من محتواها */
  doc.layers.forEach(l=>{if(l.type==='text'&&!['head','sub','entAr','entEn','slogan','tag','handle','watermark','signature'].includes(l.role))l.h=Math.round(measureTextLayer(doc,l).h);});
  doc._imageLayout=IL;
  return doc;
}
const AVATAR_ASPECT=175/420;

/* تغيير المقاس: الطبقات اليدوية تنتقل بنسبتها، والبقية يعيد التخطيط وضعها */
function resizeDoc(doc,fmtId,custom){
  const W1=doc.fmt.w,H1=doc.fmt.h;
  const F=custom||FORMATS[fmtId];if(!F)return;
  const W2=Math.round(F.w),H2=Math.round(F.h),kx=W2/W1,ky=H2/H1,s=Math.min(kx,ky);
  doc.layers.forEach(l=>{if(!l.manual)return;const cx=(l.x+l.w/2)*kx,cy=(l.y+l.h/2)*ky;l.w=Math.round(l.w*s);l.h=Math.round(l.h*s);if(l.type==='text')l.size=Math.max(8,Math.round(l.size*s));if(l.type==='eagle'){l.w=Math.max(EAGLE_MIN_W,l.w);l.h=Math.round(l.w*EAGLE_RATIO);}l.x=Math.round(cx-l.w/2);l.y=Math.round(cy-l.h/2);});
  doc.fmt={id:custom?'custom':fmtId,w:W2,h:H2};
  autoLayout(doc);
}

/* ===================== ترحيل الصيغة الأولى =====================
   اللقطة القديمة كانت: last/over/entIdx/customEnt/showEagle/palette/imgId/img/mode/titlePos/format... */
function migrateV1Snapshot(o){
  const fmt={post:'post',story:'story',square:'square'}[o.format]||'post';
  const doc=newDoc('syria',fmt,o.palette||'dark');
  doc.entIdx=o.entIdx==null?0:o.entIdx;if(o.customEnt)doc.customEnt=o.customEnt;applyEntity(doc);
  const eg=byRole(doc,'eagle');if(o.showEagle===false)eg.visible=false;
  const last=o.last||{},ov=o.over||{};
  setRoleTexts(doc,{head:ov.head??last.head??'',sub:ov.sub??last.sub??'',slogan:ov.slogan??last.slogan??'',tag:ov.tag??last.tag??''});
  const wm=byRole(doc,'watermark');wm.visible=!!o.watermark;if(o.wmText)wm.text=o.wmText;
  const P=photoLayer(doc);
  if(o.imgId){P.imgId=o.imgId;P.name=o.imgName||'الصورة';
    const g=o.img||{};const z=g.zoom||1,w=1/z;P.crop={x:(1-w)*(0.5+(g.ox||0)),y:(1-w)*(0.5+(g.oy||0)),w,h:w};
    P.adj.brightness=Math.round(((g.bright||1)-1)*100);P.adj.contrast=Math.round(((g.contrast||1)-1)*100);
    P.adj.duotone=!!g.duotone;P.adj.grain=g.grain?40:0;P.adj.vignette=g.vignette?55:0;}
  doc.layout.imageLayout=o.mode==='panel'?'panel-bottom':'full';
  doc.layout.titlePos=o.titlePos||'top';doc.layout.titleOffset=o.titleOffset||0;
  const gen={topicQuery:o.topicQuery||'',topicId:o.topicId||null,tone:o.tone||'warn',seed:o.seed||0,device:o.device||'auto',usedIdeas:o.usedIdeas||{},
    last:o.last||null,campTag:o.campTag||'',promptMode:o.promptMode||'plate'};
  return {v:2,doc,gen};
}
function upgradeSnapshot(str){
  const o=typeof str==='string'?JSON.parse(str):str;
  if(o&&o.v===2)return o;
  return migrateV1Snapshot(o||{});
}

/* ===================== القوالب ===================== */
function docToTemplate(doc){const t=clone(doc);t.layers.forEach(l=>{if(['head','sub','slogan','tag'].includes(l.role))l.text='';if(l.type==='image'&&l.role==='photo')l.imgId=null;});t.caption='';return t;}
function applyTemplate(tpl,cur){
  const d=clone(tpl);d.layers.forEach(l=>l.id=uid('l'));
  setRoleTexts(d,{head:roleText(cur,'head'),sub:roleText(cur,'sub'),slogan:roleText(cur,'slogan'),tag:roleText(cur,'tag')});
  const cp=photoLayer(cur),np=photoLayer(d);if(cp&&np&&cp.imgId){np.imgId=cp.imgId;np.crop=clone(cp.crop);np.rot90=cp.rot90;np.straighten=cp.straighten;np.flipH=cp.flipH;np.flipV=cp.flipV;}
  d.entIdx=cur.entIdx;d.customEnt=clone(cur.customEnt);applyEntity(d);d.caption=cur.caption;
  return autoLayout(d);
}

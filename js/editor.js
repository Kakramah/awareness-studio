/* ===================== المحرّر على اللوحة =====================
   اختيار · سحب · تغيير حجم · مغناطيس · اختصارات · تكبير · شبكة ومساطر */

let _rpTok=0,_rpPending=false;
function dispScale(){const v=$('#view');return v&&v.clientWidth?v.clientWidth/S.doc.fmt.w:0.5;}
function fitScale(){
  const sc=$('#stageScroll'),mobile=innerWidth<=900,W=S.doc.fmt.w,H=S.doc.fmt.h;
  const aw=sc.clientWidth-(mobile?24:56),ah=mobile?innerHeight*0.66:sc.clientHeight-44;
  return Math.max(.05,Math.min(aw/W,ah/H));
}
function requestRender(){if(_rpPending)return;_rpPending=true;requestAnimationFrame(()=>{_rpPending=false;renderPreview();});}
async function renderPreview(){
  const tok=++_rpTok;const f=fitScale()*S.ui.viewZ,dpr=Math.min(2,devicePixelRatio||1);
  const scale=clamp(f*dpr,0.15,2);
  let cv;try{cv=await renderDoc(S.doc,{scale});}catch(e){console.error(e);return;}
  if(tok!==_rpTok)return;
  const v=$('#view');v.width=cv.width;v.height=cv.height;v.getContext('2d').drawImage(cv,0,0);
  const cw=Math.round(S.doc.fmt.w*f),ch=Math.round(S.doc.fmt.h*f);
  v.style.width=cw+'px';v.style.height=ch+'px';$('#stageWrap').style.width=cw+'px';$('#stageWrap').style.height=ch+'px';
  $('#zoomLbl').textContent=S.ui.viewZ===1?'ملائم':Math.round(f*100)+'٪';
  $('#fmtLabel').textContent=(FORMATS[S.doc.fmt.id]?FORMATS[S.doc.fmt.id].label+' · ':'')+S.doc.fmt.w+'×'+S.doc.fmt.h;
  drawOverlay();drawRulers();
  const wb=$('#warnBox');if(wb)wb.innerHTML=warnHTML();
}
function setZoom(z){S.ui.viewZ=clamp(Math.round(z*4)/4,.25,4);renderPreview();}

/* ---------- الاختيار ---------- */
const layerById=id=>S.doc.layers.find(l=>l.id===id);
function selLayers(){return S.sel.map(layerById).filter(Boolean);}
function isSelectable(l){return l.visible!==false&&!l._lh&&!l.locked&&l.type!=='scrim';}
function hitTest(px,py){
  const ls=S.doc.layers;const extra=[byRole(S.doc,'avatar'),byRole(S.doc,'signature')].filter(Boolean);
  const order=[...extra,...ls.slice().reverse().filter(l=>!extra.includes(l))];
  for(const l of order){if(!isSelectable(l))continue;const pad=l.type==='text'?6:0;if(px>=l.x-pad&&px<=l.x+l.w+pad&&py>=l.y-pad&&py<=l.y+l.h+pad)return l;}
  return null;
}
function select(ids,add){
  let out=add?S.sel.slice():[];
  for(const id of ids){const l=layerById(id);if(!l)continue;const grp=l.group?S.doc.layers.filter(x=>x.group===l.group).map(x=>x.id):[id];
    for(const g of grp){if(add&&out.includes(g)&&ids.length===1)out=out.filter(x=>x!==g);else if(!out.includes(g))out.push(g);}}
  S.sel=out;drawOverlay();
  if(S.sel.length===1&&S.ui.section!=='edit'&&S.ui.section!=='layers')selectSection('edit');else renderProps();
}
function bounds(ls){const x0=Math.min(...ls.map(l=>l.x)),y0=Math.min(...ls.map(l=>l.y)),x1=Math.max(...ls.map(l=>l.x+l.w)),y1=Math.max(...ls.map(l=>l.y+l.h));return {x:x0,y:y0,w:x1-x0,h:y1-y0};}

/* ---------- الطبقة العلوية: صناديق الاختيار والمقابض والأدلة ---------- */
function drawOverlay(){
  const ov=$('#overlay');if(!ov)return;const d=dispScale();let h='';
  if(S.ui.grid){const g=Math.round(S.doc.fmt.w/12);h+=`<div class="grid" style="background-size:${g*d}px ${g*d}px"></div>`;}
  if(S.ui.safe){const ins=safeInsets(S.doc),m=Math.round(Math.min(S.doc.fmt.w,S.doc.fmt.h)*0.07);h+=`<div class="safe" style="left:${m*d}px;right:${m*d}px;top:${(ins.t+m*0.6)*d}px;bottom:${(ins.b+m*0.6)*d}px"></div>`;}
  const ls=selLayers();
  for(const l of ls){
    const lock=l.locked?' locked':'';
    h+=`<div class="selbox${lock}" style="left:${l.x*d}px;top:${l.y*d}px;width:${l.w*d}px;height:${l.h*d}px"><span class="sel-tag">${esc(layerName(l))}</span>`;
    if(ls.length===1&&!l.locked){const hs=handlesFor(l);h+=hs.map(k=>`<i class="hd hd-${k}" data-h="${k}"></i>`).join('');}
    h+='</div>';
    if(l.type==='eagle'){const sz=l.w*0.25;h+=`<div class="safezone" style="left:${(l.x-sz)*d}px;top:${(l.y-sz)*d}px;width:${(l.w+2*sz)*d}px;height:${(l.h+2*sz)*d}px"></div>`;}
  }
  (S.ui.guides||[]).forEach(g=>{h+=g.axis==='x'?`<div class="guide gx" style="left:${g.v*d}px"></div>`:`<div class="guide gy" style="top:${g.v*d}px"></div>`;});
  ov.innerHTML=h;
}
function handlesFor(l){
  if(l.type==='text')return ['w','e','nw','ne','sw','se'];
  if(l.type==='eagle'||l.type==='avatar'||l.role==='signature')return ['nw','ne','sw','se'];
  return ['nw','n','ne','e','se','s','sw','w'];
}
function layerName(l){return l.name||ROLE_LABELS[l.role]||ROLE_LABELS[l.type]||'طبقة';}

/* ---------- المساطر ---------- */
function drawRulers(){
  const rt=$('#rulerTop'),rs=$('#rulerSide');if(!rt||!rs)return;
  rt.hidden=rs.hidden=!S.ui.rulers;if(!S.ui.rulers)return;
  const d=dispScale(),v=$('#view').getBoundingClientRect(),st=$('#stageScroll').getBoundingClientRect();
  const step=d*100<40?500:(d*100<70?200:100);let a='',b='';
  for(let x=0;x<=S.doc.fmt.w;x+=step)a+=`<span style="left:${v.left-st.left+x*d}px">${x}</span>`;
  for(let y=0;y<=S.doc.fmt.h;y+=step)b+=`<span style="top:${v.top-st.top+y*d}px">${y}</span>`;
  rt.innerHTML=a;rs.innerHTML=b;
}

/* ---------- المغناطيس ---------- */
function snapTargets(excl){
  const W=S.doc.fmt.w,H=S.doc.fmt.h,m=Math.round(Math.min(W,H)*0.07);
  const xs=[0,W/2,W,m,W-m],ys=[0,H/2,H,m,H-m];
  S.doc.layers.forEach(l=>{if(excl.includes(l.id)||l.visible===false||l._lh||l.type==='scrim'||l.role==='photo'&&l.w>=W-1)return;xs.push(l.x,l.x+l.w/2,l.x+l.w);ys.push(l.y,l.y+l.h/2,l.y+l.h);});
  return {xs,ys};
}
function snapBox(b,excl){
  if(!S.ui.snap)return {dx:0,dy:0,guides:[]};
  const t=snapTargets(excl),th=7/dispScale();let best={dx:0,dy:0},gx=null,gy=null,bx=th,by=th;
  for(const v of [b.x,b.x+b.w/2,b.x+b.w])for(const tx of t.xs){const dd=tx-v;if(Math.abs(dd)<bx){bx=Math.abs(dd);best.dx=dd;gx=tx;}}
  for(const v of [b.y,b.y+b.h/2,b.y+b.h])for(const ty of t.ys){const dd=ty-v;if(Math.abs(dd)<by){by=Math.abs(dd);best.dy=dd;gy=ty;}}
  const guides=[];if(gx!=null)guides.push({axis:'x',v:gx});if(gy!=null)guides.push({axis:'y',v:gy});
  return {dx:gx!=null?best.dx:0,dy:gy!=null?best.dy:0,guides};
}

/* ---------- السحب وتغيير الحجم ---------- */
let _drag=null;
/* مقاييس اللوحة تُثبَّت لحظة الضغط، فلا يختلّ السحب إن تغيّر حجم المعاينة أثناءه */
function docPoint(e,rect){const r=rect||$('#view').getBoundingClientRect(),d=r.width/S.doc.fmt.w;return {x:(e.clientX-r.left)/d,y:(e.clientY-r.top)/d};}
function wireEditor(){
  const ov=$('#overlay');
  ov.addEventListener('pointerdown',e=>{
    if(e.button>0)return;const rect=$('#view').getBoundingClientRect();const p=docPoint(e,rect);const h=e.target.dataset&&e.target.dataset.h;
    if(h&&S.sel.length===1){const l=layerById(S.sel[0]);_drag={mode:'resize',h,p0:p,l0:clone(l),id:l.id,moved:false,rect};try{ov.setPointerCapture(e.pointerId);}catch(_){}e.preventDefault();return;}
    const hit=hitTest(p.x,p.y);
    if(!hit){if(!e.shiftKey){S.sel=[];drawOverlay();renderProps();}return;}
    if(!S.sel.includes(hit.id)||e.shiftKey)select([hit.id],e.shiftKey);
    const ls=selLayers().filter(l=>!l.locked);
    _drag={mode:'move',p0:p,start:ls.map(l=>({id:l.id,x:l.x,y:l.y})),moved:false,rect};try{ov.setPointerCapture(e.pointerId);}catch(_){}e.preventDefault();
  });
  ov.addEventListener('pointermove',e=>{
    if(!_drag)return;const p=docPoint(e,_drag.rect),dx=p.x-_drag.p0.x,dy=p.y-_drag.p0.y;
    if(!_drag.moved&&Math.hypot(dx,dy)*dispScale()<3)return;_drag.moved=true;
    if(_drag.mode==='move'){
      const ls=_drag.start.map(s=>layerById(s.id));
      _drag.start.forEach((s,i)=>{ls[i].x=Math.round(s.x+dx);ls[i].y=Math.round(s.y+dy);});
      const sn=e.altKey?{dx:0,dy:0,guides:[]}:snapBox(bounds(ls),ls.map(l=>l.id));
      ls.forEach(l=>{l.x=Math.round(l.x+sn.dx);l.y=Math.round(l.y+sn.dy);l.manual=true;});
      S.ui.guides=sn.guides;
    }else resizeDrag(layerById(_drag.id),_drag,dx,dy,e.shiftKey);
    liveUpdate(false);
  });
  const end=()=>{if(!_drag)return;const moved=_drag.moved;_drag=null;S.ui.guides=[];if(moved)commit(()=>{});else drawOverlay();};
  ov.addEventListener('pointerup',end);ov.addEventListener('pointercancel',end);
  ov.addEventListener('dblclick',e=>{const p=docPoint(e);const l=hitTest(p.x,p.y);if(!l)return;
    if(l.type==='image')openCropModal(l.id);else if(l.type==='text'){select([l.id]);selectSection('edit');setTimeout(()=>{const t=$('#props textarea[data-k="text"]');if(t){t.focus();t.select();}},30);}});

  /* تكبير: Ctrl+عجلة، والقرص بإصبعين */
  const sc=$('#stageScroll');
  sc.addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();setZoom(S.ui.viewZ*(e.deltaY<0?1.12:0.89));},{passive:false});
  const pts=new Map();let pinch=null;
  sc.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;pts.set(e.pointerId,e);if(pts.size===2){const [a,b]=[...pts.values()];pinch={d0:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),z0:S.ui.viewZ};_drag=null;}});
  sc.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,e);if(pinch&&pts.size===2){const [a,b]=[...pts.values()];const dd=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);S.ui.viewZ=clamp(pinch.z0*dd/pinch.d0,.25,4);requestRender();}});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;};sc.addEventListener('pointerup',up);sc.addEventListener('pointercancel',up);
  sc.addEventListener('scroll',()=>drawRulers());
  document.addEventListener('keydown',onKey);
  addEventListener('resize',debounce(()=>renderPreview(),120));
}
function resizeDrag(l,dr,dx,dy,keep){
  const o=dr.l0,h=dr.h;let x=o.x,y=o.y,w=o.w,hh=o.h;
  if(h.includes('e'))w=o.w+dx;if(h.includes('w')){w=o.w-dx;x=o.x+dx;}
  if(h.includes('s'))hh=o.h+dy;if(h.includes('n')){hh=o.h-dy;y=o.y+dy;}
  w=Math.max(12,w);hh=Math.max(8,hh);
  if(l.type==='text'){
    if(h.length===2){const k=w/o.w;l.size=Math.max(6,Math.round(o.size*k));l.sizeLock=true;}
    l.w=Math.round(w);l.x=Math.round(h.includes('w')?o.x+o.w-w:o.x);l.y=o.y;
  }else if(l.type==='eagle'||l.type==='avatar'||l.role==='signature'){
    let nw=Math.max(l.type==='eagle'?EAGLE_MIN_W:12,w);
    if(l.type==='avatar'){const H=S.doc.fmt.h;const nh=clamp(nw/AVATAR_ASPECT,H*0.05,H*0.06);l.hPct=nh/H;nw=nh*AVATAR_ASPECT;}
    const ratio=l.type==='eagle'?EAGLE_RATIO:(o.h/o.w);
    l.w=Math.round(nw);l.h=Math.round(nw*ratio);
    if(l.role==='signature'){l.size=Math.max(6,Math.round(o.size*nw/o.w));l.sizeLock=true;}
    l.x=Math.round(h.includes('w')?o.x+o.w-l.w:o.x);l.y=Math.round(h.includes('n')?o.y+o.h-l.h:o.y);
    if(l.type==='eagle')l.sizeLock=true;
  }else{
    if(keep||l.role==='ornament'){const r=o.w/o.h;if(h.length===2){hh=w/r;if(h.includes('n'))y=o.y+o.h-hh;}else if(h==='n'||h==='s')w=hh*r;else hh=w/r;}
    Object.assign(l,{x:Math.round(x),y:Math.round(y),w:Math.round(w),h:Math.round(hh)});
    if(l.type==='image')l.radiusLock=true;
  }
  l.manual=true;
}
function liveUpdate(relayout){if(relayout!==false)autoLayout(S.doc);requestRender();}

/* ---------- الاختصارات ---------- */
function onKey(e){
  const tag=(e.target.tagName||'').toLowerCase();const typing=tag==='input'||tag==='textarea'||tag==='select'||e.target.isContentEditable;
  const mod=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();
  if(mod&&k==='z'&&!typing){e.preventDefault();e.shiftKey?redo():undo();return;}
  if(mod&&k==='y'&&!typing){e.preventDefault();redo();return;}
  if(typing)return;
  if(e.key==='Escape'){if(!$('#cropModal').hidden){$('#cropCancel').click();return;}if(!$('#helpModal').hidden){$('#helpModal').hidden=true;return;}S.sel=[];drawOverlay();renderProps();return;}
  if(e.key==='?'){$('#helpModal').hidden=false;return;}
  if(mod&&e.altKey&&k==='c'){e.preventDefault();copyStyle();return;}
  if(mod&&e.altKey&&k==='v'){e.preventDefault();pasteStyle();return;}
  if(mod&&k==='c'){e.preventDefault();copyLayers();return;}
  if(mod&&k==='v'){e.preventDefault();pasteLayers();return;}
  if(mod&&k==='d'){e.preventDefault();duplicateSel();return;}
  if(mod&&k==='g'){e.preventDefault();e.shiftKey?ungroupSel():groupSel();return;}
  if(mod&&(k==='='||k==='+')){e.preventDefault();setZoom(S.ui.viewZ*1.25);return;}
  if(mod&&k==='-'){e.preventDefault();setZoom(S.ui.viewZ/1.25);return;}
  if(mod&&k==='0'){e.preventDefault();setZoom(1);return;}
  if(!S.sel.length)return;
  if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();deleteSel();return;}
  const st=e.shiftKey?10:1,mv={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,-st],ArrowDown:[0,st]}[e.key];
  if(mv){e.preventDefault();commit(()=>selLayers().forEach(l=>{if(l.locked)return;l.x+=mv[0];l.y+=mv[1];l.manual=true;}));}
}

/* ---------- عمليات على الاختيار ---------- */
const FIXED_ROLES=['photo','scrim','ornament','rule','eagle','entAr','entEn','head','sub','slogan','tag','handle','watermark','avatar','signature'];
function deleteSel(){commit(()=>{selLayers().forEach(l=>{if(FIXED_ROLES.includes(l.role))l.visible=false;else S.doc.layers.splice(S.doc.layers.indexOf(l),1);});S.sel=[];});renderProps();toast('حُذف (الطبقات الأساسية تُخفى، وتُظهرها من «الطبقات»)');}
function cloneAsFree(l){const c=clone(l);c.id=uid('l');c.group=null;
  if(FIXED_ROLES.includes(c.role)){c.role=c.type==='text'?'free':c.type==='image'?'logo':c.type==='eagle'?'eagleX':c.type==='shape'?'shape':c.role;}
  if(c.type==='text'&&!c.color){c.color=textColor(S.doc,l,theme(S.doc));}c.manual=true;return c;}
function copyableSel(){return selLayers().filter(l=>!['scrim','avatar','signature','ornament'].includes(l.type)&&l.role!=='signature');}
function duplicateSel(){const src=copyableSel();if(!src.length)return;const out=[];commit(()=>{src.forEach(l=>{const c=cloneAsFree(l);c.x+=24;c.y+=24;S.doc.layers.splice(S.doc.layers.indexOf(l)+1,0,c);out.push(c.id);});});S.sel=out;drawOverlay();renderProps();}
function copyLayers(){const src=copyableSel();if(!src.length)return;const data=JSON.stringify(src.map(l=>clone(l)));S.clip=data;try{sessionStorage.setItem('aw_clip',data);}catch(e){}toast('نُسخ '+src.length+' عنصر');}
function pasteLayers(){let data=S.clip;try{data=data||sessionStorage.getItem('aw_clip');}catch(e){}if(!data)return;const arr=JSON.parse(data);const out=[];
  commit(()=>{arr.forEach(l=>{const c=cloneAsFree(l);c.x+=24;c.y+=24;S.doc.layers.push(c);out.push(c.id);});});S.sel=out;drawOverlay();renderProps();toast('لُصق ✓');}
const STYLE_KEYS=['font','weight','size','sizeLock','color','align','lh','ls','kashida','shadow','box','stroke','opacity'];
function copyStyle(){const l=selLayers().find(x=>x.type==='text');if(!l){toast('اختر نصاً أولاً');return;}S.styleClip=clone(Object.fromEntries(STYLE_KEYS.map(k=>[k,l[k]])));if(!S.styleClip.color)S.styleClip.color=textColor(S.doc,l,theme(S.doc));toast('نُسخ النمط');}
function pasteStyle(){if(!S.styleClip){toast('لا نمط منسوخ');return;}commit(()=>selLayers().filter(x=>x.type==='text').forEach(l=>Object.assign(l,clone(S.styleClip))));renderProps();toast('لُصق النمط ✓');}
function groupSel(){const ls=selLayers();if(ls.length<2)return;const g=uid('g');commit(()=>ls.forEach(l=>l.group=g));toast('جُمعت '+ls.length);}
function ungroupSel(){commit(()=>selLayers().forEach(l=>l.group=null));toast('فُكّ التجميع');}
function alignSel(how){
  const ls=selLayers().filter(l=>!l.locked);if(!ls.length)return;
  const ref=ls.length===1?{x:0,y:0,w:S.doc.fmt.w,h:S.doc.fmt.h}:bounds(ls);
  commit(()=>ls.forEach(l=>{
    if(how==='right')l.x=ref.x+ref.w-l.w;else if(how==='cx')l.x=Math.round(ref.x+(ref.w-l.w)/2);else if(how==='left')l.x=ref.x;
    else if(how==='top')l.y=ref.y;else if(how==='cy')l.y=Math.round(ref.y+(ref.h-l.h)/2);else if(how==='bottom')l.y=ref.y+ref.h-l.h;
    l.manual=true;}));
}
function distributeSel(axis){
  const ls=selLayers().filter(l=>!l.locked);if(ls.length<3){toast('التوزيع يحتاج ثلاثة عناصر أو أكثر');return;}
  const k=axis==='x'?'x':'y',s=axis==='x'?'w':'h';ls.sort((a,b)=>a[k]-b[k]);
  const first=ls[0],last=ls[ls.length-1];const total=ls.reduce((a,l)=>a+l[s],0);const gap=(last[k]+last[s]-first[k]-total)/(ls.length-1);
  commit(()=>{let pos=first[k];ls.forEach(l=>{l[k]=Math.round(pos);pos+=l[s]+gap;l.manual=true;});});
}
function moveLayer(id,dir){const L=S.doc.layers,i=L.findIndex(l=>l.id===id);if(i<0)return;let j=dir==='up'?i+1:dir==='down'?i-1:dir==='front'?L.length-1:0;j=clamp(j,0,L.length-1);if(i===j)return;commit(()=>{const [l]=L.splice(i,1);L.splice(j,0,l);});renderProps();}

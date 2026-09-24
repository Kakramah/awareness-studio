/* ===================== معالجة الصورة =====================
   كل الضبط يُحسب بالبكسل (لا ctx.filter) فيطابق Safari وChrome، ولا يمسّ الأصل المخزّن. */

const RATIOS=[['16:9',16/9],['9:16',9/16],['1:1',1],['4:5',4/5],['5:4',5/4],['3:4',3/4],['4:3',4/3],['2:3',2/3],['3:2',3/2],['1.91:1',1.91],['21:9',21/9]];
function ratioName(w,h){const r=w/h;for(const [n,v] of RATIOS)if(Math.abs(r-v)/v<0.025)return n;return (r>=1?r.toFixed(2)+':1':'1:'+(1/r).toFixed(2));}
function orientName(w,h){const r=w/h;return r>1.05?'أفقية':r<0.95?'عمودية':'مربّعة';}

const IMAGE_PRESETS={
  none:{label:'بلا فلتر',adj:{}},
  documentary:{label:'وثائقي',adj:{contrast:15,saturation:-25,temp:-6,grain:25,vignette:30,highlights:-15,shadows:12}},
  warm:{label:'دافئ',adj:{temp:30,saturation:8,vibrance:18,exposure:4}},
  cool:{label:'بارد',adj:{temp:-30,tint:-4,saturation:-6}},
  faded:{label:'باهت',adj:{contrast:-25,blacks:40,saturation:-22,highlights:-10}},
  punchy:{label:'حادّ',adj:{contrast:30,vibrance:30,sharpen:30,blacks:-15}},
  night:{label:'ليلي',adj:{exposure:-25,temp:-35,saturation:-20,contrast:15,vignette:45}},
  mono:{label:'أبيض وأسود',adj:{bw:true,contrast:20,grain:18}},
  duo:{label:'دوتون الهوية',adj:{duotone:true,contrast:10}}
};

/* ---------- الهندسة: تدوير 90° وقلب وتقويم ---------- */
const _geoCache=new Map();
function lruSet(map,k,v,max){map.set(k,v);if(map.size>max)map.delete(map.keys().next().value);}
async function orientedCanvas(l){
  const src=IMGS[l.imgId];if(!src)return null;
  const key=[l.imgId,l.rot90,l.flipH,l.flipV,l.straighten].join('|');
  if(_geoCache.has(key))return _geoCache.get(key);
  const im=await loadImage(src);
  const r=((l.rot90||0)%360+360)%360,swap=r===90||r===270;
  const w=swap?im.height:im.width,h=swap?im.width:im.height;
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
  x.translate(w/2,h/2);x.rotate(r*Math.PI/180);
  const th=(l.straighten||0)*Math.PI/180;
  if(th){x.rotate(th);const f=Math.cos(Math.abs(th))+Math.sin(Math.abs(th))*Math.max(w/h,h/w);x.scale(f,f);}
  x.scale(l.flipH?-1:1,l.flipV?-1:1);
  x.drawImage(im,-im.width/2,-im.height/2);
  lruSet(_geoCache,key,c,8);return c;
}

/* ---------- الضبط اللوني بالبكسل ---------- */
function adjActive(a){return a.exposure||a.brightness||a.contrast||a.highlights||a.shadows||a.whites||a.blacks||a.saturation||a.vibrance||a.temp||a.tint||a.bw||a.duotone;}
function applyTone(id,a){
  const d=id.data,ev=Math.pow(2,(a.exposure||0)/50),br=(a.brightness||0)/100*0.35,ct=1+(a.contrast||0)/100,
    hl=(a.highlights||0)/100,sh=(a.shadows||0)/100,b0=-(a.blacks||0)/100*0.12,w0=1-(a.whites||0)/100*0.12,
    sat=1+(a.saturation||0)/100,vib=(a.vibrance||0)/100,tp=(a.temp||0)/100*0.12,ti=(a.tint||0)/100*0.10;
  const A=hexToRgb(a.duoA||C('pine')).map(v=>v/255),B=hexToRgb(a.duoB||C('goldSoft')).map(v=>v/255);
  for(let i=0;i<d.length;i+=4){
    let r=d[i]/255*ev,g=d[i+1]/255*ev,b=d[i+2]/255*ev;
    r+=tp;b-=tp;g-=ti;
    let L=.2126*r+.7152*g+.0722*b;
    const dl=sh*0.4*Math.pow(1-clamp(L,0,1),3)+hl*0.4*Math.pow(clamp(L,0,1),3);
    r+=dl;g+=dl;b+=dl;
    r=(r-b0)/(w0-b0);g=(g-b0)/(w0-b0);b=(b-b0)/(w0-b0);
    r+=br;g+=br;b+=br;
    r=(r-.5)*ct+.5;g=(g-.5)*ct+.5;b=(b-.5)*ct+.5;
    L=.2126*r+.7152*g+.0722*b;
    if(sat!==1||vib){const mx=Math.max(r,g,b),mn=Math.min(r,g,b),s=mx-mn;const f=sat*(1+vib*(1-clamp(s,0,1)));r=L+(r-L)*f;g=L+(g-L)*f;b=L+(b-L)*f;}
    if(a.bw){r=g=b=L;}
    if(a.duotone){const t=clamp(L,0,1);r=A[0]+(B[0]-A[0])*t;g=A[1]+(B[1]-A[1])*t;b=A[2]+(B[2]-A[2])*t;}
    d[i]=r*255;d[i+1]=g*255;d[i+2]=b*255;
  }
}
function applySharpen(id,amt){
  const w=id.width,h=id.height,s=id.data,o=new Uint8ClampedArray(s);const k=amt/100*1.4;
  for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=(y*w+x)*4;
    for(let c=0;c<3;c++){const v=s[i+c],bl=(s[i-4+c]+s[i+4+c]+s[i-w*4+c]+s[i+w*4+c]+v*4)/8;o[i+c]=v+k*(v-bl);}}
  s.set(o);
}
let _grainTile;
function grainTile(){if(_grainTile)return _grainTile;const n=180,c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');const d=x.createImageData(n,n);for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255;}x.putImageData(d,0,0);_grainTile=c;return c;}
function softBlur(src,w,h,f){const sw=Math.max(1,Math.round(w/f)),sh=Math.max(1,Math.round(h/f));const t=document.createElement('canvas');t.width=sw;t.height=sh;const tx=t.getContext('2d');tx.imageSmoothingQuality='high';tx.drawImage(src,0,0,sw,sh);return t;}

/* ---------- تركيب الصورة في صندوقها ---------- */
const _photoCache=new Map();
async function renderPhoto(l,bw,bh,scale){
  const ow=Math.max(1,Math.round(bw*scale)),oh=Math.max(1,Math.round(bh*scale));
  const key=JSON.stringify([l.imgId,l.rot90,l.flipH,l.flipV,l.straighten,l.crop,l.fit,l.fill,l.fillColor,l.adj,l.radius,l.border,l.fade,ow,oh,scale]);
  if(_photoCache.has(key))return _photoCache.get(key);
  const src=await orientedCanvas(l);if(!src)return null;
  const c=document.createElement('canvas');c.width=ow;c.height=oh;const x=c.getContext('2d');x.imageSmoothingQuality='high';
  const cr=l.crop||{x:0,y:0,w:1,h:1};
  let sx=cr.x*src.width,sy=cr.y*src.height,sw=cr.w*src.width,sh=cr.h*src.height;
  if(l.fit==='contain'){
    if(l.fill==='blur'){const t=softBlur(src,src.width,src.height,40);const r=Math.max(ow/t.width,oh/t.height);x.drawImage(t,(ow-t.width*r)/2,(oh-t.height*r)/2,t.width*r,t.height*r);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,0,ow,oh);}
    else if(l.fill==='color'){x.fillStyle=l.fillColor||C('black');x.fillRect(0,0,ow,oh);}
    const r=Math.min(ow/sw,oh/sh);const dw=sw*r,dh=sh*r;x.drawImage(src,sx,sy,sw,sh,(ow-dw)/2,(oh-dh)/2,dw,dh);
  }else{
    /* ملء: جزءٌ مركزيّ من منطقة القصّ بنسبة الصندوق */
    const br=ow/oh;if(sw/sh>br){const nw=sh*br;sx+=(sw-nw)/2;sw=nw;}else{const nh=sw/br;sy+=(sh-nh)/2;sh=nh;}
    x.drawImage(src,sx,sy,sw,sh,0,0,ow,oh);
  }
  const a=l.adj||ADJ_DEFAULT;
  if(a.soften>0){const t=softBlur(c,ow,oh,1+a.soften/12);x.clearRect(0,0,ow,oh);x.drawImage(t,0,0,ow,oh);}
  if(adjActive(a)||a.sharpen>0){const id=x.getImageData(0,0,ow,oh);if(adjActive(a))applyTone(id,a);if(a.sharpen>0)applySharpen(id,a.sharpen);x.putImageData(id,0,0);}
  if(a.vignette>0){const g=x.createRadialGradient(ow/2,oh/2,Math.min(ow,oh)*(a.vigSize||60)/100*0.6,ow/2,oh/2,Math.hypot(ow,oh)/2);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a.vignette/100*0.85})`);x.fillStyle=g;x.fillRect(0,0,ow,oh);}
  if(a.grain>0){x.save();x.globalAlpha=a.grain/100*0.28;x.globalCompositeOperation='overlay';const t=grainTile();for(let yy=0;yy<oh;yy+=t.height)for(let xx=0;xx<ow;xx+=t.width)x.drawImage(t,xx,yy);x.restore();}
  const f=l.fade||{};
  if(f.t||f.b||f.l||f.r){x.save();x.globalCompositeOperation='destination-out';
    const edge=(x0,y0,x1,y1,rx,ry,rw,rh)=>{const g=x.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(rx,ry,rw,rh);};
    if(f.t){const d=oh*f.t/100;edge(0,0,0,d,0,0,ow,d);}if(f.b){const d=oh*f.b/100;edge(0,oh,0,oh-d,0,oh-d,ow,d);}
    if(f.r){const d=ow*f.r/100;edge(ow,0,ow-d,0,ow-d,0,d,oh);}if(f.l){const d=ow*f.l/100;edge(0,0,d,0,0,0,d,oh);}x.restore();}
  const rad=(l.radius||0)*scale;
  if(rad>0){x.save();x.globalCompositeOperation='destination-in';roundRect(x,0,0,ow,oh,rad);x.fillStyle=C('black');x.fill();x.restore();}
  if(l.border&&l.border.w>0){const bwid=l.border.w*scale;x.save();x.lineWidth=bwid;x.strokeStyle=l.border.color||C('white');roundRect(x,bwid/2,bwid/2,ow-bwid,oh-bwid,Math.max(0,rad-bwid/2));x.stroke();x.restore();}
  lruSet(_photoCache,key,c,10);return c;
}

/* ===================== نافذة القصّ ===================== */
let _crop=null;
async function openCropModal(layerId){
  const doc=S.doc,l=doc.layers.find(x=>x.id===layerId);if(!l||!l.imgId)return;
  await ensureImg(l.imgId);
  const im=await loadImage(IMGS[l.imgId]);
  _crop={id:layerId,orig:clone({crop:l.crop,rot90:l.rot90,flipH:l.flipH,flipV:l.flipV,straighten:l.straighten,fit:l.fit}),work:clone({crop:l.crop,rot90:l.rot90,flipH:l.flipH,flipV:l.flipV,straighten:l.straighten,fit:l.fit,imgId:l.imgId}),ratio:'free',im};
  const box=l.w/l.h;
  $('#cropModal').hidden=false;
  $('#cropInfo').innerHTML=`<b>${orientName(im.width,im.height)} <bdi dir="ltr">${ratioName(im.width,im.height)}</bdi></b> · <bdi dir="ltr">${im.width}×${im.height}px</bdi>`;
  const ratios=[['free','حرّ'],['frame','الإطار ('+ratioName(Math.round(l.w),Math.round(l.h))+')'],['orig','الأصلية'],['16:9','16:9'],['9:16','9:16'],['1:1','1:1'],['4:5','4:5'],['3:4','3:4'],['2:3','2:3'],['1.91:1','1.91:1']];
  $('#cropRatios').innerHTML=ratios.map(([k,v])=>`<button class="chip${k==='free'?' active':''}" data-cr="${k}">${v}</button>`).join('');
  $$('#cropRatios .chip').forEach(b=>b.onclick=()=>{_crop.ratio=b.dataset.cr;$$('#cropRatios .chip').forEach(x=>x.classList.toggle('active',x===b));lockCropRatio(box);drawCrop();});
  $('#cropStraight').value=_crop.work.straighten||0;$('#cropStraightV').textContent=(_crop.work.straighten||0)+'°';
  $$('#cropFit .chip').forEach(b=>b.classList.toggle('active',b.dataset.fit===(_crop.work.fit||'cover')));
  await drawCrop();
}
function cropSrcRatio(){const w=_crop.work,r=((w.rot90||0)%180+180)%180;const im=_crop.im;return r===90?im.height/im.width:im.width/im.height;}
function lockCropRatio(frameRatio){
  const c=_crop.work.crop,sr=cropSrcRatio();let want=null;
  if(_crop.ratio==='frame')want=frameRatio;else if(_crop.ratio==='orig')want=sr;else if(_crop.ratio!=='free'){const p=RATIOS.find(x=>x[0]===_crop.ratio);want=p?p[1]:null;}
  if(!want)return;
  /* الإحداثيات نسبية: عرض منطقة القصّ بالبكسل = c.w*sr، والارتفاع = c.h */
  const cx=c.x+c.w/2,cy=c.y+c.h/2;let w=c.w,h=c.w*sr/want;if(h>1){h=1;w=want/sr;}if(w>1){w=1;h=sr/want;}
  c.w=w;c.h=h;c.x=clamp(cx-w/2,0,1-w);c.y=clamp(cy-h/2,0,1-h);
}
async function drawCrop(){
  if(!_crop)return;const cv=$('#cropCanvas'),wrap=$('#cropStage');
  const src=await orientedCanvas(Object.assign({},_crop.work));if(!src)return;
  const aw=wrap.clientWidth-20,ah=wrap.clientHeight-20;const k=Math.min(aw/src.width,ah/src.height);
  cv.width=Math.round(src.width*k);cv.height=Math.round(src.height*k);
  const x=cv.getContext('2d');x.drawImage(src,0,0,cv.width,cv.height);
  const c=_crop.work.crop;const rx=c.x*cv.width,ry=c.y*cv.height,rw=c.w*cv.width,rh=c.h*cv.height;
  x.save();x.fillStyle='rgba(0,0,0,.55)';x.beginPath();x.rect(0,0,cv.width,cv.height);x.rect(rx,ry,rw,rh);x.fill('evenodd');
  x.strokeStyle=C('goldSoft');x.lineWidth=2;x.strokeRect(rx,ry,rw,rh);
  x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=1;for(let i=1;i<3;i++){x.beginPath();x.moveTo(rx+rw*i/3,ry);x.lineTo(rx+rw*i/3,ry+rh);x.moveTo(rx,ry+rh*i/3);x.lineTo(rx+rw,ry+rh*i/3);x.stroke();}
  x.fillStyle=C('goldSoft');[[rx,ry],[rx+rw,ry],[rx,ry+rh],[rx+rw,ry+rh]].forEach(([px,py])=>x.fillRect(px-7,py-7,14,14));x.restore();
  const pw=Math.round(c.w*src.width),ph=Math.round(c.h*src.height);$('#cropDims').innerHTML=`القصّ: <bdi dir="ltr">${pw}×${ph}px</bdi> · <bdi dir="ltr">${ratioName(pw,ph)}</bdi>`;
}
function wireCropModal(){
  const cv=$('#cropCanvas');let drag=null;
  const pos=e=>{const r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};};
  cv.addEventListener('pointerdown',e=>{if(!_crop)return;const p=pos(e),c=_crop.work.crop;const hs=14/cv.getBoundingClientRect().width;
    const corners={nw:[c.x,c.y],ne:[c.x+c.w,c.y],sw:[c.x,c.y+c.h],se:[c.x+c.w,c.y+c.h]};
    let mode='move';for(const k in corners){const [qx,qy]=corners[k];if(Math.abs(p.x-qx)<hs*1.4&&Math.abs(p.y-qy)<hs*1.4*cv.width/cv.height)mode=k;}
    if(mode==='move'&&!(p.x>c.x&&p.x<c.x+c.w&&p.y>c.y&&p.y<c.y+c.h))mode='new';
    drag={mode,p0:p,c0:clone(c)};try{cv.setPointerCapture(e.pointerId);}catch(_){}});
  cv.addEventListener('pointermove',e=>{if(!drag)return;const p=pos(e),c=_crop.work.crop,c0=drag.c0,dx=p.x-drag.p0.x,dy=p.y-drag.p0.y;
    if(drag.mode==='move'){c.x=clamp(c0.x+dx,0,1-c.w);c.y=clamp(c0.y+dy,0,1-c.h);}
    else{let x0=c0.x,y0=c0.y,x1=c0.x+c0.w,y1=c0.y+c0.h;
      if(drag.mode==='new'){x0=Math.min(drag.p0.x,p.x);x1=Math.max(drag.p0.x,p.x);y0=Math.min(drag.p0.y,p.y);y1=Math.max(drag.p0.y,p.y);}
      else{if(drag.mode.includes('w'))x0=p.x;if(drag.mode.includes('e'))x1=p.x;if(drag.mode.includes('n'))y0=p.y;if(drag.mode.includes('s'))y1=p.y;}
      x0=clamp(Math.min(x0,x1-0.03),0,1);y0=clamp(Math.min(y0,y1-0.03),0,1);x1=clamp(Math.max(x1,x0+0.03),0,1);y1=clamp(Math.max(y1,y0+0.03),0,1);
      Object.assign(c,{x:x0,y:y0,w:x1-x0,h:y1-y0});
      if(_crop.ratio!=='free'){const l=S.doc.layers.find(z=>z.id===_crop.id);lockCropRatio(l.w/l.h);}}
    drawCrop();});
  cv.addEventListener('pointerup',()=>{drag=null;});
  $('#cropRotL').onclick=()=>{_crop.work.rot90=((_crop.work.rot90||0)+270)%360;_crop.work.crop={x:0,y:0,w:1,h:1};drawCrop();};
  $('#cropRotR').onclick=()=>{_crop.work.rot90=((_crop.work.rot90||0)+90)%360;_crop.work.crop={x:0,y:0,w:1,h:1};drawCrop();};
  $('#cropFlipH').onclick=()=>{_crop.work.flipH=!_crop.work.flipH;drawCrop();};
  $('#cropFlipV').onclick=()=>{_crop.work.flipV=!_crop.work.flipV;drawCrop();};
  $('#cropStraight').oninput=e=>{_crop.work.straighten=+e.target.value;$('#cropStraightV').textContent=e.target.value+'°';drawCrop();};
  $('#cropReset').onclick=()=>{Object.assign(_crop.work,{crop:{x:0,y:0,w:1,h:1},rot90:0,flipH:false,flipV:false,straighten:0});$('#cropStraight').value=0;$('#cropStraightV').textContent='0°';drawCrop();};
  $$('#cropFit .chip').forEach(b=>b.onclick=()=>{_crop.work.fit=b.dataset.fit;$$('#cropFit .chip').forEach(x=>x.classList.toggle('active',x===b));});
  $('#cropMatch').onclick=()=>{const c=_crop.work.crop;const src=_crop.im;const r=((_crop.work.rot90||0)%180)===90;const w=(r?src.height:src.width)*c.w,h=(r?src.width:src.height)*c.h;
    const k=1080/Math.min(w,h);applyCrop();commit(()=>{resizeDoc(S.doc,null,{w:Math.round(w*k),h:Math.round(h*k)});});toast('صار التصميم بمقاس الصورة '+ratioName(w,h));};
  $('#cropCancel').onclick=()=>{_crop=null;$('#cropModal').hidden=true;};
  $('#cropApply').onclick=()=>{applyCrop();};
  addEventListener('resize',()=>{if(_crop)drawCrop();});
}
function applyCrop(){
  if(!_crop)return;const w=_crop.work;
  commit(()=>{const l=S.doc.layers.find(x=>x.id===_crop.id);if(!l)return;Object.assign(l,{crop:w.crop,rot90:w.rot90,flipH:w.flipH,flipV:w.flipV,straighten:w.straighten,fit:w.fit});});
  _crop=null;$('#cropModal').hidden=true;
}

/* ===================== الرسم =====================
   renderDoc واحدة للمعاينة والتصدير؛ المعاينة تُرسم بمقياسٍ أصغر فقط. */

function regionStats(ctx,x,y,w,h,scale){
  x=Math.max(0,Math.floor(x*scale));y=Math.max(0,Math.floor(y*scale));w=Math.max(1,Math.floor(w*scale));h=Math.max(1,Math.floor(h*scale));
  w=Math.min(w,ctx.canvas.width-x);h=Math.min(h,ctx.canvas.height-y);if(w<1||h<1)return {L:128,sd:0,r:128,g:128,b:128};
  let d;try{d=ctx.getImageData(x,y,w,h).data;}catch(e){return {L:128,sd:0,r:128,g:128,b:128};}
  const step=Math.max(1,Math.floor(Math.sqrt(w*h/4000)))*4;let n=0,s=0,s2=0,R=0,G=0,B=0;
  for(let i=0;i<d.length;i+=step){const L=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2];s+=L;s2+=L*L;R+=d[i];G+=d[i+1];B+=d[i+2];n++;}
  const L=s/n;return {L,sd:Math.sqrt(Math.max(0,s2/n-L*L)),r:R/n,g:G/n,b:B/n};
}

function star8(ctx,x,y,r,k){k=k||0.62;ctx.beginPath();for(let i=0;i<16;i++){const a=-Math.PI/2+i*Math.PI/8,rr=i%2?r*k:r;const px=x+rr*Math.cos(a),py=y+rr*Math.sin(a);i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();ctx.stroke();}

function drawBackground(ctx,doc,th){
  const W=doc.fmt.w,H=doc.fmt.h,b=doc.bg;
  const c1=b.c1||th.bg1,c2=b.c2||th.bg2;
  if(b.type==='solid'){ctx.fillStyle=c1;ctx.fillRect(0,0,W,H);}
  else{const a=(b.angle||160)*Math.PI/180,r=Math.hypot(W,H)/2,cx=W/2,cy=H/2;
    const g=ctx.createLinearGradient(cx-Math.sin(a)*r,cy+Math.cos(a)*r,cx+Math.sin(a)*r,cy-Math.cos(a)*r);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  if(b.pattern){
    const light=relLum(...hexToRgb(c1))>0.4;
    ctx.save();ctx.strokeStyle=`rgba(${th.orn},${(light?.09:.05)*(b.patternOpacity??1)})`;ctx.lineWidth=1.2;
    const s=b.patternSize||135;for(let y=s/2;y<H+s;y+=s)for(let x=(Math.round(y/s)%2?0:s/2);x<W+s;x+=s)star8(ctx,x,y,s*0.28,0.62);ctx.restore();
  }
}

function drawScrim(ctx,doc,l,th,scale){
  const s=doc.scrim||{mode:'auto'};if(s.mode==='off')return;
  const W=doc.fmt.w,H=doc.fmt.h,IL=doc._imageLayout,dark=doc.palette==='dark';
  const k=s.mode==='manual'?(s.strength/55):1;
  const rgba=(c,a)=>`rgba(${c},${clamp(a*k,0,1).toFixed(3)})`;
  ctx.save();
  if(IL==='panel-bottom'){
    const g=ctx.createLinearGradient(0,l.y-2,0,l.y+l.h);
    g.addColorStop(0,`rgba(${dark?th.scrimEdge:th.scrimEdge},1)`);g.addColorStop(.18,'rgba(0,0,0,0)');g.addColorStop(.72,'rgba(0,0,0,0)');g.addColorStop(1,rgba(th.scrim,.92));
    ctx.fillStyle=g;ctx.fillRect(l.x,l.y-2,l.w,l.h+2);
  }else if(IL==='panel-top'){
    const g=ctx.createLinearGradient(0,l.y,0,l.y+l.h+2);
    g.addColorStop(0,rgba(th.scrim,.35));g.addColorStop(.6,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(${th.scrimEdge},1)`);
    ctx.fillStyle=g;ctx.fillRect(l.x,l.y,l.w,l.h+2);
  }else{
    const horiz=s.mode==='manual'?s.dir==='horizontal':(W/H>=1.3);
    if(horiz){
      const g=ctx.createLinearGradient(W,0,0,0);
      g.addColorStop(0,rgba(th.scrim,.92));g.addColorStop(.42,rgba(th.scrim,.8));g.addColorStop(.62,rgba(th.scrim,.25));g.addColorStop(.85,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }else{
      let c=s.mode==='manual'?(s.pos/100):(doc._titleCenter||0.36);
      /* تعتيم ذكي: كلما كانت منطقة العنوان أفتح، اشتدّ التدرّج خلفها */
      let boost=0;if(s.mode!=='manual'){const st=regionStats(ctx,0,H*(c-0.1),W,H*0.2,scale);boost=clamp((st.L-110)/170,0,.5);}
      const base=dark?0.40:0.14,lo=Math.max(.14,c-.13),hi=Math.min(.92,c+.14);
      const topCol=dark?rgba(th.scrim,.93):`rgba(${th.scrimEdge},${(0.96*k).toFixed(3)})`;
      const pts=[[0,topCol],[Math.max(.10,lo-.05),rgba(th.scrim,base)],[lo,rgba(th.scrim,base+boost)],[hi,rgba(th.scrim,base+boost)],[Math.min(.93,hi+.06),rgba(th.scrim,base)],[1,rgba(th.scrim,.94)]];
      for(let i=1;i<pts.length;i++)if(pts[i][0]<=pts[i-1][0])pts[i][0]=pts[i-1][0]+0.001;
      const g=ctx.createLinearGradient(0,0,0,H);pts.forEach(p=>g.addColorStop(Math.min(1,p[0]),p[1]));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }
  }
  ctx.restore();
}

function drawOrnamentLayer(ctx,doc,l,th){
  const light=doc.palette==='light';const R=l.w/2/1.06,cx=l.x+l.w/2,cy=l.y+l.h/2;
  ctx.save();ctx.strokeStyle=`rgba(${th.orn},${light?.2:.13})`;ctx.lineWidth=2*Math.max(0.6,l.w/900);
  star8(ctx,cx,cy,R,0.72);star8(ctx,cx,cy,R*0.8,0.72);ctx.beginPath();ctx.arc(cx,cy,R*1.06,0,Math.PI*2);ctx.stroke();ctx.restore();
}

const _tintCache=new Map();
function tinted(img,color){const key=img.src.length+':'+color;if(_tintCache.has(key))return _tintCache.get(key);const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);x.globalCompositeOperation='source-in';x.fillStyle=color;x.fillRect(0,0,c.width,c.height);_tintCache.set(key,c);return c;}

async function drawEagle(ctx,l){
  /* قواعد العقاب مفروضة هنا لا في الواجهة وحدها: نسبة مقفلة، عرض ≥48، شفافية ≥30٪، لون من البدائل */
  l.w=Math.max(EAGLE_MIN_W,l.w);l.h=Math.round(l.w*EAGLE_RATIO);
  const img=await loadImage(EAGLE_DATA);const sch=EAGLE_SCHEMES[l.scheme]||EAGLE_SCHEMES.gold;
  ctx.globalAlpha=clamp(l.opacity??1,EAGLE_MIN_OPACITY,1);
  ctx.drawImage(sch.color?tinted(img,sch.color):img,l.x,l.y,l.w,l.h);
}

function drawShape(ctx,doc,l,th){
  const fill=l.fill||th.accent;ctx.beginPath();
  if(l.shape==='ellipse')ctx.ellipse(l.x+l.w/2,l.y+l.h/2,l.w/2,l.h/2,0,0,Math.PI*2);
  else if(l.shape==='line'){ctx.moveTo(l.x,l.y+l.h/2);ctx.lineTo(l.x+l.w,l.y+l.h/2);ctx.strokeStyle=fill;ctx.lineWidth=Math.max(1,l.h);ctx.lineCap='round';ctx.stroke();return;}
  else roundRect(ctx,l.x,l.y,l.w,l.h,l.radius||0);
  if(l.fillOn!==false){ctx.fillStyle=fill;ctx.fill();}
  if(l.strokeW>0){ctx.strokeStyle=l.stroke||C('white');ctx.lineWidth=l.strokeW;ctx.stroke();}
}

function textColor(doc,l,th){if(l.color)return l.color;if(l.role==='signature')return null;return th[l.role]||th.text;}
function drawTextLayer(ctx,doc,l,th,scale){
  const m=measureTextLayer(doc,l);l.h=Math.round(m.h);
  if(!String(l.text||'').trim())return;
  const dir=textDir(l);
  const col=textColor(doc,l,th)||C('white');
  /* فاحص التباين: متوسط ما تحت النص قبل رسمه */
  const st=regionStats(ctx,l.x,l.y,l.w,m.h,scale);
  const [tr,tg,tb]=parseColor(col);l._cr=contrastRatio(relLum(tr,tg,tb),relLum(st.r,st.g,st.b));
  ctx.font=layerCtxFont(doc,l);ctx.direction=dir;ctx.textBaseline='top';
  const al=l.align||'center';
  const ax=al==='center'?l.x+l.w/2:(al==='right'?l.x+l.w:l.x);
  if(l.box&&l.box.on){
    const pb=l.box;const cw=m.contentW+pb.padX*2,ch=m.h+pb.padY*2;
    const bx=al==='center'?l.x+(l.w-m.contentW)/2-pb.padX:(al==='right'?l.x+l.w-m.contentW-pb.padX:l.x-pb.padX);
    const by=l.y-pb.padY;const [r,g,b]=hexToRgb(pb.color||C('black'));
    ctx.save();roundRect(ctx,bx,by,cw,ch,pb.radius>=999?ch/2:pb.radius);ctx.fillStyle=`rgba(${r},${g},${b},${pb.opacity??.6})`;ctx.fill();
    if(pb.strokeW>0){ctx.lineWidth=pb.strokeW;ctx.strokeStyle=pb.stroke||C('white');ctx.stroke();}ctx.restore();
  }
  const shadowOn=(l.shadow&&l.shadow.on)||(l.role==='head'&&!l.shadowLock&&(doc._imageLayout==='full'||doc._imageLayout==='only'));
  if(shadowOn){const sh=l.shadow;const [r,g,b]=hexToRgb(sh.color||C('black'));ctx.shadowColor=`rgba(${r},${g},${b},${sh.opacity??.5})`;ctx.shadowBlur=(sh.blur??20)*scale;ctx.shadowOffsetY=(sh.y??3)*scale;}
  ctx.fillStyle=col;
  let y=l.y;
  m.lines.forEach((ln,i)=>{
    const lw=m.widths[i];
    if(m.useLs){let x=al==='center'?ax-lw/2:(al==='right'?ax-lw:ax);ctx.textAlign='left';ctx.direction='ltr';
      for(const ch of ln){if(l.stroke&&l.stroke.on){ctx.lineWidth=l.stroke.w;ctx.strokeStyle=l.stroke.color;ctx.lineJoin='round';ctx.strokeText(ch,x,y);}ctx.fillText(ch,x,y);x+=ctx.measureText(ch).width+l.ls;}}
    else{ctx.textAlign=al;if(l.stroke&&l.stroke.on){ctx.save();ctx.shadowColor='transparent';ctx.lineWidth=l.stroke.w;ctx.strokeStyle=l.stroke.color;ctx.lineJoin='round';ctx.strokeText(ln,ax,y);ctx.restore();}ctx.fillText(ln,ax,y);}
    y+=m.lineH;
  });
  ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
}

/* وحدة خلدون: الأفاتار بشفافية هوية.py، والتوقيع 12–18٪ بلونٍ من المشهد (canonical-values §1ب و§2) */
async function drawAvatarUnit(ctx,doc,av,sg,scale){
  const W=doc.fmt.w,H=doc.fmt.h;
  if(av&&av.visible!==false&&!av._lh){
    if(!av.manual){
      /* كما في هوية.py: الأهدأ خامةً يفوز، واليمين هو الافتراض ما لم يزد اضطرابه على اليسار بربع */
      const mg=Math.round(H*0.035),lx=mg,rx=W-mg-av.w;let side=av.side;
      if(side!=='left'&&side!=='right'){const sR=regionStats(ctx,rx,av.y,av.w,av.h,scale),sL=regionStats(ctx,lx,av.y,av.w,av.h,scale);
        side=sL.sd<sR.sd?'left':'right';if(sR.sd<=Math.min(sL.sd,sR.sd)*1.25)side='right';}
      av.x=side==='left'?lx:rx;av._side=side;
    }else av._side=av.x+av.w/2<W/2?'left':'right';
    const st=regionStats(ctx,av.x,av.y,av.w,av.h,scale);
    const a=clamp(0.22+0.10*(st.L/255)+0.10*Math.min(st.sd/40,1),0.22,0.45);av._alpha=a;
    const img=await loadImage(AVATAR_DATA);ctx.save();ctx.globalAlpha=a;ctx.drawImage(img,av.x,av.y,av.w,av.h);ctx.restore();
  }
  if(sg&&sg.visible!==false&&!sg._lh){
    if(!sg.manual&&av&&av.visible!==false){const gap=Math.round(av.w*0.55);sg.x=av._side==='left'?av.x+av.w+gap:av.x-gap-sg.w;sg.y=av.y+av.h-sg.h;}
    const st=regionStats(ctx,sg.x,sg.y,sg.w,sg.h,scale);
    const light=st.L<140;const tmp=Object.assign({},sg,{color:sg.color||(light?C('cream'):C('ink'))});
    ctx.save();ctx.globalAlpha=clamp(sg.opacity??.15,0.12,0.18);drawTextLayer(ctx,doc,tmp,theme(doc),scale);ctx.restore();sg.h=tmp.h;
  }
}

async function renderDoc(doc,opts){
  opts=opts||{};const scale=opts.scale||1;const W=doc.fmt.w,H=doc.fmt.h;
  await ensureDocFonts(doc);
  const cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(W*scale));cv.height=Math.max(1,Math.round(H*scale));
  const ctx=cv.getContext('2d',{willReadFrequently:true});ctx.scale(scale,scale);ctx.imageSmoothingQuality='high';
  const th=theme(doc);
  drawBackground(ctx,doc,th);
  const av=byRole(doc,'avatar'),sg=byRole(doc,'signature');
  for(const l of doc.layers){
    if(l.visible===false||l._lh||l===av||l===sg)continue;
    ctx.save();ctx.globalAlpha=clamp(l.opacity??1,0,1);ctx.globalCompositeOperation=l.blend||'source-over';
    try{
      if(l.type==='image'){if(l.imgId&&IMGS[l.imgId]){const pc=await renderPhoto(l,l.w,l.h,scale);if(pc)ctx.drawImage(pc,l.x,l.y,l.w,l.h);}}
      else if(l.type==='scrim')drawScrim(ctx,doc,l,th,scale);
      else if(l.type==='ornament')drawOrnamentLayer(ctx,doc,l,th);
      else if(l.type==='eagle')await drawEagle(ctx,l);
      else if(l.type==='shape')drawShape(ctx,doc,l,th);
      else if(l.type==='text')drawTextLayer(ctx,doc,l,th,scale);
    }catch(e){console.warn('layer',l.role,e);}
    ctx.restore();
  }
  await drawAvatarUnit(ctx,doc,av,sg,scale);
  return cv;
}

/* ===================== مولّد الأفكار (محرّك الإبداع v2، كما هو) =====================
   يملأ نصوص الطبقات ذات الأدوار: العنوان والسطر الداعم والشعار والوسم. */
function matchTopic(v){if(!v)return null;const low=v.toLocaleLowerCase();const exact=AW_TOPICS.find(t=>t.label===v);if(exact)return exact;return AW_TOPICS.filter(t=>t.kw.some(k=>low.includes(k))).sort((a,b)=>Math.max(...b.kw.filter(k=>low.includes(k)).map(k=>k.length))-Math.max(...a.kw.filter(k=>low.includes(k)).map(k=>k.length)))[0]||null;}
const devLabel=id=>{const d=AW_DEVICES.find(x=>x.id===id);return d?d.label:(id==='classic'?'كلاسيكي':id);};
function currentTopic(){const g=S.gen,raw=(g.topicQuery||'').trim();return g.topicId?AW_TOPICS.find(x=>x.id===g.topicId):matchTopic(raw);}

function composeIdea(t,raw,dev,rng,noHistory){
  const g=S.gen;
  if(t&&AW_IDEAS[t.id]){
    const bank=AW_IDEAS[t.id];
    if(dev==='classic'){
      if(Array.isArray(t.heads)&&Array.isArray(t.subs)&&Array.isArray(t.slogans)&&Array.isArray(t.concepts)){const s=Math.floor(rng()*4);return {dev:'classic',head:pick(t.heads,s),sub:pick(t.subs,s),slogan:pick(t.slogans,s),concept:pick(t.concepts,s)};}
      return Object.assign({},bank[Math.floor(rng()*bank.length)],{dev:'classic'});
    }
    let pool=bank.map((idea,i)=>({idea,i})).filter(x=>dev==='auto'||x.idea.dev===dev);
    if(!pool.length)pool=bank.map((idea,i)=>({idea,i}));
    if(!noHistory){const used=g.usedIdeas[t.id]||[];const fresh=pool.filter(x=>!used.includes(x.i));if(fresh.length)pool=fresh;else g.usedIdeas[t.id]=[];}
    const x=pool[Math.floor(rng()*pool.length)];
    if(!noHistory)(g.usedIdeas[t.id]=g.usedIdeas[t.id]||[]).push(x.i);
    return Object.assign({},x.idea);
  }
  const devId=(dev==='auto'||dev==='classic')?AW_DEVICES[Math.floor(rng()*AW_DEVICES.length)].id:dev;
  const G=AW_GENERIC_DEV[devId],r=AW_RECIPES[Math.floor(rng()*AW_RECIPES.length)];
  return {dev:devId,head:G.head(raw),sub:G.sub(raw),slogan:pick(AW_GENERIC.slogans,Math.floor(rng()*4)),concept:{ar:r.ar(raw),en:r.en(raw)}};
}
function ideaTag(t,raw,rng){let tag=t?pick(t.tags,Math.floor(rng()*t.tags.length)):pick(AW_GENERIC.tags(raw),0);if(S.gen.campTag&&S.gen.campTag.trim())tag=normTag(S.gen.campTag);return tag;}
function applyIdeaToDoc(idea,tag,t,raw){
  const editorial=!!(t&&AW_IDEAS[t.id]);
  S.gen.last={head:idea.head,sub:idea.sub,slogan:idea.slogan,tag,concept:idea.concept,tone:S.gen.tone,topicId:t&&t.id,topicLabel:t?t.label:raw,dev:idea.dev,editorial,source:editorial&&window.AW_TOPIC_SOURCES?AW_TOPIC_SOURCES[t.id]||null:null};
  setRoleTexts(S.doc,{head:idea.head,sub:idea.sub,slogan:idea.slogan,tag});
}
function generate(reshuffle){
  const g=S.gen,raw=(g.topicQuery||'').trim();
  if(!raw&&!g.topicId){toast('اكتب موضوعاً أولاً');return;}
  if(reshuffle)g.seed++;else g.seed=Math.floor(Math.random()*1e6);
  const t=currentTopic(),rng=mulberry32(g.seed*2654435761+1);
  const idea=composeIdea(t,raw,g.device,rng,false);
  commit(()=>applyIdeaToDoc(idea,ideaTag(t,raw,rng),t,raw));
  renderProps();
}
let brainIdeas=null;
function brainstorm(){
  const g=S.gen,raw=(g.topicQuery||'').trim();
  if(!raw&&!g.topicId){toast('اكتب موضوعاً أولاً');return;}
  const t=currentTopic(),rng=mulberry32(Date.now()%1e9);
  const devs=(t&&AW_IDEAS[t.id])?AW_IDEAS[t.id].map(x=>x.dev):AW_DEVICES.map(d=>d.id).sort(()=>rng()-.5).slice(0,6);
  brainIdeas=devs.slice(0,6).map(dv=>composeIdea(t,raw,dv,rng,true));
  renderProps();
}
function applyIdea(i){
  const idea=brainIdeas&&brainIdeas[i];if(!idea)return;
  const raw=(S.gen.topicQuery||'').trim(),t=currentTopic();
  let tag=t?t.tags[0]:AW_GENERIC.tags(raw)[0];if(S.gen.campTag&&S.gen.campTag.trim())tag=normTag(S.gen.campTag);
  if(t&&AW_IDEAS[t.id]){const bi=AW_IDEAS[t.id].findIndex(x=>x.head===idea.head);if(bi>-1)(S.gen.usedIdeas[t.id]=S.gen.usedIdeas[t.id]||[]).push(bi);}
  commit(()=>applyIdeaToDoc(idea,tag,t,raw));brainIdeas=null;renderProps();toast('طُبّقت الفكرة ✓');
}

/* ===================== البرومبت ===================== */
function fmtAR(doc){return `${ratioName(doc.fmt.w,doc.fmt.h)}  (${doc.fmt.w}x${doc.fmt.h})`;}
function toneLight(tone){return tone==='warn'?'clean studio key + one meaningful cast shadow, slightly dramatic':tone==='honor'?'soft respectful warm key light':'hopeful golden-hour, gentle green duotone';}
function buildPrompt(doc){return S.gen.promptMode==='full'?buildFullPrompt(doc):buildPlatePrompt(doc);}
function conceptOf(){return (S.gen.last&&S.gen.last.concept)||{ar:'',en:'a single cinematic visual metaphor, one subject, generous negative space'};}
function buildFullPrompt(doc){
  const dark=doc.palette==='dark',e=currentEnt(doc),eg=byRole(doc,'eagle'),wm=byRole(doc,'watermark');
  const eagleOn=eg&&eg.visible;
  return `{
  "render": "COMPLETE poster with text baked in (${KITS[doc.kit].label} identity)",
  "aspect_ratio": "${fmtAR(doc)}",
  "emblem": "${eagleOn?'Syrian eagle (العقاب) + three stars, original polished gold ('+C('gold-quiet')+'), the three stars are part of it, locked 1000:754 ratio, new-Syria mark, NOT old-regime symbols':'none, no emblem, no eagle'}",
  "entity_lockup": "${byRole(doc,'entAr').visible?(e.ar||'')+(e.en?'  /  '+e.en:''):'none'}",
  "scene": "${conceptOf().en}",
  "headline_ar": "${roleText(doc,'head')}",
  "subline_ar": "${roleText(doc,'sub')}",
  "slogan_ar": "${roleText(doc,'slogan')}",
  "footer": "${roleText(doc,'tag')}${e.handle?'   '+e.handle:''}  (bottom-center)",${wm&&wm.visible?`
  "disclaimer_badge": "${wm.text}  (small rounded pill, top-left)",`:''}
  "color_palette": ${JSON.stringify(Object.values((({bg1,bg2,head,sub,accent})=>({bg1,bg2,head,sub,accent}))(theme(doc))))},
  "typography": "bold geometric Arabic display with kashida; render the Arabic EXACTLY as written, crisp and correctly connected",
  "lighting": "${toneLight(S.gen.tone)}",
  "negative_prompt": "no clutter, no multiple subjects, no plastic 3D, no old-regime flag/eagle, max 3 text levels, no misspelled or broken Arabic letters",
  "note": "Use an image model with strong Arabic text rendering. If letters break, switch to the clean-background prompt and let the studio overlay the text."
}`;
}
function buildPlatePrompt(doc){
  const pos=doc.layout.titlePos,zone=pos==='center'?'middle band':pos==='bottom'?'lower third':'upper third';
  return `{
  "task": "Generate ONLY the background photograph / scene. Do NOT draw any text, letters, logo, emblem, eagle, flag, or watermark: the studio composites all of those as a clean overlay afterwards.",
  "aspect_ratio": "${fmtAR(doc)}",
  "scene": "${conceptOf().en}",
  "composition": "single cinematic metaphor, one subject, generous empty negative space. Keep the TOP-CENTER area clear (emblem placed later), and keep the ${zone} clean and slightly darker so the overlaid Arabic headline stays legible.",
  "color_grade": "${KITS[doc.kit].promptGrade||(doc.kit==='syria'?'deep pine-green ('+C('green')+'), bronze-gold accents ('+C('gold')+'), ivory cream ('+C('cream')+'), New-Syria identity mood':doc.kit==='khaldoun'?'deep navy ('+C('navy')+'), quiet gold ('+C('gold-quiet')+'), paper cream ('+C('paper')+')':'natural, true-to-life color')}",
  "lighting": "${toneLight(S.gen.tone)}",
  "realism": "photographic, natural texture, no plastic 3D, no busy clutter, no multiple subjects",
  "negative_prompt": "no text, no Arabic or Latin letters, no captions, no typography, no logo, no eagle, no flag, no watermark, no badges, no UI frames or borders, no old-regime symbols"
}`;
}

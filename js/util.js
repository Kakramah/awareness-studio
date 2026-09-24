/* أدوات عامة مشتركة بين كل الملفات */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
/* الألوان كلها توكنات في :root داخل style.css، والكود يقرؤها بالاسم */
const _cTok={};function C(n){if(_cTok[n])return _cTok[n];const v=getComputedStyle(document.documentElement).getPropertyValue('--'+n).trim();if(v)_cTok[n]=v;return v||'black';}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const uid=p=>(p||'l')+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const pick=(arr,seed)=>arr[(seed%arr.length+arr.length)%arr.length];
const clone=o=>JSON.parse(JSON.stringify(o));
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const escAttr=s=>esc(s).replace(/'/g,'&#39;');
function normTag(s){s=String(s||'').trim();if(!s)return '';if(s[0]!=='#')s='#'+s;return s.replace(/\s+/g,'_');}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

const _imgCache=new Map();
function loadImage(src){
  if(_imgCache.has(src))return _imgCache.get(src);
  const p=new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});
  _imgCache.set(src,p);p.catch(()=>_imgCache.delete(src));return p;
}

const AR_RE=/[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const isArabic=s=>AR_RE.test(String(s||''));
function textDir(layer){if(layer.dir&&layer.dir!=='auto')return layer.dir;const t=String(layer.text||'');const m=t.match(/[A-Za-z؀-ۿ]/);return m&&/[A-Za-z]/.test(m[0])?'ltr':'rtl';}

function hexToRgb(h){h=String(h||C('black')).replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h.slice(0,6),16);return [(n>>16)&255,(n>>8)&255,n&255];}
function rgbToHex(r,g,b){return '#'+[r,g,b].map(v=>clamp(Math.round(v),0,255).toString(16).padStart(2,'0')).join('');}
function relLum(r,g,b){const f=c=>{c/=255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4);};return .2126*f(r)+.7152*f(g)+.0722*f(b);}
function contrastRatio(l1,l2){const a=Math.max(l1,l2),b=Math.min(l1,l2);return (a+.05)/(b+.05);}
/* يقبل #hex أو rgba(...) */
function parseColor(c){c=String(c||'');if(c[0]==='#')return hexToRgb(c).concat(1);const m=c.match(/rgba?\(([^)]+)\)/);if(m){const p=m[1].split(',').map(Number);return [p[0],p[1],p[2],p[3]==null?1:p[3]];}return [0,0,0,1];}

function roundRect(ctx,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}

function copyText(t){navigator.clipboard.writeText(t).then(()=>toast('تم النسخ ✓')).catch(()=>{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast('تم النسخ ✓');});}
let _toT;function toast(m){const el=$('#toast');if(!el)return;el.textContent=m;el.classList.add('show');clearTimeout(_toT);_toT=setTimeout(()=>el.classList.remove('show'),1800);}
function downloadBlob(blob,name){const u=URL.createObjectURL(blob);const a=document.createElement('a');a.download=name;a.href=u;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);}
const debounce=(fn,ms)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};};

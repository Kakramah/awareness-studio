/* التخزين: IndexedDB وحده.
   localStorage محدود بنحو 5MB ويفشل بصمت مع الصور. المشاريع والسلسلة والحفظ التلقائي لقطاتٌ صغيرة،
   والصور مخزّنة وحدها بمفتاح img:<id>، والخطوط المرفوعة بمفتاح font:<id>. */
const DB={_p:null,
  open(){return this._p||(this._p=new Promise((res,rej)=>{const r=indexedDB.open('awareness-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);}));},
  async tx(mode,fn){const db=await this.open();return new Promise((res,rej)=>{const t=db.transaction('kv',mode);const st=t.objectStore('kv');const out=fn(st);t.oncomplete=()=>res(out&&out.result);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error);});},
  get(k){return this.tx('readonly',st=>st.get(k));},
  set(k,v){return this.tx('readwrite',st=>st.put(v,k));},
  del(k){return this.tx('readwrite',st=>st.delete(k));},
  keys(){return this.tx('readonly',st=>st.getAllKeys());}
};
let _saveWarned=false;
function saveFail(e){console.warn(e);if(!_saveWarned){_saveWarned=true;toast('تعذّر الحفظ في المتصفح، فصدّر عملك');}}

/* الصور: الأصل مصغّراً إلى 2600px، في الذاكرة وفي القاعدة */
const IMGS={};
async function ensureImg(id){if(!id||IMGS[id])return;try{const v=await DB.get('img:'+id);if(v)IMGS[id]=v;}catch(e){}}
async function ensureDocImgs(doc){for(const l of doc.layers)if(l.type==='image'&&l.imgId)await ensureImg(l.imgId);if(doc.bg&&doc.bg.imgId)await ensureImg(doc.bg.imgId);}
function docImgIds(doc){const s=new Set();(doc.layers||[]).forEach(l=>{if(l.imgId)s.add(l.imgId);});if(doc.bg&&doc.bg.imgId)s.add(doc.bg.imgId);return s;}
async function shrinkImage(dataUrl,max){const im=await loadImage(dataUrl);const k=Math.min(1,max/Math.max(im.width,im.height));if(k===1&&dataUrl.length<3e6)return dataUrl;
  const c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);
  /* PNG الشفّاف (شعار) يبقى PNG، والصورة تصير JPEG */
  const png=/^data:image\/png/.test(dataUrl);return c.toDataURL(png?'image/png':'image/jpeg',.92);}
function readFileAsDataURL(f){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f);});}
async function storeImageFile(f){
  const raw=await readFileAsDataURL(f);const data=await shrinkImage(raw,2600);const id=uid('i');
  IMGS[id]=data;DB.set('img:'+id,data).catch(saveFail);
  const im=await loadImage(data);return {id,w:im.width,h:im.height,name:f.name};
}

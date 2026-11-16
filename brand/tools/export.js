// SVG -> PNG/ICO export (Playwright/Chromium). Kullanım: node tools/export.js
const {chromium}=require('playwright');const fs=require('fs');const p=require('path');
const ROOT=p.resolve(__dirname,'..'),SVG=p.join(ROOT,'svg'),PNG=p.join(ROOT,'png'),FAV=p.join(ROOT,'favicon');
[PNG,FAV].forEach(d=>fs.mkdirSync(d,{recursive:true}));
const vb=s=>s.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
async function render(pg,file,out,w,h){
  let s=fs.readFileSync(p.join(SVG,file),'utf8');const [,,vw,vh]=vb(s);if(!h)h=Math.round(w*vh/vw);
  s=s.replace(/ width="[\d.]+" height="[\d.]+"/,` width="${w}" height="${h}"`);
  await pg.setViewportSize({width:w,height:h});
  await pg.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block}</style>${s}`);
  await pg.screenshot({path:out,omitBackground:true,clip:{x:0,y:0,width:w,height:h}});}
(async()=>{const b=await chromium.launch();const pg=await b.newPage();
  for(const f of fs.readdirSync(SVG)){const base=f.replace('.svg','');
    if(/symbol/.test(f)) for(const w of [256,512,1024]) await render(pg,f,p.join(PNG,`${base}-${w}w.png`),w);
    else if(/logo|wordmark/.test(f)) for(const w of [1000,2000,4000]) await render(pg,f,p.join(PNG,`${base}-${w}w.png`),w);
    else if(/appicon|avatar/.test(f)) for(const w of [512,1024]) await render(pg,f,p.join(PNG,`${base}-${w}.png`),w,w);
    else if(/banner/.test(f)){const [,,vw,vh]=vb(fs.readFileSync(p.join(SVG,f),'utf8'));await render(pg,f,p.join(PNG,`${base}-${vw}x${vh}.png`),vw,vh);}
  }
  for(const [n,w] of [['favicon-16x16.png',16],['favicon-32x32.png',32],['favicon-48x48.png',48],['apple-touch-icon.png',180],['android-chrome-192x192.png',192],['android-chrome-512x512.png',512]])
    await render(pg,'valdori-appicon-night.svg',p.join(FAV,n),w,w);
  fs.copyFileSync(p.join(SVG,'valdori-appicon-night.svg'),p.join(FAV,'favicon.svg'));
  await b.close();})();

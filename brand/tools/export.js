// SVG -> PNG export (Playwright/Chromium). Kullanım: node tools/export.js
const {chromium}=require('playwright');const fs=require('fs');const p=require('path');
const ROOT=p.resolve(__dirname,'..'), SVG=p.join(ROOT,'svg'), PNG=p.join(ROOT,'png'), FAV=p.join(ROOT,'favicon');
[PNG,FAV].forEach(d=>fs.mkdirSync(d,{recursive:true}));
const vb=s=>s.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
async function render(page,file,out,w,h){
  let s=fs.readFileSync(p.join(SVG,file),'utf8'); const [,,vw,vh]=vb(s);
  if(!h) h=Math.round(w*vh/vw);
  s=s.replace(/width="[\d.]+" height="[\d.]+"/,`width="${w}" height="${h}"`);
  await page.setViewportSize({width:w,height:h});
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block}</style>${s}`);
  await page.screenshot({path:out,omitBackground:true,clip:{x:0,y:0,width:w,height:h}});
}
(async()=>{const b=await chromium.launch();const pg=await b.newPage({deviceScaleFactor:1});
  for(const f of fs.readdirSync(SVG).filter(f=>/symbol|logo|wordmark/.test(f))){
    const base=f.replace('.svg','');
    const widths=/symbol/.test(f)?[256,512,1024]:[1000,2000,4000];
    for(const w of widths) await render(pg,f,p.join(PNG,`${base}-${w}w.png`),w);
  }
  for(const f of ['valdori-appicon-dark','valdori-appicon-light','valdori-appicon-ember'])
    for(const w of [512,1024]) await render(pg,f+'.svg',p.join(PNG,`${f}-${w}.png`),w,w);
  await render(pg,'valdori-og-image.svg',p.join(PNG,'valdori-og-image-1200x630.png'),1200,630);
  for(const [n,w] of [['favicon-16x16.png',16],['favicon-32x32.png',32],['favicon-48x48.png',48],['apple-touch-icon.png',180],['android-chrome-192x192.png',192],['android-chrome-512x512.png',512]])
    await render(pg,'valdori-favicon.svg',p.join(FAV,n),w,w);
  fs.copyFileSync(p.join(SVG,'valdori-favicon.svg'),p.join(FAV,'favicon.svg'));
  await b.close();})();

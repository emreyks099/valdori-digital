const {chromium}=require('playwright');const path=require('path');
(async()=>{const [,,html,out,mode]=process.argv;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280},deviceScaleFactor:mode==='full'?1.5:1});
await p.goto('file://'+path.resolve(html));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
const times = mode==='full'? Array.from({length:256},(_,i)=>i/30) : [0.1,0.3,1.0,1.8,2.5,3.2,3.9,4.6,5.3,6.3,7.0,8.4];
for(let i=0;i<times.length;i++){await p.evaluate(t=>window.render(t),times[i]);
 await p.screenshot({path:`${out}/f_${String(i).padStart(4,'0')}.png`});}
await b.close();})();

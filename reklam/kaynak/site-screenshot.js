const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
await p.goto('https://valdoridigital.net',{waitUntil:'networkidle',timeout:60000});
await p.waitForTimeout(2500);
// scroll through to trigger lazy/reveal animations
const h=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<h;y+=400){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(250);}
await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(1500);
console.log('height',h);
await p.screenshot({path:process.argv[2]+'/top.png'});
await p.screenshot({path:process.argv[2]+'/full.png',fullPage:true});
await b.close();})();

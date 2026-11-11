// WebGL kapalı hızlı yürüyüş (düzen denetimi için).
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [path = "/", prefix = "w", w = "390", h = "844", step = "800"] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +w, height: +h } });
await ctx.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
const page = await ctx.newPage();
await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total - 50 && i < 40; y += +step, i++) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `qa/shots/${prefix}-${String(i).padStart(2, "0")}.png` });
}
console.log(prefix, total, i);
await browser.close();

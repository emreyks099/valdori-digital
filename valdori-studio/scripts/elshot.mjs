// Bir öğeyi görünüm alanına getirip görüntüsünü alır.
// Kullanım: node scripts/elshot.mjs <yol> <seçici> <ad> [genişlik] [yükseklik]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [path, selector, name, w = "1440", h = "900"] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +w, height: +h } });
await ctx.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
const page = await ctx.newPage();
await page.goto(base + path, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
const y = await el.evaluate((n) => n.getBoundingClientRect().top + window.scrollY);
await page.evaluate((v) => window.scrollTo(0, Math.max(0, v - 90)), y);
await page.waitForTimeout(+(process.env.WAIT || 2600));
await page.screenshot({ path: `qa/shots/${name}.png` });
await browser.close();
console.log(name);

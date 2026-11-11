// Sayfayı gerçek kaydırmayla gezer, her adımda görünüm alanı görüntüsü alır.
// Kullanım: node scripts/walk.mjs <yol> <önek> [genişlik] [yükseklik] [adım]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [path = "/", prefix = "walk", w = "1440", h = "900", step = "850"] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(base + path, { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total - 10; y += +step) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `qa/shots/${prefix}-${String(i).padStart(2, "0")}.png` });
  i++;
  if (i > 40) break;
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
console.log(JSON.stringify({ prefix, total, shots: i, overflow, errors: [...new Set(errors)].slice(0, 6) }));
await browser.close();

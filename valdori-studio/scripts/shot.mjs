// Kullanım: node scripts/shot.mjs <url-yolu> <çıktı-adı> [genişlik] [yükseklik] [full] [scrollY]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [path = "/", name = "shot", w = "1440", h = "900", full = "", scrollY = "0"] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
const out = process.env.SHOT_DIR || "qa/shots";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(base + path, { waitUntil: "networkidle" });
await page.waitForTimeout(+(process.env.WAIT || 3800));
if (+scrollY) { await page.evaluate((y) => window.scrollTo(0, y), +scrollY); await page.waitForTimeout(1200); }
if (full === "full") {
  // ScrollTrigger animasyonlarının tetiklenmesi için sayfayı baştan sona gez
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
}
await page.screenshot({ path: `${out}/${name}.png`, fullPage: full === "full" });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
console.log(JSON.stringify({ name, overflow, errors: errors.slice(0, 5) }));
await browser.close();

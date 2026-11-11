// Tüm rotaları gezer: HTTP durumu, konsol hataları, yatay taşma, tek H1, başlık/açıklama/canonical, kırık iç bağlantılar.
// Kullanım: node scripts/qa-routes.mjs [genişlik,genişlik,...]
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const base = process.env.BASE_URL || "http://localhost:3000";
const widths = (process.argv[2] || "1440").split(",").map(Number);
const noGl = process.env.NO_GL !== "0";

const xml = await (await fetch(base + "/sitemap.xml")).text();
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
routes.push("/gizlilik", "/cerez-politikasi", "/olmayan-sayfa");

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const report = [];
const links = new Set();
for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 700 ? 800 : 900 } });
  // WebGL, GPU'suz ortamda yazılımsal çalıştığı için rota taramasında kapatılır (ayrı test edilir).
  if (noGl) await ctx.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  const page = await ctx.newPage();
  for (const route of routes) {
    const errors = [];
    const onConsole = (m) => m.type() === "error" && errors.push(m.text().slice(0, 160));
    const onErr = (e) => errors.push("pageerror: " + String(e).slice(0, 160));
    page.on("console", onConsole); page.on("pageerror", onErr);
    const res = await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(60); }
    const info = await page.evaluate(() => {
      const main = document.querySelector("main");
      const vis = (el) => !el.closest("[hidden]") && getComputedStyle(el).display !== "none";
      const wide = [...document.querySelectorAll("main *, footer *, header *")].filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > document.documentElement.clientWidth + 1 && getComputedStyle(el).position !== "fixed"; }).slice(0, 3).map((el) => el.tagName + "." + String(el.className).slice(0, 50));
      return {
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        wide,
        h1: [...(main?.querySelectorAll("h1") ?? [])].filter(vis).length,
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.content?.length ?? 0,
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
        hrefs: [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href").split("#")[0]),
        imgsNoAlt: [...document.querySelectorAll("img:not([alt])")].length,
        smallTargets: [...document.querySelectorAll("main a, main button, header a, header button")].filter((el) => { const r = el.getBoundingClientRect(); return vis(el) && r.width > 0 && r.height < 24 && !el.closest("p, li.border-b, .prose-v"); }).length,
      };
    });
    info.hrefs.forEach((h) => links.add(h));
    page.off("console", onConsole); page.off("pageerror", onErr);
    const expected = route === "/olmayan-sayfa" ? 404 : 200;
    const noindex = ["/gizlilik", "/cerez-politikasi", "/olmayan-sayfa"].includes(route);
    const problems = [];
    if (res.status() !== expected) problems.push(`status ${res.status()}`);
    if (info.overflow) problems.push("yatay taşma " + info.wide.join(" | "));
    if (info.h1 !== 1) problems.push(`h1=${info.h1}`);
    if (!noindex && (info.desc < 70 || info.desc > 200)) problems.push(`desc=${info.desc}`);
    if (!noindex && info.title.length > 70) problems.push(`title=${info.title.length}`);
    if (!noindex && !info.canonical) problems.push("canonical yok");
    if (info.imgsNoAlt) problems.push(`alt'sız img=${info.imgsNoAlt}`);
    const errs = errors.filter((e) => !(route === "/olmayan-sayfa" && e.includes("404")) && !(noGl && e.includes("WebGL")));
    if (errs.length) problems.push("konsol: " + [...new Set(errs)].join(" ; "));
    report.push({ width, route, status: res.status(), problems });
  }
  await ctx.close();
}
const broken = [];
for (const href of links) {
  const r = await fetch(base + href, { redirect: "manual" });
  if (r.status !== 200) broken.push(`${href} → ${r.status}`);
}
await browser.close();
const bad = report.filter((r) => r.problems.length);
const summary = { routes: routes.length, widths, checks: report.length, failing: bad.length, internalLinks: links.size, brokenLinks: broken };
fs.mkdirSync("qa", { recursive: true });
fs.writeFileSync("qa/routes-report.json", JSON.stringify({ summary, bad, report }, null, 2));
console.log(JSON.stringify(summary));
for (const b of bad) console.log(b.width, b.route, "→", b.problems.join(" || "));

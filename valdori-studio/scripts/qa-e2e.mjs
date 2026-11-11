// Etkileşim testleri: mobil menü, Dijital Skor, iletişim formu ve API, klavye erişimi, azaltılmış hareket.
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const base = process.env.BASE_URL || "http://localhost:3000";
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok: !!ok, detail }); console.log(ok ? "✓" : "✗", name, detail); };
const noGl = () => { HTMLCanvasElement.prototype.getContext = () => null; };

const browser = await chromium.launch();

// ---------- Mobil menü ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await ctx.addInitScript(noGl);
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const burger = page.getByRole("button", { name: "Menüyü aç" });
  check("mobil: menü düğmesi görünür", await burger.isVisible());
  const box = await burger.boundingBox();
  check("mobil: menü düğmesi ≥ 44px", box.width >= 44 && box.height >= 44, `${box.width}×${box.height}`);
  await burger.click();
  await page.waitForTimeout(900);
  const dialog = page.getByRole("dialog", { name: "Menü" });
  check("mobil: menü açılır", await dialog.isVisible());
  check("mobil: aria-expanded=true", (await page.getByRole("button", { name: "Menüyü kapat" }).getAttribute("aria-expanded")) === "true");
  check("mobil: sayfa kaydırması kilitli", (await page.evaluate(() => document.documentElement.style.overflow)) === "hidden");
  check("mobil: menüde 7 bağlantı", (await dialog.getByRole("navigation").getByRole("link").count()) === 7);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);
  check("mobil: Esc menüyü kapatır", !(await dialog.isVisible()));
  check("mobil: kaydırma kilidi kalkar", (await page.evaluate(() => document.documentElement.style.overflow)) !== "hidden");
  await page.getByRole("button", { name: "Menüyü aç" }).click();
  await page.waitForTimeout(800);
  await dialog.getByRole("link", { name: /Hizmetler/ }).click();
  await page.waitForURL("**/hizmetler");
  await page.waitForTimeout(900);
  check("mobil: menüden gezinme çalışır ve menü kapanır", page.url().endsWith("/hizmetler") && !(await page.getByRole("dialog", { name: "Menü" }).isVisible()));
  await ctx.close();
}

// ---------- Masaüstü gezinme + CTA ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(noGl);
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("main").getByRole("link", { name: "Projenizi Konuşalım" }).first().click();
  await page.waitForURL("**/iletisim");
  check("masaüstü: hero birincil CTA → /iletisim", true);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Çalışmalarımızı Keşfedin" }).click();
  await page.waitForURL("**/projeler");
  check("masaüstü: hero ikincil CTA → /projeler", true);
  await page.locator('a[href="/projeler/atolye-mono"]:visible').first().click();
  await page.waitForURL("**/projeler/atolye-mono");
  check("masaüstü: proje detayına geçiş", await page.getByText("Bu bir konsept çalışmadır.").isVisible());
  // Klavye: ilk Tab "İçeriğe geç" bağlantısına gider
  await page.goto(base + "/hizmetler", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  check("klavye: ilk odak 'İçeriğe geç'", focused === "İçeriğe geç", focused);
  const outline = await page.evaluate(() => { const a = document.querySelector("header nav a"); a.focus(); return getComputedStyle(a).outlineStyle; });
  check("klavye: odak halkası görünür", outline !== "none", outline);
  await ctx.close();
}

// ---------- Dijital Skor ----------
{
  const { questions, computeScore, encodeAnswers } = await import("../src/lib/score.ts");
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(noGl);
  const page = await ctx.newPage();
  const posted = [];
  page.on("request", (r) => r.method() === "POST" && posted.push(r.url()));
  await page.goto(base + "/dijital-skor", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Değerlendirmeyi başlat" }).click();
  const answers = {};
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const pick = (i * 2 + 1) % 4;
    answers[q.id] = pick;
    await page.getByRole("heading", { name: q.text }).waitFor();
    await page.getByText(q.options[pick].label, { exact: true }).click();
    await page.waitForTimeout(380);
  }
  const expected = computeScore(answers);
  await page.getByTestId("band").waitFor();
  await page.waitForTimeout(2200);
  const shown = Number(await page.getByTestId("overall-score").textContent());
  check("skor: arayüzdeki genel skor modelle aynı", shown === expected.overall, `ui=${shown} model=${expected.overall}`);
  check("skor: bant etiketi doğru", (await page.getByTestId("band").textContent()) === expected.band.label);
  let catsOk = true;
  for (const c of expected.categories) catsOk &&= Number(await page.getByTestId(`cat-${c.id}`).textContent()) === c.score;
  check("skor: 5 kategori skoru modelle aynı", catsOk);
  check("skor: öneriler listelenir", (await page.locator("ol li h4").count()) === Math.min(5, expected.recommendations.length), String(expected.recommendations.length));
  check("skor: ilk öneri en yüksek etkili olan", (await page.locator("ol li h4").first().textContent()) === expected.recommendations[0].title);
  check("skor: sonuç URL'de taşınır", page.url().endsWith(`#s=${encodeAnswers(answers)}`));
  check("skor: yanıtlar sunucuya gönderilmez", posted.length === 0, posted.join(","));
  const url = page.url();
  const page2 = await ctx.newPage();
  await page2.goto(url, { waitUntil: "networkidle" });
  await page2.waitForTimeout(2400);
  check("skor: paylaşılan bağlantı aynı sonucu açar", Number(await page2.getByTestId("overall-score").textContent()) === expected.overall);
  const page3 = await ctx.newPage();
  await page3.goto(base + "/dijital-skor#s=999", { waitUntil: "networkidle" });
  check("skor: bozuk bağlantı giriş ekranına düşer", await page3.getByRole("button", { name: "Değerlendirmeyi başlat" }).isVisible());
  await page.getByRole("button", { name: "Yeniden başla" }).click();
  check("skor: yeniden başlatılabilir", await page.getByRole("button", { name: "Değerlendirmeyi başlat" }).isVisible());
  await ctx.close();
}

// ---------- İletişim formu ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(noGl);
  const page = await ctx.newPage();
  await page.goto(base + "/iletisim", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Mesajı gönder" }).click();
  await page.waitForTimeout(300);
  const alerts = await page.locator('form [role="alert"]').allTextContents();
  check("form: boş gönderimde alan hataları gösterilir", alerts.length >= 5, `${alerts.length} hata`);
  check("form: ilk hatalı alana odaklanır", (await page.evaluate(() => document.activeElement?.getAttribute("name"))) === "name");
  await page.getByLabel("Adınız").fill("Test Kullanıcı");
  await page.getByLabel("E-posta").fill("gecersiz-adres");
  await page.getByLabel("İhtiyacınız").fill("Bu bir test mesajıdır; form doğrulaması deneniyor.");
  await page.locator("form").getByText("Web Tasarım", { exact: true }).click();
  await page.locator('input[name="consent"]').check({ force: true });
  await page.getByRole("button", { name: "Mesajı gönder" }).click();
  await page.waitForTimeout(300);
  check("form: geçersiz e-posta reddedilir", (await page.locator("#email-hata").textContent()).includes("Geçerli bir e-posta"));
  await page.getByLabel("E-posta").fill("test@example.com");
  await page.waitForTimeout(2600);
  const [resp] = await Promise.all([
    page.waitForResponse((r) => r.url().endsWith("/api/contact")),
    page.getByRole("button", { name: "Mesajı gönder" }).click(),
  ]);
  check("form: e-posta servisi yokken API 503 döner", resp.status() === 503, String(resp.status()));
  await page.waitForTimeout(400);
  check("form: sahte başarı yok — dürüst hata mesajı", (await page.getByText("Mesajınız gönderilemedi.").count()) === 1 && (await page.getByText("Mesajınız gönderildi").count()) === 0);
  check("form: yazılanlar korunur", (await page.getByLabel("Adınız").inputValue()) === "Test Kullanıcı");

  // API doğrudan
  const post = (body, headers = {}) => fetch(base + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113." + Math.floor(Math.random() * 250), ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
  const valid = { name: "Ada", email: "ada@example.com", phone: "", company: "", projectTypes: ["SEO"], message: "Yeterince uzun bir deneme mesajı.", consent: true, website: "", elapsedMs: 9000 };
  let r = await post({ ...valid, email: "x" });
  let j = await r.json();
  check("api: geçersiz veri 400 + alan hatası", r.status === 400 && j.code === "invalid" && !!j.errors.email);
  r = await post({ ...valid, consent: false });
  check("api: onaysız gönderim reddedilir", r.status === 400);
  r = await post({ ...valid, message: "<script>alert(1)</script>".padEnd(3100, "x") });
  check("api: aşırı uzun mesaj reddedilir", r.status === 400);
  r = await post("{bozuk json");
  check("api: bozuk JSON 400", r.status === 400);
  r = await post("x".repeat(20000));
  check("api: büyük gövde 413", r.status === 413);
  r = await fetch(base + "/api/contact", { method: "POST", headers: { "Content-Type": "text/plain" }, body: "a" });
  check("api: yanlış içerik türü 415", r.status === 415);
  r = await post(valid, { origin: "https://kotu-site.example" });
  check("api: farklı kökenden istek 403", r.status === 403);
  r = await post({ ...valid, website: "http://spam.example" });
  j = await r.json();
  check("api: bal küpü dolu → sessizce yutulur (e-posta gönderilmez)", r.status === 200 && j.ok === true);
  r = await post({ ...valid, elapsedMs: 300 });
  check("api: çok hızlı gönderim → sessizce yutulur", r.status === 200);
  r = await fetch(base + "/api/contact");
  check("api: GET desteklenmez (405)", r.status === 405, String(r.status));
  const ip = { "x-forwarded-for": "198.51.100.77" };
  const codes = [];
  for (let i = 0; i < 7; i++) codes.push((await post(valid, ip)).status);
  check("api: hız sınırı 6. istekte 429", codes.slice(0, 5).every((c) => c === 503) && codes[5] === 429, codes.join(","));
  await ctx.close();
}

// ---------- Azaltılmış hareket ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await ctx.addInitScript(noGl);
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const state = await page.evaluate(() => ({
    lenis: document.documentElement.classList.contains("lenis"),
    pinSpacers: document.querySelectorAll(".pin-spacer").length,
    hidden: [...document.querySelectorAll("main h2, main p")].filter((el) => getComputedStyle(el).opacity === "0" || getComputedStyle(el).visibility === "hidden").length,
  }));
  check("azaltılmış hareket: yumuşak kaydırma kapalı", !state.lenis);
  check("azaltılmış hareket: sabitlenen bölüm yok", state.pinSpacers === 0);
  check("azaltılmış hareket: gizli kalan içerik yok", state.hidden === 0, String(state.hidden));
  await ctx.close();
}

// ---------- JS kapalı ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "load" });
  const text = await page.locator("main").innerText();
  check("JS kapalı: ana içerik okunur", text.includes("Güzel görünen bir site") && text.includes("Konsept çalışmalar".toLocaleUpperCase("tr")) || text.includes("Konsept çalışmalar"));
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
fs.mkdirSync("qa", { recursive: true });
fs.writeFileSync("qa/e2e-report.json", JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2));
console.log(`\n${results.length - failed.length}/${results.length} geçti`);
process.exit(failed.length ? 1 : 0);

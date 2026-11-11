import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bandFor,
  categories,
  computeScore,
  decodeAnswers,
  encodeAnswers,
  isComplete,
  questions,
  type Answers,
} from "./score.ts";

const all = (optionIndex: number): Answers =>
  Object.fromEntries(questions.map((q) => [q.id, optionIndex]));

test("model yapısı: 5 kategori, kategori başına 3 soru, ağırlıklar toplamı 1", () => {
  assert.equal(categories.length, 5);
  for (const c of categories) {
    assert.equal(questions.filter((q) => q.category === c.id).length, 3);
  }
  const total = categories.reduce((s, c) => s + c.weight, 0);
  assert.ok(Math.abs(total - 1) < 1e-9);
});

test("her sorunun seçenekleri 0'dan 3'e artan puanlıdır ve kimlikler benzersizdir", () => {
  assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
  for (const q of questions) {
    assert.deepEqual(q.options.map((o) => o.points), [0, 1, 2, 3]);
  }
});

test("tüm yanıtlar en düşükse skor 0, en yüksekse 100", () => {
  const low = computeScore(all(0));
  assert.equal(low.overall, 0);
  assert.ok(low.categories.every((c) => c.score === 0));
  assert.equal(low.band.id, "baslangic");
  assert.equal(low.recommendations.length, questions.length);

  const high = computeScore(all(3));
  assert.equal(high.overall, 100);
  assert.ok(high.categories.every((c) => c.score === 100));
  assert.equal(high.band.id, "ileri");
  assert.equal(high.recommendations.length, 0);
});

test("ağırlıklı ortalama elle hesapla tutarlı", () => {
  const answers = all(3);
  // Web kategorisini sıfırla: 100 − (0.25 × 100) = 75
  for (const q of questions.filter((q) => q.category === "web")) answers[q.id] = 0;
  const r = computeScore(answers);
  assert.equal(r.overall, 75);
  assert.equal(r.categories.find((c) => c.id === "web")!.score, 0);
  assert.equal(r.band.id, "guclu");
});

test("kategori skoru yuvarlanır: 4/9 puan → 44", () => {
  const answers = all(0);
  answers["seo-1"] = 3;
  answers["seo-2"] = 1;
  const r = computeScore(answers);
  assert.equal(r.categories.find((c) => c.id === "seo")!.score, 44);
  // genel: (4/9 × 100) × 0.2 = 8.89 → 9
  assert.equal(r.overall, 9);
});

test("öneriler etkiye göre sıralanır; yalnızca 0–1 puanlı yanıtlar öneri üretir", () => {
  const answers = all(3);
  answers["social-1"] = 0; // etki 3 × 0.15 = 0.45
  answers["web-2"] = 1; // etki 2 × 0.25 = 0.50
  answers["seo-3"] = 2; // öneri üretmez
  const r = computeScore(answers);
  assert.deepEqual(r.recommendations.map((x) => x.questionId), ["web-2", "social-1"]);
});

test("skor yanıtlar iyileştikçe asla düşmez (monotonluk)", () => {
  const answers = all(0);
  let prev = computeScore(answers).overall;
  for (const q of questions) {
    for (let i = 1; i <= 3; i++) {
      answers[q.id] = i;
      const next = computeScore(answers).overall;
      assert.ok(next >= prev, `${q.id} seçenek ${i}: ${next} < ${prev}`);
      prev = next;
    }
  }
  assert.equal(prev, 100);
});

test("eksik ya da geçersiz yanıtta hesaplama reddedilir", () => {
  const missing = all(2);
  delete missing["web-1"];
  assert.equal(isComplete(missing), false);
  assert.throws(() => computeScore(missing));
  assert.throws(() => computeScore({ ...all(2), "web-1": 7 }));
  assert.throws(() => computeScore({ ...all(2), "web-1": 1.5 }));
});

test("bant sınırları", () => {
  assert.equal(bandFor(0).id, "baslangic");
  assert.equal(bandFor(39).id, "baslangic");
  assert.equal(bandFor(40).id, "gelisiyor");
  assert.equal(bandFor(64).id, "gelisiyor");
  assert.equal(bandFor(65).id, "guclu");
  assert.equal(bandFor(84).id, "guclu");
  assert.equal(bandFor(85).id, "ileri");
  assert.equal(bandFor(100).id, "ileri");
});

test("yanıt kodlama gidiş-dönüşü ve bozuk kodların reddi", () => {
  const answers = all(0);
  questions.forEach((q, i) => (answers[q.id] = i % 4));
  const code = encodeAnswers(answers);
  assert.equal(code.length, questions.length);
  assert.deepEqual(decodeAnswers(code), answers);
  assert.equal(decodeAnswers("123"), null);
  assert.equal(decodeAnswers("9".repeat(questions.length)), null);
  assert.equal(decodeAnswers("a".repeat(questions.length)), null);
});

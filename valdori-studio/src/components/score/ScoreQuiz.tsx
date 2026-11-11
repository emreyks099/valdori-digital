"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  categories,
  computeScore,
  decodeAnswers,
  encodeAnswers,
  isComplete,
  questions,
  type Answers,
  type ScoreResult,
} from "@/lib/score";
import { getService } from "@/lib/services";
import { Button, ButtonLink, ArrowIcon } from "@/components/ui/Button";

type Phase = "intro" | "quiz" | "result";

const R = 132;
const C = 2 * Math.PI * R;

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setN(target), 0);
      return () => window.clearTimeout(id);
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1600);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

function Result({ result, onRestart }: { result: ScoreResult; onRestart: () => void }) {
  const shown = useCountUp(result.overall, true);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, []);

  const top = result.recommendations.slice(0, 5);

  return (
    <div>
      <div className="grid gap-x-[clamp(2rem,6vw,7rem)] gap-y-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
        <div className="relative mx-auto size-[min(78vw,21rem)] lg:size-[24rem]">
          <svg viewBox="0 0 300 300" className="size-full -rotate-90" aria-hidden="true">
            <circle cx="150" cy="150" r={R} fill="none" stroke="#222225" strokeWidth="2" />
            <circle
              cx="150"
              cy="150"
              r={R}
              fill="none"
              stroke="#FF6828"
              strokeWidth="6"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - shown / 100)}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <p>
              <span className="t-serif block text-[clamp(6.5rem,26vw,10.5rem)] leading-[0.85] text-bone tabular-nums" data-testid="overall-score">
                {shown}
              </span>
              <span className="t-sign mt-3 block text-ash-500">100 üzerinden</span>
            </p>
          </div>
        </div>

        <div>
          <p className="t-sign text-ember-500">Dijital Skorunuz</p>
          <h2 ref={headingRef} tabIndex={-1} className="t-h1 mt-4 outline-none" data-testid="band">
            {result.band.label}
          </h2>
          <p className="t-lede mt-5 max-w-[36rem] text-ash-400">{result.band.summary}</p>
          <p className="mt-6 max-w-[36rem] border-l border-ember-500 pl-4 text-[0.875rem] leading-relaxed text-ash-500">
            Bu skor, verdiğiniz yanıtlara dayalı bir ön değerlendirmedir; sitenizin teknik denetimi
            değildir. Yanıtlarınız yalnızca tarayıcınızda işlenir, sunucuya gönderilmez.
          </p>
        </div>
      </div>

      <section aria-labelledby="kategori-sonuc" className="mt-[clamp(4rem,8vw,7rem)]">
        <h3 id="kategori-sonuc" className="t-sign text-ash-500">
          Alan bazında
        </h3>
        <ul className="mt-6 border-t hairline">
          {result.categories.map((c) => (
            <li key={c.id} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 border-b hairline py-5 md:grid-cols-[14rem_1fr_auto]">
              <span className="t-h3 text-bone">{c.name}</span>
              <span className="col-span-2 row-start-2 h-1.5 bg-ink-700 md:col-span-1 md:row-start-auto" aria-hidden="true">
                <span
                  className={`block h-full origin-left transition-[width] duration-[1400ms] ease-out-expo ${c.score >= 65 ? "bg-bone" : "bg-ember-500"}`}
                  style={{ width: `${Math.max(c.score, 2)}%` }}
                />
              </span>
              <span className="t-serif text-[2.25rem] leading-none text-bone tabular-nums" data-testid={`cat-${c.id}`}>
                {c.score}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="oneri-baslik" className="mt-[clamp(4rem,8vw,7rem)]">
        <h3 id="oneri-baslik" className="t-h2">
          {top.length > 0 ? "Önce bunlara odaklanın" : "Belirgin bir boşluk görünmüyor"}
        </h3>
        {top.length === 0 ? (
          <p className="t-lede mt-5 max-w-[40rem] text-ash-400">
            Yanıtlarınıza göre beş alanın hepsinde sağlam bir yerdesiniz. Bundan sonrası ölçüm ve
            ince ayar: mevcut sistemlerinizin gerçekten ne kadar iyi çalıştığını birlikte
            inceleyebiliriz.
          </p>
        ) : (
          <ol className="mt-8 border-t hairline">
            {top.map((r, i) => {
              const service = getService(r.service);
              return (
                <li key={r.questionId} className="grid gap-x-8 gap-y-3 border-b hairline py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)]">
                  <span className="t-serif text-[3.25rem] leading-[0.8] text-ember-500">{i + 1}</span>
                  <div>
                    <p className="t-sign mb-2 text-ash-500">{categories.find((c) => c.id === r.category)?.name}</p>
                    <h4 className="t-h3 text-bone">{r.title}</h4>
                  </div>
                  <div>
                    <p className="text-ash-400">{r.body}</p>
                    {service && (
                      <Link href={`/hizmetler/${service.slug}`} className="group mt-4 inline-flex min-h-11 items-center gap-2">
                        <span className="t-sign link-line text-bone">{service.name} hizmeti</span>
                        <ArrowIcon className="text-ember-500 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <ButtonLink href="/iletisim">Sonuçları birlikte konuşalım</ButtonLink>
        <Button
          variant="ghost"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2400);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? "Bağlantı kopyalandı" : "Sonuç bağlantısını kopyala"}
        </Button>
        <button type="button" onClick={onRestart} className="t-sign link-line min-h-11 self-start px-1 text-bone/80 hover:text-bone sm:self-auto">
          Yeniden başla
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Sonuç bağlantısı panoya kopyalandı." : ""}
      </p>
    </div>
  );
}

export function ScoreQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const questionRef = useRef<HTMLHeadingElement>(null);

  // Paylaşılan bağlantı (#s=…) ile gelindiyse sonucu doğrudan göster
  useEffect(() => {
    const m = window.location.hash.match(/^#s=([0-3]+)$/);
    if (!m) return;
    const decoded = decodeAnswers(m[1]);
    if (!decoded) return;
    const id = window.setTimeout(() => {
      setAnswers(decoded);
      setPhase("result");
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const result = useMemo(() => (phase === "result" && isComplete(answers) ? computeScore(answers) : null), [phase, answers]);

  const q = questions[index];
  const category = categories.find((c) => c.id === q.category)!;
  const selected = answers[q.id];

  const go = useCallback((next: number) => {
    setIndex(next);
    requestAnimationFrame(() => questionRef.current?.focus({ preventScroll: true }));
  }, []);

  const finish = (final: Answers) => {
    window.history.replaceState(null, "", `#s=${encodeAnswers(final)}`);
    setPhase("result");
  };

  const choose = (optionIndex: number) => {
    const nextAnswers = { ...answers, [q.id]: optionIndex };
    setAnswers(nextAnswers);
    // Kısa bir duraksama: seçim görünür, sonra ilerler
    window.setTimeout(() => {
      if (index < questions.length - 1) go(index + 1);
      else if (isComplete(nextAnswers)) finish(nextAnswers);
    }, 260);
  };

  const restart = () => {
    window.history.replaceState(null, "", window.location.pathname);
    setAnswers({});
    setIndex(0);
    setPhase("intro");
    window.scrollTo({ top: 0 });
  };

  if (phase === "result" && result) return <Result result={result} onRestart={restart} />;

  if (phase === "intro") {
    return (
      <div className="grid gap-x-[clamp(2rem,6vw,7rem)] gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="t-lede max-w-[34rem] text-bone/80">
            Beş alanda on beş kısa soru. Her soruda işletmenizi en iyi anlatan seçeneği işaretleyin;
            sonunda 100 üzerinden bir skor, alan bazında dağılım ve öncelikli adımlarınızı görün.
          </p>
          <ul className="mt-8 space-y-3 text-ash-400">
            {["Yaklaşık üç dakika sürer.", "Ad, e-posta ya da telefon istenmez.", "Yanıtlarınız tarayıcınızdan çıkmaz."].map((t) => (
              <li key={t} className="flex gap-4">
                <span className="mt-[0.7em] h-px w-5 shrink-0 bg-ember-500" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button onClick={() => { setPhase("quiz"); go(0); }}>Değerlendirmeyi başlat</Button>
          </div>
        </div>
        <ol className="border-t hairline">
          {categories.map((c, i) => (
            <li key={c.id} className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b hairline py-5">
              <span className="t-data text-ember-500">0{i + 1}</span>
              <span>
                <span className="t-h3 block text-bone">{c.name}</span>
                <span className="mt-1 block text-[0.9375rem] text-ash-400">{c.blurb}</span>
              </span>
              <span className="t-data text-ash-500">ağırlık %{Math.round(c.weight * 100)}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="mx-auto max-w-[60rem]">
      <div className="flex items-center justify-between gap-6">
        <p className="t-sign text-ember-500">{category.name}</p>
        <p className="t-data text-ash-500" aria-live="polite">
          Soru {index + 1} / {questions.length}
        </p>
      </div>
      <div className="mt-4 h-px bg-bone/15" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="İlerleme">
        <span className="block h-px origin-left bg-ember-500 transition-[width] duration-700 ease-out-expo" style={{ width: `${progress}%` }} />
      </div>

      <fieldset key={q.id} className="mt-10 motion-safe:animate-[fade-in_.5s_ease-out_both]">
        <legend className="w-full">
          <h2 ref={questionRef} tabIndex={-1} className="t-h2 text-balance outline-none">
            {q.text}
          </h2>
        </legend>
        <div className="mt-8 border-t hairline">
          {q.options.map((o, i) => {
            const on = selected === i;
            return (
              <label
                key={o.label}
                className={`group flex min-h-16 cursor-pointer items-center gap-5 border-b hairline px-1 py-4 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ember-400 ${
                  on ? "text-bone" : "text-ash-400 hover:text-bone"
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  className="sr-only"
                  checked={on}
                  onChange={() => choose(i)}
                  onClick={() => on && choose(i)}
                />
                <span
                  aria-hidden="true"
                  className={`grid size-6 shrink-0 place-items-center border transition-colors duration-300 ${
                    on ? "border-ember-500 bg-ember-500" : "border-bone/35 group-hover:border-bone"
                  }`}
                >
                  <span className={`size-2 bg-ink-950 transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
                </span>
                <span className="text-[1.0625rem] leading-snug sm:text-[1.1875rem]">{o.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => (index === 0 ? setPhase("intro") : go(index - 1))}
          className="t-sign link-line min-h-11 text-bone/80 hover:text-bone"
        >
          Geri
        </button>
        {selected !== undefined && index < questions.length - 1 && (
          <button type="button" onClick={() => go(index + 1)} className="t-sign link-line min-h-11 text-bone/80 hover:text-bone">
            İleri
          </button>
        )}
        {selected !== undefined && index === questions.length - 1 && isComplete(answers) && (
          <Button onClick={() => finish(answers)}>Sonucu gör</Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { processSteps } from "@/lib/services";
import { ensureGsap, gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Çalışma süreci. Masaüstünde bölüm sabitlenir ve altı adım yatay akar; ilerleme
 * çizgisi kor rengiyle dolar. Mobilde sabitleme yoktur: adımlar dikey bir zaman
 * çizgisinde okunur.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const trackEl = track.current!;
        const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        tl.to(trackEl, { x: () => -distance(), ease: "none" }, 0).fromTo(
          bar.current,
          { scaleX: 0.04 },
          { scaleX: 1, ease: "none" },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="surec-baslik" className="relative bg-paper text-ink-950">
      <div ref={pin} className="flex flex-col overflow-hidden py-[var(--section)] lg:h-svh lg:min-h-[44rem] lg:py-0">
        <div className="shell lg:pt-[calc(var(--header-h)+2.5rem)]">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h2 id="surec-baslik" className="t-h1 max-w-[12ch]">
              Fikirden yayına altı adım.
            </h2>
            <p className="max-w-[26rem] text-[1.0625rem] text-ink-950/70">
              Her adımın bir çıktısı vardır. Bir sonrakine, o çıktıyı birlikte gördükten sonra
              geçeriz; sürpriz olmaz.
            </p>
          </div>
          <div aria-hidden="true" className="mt-8 hidden h-px w-full bg-ink-950/15 lg:block">
            <span ref={bar} className="block h-px origin-left bg-ember-700" />
          </div>
        </div>

        <ol
          ref={track}
          className="shell mt-10 flex flex-col lg:mt-0 lg:w-max lg:max-w-none lg:flex-1 lg:flex-row lg:items-stretch lg:pr-[12vw] lg:will-change-transform"
        >
          {processSteps.map((s, i) => (
            <li
              key={s.name}
              className="relative flex gap-6 border-t hairline-dark py-8 lg:w-[34vw] lg:max-w-[36rem] lg:shrink-0 lg:flex-col lg:justify-end lg:gap-0 lg:border-l lg:border-t-0 lg:px-[2.5vw] lg:pb-[max(3rem,7vh)] lg:pt-10 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="t-serif w-[4.5rem] shrink-0 text-[4.25rem] leading-[0.8] text-ember-700 lg:w-auto lg:text-[clamp(7rem,17vh,13rem)]">
                {i + 1}
              </span>
              <div className="lg:mt-[4vh]">
                <h3 className="font-display text-[clamp(2rem,3.6vw,3.75rem)] font-extrabold uppercase leading-[0.9] [font-stretch:68%]">
                  {s.name}
                </h3>
                <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-[1.55] text-ink-950/75">{s.desc}</p>
                <p className="mt-6 flex items-center gap-3">
                  <span className="t-sign text-ink-950/55">Çıktı</span>
                  <span className="h-px w-8 bg-ember-700" />
                  <span className="t-sign">{s.output}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

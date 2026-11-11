"use client";

import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { ensureGsap, gsap, MQ, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";

/**
 * Kapanış çağrısı. Başlığın genişliği imlecin yatay konumunu izler: tipografi,
 * ziyaretçinin hareketine yanıt veren tek "nesne"dir. Dokunmatik cihazlarda kaydırmaya bağlanır.
 */
export function FinalCta({
  title = ["Projenizi", "konuşalım."],
  lede = "Aklınızdaki iş bir web sitesi, bir otomasyon ya da henüz adı konmamış bir fikir olabilir. Kısa bir görüşmeyle neyin mümkün olduğunu birlikte netleştirelim.",
}: {
  title?: [string, string];
  lede?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = root.current;
      if (!el) return;
      const lines = el.querySelectorAll<HTMLElement>("[data-kinetic]");
      const mm = gsap.matchMedia();

      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const setters = Array.from(lines).map((l) =>
          gsap.quickTo(l, "--w", { duration: 0.9, ease: "power3.out" }),
        );
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
          setters[0]?.(62 + p * 44);
          setters[1]?.(106 - p * 44);
        };
        el.addEventListener("pointermove", move);
        return () => el.removeEventListener("pointermove", move);
      });

      mm.add(`(hover: none) and ${MQ.motion}`, () => {
        gsap.fromTo(
          lines[0],
          { "--w": 62 },
          { "--w": 88, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.5 } },
        );
        gsap.fromTo(
          lines[1],
          { "--w": 88 },
          { "--w": 62, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.5 } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cta-baslik" className="grain relative isolate overflow-clip bg-ink-950">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ember-500/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_60%_at_50%_55%,rgba(255,104,40,0.16),transparent_70%)]" />
      </div>
      <div className="shell flex flex-col items-center py-[clamp(7rem,17vw,16rem)] text-center">
        <h2 id="cta-baslik" className="w-full">
          <span className="sr-only">{title.join(" ")}</span>
          {title.map((line, i) => (
            <span
              key={line}
              aria-hidden="true"
              data-kinetic
              className="block whitespace-nowrap font-display text-[clamp(3.25rem,14.2vw,17rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.015em]"
              style={
                {
                  "--w": i === 0 ? 62 : 84,
                  fontStretch: "calc(var(--w) * 1%)",
                  color: i === 1 ? "var(--color-ember-500)" : undefined,
                } as React.CSSProperties
              }
            >
              {line}
            </span>
          ))}
        </h2>
        <p className="t-lede mt-9 max-w-[36rem] text-pretty text-bone/75">{lede}</p>
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
          <Magnetic>
            <ButtonLink href="/iletisim">Projenizi Konuşalım</ButtonLink>
          </Magnetic>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="t-sign link-line flex min-h-11 items-center text-bone/80 hover:text-bone"
          >
            Instagram’da yazın
          </a>
        </div>
      </div>
    </section>
  );
}

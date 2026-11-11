"use client";

import { useRef } from "react";
import { ensureGsap, gsap, MQ, useGSAP } from "@/lib/gsap";
import { SplitLines } from "@/components/motion/Reveal";

/**
 * Aynı ekran, iki bakış: solda görünen tasarım, sağda onu ayakta tutan mühendislik.
 * Kaydırdıkça kor çizgisi ekranı tarar ve tasarımın altındaki yapıyı açığa çıkarır.
 * İki katman aynı geometriyi paylaşır; yalnızca "mode" değişir.
 */

type Mode = "design" | "blueprint";

const boxes = {
  nav: "left-[5%] right-[5%] top-[6%] h-[7%]",
  title: "left-[5%] top-[20%] h-[37%] w-[51%]",
  text: "left-[5%] top-[61%] h-[11%] w-[36%]",
  cta: "left-[5%] top-[77%] h-[10%] w-[21%]",
  media: "left-[61%] top-[19%] h-[68%] w-[34%]",
} as const;

function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`absolute whitespace-nowrap font-mono text-[max(9px,1.02cqw)] leading-none text-ember-400 ${className}`}>
      {children}
    </span>
  );
}

function Mock({ mode }: { mode: Mode }) {
  const d = mode === "design";
  const outline = "border border-dashed border-bone/35";
  return (
    <div
      className={`absolute inset-0 ${d ? "bg-[#E7E0D4] text-[#1B1916]" : "bg-ink-950 text-bone"}`}
      style={
        d
          ? undefined
          : {
              backgroundImage:
                "linear-gradient(rgba(244,241,236,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,236,.055) 1px, transparent 1px)",
              backgroundSize: "calc(100% / 24) calc(100% / 14)",
            }
      }
    >
      {/* nav */}
      <div className={`absolute flex items-center justify-between ${boxes.nav} ${d ? "" : `${outline} px-[1%]`}`}>
        {d ? (
          <>
            <span className="text-[1.5cqw] font-semibold uppercase tracking-[0.18em] [font-stretch:125%]">Mono</span>
            <span className="flex gap-[2.4cqw] text-[1.25cqw]">
              <span>Koleksiyon</span>
              <span>Atölye</span>
              <span>Sipariş</span>
            </span>
          </>
        ) : (
          <Note className="left-[1cqw] top-1/2 -translate-y-1/2">{"<header> · <nav aria-label>"}</Note>
        )}
      </div>

      {/* başlık */}
      <div className={`absolute ${boxes.title} ${d ? "" : outline}`}>
        {d ? (
          <p className="t-serif text-[8.4cqw] leading-[0.92]">
            Elle yapılır,
            <br />
            ömür boyu
            <br />
            kalır.
          </p>
        ) : (
          <>
            <Note className="left-[1cqw] top-[1cqw]">{"<h1>"}</Note>
            <Note className="bottom-[1cqw] left-[1cqw]">font-size: clamp(2.5rem, 8.4vw, 9rem)</Note>
            <span className="absolute -right-px top-0 h-full w-px bg-ember-500/70" />
            <Note className="right-[1cqw] top-1/2 -translate-y-1/2">7 / 12 sütun</Note>
          </>
        )}
      </div>

      {/* metin */}
      <div className={`absolute ${boxes.text} ${d ? "" : outline}`}>
        {d ? (
          <p className="text-[1.5cqw] leading-[1.4]">
            Sipariş üzerine, masif ağaçtan. Her parça atölyemizde tek tek ölçülür, kesilir ve
            elle bitirilir.
          </p>
        ) : (
          <Note className="left-[1cqw] top-1/2 -translate-y-1/2">max-width: 36ch · kontrast 12.6 : 1</Note>
        )}
      </div>

      {/* çağrı */}
      <div
        className={`absolute flex items-center ${boxes.cta} ${
          d ? "justify-between bg-[#1B1916] px-[1.6cqw] text-[#E7E0D4]" : outline
        }`}
      >
        {d ? (
          <>
            <span className="text-[1.25cqw] uppercase tracking-[0.1em] [font-stretch:112%]">Siparişe başla</span>
            <span className="size-[1.1cqw] bg-[#A4532B]" />
          </>
        ) : (
          <Note className="left-[1cqw]">{"<a> · 48px · :focus-visible"}</Note>
        )}
      </div>

      {/* görsel */}
      <div className={`absolute overflow-hidden ${boxes.media} ${d ? "bg-[#D8CDBB]" : outline}`}>
        {d ? (
          <>
            <span className="absolute bottom-0 left-[18%] h-[78%] w-[58%] rounded-t-full bg-[#A4532B]" />
            <span className="absolute bottom-0 left-[44%] h-[52%] w-[52%] rounded-t-full bg-[#C19A6B] mix-blend-multiply" />
            <span className="absolute bottom-[16%] left-[10%] aspect-square w-[22%] rounded-full bg-[#1B1916]" />
          </>
        ) : (
          <>
            <svg className="absolute inset-0 size-full text-bone/25" preserveAspectRatio="none" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M0 0 10 10M10 0 0 10" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <Note className="left-[1cqw] top-[1cqw]">{"<img> · AVIF · lazy"}</Note>
            <Note className="bottom-[1cqw] left-[1cqw]">aspect-ratio: 4 / 5 · CLS 0</Note>
          </>
        )}
      </div>

      {!d && (
        <>
          <Note className="bottom-[2.2%] left-[5%] !text-bone/60">grid: 12 sütun · gap 24px</Note>
          <Note className="bottom-[2.2%] right-[5%] !text-bone/60">LCP hedefi ≤ 2,5 sn</Note>
        </>
      )}
    </div>
  );
}

export function CraftSplit() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = frame.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          el,
          { "--split": "88%" },
          {
            "--split": "12%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 35%",
              scrub: 0.5,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="craft-baslik" className="section-y relative overflow-clip bg-ink-900">
      <div className="shell">
        <div className="grid-12 items-end gap-y-6">
          <SplitLines as="h2" className="t-h1 col-span-12 lg:col-span-7">
            <span id="craft-baslik">Gördüğünüz tasarım. Görmediğiniz mühendislik.</span>
          </SplitLines>
          <div className="col-span-12 max-w-[34rem] lg:col-span-4 lg:col-start-9">
            <p className="t-lede text-ash-400">
              Bir ekranın güzel görünmesi işin yarısı. Diğer yarısı; hızlı açılması, her cihazda
              doğru çalışması, arama motorlarınca anlaşılması ve herkes tarafından kullanılabilmesi.
              İkisini aynı ekip, aynı anda tasarlar.
            </p>
          </div>
        </div>

        <div
          ref={frame}
          className="relative mt-12 lg:mt-20"
          style={{ "--split": "50%" } as React.CSSProperties}
        >
          <div className="mb-4 flex justify-between">
            <span className="t-sign text-bone">Tasarım</span>
            <span className="t-sign text-ember-500">Mühendislik</span>
          </div>
          <div
            aria-hidden="true"
            className="cut-both relative aspect-[16/10] w-full overflow-hidden [container-type:inline-size] max-sm:aspect-[4/3]"
          >
            <Mock mode="design" />
            <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 var(--split))" }}>
              <Mock mode="blueprint" />
            </div>
            <div
              className="absolute inset-y-0 w-px bg-ember-500 shadow-[0_0_24px_2px_rgba(255,104,40,0.7)]"
              style={{ left: "var(--split)" }}
            >
              <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ember-500" />
            </div>
          </div>
          <p className="sr-only">
            Bir web sayfası tasarımının iki katmanı gösteriliyor: görünen tasarım ve altındaki
            teknik yapı; semantik HTML etiketleri, duyarlı tipografi ölçüleri, on iki sütunlu ızgara,
            erişilebilirlik ve performans hedefleri.
          </p>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-8 border-t hairline pt-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {[
            ["Performans", "Görsel, yazı tipi ve kod; ilk açılışa göre önceliklendirilir."],
            ["Erişilebilirlik", "Klavye, ekran okuyucu ve kontrast, tasarımın parçasıdır."],
            ["SEO altyapısı", "Semantik yapı ve yapılandırılmış veri ilk günden hazırdır."],
            ["Sürdürülebilir kod", "Tip güvenli, modüler ve belgelenmiş; büyümeye açık."],
          ].map(([t, d]) => (
            <div key={t}>
              <dt className="t-h3 text-bone">{t}</dt>
              <dd className="mt-2 max-w-[26ch] text-[0.9375rem] text-ash-400">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

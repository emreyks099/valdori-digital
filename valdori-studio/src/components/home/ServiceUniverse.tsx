"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/services";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import { ArrowIcon } from "@/components/ui/Button";
import { SplitLines } from "@/components/motion/Reveal";

/**
 * Hizmet evreni. Masaüstünde satırın üzerine gelindiğinde ad genişler (Archivo'nun
 * genişlik ekseni), sahnedeki glif değişir. Dokunmatik cihazlarda hover'a bağımlılık
 * yoktur: her satır açıklamasıyla birlikte doğrudan görünür.
 */
export function ServiceUniverse() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="hizmet-evreni" className="section-y relative bg-ink-950">
      <div className="shell">
        <div className="grid-12 items-end gap-y-6">
          <SplitLines as="h2" className="t-h1 col-span-12 lg:col-span-8">
            <span id="hizmet-evreni">Altı disiplin, tek stüdyo.</span>
          </SplitLines>
          <p className="t-lede col-span-12 max-w-[32rem] text-ash-400 lg:col-span-4 lg:justify-self-end">
            Ayrı ajanslar, ayrı toplantılar, birbirini tanımayan sistemler yerine; baştan birlikte
            düşünülmüş tek bir bütün.
          </p>
        </div>

        <div className="mt-12 grid gap-x-[clamp(1.5rem,4vw,5rem)] lg:mt-20 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <ul className="border-t hairline">
            {services.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.slug} className="border-b hairline">
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    onPointerEnter={(e) => e.pointerType !== "touch" && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative block py-6 lg:py-7"
                  >
                    <span className="flex items-baseline gap-4 lg:gap-8">
                      <span
                        className={`t-data w-6 shrink-0 transition-colors duration-500 ${
                          on ? "text-ember-500" : "text-ash-600"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`min-w-0 flex-1 font-display text-[clamp(2.375rem,5.3vw,5.25rem)] lg:whitespace-nowrap font-extrabold uppercase leading-[0.9] tracking-[-0.015em] transition-[font-stretch,color] duration-700 ease-out-expo ${
                          on
                            ? "text-bone lg:[font-stretch:100%]"
                            : "text-bone lg:text-ash-600 lg:[font-stretch:62%]"
                        } [font-stretch:62%]`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`grid size-10 shrink-0 place-items-center self-center border transition-colors duration-500 lg:size-12 ${
                          on
                            ? "border-ember-500 bg-ember-500 text-ink-950"
                            : "border-bone/20 text-bone"
                        }`}
                      >
                        <ArrowIcon />
                      </span>
                    </span>

                    {/* Mobilde her zaman açık; masaüstünde yalnızca etkin satırda */}
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo lg:pl-14 ${
                        on ? "lg:grid-rows-[1fr] lg:opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[38rem] pl-10 pt-4 text-ash-400 lg:pl-0 lg:pt-5 lg:text-[1.0625rem]">
                          {s.short}
                        </span>
                        <span className="hidden flex-wrap gap-x-5 gap-y-1 pt-4 lg:flex">
                          {s.tags.map((t) => (
                            <span key={t} className="t-sign text-bone/70">
                              {t}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Sahne — yalnızca masaüstü */}
          <div aria-hidden="true" className="relative hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="cut-both relative aspect-[4/5] overflow-hidden bg-ink-900">
                <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(255,104,40,0.2),transparent_65%)]" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember-500 to-transparent" />
                {services.map((s, i) => (
                  <div
                    key={s.slug}
                    className={`absolute inset-0 grid place-items-center p-[12%] text-bone transition-[opacity,transform] duration-700 ease-out-expo ${
                      active === i ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"
                    }`}
                  >
                    <ServiceGlyph slug={s.slug} className="size-full" />
                  </div>
                ))}
                <div className="absolute inset-x-6 top-5 flex justify-between">
                  <span className="t-data text-ash-500">
                    0{active + 1} / 0{services.length}
                  </span>
                  <span className="t-sign text-ash-500">{services[active].name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { projects } from "@/lib/projects";
import { ConceptCover } from "@/components/work/ConceptCover";
import { SplitLines, Fade } from "@/components/motion/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";

const layout = [
  "lg:col-span-8 lg:col-start-1",
  "lg:col-span-6 lg:col-start-7 lg:-mt-[8vw]",
  "lg:col-span-7 lg:col-start-2",
] as const;

export function WorkPreview() {
  const featured = projects.slice(0, 3);
  return (
    <section aria-labelledby="calismalar-baslik" className="section-y relative overflow-clip bg-ink-950">
      <div className="shell">
        <div className="grid-12 items-end gap-y-6">
          <SplitLines as="h2" className="t-display col-span-12 lg:col-span-8">
            <span id="calismalar-baslik">Konsept çalışmalar</span>
          </SplitLines>
          <Fade className="col-span-12 max-w-[30rem] lg:col-span-4 lg:justify-self-end">
            <p className="text-ash-400">
              Buradaki çalışmalar müşteri projesi değildir. Yaklaşımımızı göstermek için kurgusal
              markalar üzerine hazırlanmış konseptlerdir.
            </p>
          </Fade>
        </div>

        <ul className="grid-12 mt-14 gap-y-16 lg:mt-24 lg:gap-y-[9vw]">
          {featured.map((p, i) => (
            <li key={p.slug} className={`col-span-12 ${layout[i]}`}>
              <Link href={`/projeler/${p.slug}`} className="group block">
                <div className="cut relative overflow-hidden bg-ink-800">
                  <ConceptCover
                    cover={p.cover}
                    className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.035]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="t-sign mb-3 flex items-center gap-3 text-ash-500">
                      <span className="size-1.5 bg-ember-500" />
                      Konsept · {p.sector}
                    </p>
                    <h3 className="t-h2">{p.title}</h3>
                    <p className="mt-2 max-w-[34rem] text-ash-400">{p.summary}</p>
                  </div>
                  <span className="mt-1 grid size-11 shrink-0 place-items-center border border-bone/20 text-bone transition-colors duration-500 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-ink-950">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center lg:mt-24">
          <ButtonLink href="/projeler" variant="ghost">
            Tüm çalışmaları görün
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

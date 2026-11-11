import type { Service } from "@/lib/services";
import { ServiceGlyph } from "./ServiceGlyph";

/** Hizmet sayfası hero sahnesi: obsidyen bir zemin, alttan vuran kor ışığı ve hizmetin glifi. */
export function ServiceStage({ service }: { service: Service }) {
  return (
    <div className="cut-both relative isolate overflow-hidden bg-ink-900">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_72%_110%,rgba(255,104,40,0.28),transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember-500 to-transparent" />
        <div className="absolute inset-y-0 left-[38%] hidden w-px bg-bone/10 md:block" />
      </div>
      <div className="grid items-end gap-8 p-6 sm:p-10 md:grid-cols-[38%_1fr] md:gap-0 md:p-0">
        <ul className="order-2 space-y-3 md:order-1 md:p-10 lg:p-14">
          {service.tags.map((t, i) => (
            <li key={t} className="flex items-baseline gap-4 border-t hairline pt-3">
              <span className="t-data text-ember-500">0{i + 1}</span>
              <span className="t-h3 text-bone">{t}</span>
            </li>
          ))}
        </ul>
        <div className="order-1 grid place-items-center md:order-2 md:py-14">
          <ServiceGlyph slug={service.slug} className="w-[min(100%,20rem)] text-bone md:w-[min(62%,28rem)]" />
        </div>
      </div>
    </div>
  );
}

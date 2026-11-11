/** Sık sorulan sorular — yerel <details>; JS gerektirmez, klavye ile tam kullanılabilir. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t hairline">
      {items.map((f) => (
        <details key={f.q} className="group border-b hairline">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="t-h3 text-bone transition-colors duration-300 group-open:text-ember-400">{f.q}</h3>
            <span
              aria-hidden="true"
              className="relative mt-1 size-5 shrink-0 text-bone transition-transform duration-500 ease-out-expo group-open:rotate-45"
            >
              <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
            </span>
          </summary>
          <p className="max-w-[46rem] pb-8 text-ash-400 text-pretty">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

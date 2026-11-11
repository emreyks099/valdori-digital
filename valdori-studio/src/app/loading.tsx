export default function Loading() {
  return (
    <div className="grid min-h-svh place-items-center bg-ink-950" role="status" aria-live="polite">
      <span className="sr-only">Yükleniyor…</span>
      <span aria-hidden="true" className="h-24 w-px origin-top bg-ember-500 motion-safe:animate-[blade_1.1s_var(--ease-out-expo)_infinite_alternate]" />
    </div>
  );
}

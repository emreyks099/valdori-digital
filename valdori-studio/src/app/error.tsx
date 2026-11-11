"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-svh flex-col justify-center bg-ink-950 pb-16 pt-[calc(var(--header-h)+3rem)]">
      <div className="shell">
        <p className="t-sign text-ember-500">Hata</p>
        <h1 className="t-h1 mt-5 max-w-[14ch]">Sayfa yüklenirken bir sorun oluştu.</h1>
        <p className="t-lede mt-5 max-w-[34rem] text-ash-400">
          Sorun bizden kaynaklanıyor. Sayfayı yeniden yüklemeyi deneyin; devam ederse biraz sonra
          tekrar gelin.
        </p>
        {error.digest && <p className="t-data mt-4 text-ash-600">Hata kodu: {error.digest}</p>}
        <div className="mt-9">
          <Button onClick={() => reset()}>Yeniden dene</Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Istanbul",
});

/** Türkiye saati. Sunucuda boş render edilir; hydration uyuşmazlığı oluşmaz. */
export function TurkeyClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`t-data inline-block min-w-[8.5ch] ${className}`}>
      <span className="text-ash-600">TR </span>
      <time suppressHydrationWarning>{time ?? "--:--"}</time>
    </span>
  );
}

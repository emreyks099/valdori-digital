"use client";

import { useEffect, useRef, useState } from "react";
import { Segmented, SignatureShell } from "./SignatureShell";

type Msg = { from: "user" | "ai"; text: string; source?: string };

const scenarios = [
  {
    id: "destek",
    label: "Müşteri desteği",
    context: "Bir e-ticaret sitesinde",
    messages: [
      { from: "user", text: "Siparişim ne zaman gelir? Dün verdim." },
      { from: "ai", text: "Siparişiniz bugün kargoya verildi. Tahmini teslim iki iş günü içinde. Takip bağlantısını e-posta adresinize gönderdim." },
      { from: "user", text: "Beden uymazsa iade edebiliyor muyum?" },
      { from: "ai", text: "Evet, teslimden sonraki 14 gün içinde ücretsiz iade edebilirsiniz. İsterseniz iade adımlarını şimdi ileteyim.", source: "İade ve değişim politikası" },
    ],
    behind: [
      "Sipariş durumu, mağazanın sipariş sisteminden anlık okunur.",
      "İade koşulları, yalnızca yayımlanmış politika metninden yanıtlanır.",
      "Hasarlı ürün gibi istisnalar, özetle birlikte destek ekibine devredilir.",
    ],
  },
  {
    id: "randevu",
    label: "Randevu",
    context: "Bir kliniğin web sitesinde",
    messages: [
      { from: "user", text: "Bu hafta kontrol için uygun saatiniz var mı?" },
      { from: "ai", text: "Perşembe 11.00 ve Cuma 15.30 uygun görünüyor. Hangisini ayırmamı istersiniz?" },
      { from: "user", text: "Cuma olsun. Dişim de biraz ağrıyor, ilaç önerir misiniz?" },
      { from: "ai", text: "Cuma 15.30 için randevunuzu oluşturdum. İlaç konusunda öneride bulunamam; bunu hekiminiz değerlendirmeli. Ağrınız artarsa kliniği doğrudan aramanızı öneririm." },
    ],
    behind: [
      "Uygun saatler randevu takviminden okunur, seçilen saat takvime işlenir.",
      "Tıbbi değerlendirme gerektiren sorular bilinçli olarak yanıtlanmaz.",
      "Randevudan bir gün önce hatırlatma otomatik gönderilir.",
    ],
  },
  {
    id: "bilgi",
    label: "Bilgi asistanı",
    context: "Şirket içi, çalışanlar için",
    messages: [
      { from: "user", text: "Yıllık izin için kaç gün önceden başvurmam gerekiyor?" },
      { from: "ai", text: "Beş günden uzun izinler için en az iki hafta önce yöneticinize başvurmanız gerekiyor. Daha kısa izinlerde üç iş günü yeterli.", source: "İK Yönetmeliği, izin başvuruları bölümü" },
      { from: "user", text: "Peki bu yıl kaç günüm kaldı?" },
      { from: "ai", text: "Kişisel izin bakiyenize erişimim yok. Bu bilgiyi İK portalındaki “İzinlerim” sayfasında görebilirsiniz." },
    ],
    behind: [
      "Yanıtlar şirketin kendi dokümanlarından üretilir ve kaynağı gösterilir.",
      "Dokümanda olmayan konuda tahmin yürütülmez; nereye bakılacağı söylenir.",
      "Asistanın erişemeyeceği veriler (bordro, kişisel kayıt) baştan tanımlanır.",
    ],
  },
] as const satisfies readonly { id: string; label: string; context: string; messages: readonly Msg[]; behind: readonly string[] }[];

type ScenarioId = (typeof scenarios)[number]["id"];

export function AiSignature() {
  const [id, setId] = useState<ScenarioId>("destek");
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [inView, setInView] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const scenario = scenarios.find((s) => s.id === id)!;
  const total = scenario.messages.length;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mesajları sırayla gösterir. Azaltılmış harekette tamamı tek seferde görünür.
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    if (reduced) {
      timers.push(window.setTimeout(() => setShown(total), 0));
      return () => timers.forEach(clearTimeout);
    }
    let t = 350;
    scenario.messages.forEach((m, i) => {
      if (m.from === "ai") {
        timers.push(window.setTimeout(() => setTyping(true), t));
        t += 950;
      }
      timers.push(
        window.setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
        }, t),
      );
      t += m.from === "user" ? 700 : 1300;
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, scenario, total]);

  const select = (next: ScenarioId) => {
    setShown(0);
    setTyping(false);
    setId(next);
  };

  return (
    <SignatureShell
      id="ai-imza"
      title="Üç senaryo, üç farklı sınır."
      lede="İyi bir asistanı tanımlayan, neyi yanıtladığı kadar neyi yanıtlamadığıdır. Senaryoları seçip konuşmanın arkasında ne olduğuna bakın."
      note="Buradaki konuşmalar örnek senaryolardır; canlı bir yapay zekâ modeline bağlı değildir ve gerçek bir müşteri konuşmasını yansıtmaz."
    >
      <Segmented label="Senaryo" options={scenarios} value={id} onChange={select} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div ref={boxRef} className="cut relative flex min-h-[27rem] flex-col bg-ink-950 p-5 sm:p-8">
          <p className="t-data flex items-center gap-2 text-ash-500">
            <span className="size-1.5 rounded-full bg-ember-500" />
            {scenario.context}
          </p>
          <ol className="mt-6 flex flex-1 flex-col gap-3" aria-live="polite">
            {scenario.messages.slice(0, shown).map((m, i) => (
              <li
                key={`${id}-${i}`}
                className={`max-w-[88%] px-4 py-3 text-[0.9375rem] leading-snug sm:max-w-[78%] motion-safe:animate-[fade-in_.5s_ease-out_both] ${
                  m.from === "user" ? "self-end bg-bone text-ink-950" : "self-start border border-bone/15 bg-ink-800 text-bone"
                }`}
              >
                <span className="sr-only">{m.from === "user" ? "Kullanıcı: " : "Asistan: "}</span>
                {m.text}
                {"source" in m && m.source && (
                  <span className="t-data mt-2 flex items-center gap-2 text-ember-400">
                    <span className="h-px w-4 bg-ember-500" />
                    Kaynak: {m.source}
                  </span>
                )}
              </li>
            ))}
            {typing && (
              <li aria-hidden="true" className="flex gap-1.5 self-start border border-bone/15 bg-ink-800 px-4 py-4">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 rounded-full bg-ash-400" style={{ animation: `pulse-dot 1s ${i * 0.18}s infinite` }} />
                ))}
              </li>
            )}
          </ol>
        </div>

        <div className="flex flex-col justify-between gap-8 border-t hairline pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <h3 className="t-sign text-ember-500">Arka planda</h3>
            <ul className="mt-5 space-y-5">
              {scenario.behind.map((b, i) => (
                <li key={b} className="flex gap-4">
                  <span className="t-data mt-1 text-ash-600">0{i + 1}</span>
                  <span className="text-bone/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => {
              setShown(0);
              setTyping(false);
              setInView(false);
              requestAnimationFrame(() => setInView(true));
            }}
            className="t-sign link-line self-start py-3 text-bone/80 hover:text-bone"
          >
            Konuşmayı yeniden oynat
          </button>
        </div>
      </div>
    </SignatureShell>
  );
}

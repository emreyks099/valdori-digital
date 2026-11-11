"use client";

/** Kök layout'un kendisi hata verirse gösterilir; kendi <html> ve <body>'sini taşır. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#09090b", color: "#f4f1ec", fontFamily: "system-ui, sans-serif", padding: 24 }}>
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: 32, lineHeight: 1.1, margin: 0 }}>Bir sorun oluştu.</h1>
          <p style={{ color: "#b6b6bc", lineHeight: 1.6 }}>Sayfa yüklenemedi. Yeniden denemek için aşağıdaki düğmeyi kullanın.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ marginTop: 12, padding: "14px 22px", background: "#f4f1ec", color: "#09090b", border: 0, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Yeniden dene
          </button>
        </div>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda, Geist_Mono } from "next/font/google";
import { ViewTransition } from "react";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  variable: "--font-bodoni",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Valdori Digital Studio — Tasarım, Yazılım ve Yapay Zekâ Stüdyosu",
    template: "%s | Valdori Digital",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${archivo.variable} ${bodoni.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="t-sign fixed left-4 top-4 z-[100] -translate-y-24 bg-bone px-4 py-3 text-ink-950 focus-visible:translate-y-0"
        >
          İçeriğe geç
        </a>
        <SmoothScroll />
        <Header />
        <ViewTransition default="page">
          <main id="icerik" className="flex-1">
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}

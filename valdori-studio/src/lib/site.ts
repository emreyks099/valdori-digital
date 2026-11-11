/**
 * Doğrulanmış marka bilgileri. Buraya yalnızca kurucunun teyit ettiği veriler girer.
 * Telefon, e-posta, adres gibi alanlar teyit edilmeden EKLENMEZ.
 */
export const site = {
  name: "Valdori Digital Studio",
  shortName: "Valdori Digital",
  url: "https://valdoridigital.net",
  instagram: "https://instagram.com/valdoridigital",
  instagramHandle: "@valdoridigital",
  founder: "Emre Yüksel",
  locale: "tr_TR",
  description:
    "Valdori Digital Studio; web tasarım, özel yazılım, yapay zekâ, otomasyon, SEO ve sosyal medya çözümlerini tek stüdyoda birleştiren dijital teknoloji stüdyosudur.",
} as const;

export const mainNav = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/projeler", label: "Projeler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/blog", label: "Blog" },
  { href: "/dijital-skor", label: "Dijital Skor" },
] as const;

export const legalNav = [
  { href: "/gizlilik", label: "Gizlilik" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
] as const;

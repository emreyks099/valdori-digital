import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/services/ServicePage";
import { ServiceStage } from "@/components/services/ServiceStage";
import { WebSignature } from "@/components/services/WebSignature";

const service = getService("web-tasarim");

export const metadata = service
  ? pageMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/web-tasarim",
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      visual={<ServiceStage service={service} />}
      signature={<WebSignature />}
      cta={{
        title: ["Sitenizi", "yenileyelim."],
        lede: "Mevcut sitenizi mi yenilemek istiyorsunuz, yoksa sıfırdan mı başlıyorsunuz? Hedefinizi anlatın; kapsamı ve takvimi birlikte çıkaralım.",
      }}
    />
  );
}

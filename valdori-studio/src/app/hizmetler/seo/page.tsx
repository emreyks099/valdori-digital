import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/services/ServicePage";
import { ServiceStage } from "@/components/services/ServiceStage";
import { SeoSignature } from "@/components/services/SeoSignature";

const service = getService("seo");

export const metadata = service
  ? pageMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/seo",
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      visual={<ServiceStage service={service} />}
      signature={<SeoSignature />}
      cta={{
        title: ["Görünürlüğünüzü", "ölçelim."],
        lede: "Sitenizin bugünkü durumuna birlikte bakalım; en çok etki yaratacak adımları sıralayalım.",
      }}
    />
  );
}

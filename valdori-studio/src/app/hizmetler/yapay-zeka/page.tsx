import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/services/ServicePage";
import { ServiceStage } from "@/components/services/ServiceStage";
import { AiSignature } from "@/components/services/AiSignature";

const service = getService("yapay-zeka");

export const metadata = service
  ? pageMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/yapay-zeka",
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      visual={<ServiceStage service={service} />}
      signature={<AiSignature />}
      cta={{
        title: ["İlk senaryonuzu", "bulalım."],
        lede: "Yapay zekânın işinizde en çok nerede zaman kazandıracağını kısa bir görüşmede birlikte belirleyelim.",
      }}
    />
  );
}

import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/services/ServicePage";
import { ServiceStage } from "@/components/services/ServiceStage";
import { SoftwareSignature } from "@/components/services/SoftwareSignature";

const service = getService("ozel-yazilim");

export const metadata = service
  ? pageMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/ozel-yazilim",
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      visual={<ServiceStage service={service} />}
      signature={<SoftwareSignature />}
      cta={{
        title: ["Sisteminizi", "tasarlayalım."],
        lede: "Sürecinizi anlatın; ilk sürümde nelerin olması gerektiğini ve nasıl büyüyeceğini birlikte planlayalım.",
      }}
    />
  );
}

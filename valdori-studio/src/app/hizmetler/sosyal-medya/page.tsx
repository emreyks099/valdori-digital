import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/services/ServicePage";
import { ServiceStage } from "@/components/services/ServiceStage";
import { SocialSignature } from "@/components/services/SocialSignature";

const service = getService("sosyal-medya");

export const metadata = service
  ? pageMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/sosyal-medya",
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      visual={<ServiceStage service={service} />}
      signature={<SocialSignature />}
      cta={{
        title: ["Sesinizi", "bulalım."],
        lede: "Markanızın sosyal medyada neyi, kime, nasıl anlatacağını birlikte netleştirelim.",
      }}
    />
  );
}

import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/services/ServicePage";
import { ServiceStage } from "@/components/services/ServiceStage";
import { AutomationSignature } from "@/components/services/AutomationSignature";

const service = getService("otomasyon");

export const metadata = service
  ? pageMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path: "/hizmetler/otomasyon",
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      visual={<ServiceStage service={service} />}
      signature={<AutomationSignature />}
      cta={{
        title: ["Hangi işi", "devredelim?"],
        lede: "Ekibinizin her hafta tekrarladığı işi anlatın; otomasyona uygun olup olmadığını birlikte değerlendirelim.",
      }}
    />
  );
}

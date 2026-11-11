import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ServiceUniverse } from "@/components/home/ServiceUniverse";
import { CraftSplit } from "@/components/home/CraftSplit";
import { Process } from "@/components/home/Process";
import { WorkPreview } from "@/components/home/WorkPreview";
import { ScorePreview } from "@/components/home/ScorePreview";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Valdori Digital Studio — Tasarım, Yazılım ve Yapay Zekâ Stüdyosu",
  description:
    "İlk bakışta etkileyen, perde arkasında işinizi yürüten dijital deneyimler. Web tasarım, özel yazılım, yapay zekâ, otomasyon, SEO ve sosyal medya tek stüdyoda.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ServiceUniverse />
      <CraftSplit />
      <Process />
      <WorkPreview />
      <ScorePreview />
      <FinalCta />
    </>
  );
}

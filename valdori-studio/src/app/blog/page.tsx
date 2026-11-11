import { getPosts } from "@/lib/blog";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { CategoryNav, PostList } from "@/components/blog/PostList";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Blog: Web, Yapay Zekâ, Otomasyon ve SEO",
  description:
    "Web tasarım, yapay zekâ, iş otomasyonu, SEO, özel yazılım ve dijital strateji üzerine uygulanabilir, sade ve dürüst yazılar. Valdori Digital Studio blogu.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog" }]}
        lines={["Not", "defteri."]}
        lede="İşinizi dijitalde büyütürken karşınıza çıkan sorulara, satış dili olmadan verilmiş yanıtlar. Karar vermenize yardımcı olacak kadar somut, okumaya değecek kadar kısa."
      />
      <section aria-label="Yazılar" className="bg-ink-950 pb-[var(--section)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="shell">
          <CategoryNav />
          <div className="mt-10">
            <PostList posts={posts} />
          </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
    </>
  );
}

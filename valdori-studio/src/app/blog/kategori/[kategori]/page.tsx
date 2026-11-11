import { notFound } from "next/navigation";
import { blogCategories, getPostsByCategory, type BlogCategory } from "@/lib/blog";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { CategoryNav, PostList } from "@/components/blog/PostList";
import { JsonLd } from "@/components/ui/JsonLd";

export function generateStaticParams() {
  return Object.keys(blogCategories).map((kategori) => ({ kategori }));
}

export async function generateMetadata({ params }: PageProps<"/blog/kategori/[kategori]">) {
  const { kategori } = await params;
  if (!(kategori in blogCategories)) return {};
  const name = blogCategories[kategori as BlogCategory];
  return pageMeta({
    title: `${name} Yazıları`,
    description: `${name} üzerine uygulanabilir, sade ve dürüst yazılar. Valdori Digital Studio blogunun ${name} kategorisi.`,
    path: `/blog/kategori/${kategori}`,
    // İçeriği olmayan kategori sayfaları dizine eklenmez
    noindex: getPostsByCategory(kategori as BlogCategory).length === 0,
  });
}

export default async function CategoryPage({ params }: PageProps<"/blog/kategori/[kategori]">) {
  const { kategori } = await params;
  if (!(kategori in blogCategories)) notFound();
  const category = kategori as BlogCategory;
  const name = blogCategories[category];
  const words = name.split(" ");
  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog", href: "/blog" }, { label: name }]}
        lines={words.length > 1 ? [words[0], words.slice(1).join(" ")] : [name]}
        ignite={words.length > 1}
      />
      <section aria-label={`${name} yazıları`} className="bg-ink-950 pb-[var(--section)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="shell">
          <CategoryNav active={category} />
          <div className="mt-10">
            <PostList posts={getPostsByCategory(category)} />
          </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Blog", path: "/blog" },
          { name, path: `/blog/kategori/${category}` },
        ])}
      />
    </>
  );
}

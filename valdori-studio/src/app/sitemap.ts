import type { MetadataRoute } from "next";
import { blogCategories, getPosts, getPostsByCategory, type BlogCategory } from "@/lib/blog";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/** Statik sayfaların içerik güncelleme tarihi. İçerik değiştikçe elle güncellenir. */
const CONTENT_UPDATED = "2026-11-11";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const latestPost = posts[0]?.date ?? CONTENT_UPDATED;
  const u = (path: string) => `${site.url}${path}`;

  return [
    { url: site.url, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: u("/hizmetler"), lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: u(`/hizmetler/${s.slug}`),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: u("/projeler"), lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((p) => ({
      url: u(`/projeler/${p.slug}`),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    { url: u("/hakkimizda"), lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.6 },
    { url: u("/dijital-skor"), lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: u("/iletisim"), lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: u("/blog"), lastModified: latestPost, changeFrequency: "weekly", priority: 0.7 },
    ...(Object.keys(blogCategories) as BlogCategory[])
      .filter((c) => getPostsByCategory(c).length > 0)
      .map((c) => ({
        url: u(`/blog/kategori/${c}`),
        lastModified: getPostsByCategory(c)[0].date,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      })),
    ...posts.map((p) => ({
      url: u(`/blog/${p.slug}`),
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { blogCategories, formatDate, getPost, getPosts } from "@/lib/blog";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    absoluteTitle: true,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = getPosts().filter((p) => p.slug !== post.slug);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 2);

  return (
    <>
      <article>
        <header className="relative isolate overflow-clip bg-ink-950 pt-[calc(var(--header-h)+clamp(2.5rem,7vw,6rem))]">
          <div aria-hidden="true" className="absolute right-[10%] top-0 -z-10 h-[130%] w-px origin-top rotate-[12deg] bg-gradient-to-b from-transparent via-ember-500/60 to-transparent" />
          <div className="shell">
            <nav aria-label="Sayfa yolu" className="enter-fade">
              <ol className="t-sign flex flex-wrap items-center gap-x-3 gap-y-1 text-ash-500">
                <li>
                  <Link href="/blog" className="link-line py-2 hover:text-bone">
                    Blog
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-4 bg-ash-600" />
                  <Link href={`/blog/kategori/${post.category}`} className="link-line py-2 text-ember-500 hover:text-ember-300">
                    {blogCategories[post.category]}
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="line-mask mt-8 max-w-[18ch] font-display text-[clamp(2.5rem,6.6vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.015em] text-balance [font-stretch:75%]">
              <span style={{ "--d": "0.15s" } as CSSProperties}>{post.title}</span>
            </h1>
            <div className="enter-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t hairline pt-6" style={{ "--d": "0.6s" } as CSSProperties}>
              <time dateTime={post.date} className="t-data text-ash-400">
                {formatDate(post.date)}
              </time>
              <span className="t-data text-ash-400">{post.readingMinutes} dk okuma</span>
              <span className="t-data text-ash-400">{site.name}</span>
            </div>
          </div>
        </header>

        <div className="bg-ink-950 pb-[var(--section)] pt-[clamp(3rem,6vw,5rem)]">
          <div className="shell grid gap-x-[clamp(2rem,6vw,7rem)] gap-y-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
            {post.headings.length > 1 && (
              <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
                <nav aria-label="Yazının bölümleri">
                  <h2 className="t-sign text-ash-500">Bu yazıda</h2>
                  <ol className="mt-4 border-t hairline">
                    {post.headings.map((h) => (
                      <li key={h.id} className="border-b hairline">
                        <a href={`#${h.id}`} className="block py-2.5 text-[0.875rem] leading-snug text-ash-400 transition-colors duration-300 hover:text-bone">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}
            <div>
              <p className="t-lede mb-10 max-w-[44rem] text-bone">{post.excerpt}</p>
              <div className="prose-v" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="devam" className="bg-ink-900 py-[clamp(4rem,8vw,7rem)]">
          <div className="shell">
            <h2 id="devam" className="t-sign text-ash-500">
              Okumaya devam edin
            </h2>
            <ul className="mt-6 grid gap-px bg-bone/10 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug} className="bg-ink-900">
                  <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col justify-between gap-8 py-8 md:px-8 md:first:pl-0">
                    <div>
                      <p className="t-sign text-ember-500">{blogCategories[p.category]}</p>
                      <h3 className="t-h2 mt-4 text-balance transition-colors duration-500 group-hover:text-ember-400">{p.title}</h3>
                    </div>
                    <span className="flex items-center gap-3">
                      <span className="t-data text-ash-500">{p.readingMinutes} dk okuma</span>
                      <ArrowIcon className="text-ember-500 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "tr-TR",
            articleSection: blogCategories[post.category],
            mainEntityOfPage: `${site.url}/blog/${post.slug}`,
            author: { "@id": `${site.url}/#organization` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}

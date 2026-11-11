import Link from "next/link";
import { blogCategories, formatDate, type BlogCategory, type PostMeta } from "@/lib/blog";
import { ArrowIcon } from "@/components/ui/Button";

export function CategoryNav({ active }: { active?: BlogCategory }) {
  const base =
    "t-sign flex min-h-11 items-center border px-4 transition-colors duration-300";
  const on = "border-ember-500 bg-ember-500 text-ink-950";
  const off = "border-bone/25 text-bone/80 hover:border-bone hover:text-bone";
  return (
    <nav aria-label="Blog kategorileri">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/blog" aria-current={!active ? "page" : undefined} className={`${base} ${!active ? on : off}`}>
            Tümü
          </Link>
        </li>
        {(Object.keys(blogCategories) as BlogCategory[]).map((c) => (
          <li key={c}>
            <Link
              href={`/blog/kategori/${c}`}
              aria-current={active === c ? "page" : undefined}
              className={`${base} ${active === c ? on : off}`}
            >
              {blogCategories[c]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <div className="border-y hairline py-16">
        <p className="t-h2">Bu kategoride henüz yazı yok.</p>
        <p className="mt-4 max-w-[32rem] text-ash-400">
          Yeni yazılar yayımlandıkça burada yer alacak. Bu arada diğer kategorilere göz atabilirsiniz.
        </p>
        <Link href="/blog" className="t-sign link-line mt-6 inline-block py-2 text-bone">
          Tüm yazılar
        </Link>
      </div>
    );
  }
  return (
    <ul className="border-t hairline">
      {posts.map((p) => (
        <li key={p.slug} className="border-b hairline">
          <Link
            href={`/blog/${p.slug}`}
            className="group grid gap-x-8 gap-y-4 py-9 md:grid-cols-[11rem_minmax(0,1.4fr)_minmax(0,1fr)_auto] md:items-start md:py-11"
          >
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 md:block md:space-y-2">
              <span className="t-sign block text-ember-500">{blogCategories[p.category]}</span>
              <time dateTime={p.date} className="t-data block text-ash-500">
                {formatDate(p.date)}
              </time>
              <span className="t-data block text-ash-500">{p.readingMinutes} dk okuma</span>
            </p>
            <h2 className="t-h2 text-balance text-bone transition-colors duration-500 group-hover:text-ember-400">{p.title}</h2>
            <p className="max-w-[30rem] text-ash-400">{p.excerpt}</p>
            <span className="hidden size-11 place-items-center border border-bone/20 text-bone transition-colors duration-500 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-ink-950 md:grid">
              <ArrowIcon />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

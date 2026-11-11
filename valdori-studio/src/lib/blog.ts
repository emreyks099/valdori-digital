import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

/**
 * Blog içerik katmanı. Yazılar `src/content/blog/*.md` altında, frontmatter'lı
 * Markdown dosyalarıdır; yeni yazı eklemek için dosya oluşturmak yeterlidir.
 * Dosyalar derleme zamanında okunur; içerik depoya ait (güvenilir) kaynaktır.
 */

export const blogCategories = {
  "web-tasarim": "Web Tasarım",
  "yapay-zeka": "Yapay Zekâ",
  otomasyon: "Otomasyon",
  seo: "SEO",
  "ozel-yazilim": "Özel Yazılım",
  "dijital-strateji": "Dijital Strateji",
} as const;

export type BlogCategory = keyof typeof blogCategories;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  date: string;
  readingMinutes: number;
  excerpt: string;
};

export type Post = PostMeta & { html: string; headings: { id: string; text: string }[] };

const DIR = path.join(process.cwd(), "src", "content", "blog");

function slugify(text: string): string {
  return text
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/â/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const category = String(data.category) as BlogCategory;
  if (!(category in blogCategories)) {
    throw new Error(`Blog yazısı "${slug}": geçersiz kategori "${data.category}"`);
  }
  for (const key of ["title", "description", "date", "excerpt"] as const) {
    if (typeof data[key] !== "string" || !data[key]) {
      throw new Error(`Blog yazısı "${slug}": "${key}" alanı eksik`);
    }
  }
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    category,
    date: String(data.date),
    readingMinutes: Number(data.readingMinutes) || 5,
    excerpt: String(data.excerpt),
  };
}

let cache: Post[] | null = null;

function load(): Post[] {
  if (cache) return cache;
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
  cache = files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      const headings: Post["headings"] = [];
      const marked = new Marked({
        gfm: true,
        renderer: {
          heading({ tokens, depth }) {
            const inner = this.parser.parseInline(tokens);
            if (depth === 2) {
              const text = inner.replace(/<[^>]+>/g, "");
              const id = slugify(text);
              headings.push({ id, text });
              return `<h2 id="${id}">${inner}</h2>\n`;
            }
            // Gövdede H1 kullanılmaz; yanlışlıkla yazılırsa H2'ye indirilir.
            const level = Math.max(2, depth);
            return `<h${level}>${inner}</h${level}>\n`;
          },
          table(token) {
            const header = token.header.map((c) => `<th scope="col">${this.parser.parseInline(c.tokens)}</th>`).join("");
            const body = token.rows
              .map((row) => `<tr>${row.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
              .join("");
            return `<div class="overflow-x-auto"><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></div>\n`;
          },
        },
      });
      const html = marked.parse(content, { async: false });
      return { ...parseMeta(slug, data), html, headings };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export function getPosts(): PostMeta[] {
  return load().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    date: p.date,
    readingMinutes: p.readingMinutes,
    excerpt: p.excerpt,
  }));
}

export function getPost(slug: string): Post | undefined {
  return load().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): PostMeta[] {
  return getPosts().filter((p) => p.category === category);
}

const dateFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(`${iso}T00:00:00Z`));
}

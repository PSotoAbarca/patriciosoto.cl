import fs from "fs";
import path from "path";
import matter from "gray-matter";
export { formatDate } from "./utils";

const CONTENT_DIR = path.join(process.cwd(), "content/columna");

export interface ArticleMeta {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
  tag: string;
  linkedinUrl?: string;
  image?: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export function getArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      subtitle: data.subtitle ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tag: data.tag ?? "",
      linkedinUrl: data.linkedinUrl ?? "",
      image: data.image ?? "",
    } as ArticleMeta;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    const filePath = path.join(CONTENT_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        subtitle: data.subtitle ?? "",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tag: data.tag ?? "",
        linkedinUrl: data.linkedinUrl ?? "",
        image: data.image ?? "",
        content,
      };
    }
  }

  return null;
}


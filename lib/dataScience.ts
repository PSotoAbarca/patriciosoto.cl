import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/data-science");

export interface CaseStudyMeta {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  tags: string[];
  metric?: string;
  github?: string;
  order: number;
}

export interface CaseStudy extends CaseStudyMeta {
  content: string;
}

export function getCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const caseStudies = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      subtitle: data.subtitle ?? "",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
      metric: data.metric ?? "",
      github: data.github ?? "",
      order: data.order ?? 0,
    } as CaseStudyMeta;
  });

  return caseStudies.sort((a, b) => a.order - b.order);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
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
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        metric: data.metric ?? "",
        github: data.github ?? "",
        order: data.order ?? 0,
        content,
      };
    }
  }

  return null;
}

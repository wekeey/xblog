import type { Page, PostData } from "@/types/post";
import { siteConfig } from "@/lib/config";
import { source } from "@/lib/source";

// Our source pages expose slugs along with Page<PostData>-like shape
export type PostListItem = Page<Partial<PostData>> & { slugs: string[] };

export function getAllPosts(): PostListItem[] {
  const pages = (source.getPages() as unknown as PostListItem[])
    .filter((p) => (p?.data?.published ?? true) === true)
    .sort((a, b) => {
      const da = a?.data?.date ? new Date(a.data.date).getTime() : 0;
      const db = b?.data?.date ? new Date(b.data.date).getTime() : 0;
      return db - da;
    });
  return pages;
}

export function getLatestPosts(limit = 5): PostListItem[] {
  const pages = getAllPosts();
  return pages.slice(0, limit);
}

export function getPostPage(slug?: string[] | undefined) {
  return source.getPage(slug) as unknown as Page<Partial<PostData>> & {
    slugs: string[];
  };
}

export function getHomePageStaticParams(perPage?: number) {
  const eff = perPage ?? siteConfig.postsPerPage ?? 10;
  const totalPages = Math.max(1, Math.ceil(getAllPosts().length / eff));
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export function getTagStaticParams() {
  const set = new Set<string>();
  for (const p of getAllPosts()) {
    for (const t of p?.data?.tags ?? []) set.add(t);
  }
  return Array.from(set).map((t) => ({ tag: t }));
}

export function getTagPageStaticParams(perPage?: number) {
  const tags = new Map<string, number>();
  for (const p of getAllPosts()) {
    const ts: string[] = p?.data?.tags ?? [];
    for (const t of ts) tags.set(t, (tags.get(t) ?? 0) + 1);
  }
  const paths: { tag: string; page: string }[] = [];
  const eff = perPage ?? siteConfig.postsPerPage ?? 10;
  for (const [t, count] of tags) {
    const total = Math.max(1, Math.ceil(count / eff));
    for (let i = 1; i <= total; i++) paths.push({ tag: t, page: String(i) });
  }
  return paths;
}

export function getPostStaticParams() {
  // Only include published posts
  return getAllPosts().map((p) => ({ slug: p.slugs })) as Array<{
    slug?: string[];
  }>;
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts())
    for (const t of p?.data?.tags ?? []) set.add(t);
  return Array.from(set);
}

export function getTagsWithCount(): Array<[string, number]> {
  const map = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p?.data?.tags ?? []) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

export function getPostsByTag(tag: string): PostListItem[] {
  return getAllPosts().filter((p) => (p?.data?.tags ?? []).includes(tag));
}

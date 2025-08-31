import { notFound, redirect } from "next/navigation";
import { MainLayout } from "@/layouts";

import { siteConfig } from "@/lib/config";
import {
  getLatestPosts,
  getPostsByTag,
  getTagPageStaticParams,
} from "@/lib/posts";
import { LatestPostsCard } from "@/components/latest-posts";
import { PaginationNav } from "@/components/pagination-nav";
import { PostList } from "@/components/post-list";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getTagPageStaticParams();
}

export default async function TagPaged(props: {
  params: Promise<{ tag: string; page: string }>;
}) {
  const { tag, page } = await props.params;
  const n = Number(page);
  if (!Number.isFinite(n) || n < 1) notFound();

  const filtered = getPostsByTag(tag);
  if (filtered.length === 0) notFound();

  const perPage = siteConfig.postsPerPage ?? 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  if (n > totalPages) notFound();
  if (n === 1) redirect(`/tags/${tag}`);

  const start = (n - 1) * perPage;
  const items = filtered.slice(start, start + perPage);
  const latest = getLatestPosts(5);

  return (
    <MainLayout
      aside={latest.length ? <LatestPostsCard items={latest} /> : null}
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">标签：{tag}</h1>
        <PostList items={items} />
        <PaginationNav
          currentPage={n}
          totalPages={totalPages}
          hasPrevPage={n > 1}
          hasNextPage={n < totalPages}
          baseUrl={`/tags/${tag}/page`}
        />
      </div>
    </MainLayout>
  );
}

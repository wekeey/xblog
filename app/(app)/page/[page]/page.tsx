import { notFound, redirect } from "next/navigation";
import { MainLayout } from "@/layouts";

import { siteConfig } from "@/lib/config";
import {
  getAllPosts,
  getHomePageStaticParams,
  getLatestPosts,
} from "@/lib/posts";
import { LatestPostsCard } from "@/components/latest-posts";
import { PaginationNav } from "@/components/pagination-nav";
import { PostList } from "@/components/post-list";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getHomePageStaticParams();
}

export default async function HomePaged(props: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await props.params;
  const n = Number(page);
  if (!Number.isFinite(n) || n < 1) notFound();

  if (n === 1) redirect("/");

  const all = getAllPosts();

  const perPage = siteConfig.postsPerPage ?? 10;
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  if (n > totalPages) notFound();

  const start = (n - 1) * perPage;
  const items = all.slice(start, start + perPage);
  const latest = getLatestPosts(5);

  return (
    <MainLayout
      aside={latest.length ? <LatestPostsCard items={latest} /> : null}
    >
      <div className="flex flex-col gap-6">
        {items.length === 0 ? (
          <div className="text-muted-foreground">暂无文章</div>
        ) : (
          <PostList items={items} />
        )}
        <PaginationNav
          currentPage={n}
          totalPages={totalPages}
          hasPrevPage={n > 1}
          hasNextPage={n < totalPages}
          baseUrl="/page"
        />
      </div>
    </MainLayout>
  );
}

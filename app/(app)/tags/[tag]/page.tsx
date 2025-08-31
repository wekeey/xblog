import { notFound } from "next/navigation";
import { MainLayout } from "@/layouts";

import { siteConfig } from "@/lib/config";
import { getLatestPosts, getPostsByTag, getTagStaticParams } from "@/lib/posts";
import { LatestPostsCard } from "@/components/latest-posts";
import { PaginationNav } from "@/components/pagination-nav";
import { PostList } from "@/components/post-list";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getTagStaticParams();
}

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await props.params;
  const filtered = getPostsByTag(tag);
  if (filtered.length === 0) notFound();

  const perPage = siteConfig.postsPerPage ?? 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = 1;
  const items = filtered.slice(0, perPage);
  const latest = getLatestPosts(5);

  return (
    <MainLayout
      aside={latest.length ? <LatestPostsCard items={latest} /> : null}
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">标签：{tag}</h1>
        <PostList items={items} />
        {totalPages > 1 ? (
          <PaginationNav
            currentPage={currentPage}
            totalPages={totalPages}
            hasPrevPage={false}
            hasNextPage={currentPage < totalPages}
            baseUrl={`/tags/${tag}/page`}
          />
        ) : null}
      </div>
    </MainLayout>
  );
}

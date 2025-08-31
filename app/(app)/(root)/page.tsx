import { MainLayout } from "@/layouts";

import { siteConfig } from "@/lib/config";
import { getAllPosts, getLatestPosts } from "@/lib/posts";
import { LatestPostsCard } from "@/components/latest-posts";
import { PaginationNav } from "@/components/pagination-nav";
import { PostList } from "@/components/post-list";

export const revalidate = false;
export const dynamic = "force-static";

export default async function HomePage() {
  const pages = getAllPosts();
  const latest = getLatestPosts(5);
  const perPage = siteConfig.postsPerPage ?? 10;
  const totalPages = Math.max(1, Math.ceil(pages.length / perPage));
  const currentPage = 1;
  const items = pages.slice(0, perPage);

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
        {totalPages > 1 ? (
          <PaginationNav
            currentPage={currentPage}
            totalPages={totalPages}
            hasPrevPage={currentPage > 1}
            hasNextPage={currentPage < totalPages}
            baseUrl="/page"
          />
        ) : null}
      </div>
    </MainLayout>
  );
}

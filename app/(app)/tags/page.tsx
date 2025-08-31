import Link from "next/link";
import { MainLayout } from "@/layouts";

import { getLatestPosts, getTagsWithCount } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LatestPostsCard } from "@/components/latest-posts";

export const revalidate = false;
export const dynamic = "force-static";

export default async function TagsIndexPage() {
  const latest = getLatestPosts(5);
  const tags = getTagsWithCount();

  return (
    <MainLayout
      aside={latest.length ? <LatestPostsCard items={latest} /> : null}
    >
      <Card>
        <CardHeader>
          <CardTitle>标签</CardTitle>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <div className="text-muted-foreground">暂无标签</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map(([t, count]) => (
                <Badge key={t} asChild variant="secondary">
                  <Link href={`/tags/${t}`}>
                    {t} ({count})
                  </Link>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}

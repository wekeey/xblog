import Link from "next/link";

import type { Page, PostData } from "@/types/post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PostLike = { slugs: string[] } & Pick<Page<Partial<PostData>>, "data">;

export function LatestPostsCard({
  items,
  title = "最新文章",
  limit = 5,
}: {
  items: PostLike[];
  title?: string;
  limit?: number;
}) {
  const list = (items ?? []).slice(0, limit);
  if (!list.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {list.map((p) => {
            const href = `/posts/${p.slugs.join("/")}`;
            const title = p?.data?.title ?? href;
            const date = p?.data?.date;
            return (
              <li key={href} className="flex flex-col">
                <Link href={href} className="hover:underline">
                  {title}
                </Link>
                {date ? (
                  <span className="text-muted-foreground text-xs">
                    {new Date(date).toLocaleDateString()}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

import Link from "next/link";

import type { Page, PostData } from "@/types/post";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PostList({
  items,
}: {
  items: (Page<Partial<PostData>> & { slugs: string[] })[];
}) {
  if (!items?.length) return null;

  return (
    <>
      {items.map((page) => {
        const href = `/posts/${page.slugs.join("/")}`;
        const post = page.data;
        return (
          <Card key={href}>
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href={href} className="hover:underline">
                  {post.title ?? href}
                </Link>
              </CardTitle>
              <div className="text-muted-foreground text-sm">
                {post.date ? new Date(post.date).toLocaleDateString() : null}
              </div>
            </CardHeader>
            {post.description ? (
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {post.description}
                </p>
              </CardContent>
            ) : null}
            {post.tags?.length ? (
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t: string) => (
                    <Badge key={t} asChild variant="secondary">
                      <Link
                        href={`/tags/${t}`}
                        className="flex items-center gap-1"
                      >
                        <span>{t}</span>
                      </Link>
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            ) : null}
          </Card>
        );
      })}
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { MainLayout } from "@/layouts";
import { mdxComponents } from "@/mdx-components";

import type { PostData } from "@/types/post";
import { getPostPage, getPostStaticParams } from "@/lib/posts";
import { absoluteUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DocsTableOfContents } from "@/components/docs-toc";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostStaticParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = getPostPage(params.slug);

  if (!page) {
    notFound();
  }

  const post = page.data as { title?: string; description?: string };

  if (!post.title || !post.description) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            post.title,
          )}&description=${encodeURIComponent(post.description)}`,
        },
      ],
    },
  };
}

export default async function PostPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = getPostPage(params.slug);

  if (!page) {
    notFound();
  }

  const post = page.data as Partial<PostData> & {
    toc?: { title?: React.ReactNode; url: string; depth: number }[];
    body: React.ComponentType<{ components: Record<string, unknown> }>;
  };
  const MDX = post.body;

  return (
    <MainLayout
      aside={
        post.toc?.length ? (
          <Card className="max-h-[calc(100svh-var(--header-height)-var(--footer-height)-2px-3rem)]">
            <CardHeader>
              <CardTitle>目录</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[calc(100svh-var(--header-height)-var(--footer-height))] overflow-y-auto">
              <DocsTableOfContents toc={post.toc} />
            </CardContent>
          </Card>
        ) : null
      }
    >
      <Card>
        {post.title ? (
          <CardHeader>
            <CardTitle className="mb-1 text-center text-2xl">
              {post.title}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-1">
              <span>
                {post.date ? new Date(post.date).toLocaleDateString() : null}
              </span>
            </CardDescription>
          </CardHeader>
        ) : null}
        <CardContent>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDX components={mdxComponents} />
          </div>
        </CardContent>
        {post.tags && (
          <CardFooter className="flex flex-wrap gap-2 pt-4">
            {post.tags.map((tag: string) => (
              <Badge key={tag} asChild variant="secondary">
                <Link href={`/tags/${tag}`} className="flex items-center gap-1">
                  <span>{tag}</span>
                </Link>
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </MainLayout>
  );
}

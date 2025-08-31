import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/tags`, lastModified: new Date() },
  ];

  const posts = getAllPosts().map((p) => ({
    url: `${base}${p.url}`,
    lastModified: p?.data?.date ? new Date(p.data.date) : new Date(),
  }));

  return [...pages, ...posts];
}

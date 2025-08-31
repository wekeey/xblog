import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;
  return {
    rules: [{ userAgent: "*" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

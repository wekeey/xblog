import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react"] as string[],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);

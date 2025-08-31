export const siteConfig = {
  name: "未知博客",
  url: "https://blog.xapp.xyz",
  logo: "/logo.png",
  ogImage: "https://blog.xapp.xyz/og.jpg",
  description:
    "现代化的 Next.js 15 博客系统，支持 MDX 内容、全文搜索、主题切换与响应式设计。",
  postsPerPage: 2,
  links: {
    twitter: "https://twitter.com/wekeey",
    github: "https://github.com/wekeey/xblog",
  } as { twitter?: string; github?: string },
  navItems: [
    {
      href: "/",
      label: "首页",
    },
    {
      href: "/tags",
      label: "标签",
    },
    {
      href: "/about",
      label: "关于",
    },
  ],
  copyright: "wekeey",
  icp: {
    number: "京ICP备xxx号",
    url: "https://beian.miit.gov.cn/",
  } as { number?: string; url?: string },
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

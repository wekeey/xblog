export const siteConfig = {
  name: "未知博客",
  url: "https://blog.xapp.xyz",
  logo: "/observable_universe.png",
  ogImage: "https://blog.xapp.xyz/og.jpg",
  description:
    "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.",
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
    number: "京ICP备123456号",
    url: "https://beian.miit.gov.cn/",
  } as { number?: string; url?: string },
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

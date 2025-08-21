# 🌟 xblog - 未知博客

一个基于 Next.js 15 和 Fumadocs 构建的现代化博客系统，支持 MDX 内容管理、全文搜索、主题切换等功能。

## ✨ 特性

- 🚀 **现代化技术栈**: Next.js 15 + React 19 + TypeScript
- 🎨 **shadcn/ui 组件**: 基于 Radix UI 的现代化组件库，支持主题定制
- 📝 **MDX 支持**: 使用 Fumadocs MDX 处理 Markdown 内容
- 🔍 **全文搜索**: 基于 Fumadocs Core 的搜索功能，支持中文分词
- � **主题系统**: 支持亮色/暗色主题切换
- 📱 **响应式设计**: 适配桌面端和移动端
- 🎯 **SEO 优化**: 完整的 Meta 标签和 Open Graph 支持
- ⚡ **性能优化**: 静态生成 + 增量更新

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **内容管理**: [Fumadocs MDX](https://fumadocs.vercel.app/)
- **状态管理**: [Jotai](https://jotai.org/)
- **代码高亮**: [Shiki](https://shiki.style/)
- **图标**: [Lucide React](https://lucide.dev/)
- **字体**: Geist Sans & Geist Mono
- **包管理**: [pnpm](https://pnpm.io/)

## 📦 项目结构

```
xblog/
├── app/                    # Next.js App Router 目录
│   ├── (app)/             # 应用页面组
│   │   ├── (root)/        # 首页
│   │   ├── about/         # 关于页面
│   │   ├── posts/         # 文章详情页
│   │   ├── tags/          # 标签页面
│   │   └── page/          # 分页页面
│   ├── api/               # API 路由
│   │   └── search/        # 搜索 API
│   ├── og/                # Open Graph 图片生成
│   └── layout.tsx         # 全局布局
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件
│   └── ...               # 业务组件
├── content/              # MDX 内容目录
│   └── posts/           # 博客文章
├── hooks/                # 自定义 Hooks
├── layouts/              # 页面布局组件
├── lib/                  # 工具函数和配置
├── public/               # 静态资源
├── styles/               # 样式文件
└── types/                # TypeScript 类型定义
```

## 🚀 快速开始

### 环境要求

- Node.js 18.18+
- pnpm 8+

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/wekeey/xblog.git
cd xblog

# 安装依赖
pnpm install
```

### 本地开发

```bash
# 启动开发服务器
pnpm dev

# 或使用其他包管理器
npm run dev
yarn dev
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 📝 内容管理

### 添加新文章

1. 在 `content/posts/` 目录下创建新的 MDX 文件
2. 使用以下格式添加 Front Matter:

```mdx
---
title: "文章标题"
description: "文章描述"
date: "2025-01-01"
tags: ["标签1", "标签2"]
published: true
---

# 文章内容

你的 Markdown 内容...
```

### 支持的组件

项目支持在 MDX 中使用自定义组件：

- `<Callout>` - 提示框
- `<CodeTabs>` - 代码标签页
- `<Card>` - 卡片组件
- 以及所有 shadcn/ui 组件

#### 可用的 shadcn/ui 组件

项目已安装的 UI 组件包括：

- Button, Card, Badge - 基础组件
- Dialog, Popover, Tooltip - 浮层组件
- Accordion, Tabs, Collapsible - 展示组件
- Command, Pagination - 交互组件
- Alert, Separator, Skeleton - 辅助组件

## ⚙️ 配置

### 网站配置

编辑 `lib/config.ts` 文件来自定义网站信息：

```typescript
export const siteConfig = {
  name: "你的博客名称",
  url: "https://yourdomain.com",
  description: "博客描述",
  // ... 其他配置
}
```

### 主题配置

项目使用 `next-themes` 提供主题切换功能，支持：

- 亮色主题
- 暗色主题
- 系统主题

### shadcn/ui 配置

项目使用 shadcn/ui 组件系统，配置文件位于 `components.json`：

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

添加新组件：

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## 🔍 搜索功能

搜索功能基于 Fumadocs Core 实现，支持：

- 全文搜索
- 中文分词 (使用自定义 CJK tokenizer)
- 快捷键支持 (⌘K / Ctrl+K)

## 📱 响应式设计

项目采用移动优先的响应式设计：

- 移动端: 完整的触摸优化界面
- 平板端: 自适应布局调整
- 桌面端: 全功能界面体验

## 🚀 部署

### Vercel 部署 (推荐)

1. 连接 GitHub 仓库到 Vercel
2. 设置环境变量 (如需要)
3. 自动部署

### 其他平台

项目支持部署到任何支持 Next.js 的平台：

- Netlify
- Railway
- 自托管服务器

## 🛠️ 开发

### 开发工具

项目配置了完整的开发工具链：

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查
- **Tailwind CSS**: 样式开发

### 代码规范

```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 这个仓库
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

这个项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Fumadocs](https://fumadocs.vercel.app/) - 文档框架
- [shadcn/ui](https://ui.shadcn.com/) - 现代化 React 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

## 📞 联系

- 作者: wekeey
- GitHub: [@wekeey](https://github.com/wekeey)
- 网站: [https://blog.xapp.xyz](https://blog.xapp.xyz)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！

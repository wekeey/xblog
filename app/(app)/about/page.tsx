import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Code,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";

import { siteConfig } from "@/lib/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "关于我",
  description: "了解更多关于 wekeey 和未知博客的信息",
};

// 关于页面的侧边栏组件
function AboutSidebar() {
  return (
    <>
      {/* 快速信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">快速信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="text-muted-foreground h-4 w-4" />
            <span>正在学习: AI/ML 相关技术</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="text-muted-foreground h-4 w-4" />
            <span>主要语言: TypeScript, Golang</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-muted-foreground h-4 w-4" />
            <span>兴趣: 开源贡献, 技术写作</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-muted-foreground h-4 w-4" />
            <span>坐标: China · Remote</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span>空闲: 接受远程/兼职合作</span>
          </div>
        </CardContent>
      </Card>

      {/* 联系方式 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">联系我</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm">
            如果你对我的文章有疑问，或者想要技术交流， 欢迎通过以下方式联系我：
          </p>
          <div className="space-y-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Link href="mailto:contact@wekeey.com">
                <Mail className="mr-2 h-4 w-4" />
                发送邮件
              </Link>
            </Button>

            {siteConfig.links.github && (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Link href={siteConfig.links.github} target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 常用工具 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">常用工具</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {["VS Code", "Raycast", "Warp", "Linear", "Notion", "Figma"].map(
            (tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ),
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default function AboutPage() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Golang",
    "PHP",
    "Docker",
    "Git",
    "Tailwind CSS",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
  ];

  const projects = [
    {
      title: "未知博客",
      description:
        "基于 Next.js 14 的现代化博客系统，支持 MDX、标签分类和响应式设计",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
      link: siteConfig.url,
      github: siteConfig.links.github,
    },
    // 你可以添加更多项目
  ];

  return (
    <MainLayout aside={<AboutSidebar />}>
      {/* 个人介绍卡片 */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="pb-4 text-center">
          <div className="from-primary/10 mx-auto mb-4 rounded-xl bg-gradient-to-b to-transparent p-0.5">
            <div className="relative mx-auto">
              <Image
                src={siteConfig.logo}
                alt="wekeey"
                width={120}
                height={120}
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">wekeey</CardTitle>
          <CardDescription className="text-lg">
            全栈开发者 · 技术探索者 · 开源爱好者
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed">
              你好！我是 wekeey，一名热爱技术的全栈开发者。我专注于现代 Web
              开发技术，
              喜欢探索新技术并分享学习心得。这个博客「未知博客」记录了我在技术路上的思考与实践。
            </p>
            <p className="text-base leading-relaxed">
              我相信技术的力量能够改变世界，也相信分享知识能够帮助更多人成长。
              在这里，你会找到关于前端开发、后端技术、工具使用和技术思考的文章。
            </p>
          </div>

          {/* 亮点 */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {["可维护性优先", "用户体验至上", "自动化与效率", "坚信开源"].map(
              (text) => (
                <Badge key={text} variant="outline" className="text-xs">
                  <Sparkles className="mr-1 h-3 w-3" /> {text}
                </Badge>
              ),
            )}
          </div>

          {/* 社交链接 */}
          <div className="flex justify-center gap-4 pt-4">
            {siteConfig.links.github && (
              <Button asChild variant="outline">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            )}

            <Button asChild variant="outline">
              <Link href="mailto:contact@wekeey.com">
                <Mail className="mr-2 h-4 w-4" />
                邮箱联系
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 技能卡片 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            技术栈
          </CardTitle>
          <CardDescription>我熟悉并经常使用的技术和工具</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 专长领域 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            专长领域
          </CardTitle>
          <CardDescription>我在以下方向有较多的实践经验</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-base font-semibold">前端工程化</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {[
                  "Next.js App Router、RSC 架构",
                  "组件化与样式系统（shadcn/ui, Tailwind）",
                  "性能优化（bundle、RUM、图片优化）",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-base font-semibold">后端与数据</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {[
                  "Node.js / Edge Runtime",
                  "Prisma 数据建模与迁移",
                  "PostgreSQL / MongoDB 实战",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-base font-semibold">DevOps 与质量</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {[
                  "Docker 化与多环境配置",
                  "CI/CD（Lint、Test、Preview）",
                  "监控与日志（可观测性）",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 当前在做 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            现在在做
          </CardTitle>
          <CardDescription>近期关注与输出方向</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "AI 辅助开发实践",
              "内容创作与知识库",
              "Next.js 性能优化",
              "开源项目维护",
            ].map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 项目展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            项目展示
          </CardTitle>
          <CardDescription>一些我参与或创建的项目</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                {project.link && (
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      访问
                    </Link>
                  </Button>
                )}
                {project.github && (
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-1 h-3 w-3" />
                      源码
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 经历时间线 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            经历时间线
          </CardTitle>
          <CardDescription>部分学习与工作节点</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6 pl-6">
            <div className="bg-border absolute top-0 bottom-0 left-2 w-px" />

            {[
              {
                title: "构建并发布 xblog 博客系统",
                time: "2025",
                desc: "从零到一打磨内容系统，沉淀可复用组件与脚手架。",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-background absolute top-1 -left-[9px] h-2.5 w-2.5 rounded-full border" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                    <span className="text-muted-foreground text-xs">
                      {item.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            常见问答
          </CardTitle>
          <CardDescription>一些读者经常问到的问题</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>可以转载或引用你的文章吗？</AccordionTrigger>
              <AccordionContent>
                允许在保留署名与原文链接的前提下进行非商业转载；如需商业合作，请邮件联系。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>是否接受项目合作或咨询？</AccordionTrigger>
              <AccordionContent>
                接受与前端工程化、全栈开发、内容系统与性能优化相关的项目或咨询。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>博客源码是否开源？</AccordionTrigger>
              <AccordionContent>
                是的，本站基于 Next.js 与 shadcn/ui 构建，源码已在 GitHub
                开源，欢迎 Star 与 Issue 交流。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* 联系 CTA */}
      <Card className="mt-6 border-dashed">
        <CardHeader className="text-center">
          <CardTitle>聊聊你的想法？</CardTitle>
          <CardDescription>
            如果你正在构建有趣的产品，或希望一起改进工程质量，欢迎联系我。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href="mailto:contact@wekeey.com">
              <Mail className="mr-2 h-4 w-4" /> 发封邮件给我
            </Link>
          </Button>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

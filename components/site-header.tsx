import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GitHubLink } from "@/components/github-link";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SearchTrigger } from "@/components/search";

export function SiteHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <MobileNav items={siteConfig.navItems} className="flex lg:hidden" />

          <Button
            asChild
            variant="ghost"
            className="hidden lg:flex"
            aria-label="首页"
          >
            <Link href="/">
              <Image
                src={"/apple-touch-icon.png"}
                alt={siteConfig.name}
                width={26}
                height={26}
                priority
                sizes="(min-width: 1024px) 24px, 24px"
                className="h-6 w-6 rounded-full object-contain"
              />
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
          </Button>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <SearchTrigger />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden md:block"
            />
            {siteConfig.links.github && (
              <>
                <GitHubLink />
                <Separator orientation="vertical" />
              </>
            )}
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

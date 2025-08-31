"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { useIsMac } from "@/hooks/use-is-mac";
import { Button } from "@/components/ui/button";

import { useSearch } from "./provider";

function SearchKbd({ isMac }: { isMac: boolean }) {
  return (
    <span className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none">
      {isMac ? (
        <span className="text-xs">⌘</span>
      ) : (
        <span className="text-xs">Ctrl</span>
      )}
      <span className="">K</span>
    </span>
  );
}

export function SearchTrigger() {
  const { setOpen } = useSearch();
  const isMac = useIsMac();

  return (
    <Button
      variant="secondary"
      className={cn(
        "bg-surface text-surface-foreground/60 dark:bg-card relative h-8 w-full justify-start pl-2.5 font-normal shadow-none transition-all duration-200 sm:pr-12 md:w-40 lg:w-56 xl:w-64",
        "hover:bg-muted/70 focus-visible:ring-ring",
      )}
      onClick={() => setOpen(true)}
      aria-label="搜索文档"
    >
      <Search className="mr-2 h-4 w-4" />
      <span className="hidden lg:inline-flex">搜索文档...</span>
      <span className="inline-flex lg:hidden">搜索...</span>
      <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
        <SearchKbd isMac={isMac} />
      </div>
    </Button>
  );
}

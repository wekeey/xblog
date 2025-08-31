"use client";

import * as React from "react";

import { CommandGroup, CommandItem } from "@/components/ui/command";

import HighlightedContent from "./highlighted-content";
import { getItemIcon } from "./icons";
import type { SearchItem } from "./types";
import { getItemTypeLabel } from "./utils";

interface ResultsGroupProps {
  items: SearchItem[];
  totalResults: number;
  search: string;
  onSelect: (url: string) => void;
}

export function ResultsGroup({
  items,
  totalResults,
  search,
  onSelect,
}: ResultsGroupProps) {
  if (!items?.length) return null;

  return (
    <CommandGroup
      heading={
        <div className="flex items-center justify-between">
          <span>{search ? "搜索结果" : "快速导航"}</span>
          {search && totalResults > 0 && (
            <span className="text-muted-foreground text-xs">
              {totalResults} 个结果
            </span>
          )}
        </div>
      }
    >
      {items.map((item) => (
        <CommandItem
          key={item.id}
          value={item.content}
          onSelect={() => onSelect(item.url)}
          className="flex cursor-pointer items-center gap-2 px-3 py-2"
        >
          {getItemIcon(item.type)}
          <div className="flex min-w-0 flex-col">
            <span className="truncate" title={item.content}>
              {search ? (
                <HighlightedContent item={item} search={search} />
              ) : (
                item.content
              )}
            </span>
          </div>
          <span className="text-muted-foreground/60 ml-auto text-[10px] uppercase">
            {getItemTypeLabel(item.type)}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

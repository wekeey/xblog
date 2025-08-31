"use client";

import * as React from "react";
import { AlignLeft, X } from "lucide-react";

import { CommandGroup, CommandItem } from "@/components/ui/command";

interface HistoryItem {
  query: string;
}

interface HistoryGroupProps {
  history: HistoryItem[];
  onClearAll: () => void;
  onRemove: (query: string) => void;
  onSelect: (query: string) => void;
}

export function HistoryGroup({
  history,
  onClearAll,
  onRemove,
  onSelect,
}: HistoryGroupProps) {
  if (!history.length) return null;

  return (
    <CommandGroup
      heading={
        <div className="flex items-center justify-between">
          <span>最近搜索</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClearAll();
            }}
            className="text-muted-foreground/60 hover:text-destructive text-xs underline-offset-4 transition-colors hover:underline"
            aria-label="清空所有历史记录"
            title="清空所有历史记录"
          >
            清空全部
          </button>
        </div>
      }
    >
      {history.slice(0, 5).map((historyItem) => (
        <CommandItem
          key={`history-${historyItem.query}`}
          value={historyItem.query}
          onSelect={() => onSelect(historyItem.query)}
          className="group flex cursor-pointer items-center gap-2 px-3 py-2"
        >
          <AlignLeft className="h-4 w-4 text-amber-500" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate" title={historyItem.query}>
              {historyItem.query}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(historyItem.query);
            }}
            className="hover:bg-destructive/10 hover:text-destructive mr-2 rounded p-1 opacity-0 transition-all group-hover:opacity-100"
            aria-label={`删除历史记录: ${historyItem.query}`}
            title="删除历史记录"
          >
            <X className="h-3 w-3" />
          </button>
          <span className="text-muted-foreground/60 text-[10px] uppercase">
            历史
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

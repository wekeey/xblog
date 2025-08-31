"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDocsSearch } from "fumadocs-core/search/client";

import { siteConfig } from "@/lib/config";
import { useSearchHistory } from "@/hooks/use-search-history";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { HistoryGroup } from "./history-group";
import { ResultsGroup } from "./results-group";
import { EmptyView, ErrorView, LoadingView } from "./status-views";
import type { SearchDialogProps, SearchItem, SearchState } from "./types";

export default function SearchDialog({
  open,
  onOpenChange,
}: SearchDialogProps) {
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 搜索历史
  const { history, addToHistory, removeFromHistory, clearHistory } =
    useSearchHistory();

  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    api: "/api/search",
    delayMs: 300,
  });

  // 默认快捷链接，使用 siteConfig.navItems
  const defaultItems = useMemo(
    () =>
      siteConfig.navItems.map((item) => ({
        type: "page" as const,
        id: item.href.replace(/^\//, "") || "home",
        content: item.label,
        url: item.href,
      })),
    [],
  );

  const items: SearchItem[] =
    query.data !== "empty"
      ? (query.data as SearchItem[])
      : (defaultItems as SearchItem[]);

  // 搜索状态计算
  const searchState: SearchState = useMemo(() => {
    const hasQuery = search.trim().length > 0;
    const isLoading = query.isLoading || isTyping;
    const hasError = !!query.error;
    const isEmpty =
      hasQuery && !isLoading && !hasError && (!items || items.length === 0);
    const totalResults = items?.length || 0;

    return {
      isLoading,
      isEmpty,
      hasError,
      errorMessage: query.error?.message,
      totalResults,
      isTyping,
    };
  }, [search, query.isLoading, query.error, items, isTyping]);

  // 处理搜索输入变化
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      setIsTyping(true);

      // 清除之前的计时器
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // 设置新的计时器
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 500);
    },
    [setSearch],
  );

  // 处理选择项目
  const handleSelect = useCallback(
    (url: string, isHistoryItem?: boolean) => {
      // 如果不是历史记录项且有搜索内容，添加到历史记录
      if (!isHistoryItem && search.trim()) {
        addToHistory(search.trim(), items?.length || 0);
      }

      router.push(url);
      setSearch("");
      onOpenChange(false);
    },
    [router, setSearch, onOpenChange, search, addToHistory, items],
  );

  // 处理历史记录项选择
  const handleHistorySelect = useCallback(
    (query: string) => {
      setSearch(query);
    },
    [setSearch],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      onOpenChange(open);
      if (!open) {
        setSearch("");
        setIsTyping(false);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      }
    },
    [onOpenChange, setSearch],
  );

  // 清理定时器
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="top-[20%] flex max-h-[70vh] w-[90vw] max-w-lg translate-y-0 flex-col overflow-hidden p-0 sm:max-w-xl"
        aria-describedby={undefined}
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">搜索</DialogTitle>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="搜索文档、标题、内容..."
            value={search}
            onValueChange={handleSearchChange}
            className="h-12"
            autoFocus
          />

          <CommandList className="max-h-[50vh] flex-1 overflow-y-auto">
            {searchState.isLoading ? (
              <LoadingView typing={searchState.isTyping} />
            ) : searchState.hasError ? (
              <ErrorView message={searchState.errorMessage} />
            ) : searchState.isEmpty ? (
              <EmptyView />
            ) : (
              <>
                {!search && history.length > 0 && (
                  <HistoryGroup
                    history={history}
                    onClearAll={clearHistory}
                    onRemove={removeFromHistory}
                    onSelect={handleHistorySelect}
                  />
                )}

                {items && items.length > 0 && (
                  <ResultsGroup
                    items={items}
                    totalResults={searchState.totalResults}
                    search={search}
                    onSelect={(url) => handleSelect(url)}
                  />
                )}
              </>
            )}
          </CommandList>

          {/* 快捷键提示 */}
          <div className="border-t p-3">
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span>↑↓ 导航</span>
                <span>↵ 选择</span>
                <span>ESC 关闭</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="bg-muted pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none">
                  ⌘K
                </kbd>
                <span>搜索</span>
              </div>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

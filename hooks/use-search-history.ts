"use client";

import { useCallback, useEffect, useState } from "react";

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  resultCount?: number;
}

const STORAGE_KEY = "search-history";
const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // 从 localStorage 加载历史记录
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SearchHistoryItem[];
        // 过滤掉过期的记录（超过30天）
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const filtered = parsed.filter(
          (item) => item.timestamp > thirtyDaysAgo,
        );
        setHistory(filtered);
      }
    } catch (error) {
      console.warn("Failed to load search history:", error);
    }
  }, []);

  // 保存到 localStorage
  const saveHistory = useCallback((newHistory: SearchHistoryItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.warn("Failed to save search history:", error);
    }
  }, []);

  // 添加搜索记录
  const addToHistory = useCallback(
    (query: string, resultCount?: number) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery || trimmedQuery.length < 2) return;

      setHistory((prev) => {
        // 移除重复项
        const filtered = prev.filter((item) => item.query !== trimmedQuery);

        // 添加新项到开头
        const newItem: SearchHistoryItem = {
          query: trimmedQuery,
          timestamp: Date.now(),
          resultCount,
        };

        const newHistory = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

        // 异步保存
        setTimeout(() => saveHistory(newHistory), 0);

        return newHistory;
      });
    },
    [saveHistory],
  );

  // 清除历史记录
  const clearHistory = useCallback(() => {
    const newHistory: SearchHistoryItem[] = [];
    saveHistory(newHistory);
  }, [saveHistory]);

  // 删除单个历史记录
  const removeFromHistory = useCallback(
    (query: string) => {
      setHistory((prev) => {
        const newHistory = prev.filter((item) => item.query !== query);
        setTimeout(() => saveHistory(newHistory), 0);
        return newHistory;
      });
    },
    [saveHistory],
  );

  // 获取热门搜索（基于频率）
  const getPopularSearches = useCallback(() => {
    const queryCount = history.reduce(
      (acc, item) => {
        acc[item.query] = (acc[item.query] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(queryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([query]) => query);
  }, [history]);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    getPopularSearches,
  };
}

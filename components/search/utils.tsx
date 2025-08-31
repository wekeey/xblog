"use client";

import type { HighlightPiece } from "./types";

export function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getFallbackHighlights(
  content: string,
  query: string,
): HighlightPiece[] {
  const q = query.trim();
  if (!q) return [{ type: "text", content }];

  try {
    const regex = new RegExp(`(${escapeRegExp(q)})`, "ig");
    const split = content.split(regex);
    if (split.length === 1) return [{ type: "text", content }];

    return split
      .filter((s) => s.length > 0)
      .map<HighlightPiece>((s) => ({
        type: "text",
        content: s,
        styles:
          s.toLowerCase() === q.toLowerCase() ? { highlight: true } : undefined,
      }));
  } catch {
    return [{ type: "text", content }];
  }
}

export function getItemTypeLabel(type: string) {
  switch (type) {
    case "heading":
      return "标题";
    case "page":
      return "页面";
    default:
      return "内容";
  }
}

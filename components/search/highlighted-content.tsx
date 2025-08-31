"use client";

import * as React from "react";

import type { HighlightPiece } from "./types";
import { getFallbackHighlights } from "./utils";

const HighlightedContent = React.memo(function HighlightedContent({
  item,
  search,
}: {
  item: { content: string; contentWithHighlights?: HighlightPiece[] };
  search: string;
}) {
  const parts =
    Array.isArray(item.contentWithHighlights) &&
    item.contentWithHighlights.length > 0
      ? item.contentWithHighlights
      : getFallbackHighlights(item.content, search);

  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.styles?.highlight
              ? "rounded bg-yellow-300/50 px-0.5 ring-1 ring-yellow-400/30 dark:bg-yellow-500/20"
              : undefined
          }
        >
          {part.content}
        </span>
      ))}
    </>
  );
});

export default HighlightedContent;

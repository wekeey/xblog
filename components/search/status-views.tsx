"use client";

import * as React from "react";
import { AlertCircle, Loader2 } from "lucide-react";

import { CommandEmpty } from "@/components/ui/command";

export function LoadingView({ typing }: { typing: boolean }) {
  return (
    <div className="text-muted-foreground py-6 text-center text-sm">
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        {typing ? "输入中..." : "搜索中..."}
      </div>
    </div>
  );
}

export function ErrorView({ message }: { message?: string }) {
  return (
    <div className="py-6 text-center">
      <div className="mb-2 flex items-center justify-center gap-2 text-sm text-red-500">
        <AlertCircle className="h-4 w-4" />
        搜索失败
      </div>
      {message && (
        <div className="text-muted-foreground text-xs">{message}</div>
      )}
    </div>
  );
}

export function EmptyView() {
  return (
    <CommandEmpty>
      <div className="py-6 text-center">
        <div className="text-muted-foreground text-sm">没有找到相关结果</div>
        <div className="text-muted-foreground mt-1 text-xs">
          尝试使用不同的关键词
        </div>
      </div>
    </CommandEmpty>
  );
}

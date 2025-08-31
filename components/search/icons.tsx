"use client";

import { AlignLeft, FileText, Hash } from "lucide-react";

export function getItemIcon(type: string) {
  switch (type) {
    case "heading":
      return <Hash className="h-4 w-4 text-green-500" />;
    case "page":
      return <FileText className="h-4 w-4 text-blue-500" />;
    default:
      return <AlignLeft className="h-4 w-4 text-amber-500" />;
  }
}

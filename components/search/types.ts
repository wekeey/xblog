"use client";

import type { ReactNode } from "react";

export interface HighlightPiece {
  type: "text";
  content: string;
  styles?: { highlight?: boolean };
}

export interface SearchItem {
  id: string;
  type: string;
  content: string;
  url: string;
  contentWithHighlights?: HighlightPiece[];
}

export interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface SearchState {
  isLoading: boolean;
  isEmpty: boolean;
  hasError: boolean;
  errorMessage?: string;
  totalResults: number;
  isTyping: boolean;
}

export type Children = ReactNode | ReactNode[];

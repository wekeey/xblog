"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  baseUrl?: string; // 新增基础路径参数
}

export function PaginationNav({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  baseUrl = "/page", // 默认值为 "/page"
}: PaginationNavProps) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();

    router.push(url);
  };

  const getPrevUrl = () => {
    if (currentPage === 2) {
      // 第二页的上一页是首页，根据 baseUrl 决定
      if (baseUrl === "/page") {
        return "/"; // 主页
      } else {
        return baseUrl.replace("/page", ""); // 标签页的首页
      }
    }
    return `${baseUrl}/${currentPage - 1}`;
  };

  const getNextUrl = () => {
    return `${baseUrl}/${currentPage + 1}`;
  };

  const prevUrl = getPrevUrl();
  const nextUrl = getNextUrl();

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          {hasPrevPage && (
            <PaginationPrevious
              href={prevUrl}
              onClick={(e) => handleClick(e, prevUrl)}
              aria-label={`Go to page ${currentPage - 1}`}
            />
          )}
        </PaginationItem>
        <PaginationItem className="px-2 text-sm">
          <span>
            {currentPage} / {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          {hasNextPage && (
            <PaginationNext
              href={nextUrl}
              onClick={(e) => handleClick(e, nextUrl)}
              aria-label={`Go to page ${currentPage + 1}`}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

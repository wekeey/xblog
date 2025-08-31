"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Configure NProgress globally
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: "ease",
  speed: 500,
});

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isNavigatingRef = useRef(false);

  // Helper function to check if a URL is internal
  const isInternalLink = useCallback((href: string): boolean => {
    try {
      // Handle relative URLs
      if (href.startsWith("/")) return true;

      // Handle absolute URLs
      if (href.startsWith("http")) {
        const url = new URL(href);
        return url.origin === window.location.origin;
      }

      // Handle other cases (anchor links, etc.)
      return (
        !href.startsWith("#") &&
        !href.includes("mailto:") &&
        !href.includes("tel:")
      );
    } catch {
      return false;
    }
  }, []);

  // Helper function to check if navigation should trigger progress
  const shouldShowProgress = useCallback(
    (href: string): boolean => {
      if (!isInternalLink(href)) return false;

      // Don't show for hash links
      if (href.startsWith("#")) return false;

      // Don't show if navigating to the same page
      const currentPath = window.location.pathname + window.location.search;
      const targetPath = href.startsWith("/")
        ? href
        : new URL(href).pathname + new URL(href).search;

      return targetPath !== currentPath;
    },
    [isInternalLink],
  );

  // Handle link clicks with debouncing
  const handleAnchorClick = useCallback(
    (event: MouseEvent) => {
      try {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");

        if (!anchor || isNavigatingRef.current) return;

        const href = anchor.getAttribute("href");
        if (!href || !shouldShowProgress(href)) return;

        // Prevent multiple rapid clicks
        isNavigatingRef.current = true;
        NProgress.start();

        // Reset the flag after a short delay
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);
      } catch (error) {
        console.warn("Error handling navigation click:", error);
        isNavigatingRef.current = false;
      }
    },
    [shouldShowProgress],
  );

  // Handle browser navigation
  const handleBeforeUnload = useCallback(() => {
    if (!isNavigatingRef.current) {
      NProgress.start();
    }
  }, []);

  // Complete progress when route changes
  useEffect(() => {
    NProgress.done();
    isNavigatingRef.current = false;
  }, [pathname, searchParams]);

  // Set up event listeners
  useEffect(() => {
    document.addEventListener("click", handleAnchorClick, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      NProgress.done();
    };
  }, [handleAnchorClick, handleBeforeUnload]);

  return null;
}

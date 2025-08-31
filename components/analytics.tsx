"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return <VercelAnalytics />;
}

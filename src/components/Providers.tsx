"use client";

import { MotionConfig } from "framer-motion";
import { isPerfLite } from "@/lib/perf";

/** Honors prefers-reduced-motion; on lite tier, skips motion for smoother scroll on weak hardware. */
export function Providers({ children }: { children: React.ReactNode }) {
  const lite = isPerfLite();
  return <MotionConfig reducedMotion={lite ? "always" : "user"}>{children}</MotionConfig>;
}

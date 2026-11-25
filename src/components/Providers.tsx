"use client";

import { MotionConfig } from "framer-motion";

/** Honors the OS prefers-reduced-motion setting for Framer Motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

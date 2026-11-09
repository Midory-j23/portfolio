"use client";

import { useRef } from "react";

/** Card with a soft light that follows the pointer (Vercel-style). */
export function SpotlightCard({
  children,
  className = "",
  glow = "rgba(255,255,255,0.08)",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x,50%) var(--y,50%), ${glow}, transparent 45%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { whfCoord } from "@/components/ui/wild-hunt-footer";

/**
 * The footer's pointer reticle: dotted guide lines, a crosshair ring and a grid coordinate.
 * Attaches to its positioned parent; updates via refs so it never re-renders.
 */
export function Reticle() {
  const root = useRef<HTMLDivElement>(null);
  const h = useRef<HTMLDivElement>(null);
  const v = useRef<HTMLDivElement>(null);
  const c = useRef<HTMLDivElement>(null);
  const t = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = root.current?.parentElement;
    if (!host || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      const x = e.clientX - b.left;
      const y = e.clientY - b.top;
      if (h.current) h.current.style.transform = `translateY(${y}px)`;
      if (v.current) v.current.style.transform = `translateX(${x}px)`;
      if (c.current) c.current.style.transform = `translate(${x}px, ${y}px)`;
      if (t.current) {
        const right = x > b.width - 150;
        t.current.style.transform = right ? "translateX(-100%)" : "none";
        t.current.style.marginLeft = right ? "-16px" : "16px";
        t.current.textContent = `${whfCoord(x, y, b.width, b.height)} · ${String(Math.round(x)).padStart(4, "0")},${String(Math.round(y)).padStart(4, "0")}`;
      }
      if (root.current) root.current.style.opacity = "1";
    };
    const leave = () => {
      if (root.current) root.current.style.opacity = "0";
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden opacity-0 transition-opacity duration-300 [@media(pointer:fine)]:block"
    >
      <div ref={h} className="absolute left-0 top-0 h-0 w-full border-t border-dotted border-current opacity-50" />
      <div ref={v} className="absolute left-0 top-0 h-full w-0 border-l border-dotted border-current opacity-50" />
      <div ref={c} className="absolute left-0 top-0">
        <span className="absolute -left-[9px] -top-[9px] block h-[18px] w-[18px] rounded-full border border-current" />
        <span className="absolute -left-[15px] top-0 block h-px w-[5px] bg-current" />
        <span className="absolute left-[10px] top-0 block h-px w-[5px] bg-current" />
        <span className="absolute -top-[15px] left-0 block h-[5px] w-px bg-current" />
        <span className="absolute left-0 top-[10px] block h-[5px] w-px bg-current" />
        <span ref={t} className="absolute top-[-26px] whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em]" />
      </div>
    </div>
  );
}

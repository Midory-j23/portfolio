"use client";

import { useEffect, useRef } from "react";
import { whfHex } from "@/components/ui/wild-hunt-footer";

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/**
 * Ordered-dither seam, the footer's picture-to-field trick reused between sections.
 * Painted in the PREVIOUS section's colour: solid at the top, breaking into pixels
 * as it falls away. Drawn once per resize, no animation loop.
 */
export function DitherEdge({ color, height = 72, pixel = 6 }: { color: string; height?: number; pixel?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    const ctx = cv?.getContext("2d");
    if (!cv || !host || !ctx) return;
    const [r, g, b] = whfHex(color) || [0, 0, 0];

    const draw = () => {
      const cols = Math.ceil(host.clientWidth / pixel);
      const rows = Math.round(height / pixel);
      cv.width = cols;
      cv.height = rows;
      cv.style.width = cols * pixel + "px";
      cv.style.height = rows * pixel + "px";
      const img = ctx.createImageData(cols, rows);
      for (let y = 0; y < rows; y++) {
        const t = 1 - (y + 0.5) / rows;
        const f = t * t * (3 - 2 * t);
        for (let x = 0; x < cols; x++) {
          const on = (BAYER4[(x & 3) | ((y & 3) << 2)] + 0.5) / 16 < f;
          const i = (y * cols + x) * 4;
          img.data[i] = r;
          img.data[i + 1] = g;
          img.data[i + 2] = b;
          img.data[i + 3] = on ? 255 : 0;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(host);
    return () => ro.disconnect();
  }, [color, height, pixel]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-[-1px] z-10 max-w-none"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

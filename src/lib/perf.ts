/** Client-side flag set on <html data-perf="lite"|"full"> by the boot script in layout. */
export function isPerfLite(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.perf === "lite";
}
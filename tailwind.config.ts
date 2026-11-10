import type { Config } from "tailwindcss";

/**
 * Design system derived from the Wild Hunt footer:
 * vermilion · warm off-white · bone · deep ink, set in Anton + serif italic + mono.
 * Legacy token names (bg, fg, brand.*) are kept and re-pointed at this palette so
 * older components (the case-study modal) stay on-brand.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#100f0e",
        vermilion: "#e2281b",
        paper: "#f4efe5",
        bone: "#ebe5d8",
        bg: "#100f0e",
        surface: "#161412",
        card: "#1d1a17",
        fg: "#f4efe5",
        muted: "#b8b0a2",
        dim: "#837b6e",
        brand: { blue: "#e2281b", violet: "#ee4a2b", pink: "#ff6b3d", amber: "#e9b44c", teal: "#d9d0bb" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".35", transform: "scale(.7)" },
        },
        blob: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(40px,-30px,0) scale(1.15)" },
        },
        scrollLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        scrollLine: "scrollLine 2s cubic-bezier(.65,0,.35,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        surface: "#0a0a0a",
        card: "#111111",
        fg: "#ededed",
        muted: "#a1a1a1",
        dim: "#6b6b6b",
        brand: { blue: "#0070f3", violet: "#7928ca", pink: "#ff0080", amber: "#f5a623", teal: "#00d4b4" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
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
        marquee: "marquee 40s linear infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        scrollLine: "scrollLine 2s cubic-bezier(.65,0,.35,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;

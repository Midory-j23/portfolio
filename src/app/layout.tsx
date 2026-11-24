import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Anton, Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";
import { Providers } from "@/components/Providers";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const description =
  "Software Developer with 3 years of experience in frontend engineering, UI/UX design and backend development — building modern web applications and AI-powered products.";

export const metadata: Metadata = {
  title: `${profile.name} — Software Developer`,
  description,
  keywords: ["Software Developer", "Frontend Developer", "React", "Next.js", "FastAPI", "UI/UX Design", "Portfolio"],
  openGraph: { title: `${profile.name} — Software Developer`, description, type: "website" },
  twitter: { card: "summary_large_image", title: `${profile.name} — Software Developer`, description },
};

export const viewport: Viewport = {
  themeColor: "#100f0e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable} ${serif.variable}`}>
      <body>
        <Script id="perf-tier" strategy="beforeInteractive">
          {`(function(){try{var lite=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!lite){var c=navigator.hardwareConcurrency||8;var m=navigator.deviceMemory||8;if(c<=4||m<=4)lite=true;var conn=navigator.connection;if(conn&&(conn.saveData||conn.effectiveType==="slow-2g"||conn.effectiveType==="2g"))lite=true;}document.documentElement.dataset.perf=lite?"lite":"full";}catch(e){document.documentElement.dataset.perf="full";}})();`}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
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

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}

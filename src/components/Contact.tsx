"use client";

import { useState } from "react";
import { contact, profile } from "@/data/content";
import { Reveal } from "./Reveal";

const links = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  };

  return (
    <footer id="contact" className="px-4 pb-6 pt-12 sm:px-6 md:pt-24">
      <Reveal>
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] border border-white/10 bg-surface px-6 py-20 text-center md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="absolute -left-20 bottom-0 h-72 w-72 animate-blob rounded-full bg-brand-blue/30 blur-[110px]" />
            <div className="absolute -right-20 top-0 h-72 w-72 animate-blob rounded-full bg-brand-pink/30 blur-[110px] [animation-delay:-6s]" />
            <div className="absolute left-1/2 top-1/2 h-60 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/25 blur-[110px]" />
          </div>

          <div className="relative">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="text-brand">05</span> Contact
            </p>
            <h2 className="text-gradient mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
              Let&rsquo;s build something{" "}
              <em className="text-brand pr-[0.08em] font-serif font-normal italic tracking-[-0.02em]">thoughtful</em>{" "}
              together.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{contact.closing}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-white/85"
              >
                Start a conversation
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={copy}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 font-mono text-[13px] transition-colors hover:border-white/30"
                aria-live="polite"
              >
                {copied ? "Copied ✓" : profile.email}
              </button>
            </div>

            <ul className="mt-8 flex items-center justify-center gap-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
                  >
                    {l.label}
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-6 flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-2 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top" className="focus-ring transition-colors hover:text-white">Back to top ↑</a>
      </div>
    </footer>
  );
}

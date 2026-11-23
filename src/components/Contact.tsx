"use client";

import { useState } from "react";
import { contact, profile } from "@/data/content";
import { LineReveal, Reveal } from "./Reveal";
import { Reticle } from "./Reticle";
import { Section } from "./Section";

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
    <Section id="contact" tone="ink" prev="red" className="py-24 md:py-36">
      <Reticle />
      <div className="container-x relative">
        <Reveal>
          <div className="rule-dot mb-8 flex items-center justify-between border-t pt-3 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span>§ 05</span>
            <span>Contact</span>
            <span className="hidden opacity-60 sm:block">Plate 05 / 05</span>
          </div>
        </Reveal>

        <LineReveal
          className="font-display text-[clamp(2.7rem,11vw,13rem)] uppercase leading-[1.05]"
          lines={[
            "Let’s build",
            <span key="2">
              something <em className="inline-block font-serif text-[0.96em] font-normal normal-case italic leading-[1.05] text-vermilion">thoughtful</em>
            </span>,
            "together.",
          ]}
        />

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-base leading-relaxed opacity-80 md:text-lg">{contact.closing}</p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring link-u block break-all text-[clamp(1.35rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.02em]"
            >
              {profile.email}
            </a>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring group inline-flex items-center gap-2 bg-vermilion px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Start a conversation
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={copy}
                className="focus-ring border border-dotted border-paper/60 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-paper"
                aria-live="polite"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
            <ul className="mt-8 flex items-center gap-6">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring link-u font-mono text-[11px] uppercase tracking-[0.18em]"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

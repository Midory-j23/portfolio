"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/content";
import { LineReveal, Reveal } from "./Reveal";
import { Reticle } from "./Reticle";

// Same public-domain painting as the footer (Arbo, 1872), printed here as a red duotone.
const PAINTING =
  "https://cdn.21st.dev/assets/mirror/67/671b69b8614847816a300a1d11ee5704a7b2f5c51b8b50d45f17dfc49af09b68.jpg";
const ticks = ["A1", "B2", "C3", "D4", "E5", "F6"];

export function Hero() {
  return (
    <section id="top" className="tone-red relative flex min-h-[100dvh] flex-col overflow-hidden">
      <Reticle />
      <motion.figure
        className="absolute inset-0 z-0"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.3, delay: 0.3, ease: [0.65, 0, 0.2, 1] }}
      >
        <div className="absolute inset-0 overflow-hidden bg-vermilion">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PAINTING}
            alt=""
            aria-hidden
            draggable={false}
            className="h-full w-full object-cover mix-blend-multiply"
            style={{ objectPosition: "center 42%", filter: "grayscale(1) contrast(1.35) brightness(1.05)" }}
          />
        </div>
        <figcaption className="absolute bottom-28 left-6 right-8 hidden justify-between font-mono text-[10px] uppercase tracking-[0.16em] opacity-80 md:flex md:left-12 md:right-12">
          <span>Fig. 01</span>
          <span>Åsgårdsreien, 1872</span>
        </figcaption>
      </motion.figure>

      <div className="container-x relative z-[2] flex flex-1 flex-col pb-8 pt-[calc(5.25rem+env(safe-area-inset-top))] md:min-h-[100dvh] md:pb-10 md:pt-[calc(7rem+env(safe-area-inset-top))]">
        {/* meta strip */}
        <Reveal>
          <div className="rule-dot flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t pt-3 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span>N° 001 · Portfolio · {new Date().getFullYear()}</span>
            {profile.available && (
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-paper" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
                </span>
                {profile.availability}
              </span>
            )}
            <span className="hidden sm:block">{profile.location.replace(/[[\]]/g, "")}</span>
          </div>
        </Reveal>

        <div className="relative mt-8 md:mt-12" style={{ containerType: "inline-size" }}>
          <LineReveal
            as="h1"
            animateOnMount
            delay={0.15}
            className="relative z-[2] w-full max-w-full font-display text-[max(3.2rem,17.5cqi)] uppercase leading-[0.86]"
            lines={[
              "Software",
              <span key="d">
                Developer<span className="text-ink">.</span>
              </span>,
            ]}
          />
        </div>

        {/* statement + actions */}
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10">
          <Reveal delay={0.4} className="md:col-span-6">
            <p className="font-serif text-[clamp(1.55rem,3.2vw,3rem)] italic leading-[1.28] tracking-[-0.01em] [text-shadow:0_1px_16px_rgba(80,8,6,0.55)]">
              {profile.name} designs and builds{" "}
              <span className="underline decoration-ink decoration-2 underline-offset-[0.18em]">
                interfaces, systems &amp; intelligent products
              </span>{" "}
              for the web.
            </p>
          </Reveal>
          <Reveal delay={0.55} className="md:col-span-4 md:col-start-9">
            <p className="text-base leading-relaxed opacity-90 md:text-[17px]">
              I&rsquo;m a Software Developer with 3 years of experience creating modern web applications, intuitive
              interfaces, and technology-driven solutions.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#projects"
                className="focus-ring group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                View my work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>↓</span>
              </a>
              <a href="#contact" className="focus-ring link-u font-mono text-[11px] uppercase tracking-[0.18em]">
                Let&rsquo;s talk →
              </a>
            </div>
          </Reveal>
        </div>

        <p className="mt-10 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] opacity-80 md:hidden">
          <span>Fig. 01</span>
          <span>Åsgårdsreien, 1872</span>
        </p>

        {/* coordinate scale */}
        <div aria-hidden className="mt-auto flex items-end justify-between border-b border-dotted border-paper/50 pb-2 pt-8 md:pt-16">
          {ticks.map((t) => (
            <span key={t} className="flex flex-col font-mono text-[9px] tracking-[0.14em] opacity-80">
              <span className="mb-1 block h-2 w-px bg-current" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

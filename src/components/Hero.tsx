"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/content";
import { LineReveal, Reveal } from "./Reveal";
import { Reticle } from "./Reticle";

// Same public-domain painting as the footer (Arbo, 1872), printed here as a red duotone.
const PAINTING =
  "https://cdn.21st.dev/assets/mirror/67/671b69b8614847816a300a1d11ee5704a7b2f5c51b8b50d45f17dfc49af09b68.jpg";
const ticks = ["A1", "B2", "C3", "D4", "E5", "F6"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section id="top" ref={ref} className="tone-red relative isolate overflow-hidden pb-8 pt-24 md:pt-28">
      {/* Atmospheric field: same Arbo plate as the footer, veiled so type stays legible */}
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PAINTING}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.38]"
          style={{ objectPosition: "58% 18%", filter: "saturate(0.72) contrast(1.08) brightness(0.92)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vermilion/48 via-vermilion/72 to-vermilion" />
        <div className="absolute inset-0 bg-gradient-to-r from-vermilion/92 via-vermilion/80 to-vermilion/45" />
      </motion.div>
      <Reticle />
      <div className="container-x relative z-[1]">
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

        {/* headline with inset plate — full-bleed type, plate floats top-right on md+ */}
        <div className="relative mt-8 md:mt-12">
          <motion.figure
            style={{ y }}
            className="relative z-0 mb-6 md:absolute md:right-0 md:top-0 md:mb-0 md:w-[min(24vw,300px)] lg:w-[min(26vw,340px)]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.65, 0, 0.2, 1] }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-vermilion md:aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PAINTING}
                alt=""
                aria-hidden
                draggable={false}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "50% 26%",
                  filter: "grayscale(1) sepia(0.45) saturate(2.8) hue-rotate(346deg) contrast(1.2) brightness(0.95)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-vermilion/25 mix-blend-color"
              />
            </div>
            <figcaption className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] opacity-80">
              <span>Fig. 01</span>
              <span>Åsgårdsreien, 1872</span>
            </figcaption>
          </motion.figure>

          <LineReveal
            as="h1"
            animateOnMount
            delay={0.15}
            className="relative z-10 w-full font-display text-[clamp(4rem,20.5vw,22rem)] uppercase leading-[0.84]"
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
            <p className="font-serif text-[clamp(1.7rem,3.2vw,3rem)] italic leading-[1.08] tracking-[-0.01em]">
              {profile.name} designs and builds{" "}
              <span className="text-ink">interfaces, systems &amp; intelligent products</span> for the web.
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

        {/* coordinate scale */}
        <div aria-hidden className="mt-12 flex items-end justify-between border-b border-dotted border-paper/50 pb-2 md:mt-16">
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

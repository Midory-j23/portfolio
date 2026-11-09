"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/content";
import { LineReveal, Reveal } from "./Reveal";

const bars = [62, 38, 80, 54, 92, 46, 70, 58, 84, 40, 66, 88];

/** Decorative product-shot collage. Illustrative UI only: no real data or metrics. */
function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yL = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yR = useTransform(scrollYProgress, [0, 1], [90, -90]);

  return (
    <div ref={ref} aria-hidden className="relative mx-auto mt-16 w-full max-w-[1000px] md:mt-24">
      {/* glow */}
      <div className="absolute -inset-x-10 -top-10 bottom-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(121,40,202,.35),transparent_60%)] blur-2xl" />

      {/* main window */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0f] shadow-[0_30px_120px_-20px_rgba(121,40,202,.55)]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="mx-auto rounded-md bg-white/5 px-10 py-1 font-mono text-[10px] text-dim">dashboard</span>
        </div>
        <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[150px_1fr]">
          <div className="space-y-3 border-r border-white/10 p-3 sm:p-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-2.5 rounded-full ${i === 0 ? "bg-gradient-to-r from-brand-blue to-brand-violet" : "bg-white/10"}`} style={{ width: `${95 - i * 12}%` }} />
            ))}
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Utilisation", "from-brand-blue to-brand-violet"],
                ["Memory", "from-brand-violet to-brand-pink"],
                ["Temperature", "from-brand-pink to-brand-amber"],
              ].map(([l, g], i) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-dim sm:text-[10px]">{l}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${g}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${[68, 45, 82][i]}%` }}
                      transition={{ duration: 1.4, delay: 1.2 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex h-28 items-end gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:h-44 sm:gap-2">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-blue/20 via-brand-violet/60 to-brand-pink"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.9, delay: 1.3 + i * 0.05, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* chat card */}
      <motion.div
        style={{ y: yL }}
        className="absolute -left-4 top-16 hidden w-60 -rotate-6 md:block lg:-left-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border border-white/15 bg-[#0e0e12]/90 p-4 shadow-2xl backdrop-blur"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-brand-pink to-brand-amber" />
            <span className="h-2 w-16 rounded-full bg-white/15" />
          </div>
          <div className="mb-2 w-4/5 rounded-xl rounded-tl-sm bg-white/10 px-3 py-2 text-[11px] text-muted">How can I help you today?</div>
          <div className="mb-2 ml-auto w-3/4 rounded-xl rounded-tr-sm bg-gradient-to-r from-brand-blue to-brand-violet px-3 py-2 text-[11px] text-white">
            Build me an assistant.
          </div>
          <div className="flex w-14 gap-1 rounded-xl bg-white/10 px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white/60"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* code card */}
      <motion.div
        style={{ y: yR }}
        className="absolute -right-4 top-40 hidden w-72 rotate-6 md:block lg:-right-16"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border border-white/15 bg-[#0e0e12]/90 p-4 font-mono text-[11px] leading-relaxed shadow-2xl backdrop-blur"
        >
          <p><span className="text-brand-pink">const</span> <span className="text-brand-blue">developer</span> = {"{"}</p>
          <p className="pl-4">role: <span className="text-brand-teal">&quot;{profile.role}&quot;</span>,</p>
          <p className="pl-4">stack: [<span className="text-brand-teal">&quot;React&quot;</span>, <span className="text-brand-teal">&quot;FastAPI&quot;</span>],</p>
          <p className="pl-4">available: <span className="text-brand-amber">{String(profile.available)}</span>,</p>
          <p>{"}"}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-48">
      {/* backdrop: grid + drifting colour blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-[8%] top-10 h-72 w-72 animate-blob rounded-full bg-brand-blue/25 blur-[110px]" />
        <div className="absolute right-[6%] top-24 h-80 w-80 animate-blob rounded-full bg-brand-pink/20 blur-[120px] [animation-delay:-5s]" />
        <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 animate-blob rounded-full bg-brand-violet/25 blur-[120px] [animation-delay:-9s]" />
      </div>

      <div className="container-x relative text-center">
        {profile.available && (
          <Reveal className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-4 text-[13px] text-fg backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-brand-teal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
              </span>
              {profile.availability}
            </span>
          </Reveal>
        )}

        <LineReveal
          as="h1"
          animateOnMount
          delay={0.15}
          className="mx-auto max-w-5xl text-[clamp(2.5rem,7.6vw,6.5rem)] font-semibold leading-[1] tracking-[-0.05em]"
          lines={[
            <span key="1" className="text-gradient">Building Digital</span>,
            <span key="2" className="text-gradient">Experiences Through</span>,
            <span key="3" className="text-gradient">
              Code <span className="text-brand font-serif font-normal italic">&amp;</span>{" "}
              <span className="text-brand font-serif font-normal italic">Creativity.</span>
            </span>,
          ]}
        />

        <Reveal delay={0.6}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            I&rsquo;m a Software Developer with 3 years of experience creating modern web
            applications, intuitive interfaces, and technology-driven solutions.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              View My Work
              <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>↓</span>
            </a>
            <a
              href="#contact"
              className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/[0.07]"
            >
              Let&rsquo;s Talk
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
            </a>
          </div>
        </Reveal>

        <Showcase />
      </div>
    </section>
  );
}

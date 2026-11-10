"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, profile } from "@/data/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-dotted border-paper/30 bg-ink/90 text-paper backdrop-blur-md">
        <nav aria-label="Primary" className="container-x flex h-14 items-center justify-between">
          <a href="#top" className="focus-ring flex items-baseline gap-3" aria-label={`${profile.name} — home`}>
            <span className="font-display text-2xl leading-none tracking-wide">{profile.wordmark}</span>
            <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 lg:block">
              N° 001 — Portfolio
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="focus-ring group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100 aria-[current=true]:opacity-100"
                  aria-current={active === item.id ? "true" : undefined}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${active === item.id ? "bg-vermilion" : "bg-paper/25 group-hover:bg-paper/60"}`}
                  />
                  <span className="opacity-50">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring hidden whitespace-nowrap bg-vermilion px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink sm:block"
            >
              Hire me ↗
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="focus-ring flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-dotted border-paper/50 md:hidden"
            >
              <span className={`h-px w-4 bg-paper transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-paper transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-vermilion px-5 pb-8 pt-24 text-paper md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.2, 1] }}
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="rule-dot border-t"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.06 } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="focus-ring flex items-baseline justify-between py-3 font-display text-[3.4rem] uppercase leading-none"
                  >
                    {item.label}
                    <span className="font-mono text-[11px] tracking-widest opacity-70">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring break-all bg-ink py-3.5 text-center font-mono text-xs uppercase tracking-[0.14em]"
            >
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

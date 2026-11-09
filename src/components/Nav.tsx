"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, profile } from "@/data/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-[1000px] items-center justify-between rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ${
            scrolled || open
              ? "border-white/10 bg-black/60 shadow-[0_8px_40px_rgba(0,0,0,.6)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="focus-ring flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue via-brand-violet to-brand-pink text-[11px] font-bold text-white">
              {profile.wordmark}
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name.split(" ")[0]}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="focus-ring relative block rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-white aria-[current=true]:text-white"
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="focus-ring hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/85 sm:block"
            >
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="focus-ring flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 md:hidden"
            >
              <span className={`h-px w-4 bg-white transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-white transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-b border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.06 } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="focus-ring flex items-baseline justify-between py-4 text-4xl font-semibold tracking-[-0.04em]"
                  >
                    {item.label}
                    <span className="font-mono text-[11px] tracking-widest text-dim">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring rounded-full bg-white py-3.5 text-center text-sm font-medium text-black"
            >
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

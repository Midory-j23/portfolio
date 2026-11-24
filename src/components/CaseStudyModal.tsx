"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/data/caseStudy";
import { publicPath } from "@/lib/publicPath";

function Heading({ index, id, children }: { index: string; id: string; children: React.ReactNode }) {
  return (
    <div id={`cs-${id}`} className="mb-6 flex items-baseline gap-3 pt-2">
      <span className="font-mono text-xs text-vermilion">{index}</span>
      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-paper md:text-3xl">{children}</h3>
    </div>
  );
}

export function CaseStudyModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("overview");

  // Section list drives both the tab bar and the numbered headings.
  const sections = useMemo(() => {
    const list = [
      { id: "overview", label: "Overview", title: "Overview" },
      {
        id: "problem",
        label: study.problemTitle ? study.problemTitle.split(" ")[0] : "Problem",
        title: study.problemTitle ?? "The problem",
      },
      { id: "solution", label: study.solutionTitle ? "Approach" : "Solution", title: study.solutionTitle ?? "The solution" },
      ...(study.screens?.length ? [{ id: "screens", label: "Screens", title: "Screens" }] : []),
      { id: "features", label: "Features", title: "Key features" },
      { id: "architecture", label: "Architecture", title: "Architecture" },
      { id: "highlights", label: "Technical", title: "Technical highlights" },
      { id: "challenges", label: "Challenges", title: "Challenges & how I solved them" },
      { id: "outcome", label: "Outcome", title: "Outcome" },
    ];
    const tabLabels: Record<string, string> = {
      overview: "Intro",
      problem: "Goals",
      solution: "Plan",
      screens: "UI",
      features: "Features",
      architecture: "Stack",
      highlights: "Tech",
      challenges: "Build",
      outcome: "Result",
    };
    return list.map((s, i) => ({
      ...s,
      tab: tabLabels[s.id] ?? s.label,
      n: String(i + 1).padStart(2, "0"),
    }));
  }, [study]);
  const num = (id: string) => sections.find((s) => s.id === id)!.n;
  const title = (id: string) => sections.find((s) => s.id === id)!.title;

  // Lock page scroll (html + body), focus the dialog, restore on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    html.classList.add("modal-open");
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.classList.remove("modal-open");
      html.style.overflow = prevHtml;
      Object.assign(body.style, prev);
      window.scrollTo(0, scrollY);
      previous?.focus?.();
    };
  }, []);

  // Escape to close + simple focus trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sectionAnchor = 148;

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 32) {
      setActive(sections[sections.length - 1].id);
      return;
    }

    const containerTop = el.getBoundingClientRect().top;
    let current = sections[0].id;
    for (const s of sections) {
      const node = document.getElementById(`cs-${s.id}`);
      if (!node) continue;
      if (node.getBoundingClientRect().top - containerTop <= sectionAnchor) current = s.id;
    }
    setActive(current);
  }, [sections]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const goTo = (id: string) => {
    const el = scrollRef.current;
    const node = document.getElementById(`cs-${id}`);
    if (!el || !node) return;
    const offset =
      node.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - sectionAnchor;
    el.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
  };

  return createPortal(
    <motion.div
      className="case-study text-paper fixed inset-0 z-[100] flex flex-col overflow-hidden overscroll-none sm:items-center sm:justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="modal-backdrop absolute inset-0 bg-[#07070a] sm:bg-black/80 sm:backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative z-10 flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#07070a] text-paper sm:h-[min(90dvh,900px)] sm:max-h-[min(90dvh,900px)] sm:max-w-[980px] sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-[0_40px_160px_-20px_rgba(121,40,202,.55)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* header */}
        <div className="relative z-10 shrink-0 border-b border-white/10 bg-[#07070a] pt-[env(safe-area-inset-top,0px)] sm:pt-0">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span aria-hidden className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-brand-amber via-brand-pink to-brand-violet" />
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/65">Case study</p>
                <h2 id="case-study-title" className="truncate text-lg font-semibold tracking-[-0.03em] text-paper">
                  {study.title}
                </h2>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {study.pdf && (
                <a
                  href={publicPath(study.pdf)}
                  download
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm text-paper transition-colors hover:border-white/40 hover:bg-white/[0.06] sm:h-auto sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2"
                  aria-label="Download PDF"
                >
                  <span aria-hidden className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="hidden sm:inline" aria-hidden>
                    ↓
                  </span>
                </a>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:border-white/40 hover:bg-white/[0.06]"
              >
                <span aria-hidden className="text-lg leading-none">✕</span>
              </button>
            </div>
          </div>

          <nav
            aria-label="Case study sections"
            className="flex gap-1 overflow-x-auto px-4 pb-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:px-7 [mask-image:linear-gradient(to_right,transparent,#000_12px,#000_calc(100%-12px),transparent)] sm:[mask-image:none]"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(s.id)}
                aria-current={active === s.id ? "true" : undefined}
                className="focus-ring shrink-0 rounded-full px-2.5 py-1.5 text-[10px] text-paper/70 transition-colors hover:text-paper aria-[current=true]:bg-white/10 aria-[current=true]:text-paper sm:px-3.5 sm:text-[13px]"
              >
                <span className="sm:hidden">{s.tab}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </nav>
          <div className="h-px w-full bg-white/5">
            <div
              className="h-full origin-left bg-gradient-to-r from-brand-blue via-brand-violet to-brand-pink"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>

        {/* body */}
        <div
          ref={scrollRef}
          data-cs-scroll
          onScroll={onScroll}
          className="case-study-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth"
        >
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,0,128,.16),transparent_70%)]" />

          <div className="relative mx-auto max-w-[760px] px-4 pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-4 sm:px-8 sm:pb-20 sm:pt-10 md:pt-14">
            {/* hero — title lives in the sticky bar on phones */}
            <div className="hidden sm:block">
              <p className="mb-4 inline-flex max-w-full flex-wrap gap-x-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/75">
                {study.tagline}
              </p>
              <h2 className="text-[clamp(1.85rem,6vw,3.75rem)] font-semibold leading-[1.22] tracking-[-0.05em] text-paper">
                {study.title}:{" "}
                <em className="pr-[0.08em] font-serif font-normal italic leading-[1.15] tracking-[-0.02em] text-vermilion">
                  {study.subtitle}
                </em>
              </h2>
              {study.builtFor && <p className="mt-4 font-mono text-xs text-paper/70">{study.builtFor}</p>}
            </div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/70 sm:hidden">{study.tagline}</p>

            <div className="mt-8 space-y-12 sm:mt-14 sm:space-y-16">
              <section>
                <Heading index={num("overview")} id="overview">{title("overview")}</Heading>
                <div className="space-y-4 text-base leading-[1.8] text-paper/85">
                  {study.overview.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              <section>
                <Heading index={num("problem")} id="problem">{title("problem")}</Heading>
                <p className="text-base leading-[1.8] text-paper/85">{study.problem.intro}</p>
                <ul className="mt-5 space-y-3">
                  {study.problem.points.map((p, i) => (
                    <li key={i} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-[15px] leading-relaxed text-paper/85">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-pink to-brand-amber" />
                      {p}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <Heading index={num("solution")} id="solution">{title("solution")}</Heading>
                <p className="border-l-2 border-vermilion pl-5 text-lg leading-[1.7] text-paper">{study.solution}</p>
              </section>

              {study.screens && study.screens.length > 0 && (
                <section>
                  <Heading index={num("screens")} id="screens">{title("screens")}</Heading>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
                    {study.screens.map((s) => (
                      <figure key={s.src} className={`min-w-0 ${s.wide ? "sm:col-span-2" : ""}`}>
                        <a
                          href={publicPath(s.src)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`focus-ring group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] sm:rounded-2xl ${
                            s.portrait ? "mx-auto max-w-[min(100%,17.5rem)] sm:max-w-[280px]" : ""
                          }`}
                          aria-label={`Open full size: ${s.alt}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={publicPath(s.src)}
                            alt={s.alt}
                            loading="lazy"
                            decoding="async"
                            className="block h-auto max-h-[min(62vh,540px)] w-full object-contain object-top transition-transform duration-700 group-hover:scale-[1.01] sm:max-h-none sm:object-cover"
                          />
                          <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white backdrop-blur transition-opacity sm:right-3 sm:top-3 sm:px-2.5 sm:text-[10px] sm:opacity-0 sm:group-hover:opacity-100">
                            Open ↗
                          </span>
                        </a>
                        <figcaption
                          className={`mt-2.5 text-[13px] leading-relaxed text-paper/75 sm:mt-3 sm:text-sm ${
                            s.portrait ? "mx-auto max-w-[min(100%,17.5rem)] text-center sm:max-w-[280px]" : ""
                          }`}
                        >
                          {s.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  {study.screensNote && (
                    <p className="mt-5 font-mono text-[11px] leading-relaxed text-paper/70">{study.screensNote}</p>
                  )}
                </section>
              )}

              <section>
                <Heading index={num("features")} id="features">{title("features")}</Heading>
                <div className="space-y-10">
                  {study.features.map((g) => (
                    <div key={g.group}>
                      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-vermilion">{g.group}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {g.items.map((it) => (
                          <div key={it.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]">
                            <h4 className="font-medium tracking-[-0.02em] text-paper">{it.title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-paper/80">{it.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <Heading index={num("architecture")} id="architecture">{title("architecture")}</Heading>
                <p className="mb-6 text-base leading-[1.8] text-paper/85">
                  {study.architecture.length === 4 ? "Four pieces work together:" : "How the pieces fit together:"}
                </p>
                <ol className="grid gap-3 sm:grid-cols-2">
                  {study.architecture.map((a, i) => (
                    <li key={a.title} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue via-brand-violet to-brand-pink" />
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-vermilion">0{i + 1}</span>
                        <span className="chip !border-paper/25 !text-paper/80">{a.tech}</span>
                      </div>
                      <h4 className="mt-4 font-medium tracking-[-0.02em] text-paper">{a.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-paper/80">{a.text}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 rounded-xl border border-dashed border-white/15 p-4 text-sm leading-relaxed text-paper/80">
                  {study.architectureNote}
                </p>
              </section>

              <section>
                <Heading index={num("highlights")} id="highlights">{title("highlights")}</Heading>
                <dl className="divide-y divide-white/10 rounded-2xl border border-white/10">
                  {study.highlights.map((h) => (
                    <div key={h.area} className="grid gap-1 p-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-vermilion">{h.area}</dt>
                      <dd className="text-sm leading-relaxed text-paper/85">{h.text}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                  {study.stack.map((t) => (
                    <li key={t} className="chip !border-paper/25 !text-paper">
                      {t}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <Heading index={num("challenges")} id="challenges">{title("challenges")}</Heading>
                <ol className="space-y-3">
                  {study.challenges.map((c, i) => (
                    <li key={c.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <span className="font-mono text-xs text-vermilion">0{i + 1}</span>
                      <div>
                        <h4 className="font-medium tracking-[-0.02em] text-paper">{c.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-paper/80">{c.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <Heading index={num("outcome")} id="outcome">{title("outcome")}</Heading>
                <p className="text-[clamp(1.4rem,3vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.03em] text-paper">
                  {study.outcome}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {study.liveUrl && (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
                    >
                      Visit the live site
                      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>↗</span>
                    </a>
                  )}
                  {study.pdf && (
                    <a
                      href={publicPath(study.pdf)}
                      download
                      className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-paper transition-colors hover:border-white/40 hover:bg-white/[0.06]"
                    >
                      Download the PDF <span aria-hidden>↓</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-paper transition-colors hover:border-white/40 hover:bg-white/[0.06]"
                  >
                    Back to projects
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/content";
import { CaseStudyModal } from "./CaseStudyModal";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

function LinkOrNote({ href, label }: { href?: string; label: string }) {
  if (!href) {
    return <span className="font-mono text-[11px] uppercase tracking-widest text-dim">{label} · soon</span>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-white/40 hover:bg-white/[0.06]"
    >
      {label}
      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>↗</span>
    </a>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const hasStudy = !!project.caseStudy;
  return (
    <SpotlightCard className="flex h-full flex-col transition-transform duration-500 hover:-translate-y-1">
      <div className="p-2.5 pb-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]">
            <ProjectVisual project={project} />
          </div>
          {hasStudy && (
            <>
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur">
                Case study
              </span>
              <button
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`Read the ${project.name} case study`}
                className="focus-ring absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-transparent to-transparent pb-5 opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black">
                  Read case study <span aria-hidden>→</span>
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="chip !text-fg">{project.category}</span>
          <span className="font-mono text-xs text-dim">{project.index}</span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] md:text-[1.75rem]">{project.name}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.overview}</p>
        <p className="mt-3 text-sm italic leading-relaxed text-dim">
          <span className="not-italic text-muted">Contribution — </span>
          {project.contribution}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          {hasStudy && (
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              Read case study
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
            </button>
          )}
          <LinkOrNote href={project.demoUrl} label="Live demo" />
          <LinkOrNote href={project.repoUrl} label="GitHub" />
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,0,128,.10),transparent_65%)]" />
      <div className="container-x relative">
        <SectionHeading
          index="03"
          label="Selected Work"
          title={
            <>
              Featured <Accent>projects.</Accent>
            </>
          }
          sub="A selection of things I've designed and built. Where a project has no screenshot yet, the preview is an illustrative mockup."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} onOpen={setOpen} />
            </Reveal>
          ))}
          <Reveal delay={0.08}>
            <SpotlightCard className="flex h-full min-h-[320px] flex-col items-center justify-center p-8 text-center" glow="rgba(255,0,128,0.14)">
              <span aria-hidden className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue via-brand-violet to-brand-pink text-2xl text-white">+</span>
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">And more</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">
                There are more projects than fit here. Get in touch and I&rsquo;ll walk you through them.
              </p>
              <a
                href="#contact"
                className="focus-ring group mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors hover:border-white/40 hover:bg-white/[0.06]"
              >
                Ask me about my work
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
              </a>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {open?.caseStudy && <CaseStudyModal key={open.name} study={open.caseStudy} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}

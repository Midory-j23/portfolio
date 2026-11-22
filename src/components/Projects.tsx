"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/content";
import { CaseStudyModal } from "./CaseStudyModal";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Accent, SectionHeading } from "./SectionHeading";

function LinkOrNote({ href, label }: { href?: string; label: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring link-u font-mono text-[11px] uppercase tracking-[0.16em]"
    >
      {label} ↗
    </a>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const hasStudy = !!project.caseStudy;
  return (
    <article className="group">
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden border border-ink">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]">
            <ProjectVisual project={project} />
          </div>
          {hasStudy && (
            <>
              <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper">
                Case study
              </span>
              <button
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`Read the ${project.name} case study`}
                className="focus-ring absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100"
              >
                <span className="inline-flex items-center gap-2 bg-vermilion px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
                  Read case study →
                </span>
              </button>
            </>
          )}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
          <span>Fig. {project.index}</span>
          <span>{project.category}</span>
        </div>
      </div>

      <h3 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] uppercase leading-[0.92]">{project.name}</h3>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">{project.overview}</p>
      <p className="mt-3 max-w-xl font-serif text-lg italic leading-snug opacity-80">
        <span className="font-mono text-[10px] not-italic uppercase tracking-[0.18em] text-vermilion">Contribution — </span>
        {project.contribution}
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em]" aria-label="Technologies">
        {project.technologies.map((t) => (
          <li key={t} className="opacity-70 before:mr-1.5 before:text-vermilion before:content-['/']">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        {hasStudy && (
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="focus-ring group/b inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-vermilion"
          >
            Read case study
            <span className="transition-transform duration-300 group-hover/b:translate-x-0.5" aria-hidden>→</span>
          </button>
        )}
        <LinkOrNote href={project.demoUrl} label="Live demo" />
        <LinkOrNote href={project.repoUrl} label="GitHub" />
      </div>
    </article>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="projects" tone="paper" prev="ink" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Selected Work"
          title={
            <>
              Featured <Accent>projects.</Accent>
            </>
          }
          sub="A selection of things I've designed and built."
        />
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal key={p.name} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}>
              <ProjectCard project={p} onOpen={setOpen} />
            </Reveal>
          ))}
          <Reveal className={projects.length % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}>
            <div className="tone-red flex min-h-[340px] flex-col justify-between p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">+ More</span>
              <div>
                <h3 className="font-display text-[clamp(2.6rem,5vw,4.6rem)] uppercase leading-[0.92]">And more</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed opacity-90">
                  There are more projects than fit here. Get in touch and I&rsquo;ll walk you through them.
                </p>
                <a href="#contact" className="focus-ring link-u mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.18em]">
                  Ask me about my work →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {open?.caseStudy && <CaseStudyModal key={open.name} study={open.caseStudy} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </Section>
  );
}

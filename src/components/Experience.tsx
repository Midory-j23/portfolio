import { experience } from "@/data/content";
import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-96 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,112,243,.12),transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeading
          index="02"
          label="Experience"
          title={
            <>
              Where I&rsquo;ve been <Accent>working.</Accent>
            </>
          }
        />

        <ol className="relative space-y-5 pl-7 md:pl-10">
          <span
            aria-hidden
            className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-brand-blue via-brand-violet to-transparent md:left-[9px]"
          />
          {experience.map((job, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-7 top-9 h-[11px] w-[11px] rounded-full bg-white shadow-[0_0_0_4px_rgba(0,0,0,1),0_0_18px_4px_rgba(121,40,202,.7)] md:-left-10 md:h-[13px] md:w-[13px]"
              />
              <Reveal>
                <SpotlightCard glow="rgba(0,112,243,0.12)">
                  <div className="grid gap-6 p-6 md:grid-cols-[200px_1fr] md:gap-10 md:p-9">
                    <div>
                      <span className="chip !text-fg">{job.duration}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="break-words text-2xl font-semibold tracking-[-0.04em] md:text-4xl">
                        {job.company}
                      </h3>
                      <p className="mt-1.5 text-muted">{job.position}</p>
                      <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-muted md:text-base">
                        {job.responsibilities.map((r, j) => (
                          <li key={j} className="flex gap-3">
                            <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-pink" />
                            {r}
                          </li>
                        ))}
                      </ul>
                      {job.technologies.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                          {job.technologies.map((t) => (
                            <li key={t} className="chip">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

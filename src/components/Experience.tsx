import { experience } from "@/data/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Accent, SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <Section id="experience" tone="ink" prev="bone" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Experience"
          title={
            <>
              Where I&rsquo;ve been <Accent>working.</Accent>
            </>
          }
        />

        <ol className="border-b border-dotted border-paper/40">
          {experience.map((job, i) => (
            <Reveal key={i} as="li">
              <article className="group rule-dot grid gap-6 border-t py-9 md:grid-cols-12 md:gap-8 md:py-12">
                <div className="md:col-span-2">
                  <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em]">{job.duration}</p>
                </div>

                <div className="min-w-0 md:col-span-5">
                  <h3 className="break-words font-display text-[clamp(2.15rem,5vw,4.5rem)] uppercase leading-[1.02] transition-colors duration-300 group-hover:text-vermilion">
                    {job.company}
                  </h3>
                  <p className="mt-3 font-serif text-xl italic opacity-80 md:text-2xl">{job.position}</p>
                </div>

                <div className="min-w-0 md:col-span-5">
                  <ul className="space-y-3 text-[15px] leading-relaxed opacity-80 md:text-base">
                    {job.responsibilities.map((r, j) => (
                      <li key={j} className="flex gap-3">
                        <span aria-hidden className="font-mono text-vermilion">—</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  {job.technologies.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                      {Array.from(new Set(job.technologies)).map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

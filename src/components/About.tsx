import { about, profile } from "@/data/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Accent, SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <Section id="about" tone="bone" prev="ink" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              Design-minded, <Accent>engineering</Accent> led.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[clamp(1.5rem,2.7vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.03em]">{about.lead}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 space-y-5 text-[15px] leading-[1.75] opacity-80 md:columns-2 md:gap-10 md:space-y-0 md:text-base [&>p]:mb-5 [&>p]:break-inside-avoid">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rule-dot flex items-end gap-4 border-t pt-4">
                <span className="font-display text-[clamp(9rem,22vw,17rem)] leading-[0.8] text-[var(--accent)]">
                  {profile.years}
                </span>
                <span className="pb-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em]">
                  Years
                  <br />
                  building
                  <br />
                  for the web
                </span>
              </div>
            </Reveal>

            <ol className="mt-12">
              {about.pillars.map((p, i) => (
                <Reveal key={p.label} as="li" delay={0.05 * i}>
                  <div className="rule-dot group grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-t py-4">
                    <span className="font-mono text-[11px] tracking-[0.16em] opacity-60">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl uppercase leading-tight transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                        {p.label}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] opacity-60">{p.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}

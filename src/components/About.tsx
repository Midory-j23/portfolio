import { about, profile } from "@/data/content";
import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

const pillarGradients = [
  "from-brand-blue to-brand-violet",
  "from-brand-violet to-brand-pink",
  "from-brand-pink to-brand-amber",
  "from-brand-teal to-brand-blue",
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-36">
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

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <SpotlightCard className="h-full" glow="rgba(121,40,202,0.14)">
              <div className="p-7 md:p-10">
                <p className="text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-[1.25] tracking-[-0.03em]">
                  {about.lead}
                </p>
                <div className="mt-8 space-y-4 text-[15px] leading-[1.75] text-muted md:text-base">
                  {about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-2">
            <SpotlightCard className="h-full" glow="rgba(0,112,243,0.18)">
              <div className="flex h-full min-h-[240px] flex-col justify-between p-7 md:p-8">
                <span className="eyebrow">Experience</span>
                <div>
                  <span className="text-brand text-[8rem] font-semibold leading-[0.85]">
                    {profile.years}
                  </span>
                  <p className="mt-3 text-sm text-muted">years building for the web</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {about.pillars.map((p, i) => (
            <Reveal key={p.label} delay={0.05 * i} className="md:col-span-3 lg:col-span-3">
              <SpotlightCard className="h-full">
                <div className="flex items-start gap-4 p-6 md:p-7">
                  <span
                    aria-hidden
                    className={`mt-1 h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${pillarGradients[i]} opacity-90`}
                  />
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.02em]">{p.label}</h3>
                    <p className="mt-1 font-mono text-xs text-muted">{p.note}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

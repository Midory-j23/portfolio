import { skills } from "@/data/content";
import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

const dots = [
  "from-brand-blue to-brand-violet",
  "from-brand-violet to-brand-pink",
  "from-brand-teal to-brand-blue",
  "from-brand-pink to-brand-amber",
  "from-brand-amber to-brand-pink",
  "from-brand-blue to-brand-teal",
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Toolkit"
          title={
            <>
              Skills &amp; <Accent>technologies.</Accent>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={(i % 3) * 0.06}>
              <SpotlightCard className="h-full">
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className={`h-3 w-3 rounded-full bg-gradient-to-br ${dots[i % dots.length]}`} />
                    <h3 className="text-lg font-medium tracking-[-0.02em]">{s.group}</h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li key={item} className="chip !text-fg hover:border-white/30 hover:bg-white/[0.08]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

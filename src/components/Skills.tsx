import { skills } from "@/data/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Accent, SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <Section id="skills" tone="red" prev="paper" className="py-24 md:py-36">
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

        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={(i % 3) * 0.06} className={i % 3 === 1 ? "lg:mt-14" : i % 3 === 2 ? "lg:mt-28" : ""}>
              <div className="rule-dot border-t pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl uppercase leading-none md:text-4xl">{s.group}</h3>
                  <span className="font-mono text-[11px] tracking-[0.16em] opacity-70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.1em] transition-transform duration-300 hover:translate-x-1.5"
                    >
                      <span aria-hidden className="h-1 w-1 bg-current opacity-60 transition-all group-hover:w-3 group-hover:opacity-100" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

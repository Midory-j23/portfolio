import { skills } from "@/data/content";
import { Section } from "./Section";

export function Marquee() {
  const items = Array.from(new Set(skills.flatMap((s) => s.items)));
  const row = [...items, ...items];
  return (
    <Section tone="ink" prev="red" className="py-10 md:py-14">
      <div aria-hidden className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-[clamp(2.6rem,6vw,5rem)] uppercase leading-none ${
                i % 3 === 1 ? "text-transparent [-webkit-text-stroke:1px_#f4efe5]" : ""
              }`}
            >
              {t}
            </span>
            <span className="text-3xl text-vermilion">✺</span>
          </span>
        ))}
      </div>
    </Section>
  );
}

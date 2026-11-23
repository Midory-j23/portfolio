import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  sub,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="rule-dot mb-8 flex items-center justify-between border-t pt-3 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span>§ {index}</span>
        <span>{label}</span>
        <span className="hidden opacity-60 sm:block">Plate {index} / 05</span>
      </div>
      <h2 className="font-display text-[clamp(2.6rem,9.5vw,9rem)] uppercase leading-[1.12] tracking-[-0.005em]">{title}</h2>
      {sub && <p className="mt-6 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">{sub}</p>}
    </Reveal>
  );
}

/** Serif italic accent word used inside headings; takes the section's accent colour. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <em className="inline-block pr-[0.08em] font-serif text-[0.96em] font-normal normal-case italic leading-[1.05] tracking-[-0.02em] text-[var(--accent)]">
      {children}
    </em>
  );
}

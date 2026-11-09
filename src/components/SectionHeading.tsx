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
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span className="text-brand">{index}</span>
        {label}
      </p>
      <h2 className="text-gradient max-w-3xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
        {title}
      </h2>
      {sub && <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
    </Reveal>
  );
}

/** Serif italic accent word used inside headings. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <em className="text-brand pr-[0.08em] font-serif font-normal italic tracking-[-0.02em]">{children}</em>;
}

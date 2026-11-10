import { DitherEdge } from "./DitherEdge";

export type Tone = "ink" | "red" | "bone" | "paper";

const hex: Record<Tone, string> = { ink: "#100f0e", red: "#e2281b", bone: "#ebe5d8", paper: "#f4efe5" };

/** A full-width band with a colour tone; `prev` dithers the previous band's colour into it. */
export function Section({
  id,
  tone,
  prev,
  className = "",
  children,
}: {
  id?: string;
  tone: Tone;
  prev?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`tone-${tone} relative overflow-x-clip ${className}`}>
      {prev && <DitherEdge color={hex[prev]} />}
      {children}
    </section>
  );
}

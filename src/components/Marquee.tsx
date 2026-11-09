import { skills } from "@/data/content";

export function Marquee() {
  const items = Array.from(new Set(skills.flatMap((s) => s.items)));
  const row = [...items, ...items];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 py-5 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-3">
        {row.map((t, i) => (
          <span key={i} className="chip whitespace-nowrap !px-4 !py-1.5 !text-sm">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-pink" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

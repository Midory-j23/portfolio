import Image from "next/image";
import type { Project } from "@/data/content";

const themes: Record<Project["visual"], string> = {
  gpu: "from-[#e2281b] via-[#b81e14] to-[#100f0e]",
  chat: "from-[#e2281b] via-[#ee4a2b] to-[#e9b44c]",
  crm: "from-[#d9d0bb] via-[#e9b44c] to-[#e2281b]",
  network: "from-[#100f0e] via-[#5a1410] to-[#e2281b]",
  widget: "from-[#e9b44c] via-[#e2281b] to-[#100f0e]",
};

function Window({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="absolute inset-x-[9%] top-[14%] bottom-[-6%] overflow-hidden rounded-xl border border-white/20 bg-[#0b0b0f] shadow-[0_24px_60px_-10px_rgba(0,0,0,.6)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[9px] uppercase tracking-widest text-dim">{label}</span>
      </div>
      {children}
    </div>
  );
}

function Gpu() {
  const bars = [40, 66, 52, 84, 60, 92, 48, 74, 58, 80];
  return (
    <Window label="gpu monitor">
      <div className="space-y-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          {[70, 48, 85].map((w, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
              <div className="h-1.5 w-8 rounded-full bg-white/15" />
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-pink" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-24 items-end gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:h-28">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-blue/20 to-brand-violet" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </Window>
  );
}

function Chat() {
  return (
    <Window label="assistant">
      <div className="space-y-2.5 p-4">
        <div className="w-3/5 rounded-xl rounded-tl-sm bg-white/10 px-3 py-2"><div className="h-1.5 w-full rounded-full bg-white/30" /><div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/20" /></div>
        <div className="ml-auto w-1/2 rounded-xl rounded-tr-sm bg-gradient-to-r from-brand-pink to-brand-amber px-3 py-2"><div className="h-1.5 w-full rounded-full bg-white/70" /></div>
        <div className="w-2/3 rounded-xl rounded-tl-sm bg-white/10 px-3 py-2"><div className="h-1.5 w-full rounded-full bg-white/30" /><div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-white/20" /><div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/20" /></div>
        <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
          <div className="h-1.5 w-1/3 rounded-full bg-white/20" />
          <span className="ml-auto h-5 w-5 rounded-full bg-gradient-to-br from-brand-pink to-brand-amber" />
        </div>
      </div>
    </Window>
  );
}

function Crm() {
  const rows = [
    ["from-brand-teal to-brand-blue", "bg-brand-teal/30"],
    ["from-brand-blue to-brand-violet", "bg-brand-blue/30"],
    ["from-brand-pink to-brand-amber", "bg-brand-amber/30"],
    ["from-brand-violet to-brand-pink", "bg-brand-teal/30"],
  ];
  return (
    <Window label="crm">
      <div className="space-y-2 p-4">
        {rows.map(([av, pill], i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <span className={`h-6 w-6 rounded-full bg-gradient-to-br ${av}`} />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-1/3 rounded-full bg-white/30" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
            </div>
            <span className={`h-4 w-12 rounded-full ${pill}`} />
          </div>
        ))}
      </div>
    </Window>
  );
}

function Network() {
  const nodes: [number, number][] = [[50, 22], [20, 50], [80, 50], [35, 82], [65, 82]];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [1, 2], [3, 4]];
  return (
    <Window label="topology">
      <svg viewBox="0 0 100 100" className="h-[85%] w-full p-3" fill="none">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(255,255,255,.25)" strokeWidth=".6" strokeDasharray="1.5 1.5" />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill="rgba(255,0,128,.15)" />
            <circle cx={x} cy={y} r="3.6" fill={i === 0 ? "#e2281b" : "#e9b44c"} />
          </g>
        ))}
      </svg>
    </Window>
  );
}

function Widget() {
  return (
    <Window label="your-website.com">
      <div className="relative h-full p-4">
        <div className="h-2 w-1/3 rounded-full bg-white/25" />
        <div className="mt-3 h-1.5 w-2/3 rounded-full bg-white/10" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/10" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-white/[0.05]" />
          ))}
        </div>
        <div className="absolute bottom-6 right-4 w-[46%] rounded-xl border border-white/15 bg-[#14141a] p-3 shadow-xl">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-gradient-to-br from-brand-amber to-brand-pink" />
            <span className="h-1.5 w-10 rounded-full bg-white/25" />
          </div>
          <div className="w-4/5 rounded-lg rounded-tl-sm bg-white/10 px-2 py-1.5"><div className="h-1.5 w-full rounded-full bg-white/30" /></div>
          <div className="ml-auto mt-1.5 w-3/5 rounded-lg rounded-tr-sm bg-gradient-to-r from-brand-pink to-brand-amber px-2 py-1.5"><div className="h-1.5 w-full rounded-full bg-white/70" /></div>
        </div>
      </div>
    </Window>
  );
}

const visuals: Record<Project["visual"], () => React.JSX.Element> = {
  gpu: Gpu,
  chat: Chat,
  crm: Crm,
  network: Network,
  widget: Widget,
};

/** Real screenshot if `image` is set; otherwise an illustrative UI mockup (not real data). */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.name} screenshot`}
        fill
        sizes="(min-width: 768px) 560px, 100vw"
        className="object-cover object-top"
        unoptimized
      />
    );
  }
  const Visual = visuals[project.visual];
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${themes[project.visual]}`}
      role="img"
      aria-label={`${project.name} — illustrative preview, replace with a screenshot`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.35),transparent_45%)]" />
      <Visual />
    </div>
  );
}

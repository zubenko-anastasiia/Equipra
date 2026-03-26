
import type { FC } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatItem {
  label: string;
  value: string;
  /** The "Core services / 12" stat is hidden (opacity-0) in the design */
  hidden?: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS: StatItem[] = [
  { label: "Employees", value: "250+" },
  { label: "Core services", value: "12", hidden: true },
  { label: "Operations", value: "Worldwide" },
  { label: "Projects", value: "100+" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** "QUALITY ASSURANCE" eyebrow label with green accent bar */
function SectionLabel() {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="block h-1 w-8 shrink-0 rounded-full bg-[#1cc14b]"
      />
      <span className="font-mono text-[11px] font-normal uppercase tracking-[1.8px] text-[#737373]">
        Quality assurance
      </span>
    </div>
  );
}

/** Large display heading */
function Heading() {
  return (
    <h2 className="text-[clamp(28px,5.5vw,60px)] font-medium leading-[1.05] tracking-tight text-[#0a0a0a] lg:[text-indent:clamp(220px,23.611vw,340px)]">
      Our teams work across complex{" "}
      environments where accuracy, safety, and execution discipline are critical
      for long-term operational performance.
    </h2>
  );
}

/** Single stat tile */
function StatTile({ label, value, hidden }: StatItem) {
  return (
    <div
      className={[
        "flex flex-1 flex-col gap-3.5",
        hidden ? "opacity-0 pointer-events-none select-none" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={hidden}
    >
      <p className="text-base font-semibold leading-none text-[#0a0a0a]">
        {label}
      </p>
      <p className="text-[clamp(36px,5vw,60px)] font-medium leading-none text-[#0a0a0a]">
        {value}
      </p>
    </div>
  );
}

/** Four-column stats row */
function StatsRow() {
  const leftStats = STATS.slice(0, 2);
  const rightStats = STATS.slice(2);

  return (
    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)] lg:gap-x-0 lg:gap-y-0">
      <div className="flex flex-wrap gap-10 sm:flex-nowrap sm:gap-x-0">
        {leftStats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex  gap-10 sm:flex-nowrap sm:gap-x-0">
        {rightStats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}

/** Right-aligned "Quality guaranteed" prose block */
function QualityBlurb() {
  return (
    <div className="w-full py-2.5 lg:pl-[calc(50%+20px)]">
      <div className="flex flex-col gap-3.5">
        {/* Label */}
        <p className="text-base font-semibold leading-none text-[#0a0a0a]">
          Quality guaranteed
        </p>

        {/* Body copy – mixed-weight spans exactly as in Figma */}
        <p className="text-[clamp(18px,2vw,24px)] font-semibold leading-[1.35] text-[#737373]">
          From{" "}
          <span className="text-[#0a0a0a]">workshop preparation</span> to{" "}
          <span className="text-[#0a0a0a]">on-site installation</span>
          , every assembly and weld is{" "}
          <span className="text-[#0a0a0a]">verified before handover</span>.{" "}
          We follow{" "}
          <span className="text-[#0a0a0a]">documented procedures</span>, keep{" "}
          <span className="text-[#0a0a0a]">traceability where required</span>,
          and{" "}
          <span className="text-[#0a0a0a]">test systems prior to start-up</span>{" "}
          — so customers receive{" "}
          <span className="text-[#0a0a0a]">stable operations</span>,{" "}
          <span className="text-[#0a0a0a]">clear documentation</span> and a
          commissioning process they can{" "}
          <span className="text-[#0a0a0a]">trust</span>.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

const QualityAssurance: FC = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px] lg:py-24">
        {/* ── Top block: label + heading + stats ─────────────────────────── */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {/* Header */}
          <div className="flex flex-col gap-6">
            {/* The label is offset ~50px above the heading on desktop via spacing */}
            <div className="lg:pl-[clamp(220px,23.611vw,340px)]">
              <SectionLabel />
            </div>
            <Heading />
          </div>

          {/* Stats */}
          <StatsRow />
        </div>

        {/* ── Bottom block: quality blurb (right-aligned) ─────────────────── */}
        <div className="mt-24 flex w-full items-start justify-end lg:mt-32">
          <QualityBlurb />
        </div>
      </div>
    </section>
  );
};

export default QualityAssurance;

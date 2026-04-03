"use client";

import { useEffect, useRef, useState, type FC, type ReactNode } from "react";

const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";
const revealDuration = 0.72;
const valueAnimationDurationMs = 720;

const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean }
) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setInView(true);

          if (options?.once !== false) {
            observer.unobserve(node);
          }

          return;
        }

        if (options?.once === false) {
          setInView(false);
        }
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? "-80px 0px",
        threshold: options?.threshold ?? 0.15,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options?.once, options?.root, options?.rootMargin, options?.threshold]);

  return { ref, inView };
};

function RevealLine({
  children,
  inView,
  delay = 0,
}: {
  children: ReactNode;
  inView: boolean;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: `transform ${revealDuration}s ${easeOut} ${delay}s, opacity ${revealDuration}s ${easeOut} ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

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
      <span className="font-mono text-[0.6875rem] font-normal uppercase tracking-[1.8px] text-[#737373]">
        Quality assurance
      </span>
    </div>
  );
}

/** Large display heading */
function Heading({ inView }: { inView: boolean }) {
  return (
    <h2 className="text-[clamp(1.75rem,5.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-[#0a0a0a]">
      <span className="hidden sm:inline">
        <RevealLine inView={inView}>
          <span className="block lg:[text-indent:clamp(220px,23.611vw,340px)]">
            Our teams work across complex
          </span>
        </RevealLine>
        <RevealLine inView={inView} delay={0.07}>
          <span className="block">
            environments where accuracy, safety, and execution discipline are
            critical for long-term operational performance.
          </span>
        </RevealLine>
      </span>
      <span className="flex flex-col gap-0 sm:hidden">
        <RevealLine inView={inView}>
          <span className="block pl-16 text-2xl leading-none">
            Our teams work across
          </span>
        </RevealLine>
        <RevealLine inView={inView} delay={0.06}>
          <span className="block text-2xl leading-tight">
            complex environments where accuracy, safety, and execution
            discipline are critical for long-term operational performance.
          </span>
        </RevealLine>
      </span>
    </h2>
  );
}

/** Single stat tile */
function StatValue({
  value,
  inView,
  delay = 0,
}: {
  value: string;
  inView: boolean;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(
    value === "Worldwide" ? "" : "1"
  );

  useEffect(() => {
    let timeoutId = 0;
    let intervalId = 0;
    let frameId = 0;

    if (!inView) {
      return () => {
        window.clearTimeout(timeoutId);
        window.clearInterval(intervalId);
        window.cancelAnimationFrame(frameId);
      };
    }

    timeoutId = window.setTimeout(() => {
      if (value === "Worldwide") {
        let index = 0;
        setDisplayValue("");
        const stepMs = value.length > 0
          ? valueAnimationDurationMs / value.length
          : valueAnimationDurationMs;

        intervalId = window.setInterval(() => {
          index += 1;
          setDisplayValue(value.slice(0, index));

          if (index >= value.length) {
            window.clearInterval(intervalId);
          }
        }, stepMs);

        return;
      }

      const target = Number.parseInt(value, 10);
      const hasPlus = value.endsWith("+");
      const duration = valueAnimationDurationMs;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.max(1, Math.round(1 + eased * (target - 1)));
        setDisplayValue(`${current}${hasPlus ? "+" : ""}`);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      window.cancelAnimationFrame(frameId);
    };
  }, [delay, inView, value]);

  return (
    <p className="text-2xl font-medium leading-none text-[#0a0a0a] sm:text-[clamp(2.25rem,5vw,3.75rem)]">
      {displayValue}
    </p>
  );
}

function StatTile({
  label,
  value,
  hidden,
  inView,
  delay = 0,
}: StatItem & { inView: boolean; delay?: number }) {
  return (
    <div
      className={[
        "flex w-[120px] flex-col gap-3 sm:flex-1 sm:gap-3.5",
        hidden ? "hidden sm:flex sm:opacity-0 sm:pointer-events-none sm:select-none" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={hidden}
      style={
        hidden
          ? undefined
          : {
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(22px)",
              transition: `transform ${revealDuration}s ${easeOut} ${delay}s, opacity ${revealDuration}s ${easeOut} ${delay}s`,
            }
      }
    >
      <p className="text-base font-medium leading-none text-[#0a0a0a] sm:font-semibold">
        {label}
      </p>
      {hidden ? (
        <p className="text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-none text-[#0a0a0a]">
          {value}
        </p>
      ) : (
        <StatValue value={value} inView={inView} delay={delay} />
      )}
    </div>
  );
}

/** Four-column stats row */
function StatsRow() {
  const leftStats = STATS.slice(0, 2);
  const rightStats = STATS.slice(2);
  const mobileTopStat = STATS[0];
  const mobileBottomStats = STATS.filter((stat) => !stat.hidden).slice(1);
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: "-60px 0px",
  });

  return (
    <div
      ref={ref}
      className="pl-16 sm:pl-0"
    >
      <div className="flex flex-col gap-y-5 sm:hidden">
        <div className="flex">
          <StatTile
            key={mobileTopStat.label}
            {...mobileTopStat}
            inView={inView}
            delay={0}
          />
        </div>
        <div className="flex justify-between gap-x-4">
          {mobileBottomStats.map((stat, index) => (
            <StatTile
              key={stat.label}
              {...stat}
              inView={inView}
              delay={(index + 1) * 0.12}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:gap-10 lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)] lg:gap-x-0 lg:gap-y-0">
        <div className="flex flex-wrap gap-10 sm:flex-nowrap sm:gap-x-0">
          {leftStats.map((stat, index) => (
            <StatTile
              key={stat.label}
              {...stat}
              inView={inView}
              delay={index * 0.12}
            />
          ))}
        </div>

        <div className="flex gap-10 sm:flex-nowrap sm:gap-x-0">
          {rightStats.map((stat, index) => (
            <StatTile
              key={stat.label}
              {...stat}
              inView={inView}
              delay={(index + leftStats.length) * 0.12}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Right-aligned "Quality guaranteed" prose block */
function QualityBlurb() {
  return (
    <div className="w-full py-2.5 pl-16 lg:pl-[calc(50%+20px)]">
      <div className="flex flex-col gap-2.5 sm:gap-3.5">
        {/* Label */}
        <p className="text-base font-medium leading-none text-[#0a0a0a] sm:font-semibold">
          Quality guaranteed
        </p>

        {/* Body copy – mixed-weight spans exactly as in Figma */}
        <p className="text-lg font-semibold leading-7 text-[#737373] sm:text-[clamp(1.125rem,2vw,1.5rem)] sm:leading-[1.35]">
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
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    rootMargin: "-80px 0px",
  });

  return (
    <section
      id="quality-assurance"
      className="landing-mobile-gradient w-full"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-8 sm:py-16 md:px-[3.75rem] lg:py-24">
        {/* ── Top block: label + heading + stats ─────────────────────────── */}
        <div className="flex flex-col gap-8 sm:gap-16 lg:gap-24">
          {/* Header */}
          <div ref={headerRef} className="flex flex-col gap-8 sm:gap-6">
            {/* The label is offset ~50px above the heading on desktop via spacing */}
            <div
              className="pl-16 lg:pl-[clamp(220px,23.611vw,340px)]"
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateX(0)" : "translateX(-14px)",
                transition: `transform 0.6s ${easeOut}, opacity 0.6s ${easeOut}`,
              }}
            >
              <SectionLabel />
            </div>
            <Heading inView={headerInView} />
          </div>

          {/* Stats */}
          <StatsRow />
        </div>

        {/* ── Bottom block: quality blurb (right-aligned) ─────────────────── */}
        <div className="mt-8 flex w-full items-start justify-end sm:mt-24 lg:mt-32">
          <QualityBlurb />
        </div>
      </div>
    </section>
  );
};

export default QualityAssurance;

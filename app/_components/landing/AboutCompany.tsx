"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

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
  className = "",
}: {
  children: ReactNode;
  inView: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={className}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: `transform 0.72s ${easeOut} ${delay}s, opacity 0.72s ${easeOut} ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SectionLabel() {
  return (
    <div className="flex items-center gap-3">
      {/* Green accent bar */}
      <span
        aria-hidden="true"
        className="block h-[4px] w-8 rounded-full bg-[#1cc14b] shrink-0"
      />
      <span className="font-mono text-[11px] font-normal uppercase tracking-[1.8px] text-[#737373]">
        About Company
      </span>
    </div>
  );
}

function Heading({ inView }: { inView: boolean }) {
  const lines = [
    "Equipra supports the industries",
    "installations that keep production running",
  ];

  return (
    <h2 className="text-[clamp(32px,5.5vw,60px)] font-medium leading-[1.05] tracking-tight text-[#0a0a0a]">
      <span className="hidden sm:inline">
        {lines.map((line, index) => (
          <RevealLine key={line} inView={inView} delay={index * 0.07}>
            <span
              className={
                index === 0
                  ? "block lg:[text-indent:clamp(220px,23.611vw,340px)]"
                  : "block"
              }
            >
              {line}
            </span>
          </RevealLine>
        ))}
      </span>
      <span className="sm:hidden">
        <RevealLine inView={inView}>
          <span>
            Equipra supports the industries installations that keep production
            running
          </span>
        </RevealLine>
      </span>
    </h2>
  );
}

function BodyText() {
  return (
    <div className="space-y-4 text-[15px] leading-[1.6]">
      <p>
        <span className="font-medium text-[#0a0a0a]">
          Equipra was built on a straightforward belief:
        </span>{" "}
        <span className="text-[#737373]">
          that industrial clients deserve an installation partner who executes{" "}
        </span>
        <span className="font-medium text-[#0a0a0a]">with the same precision</span>
        <span className="text-[#737373]">
          {" "}
          the engineers designed for — every time, on every project.
        </span>
      </p>

      <p>
        <span className="text-[#737373]">
          We started as a team of specialists who understood{" "}
        </span>
        <span className="font-medium text-[#0a0a0a]">
          what complex facilities demand.
        </span>
      </p>

      <p>
        <span className="text-[#737373]">Today, we operate </span>
        <span className="font-medium text-[#0a0a0a]">worldwide</span>
        <span className="text-[#737373]"> — across </span>
        <span className="font-medium text-[#0a0a0a]">
          food, pharma, processing, energy and data infrastructure
        </span>
        <span className="text-[#737373]">
          {" "}
          — carrying the same standard from our first project to our hundredth.
        </span>
      </p>
    </div>
  );
}

function VideoCard() {
  return (
    <div className="flex flex-col items-end gap-[14px]">
      <Link
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch how we work on YouTube"
        className="group relative block w-[218px] h-[146px] overflow-hidden rounded-sm"
      >
        <Image
          src="/img3.webp"
          alt="Equipra project preview"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="218px"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_45%),linear-gradient(0deg,rgba(12,32,21,0.2),rgba(12,32,21,0.2))]" />
        <div className="absolute inset-x-4 bottom-4 top-4 rounded-[2px] border border-white/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-[51px] w-[51px] items-center justify-center rounded-full bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 group-hover:scale-110">
            <span
              aria-hidden="true"
              className="ml-1 h-0 w-0 border-b-[10px] border-l-[16px] border-t-[10px] border-b-transparent border-l-[#007321] border-t-transparent"
            />
          </div>
        </div>
      </Link>

      <p className="text-sm font-medium text-[#0a0a0a]">Watch how we work</p>
    </div>
  );
}

function StructuralIllustration({ inView }: { inView: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[498px] w-[489px] mix-blend-multiply"
      style={{
        opacity: inView ? 0.42 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `transform 1.2s ${easeOut} 0.22s, opacity 1.5s ease-out 0.4s`,
      }}
    >
      <div className="h-full w-full -scale-y-100 rotate-180">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/img2.webp"
            alt=""
            fill
            className="object-cover"
            sizes="489px"
          />
          <div className="absolute inset-0 bg-[#005a1a]/60 mix-blend-lighten" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export default function AboutSection() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    rootMargin: "-80px 0px",
  });

  return (
    <section
      id="about-us"
      data-nav-section
      className="relative w-full overflow-hidden bg-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px] lg:py-24">
        {/* Decorative structural drawing — desktop only, absolutely positioned */}

        {/* ------------------------------------------------------------------ */}
        {/* Top label + heading                                                  */}
        {/* ------------------------------------------------------------------ */}
        <div ref={headerRef} className="relative mb-16 flex flex-col gap-6">
          {/* "About Company" label */}
          <div
            className="lg:pl-[clamp(220px,23.611vw,340px)]"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateX(0)" : "translateX(-14px)",
              transition: `transform 0.6s ${easeOut}, opacity 0.6s ${easeOut}`,
            }}
          >
            <SectionLabel />
          </div>

          {/* Heading spans full container width from this indent */}
          <div>
            <Heading inView={headerInView} />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Body content – right-aligned two-column block                        */}
        {/* ------------------------------------------------------------------ */}
        <div className="relative">
          <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-10 lg:ml-[calc(50%+20px)] lg:grid lg:w-[calc(50%-20px)] lg:grid-cols-[minmax(0,299px)_285px] lg:gap-10">
            <div className="-mt-[100px] lg:absolute lg:left-0 lg:top-0">
              <StructuralIllustration inView={headerInView} />
            </div>
            {/* Body copy column */}
            <div className="min-w-0 flex-1 sm:max-w-[299px]">
              <BodyText />
            </div>

            {/* Video card column */}
            <div className="flex shrink-0 flex-col items-start gap-4 sm:w-[285px] sm:items-end">
              <VideoCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

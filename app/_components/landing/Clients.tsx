'use client'

import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'

const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean }
) => {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return
        }

        if (entry.isIntersecting) {
          setInView(true)

          if (options?.once !== false) {
            observer.unobserve(node)
          }

          return
        }

        if (options?.once === false) {
          setInView(false)
        }
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '-40px 0px',
        threshold: options?.threshold ?? 0.15,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [options?.once, options?.root, options?.rootMargin, options?.threshold])

  return { ref, inView }
}

const DrawLine: FC<{
  inView: boolean
  delay: number
  color?: string
  thickness?: number
}> = ({ inView, delay, color = '#0a0a0a', thickness = 1 }) => (
  <div
    className="absolute left-0 right-0 top-0 overflow-hidden"
    style={{ height: thickness }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: color,
        transform: `scaleX(${inView ? 1 : 0})`,
        transformOrigin: '0 50%',
        transition: `transform 0.56s ${easeOut} ${delay}s`,
      }}
    />
  </div>
)

interface LogoItem {
  alt: string
  w: number
  h: number
  blendDifference?: boolean
}

interface ReferenceItem {
  title: string
  scope: string
  href: string
}

const LOGOS: LogoItem[] = [
  { alt: "Kellogg's", w: 119, h: 40 },
  { alt: 'Steico', w: 82, h: 40 },
  { alt: 'Boccard', w: 172, h: 40 },
  { alt: 'Paname', w: 135, h: 30, blendDifference: true },
  { alt: 'TZ Polfa', w: 137, h: 30 },
  { alt: 'DS Smith', w: 59, h: 40 },
  { alt: 'Holmen', w: 170, h: 26, blendDifference: true },
]

const REFERENCES: ReferenceItem[] = [
  {
    title: 'Food Processing Plant',
    scope: 'Installation and piping works',
    href: '#',
  },
  {
    title: 'Industrial Manufacturing Line',
    scope: 'Upgrade execution in live industrial environment',
    href: '#',
  },
  {
    title: 'Energy Infrastructure Project',
    scope: 'Renovation and retrofit works',
    href: '#',
  },
  {
    title: 'Energy Infrastructure',
    scope: 'Renovation and retrofit works',
    href: '#',
  },
  {
    title: 'Food Processing Plant',
    scope: 'Site coordination',
    href: '#',
  },
  {
    title: 'Utility Systems',
    scope: 'Mechanical scope',
    href: '#',
  },
  {
    title: 'Packaging Line',
    scope: 'Assembly',
    href: '#',
  },
]

const SectionLabel: FC = () => (
  <div className="flex items-center gap-3">
    <span
      aria-hidden="true"
      className="block h-1 w-8 shrink-0 rounded-full bg-[#1cc14b]"
    />
    <span className="font-mono text-[11px] font-normal uppercase tracking-[1.8px] text-[#737373]">
      Our Clients
    </span>
  </div>
)

const LogoPlaceholder: FC<{ logo: LogoItem; index: number }> = ({
  logo,
  index,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-30px 0px',
    threshold: 0.2,
  })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        'relative flex shrink-0 items-center justify-center rounded-sm border border-[#e5e5e5] bg-[#fafafa] px-4',
        logo.blendDifference ? 'mix-blend-difference' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        width: Math.max(logo.w + 32, 110),
        height: Math.max(logo.h + 28, 68),
        opacity: inView ? 1 : 0,
        transform: inView
          ? `translate3d(${hovered ? 4 : 0}px, 0, 0)`
          : 'translate3d(0, 22px, 0)',
        transition: `opacity 0.62s ${easeOut} ${index * 0.05}s, transform 0.62s ${easeOut} ${index * 0.05}s, box-shadow 0.22s ease`,
        boxShadow: hovered ? '0 0 0 1.5px rgba(28,193,75,0.55) inset' : 'none',
      }}
      aria-label={`${logo.alt} logo placeholder`}
    >
      <div className="pointer-events-none flex select-none flex-col items-center gap-1">
        <div className="h-5 w-12 rounded-full border border-[#d4d4d4]" />
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#a3a3a3]">
          {logo.alt}
        </span>
      </div>
    </div>
  )
}

const LogoStrip: FC = () => (
  <div className="scrollbar-none w-full overflow-x-auto">
    <div className="flex w-full items-center gap-10 px-4 py-2 lg:justofy-between">
      {LOGOS.map((logo, index) => (
        <LogoPlaceholder key={logo.alt} logo={logo} index={index} />
      ))}
    </div>
  </div>
)

const ReferenceRow: FC<{ item: ReferenceItem; index: number }> = ({
  item,
  index,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-48px 0px',
    threshold: 0.18,
  })
  const [hovered, setHovered] = useState(false)
  const rowDelay = index * 0.06

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
        transition: `opacity 0.62s ${easeOut} ${rowDelay}s, transform 0.62s ${easeOut} ${rowDelay}s`,
      }}
    >
      <DrawLine inView={inView} delay={rowDelay + 0.08} color="#e5e5e5" />
      <div
        className="flex items-center justify-between gap-4 py-[10px] lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)_auto] lg:gap-x-0"
        style={{
          transform: `translate3d(${hovered ? 6 : 0}px, 0, 0)`,
          transition: `transform 0.22s ${easeOut}`,
        }}
      >
        <p className="w-[240px] shrink-0 text-lg font-semibold leading-7 text-[#0a0a0a] sm:w-[340px] lg:w-auto lg:pr-8">
          {item.title}
        </p>

        <p className="truncate pr-4 text-sm font-medium leading-none text-[#737373]">
          {item.scope}
        </p>
        <a
          href={item.href}
          className="shrink-0 text-sm font-medium leading-none text-[#0a0a0a] underline decoration-solid underline-offset-2"
          style={{
            opacity: hovered ? 0.7 : 1,
            transition: 'opacity 0.22s ease',
          }}
        >
          Reference PDF
        </a>
      </div>
    </div>
  )
}

export function Clients() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-60px 0px',
    threshold: 0.2,
  })
  const { ref: libraryRef, inView: libraryInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-60px 0px',
    threshold: 0.2,
  })
  const { ref: footerRef, inView: footerInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-40px 0px',
    threshold: 0.2,
  })

  return (
    <section
      id="projects"
      data-nav-section
      className="w-full overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        <div
          ref={headerRef}
          className="relative"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 34px, 0)',
            transition: `opacity 0.88s ${easeOut}, transform 0.88s ${easeOut}`,
          }}
        >
          <div className="mb-3 lg:absolute lg:left-[calc(50%+20px)] lg:-top-8">
            <SectionLabel />
          </div>

          <div className="lg:pl-[calc(50%+20px)]">
            <h2 className="text-[clamp(36px,5.5vw,60px)] font-medium leading-[1.05] tracking-[-0.02em] text-[#0a0a0a]">
              Companies that trust us
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-14">
        <div className="mx-auto w-full max-w-[1440px]">
          <LogoStrip />
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1440px] px-4 sm:px-8 lg:mt-14">
        <div
          ref={libraryRef}
          className="flex justify-center lg:justify-start lg:pl-[calc(50%+20px)]"
          style={{
            opacity: libraryInView ? 1 : 0,
            transform: libraryInView
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 34px, 0)',
            transition: `opacity 0.88s ${easeOut}, transform 0.88s ${easeOut}`,
          }}
        >
          <h3 className="mb-6 text-3xl font-semibold leading-9 text-[#0a0a0a]">
            Reference Library
          </h3>
        </div>

        <div className="w-full">
          {REFERENCES.map((ref, index) => (
            <ReferenceRow key={`${ref.title}-${index}`} item={ref} index={index} />
          ))}
          <div className="relative">
            <DrawLine inView delay={REFERENCES.length * 0.06 + 0.08} color="#e5e5e5" />
            <div className="h-px w-full opacity-0" role="separator" />
          </div>
        </div>

        <div
          ref={footerRef}
          className="mt-10 flex flex-col gap-2 lg:pl-[calc(50%+20px)]"
          style={{
            opacity: footerInView ? 1 : 0,
            transform: footerInView
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 18px, 0)',
            transition: `opacity 0.6s ${easeOut} 0.08s, transform 0.6s ${easeOut} 0.08s`,
          }}
        >
          <p className="text-sm font-semibold leading-none text-[#0a0a0a]">
            Trusted across sectors
          </p>
          <p className="text-sm font-medium leading-none text-[#737373]">
            25+ References
          </p>
        </div>
      </div>
    </section>
  )
}

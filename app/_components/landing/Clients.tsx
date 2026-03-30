'use client'

import Image from 'next/image'
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
  src: string
  w: number
  h: number
  blendDifference?: boolean
  forceBlack?: boolean
}

interface ReferenceItem {
  title: string
  scope: string
  href: string
}

const LOGOS: LogoItem[] = [
  { alt: "Kellogg's", src: '/kellogg-logo-black.png.svg', w: 119, h: 40 },
  { alt: 'Steico', src: '/steico.svg', w: 82, h: 40 },
  { alt: 'Boccard', src: '/boccard.svg', w: 172, h: 40 },
  {
    alt: 'Paname',
    src: '/logo-paname.svg',
    w: 135,
    h: 30,
    forceBlack: true,
  },
  { alt: 'TZ Polfa', src: '/tzf_logo_dark%201.svg', w: 137, h: 30 },
  { alt: 'DS Smith', src: '/ds-logo-color.svg', w: 59, h: 40 },
  {
    alt: 'Holmen',
    src: '/Holmen%20white.svg',
    w: 170,
    h: 26,
    forceBlack: true,
  },
  { alt: 'Repsol', src: '/repsol.svg', w: 126, h: 32 },
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

const LogoPlaceholder: FC<{ logo: LogoItem }> = ({ logo }) => {
  return (
    <div
      className={[
        'relative flex h-8 flex-none items-center justify-center sm:h-10',
        logo.blendDifference ? 'mix-blend-difference' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${logo.alt} logo`}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.w}
        height={logo.h}
        className={[
          'pointer-events-none h-auto w-full select-none object-contain',
          logo.alt === 'Holmen'
            ? 'max-h-[16px] sm:max-h-full'
            : 'max-h-[32px] sm:max-h-full',
          logo.forceBlack ? 'brightness-0' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </div>
  )
}

const LogoStrip: FC = () => (
  <div className="w-full overflow-hidden px-0 sm:px-6">
    <div className="overflow-hidden sm:hidden">
      <div className="clients-logo-marquee flex w-max items-center gap-3 py-2">
        {[...LOGOS, ...LOGOS].map((logo, index) => (
          <LogoPlaceholder
            key={`${logo.alt}-${index}`}
            logo={logo}
          />
        ))}
      </div>
    </div>

    <div className="hidden w-full flex-wrap items-center justify-center gap-x-8 gap-y-8 py-2 sm:flex lg:flex-nowrap lg:gap-10">
      {LOGOS.map((logo) => (
        <LogoPlaceholder key={logo.alt} logo={logo} />
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
        className="flex items-start justify-between gap-4 py-2 lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)_auto] lg:items-center lg:gap-x-0 lg:py-[10px]"
        style={{
          transform: `translate3d(${hovered ? 6 : 0}px, 0, 0)`,
          transition: `transform 0.22s ${easeOut}`,
        }}
      >
        <div className="flex max-w-[200px] flex-col gap-2 lg:contents">
          <p className="shrink-0 text-[16px] font-semibold leading-none text-[#0a0a0a] sm:w-[340px] sm:text-lg sm:leading-7 lg:w-auto lg:pr-8">
            {item.title}
          </p>

          <p className="text-[12px] font-medium leading-none text-[#737373] sm:truncate sm:pr-4 sm:text-sm">
            {item.scope}
          </p>
        </div>
        <a
          href={item.href}
          className="shrink-0 whitespace-nowrap text-[14px] font-medium leading-5 text-[#0a0a0a] underline decoration-solid underline-offset-2 sm:text-sm sm:leading-none"
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
    <>
      <section
        id="clients"
        data-nav-section
        className="landing-mobile-gradient w-full overflow-hidden py-8 sm:py-16 lg:py-24"
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
            <div className="mb-3 pl-16 lg:absolute lg:left-[calc(50%+20px)] lg:-top-8 lg:pl-0">
              <SectionLabel />
            </div>

            <div className="flex flex-col gap-3 pl-16 lg:pl-[calc(50%+20px)]">
              <h2 className="w-full font-sans text-[32px] font-semibold leading-8 tracking-[-0.6px] text-[#0a0a0a] sm:w-auto sm:text-[clamp(36px,5.5vw,60px)] sm:font-medium sm:leading-[1.05] sm:tracking-[-0.02em]">
                Companies that trust us
              </h2>
             
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-14">
          <div className="mx-auto w-full max-w-[1440px]">
            <LogoStrip />
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1440px] px-4 sm:mt-12 sm:px-8 lg:mt-14">
          <div
            ref={libraryRef}
            className="flex justify-start lg:justify-start lg:pl-[calc(50%+20px)]"
            style={{
              opacity: libraryInView ? 1 : 0,
              transform: libraryInView
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 34px, 0)',
              transition: `opacity 0.88s ${easeOut}, transform 0.88s ${easeOut}`,
            }}
          >
            <h3 className="mb-3 text-center text-[20px] font-semibold leading-7 text-[#0a0a0a] sm:mb-6 sm:text-3xl sm:leading-9">
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
            className="mt-8 flex items-start justify-between gap-4 sm:mt-10 sm:flex-col sm:gap-2 lg:pl-[calc(50%+20px)]"
            style={{
              opacity: footerInView ? 1 : 0,
              transform: footerInView
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 18px, 0)',
              transition: `opacity 0.6s ${easeOut} 0.08s, transform 0.6s ${easeOut} 0.08s`,
            }}
          >
            <p className="text-[14px] font-medium leading-none text-[#0a0a0a] sm:text-sm sm:font-semibold">
              Trusted across sectors
            </p>
            <p className="text-[14px] font-medium leading-none text-[#737373]">
              25+ References
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .clients-logo-marquee {
          animation: clients-logo-marquee-right 24s linear infinite;
          will-change: transform;
        }

        @keyframes clients-logo-marquee-right {
          from {
            transform: translate3d(calc(-50% - 12px), 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </>
  )
}

'use client'

import type { FC } from 'react'
import Image from 'next/image'
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

interface ServiceItem {
  num: string
  title: string
  bullets: string[]
  imageSrc: string
}

const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Welding Services',
    bullets: [
      'Certified welding support',
      'On-site execution',
      'Quality control',
      'Piping & structural',
    ],
    imageSrc: '/img4.webp',
  },
  {
    num: '02',
    title: 'Renovations',
    bullets: [
      'Revamp and upgrade of existing systems',
      'Mechanical dismantling',
      'System relocation',
      'Recommissioning',
    ],
    imageSrc: '/img5.webp',
  },
  {
    num: '03',
    title: 'Assembly Services',
    bullets: [
      'Precision assembly for industrial equipment',
      'Mechanical fitting',
      'Alignment & levelling',
      'Pre-commissioning checks',
    ],
    imageSrc: '/img6.webp',
  },
  {
    num: '04',
    title: 'Repair & Upgrade Service',
    bullets: [
      'On-site repairs and performance upgrades',
      'Fault diagnosis',
      'Component replacement',
      'Functional testing',
    ],
    imageSrc: '/img7.webp',
  },
  {
    num: '05',
    title: 'Energy & Infrastructure',
    bullets: [
      'Installation for energy and utility systems',
      'Electrical fit-out',
      'Utility pipework',
      'Commissioning & handover',
    ],
    imageSrc: '/img8.webp',
  },
]

const ServiceImage: FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="relative h-full w-full overflow-hidden bg-[#fafafa]">
    <Image src={src} alt={alt} fill className="object-cover" sizes="33vw" />
  </div>
)

const DrawLine: FC<{
  inView: boolean
  delay: number
  color?: string
  thickness?: number
}> = ({ inView, delay, color = '#0a0a0a', thickness = 3 }) => (
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

const ServiceRow: FC<{ service: ServiceItem; index: number }> = ({
  service,
  index,
}) => {
  const { num, title, bullets, imageSrc } = service
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>({
    once: false,
    rootMargin: '-48px 0px',
    threshold: 0.18,
  })
  const rowDelay = index * 0.06

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex min-h-[298px] w-full items-start gap-[14px] lg:grid lg:grid-cols-[285px_calc(50%-293px)_minmax(0,1fr)_29px] lg:gap-x-[14px]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
        transition: `opacity 0.62s ${easeOut} ${rowDelay}s, transform 0.62s ${easeOut} ${rowDelay}s`,
      }}
    >
      <div className="relative flex w-[180px] shrink-0 items-start pt-5 sm:w-[220px] lg:w-[285px]">
        <DrawLine inView={inView} delay={rowDelay + 0.08} />
        <h3
          className="w-full text-xl font-semibold leading-[1.33] text-[#0a0a0a] sm:text-2xl"
          style={{
            transform: `translate3d(${hovered ? 6 : 0}px, 0, 0)`,
            transition: `transform 0.22s ${easeOut}`,
          }}
        >
          {title}
        </h3>
      </div>

      <div className="relative flex w-[180px] shrink-0 flex-col pt-5 sm:w-[260px] lg:w-auto">
        <DrawLine inView={inView} delay={rowDelay + 0.13} />
        {bullets.map((bullet, i) => (
          <div
            key={bullet}
            className="relative flex w-full items-center"
            style={{
              paddingTop: i === 0 ? 0 : 10,
              paddingBottom: 10,
              transform: `translate3d(${hovered ? 4 : 0}px, 0, 0)`,
              transition: `transform 0.22s ${easeOut} ${i * 0.025}s`,
            }}
          >
            {i > 0 ? (
              <DrawLine
                inView={inView}
                delay={rowDelay + 0.17 + i * 0.04}
                color="#0a0a0a"
                thickness={1}
              />
            ) : null}
            {i === bullets.length - 1 ? (
              <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#0a0a0a',
                    transform: `scaleX(${inView ? 1 : 0})`,
                    transformOrigin: '0 50%',
                    transition: `transform 0.56s ${easeOut} ${rowDelay + 0.17 + i * 0.04}s`,
                  }}
                />
              </div>
            ) : null}
            <span className="whitespace-nowrap text-base font-medium leading-6 text-[#0a0a0a]">
              {bullet}
            </span>
          </div>
        ))}
      </div>

      <div className="relative hidden min-w-0 flex-1 self-stretch pt-5 sm:flex sm:flex-col lg:w-auto lg:flex-none">
        <DrawLine inView={inView} delay={rowDelay + 0.18} />
        <div className="relative flex-1">
          <div className="h-full w-full">
            <ServiceImage src={imageSrc} alt={title} />
          </div>
          <div
            className="pointer-events-none absolute inset-0 border-[1.5px] border-[#1cc14b]"
            style={{
              opacity: hovered ? 0.55 : 0,
              transition: 'opacity 0.22s ease',
            }}
          />
        </div>
      </div>

      <div className="relative w-[29px] shrink-0 pt-5">
        <DrawLine inView={inView} delay={rowDelay + 0.23} color="#737373" />
        <span className="text-xl font-semibold leading-none text-[#737373]">
          {num}
        </span>
      </div>
    </div>
  )
}

export function Services() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    once: false,
    rootMargin: '-60px 0px',
    threshold: 0.2,
  })

  return (
    <section id="services" data-nav-section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px] lg:py-20">
        <div
          ref={headerRef}
          className="relative mb-8 lg:mb-10"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 34px, 0)',
            transition: `opacity 0.88s ${easeOut}, transform 0.88s ${easeOut}`,
          }}
        >
          <div className="mb-3 flex items-center gap-3 lg:ml-[calc(50%+20px)] lg:-mt-1">
            <span
              aria-hidden="true"
              className="block h-1 w-8 shrink-0 rounded-full bg-[#1cc14b]"
            />
            <span className="font-mono text-[11px] font-normal uppercase tracking-[1.8px] text-[#737373]">
              End-to-end installation
            </span>
          </div>

          <div className="lg:pl-[calc(50%+20px)]">
            <h2 className="text-[clamp(44px,7vw,84px)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0a0a0a]">
              Services
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {SERVICES.map((service, index) => (
            <ServiceRow key={service.num} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

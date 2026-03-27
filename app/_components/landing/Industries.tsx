'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type FC } from 'react'

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

const IconEnergy: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <path
      d="M24.25 5.5 12 26.25h9.5l-2.5 16.75L36.5 21.5H26l2-16Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
)

const IconManufacturing: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <path
      d="M9 35.5V22.5l10-6v19"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M19 35.5V12.5l10-6v29"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M29 35.5v-14l10-6v20"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M6 35.5h36"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconOilGas: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <path
      d="M24.25 6 14.25 42h20L24.25 6Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M18.25 24.25h12M16.25 33.25h16M10.25 42h28"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconFood: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <path
      d="M24.25 44V16"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M24.25 20 14.25 14l-2 6 12 6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M24.25 20 34.25 14l2 6-12 6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="m24.25 16-6-8 6-4 6 4-6 8Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconPharma: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <rect
      x="8"
      y="8"
      width="32.5"
      height="32.5"
      rx="2"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      d="M18 24.25h12.5M24.25 18v12.5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconChemical: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <path
      d="M18 6h12.5M20 6v12l-8 16.5h24.5L28.5 18V6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M12 34.5h24.5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconAutomotive: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <path
      d="M10.25 31.25h28l-3-10h-22l-3 10Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 31.25h8M34.25 31.25h8"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M14.25 28.25h4v6h-4zM30.25 28.25h4v6h-4z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconWarehouse: FC = () => (
  <svg viewBox="0 0 48.5 48.5" fill="none" className="size-full">
    <path
      d="m8.25 16.25 16-8 16 8-16 8-16-8Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M8.25 16.25v18l16 8v-18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M40.25 16.25v18l-16 8"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

interface Industry {
  num: string
  name: string
  description: string
  icon: FC
  photoSrc: string
  photoAlt: string
}

const INDUSTRIES: Industry[] = [
  {
    num: '01',
    name: 'Energy & Infrastructure',
    description:
      'Electrical and mechanical installation for power plants, substations, and renewable energy facilities.',
    icon: IconEnergy,
    photoSrc: '/Energy and infastructure.webp',
    photoAlt: 'Energy and infrastructure installation site',
  },
  {
    num: '02',
    name: 'Manufacturing',
    description:
      'Production line commissioning, conveyor systems, and heavy machinery installation.',
    icon: IconManufacturing,
    photoSrc: '/manufacturing.webp',
    photoAlt: 'Manufacturing facility equipment and installation systems',
  },
  {
    num: '03',
    name: 'Oil & Gas',
    description:
      'Piping and equipment installation for refineries, offshore platforms, and gas processing plants.',
    icon: IconOilGas,
    photoSrc: '/Oil and gas.webp',
    photoAlt: 'Oil and gas industrial installation environment',
  },
  {
    num: '04',
    name: 'Food & Beverage',
    description:
      'Hygienic process installation and stainless steel piping for food and beverage production.',
    icon: IconFood,
    photoSrc: '/Steel pipe.webp',
    photoAlt: 'Stainless steel process piping for food and beverage production',
  },
  {
    num: '05',
    name: 'Pharma & Life Sciences',
    description:
      'Cleanroom installation, HVAC qualification, and process piping for pharma and biotech.',
    icon: IconPharma,
    photoSrc: '/Pharm.webp',
    photoAlt: 'Pharmaceutical and life sciences facility installation',
  },
  {
    num: '06',
    name: 'Chemical Industry',
    description:
      'Reactor installation and specialty piping for chemical and petrochemical facilities.',
    icon: IconChemical,
    photoSrc: '/Silo.webp',
    photoAlt: 'Chemical industry silo and process installation',
  },
  {
    num: '07',
    name: 'Automotive',
    description:
      'Assembly line installation, paint shop systems, and robotic cell integration.',
    icon: IconAutomotive,
    photoSrc: '/Automotive.webp',
    photoAlt: 'Automotive production and assembly installation',
  },
  {
    num: '08',
    name: 'Warehousing & Logistics',
    description:
      'Racking systems, automated storage installation, and conveyor networks for logistics centers.',
    icon: IconWarehouse,
    photoSrc: '/Warehouse.webp',
    photoAlt: 'Warehouse and logistics automation environment',
  },
]

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

interface RowProps {
  industry: Industry
  index: number
}

const IndustryRow: FC<RowProps> = ({ industry, index }) => {
  const { num, name, description, icon: Icon, photoSrc, photoAlt } = industry
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-48px 0px',
    threshold: 0.18,
  })
  const rowDelay = index * 0.04

  return (
    <div
      ref={ref}
      className="group flex items-start gap-3.5 pb-6 sm:gap-3.5 lg:grid lg:grid-cols-[28px_calc(50%-36px)_minmax(0,1fr)_97px] lg:gap-x-3.5"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: `opacity 0.58s ${easeOut} ${rowDelay}s, transform 0.58s ${easeOut} ${rowDelay}s`,
      }}
    >
      <div className="relative w-7 shrink-0 pt-5">
        <DrawLine inView={inView} delay={rowDelay + 0.08} color="#737373" />
        <span className="block text-xl font-semibold leading-none text-[#737373]">
          {num}
        </span>
      </div>

      <div className="relative hidden w-[220px] shrink-0 overflow-hidden pt-5 sm:block md:w-[280px] lg:w-auto">
        <DrawLine inView={inView} delay={rowDelay + 0.12} />
        <span className="block text-xl font-semibold leading-none text-[#0a0a0a]">
          {name}
        </span>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col gap-6 pt-5 lg:w-auto lg:flex-none">
        <DrawLine inView={inView} delay={rowDelay + 0.16} />
        <span className="block text-xl font-semibold leading-none text-[#0a0a0a] sm:hidden">
          {name}
        </span>

        <p className="text-base font-medium leading-[1.4] text-[#0a0a0a] sm:text-xl sm:leading-[1.4]">
          {description}
        </p>

        <div
          className="relative h-0 w-full overflow-hidden rounded-sm bg-[#e5e5e5] opacity-0 transition-all delay-0 duration-300 ease-out group-hover:delay-[500ms] group-hover:h-[200px] group-hover:opacity-100 sm:group-hover:h-[260px] lg:group-hover:h-[351px]"
        >
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 640px"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#1cc14b]" />
        </div>
      </div>

      <div className="relative shrink-0 pt-5 lg:w-[97px]">
        <DrawLine inView={inView} delay={rowDelay + 0.2} />
        <div className="flex size-[60px] items-center justify-center rounded-[4px] bg-[#fafafa] sm:size-[80px] lg:size-[97px]">
          <div className="size-6 text-[#0a0a0a] sm:size-7 lg:size-[48px]">
            <Icon />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Industries() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-60px 0px',
    threshold: 0.2,
  })
  const { ref: countRef, inView: countInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-40px 0px',
    threshold: 0.2,
  })

  return (
    <section id="industries" data-nav-section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px] lg:py-20">
        <div className="mb-10 lg:mb-12 lg:pl-[calc(50%+20px)]">
          <div
            ref={headerRef}
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 34px, 0)',
              transition: `opacity 0.88s ${easeOut}, transform 0.88s ${easeOut}`,
            }}
          >
            <h2 className="text-[clamp(44px,7vw,84px)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0a0a0a]">
              Industries
              <br />
              We Support
            </h2>
          </div>
        </div>

        <div className="flex flex-col">
          {INDUSTRIES.map((industry, index) => (
            <IndustryRow key={industry.num} industry={industry} index={index} />
          ))}
        </div>

        <div
          ref={countRef}
          className="mt-2 flex justify-end pr-0 lg:justify-start lg:pl-[calc(50%+20px)]"
          style={{
            opacity: countInView ? 1 : 0,
            transition: 'opacity 0.7s ease-out',
          }}
        >
          <p className="text-xl font-medium leading-[1.4] text-[#737373]">
            {INDUSTRIES.length.toString().padStart(2, '0')} Industries
          </p>
        </div>
      </div>
    </section>
  )
}

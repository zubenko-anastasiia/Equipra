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
  <svg viewBox="0 0 30 42" fill="none" className="size-full">
    <path
      d="M17.8382 0.844971L2.8382 22.845H12.8382L8.8382 40.845L26.8382 16.845H15.8382L17.8382 0.844971Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconManufacturing: FC = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block size-full"
  >
	<path d="M3.6881 23.4333C3.20878 21.1696 3.20878 18.8305 3.6881 16.5667C5.5381 16.7833 7.15477 16.1717 7.68143 14.8983C8.20977 13.6233 7.50143 12.0483 6.0381 10.8933C7.29983 8.95389 8.95364 7.30008 10.8931 6.03834C12.0464 7.50001 13.6231 8.21001 14.8981 7.68168C16.1731 7.15335 16.7848 5.53835 16.5664 3.68834C18.8302 3.20903 21.1693 3.20903 23.4331 3.68834C23.2164 5.53835 23.8281 7.15501 25.1014 7.68168C26.3764 8.21001 27.9514 7.50168 29.1064 6.03834C31.0459 7.30008 32.6997 8.95389 33.9614 10.8933C32.4998 12.0467 31.7898 13.6233 32.3181 14.8983C32.8464 16.1733 34.4614 16.785 36.3114 16.5667C36.7908 18.8305 36.7908 21.1696 36.3114 23.4333C34.4614 23.2167 32.8448 23.8283 32.3181 25.1017C31.7898 26.3767 32.4981 27.9517 33.9614 29.1067C32.6997 31.0461 31.0459 32.6999 29.1064 33.9617C27.9531 32.5 26.3764 31.79 25.1014 32.3183C23.8264 32.8467 23.2148 34.4617 23.4331 36.3117C21.1693 36.791 18.8302 36.791 16.5664 36.3117C16.7831 34.4617 16.1714 32.845 14.8981 32.3183C13.6231 31.79 12.0481 32.4983 10.8931 33.9617C8.95364 32.6999 7.29983 31.0461 6.0381 29.1067C7.49977 27.9533 8.20977 26.3767 7.68143 25.1017C7.1531 23.8267 5.5381 23.215 3.6881 23.4333ZM6.66643 20.35C8.49977 20.8583 10.0114 22.02 10.7614 23.8267C11.5098 25.635 11.2614 27.5267 10.3248 29.18C10.4848 29.35 10.6498 29.515 10.8198 29.675C12.4748 28.7383 14.3648 28.4917 16.1731 29.2383C17.9798 29.9883 19.1414 31.5 19.6498 33.3333C19.8831 33.34 20.1164 33.34 20.3498 33.3333C20.8581 31.5 22.0198 29.9883 23.8264 29.2383C25.6348 28.49 27.5264 28.7383 29.1798 29.675C29.3498 29.515 29.5148 29.35 29.6748 29.18C28.7381 27.525 28.4914 25.635 29.2381 23.8267C29.9881 22.02 31.4998 20.8583 33.3331 20.35C33.3398 20.1167 33.3398 19.8833 33.3331 19.65C31.4998 19.1417 29.9881 17.98 29.2381 16.1733C28.4898 14.365 28.7381 12.4733 29.6748 10.82C29.5142 10.6507 29.3491 10.4856 29.1798 10.325C27.5248 11.2617 25.6348 11.5083 23.8264 10.7617C22.0198 10.0117 20.8581 8.50001 20.3498 6.66668C20.1165 6.6605 19.8831 6.6605 19.6498 6.66668C19.1414 8.50001 17.9798 10.0117 16.1731 10.7617C14.3648 11.51 12.4731 11.2617 10.8198 10.325C10.6498 10.485 10.4848 10.65 10.3248 10.82C11.2614 12.475 11.5081 14.365 10.7614 16.1733C10.0114 17.98 8.49977 19.1417 6.66643 19.65C6.65977 19.8833 6.65977 20.1167 6.66643 20.35ZM19.9998 25C18.6737 25 17.4019 24.4732 16.4642 23.5355C15.5266 22.5979 14.9998 21.3261 14.9998 20C14.9998 18.6739 15.5266 17.4022 16.4642 16.4645C17.4019 15.5268 18.6737 15 19.9998 15C21.3259 15 22.5976 15.5268 23.5353 16.4645C24.473 17.4022 24.9998 18.6739 24.9998 20C24.9998 21.3261 24.473 22.5979 23.5353 23.5355C22.5976 24.4732 21.3259 25 19.9998 25ZM19.9998 21.6667C20.4418 21.6667 20.8657 21.4911 21.1783 21.1785C21.4908 20.866 21.6664 20.442 21.6664 20C21.6664 19.558 21.4908 19.1341 21.1783 18.8215C20.8657 18.5089 20.4418 18.3333 19.9998 18.3333C19.5577 18.3333 19.1338 18.5089 18.8213 18.8215C18.5087 19.1341 18.3331 19.558 18.3331 20C18.3331 20.442 18.5087 20.866 18.8213 21.1785C19.1338 21.4911 19.5577 21.6667 19.9998 21.6667Z" fill="currentColor"/>
</svg>
)

const IconOilGas: FC = () => (
  <svg viewBox="0 0 49 49" fill="none" className="size-full">
    <path
      d="M24 6L14 42H34L24 6Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M18 24H30"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M16 33H32"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M10 42H38"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconFood: FC = () => (
  <svg viewBox="0 0 49 49" fill="none" className="size-full">
    <path
      d="M24 44V16"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M24 20L14 14L12 20L24 26"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M24 20L34 14L36 20L24 26"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M24 28L14 22L12 28L24 34"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M24 28L34 22L36 28L24 34"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M24 16L18 8L24 4L30 8L24 16Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconPharma: FC = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block size-full"
  >
	<path d="M6.305 4.71008L20 1.66675L33.695 4.71008C34.0651 4.79235 34.3961 4.99836 34.6333 5.29409C34.8706 5.58982 34.9999 5.95761 35 6.33675V22.9817C34.9999 24.628 34.5933 26.2487 33.8165 27.7001C33.0396 29.1515 31.9164 30.3886 30.5467 31.3017L20 38.3334L9.45333 31.3017C8.08379 30.3888 6.96077 29.1519 6.18391 27.7008C5.40706 26.2498 5.00039 24.6294 5 22.9834V6.33675C5.00007 5.95761 5.1294 5.58982 5.36665 5.29409C5.6039 4.99836 5.93489 4.79235 6.305 4.71008ZM8.33333 7.67342V22.9817C8.33335 24.0792 8.60429 25.1596 9.1221 26.1272C9.63991 27.0948 10.3886 27.9196 11.3017 28.5284L20 34.3284L28.6983 28.5284C29.6112 27.9198 30.3597 27.0952 30.8775 26.128C31.3953 25.1607 31.6664 24.0806 31.6667 22.9834V7.67342L20 5.08341L8.33333 7.67342ZM18.3333 16.6667V11.6667H21.6667V16.6667H26.6667V20.0001H21.6667V25.0001H18.3333V20.0001H13.3333V16.6667H18.3333Z" fill="currentColor"/>
</svg>
)

const IconChemical: FC = () => (
  <svg viewBox="0 0 49 49" fill="none" className="size-full">
    <path
      d="M18 6V18L8 38V42H40V38L30 18V6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M16 6H32"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M12 34H36"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconAutomotive: FC = () => (
  <svg viewBox="0 0 49 49" fill="none" className="size-full">
    <path
      d="M4 32V22H12L18 12H36L42 22H44V32"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M4 32H14"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M22 32H34"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M42 32H44"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M14 29H18V35H14V29Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M34 29H38V35H34V29Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path
      d="M28 14V22"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </svg>
)

const IconWarehouse: FC = () => (
  <svg viewBox="0 0 18 20" fill="none" className="size-full">
    <path
      d="M17 5.5L9 1L1 5.5M17 5.5V14.5L9 19M17 5.5L9 10M9 19L1 14.5V5.5M9 19V10M1 5.5L9 10"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
    photoSrc: '/Brewery.webp',
    photoAlt: 'Stainless steel process piping for food and beverage production',
  },
  {
    num: '05',
    name: 'Pharma & Life Sciences',
    description:
      'Cleanroom installation, HVAC qualification, and process piping for pharma and biotech.',
    icon: IconPharma,
    photoSrc: '/Pharm1.webp',
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

const SectionLabel: FC = () => (
  <div className="flex items-center gap-3 pl-16 sm:pl-0">
    <span
      aria-hidden="true"
      className="block h-1 w-8 shrink-0 rounded-full bg-[#1cc14b]"
    />
    <span className="font-mono text-[0.6875rem] font-normal uppercase tracking-[1.8px] text-[#737373]">
      We work across regulate
    </span>
  </div>
)

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
      className="group flex items-start gap-0 pb-3 sm:gap-3.5 sm:pb-6 lg:grid lg:grid-cols-[28px_calc(50%-36px)_minmax(0,1fr)_97px] lg:gap-x-3.5"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: `opacity 0.58s ${easeOut} ${rowDelay}s, transform 0.58s ${easeOut} ${rowDelay}s`,
      }}
    >
      <div className="relative flex w-16 shrink-0 items-start pt-6 sm:w-7 sm:pt-5">
        <div className="hidden sm:block">
          <DrawLine inView={inView} delay={rowDelay + 0.08} color="#737373" />
        </div>
        <span
          className="block text-xl font-semibold text-[#737373]"
          style={{
            lineHeight: 1.05,
            paddingBottom: '0.08em',
          }}
        >
          {num}
        </span>
      </div>

      <div
        className="relative hidden w-[220px] shrink-0 overflow-hidden pt-5 sm:block md:w-[280px] lg:w-auto"
        style={{
          paddingBottom: '0.16em',
          marginBottom: '-0.16em',
        }}
      >
        <DrawLine inView={inView} delay={rowDelay + 0.12} />
        <span
          className="block text-xl font-semibold text-[#0a0a0a]"
          style={{
            lineHeight: 1.1,
          }}
        >
          {name}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start sm:hidden">
        <div className="flex w-full flex-col gap-3">
          <div className="pt-5">
            <p
              className="text-lg font-semibold leading-7 text-[#0a0a0a]"
              style={{ paddingBottom: '0.06em' }}
            >
              {name}
            </p>
          </div>
          <div className="w-full border-t-[3px] border-black pt-5">
            <p className="pb-2.5 text-sm font-medium leading-5 text-[#0a0a0a]">
              {description}
            </p>
          </div>
        </div>
        <div className="w-full pt-3">
          <div className="relative h-[145px] w-full bg-zinc-50">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              className="object-cover mix-blend-darken"
              sizes="264px"
            />
          </div>
        </div>
      </div>

      <div className="relative hidden min-w-0 flex-1 flex-col gap-6 pt-5 sm:flex lg:w-auto lg:flex-none">
        <DrawLine inView={inView} delay={rowDelay + 0.16} />

        <p className="text-base font-medium leading-[1.4] text-[#0a0a0a] sm:text-xl sm:leading-[1.4]">
          {description}
        </p>

        <div
          className="relative h-0 w-full overflow-hidden rounded-sm bg-[#e5e5e5] opacity-0 transition-all duration-300 ease-out group-hover:h-[200px] group-hover:opacity-100 sm:group-hover:h-[260px] lg:group-hover:h-[351px]"
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

      <div className="relative hidden shrink-0 pt-5 sm:block lg:w-[6.0625rem]">
        <DrawLine inView={inView} delay={rowDelay + 0.2} />
        <div className="flex size-[3.75rem] items-center justify-center rounded-[4px] bg-[#fafafa] sm:size-[5rem] lg:size-[6.0625rem]">
          <div className="size-6 text-[#0a0a0a] sm:size-7 lg:size-[3rem]">
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
    <section
      id="industries"
      data-nav-section
      className="landing-mobile-gradient w-full"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-8 sm:py-16 md:px-[3.75rem] lg:py-20">
        <div className="mb-8 sm:mb-10 lg:mb-12 lg:pl-[calc(50%+20px)]">
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
            <div className="mb-5">
              <SectionLabel />
            </div>
            <h2 className="pl-16 font-sans text-[2rem] font-semibold leading-8 tracking-[-0.04rem] text-[#0a0a0a] sm:pl-0 sm:text-[clamp(2.75rem,7vw,5.25rem)] sm:leading-[1.14] sm:tracking-[-0.02em]">
              Industries
              <br  />
              We Support
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-0">
          {INDUSTRIES.map((industry, index) => (
            <IndustryRow key={industry.num} industry={industry} index={index} />
          ))}
        </div>

        <div
          ref={countRef}
          className="mt-2 hidden justify-end pr-0 lg:flex lg:justify-start lg:pl-[calc(50%+20px)]"
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

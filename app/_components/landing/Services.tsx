import type { FC } from 'react'
import Image from 'next/image'

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

const ServiceRow: FC<{ service: ServiceItem }> = ({ service }) => {
  const { num, title, bullets, imageSrc } = service

  return (
    <div className="flex min-h-[298px] w-full items-start gap-[14px] lg:grid lg:grid-cols-[285px_calc(50%-293px)_minmax(0,1fr)_29px] lg:gap-x-[14px]">
      <div className="flex w-[180px] shrink-0 items-start border-t-[3px] border-t-black pt-5 sm:w-[220px] lg:w-[285px]">
        <h3 className="w-full text-xl font-semibold leading-[1.33] text-[#0a0a0a] sm:text-2xl">
          {title}
        </h3>
      </div>

      <div className="flex w-[180px] shrink-0 flex-col border-t-[3px] border-t-black pt-5 sm:w-[260px] lg:w-auto">
        {bullets.map((bullet, i) => (
          <div
            key={bullet}
            className={[
              'flex w-full items-center',
              i === 0
                ? 'pb-[10px]'
                : i === bullets.length - 1
                  ? 'border-t border-b border-[#0a0a0a] py-[10px]'
                  : 'border-t border-[#0a0a0a] py-[10px]',
            ].join(' ')}
          >
            <span className="whitespace-nowrap text-base font-medium leading-6 text-[#0a0a0a]">
              {bullet}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden min-w-0 flex-1 self-stretch border-t-[3px] border-t-black pt-5 sm:flex sm:flex-col lg:w-auto lg:flex-none">
        <div className="relative flex-1">
          <ServiceImage src={imageSrc} alt={title} />
        </div>
      </div>

      <div className="w-[29px] shrink-0 border-t-[3px] border-t-[#737373] pt-5">
        <span className="text-xl font-semibold leading-none text-[#737373]">
          {num}
        </span>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px] lg:py-20">
        <div className="relative mb-8 lg:mb-10">
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
          {SERVICES.map((service) => (
            <ServiceRow key={service.num} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

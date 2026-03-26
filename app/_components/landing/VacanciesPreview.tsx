import type { FC } from 'react'
import Image from 'next/image'

interface VacancyCard {
  department: string
  title: string
  href: string
}

const VACANCIES: VacancyCard[] = [
  {
    department: 'SITE EXECUTION',
    title: 'Mechanical Fitter',
    href: '#',
  },
  {
    department: 'PROJECT DELIVERY',
    title: 'Site Supervisor',
    href: '#',
  },
  {
    department: 'WELDING OPERATIONS',
    title: 'Certified Welder',
    href: '#',
  },
  {
    department: 'WELDING OPERATIONS',
    title: 'Certified Welder',
    href: '#',
  },
  {
    department: 'WELDING OPERATIONS',
    title: 'Certified Welder',
    href: '#',
  },
  {
    department: 'WELDING OPERATIONS',
    title: 'Certified Welder',
    href: '#',
  },
]

const ArrowIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="size-[22px] shrink-0 text-[#0a0a0a]"
    aria-hidden="true"
  >
    <path
      d="M7 17 17 7M9 7h8v8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const RoleCard: FC<VacancyCard> = ({ department, title, href }) => (
  <a
    href={href}
    className="group relative flex h-[355px] min-w-[220px] flex-1 flex-col justify-between overflow-hidden bg-[#fafafa] p-3 transition-colors hover:bg-[#f0f0f0] lg:min-w-0"
  >
    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <Image
        src="/img9.webp"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 640px) 260px, 20vw"
      />
      <div className="absolute inset-0 bg-black/5" />
    </div>

    <div className="relative z-10 flex w-full justify-end text-[#0a0a0a] transition-colors duration-300 ">
      <ArrowIcon />
    </div>

    <div className="relative z-10 flex flex-col gap-[14px]">
      <span className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373] transition-colors duration-300 ">
        {department}
      </span>
      <span className="text-[clamp(22px,2.5vw,30px)] font-semibold leading-none text-[#0a0a0a] transition-colors duration-300 ">
        {title}
      </span>
    </div>
  </a>
)

const HowToApply: FC = () => (
  <div className="flex flex-col gap-1">
    <div className="pt-[14px]">
      <h3 className="text-2xl font-semibold leading-8 text-[#0a0a0a]">
        Don&apos;t see your role listed?
      </h3>
    </div>

    <div className="mt-1 flex flex-col gap-6">
      <p className="text-base font-normal leading-6 text-[#0a0a0a]">
        Send your CV and a short description of your most relevant project (1-2
        paragraphs) to
      </p>

      <div className="flex items-center gap-[9px]">
        <a
          href="mailto:office@equipra.eu"
          className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-[2px] bg-[#171717] px-[10px] py-2 text-sm font-medium leading-5 text-[#fafafa] transition-opacity hover:opacity-80"
        >
          Apply here
        </a>

        <div className="h-[18px] w-px bg-[#e5e5e5]" aria-hidden="true" />

        <span className="whitespace-nowrap text-sm font-normal leading-none text-[#0a0a0a]">
          office@equipra.eu
        </span>
      </div>
    </div>
  </div>
)

export function VacanciesPreview() {
  return (
    <section className="w-full overflow-hidden bg-white py-16 lg:py-20">
      <div className="relative mx-auto mb-8 w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="mb-3 lg:absolute lg:left-[calc(50%+20px)] lg:-top-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="block h-1 w-8 shrink-0 rounded-full bg-[#1cc14b]"
            />
            <span className="font-mono text-[11px] font-normal uppercase tracking-[1.8px] text-[#737373]">
              We are growing across industrial projects
            </span>
          </div>
        </div>

        <div className="lg:pl-[calc(50%+20px)]">
          <h2 className="text-[clamp(48px,7vw,84px)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0a0a0a]">
            Vacancies
          </h2>
        </div>
      </div>

      <div className="mx-auto mb-8 w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px] lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)] lg:gap-x-0">
        <div className="flex w-[187px] shrink-0 flex-col items-end gap-7 lg:pr-8">
          <div className="flex w-full flex-col items-end gap-2 text-right">
            <span className="text-lg font-semibold leading-none text-[#0a0a0a]">
              Open Roles
            </span>
            <span className="text-lg font-semibold leading-none text-[#737373]">
              Industrial Installation
            </span>
          </div>

          <div className="flex size-12 items-center justify-center rounded-[6px] bg-[#f5f5f5]">
            <span className="text-center text-base font-medium leading-none text-[#737373]">
              32+
            </span>
          </div>
        </div>

        <div className="mt-8 max-w-[640px] flex-1 lg:mt-0">
          <p className="text-2xl font-semibold leading-8">
            <span className="text-[#737373]">
              We are building teams for installation, welding, assembly, and
              commissioning
            </span>
            <span className="text-[#0a0a0a]">
              {' '}
              projects across Europe. At Equipra, you work in structured
              industrial environments where safety,
            </span>
            <span className="text-[#737373]">
              {' '}
              precision, and accountability matter from
            </span>
            <span className="text-[#0a0a0a]"> mobilisation to handover.</span>
          </p>
        </div>
      </div>

      <div className="mx-auto mb-8 w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="scrollbar-none flex gap-[14px] overflow-x-auto pb-2">
          {VACANCIES.map((vacancy, i) => (
            <RoleCard key={`${vacancy.title}-${i}`} {...vacancy} />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="lg:pl-[calc(50%+20px)]">
          <div className="max-w-[640px]">
            <HowToApply />
          </div>
        </div>
      </div>
    </section>
  )
}

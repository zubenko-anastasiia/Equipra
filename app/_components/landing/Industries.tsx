import type { FC } from 'react'

const IconEnergy: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 2 4.5 13.5H12l-1 8.5 8.5-11.5H12L13 2z"
    />
  </svg>
)

const IconManufacturing: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <circle cx="12" cy="12" r="3" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.22-6.78-2.12 2.12M7.34 16.66l-2.12 2.12m0-14.56 2.12 2.12m9.32 9.32 2.12 2.12"
    />
  </svg>
)

const IconOilGas: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2v6m0 0-3 3m3-3 3 3M5 22h14M7 22V12a5 5 0 0 1 10 0v10"
    />
  </svg>
)

const IconFood: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2C8 2 5 6 5 10c0 3.5 2 6.5 5 7.7V22h4v-4.3c3-1.2 5-4.2 5-7.7 0-4-3-8-7-8z"
    />
  </svg>
)

const IconPharma: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path strokeLinecap="round" d="M12 7v10M7 12h10" />
  </svg>
)

const IconChemical: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3h6M10 3v6L5 18a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 18l-5-9V3"
    />
  </svg>
)

const IconAutomotive: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
    />
  </svg>
)

const IconWarehouse: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9.5 12 4l9 5.5V20H3V9.5z"
    />
    <rect x="9" y="14" width="6" height="6" />
  </svg>
)

interface Industry {
  num: string
  name: string
  description: string
  icon: FC
}

const INDUSTRIES: Industry[] = [
  {
    num: '01',
    name: 'Energy & Infrastructure',
    description:
      'Electrical and mechanical installation for power plants, substations, and renewable energy facilities.',
    icon: IconEnergy,
  },
  {
    num: '02',
    name: 'Manufacturing',
    description:
      'Production line commissioning, conveyor systems, and heavy machinery installation.',
    icon: IconManufacturing,
  },
  {
    num: '03',
    name: 'Oil & Gas',
    description:
      'Piping and equipment installation for refineries, offshore platforms, and gas processing plants.',
    icon: IconOilGas,
  },
  {
    num: '04',
    name: 'Food & Beverage',
    description:
      'Hygienic process installation and stainless steel piping for food and beverage production.',
    icon: IconFood,
  },
  {
    num: '05',
    name: 'Pharma & Life Sciences',
    description:
      'Cleanroom installation, HVAC qualification, and process piping for pharma and biotech.',
    icon: IconPharma,
  },
  {
    num: '06',
    name: 'Chemical Industry',
    description:
      'Reactor installation and specialty piping for chemical and petrochemical facilities.',
    icon: IconChemical,
  },
  {
    num: '07',
    name: 'Automotive',
    description:
      'Assembly line installation, paint shop systems, and robotic cell integration.',
    icon: IconAutomotive,
  },
  {
    num: '08',
    name: 'Warehousing & Logistics',
    description:
      'Racking systems, automated storage installation, and conveyor networks for logistics centers.',
    icon: IconWarehouse,
  },
]

interface RowProps {
  industry: Industry
}

const IndustryRow: FC<RowProps> = ({ industry }) => {
  const { num, name, description, icon: Icon } = industry

  return (
    <div className="group flex items-start gap-3.5 pb-6 sm:gap-3.5 lg:grid lg:grid-cols-[28px_calc(50%-36px)_minmax(0,1fr)_97px] lg:gap-x-3.5">
      <div className="w-7 shrink-0 border-t-[3px] border-[#737373] pt-5">
        <span className="block text-xl font-semibold leading-none text-[#737373]">
          {num}
        </span>
      </div>

      <div className="hidden w-[220px] shrink-0 border-t-[3px] border-[#0a0a0a] pt-5 sm:block md:w-[280px] lg:w-auto">
        <span className="block text-xl font-semibold leading-none text-[#0a0a0a]">
          {name}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6 border-t-[3px] border-[#0a0a0a] pt-5 lg:w-auto lg:flex-none">
        <span className="block text-xl font-semibold leading-none text-[#0a0a0a] sm:hidden">
          {name}
        </span>

        <p className="text-base font-medium leading-[1.4] text-[#0a0a0a] sm:text-xl sm:leading-[1.4]">
          {description}
        </p>

        <div
          aria-label={`${name} industry photo placeholder`}
          className="relative h-0 w-full overflow-hidden rounded-sm bg-[#e5e5e5] opacity-0 transition-all delay-0 duration-300 ease-out group-hover:delay-[500ms] group-hover:h-[200px] group-hover:opacity-100 sm:group-hover:h-[260px] lg:group-hover:h-[351px]"
        >
          <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#1cc14b]" />
          <div className="flex h-full items-center justify-center pb-2">
            <span className="text-sm font-medium text-[#a3a3a3]">
              Industry Photo
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t-[3px] border-[#0a0a0a] pt-5 lg:w-[97px]">
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
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px] lg:py-20">
        <div className="mb-10 lg:mb-12 lg:pl-[calc(50%+20px)]">
          <h2 className="text-[clamp(44px,7vw,84px)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0a0a0a]">
            Industries
            <br />
            We Support
          </h2>
        </div>

        <div className="flex flex-col">
          {INDUSTRIES.map((industry) => (
            <IndustryRow key={industry.num} industry={industry} />
          ))}
        </div>

        <div className="mt-2 flex justify-end pr-0 lg:justify-start lg:pl-[calc(50%+20px)]">
          <p className="text-xl font-medium leading-[1.4] text-[#737373]">
            {INDUSTRIES.length.toString().padStart(2, '0')} Industries
          </p>
        </div>
      </div>
    </section>
  )
}

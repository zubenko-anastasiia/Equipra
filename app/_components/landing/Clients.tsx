import type { FC } from 'react'

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

const LogoPlaceholder: FC<{ logo: LogoItem }> = ({ logo }) => (
  <div
    className={[
      'relative flex shrink-0 items-center justify-center rounded-sm border border-[#e5e5e5] bg-[#fafafa] px-4',
      logo.blendDifference ? 'mix-blend-difference' : '',
    ]
      .filter(Boolean)
      .join(' ')}
    style={{ width: Math.max(logo.w + 32, 110), height: Math.max(logo.h + 28, 68) }}
    aria-label={`${logo.alt} logo placeholder`}
  >
    <div className="pointer-events-none select-none flex flex-col items-center gap-1">
      <div className="h-5 w-12 rounded-full border border-[#d4d4d4]" />
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#a3a3a3]">
        {logo.alt}
      </span>
    </div>
  </div>
)

const LogoStrip: FC = () => (
  <div className="scrollbar-none w-full overflow-x-auto">
    <div className="flex w-full items-center gap-10 px-4 py-2 lg:justofy-between ">
      {LOGOS.map((logo) => (
        <LogoPlaceholder key={logo.alt} logo={logo} />
      ))}
    </div>
  </div>
)

const Divider: FC = () => (
  <div className="h-px w-full bg-[#e5e5e5]" role="separator" />
)

const ReferenceRow: FC<{ item: ReferenceItem }> = ({ item }) => (
  <>
    <Divider />
    <div className="flex items-center justify-between gap-4 py-[10px] lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)_auto] lg:gap-x-0">
      <p className="w-[240px] shrink-0 text-lg font-semibold leading-7 text-[#0a0a0a] sm:w-[340px] lg:w-auto lg:pr-8">
        {item.title}
      </p>

      <p className="truncate pr-4 text-sm font-medium leading-none text-[#737373]">
        {item.scope}
      </p>
      <a
        href={item.href}
        className="shrink-0 text-sm font-medium leading-none text-[#0a0a0a] underline decoration-solid underline-offset-2 transition-opacity hover:opacity-60"
      >
        Reference PDF
      </a>
    </div>
  </>
)

export function Clients() {
  return (
    <section className="w-full overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 ">
        <div className="relative">
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

      <div className="mx-auto mt-12 w-full max-w-[1440px] px-4 sm:px-8  lg:mt-14">
        <div className="flex justify-center lg:justify-start lg:pl-[calc(50%+20px)]">
          <h3 className="mb-6 text-3xl font-semibold leading-9 text-[#0a0a0a]">
            Reference Library
          </h3>
        </div>

        <div className="w-full">
          {REFERENCES.map((ref, i) => (
            <ReferenceRow key={`${ref.title}-${i}`} item={ref} />
          ))}
          <Divider />
        </div>

        <div className="mt-10 flex flex-col gap-2 lg:pl-[calc(50%+20px)]">
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

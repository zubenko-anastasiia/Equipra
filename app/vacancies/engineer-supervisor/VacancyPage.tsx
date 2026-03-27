import Link from 'next/link'
import type { ReactNode } from 'react'
import VacancyToc, { type TocItem } from './VacancyToc'

const TOC_ITEMS: TocItem[] = [
  { id: 'role-overview', label: 'Role Overview' },
  { id: 'key-responsibilities', label: 'Key Responsibilities' },
  { id: 'candidate-profile', label: 'Candidate Profile' },
  { id: 'project-delivery', label: 'Project Delivery' },
]

function ImagePlaceholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      aria-label={label}
      role="img"
      className={[
        'bg-neutral-200',
        'bg-[linear-gradient(135deg,#e5e5e5_0%,#f5f5f5_55%,#d4d4d4_100%)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

function BackButton() {
  return (
    <Link
      href="/#career"
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4" />
        <path
          d="M9 5.5L6.5 8L9 10.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </Link>
  )
}

function HiringTag() {
  return (
    <div className="flex items-center gap-3">
      <ImagePlaceholder
        label="Equipra recruitment avatar placeholder"
        className="size-9 shrink-0 overflow-hidden rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-neutral-900">
          Equipra Recruitment
        </span>
        <span className="text-xs leading-tight text-neutral-500">Open Position</span>
      </div>
    </div>
  )
}

function SectionHeading({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <h2
      id={id}
      className="mb-4 mt-10 scroll-mt-24 text-xl font-bold text-neutral-900"
    >
      {children}
    </h2>
  )
}

function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-5 border-l-2 border-neutral-300 pl-4 text-sm leading-relaxed text-neutral-600 italic">
      {children}
    </blockquote>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
          <span
            className="mt-[0.45em] size-1 shrink-0 rounded-full bg-neutral-500"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function VacancyPage() {
  return (
    <div className="flex flex-col bg-white pt-24 font-sans text-neutral-900 antialiased">
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <article className="min-w-0 flex-1 pb-24">
              <p className="mb-2 text-sm text-neutral-500">Vacancies</p>

              <h1 className="mb-4 text-4xl font-bold leading-[1.15] tracking-tight text-neutral-900 lg:text-[2.5rem]">
                Engineer Supervisor
              </h1>

              <p className="mb-6 text-sm leading-relaxed text-neutral-500">
                Equipra is looking for an Engineer Supervisor to coordinate site
                execution teams, maintain installation quality, and keep industrial
                project delivery aligned with safety, schedule, and client
                expectations.
              </p>

              <div className="mb-7">
                <HiringTag />
              </div>

              <div className="mb-8 overflow-hidden rounded-xl">
                <ImagePlaceholder
                  label="Engineer Supervisor vacancy hero placeholder"
                  className="aspect-[16/9] w-full"
                />
              </div>

              <div className="mb-8 lg:hidden">
                <VacancyToc items={TOC_ITEMS} />
              </div>

              <p className="mb-8 text-sm leading-relaxed text-neutral-700">
                This role supports Equipra&apos;s industrial installation work across
                European sites. The Engineer Supervisor will work closely with field
                crews, subcontractors, and project management to ensure execution is
                technically consistent, well documented, and ready for handover.
              </p>

              <SectionHeading id="role-overview">Role Overview</SectionHeading>
              <p className="mb-4 text-sm leading-relaxed text-neutral-700">
                The Engineer Supervisor acts as the link between project planning
                and day-to-day site execution. You will supervise installation
                progress, review work fronts, coordinate materials and manpower,
                and support issue resolution before delays affect the broader
                delivery sequence.
              </p>
              <Blockquote>
                &ldquo;We are looking for someone who combines site discipline with
                strong coordination instincts and clear technical communication
                under active project conditions.&rdquo;
              </Blockquote>

              <SectionHeading id="key-responsibilities">
                Key Responsibilities
              </SectionHeading>
              <BulletList
                items={[
                  'Supervise daily work execution across installation teams and subcontractors',
                  'Coordinate progress with project managers, planners, and client-side representatives',
                  'Monitor compliance with technical drawings, specifications, and site procedures',
                  'Support workfront readiness by tracking equipment, access, and material availability',
                  'Prepare clear progress updates, issue logs, and execution reports',
                ]}
              />

              <SectionHeading id="candidate-profile">
                Candidate Profile
              </SectionHeading>
              <p className="mb-4 text-sm leading-relaxed text-neutral-700">
                We are looking for candidates with practical supervision experience
                on industrial or infrastructure sites, especially where structured
                coordination and technical discipline are essential to project
                success.
              </p>
              <BulletList
                items={[
                  'Experience supervising mechanical, piping, or industrial installation works',
                  'Ability to read drawings and coordinate execution against technical requirements',
                  'Strong communication skills in multi-contractor site environments',
                  'Working knowledge of safety expectations and inspection routines on active projects',
                  'Availability for project-based work across European locations',
                ]}
              />

              <SectionHeading id="project-delivery">
                Project Delivery
              </SectionHeading>
              <BulletList
                items={[
                  'Structured site leadership with clear reporting lines and execution priorities',
                  'International project exposure across industrial assembly and commissioning scopes',
                  'Close collaboration with experienced delivery and operations teams',
                  'A role focused on quality, accountability, and predictable handover milestones',
                ]}
              />

              <h2 className="mb-3 mt-10 text-xl font-bold text-neutral-900">
                How to Apply
              </h2>
              <p className="mb-2 text-sm leading-relaxed text-neutral-700">
                Send your CV and a short description of your most relevant project
                supervision experience (1-2 paragraphs) to
              </p>
              <div className="mt-4 flex flex-col items-start gap-4 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                >
                  Apply here
                </button>
                <a
                  href="mailto:office@equipra.eu"
                  className="text-sm text-neutral-500 underline-offset-2 hover:underline"
                >
                  office@equipra.eu
                </a>
              </div>
            </article>

            <aside className="hidden w-52 shrink-0 lg:block">
              <div className="sticky top-8 pt-[calc(1.75rem+1.5rem+2px)]">
                <VacancyToc items={TOC_ITEMS} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

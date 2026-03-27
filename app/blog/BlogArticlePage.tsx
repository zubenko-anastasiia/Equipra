import Link from 'next/link'
import type { ReactNode } from 'react'
import BlogArticleToc, { type TocItem } from './BlogArticleToc'

const TOC_ITEMS: TocItem[] = [
  { id: 'project-overview', label: 'Project Overview' },
  { id: 'scope-of-electrical-works', label: 'Scope of Electrical Works' },
  { id: 'coordination-and-compliance', label: 'Coordination and Compliance' },
  {
    id: 'international-project-delivery',
    label: 'International Project Delivery',
  },
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
      href="/"
      scroll
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

function AuthorTag() {
  return (
    <div className="flex items-center gap-3">
      <ImagePlaceholder
        label="Equipra Team avatar placeholder"
        className="size-9 shrink-0 overflow-hidden rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-neutral-900">
          Equipra Team
        </span>
        <span className="text-xs leading-tight text-neutral-500">Company News</span>
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

export default function BlogArticlePage() {
  return (
    <div className="flex flex-col bg-white pt-24 font-sans text-neutral-900 antialiased">
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <article className="min-w-0 flex-1 pb-24">
              <p className="mb-2 text-sm text-neutral-500">Articles</p>

              <h1 className="mb-4 text-4xl font-bold leading-[1.15] tracking-tight text-neutral-900 lg:text-[2.5rem]">
                Equipra Begins Electrical Installation Works in Portugal
              </h1>

              <p className="mb-6 text-sm leading-relaxed text-neutral-500">
                Equipra has commenced electrical installation works as part of the
                Sines Industrial Complex expansion in Portugal, reinforcing its role
                in large-scale international industrial projects.
              </p>

              <div className="mb-7">
                <AuthorTag />
              </div>

              <div className="mb-8 overflow-hidden rounded-xl">
                <ImagePlaceholder
                  label="Sines Industrial Complex aerial view placeholder"
                  className="aspect-[16/9] w-full"
                />
              </div>

              <div className="mb-8 lg:hidden">
                <BlogArticleToc items={TOC_ITEMS} />
              </div>

              <p className="mb-8 text-sm leading-relaxed text-neutral-700">
                Equipra has begun electrical installation works in Portugal as a
                subcontractor within the expansion project of the Sines Industrial
                Complex, operated by Repsol. The project involves the expansion of
                production capacity at the Sines site, including the development of
                new industrial units focused on advanced polymer materials.
              </p>

              <SectionHeading id="project-overview">Project Overview</SectionHeading>
              <p className="mb-4 text-sm leading-relaxed text-neutral-700">
                This investment forms part of Repsol&apos;s broader industrial
                development program in Portugal, aimed at strengthening operational
                efficiency and technological capabilities. The project encompasses
                the development of new industrial units focused on advanced polymer
                materials at the Sines site.
              </p>
              <Blockquote>
                &ldquo;Participation in this project reflects Equipra&apos;s continued
                involvement in international industrial developments, where precision,
                execution discipline, and adherence to project timelines remain key
                priorities.&rdquo;
              </Blockquote>

              <SectionHeading id="scope-of-electrical-works">
                Scope of Electrical Works
              </SectionHeading>
              <p className="mb-4 text-sm leading-relaxed text-neutral-700">
                Within the scope of its engagement, Equipra is responsible for
                executing electrical installation works across the Sines expansion
                site.
              </p>

              <h3 className="mb-3 text-base font-semibold text-neutral-900">
                Work Scope
              </h3>
              <BulletList
                items={[
                  'Installation of cable trays and cable routing systems',
                  'Power and distribution equipment installation',
                  'Electrical system connections',
                  'Ensuring compliance with technical specifications and site safety standards',
                ]}
              />

              <SectionHeading id="coordination-and-compliance">
                Coordination and Compliance
              </SectionHeading>
              <BulletList
                items={[
                  'All works carried out in coordination with the general contractor',
                  'Collaboration with other project stakeholders',
                  'Adherence to local regulations and established safety procedures',
                  'Compliance with technical specifications and site safety standards',
                ]}
              />

              <SectionHeading id="international-project-delivery">
                International Project Delivery
              </SectionHeading>
              <BulletList
                items={[
                  'Precision and execution discipline as key priorities',
                  'Strict adherence to project timelines',
                  'Continued involvement in international industrial developments',
                  'Supporting the expansion of production capacity at major industrial sites',
                ]}
              />

              <h2 className="mb-4 mt-10 text-xl font-bold text-neutral-900">
                About the Sines Industrial Complex
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-neutral-700">
                The Sines Industrial Complex is operated by Repsol and is undergoing
                a significant expansion of production capacity. The investment forms
                part of Repsol&apos;s broader industrial development program in
                Portugal, aimed at strengthening operational efficiency and
                technological capabilities across the site.
              </p>

              <h2 className="mb-3 mt-10 text-xl font-bold text-neutral-900">
                How to Apply
              </h2>
              <p className="mb-2 text-sm leading-relaxed text-neutral-700">
                Send your CV and a short description of your most relevant project
                (1-2 paragraphs) to
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
                <BlogArticleToc items={TOC_ITEMS} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

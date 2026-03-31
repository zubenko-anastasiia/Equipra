import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import VacancyToc, { type TocItem } from './engineer-supervisor/VacancyToc'
import { type Vacancy } from './vacancyData'

function BackButton() {
  return (
    <Link
      href="/vacancies"
      scroll
      className="inline-flex items-center gap-1.5 rounded-[2px] border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
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

function HiringTag({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f5f5f5_0%,#e5e5e5_55%,#d4d4d4_100%)] text-sm font-semibold text-neutral-600">
        E
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-neutral-900">
          Equipra Recruitment
        </span>
        <span className="text-xs leading-tight text-neutral-500">{status} Position</span>
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

function EmptyArticleState() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-6 text-sm leading-6 text-neutral-600">
      <p className="font-medium text-neutral-900">Vacancy details are coming soon.</p>
      <p className="mt-2">
        This role has been listed, but its full section content has not been added
        yet.
      </p>
    </div>
  )
}

function NotFoundState() {
  return (
    <article className="min-w-0 flex-1 pb-24">
      <p className="mb-2 text-sm text-neutral-500">Vacancies</p>
      <h1 className="mb-4 text-4xl font-bold leading-[1.15] tracking-tight text-neutral-900 lg:text-[2.5rem]">
        Vacancy not found
      </h1>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-6 text-sm leading-6 text-neutral-600">
        <p className="font-medium text-neutral-900">
          We couldn&apos;t find the vacancy you were looking for.
        </p>
        <p className="mt-2">
          It may have been removed, renamed, or is not published yet.
        </p>
      </div>
    </article>
  )
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-neutral-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 space-y-2.5">{children}</ul>,
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2.5 pl-5 text-sm text-neutral-700 marker:text-neutral-500">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-sm text-neutral-700">
        <span
          className="mt-[0.45em] size-1 shrink-0 rounded-full bg-neutral-500"
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : undefined

      if (!href) {
        return <>{children}</>
      }

      const isExternal = href.startsWith('http://') || href.startsWith('https://')

      return (
        <a
          href={href}
          className="font-medium text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
          {...(isExternal ? { rel: 'noreferrer', target: '_blank' } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function VacancyArticlePage({ vacancy }: { vacancy: Vacancy | null }) {
  const tocItems: TocItem[] =
    vacancy?.sections.map((section) => ({
      id: section.id,
      label: section.label,
    })) ?? []

  return (
    <div className="flex flex-col bg-white pt-16 font-sans text-neutral-900 antialiased md:pt-24">
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {vacancy ? (
              <article className="min-w-0 flex-1 pb-24">
                <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
                  <time dateTime={vacancy.date}>{formatDate(vacancy.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{vacancy.department}</span>
                </div>

                <h1 className="mb-4 text-4xl font-bold leading-[1.15] tracking-tight text-neutral-900 lg:text-[2.5rem]">
                  {vacancy.title}
                </h1>

                {vacancy.description ? (
                  <p className="mb-6 text-sm leading-relaxed text-neutral-500">
                    {vacancy.description}
                  </p>
                ) : null}

                <div className="mb-7">
                  <HiringTag status={vacancy.status} />
                </div>

                <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={vacancy.image}
                    alt={vacancy.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {tocItems.length > 0 ? (
                  <div className="mb-8 mt-7 lg:hidden">
                    <VacancyToc items={tocItems} />
                  </div>
                ) : null}

                {vacancy.sections.length === 0 ? (
                  <EmptyArticleState />
                ) : (
                  vacancy.sections.map((section) => (
                    <section key={section.id}>
                      <SectionHeading id={section.id}>{section.heading}</SectionHeading>
                      <PortableText
                        value={section.body}
                        components={portableTextComponents}
                      />
                    </section>
                  ))
                )}

                <h2 className="mb-3 mt-10 text-xl font-bold text-neutral-900">
                  How to Apply
                </h2>
                <p className="mb-2 text-sm leading-relaxed text-neutral-700">
                  Send your CV and a short description of your most relevant project
                  experience (1-2 paragraphs) to
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
              </article>
            ) : (
              <NotFoundState />
            )}

            {vacancy && tocItems.length > 0 ? (
              <aside className="hidden w-52 shrink-0 lg:block">
                <div className="sticky top-8 pt-[calc(1.75rem+1.5rem+2px)]">
                  <VacancyToc items={tocItems} />
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { type VacancySummary } from './vacancyData'

function BackButton() {
  return (
    <Link
      href="/#career"
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function StatusBadge({ status }: { status: string }) {
  const isClosed = status.toLowerCase() === 'closed'

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        isClosed
          ? 'bg-neutral-100 text-neutral-500'
          : 'bg-[#eefaf1] text-[#177a33]',
      ].join(' ')}
    >
      {status}
    </span>
  )
}

function VacancyCard({ vacancy }: { vacancy: VacancySummary }) {
  return (
    <article className="group flex w-full flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
      <Link
        href={`/vacancies/${vacancy.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 sm:size-[200px] sm:max-w-[200px] sm:shrink-0"
        aria-label={vacancy.title}
      >
        <Image
          src={vacancy.image}
          alt={vacancy.title}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      </Link>

      <div className="flex w-full min-w-0 flex-1 flex-col gap-6 sm:justify-between sm:self-stretch">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm leading-5 text-neutral-500">
            <time dateTime={vacancy.date}>{formatDate(vacancy.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{vacancy.department}</span>
            <StatusBadge status={vacancy.status} />
          </div>

          <Link
            href={`/vacancies/${vacancy.slug}`}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <h2 className="text-base font-semibold leading-6 text-neutral-950 underline-offset-2 transition-colors group-hover:underline decoration-neutral-950">
              {vacancy.title}
            </h2>
          </Link>

          {vacancy.description ? (
            <p className="line-clamp-3 text-sm leading-5 text-neutral-500">
              {vacancy.description}
            </p>
          ) : null}
        </div>

 <footer className="flex items-center gap-4">
         
          <div className="flex items-center gap-2 whitespace-nowrap text-sm leading-5 text-neutral-500">
            <span className="font-medium text-neutral-950">Equipra Recruitment</span>
              <span aria-hidden="true">·</span>
            <span className="text-neutral-500">{vacancy.status} Position</span>
          </div>
        </footer>
       
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 text-sm leading-6 text-neutral-600">
      <p className="font-medium text-neutral-900">No vacancies published yet.</p>
      <p className="mt-2">
        New openings will appear here once they are available in Equipra&apos;s
        recruitment pipeline.
      </p>
    </div>
  )
}

export default function VacancyHubPage({ vacancies }: { vacancies: VacancySummary[] }) {
  return (
    <div className="flex flex-col bg-white pt-16 font-sans text-neutral-900 antialiased md:pt-24">
      <div className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-12">
          <div className="mb-6">
            <BackButton />
          </div>

          <section className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 flex-1">
              <div className="flex max-w-[576px] flex-col gap-5">
                <p className="text-sm font-medium leading-5 text-neutral-500">
                  Vacancies
                </p>
                <h1 className="text-[48px] font-semibold leading-[48px] tracking-[-1.2px] text-neutral-950">
                  Join Equipra
                </h1>
                <p className="text-lg leading-8 text-neutral-500">
                  Explore current roles across industrial installation, project
                  delivery, welding, and site execution.
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-10 sm:gap-8">
                {vacancies.length === 0 ? <EmptyState /> : null}
                {vacancies.map((vacancy) => (
                  <VacancyCard key={vacancy.slug} vacancy={vacancy} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

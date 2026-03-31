import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { vacancyBySlugQuery, vacanciesQuery } from '@/sanity/lib/queries'

type PortableTextBlock = {
  _key?: string
  _type: string
  [key: string]: unknown
}

type SanityVacancy = {
  _id: string
  title?: string
  slug?: string
  postedAt?: string
  status?: string
  image?: unknown
  description?: string
  sections?: Array<{
    _key?: string
    title?: string
    description?: PortableTextBlock[]
  }>
}

export interface VacancySummary {
  id: string
  slug: string
  title: string
  date: string
  status: string
  department: string
  description?: string
  image: string
}

export interface Vacancy extends VacancySummary {
  sections: Array<{
    id: string
    label: string
    heading: string
    body: PortableTextBlock[]
  }>
}

const DEFAULT_STATUS = 'open'
const DEFAULT_DATE = '1970-01-01T00:00:00.000Z'

function createPlaceholderSvg(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="vacancy-placeholder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5f5f5" />
          <stop offset="55%" stop-color="#e5e5e5" />
          <stop offset="100%" stop-color="#d4d4d4" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#vacancy-placeholder)" />
      <rect x="72" y="80" width="240" height="18" rx="9" fill="#ffffff" fill-opacity="0.7" />
      <rect x="72" y="132" width="540" height="34" rx="8" fill="#ffffff" fill-opacity="0.78" />
      <rect x="72" y="188" width="420" height="22" rx="7" fill="#ffffff" fill-opacity="0.66" />
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const VACANCY_IMAGE_PLACEHOLDER = createPlaceholderSvg(
  'Equipra vacancy placeholder image'
)

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createSectionId(title: string, usedIds: Set<string>, fallbackIndex: number) {
  const base = slugify(title) || `section-${fallbackIndex + 1}`
  let candidate = base
  let suffix = 2

  while (usedIds.has(candidate)) {
    candidate = `${base}-${suffix}`
    suffix += 1
  }

  usedIds.add(candidate)
  return candidate
}

function getStatusLabel(status?: string) {
  const value = status?.trim().toLowerCase() || DEFAULT_STATUS
  return value === 'closed' ? 'Closed' : 'Open'
}

function getDepartment(title: string) {
  const words = title
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)

  return words.length > 0 ? words.join(' ').toUpperCase() : 'OPEN ROLE'
}

function getImageUrl(source: unknown) {
  if (!source) {
    return VACANCY_IMAGE_PLACEHOLDER
  }

  try {
    return urlFor(source).width(1600).height(900).fit('crop').auto('format').url()
  } catch {
    return VACANCY_IMAGE_PLACEHOLDER
  }
}

function mapVacancy(vacancy: SanityVacancy): Vacancy | null {
  if (!vacancy._id || !vacancy.slug || !vacancy.title) {
    return null
  }

  const usedIds = new Set<string>()
  const title = vacancy.title.trim()
  const sections = (vacancy.sections ?? [])
    .filter((section) => section?.title?.trim())
    .map((section, index) => {
      const heading = section.title!.trim()

      return {
        id: createSectionId(heading, usedIds, index),
        label: heading,
        heading,
        body: section.description ?? [],
      }
    })

  return {
    id: vacancy._id,
    slug: vacancy.slug,
    title,
    date: vacancy.postedAt || DEFAULT_DATE,
    status: getStatusLabel(vacancy.status),
    department: getDepartment(title),
    description: vacancy.description?.trim() || undefined,
    image: getImageUrl(vacancy.image),
    sections,
  }
}

export async function getVacancies() {
  const vacancies = await client.fetch<SanityVacancy[]>(vacanciesQuery)

  return vacancies
    .map(mapVacancy)
    .filter((vacancy): vacancy is Vacancy => vacancy !== null)
}

export async function getVacancy(slug: string) {
  const vacancy = await client.fetch<SanityVacancy | null>(vacancyBySlugQuery, { slug })

  if (!vacancy) {
    return null
  }

  return mapVacancy(vacancy)
}

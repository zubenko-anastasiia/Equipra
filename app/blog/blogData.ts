import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'

type PortableTextBlock = {
  _key?: string
  _type: string
  [key: string]: unknown
}

type SanityBlogPost = {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  coverImage?: unknown
  publishedAt?: string
  authorName?: string
  authorRole?: string
  sections?: Array<{
    _key?: string
    title?: string
    body?: PortableTextBlock[]
  }>
}

export interface BlogPostSummary {
  id: string
  slug: string
  date: string
  category: string
  title: string
  excerpt?: string
  image: string
  author: {
    name: string
    role: string
  }
}

export interface BlogPost extends BlogPostSummary {
  sections: Array<{
    id: string
    label: string
    heading: string
    body: PortableTextBlock[]
  }>
}

const DEFAULT_AUTHOR_NAME = 'Equipra Team'
const DEFAULT_AUTHOR_ROLE = 'Company News'
const DEFAULT_DATE = '1970-01-01T00:00:00.000Z'

function createPlaceholderSvg(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="blog-placeholder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5f5f5" />
          <stop offset="55%" stop-color="#e5e5e5" />
          <stop offset="100%" stop-color="#d4d4d4" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#blog-placeholder)" />
      <rect x="72" y="80" width="190" height="18" rx="9" fill="#ffffff" fill-opacity="0.7" />
      <rect x="72" y="132" width="620" height="34" rx="8" fill="#ffffff" fill-opacity="0.75" />
      <rect x="72" y="184" width="500" height="22" rx="7" fill="#ffffff" fill-opacity="0.65" />
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const BLOG_IMAGE_PLACEHOLDER = createPlaceholderSvg(
  'Equipra blog placeholder image'
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

function getImageUrl(source: unknown) {
  if (!source) {
    return BLOG_IMAGE_PLACEHOLDER
  }

  try {
    return urlFor(source).width(1600).height(900).fit('crop').auto('format').url()
  } catch {
    return BLOG_IMAGE_PLACEHOLDER
  }
}

function mapBlogPost(post: SanityBlogPost): BlogPost | null {
  if (!post._id || !post.slug || !post.title) {
    return null
  }

  const authorName = post.authorName?.trim() || DEFAULT_AUTHOR_NAME
  const authorRole = post.authorRole?.trim() || DEFAULT_AUTHOR_ROLE
  const usedIds = new Set<string>()
  const sections = (post.sections ?? [])
    .filter((section) => section?.title?.trim())
    .map((section, index) => {
      const heading = section.title!.trim()

      return {
        id: createSectionId(heading, usedIds, index),
        label: heading,
        heading,
        body: section.body ?? [],
      }
    })

  return {
    id: post._id,
    slug: post.slug,
    date: post.publishedAt || DEFAULT_DATE,
    category: authorRole,
    title: post.title.trim(),
    excerpt: post.excerpt?.trim() || undefined,
    image: getImageUrl(post.coverImage),
    author: {
      name: authorName,
      role: authorRole,
    },
    sections,
  }
}

export async function getBlogPosts() {
  const posts = await client.fetch<SanityBlogPost[]>(postsQuery)

  return posts.map(mapBlogPost).filter((post): post is BlogPost => post !== null)
}

export async function getBlogPost(slug: string) {
  const post = await client.fetch<SanityBlogPost | null>(postBySlugQuery, { slug })

  if (!post) {
    return null
  }

  return mapBlogPost(post)
}

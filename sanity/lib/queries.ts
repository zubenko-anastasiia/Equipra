import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    authorName,
    authorRole
  }
`

export const postBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    authorName,
    authorRole,
    sections
  }
`

export const vacanciesQuery = groq`
  *[_type == "vacancy"] | order(postedAt desc) {
    _id,
    title,
    "slug": slug.current,
    postedAt,
    status,
    image,
    description
  }
`

export const vacancyBySlugQuery = groq`
  *[_type == "vacancy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    postedAt,
    status,
    image,
    description,
    sections
  }
`
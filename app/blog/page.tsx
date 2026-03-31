import type { Metadata } from 'next'
import { Footer, Header } from '../_components/landing'
import BlogHubPage from './BlogHubPage'
import { getBlogPosts } from './blogData'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Latest Equipra news, updates, partnerships, certifications, and industry insights.',
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Header activeItem="blog" />
      <main>
        <BlogHubPage posts={posts} />
      </main>
      <Footer />
    </>
  )
}

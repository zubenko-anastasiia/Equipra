import type { Metadata } from 'next'
import { Footer, Header } from '../_components/landing'
import BlogHubPage from './BlogHubPage'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Latest Equipra news, updates, partnerships, certifications, and industry insights.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      <Header activeItem="blog" />
      <main>
        <BlogHubPage />
      </main>
      <Footer />
    </>
  )
}

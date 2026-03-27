import type { Metadata } from 'next'
import { Footer, Header } from '../_components/landing'
import BlogArticlePage from './BlogArticlePage'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Example Equipra blog article covering international electrical installation works in Portugal.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogArticlePage />
      </main>
      <Footer />
    </>
  )
}

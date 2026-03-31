import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Footer, Header } from '../../_components/landing'
import BlogArticlePage from '../BlogArticlePage'
import { blogPosts, getBlogPost } from '../blogData'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostRoute(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header activeItem="blog" />
      <main>
        <BlogArticlePage post={post} />
      </main>
      <Footer />
    </>
  )
}

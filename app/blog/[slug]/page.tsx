import type { Metadata } from 'next'
import { Footer, Header } from '../../_components/landing'
import BlogArticlePage from '../BlogArticlePage'
import { getBlogPost, getBlogPosts } from '../blogData'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested Equipra blog article could not be found.',
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
  const post = await getBlogPost(slug)

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

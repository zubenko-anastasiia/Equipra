import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import BlogArticleToc, { type TocItem } from './BlogArticleToc'
import { type ArticleBlock, type BlogPost } from './blogData'

function BackButton() {
  return (
    <Link
      href="/blog"
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

function AuthorTag({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-neutral-100">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          fill
          sizes="36px"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-neutral-900">
          {post.author.name}
        </span>
        <span className="text-xs leading-tight text-neutral-500">
          {post.author.role}
        </span>
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

function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-5 border-l-2 border-neutral-300 pl-4 text-sm leading-relaxed text-neutral-600 italic">
      {children}
    </blockquote>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
          <span
            className="mt-[0.45em] size-1 shrink-0 rounded-full bg-neutral-500"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

function renderBlock(block: ArticleBlock, key: string) {
  if (block.type === 'paragraph') {
    return (
      <p key={key} className="mb-4 text-sm leading-relaxed text-neutral-700">
        {block.content}
      </p>
    )
  }

  if (block.type === 'quote') {
    return <Blockquote key={key}>{block.content}</Blockquote>
  }

  return (
    <div key={key}>
      {block.title ? (
        <h3 className="mb-3 text-base font-semibold text-neutral-900">
          {block.title}
        </h3>
      ) : null}
      <BulletList items={block.items} />
    </div>
  )
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function BlogArticlePage({ post }: { post: BlogPost }) {
  const tocItems: TocItem[] = post.sections.map((section) => ({
    id: section.id,
    label: section.label,
  }))

  return (
    <div className="flex flex-col bg-white pt-16 font-sans text-neutral-900 antialiased md:pt-24">
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <article className="min-w-0 flex-1 pb-24">
              <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.category}</span>
              </div>

              <h1 className="mb-4 text-4xl font-bold leading-[1.15] tracking-tight text-neutral-900 lg:text-[2.5rem]">
                {post.title}
              </h1>

              <p className="mb-6 text-sm leading-relaxed text-neutral-500">
                {post.excerpt}
              </p>

              <div className="mb-7">
                <AuthorTag post={post} />
              </div>

              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="mb-8 mt-7 lg:hidden">
                <BlogArticleToc items={tocItems} />
              </div>

              <p className="mb-8 text-sm leading-relaxed text-neutral-700">
                {post.intro}
              </p>

              {post.sections.map((section) => (
                <div key={section.id}>
                  <SectionHeading id={section.id}>{section.heading}</SectionHeading>
                  {section.body.map((block, index) =>
                    renderBlock(block, `${section.id}-${index}`)
                  )}
                </div>
              ))}
            </article>

            <aside className="hidden w-52 shrink-0 lg:block">
              <div className="sticky top-8 pt-[calc(1.75rem+1.5rem+2px)]">
                <BlogArticleToc items={tocItems} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

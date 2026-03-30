'use client'

import { useEffect, useState } from 'react'

export type TocItem = {
  id: string
  label: string
}

const HEADER_SELECTOR = '[data-site-header]'
const HEADER_GAP = 12

function getScrollTopForSection(id: string) {
  const element = document.getElementById(id)

  if (!element) {
    return null
  }

  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR)
  const headerOffset = header?.getBoundingClientRect().height ?? 0

  return Math.max(
    window.scrollY + element.getBoundingClientRect().top - headerOffset - HEADER_GAP,
    0
  )
}

export default function BlogArticleToc({ items }: { items: TocItem[] }) {
  const [activeSection, setActiveSection] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )

    for (const { id } of items) {
      const element = document.getElementById(id)

      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [items])

  const scrollTo = (id: string) => {
    const top = getScrollTopForSection(id)

    if (top === null) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
    window.history.replaceState(window.history.state, '', `#${id}`)
    setActiveSection(id)
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 lg:hidden">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={[
              'rounded-[2px] border px-3 py-2 text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
              activeSection === item.id
                ? 'border-neutral-300 bg-neutral-100 text-neutral-900'
                : 'border-neutral-200 text-neutral-500 hover:text-neutral-800',
            ].join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>

      <nav aria-label="On this page" className="hidden lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          On this page
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={[
                  'w-full text-left cursor-pointer text-sm transition-colors',
                  activeSection === item.id
                    ? 'font-medium text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-800',
                ].join(' ')}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

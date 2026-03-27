'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type SectionNavItem = {
  id: string
  key: string
  label: string
}

export const SECTION_NAV_ITEMS: SectionNavItem[] = [
  { id: 'about-us', key: 'about', label: 'About Us' },
  { id: 'industries', key: 'industries', label: 'Industries' },
  { id: 'services', key: 'services', label: 'Services' },
  { id: 'projects', key: 'projects', label: 'Projects' },
  { id: 'contact', key: 'contact', label: 'Contact' },
  { id: 'career', key: 'career', label: 'Career' },
]

type UseSectionNavigationOptions = {
  focusLineRatio?: number
  headerSelector?: string
  sectionIds?: string[]
}

const DEFAULT_HEADER_SELECTOR = '[data-site-header]'

function getHeaderOffset(headerSelector: string) {
  const header = document.querySelector<HTMLElement>(headerSelector)
  return header ? header.getBoundingClientRect().height : 0
}

function replaceHash(nextId: string | null) {
  const { pathname, search } = window.location
  const nextUrl = nextId ? `${pathname}${search}#${nextId}` : `${pathname}${search}`
  window.history.replaceState(window.history.state, '', nextUrl)
}

export function scrollToSectionWithOffset(
  sectionId: string,
  options?: {
    behavior?: ScrollBehavior
    extraOffset?: number
    headerSelector?: string
  }
) {
  const behavior = options?.behavior ?? 'smooth'
  const extraOffset = options?.extraOffset ?? 12
  const headerSelector = options?.headerSelector ?? DEFAULT_HEADER_SELECTOR

  if (sectionId === 'top') {
    window.scrollTo({ top: 0, behavior })
    replaceHash(null)
    return
  }

  const target = document.getElementById(sectionId)

  if (!target) {
    return
  }

  const top =
    window.scrollY +
    target.getBoundingClientRect().top -
    getHeaderOffset(headerSelector) -
    extraOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior,
  })

  replaceHash(sectionId)
}

export function useSectionNavigation(
  options?: UseSectionNavigationOptions
) {
  const focusLineRatio = options?.focusLineRatio ?? 0.36
  const headerSelector = options?.headerSelector ?? DEFAULT_HEADER_SELECTOR
  const sectionIds = useMemo(
    () => options?.sectionIds ?? SECTION_NAV_ITEMS.map((item) => item.id),
    [options?.sectionIds]
  )
  const [activeSectionId, setActiveSectionId] = useState('')
  const visibleSectionIdsRef = useRef<Set<string>>(new Set())
  const rafRef = useRef<number | null>(null)

  const evaluateActiveSection = useCallback(() => {
    const headerOffset = getHeaderOffset(headerSelector)
    const focusLine = headerOffset + (window.innerHeight - headerOffset) * focusLineRatio
    const candidates = sectionIds
      .map((id) => {
        const element = document.getElementById(id)

        if (!element) {
          return null
        }

        const rect = element.getBoundingClientRect()
        const isVisible = rect.bottom > headerOffset && rect.top < window.innerHeight

        if (!isVisible) {
          return null
        }

        const distance =
          focusLine >= rect.top && focusLine <= rect.bottom
            ? 0
            : Math.min(
                Math.abs(rect.top - focusLine),
                Math.abs(rect.bottom - focusLine)
              )

        return { distance, id }
      })
      .filter((candidate): candidate is { distance: number; id: string } => Boolean(candidate))
      .sort((left, right) => left.distance - right.distance)

    const nextActiveSectionId = candidates[0]?.id ?? ''

    setActiveSectionId((current) => {
      if (current === nextActiveSectionId) {
        return current
      }

      return nextActiveSectionId
    })
  }, [focusLineRatio, headerSelector, sectionIds])

  const queueEvaluate = useCallback(() => {
    if (rafRef.current !== null) {
      return
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      evaluateActiveSection()
    })
  }, [evaluateActiveSection])

  useEffect(() => {
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = entry.target.getAttribute('id')

          if (!sectionId) {
            continue
          }

          if (entry.isIntersecting) {
            visibleSectionIdsRef.current.add(sectionId)
          } else {
            visibleSectionIdsRef.current.delete(sectionId)
          }
        }

        queueEvaluate()
      },
      {
        root: null,
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    )

    for (const sectionElement of sectionElements) {
      observer.observe(sectionElement)
    }

    const handleScroll = () => {
      if (visibleSectionIdsRef.current.size === 0) {
        setActiveSectionId((current) => {
          if (!current) {
            return current
          }

          return ''
        })
        return
      }

      queueEvaluate()
    }

    const handleResize = () => {
      queueEvaluate()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    const initialHash = window.location.hash.replace(/^#/, '')

    if (initialHash && sectionIds.includes(initialHash)) {
      scrollToSectionWithOffset(initialHash, {
        behavior: 'auto',
        headerSelector,
      })
    }

    queueEvaluate()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [headerSelector, queueEvaluate, sectionIds])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      scrollToSectionWithOffset(sectionId, { headerSelector })
      setActiveSectionId(sectionId)
    },
    [headerSelector]
  )

  return {
    activeSectionId,
    scrollToSection,
    trackedSectionIds: sectionIds,
  }
}

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

export function useSectionNavigation(options?: UseSectionNavigationOptions) {
  const headerSelector = options?.headerSelector ?? DEFAULT_HEADER_SELECTOR
  const sectionIds = useMemo(
    () => options?.sectionIds ?? SECTION_NAV_ITEMS.map((item) => item.id),
    [options?.sectionIds]
  )
  const [activeSectionId, setActiveSectionId] = useState('')
  const pendingSectionIdRef = useRef<string | null>(null)
  const pendingSectionTimeoutRef = useRef<number | null>(null)

  const clearPendingSection = useCallback(() => {
    pendingSectionIdRef.current = null

    if (pendingSectionTimeoutRef.current !== null) {
      window.clearTimeout(pendingSectionTimeoutRef.current)
      pendingSectionTimeoutRef.current = null
    }
  }, [])

  const markPendingSection = useCallback((sectionId: string) => {
    pendingSectionIdRef.current = sectionId

    if (pendingSectionTimeoutRef.current !== null) {
      window.clearTimeout(pendingSectionTimeoutRef.current)
    }

    pendingSectionTimeoutRef.current = window.setTimeout(() => {
      pendingSectionIdRef.current = null
      pendingSectionTimeoutRef.current = null
    }, 1600)
  }, [])

  const resetActiveSection = useCallback(() => {
    clearPendingSection()

    setActiveSectionId((current) => {
      if (!current) {
        return current
      }

      replaceHash(null)
      return ''
    })
  }, [clearPendingSection])

  const isSectionInView = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId)

      if (!element) {
        return false
      }

      const headerOffset = getHeaderOffset(headerSelector)
      const rect = element.getBoundingClientRect()

      return rect.bottom > headerOffset && rect.top < window.innerHeight
    },
    [headerSelector]
  )

  useEffect(() => {
    const initialHash = window.location.hash.replace(/^#/, '')

    if (initialHash && sectionIds.includes(initialHash)) {
      setActiveSectionId(initialHash)
      scrollToSectionWithOffset(initialHash, {
        behavior: 'auto',
        headerSelector,
      })
    }
  }, [headerSelector, sectionIds])

  useEffect(() => {
    const handleViewportChange = () => {
      if (!activeSectionId || pendingSectionIdRef.current) {
        return
      }

      if (!isSectionInView(activeSectionId)) {
        resetActiveSection()
      }
    }

    window.addEventListener('scroll', handleViewportChange, { passive: true })
    window.addEventListener('resize', handleViewportChange)

    return () => {
      window.removeEventListener('scroll', handleViewportChange)
      window.removeEventListener('resize', handleViewportChange)
    }
  }, [
    activeSectionId,
    isSectionInView,
    resetActiveSection,
  ])

  useEffect(
    () => () => {
      clearPendingSection()
    },
    [clearPendingSection]
  )

  const scrollToSection = useCallback(
    (sectionId: string) => {
      markPendingSection(sectionId)
      setActiveSectionId(sectionId)
      scrollToSectionWithOffset(sectionId, { headerSelector })
    },
    [headerSelector, markPendingSection]
  )

  return {
    activeSectionId,
    resetActiveSection,
    scrollToSection,
    trackedSectionIds: sectionIds,
  }
}

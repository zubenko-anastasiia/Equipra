'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  scrollToSectionWithOffset,
  useSectionNavigation,
  type SectionNavItem,
} from './useSectionNavigation'

type HeaderProps = {
  activeItem?: string
}

type HeaderNavItem = SectionNavItem & {
  href?: string
  isRoute?: boolean
}

const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { id: 'about-us', key: 'about', label: 'About Us' },
  { id: 'industries', key: 'industries', label: 'Industries' },
  { id: 'services', key: 'services', label: 'Services' },
  { id: 'projects', key: 'projects', label: 'Projects' },
  { id: 'career', key: 'career', label: 'Career' },
  { id: 'contact', key: 'contact', label: 'Contact' },
    { id: 'blog', key: 'blog', label: 'Blog', href: '/blog', isRoute: true },

]

function LogoMark() {
  return (
    <Image
      src="/equipra-logo.svg"
      alt="Equipra"
      width={58}
      height={36}
      className="h-9 w-auto shrink-0"
      priority
    />
  )
}

function DesktopNavButton({
  item,
  isActive,
  hasActiveItem,
  onClick,
}: {
  item: SectionNavItem
  isActive: boolean
  hasActiveItem: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const allowHoverState = !hasActiveItem || isActive
  const showUnderline = isActive || (allowHoverState && hovered)

  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium tracking-[-0.01em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.97]"
      style={{
        color:
          isActive
            ? '#22c55e'
            : allowHoverState && hovered
              ? '#0a0a0a'
              : 'rgba(9, 9, 11, 0.7)',
      }}
    >
      <span>{item.label}</span>
      <span className="absolute inset-x-3 bottom-1 h-0.5 overflow-hidden rounded-full">
        <span
          className="block h-full w-full rounded-full bg-green-500"
          style={{
            transform: showUnderline
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(-102%, 0, 0)',
            transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </span>
    </button>
  )
}

function MobileNavButton({
  item,
  isActive,
  onClick,
}: {
  item: SectionNavItem
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.98] ${
        isActive ? 'text-green-500' : 'text-zinc-950/70 hover:text-black'
      }`}
      onClick={onClick}
    >
      <span>{item.label}</span>
      <span
        className={`h-2 w-2 rounded-full transition-colors duration-200 ${
          isActive ? 'bg-green-500' : 'bg-zinc-300'
        }`}
      />
    </button>
  )
}

export function Header({ activeItem }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'
  const isBlogPage = pathname === '/blog' || pathname.startsWith('/blog/')
  const initialItem = HEADER_NAV_ITEMS.find((item) => item.key === activeItem)
  const { activeSectionId, resetActiveSection, scrollToSection } = useSectionNavigation({
    sectionIds: isHomePage
      ? HEADER_NAV_ITEMS.filter((item) => !item.isRoute).map((item) => item.id)
      : [],
  })
  const currentSectionId = isBlogPage
    ? 'blog'
    : isHomePage
      ? activeSectionId || initialItem?.id || ''
      : ''
  const hasActiveItem = Boolean(currentSectionId)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleHomeNavigation = () => {
    if (isHomePage) {
      resetActiveSection()
      scrollToSectionWithOffset('top')
      return
    }

    router.push('/')
  }

  const handleNavigation = (item: HeaderNavItem) => {
    if (item.isRoute && item.href) {
      if (typeof window !== 'undefined' && window.location.hash) {
        window.history.replaceState(
          window.history.state,
          '',
          `${window.location.pathname}${window.location.search}`
        )
      }

      router.push(item.href)
      return
    }

    const sectionId = item.id

    if (isHomePage) {
      scrollToSection(sectionId)
      return
    }

    window.location.assign(`/#${sectionId}`)
  }

  return (
    <header
      data-site-header
      className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center gap-3 px-4 sm:px-8 md:px-[60px]">
        <button
          type="button"
          className="group flex shrink-0 items-center rounded-md py-3 pr-2 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.98]"
          aria-label="Equipra home"
          onClick={handleHomeNavigation}
        >
          <LogoMark />
        </button>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
        >
          <ul className="flex flex-wrap items-center justify-center gap-1 xl:gap-1.5">
            {HEADER_NAV_ITEMS.map((item) => {
              const isActive = item.id === currentSectionId

              return (
                <li key={item.key}>
                  <DesktopNavButton
                    item={item}
                    isActive={isActive}
                    hasActiveItem={hasActiveItem}
                    onClick={() => handleNavigation(item)}
                  />
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center lg:flex">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1 rounded-sm px-2.5 py-1 font-mono text-xs font-medium tracking-[0.24em] text-gray-600 transition-all duration-200 hover:bg-zinc-950/[0.04] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.97]"
            aria-label="Selected language English"
          >
            <span>EN</span>
            <span className="opacity-40">|</span>
            <span className="opacity-50">PL</span>
          </button>
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="ml-auto inline-flex cursor-pointer items-center justify-center rounded-md border border-black/10 p-2 text-zinc-950 transition-all duration-200 hover:bg-zinc-950/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-95 lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-5 w-5 flex-col items-center justify-center gap-1">
            <span
              className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                isMenuOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-black/5 bg-white/95 transition-[max-height,opacity] duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          aria-label="Mobile primary"
          className="mx-auto w-full max-w-[1440px] px-4 py-3 sm:px-8 md:px-[60px]"
        >
          <ul className="space-y-1">
            {HEADER_NAV_ITEMS.map((item) => {
              const isActive = item.id === currentSectionId

              return (
                <li key={item.key}>
                  <MobileNavButton
                    item={item}
                    isActive={isActive}
                    onClick={() => {
                      handleNavigation(item)
                      setIsMenuOpen(false)
                    }}
                  />
                </li>
              )
            })}
          </ul>

          <div className="mt-3 border-t border-black/5 pt-3">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1 rounded-md px-4 py-2 font-mono text-xs font-medium tracking-[0.24em] text-gray-600 transition-all duration-200 hover:bg-zinc-950/[0.04] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.97]"
              aria-label="Selected language English"
            >
              <span>EN</span>
              <span className="opacity-40">|</span>
              <span className="opacity-50">PL</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

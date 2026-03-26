'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type NavItem = {
  label: string
  href: string
  key: string
}

const navItems: NavItem[] = [
  { label: 'About Us', href: '#about-us', key: 'about' },
  { label: 'Industries', href: '#industries', key: 'industries' },
  { label: 'Services', href: '#services', key: 'services' },
  { label: 'Projects', href: '#projects', key: 'projects' },
  { label: 'Contact', href: '#contact', key: 'contact' },
  { label: 'Career', href: '#career', key: 'career' },
  { label: 'Blog', href: '#blog', key: 'blog' },
]

type HeaderProps = {
  activeItem?: string
}

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

export function Header({ activeItem = 'industries' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center gap-3 px-4 sm:px-8 md:px-[60px]">
        <Link
          href="#top"
          className="group flex shrink-0 items-center rounded-md py-3 pr-2 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.98]"
          aria-label="Equipra home"
        >
          <LogoMark />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
        >
          <ul className="flex flex-wrap items-center justify-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = item.key === activeItem

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium tracking-[-0.01em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.97] ${
                      isActive
                        ? 'text-black'
                        : 'text-zinc-950/70 hover:bg-zinc-950/[0.04] hover:text-black'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-green-500 transition-all duration-200 ${
                        isActive
                          ? 'scale-100 opacity-100'
                          : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
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
            {navItems.map((item) => {
              const isActive = item.key === activeItem

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-500 active:scale-[0.98] ${
                      isActive
                        ? 'bg-green-500/10 text-black'
                        : 'text-zinc-950/70 hover:bg-zinc-950/[0.04] hover:text-black'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                        isActive ? 'bg-green-500' : 'bg-zinc-300'
                      }`}
                    />
                  </Link>
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

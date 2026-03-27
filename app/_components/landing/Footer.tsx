'use client'

import type {
  FC,
  FormEvent,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'

const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'

type FieldState = 'idle' | 'focused' | 'filled' | 'error' | 'success'

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
]

const NAV_LINKS = [
  { label: 'About Us', href: '#about-us' },
  { label: 'Industries', href: '#industries' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Career', href: '#career' },
  { label: 'Blog', href: '/blog' },
]

const CERTIFICATIONS = ['ISO 14001', 'ISO 45001', 'ISO 9001', 'SCC']

const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean }
) => {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return
        }

        if (entry.isIntersecting) {
          setInView(true)

          if (options?.once !== false) {
            observer.unobserve(node)
          }

          return
        }

        if (options?.once === false) {
          setInView(false)
        }
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '-40px 0px',
        threshold: options?.threshold ?? 0.15,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [options?.once, options?.root, options?.rootMargin, options?.threshold])

  return { ref, inView }
}

const MonoLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
    {children}
  </span>
)

const AnimatedLink: FC<{
  href: string
  children: ReactNode
}> = ({ href, children }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block text-sm font-normal leading-5 text-[#0a0a0a] no-underline"
      style={{
        color: hovered ? '#1cc14b' : '#0a0a0a',
        transform: `translate3d(${hovered ? 3 : 0}px, 0, 0)`,
        transition: `transform 0.18s ${easeOut}, color 0.18s ease`,
      }}
    >
      {children}
    </Link>
  )
}

const FloatingInput: FC<{
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  delay?: number
}> = ({ label, type = 'text', placeholder, required, delay = 0 }) => {
  const id = useId()
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-20px 0px',
    threshold: 0.2,
  })
  const [state, setState] = useState<FieldState>('idle')
  const [value, setValue] = useState('')
  const [shakeKey, setShakeKey] = useState(0)

  const isFocused = state === 'focused'
  const hasValue = value.length > 0
  const labelUp = isFocused || hasValue

  const validate = () => {
    if (required && !value.trim()) {
      setState('error')
      setShakeKey((current) => current + 1)
      return
    }

    setState(value ? 'filled' : 'idle')
  }

  const borderColor =
    state === 'error'
      ? '#d4183d'
      : isFocused
        ? '#1cc14b'
        : state === 'filled'
          ? '#0a0a0a'
          : 'rgba(15,23,42,0.12)'

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: `opacity 0.6s ${easeOut} ${delay}s, transform 0.6s ${easeOut} ${delay}s`,
      }}
    >
      <div className="relative" style={{ height: 52 }}>
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-0 top-0 z-[1] font-mono font-normal uppercase tracking-[1.8px]"
          style={{
            fontSize: labelUp ? 11 : 14,
            transform: `translate3d(0, ${labelUp ? 0 : 14}px, 0)`,
            color:
              state === 'error'
                ? '#d4183d'
                : isFocused
                  ? '#1cc14b'
                  : '#737373',
            transition: `transform 0.2s ${easeOut}, font-size 0.2s ${easeOut}, color 0.2s ease`,
          }}
        >
          {label}
          {required ? <span style={{ color: '#1cc14b' }}> *</span> : null}
        </label>

        <input
          key={shakeKey}
          id={id}
          type={type}
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            if (state === 'error') {
              setState(event.target.value ? 'filled' : 'idle')
            }
          }}
          onFocus={() => setState('focused')}
          onBlur={validate}
          placeholder={isFocused ? placeholder ?? '' : ''}
          className="absolute bottom-0 left-0 right-0 h-9 w-full bg-transparent pb-2 text-sm text-[#0a0a0a] outline-none placeholder:text-[#4b5563]"
          style={{
            border: 'none',
            borderBottom: `1px solid ${borderColor}`,
            transform:
              state === 'error'
                ? 'translate3d(-2px, 0, 0)'
                : 'translate3d(0, 0, 0)',
            transition:
              'border-color 0.22s ease, transform 0.18s ease, color 0.18s ease',
          }}
        />

        <div
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            backgroundColor: state === 'error' ? '#d4183d' : '#1cc14b',
            transform: `scaleX(${isFocused ? 1 : 0})`,
            transformOrigin: '0 50%',
            transition: `transform 0.26s ${easeOut}`,
          }}
        />
      </div>

      {state === 'error' ? (
        <p
          className="mb-0 mt-1 text-[12px]"
          style={{
            color: '#d4183d',
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          This field is required
        </p>
      ) : null}
    </div>
  )
}

const FloatingTextarea: FC<{
  delay?: number
} & TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  delay = 0,
  ...props
}) => {
  const id = useId()
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-20px 0px',
    threshold: 0.2,
  })
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: `opacity 0.6s ${easeOut} ${delay}s, transform 0.6s ${easeOut} ${delay}s`,
      }}
    >
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[11px] font-normal uppercase tracking-[1.8px]"
        style={{
          color: isFocused ? '#1cc14b' : '#737373',
          transition: 'color 0.2s ease',
        }}
      >
        Message
      </label>

      <div className="relative">
        <textarea
          {...props}
          id={id}
          rows={3}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block min-h-16 w-full resize-none bg-transparent py-2 text-sm text-[#0a0a0a] outline-none placeholder:text-[#4b5563]"
          style={{
            border: 'none',
            borderBottom: '1px solid rgba(15,23,42,0.12)',
            boxSizing: 'border-box',
            transition: 'border-color 0.22s ease',
          }}
        />

        <div
          className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1cc14b]"
          style={{
            transform: `scaleX(${isFocused ? 1 : 0})`,
            transformOrigin: '0 50%',
            transition: `transform 0.26s ${easeOut}`,
          }}
        />
      </div>
    </div>
  )
}

const SocialIcon: FC<{ label: string }> = ({ label }) => (
  <div className="flex size-8 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a]">
    {label}
  </div>
)

const AnimatedSocial: FC<{
  href: string
  label: string
  ariaLabel: string
}> = ({ href, label, ariaLabel }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? '#1cc14b' : '#0a0a0a',
        transform: hovered ? 'scale(1.14)' : 'scale(1)',
        transition: `transform 0.18s ${easeOut}, color 0.18s ease`,
      }}
    >
      <SocialIcon label={label} />
    </a>
  )
}

const PrivacyCheckbox: FC<{
  checked: boolean
  onChange: (checked: boolean) => void
}> = ({ checked, onChange }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex min-h-[23px] cursor-pointer items-start gap-3 bg-transparent p-0 text-left"
    >
      <span
        className="relative mt-[3px] flex size-4 shrink-0 items-center justify-center rounded-[3px]"
        style={{
          border: `1.5px solid ${checked || hovered ? '#1cc14b' : 'rgba(15,23,42,0.2)'}`,
          backgroundColor: checked ? '#1cc14b' : 'transparent',
          transition: 'background-color 0.18s ease, border-color 0.18s ease',
        }}
      >
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          style={{
            opacity: checked ? 1 : 0,
            transform: checked ? 'scale(1)' : 'scale(0)',
            transition: `opacity 0.18s ease, transform 0.18s ${easeOut}`,
          }}
        >
          <path
            d="M1 4 3.5 6.5 9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="text-sm font-normal leading-[1.625] text-[#4b5563]">
        I accept the Privacy Policy <span className="text-[#0a0a0a]">*</span>
      </span>
    </button>
  )
}

const SubmitButton: FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    if (status !== 'idle') {
      return
    }

    setStatus('loading')

    window.setTimeout(() => {
      setStatus('success')
    }, 1800)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status !== 'idle'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-9 w-full overflow-hidden rounded-[2px] border-none text-center text-sm font-semibold leading-5 text-white"
      style={{
        backgroundColor: status === 'success' ? '#1cc14b' : hovered ? '#1e1e1e' : '#0a0a0a',
        cursor: status === 'idle' ? 'pointer' : 'not-allowed',
        transform: hovered && status === 'idle' ? 'translate3d(0, -1px, 0)' : 'translate3d(0, 0, 0)',
        transition: 'background-color 0.18s ease, transform 0.18s ease',
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          transform:
            hovered && status === 'idle'
              ? 'translate3d(100%, 0, 0)'
              : 'translate3d(-100%, 0, 0)',
          transition: hovered
            ? 'transform 0.58s linear'
            : 'transform 0s linear',
        }}
      />

      <span className="relative z-[1] inline-flex items-center gap-2">
        {status === 'idle' ? 'Send message' : null}
        {status === 'loading' ? (
          <>
            <span
              className="inline-block size-[13px] rounded-full"
              style={{
                border: '2px solid rgba(255,255,255,0.25)',
                borderTopColor: 'white',
                animation: 'footer-spin 0.85s linear infinite',
              }}
            />
            Sending...
          </>
        ) : null}
        {status === 'success' ? '✓ Message sent' : null}
      </span>
    </button>
  )
}

const AnimatedSection: FC<{
  children: ReactNode
  delay?: number
}> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-30px 0px',
    threshold: 0.15,
  })

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
        transition: `opacity 0.6s ${easeOut} ${delay}s, transform 0.6s ${easeOut} ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const ContactForm: FC = () => {
  const [accepted, setAccepted] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="flex w-full flex-col gap-12">
      <AnimatedSection>
        <div className="flex w-full items-center justify-between">
          <MonoLabel>Let&apos;s get connected</MonoLabel>
          <MonoLabel>→</MonoLabel>
        </div>
      </AnimatedSection>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex flex-1 flex-col">
            <FloatingInput
              label="Full name"
              placeholder="Jane Smith"
              required
              delay={0.05}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <FloatingInput
              label="Company"
              placeholder="Company name"
              required
              delay={0.1}
            />
          </div>
        </div>

        <FloatingInput
          label="Email"
          type="email"
          placeholder="name@company.com"
          required
          delay={0.15}
        />

        <FloatingTextarea
          placeholder="Project details, timeline, location..."
          delay={0.2}
        />

        <AnimatedSection delay={0.25}>
          <div className="flex flex-col items-start justify-between gap-6 pt-2 sm:flex-row sm:items-end">
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-1">
                <MonoLabel>Email</MonoLabel>
                <a
                  href="mailto:sales@equipra.eu"
                  className="text-sm font-semibold leading-5 text-[#0a0a0a]"
                  style={{ transition: 'opacity 0.18s ease' }}
                >
                  sales@equipra.eu
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <MonoLabel>Phone</MonoLabel>
                <a
                  href="tel:+48000111122"
                  className="text-sm font-semibold leading-5 text-[#0a0a0a]"
                  style={{ transition: 'opacity 0.18s ease' }}
                >
                  +48 000 1111 22
                </a>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-[18px] sm:w-[230px]">
              <PrivacyCheckbox checked={accepted} onChange={setAccepted} />
              <SubmitButton />
            </div>
          </div>
        </AnimatedSection>
      </form>
    </div>
  )
}

export function Footer() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-60px 0px',
    threshold: 0.2,
  })

  return (
    <footer id="contact" data-nav-section className="w-full bg-[#f5f5f5]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-3.5 pt-6">
        <div className="flex w-full flex-col gap-6">
          <div className="px-4 sm:px-8 md:px-[60px]">
            <div
              ref={headerRef}
              className="lg:pl-[calc(50%+20px)]"
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView
                  ? 'translate3d(0, 0, 0)'
                  : 'translate3d(0, 34px, 0)',
                transition: `opacity 0.88s ${easeOut} 0.06s, transform 0.88s ${easeOut} 0.06s`,
              }}
            >
              <h2 className="py-2.5 text-[clamp(44px,7vw,84px)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0a0a0a]">
                Contact us
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-16 px-4 pb-[60px] sm:px-8 md:px-[60px] lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)] lg:gap-x-0">
            <AnimatedSection delay={0.08}>
              <div className="flex w-full shrink-0 flex-col justify-between gap-10 lg:w-[414px]">
                <div className="flex items-start gap-10">
                  <div className="flex h-full w-[187px] shrink-0 flex-col justify-between gap-12">
                    <div className="flex flex-col gap-12">
                      <div className="flex flex-col gap-10">
                        <MonoLabel>Legal</MonoLabel>
                        <div className="flex flex-col gap-2.5">
                          {LEGAL_LINKS.map((link) => (
                            <AnimatedLink key={link.label} href={link.href}>
                              {link.label}
                            </AnimatedLink>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <AnimatedSocial
                        href="https://linkedin.com"
                        label="in"
                        ariaLabel="LinkedIn"
                      />
                      <AnimatedSocial
                        href="https://facebook.com"
                        label="fb"
                        ariaLabel="Facebook"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-12">
                    <MonoLabel>Navigation</MonoLabel>
                    <div className="flex flex-col gap-2.5">
                      {NAV_LINKS.map((link) => (
                        <AnimatedLink key={link.label} href={link.href}>
                          {link.label}
                        </AnimatedLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <MonoLabel>Certifications</MonoLabel>
                  <div className="flex flex-wrap gap-2">
                    {CERTIFICATIONS.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center justify-center bg-white p-3"
                        style={{
                          transition:
                            'transform 0.18s ease, box-shadow 0.18s ease',
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.transform =
                            'translate3d(0, -1px, 0)'
                          event.currentTarget.style.boxShadow =
                            '0 2px 8px rgba(0,0,0,0.06)'
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.transform =
                            'translate3d(0, 0, 0)'
                          event.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <span className="whitespace-nowrap text-sm font-semibold leading-none text-[#0a0a0a]">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <MonoLabel>Address</MonoLabel>
                  <p className="text-sm font-semibold leading-5 text-[#0a0a0a]">
                    Pulawska str. 77/U.5, 02-592 Warsaw, Poland
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.14}>
              <div className="w-full shrink-0 lg:w-auto lg:pl-0">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="w-full px-4 sm:px-8 md:px-[60px]">
          <div className="mb-3 h-px w-full bg-[#e5e5e5]" />

          <AnimatedSection delay={0.18}>
            <div className="flex w-full items-end justify-between">
              <p className="text-xs font-normal leading-4 text-[#0a0a0a]">
                © 2026 Equipra. + HD™ Design Büro. All rights reserved.
              </p>
              <p className="hidden text-right text-xs font-normal leading-4 text-[#0a0a0a] sm:block">
                Pulawska str. 77/U.5, 02-592 Warsaw, Poland
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style jsx>{`
        @keyframes footer-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </footer>
  )
}

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

type FormData = {
  fullName: string
  company: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData | 'accepted', string>>

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
  <span className="font-mono text-xs font-normal uppercase leading-4 tracking-[1.8px] text-[#737373] sm:text-[0.6875rem]">
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
  name: keyof FormData
  label: string
  value: string
  error?: string
  type?: string
  placeholder?: string
  required?: boolean
  delay?: number
  onChange: (name: keyof FormData, value: string) => void
  onBlur?: (name: keyof FormData) => void
}> = ({
  name,
  label,
  value,
  error,
  type = 'text',
  placeholder,
  required,
  delay = 0,
  onChange,
  onBlur,
}) => {
  const id = useId()
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-20px 0px',
    threshold: 0.2,
  })
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.trim().length > 0
  const labelUp = isFocused || hasValue
  const isErrored = Boolean(error)

  const borderColor =
    isErrored
      ? '#d4183d'
      : isFocused
        ? '#1cc14b'
        : hasValue
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
              isErrored
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
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => {
            onChange(name, event.target.value)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.(name)
          }}
          placeholder={isFocused ? placeholder ?? '' : ''}
          className="absolute bottom-0 left-0 right-0 h-9 w-full bg-transparent pb-2 text-sm text-[#0a0a0a] outline-none placeholder:text-[#4b5563]"
          style={{
            border: 'none',
            borderBottom: `1px solid ${borderColor}`,
            transform:
              isErrored
                ? 'translate3d(-2px, 0, 0)'
                : 'translate3d(0, 0, 0)',
            transition:
              'border-color 0.22s ease, transform 0.18s ease, color 0.18s ease',
          }}
        />

        <div
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            backgroundColor: isErrored ? '#d4183d' : '#1cc14b',
            transform: `scaleX(${isFocused ? 1 : 0})`,
            transformOrigin: '0 50%',
            transition: `transform 0.26s ${easeOut}`,
          }}
        />
      </div>

      {error ? (
        <p
          className="mb-0 mt-1 text-xs"
          style={{
            color: '#d4183d',
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

const FloatingTextarea: FC<{
  error?: string
  delay?: number
  name: keyof FormData
  value: string
  onChange: (name: keyof FormData, value: string) => void
  onBlur?: (name: keyof FormData) => void
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name' | 'value' | 'onChange' | 'onBlur'
>> = ({
  error,
  delay = 0,
  name,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const id = useId()
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-20px 0px',
    threshold: 0.2,
  })
  const [isFocused, setIsFocused] = useState(false)

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
        className="mb-1.5 block font-mono text-[0.6875rem] font-normal uppercase tracking-[1.8px]"
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
          name={name}
          rows={3}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.(name)
          }}
          className="block min-h-16 w-full resize-none bg-transparent py-2 text-sm text-[#0a0a0a] outline-none placeholder:text-[#4b5563]"
          style={{
            border: 'none',
            borderBottom: `1px solid ${error ? '#d4183d' : 'rgba(15,23,42,0.12)'}`,
            boxSizing: 'border-box',
            transition: 'border-color 0.22s ease',
          }}
        />

        <div
          className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1cc14b]"
          style={{
            backgroundColor: error ? '#d4183d' : '#1cc14b',
            transform: `scaleX(${isFocused || Boolean(error) ? 1 : 0})`,
            transformOrigin: '0 50%',
            transition: `transform 0.26s ${easeOut}`,
          }}
        />
      </div>

      {error ? (
        <p
          className="mb-0 mt-1 text-xs"
          style={{
            color: '#d4183d',
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

const LinkedInIcon: FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-8"
  >
    <path
      d="M30.72 0H1.28C0.572 0 0 0.572 0 1.28V30.72C0 31.428 0.572 32 1.28 32H30.72C31.428 32 32 31.428 32 30.72V1.28C32 0.572 31.428 0 30.72 0ZM9.492 27.268H4.744V11.996H9.492V27.268ZM7.12 9.908C6.57571 9.908 6.04363 9.7466 5.59107 9.4442C5.13851 9.14181 4.78578 8.71201 4.57748 8.20914C4.36919 7.70628 4.31469 7.15295 4.42088 6.61911C4.52707 6.08528 4.78917 5.59492 5.17404 5.21004C5.55892 4.82517 6.04928 4.56307 6.58311 4.45688C7.11695 4.35069 7.67028 4.40519 8.17314 4.61348C8.67601 4.82178 9.10581 5.17451 9.4082 5.62707C9.7106 6.07963 9.872 6.61171 9.872 7.156C9.868 8.676 8.636 9.908 7.12 9.908ZM27.268 27.268H22.524V19.84C22.524 18.068 22.492 15.792 20.056 15.792C17.588 15.792 17.208 17.72 17.208 19.712V27.268H12.468V11.996H17.02V14.084H17.084C17.716 12.884 19.264 11.616 21.576 11.616C26.384 11.616 27.268 14.78 27.268 18.892V27.268Z"
      fill="black"
    />
  </svg>
)

const AnimatedSocial: FC<{
  href: string
  ariaLabel: string
}> = ({ href, ariaLabel }) => {
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
      <LinkedInIcon />
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

const SubmitButton: FC<{
  status: 'idle' | 'loading' | 'success' | 'error'
  disabled?: boolean
}> = ({ status, disabled = false }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="submit"
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-11 w-full overflow-hidden rounded-[2px] border-none text-center text-sm font-semibold leading-5 text-white sm:h-9"
      style={{
        backgroundColor:
          status === 'success'
            ? '#1cc14b'
            : status === 'error'
              ? '#d4183d'
              : hovered && !disabled
                ? '#1e1e1e'
                : '#0a0a0a',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform:
          hovered && !disabled
            ? 'translate3d(0, -1px, 0)'
            : 'translate3d(0, 0, 0)',
        transition: 'background-color 0.18s ease, transform 0.18s ease',
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          transform:
            hovered && !disabled
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
        {status === 'error' ? 'Try again' : null}
      </span>
    </button>
  )
}

const AnimatedSection: FC<{
  children: ReactNode
  delay?: number
  className?: string
}> = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '-30px 0px',
    threshold: 0.15,
  })

  return (
    <div
      ref={ref}
      className={className}
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
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const validateField = (
    field: keyof FormData,
    value: string = formData[field]
  ) => {
    const trimmedValue = value.trim()

    if (!trimmedValue) {
      return 'This field is required'
    }

    if (
      field === 'email' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
    ) {
      return 'Enter a valid email address'
    }

    return ''
  }

  const validate = () => {
    const nextErrors: FormErrors = {}

    ;(Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field)

      if (error) {
        nextErrors[field] = error
      }
    })

    if (!accepted) {
      nextErrors.accepted = 'Please accept the Privacy Policy'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const nextErrors = { ...current }
      const error = validateField(field, value)

      if (error) {
        nextErrors[field] = error
      } else {
        delete nextErrors[field]
      }

      return nextErrors
    })

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
  }

  const handleFieldBlur = (field: keyof FormData) => {
    const error = validateField(field)

    setErrors((current) => {
      if (!error && !current[field]) {
        return current
      }

      const nextErrors = { ...current }

      if (error) {
        nextErrors[field] = error
      } else {
        delete nextErrors[field]
      }

      return nextErrors
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!validate()) {
      setSubmitStatus('error')
      return
    }

    try {
      setSubmitStatus('loading')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({
        fullName: '',
        company: '',
        email: '',
        message: '',
      })
      setAccepted(false)
      setErrors({})
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
    }
  }

  useEffect(() => {
    if (submitStatus !== 'success') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSubmitStatus('idle')
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [submitStatus])

  return (
    <div className="flex w-full flex-col gap-10 sm:gap-12">
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
              name="fullName"
              label="Full name"
              value={formData.fullName}
              error={errors.fullName}
              placeholder="Jane Smith"
              required
              delay={0.05}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <FloatingInput
              name="company"
              label="Company"
              value={formData.company}
              error={errors.company}
              placeholder="Company name"
              required
              delay={0.1}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          </div>
        </div>

        <FloatingInput
          name="email"
          label="Email"
          value={formData.email}
          error={errors.email}
          type="email"
          placeholder="name@company.com"
          required
          delay={0.15}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />

        <FloatingTextarea
          name="message"
          value={formData.message}
          error={errors.message}
          placeholder="Project details, timeline, location..."
          delay={0.2}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />

        <AnimatedSection delay={0.25}>
          <div className="flex w-full flex-col items-start justify-between gap-6 pt-2 sm:flex-row sm:items-end">
            <div className="order-2 flex w-full items-start justify-between sm:order-1 sm:w-auto sm:justify-start sm:gap-10">
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

            <div className="order-1 flex w-full flex-col gap-[18px] sm:order-2 sm:w-[230px]">
              <PrivacyCheckbox checked={accepted} onChange={setAccepted} />
              {errors.accepted ? (
                <p className="-mt-3 text-xs text-[#d4183d]">
                  {errors.accepted}
                </p>
              ) : null}
              <SubmitButton status={submitStatus} disabled={submitStatus === 'loading'} />
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
      <div className="flex w-full flex-col items-center gap-3.5 px-4 py-8 sm:mx-auto sm:max-w-[1800px] sm:px-0 sm:pt-6 sm:pb-0">
        <div className="flex w-full flex-col gap-6">
          <div className=" md:px-[3.75rem]">
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
              <h2 className="py-0 text-[2rem] font-semibold leading-8 tracking-[-0.04rem] text-[#0a0a0a] sm:py-2.5 sm:text-[clamp(2.75rem,7vw,5.25rem)] sm:leading-[1.14] sm:tracking-[-0.02em]">
                Contact us
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-8 pb-0 sm:gap-16 sm:pb-[3.75rem] md:px-[3.75rem] lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)] lg:gap-x-0">
            <AnimatedSection delay={0.14} className="order-1 w-full lg:order-2">
              <div className="w-full shrink-0 lg:w-auto lg:pl-0">
                <ContactForm />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08} className="order-2 w-full lg:order-1">
              <div>
                <div className="flex w-full shrink-0 flex-col justify-between gap-10 lg:w-[414px]">
                  <div className="flex items-start gap-10">
                    <div className="flex h-full flex-1 flex-col justify-between gap-12 sm:w-[187px] sm:shrink-0">
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
                          href="https://www.linkedin.com/company/equipraeu"
                          ariaLabel="LinkedIn"
                        />
                      </div>
                    </div>

                    <div className="flex w-[142px] flex-col gap-12">
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
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="w-full pt-4 md:px-[3.75rem]">
          <div className="mb-3 h-px w-full bg-[#e5e5e5]" />

          <div className="flex w-full flex-col items-start gap-3 self-stretch pb-5 md:flex-row md:items-end md:justify-between md:gap-6 md:pb-10">
            <div className="max-w-[680px] text-xs font-normal leading-4 text-[#0a0a0a]">
              <span>© 2026 </span>
              <span className="underline">HD™ Design Büro</span>
              <span> + Equipra. All rights reserved.</span>
            </div>
            <div className="w-full text-left text-xs font-normal leading-4 text-[#0a0a0a] md:max-w-[420px] md:text-right">
              Smart InTech sp. z o.o. | Registration number (KRS): 0000970398
            </div>
          </div>
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

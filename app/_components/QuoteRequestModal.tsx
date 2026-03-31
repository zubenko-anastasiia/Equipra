'use client'

import type {
  FC,
  FormEvent,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import { useEffect, useState } from 'react'

const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'

type QuoteFormData = {
  fullName: string
  company: string
  email: string
  requestDetails: string
}

type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>

const MonoLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="font-mono text-[12px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373] sm:text-[11px]">
    {children}
  </span>
)

const CloseIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M6 6 18 18M18 6 6 18" strokeLinecap="round" />
  </svg>
)

const DoneIcon: FC<{ dark?: boolean }> = ({ dark = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    className={dark ? 'size-8 text-[#0a0a0a]' : 'size-4 text-white'}
    aria-hidden="true"
  >
    <path
      d="M5 12.5 9.5 17 19 7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const FloatingInput: FC<{
  label: string
  value: string
  error?: string
  type?: string
  placeholder?: string
  onChange: (value: string) => void
}> = ({ label, value, error, type = 'text', placeholder, onChange }) => {
  const [isFocused, setIsFocused] = useState(false)
  const labelUp = isFocused || value.trim().length > 0

  return (
    <label className="relative block">
      <span
        className="pointer-events-none absolute left-0 top-0 z-[1] font-mono font-normal uppercase tracking-[1.8px]"
        style={{
          fontSize: labelUp ? 11 : 14,
          transform: `translate3d(0, ${labelUp ? 0 : 14}px, 0)`,
          color: error ? '#d4183d' : isFocused ? '#1cc14b' : '#737373',
          transition: `transform 0.2s ${easeOut}, font-size 0.2s ${easeOut}, color 0.2s ease`,
        }}
      >
        {label} <span style={{ color: '#1cc14b' }}>*</span>
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder ?? '' : ''}
        className="h-11 w-full bg-transparent pb-2 pt-5 text-sm text-[#0a0a0a] outline-none placeholder:text-[#4b5563]"
        style={{
          border: 'none',
          borderBottom: `1px solid ${error ? '#d4183d' : isFocused ? '#1cc14b' : 'rgba(15,23,42,0.12)'}`,
          transition: 'border-color 0.22s ease',
        }}
      />

      {error ? (
        <span className="mt-1 block text-[12px] text-[#d4183d]">{error}</span>
      ) : null}
    </label>
  )
}

const FloatingTextarea: FC<{
  error?: string
  value: string
  onChange: (value: string) => void
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange'
>> = ({ error, value, onChange, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative w-full">
      <label
        className="mb-1.5 block font-mono text-[11px] font-normal uppercase tracking-[1.8px]"
        style={{
          color: error ? '#d4183d' : isFocused ? '#1cc14b' : '#737373',
          transition: 'color 0.2s ease',
        }}
      >
        Request / project details <span style={{ color: '#1cc14b' }}>*</span>
      </label>

      <div className="relative">
        <textarea
          {...props}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block min-h-24 w-full resize-none bg-transparent py-2 text-sm text-[#0a0a0a] outline-none placeholder:text-[#4b5563]"
          style={{
            border: 'none',
            borderBottom: `1px solid ${error ? '#d4183d' : 'rgba(15,23,42,0.12)'}`,
            boxSizing: 'border-box',
            transition: 'border-color 0.22s ease',
          }}
        />

        <div
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            backgroundColor: error ? '#d4183d' : '#1cc14b',
            transform: `scaleX(${isFocused || Boolean(error) ? 1 : 0})`,
            transformOrigin: '0 50%',
            transition: `transform 0.26s ${easeOut}`,
          }}
        />
      </div>

      {error ? (
        <p className="mt-1 text-[12px] text-[#d4183d]">{error}</p>
      ) : null}
    </div>
  )
}

type QuoteRequestModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteRequestModal({
  isOpen,
  onClose,
}: QuoteRequestModalProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    company: '',
    email: '',
    requestDetails: '',
  })
  const [errors, setErrors] = useState<QuoteFormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (submitStatus !== 'success') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSubmitStatus('idle')
      onClose()
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [onClose, submitStatus])

  const validate = () => {
    const nextErrors: QuoteFormErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'This field is required'
    }

    if (!formData.company.trim()) {
      nextErrors.company = 'This field is required'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'This field is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!formData.requestDetails.trim()) {
      nextErrors.requestDetails = 'This field is required'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!validate()) {
      setSubmitStatus('error')
      return
    }

    try {
      setSubmitStatus('loading')

      const response = await fetch('/api/request-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          requestDetails: formData.requestDetails.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request')
      }

      setSubmitStatus('success')
      setFormData({
        fullName: '',
        company: '',
        email: '',
        requestDetails: '',
      })
      setErrors({})
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/45 px-4 py-4 backdrop-blur-[2px] sm:items-center sm:justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[620px] rounded-[2px] bg-[#f5f5f5] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className="flex flex-col gap-3">
            <MonoLabel>Request A Quote</MonoLabel>
            <div className="space-y-2">
              <h3 className="text-[28px] font-semibold leading-[1.05] text-[#0a0a0a] sm:text-[40px]">
                Request a Quote
              </h3>
              <p className="max-w-[420px] text-sm leading-6 text-[#4b5563]">
                Share your contact details and project request. We&apos;ll review
                it and get back to you with the next steps.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-[#0a0a0a] transition-colors hover:bg-[#ebebeb]"
            aria-label="Close request quote form"
          >
            <CloseIcon />
          </button>
        </div>

        {submitStatus === 'success' ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <DoneIcon dark />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-semibold text-[#0a0a0a]">
                Request sent
              </h4>
              <p className="text-sm leading-6 text-[#4b5563]">
                              We received your application and will contact you soon.

              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FloatingInput
              label="Full Name"
              value={formData.fullName}
              error={errors.fullName}
              placeholder="Jane Smith"
              onChange={(value) => {
                setFormData((current) => ({ ...current, fullName: value }))
                setErrors((current) => ({ ...current, fullName: undefined }))
                if (submitStatus !== 'idle') {
                  setSubmitStatus('idle')
                }
              }}
            />

            <FloatingInput
              label="Company Name"
              value={formData.company}
              error={errors.company}
              placeholder="Company name"
              onChange={(value) => {
                setFormData((current) => ({ ...current, company: value }))
                setErrors((current) => ({ ...current, company: undefined }))
                if (submitStatus !== 'idle') {
                  setSubmitStatus('idle')
                }
              }}
            />

            <FloatingInput
              label="Work Email"
              type="email"
              value={formData.email}
              error={errors.email}
              placeholder="name@company.com"
              onChange={(value) => {
                setFormData((current) => ({ ...current, email: value }))
                setErrors((current) => ({ ...current, email: undefined }))
                if (submitStatus !== 'idle') {
                  setSubmitStatus('idle')
                }
              }}
            />

            <FloatingTextarea
              rows={4}
              value={formData.requestDetails}
              error={errors.requestDetails}
              placeholder="Tell us about your project scope, timeline, location, and support needed..."
              onChange={(value) => {
                setFormData((current) => ({
                  ...current,
                  requestDetails: value,
                }))
                setErrors((current) => ({
                  ...current,
                  requestDetails: undefined,
                }))
                if (submitStatus !== 'idle') {
                  setSubmitStatus('idle')
                }
              }}
            />

            <div className="flex flex-col items-center gap-1 pt-2">
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-[2px] bg-[#0a0a0a] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1e1e1e] disabled:cursor-not-allowed disabled:bg-[#737373]"
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Submit request'}
              </button>
              <p
                className="text-sm"
                style={{
                  color: submitStatus === 'error' ? '#d4183d' : '#737373',
                }}
              >
                {submitStatus === 'error'
                  ? 'Please fix the form and try again.'
                  : null}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

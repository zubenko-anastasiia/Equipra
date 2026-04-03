'use client'

import type { FC, FormEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024
const PDF_MIME_TYPE = 'application/pdf'
const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'

type ApplicationFormData = {
  fullName: string
  email: string
  position: string
  cvFile: File | null
}

type ApplicationFormErrors = Partial<
  Record<keyof ApplicationFormData, string>
>

const MonoLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="font-mono text-[12px] font-normal uppercase leading-4 tracking-[0.4px] text-[#737373] sm:text-[11px]">
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

const UploadIcon: FC<{ inverted?: boolean }> = ({ inverted = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={inverted ? 'size-4 text-white' : 'size-5 text-[#0a0a0a]'}
    aria-hidden="true"
  >
    <path
      d="M12 16V7m0 0-3 3m3-3 3 3M5 17.5v.5A2 2 0 0 0 7 20h10a2 2 0 0 0 2-2v-.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TrashIcon: FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="size-4"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#career-application-trash-icon-clip)">
      <path
        d="M4.66634 2.66666V1.33333H11.333V2.66666H14.6663V3.99999H13.333V14C13.333 14.1768 13.2628 14.3464 13.1377 14.4714C13.0127 14.5964 12.8432 14.6667 12.6663 14.6667H3.33301C3.1562 14.6667 2.98663 14.5964 2.8616 14.4714C2.73658 14.3464 2.66634 14.1768 2.66634 14V3.99999H1.33301V2.66666H4.66634ZM3.99967 3.99999V13.3333H11.9997V3.99999H3.99967ZM5.99967 5.99999H7.33301V11.3333H5.99967V5.99999ZM8.66634 5.99999H9.99967V11.3333H8.66634V5.99999Z"
        fill="#171717"
      />
    </g>
    <defs>
      <clipPath id="career-application-trash-icon-clip">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const FloatingInput: FC<{
  label: string
  value: string
  error?: string
  placeholder?: string
  onChange: (value: string) => void
}> = ({ label, value, error, placeholder, onChange }) => {
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

const FileUploadField: FC<{
  file: File | null
  error?: string
  onChange: (file: File | null) => void
}> = ({ file, error, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="flex flex-col gap-3">
      <span
        className="font-mono font-normal uppercase tracking-[1.8px]"
        style={{
          fontSize: 14,
          lineHeight: 1.15,
          color: error ? '#d4183d' : '#737373',
        }}
      >
        CV Upload <span style={{ color: '#1cc14b' }}>*</span>
      </span>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex w-full cursor-pointer flex-col items-center gap-6 rounded-lg border border-dashed px-4 py-5 text-center transition-colors"
        style={{
          borderColor: error ? '#d4183d' : '#e4e4e7',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        <div
          className="flex size-12 items-center justify-center rounded-md border bg-white"
          style={{
            borderColor: error ? '#fecdd3' : '#e4e4e7',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          <UploadIcon />
        </div>

        <div className="flex w-full flex-col items-center gap-3.5">
          <div className="flex w-full flex-col items-center gap-2">
            <span className="w-full text-center text-xl font-semibold leading-7 text-[#18181b]">
              {file ? (
                <span
                  className="block w-full overflow-hidden text-ellipsis whitespace-nowrap"
                  title={file.name}
                >
                  {file.name}
                </span>
              ) : (
                'Upload file'
              )}
            </span>
            <span className="w-full text-center text-sm leading-5 text-[#71717a]">
              {file ? (
                `Selected PDF • ${(file.size / (1024 * 1024)).toFixed(2)} MB`
              ) : (
                <span className="font-mono text-[12px] uppercase tracking-[0.4px] text-[#737373]">
                  PDF format only, up to 10 MB
                </span>
              )}
            </span>
          </div>

          <div className="flex w-full justify-center">
            {file ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onChange(null)
                }}
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[2px] bg-[#f5f5f5] px-4 text-sm font-medium leading-5 text-[#171717] transition-colors hover:bg-[#ebebeb]"
              >
                <TrashIcon />
                Delete
              </button>
            ) : (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  inputRef.current?.click()
                }}
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[2px] bg-[#171717] px-4 text-sm font-medium leading-5 text-[#fafafa] transition-colors hover:bg-[#232323]"
              >
                <UploadIcon inverted />
                Choose a file to upload
              </button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(event) => {
          onChange(event.target.files?.[0] ?? null)
          event.target.value = ''
        }}
      />

      {error ? (
        <span className="text-[12px] text-[#d4183d]">{error}</span>
      ) : null}
    </div>
  )
}

type CareerApplicationModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CareerApplicationModal({
  isOpen,
  onClose,
}: CareerApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    position: '',
    cvFile: null,
  })
  const [errors, setErrors] = useState<ApplicationFormErrors>({})
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
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [onClose, submitStatus])

  const validateFile = (file: File | null) => {
    if (!file) {
      return 'Please upload your CV'
    }

    const isPdf =
      file.type === PDF_MIME_TYPE || file.name.toLowerCase().endsWith('.pdf')

    if (!isPdf) {
      return 'Only PDF files are allowed'
    }

    if (file.size > MAX_CV_SIZE_BYTES) {
      return 'PDF must be 10 MB or smaller'
    }

    return ''
  }

  const validate = () => {
    const nextErrors: ApplicationFormErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'This field is required'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'This field is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!formData.position.trim()) {
      nextErrors.position = 'This field is required'
    }

    const fileError = validateFile(formData.cvFile)
    if (fileError) {
      nextErrors.cvFile = fileError
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

      const payload = new FormData()
      payload.append('fullName', formData.fullName.trim())
      payload.append('email', formData.email.trim())
      payload.append('position', formData.position.trim())
      if (formData.cvFile) {
        payload.append('cvFile', formData.cvFile)
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: payload,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application')
      }

      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        position: '',
        cvFile: null,
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
        className="relative w-full max-w-[620px] rounded-[2px] bg-[#f5f5f5] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {submitStatus === 'success' ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 text-center">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full p-0 text-[#0a0a0a] transition-colors hover:bg-[#ebebeb] sm:right-8 sm:top-8"
              aria-label="Close application form"
            >
              <CloseIcon />
            </button>

            <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <DoneIcon dark />
            </div>

            <div className="space-y-3">
              <h3 className="text-[28px] font-semibold leading-[1.05] text-[#0a0a0a] sm:text-[40px]">
                Application sent
              </h3>
              <MonoLabel>
                We received your application and will contact you soon.
              </MonoLabel>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between gap-6">
                <h3 className="text-[28px] -ml-[2px] font-semibold leading-[1.05] text-[#0a0a0a] sm:text-[40px]">
                  Career Application
                </h3>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full p-0 text-[#0a0a0a] transition-colors hover:bg-[#ebebeb]"
                  aria-label="Close application form"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="hidden sm:block">
                <MonoLabel>
                  Share your contact details, the role you&apos;re applying
                  for, and your CV. We&apos;ll review your application and get
                  back to you with the next steps.
                </MonoLabel>
              </div>
            </div>

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
                label="Email"
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

              <FloatingInput
                label="Position Applied For"
                value={formData.position}
                error={errors.position}
                placeholder="Industrial Installer"
                onChange={(value) => {
                  setFormData((current) => ({ ...current, position: value }))
                  setErrors((current) => ({
                    ...current,
                    position: undefined,
                  }))
                  if (submitStatus !== 'idle') {
                    setSubmitStatus('idle')
                  }
                }}
              />

              <FileUploadField
                file={formData.cvFile}
                error={errors.cvFile}
                onChange={(file) => {
                  setFormData((current) => ({ ...current, cvFile: file }))
                  setErrors((current) => ({
                    ...current,
                    cvFile: file ? undefined : current.cvFile,
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
                  {submitStatus === 'loading'
                    ? 'Sending...'
                    : 'Submit application'}
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
          </>
        )}
      </div>
    </div>
  )
}

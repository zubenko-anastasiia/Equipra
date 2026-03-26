'use client'

import type { FC, FormEvent, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { useState } from 'react'
import Link from 'next/link'

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
]

const NAV_LINKS = [
  { label: 'About Us', href: '#' },
  { label: 'Industries', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Career', href: '#' },
  { label: 'Blog', href: '#' },
]

const CERTIFICATIONS = ['ISO 14001', 'ISO 45001', 'ISO 9001', 'SCC']

const MonoLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
    {children}
  </span>
)

const FieldLabel: FC<{ label: string; required?: boolean }> = ({
  label,
  required,
}) => (
  <label className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#0b0d10]">
    {label} {required && <span className="text-[#1cc14b]">*</span>}
  </label>
)

const UnderlineInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="h-9 w-full border-b border-[rgba(15,23,42,0.12)] bg-transparent pt-[7.86px] pb-[8.85px] text-sm text-[#4b5563]  transition-colors placeholder:text-[#4b5563] focus:border-[#0a0a0a] focus:outline-none"
  />
)

const UnderlineTextarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  props,
) => (
  <textarea
    {...props}
    rows={3}
    className="min-h-16 w-full resize-none  border-b border-[rgba(15,23,42,0.12)] bg-transparent pt-[8.57px] text-sm text-[#4b5563]  transition-colors placeholder:text-[#4b5563] focus:border-[#0a0a0a] focus:outline-none"
  />
)

const SocialIcon: FC<{ label: string }> = ({ label }) => (
  <div className="flex size-8 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a]">
    {label}
  </div>
)

const ContactForm: FC = () => {
  const [accepted, setAccepted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex w-full items-center justify-between">
        <MonoLabel>Let&apos;s get connected</MonoLabel>
        <MonoLabel>→</MonoLabel>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1.5">
            <FieldLabel label="Full name" required />
            <UnderlineInput
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <FieldLabel label="Company" required />
            <UnderlineInput
              type="text"
              placeholder="Company name"
              autoComplete="organization"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel label="Email" required />
          <UnderlineInput
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel label="Message" />
          <UnderlineTextarea placeholder="Project details, timeline, location..." />
        </div>

        <div className="flex flex-col items-start justify-between gap-6 pt-2 sm:flex-row sm:items-end">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1">
              <MonoLabel>Email</MonoLabel>
              <a
                href="mailto:office@equipra.eu"
                className="text-sm font-semibold leading-5 text-[#0a0a0a] transition-opacity hover:opacity-70"
              >
                office@equipra.eu
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <MonoLabel>Phone</MonoLabel>
              <a
                href="tel:+48000111122"
                className="text-sm font-semibold leading-5 text-[#0a0a0a] transition-opacity hover:opacity-70"
              >
                +48 000 1111 22
              </a>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-[18px] sm:w-[230px]">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border border-[rgba(15,23,42,0.12)] bg-transparent accent-[#0a0a0a] "
              />
              <span className="text-sm font-normal leading-[1.625] text-[#4b5563]">
                I accept the Privacy Policy{' '}
                <span className="text-[#0a0a0a]">*</span>
              </span>
            </label>

            <button
              type="submit"
              className="h-9 w-full cursor-pointer rounded-[2px] bg-[#0a0a0a] text-center text-sm font-semibold leading-5 text-white transition-opacity hover:opacity-80"
            >
              Send message
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f5]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-3.5 pt-6">
        <div className="flex w-full flex-col gap-6">
          <div className="px-4 sm:px-8 md:px-[60px]">
            <div className="lg:pl-[calc(50%+20px)]">
              <h2 className="py-2.5 text-[clamp(44px,7vw,84px)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0a0a0a]">
                Contact us
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-16 px-4 pb-[60px] sm:px-8 md:px-[60px] lg:grid lg:grid-cols-[calc(50%+20px)_minmax(0,1fr)] lg:gap-x-0">
            <div className="flex w-full shrink-0 flex-col justify-between gap-10 lg:w-[414px]">
              <div className="flex items-start gap-10">
                <div className="flex h-full w-[187px] shrink-0 flex-col justify-between gap-12">
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-10">
                      <MonoLabel>Legal</MonoLabel>
                      <div className="flex flex-col gap-2.5">
                        {LEGAL_LINKS.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-normal leading-5 text-[#0a0a0a] transition-opacity hover:opacity-60"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-70"
                      aria-label="LinkedIn"
                    >
                      <SocialIcon label="in" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-70"
                      aria-label="Facebook"
                    >
                      <SocialIcon label="fb" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-12">
                  <MonoLabel>Navigation</MonoLabel>
                  <div className="flex flex-col gap-2.5">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm font-normal leading-5 text-[#0a0a0a] transition-opacity hover:opacity-60"
                      >
                        {link.label}
                      </Link>
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

            <div className="w-full shrink-0 lg:w-auto lg:pl-0">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="w-full px-4 sm:px-8 md:px-[60px]">
          <div className="mb-3 h-px w-full bg-[#e5e5e5]" />

          <div className="flex w-full items-end justify-between pb-3">
            <p className="text-xs font-normal leading-4 text-[#0a0a0a]">
              © 2026 Equipra. + HD™ Design Büro. All rights reserved.
            </p>
            <p className="hidden text-right text-xs font-normal leading-4 text-[#0a0a0a] sm:block">
              Pulawska str. 77/U.5, 02-592 Warsaw, Poland
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

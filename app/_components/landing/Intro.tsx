'use client'

import { useEffect, useState, type FC } from 'react'

const FileIcon: FC = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    <path
      d="M5 1.5h4.6L12.5 4.4V14a.5.5 0 0 1-.5.5H5A1.5 1.5 0 0 1 3.5 13V3A1.5 1.5 0 0 1 5 1.5Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 1.5V4a.5.5 0 0 0 .5.5h2.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M5.8 7.2h4.4M5.8 9.5h4.4M5.8 11.8h3.1"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)

const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'
const headlineLines = ['Reliability', 'Every Connection']

export function Intro() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setMounted(true), 60)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: 'min(846px, 100svh)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          overflow: 'hidden',
          clipPath: mounted ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
          transition: `clip-path 1.35s ${easeOut}`,
        }}
      >
        <div
          className="absolute inset-0 intro-image"
          style={{
            backgroundImage: "url('/img1.webp')",
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            transform: mounted ? 'translate3d(0, 0, 0) scale(1.08)' : 'translate3d(0, 16px, 0) scale(1.12)',
            transition: `transform 1.5s ${easeOut}`,
            willChange: 'transform',
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 38%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.05) 62%, transparent 100%)',
          transform: mounted ? 'translate3d(200%, 0, 0)' : 'translate3d(-100%, 0, 0)',
          transition: mounted
            ? `transform 1.25s ${easeOut} 0.45s`
            : 'none',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse at 45% 30%, rgba(28,193,75,0.07) 0%, transparent 60%)',
          opacity: mounted ? 1 : 0,
          animation: mounted ? 'intro-shimmer 3.2s ease-in-out 1.8s 1' : 'none',
        }}
      />

      <div
        className="absolute inset-x-0 bottom-4 sm:bottom-8 md:bottom-[60px]"
        style={{ zIndex: 4 }}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-6 px-4 sm:px-8 md:px-[60px]">
          <h1
            className="w-full max-w-[1174px] uppercase font-medium leading-[0.82] text-white"
            style={{
              fontFamily:
                "'Druk Trial', Impact, 'Arial Narrow', Arial, sans-serif",
              fontSize: 'clamp(64px, 10.4vw, 150px)',
            }}
          >
            {headlineLines.map((line, index) => (
              <span
                key={line}
                className="block overflow-hidden"
                style={{ lineHeight: 0 }}
              >
                <span
                  className="block"
                  style={{
                    lineHeight: 0.82,
                    transform: mounted ? 'translate3d(0, 0, 0)' : 'translate3d(0, 108%, 0)',
                    opacity: mounted ? 1 : 0,
                    transition: `transform 1.05s ${easeOut} ${0.52 + index * 0.09}s, opacity 1.05s ${easeOut} ${0.52 + index * 0.09}s`,
                    willChange: 'transform, opacity',
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <a
            href="#contact"
            className="inline-flex h-9 w-[177px] shrink-0 items-center gap-1 rounded-[2px] border border-[#e5e5e5] bg-white px-[9px] no-underline transition-colors hover:bg-neutral-100"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
              transition: `opacity 0.9s ${easeOut} 1.15s, transform 0.9s ${easeOut} 1.15s`,
            }}
          >
            <span className="relative flex h-4 w-6 shrink-0 items-center justify-center text-black">
              <FileIcon />
            </span>

            <span
              className="whitespace-nowrap text-center leading-6 text-black"
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              Request a Quote
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes intro-shimmer {
          0%,
          100% {
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}

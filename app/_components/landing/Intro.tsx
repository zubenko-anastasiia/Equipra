import type { FC } from 'react'

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

export function Intro() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: 'min(846px, 100svh)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/img1.webp')",
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)',
        }}
      />

      <div
        className="absolute inset-x-0 bottom-4 sm:bottom-8 md:bottom-[60px]"
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
            <span className="block">Reliability</span>
            <span className="block">Every Connection</span>
          </h1>

          <a
            href="#contact"
            className="inline-flex h-9 w-[177px] shrink-0 items-center gap-1 rounded-[2px] border border-[#e5e5e5] bg-white px-[9px] no-underline transition-colors hover:bg-neutral-100"
          >
            <span className="relative flex h-4 w-6 shrink-0 items-center justify-center text-black">
              <FileIcon />
            </span>

            <span
              className="whitespace-nowrap text-center leading-6 text-black"
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              Request a Quote
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

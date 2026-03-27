'use client'

import type { FC } from 'react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'

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

interface ServiceItem {
  num: string
  title: string
  bullets: string[]
  imageSrc: string
  videoSrc?: string
  videoScale?: number
  softenVideoBackground?: boolean
  softenVideoEdges?: boolean
  softenVideoBottomEdge?: boolean
}

const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Welding Services',
    bullets: [
      'Certified welding support',
      'On-site execution',
      'Quality control',
      'Piping & structural',
    ],
    imageSrc: '/img4.webp',
    videoSrc: '/vid4.mp4',
  },
  {
    num: '02',
    title: 'Renovations',
    bullets: [
      'Revamp and upgrade of existing systems',
      'Mechanical dismantling',
      'System relocation',
      'Recommissioning',
    ],
    imageSrc: '/img5.webp',
    videoSrc: '/vid5.mp4',
    softenVideoEdges: true,
  },
  {
    num: '03',
    title: 'Assembly Services',
    bullets: [
      'Precision assembly for industrial equipment',
      'Mechanical fitting',
      'Alignment & levelling',
      'Pre-commissioning checks',
    ],
    imageSrc: '/img6.webp',
    videoSrc: '/vid6.mp4',
    softenVideoBackground: true,
  },
  {
    num: '04',
    title: 'Repair & Upgrade Service',
    bullets: [
      'On-site repairs and performance upgrades',
      'Fault diagnosis',
      'Component replacement',
      'Functional testing',
    ],
    imageSrc: '/img7.webp',
    videoSrc: '/vid7.mp4',
  },
  {
    num: '05',
    title: 'Energy & Infrastructure',
    bullets: [
      'Installation for energy and utility systems',
      'Electrical fit-out',
      'Utility pipework',
      'Commissioning & handover',
    ],
    imageSrc: '/img8.webp',
    videoSrc: '/vid8.mp4',
    videoScale: 0.89,
    softenVideoBottomEdge: true,
  },
]

const useDesktopHoverMedia = () => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine)'
    )
    const update = () => setEnabled(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return enabled
}

const ServiceMedia: FC<{
  imageSrc: string
  videoSrc?: string
  alt: string
  showVideo: boolean
  videoScale?: number
  softenVideoBackground?: boolean
  softenVideoEdges?: boolean
  softenVideoBottomEdge?: boolean
}> = ({
  imageSrc,
  videoSrc,
  alt,
  showVideo,
  videoScale = 1,
  softenVideoBackground = false,
  softenVideoEdges = false,
  softenVideoBottomEdge = false,
}) => {
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (!showVideo) {
      setVideoReady(false)
    }
  }, [showVideo])

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-50">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-contain"
        sizes="33vw"
      />

      {showVideo && videoSrc ? (
        <video
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={imageSrc}
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${softenVideoBackground ? '[filter:brightness(0.985)_saturate(0.96)]' : ''}`}
          style={{
            opacity: videoReady ? 1 : 0,
            transform: `scale(${videoScale})`,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {showVideo && softenVideoBackground ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_62%,rgba(250,250,250,0.24)_100%)]"
        />
      ) : null}

      {showVideo && softenVideoEdges ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-[#fafafa]/90 via-[#fafafa]/38 to-transparent [filter:blur(8px)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-[#fafafa]/90 via-[#fafafa]/38 to-transparent [filter:blur(8px)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_64%,rgba(250,250,250,0.16)_82%,rgba(250,250,250,0.55)_100%)] [filter:blur(6px)]"
          />
        </>
      ) : null}

      {showVideo && softenVideoBottomEdge ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] bg-gradient-to-t from-[#fafafa]/45 via-[#fafafa]/18 to-transparent [filter:blur(4px)]"
        />
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 34px 14px rgba(244, 244, 245, 0.96)',
        }}
      />
    </div>
  )
}

const DrawLine: FC<{
  inView: boolean
  delay: number
  color?: string
  thickness?: number
}> = ({ inView, delay, color = '#0a0a0a', thickness = 3 }) => (
  <div
    className="absolute left-0 right-0 top-0 overflow-hidden"
    style={{ height: thickness }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: color,
        transform: `scaleX(${inView ? 1 : 0})`,
        transformOrigin: '0 50%',
        transition: `transform 0.56s ${easeOut} ${delay}s`,
      }}
    />
  </div>
)

const ServiceRow: FC<{
  service: ServiceItem
  index: number
  desktopHoverMediaEnabled: boolean
}> = ({ service, index, desktopHoverMediaEnabled }) => {
  const {
    num,
    title,
    bullets,
    imageSrc,
    videoSrc,
    videoScale,
    softenVideoBackground,
    softenVideoEdges,
    softenVideoBottomEdge,
  } = service
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: '-48px 0px',
    threshold: 0.18,
  })
  const rowDelay = index * 0.06
  const showVideo = desktopHoverMediaEnabled && hovered && Boolean(videoSrc)

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (desktopHoverMediaEnabled) {
          setHovered(true)
        }
      }}
      onMouseLeave={() => setHovered(false)}
      className="flex min-h-[298px] w-full items-start gap-[14px] lg:grid lg:grid-cols-[285px_calc(50%-293px)_minmax(0,1fr)_29px] lg:gap-x-[14px]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
        transition: `opacity 0.62s ${easeOut} ${rowDelay}s, transform 0.62s ${easeOut} ${rowDelay}s`,
      }}
    >
      <div className="relative flex w-[180px] shrink-0 items-start pt-5 sm:w-[220px] lg:w-[285px]">
        <DrawLine inView={inView} delay={rowDelay + 0.08} />
        <h3
          className="w-full text-xl font-semibold leading-[1.33] text-[#0a0a0a] sm:text-2xl"
          style={{
            transform: `translate3d(${hovered ? 6 : 0}px, 0, 0)`,
            transition: `transform 0.22s ${easeOut}`,
          }}
        >
          {title}
        </h3>
      </div>

      <div className="relative flex w-[180px] shrink-0 flex-col pt-5 sm:w-[260px] lg:w-auto">
        <DrawLine inView={inView} delay={rowDelay + 0.13} />
        {bullets.map((bullet, i) => (
          <div
            key={bullet}
            className="relative flex w-full items-center"
            style={{
              paddingTop: i === 0 ? 0 : 10,
              paddingBottom: 10,
              transform: `translate3d(${hovered ? 4 : 0}px, 0, 0)`,
              transition: `transform 0.22s ${easeOut} ${i * 0.025}s`,
            }}
          >
            {i > 0 ? (
              <DrawLine
                inView={inView}
                delay={rowDelay + 0.17 + i * 0.04}
                color="#0a0a0a"
                thickness={1}
              />
            ) : null}
            {i === bullets.length - 1 ? (
              <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#0a0a0a',
                    transform: `scaleX(${inView ? 1 : 0})`,
                    transformOrigin: '0 50%',
                    transition: `transform 0.56s ${easeOut} ${rowDelay + 0.17 + i * 0.04}s`,
                  }}
                />
              </div>
            ) : null}
            <span className="whitespace-nowrap text-base font-medium leading-6 text-[#0a0a0a]">
              {bullet}
            </span>
          </div>
        ))}
      </div>

      <div className="relative hidden min-w-0 flex-1 self-stretch pt-5 sm:flex sm:flex-col lg:w-auto lg:flex-none">
        <DrawLine inView={inView} delay={rowDelay + 0.18} />
        <div className="relative flex-1">
          <div className="h-full w-full">
            <ServiceMedia
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              alt={title}
              showVideo={showVideo}
              videoScale={videoScale}
              softenVideoBackground={softenVideoBackground}
              softenVideoEdges={softenVideoEdges}
              softenVideoBottomEdge={softenVideoBottomEdge}
            />
          </div>
        </div>
      </div>

      <div className="relative w-[29px] shrink-0 pt-5">
        <DrawLine inView={inView} delay={rowDelay + 0.23} color="#737373" />
        <span className="text-xl font-semibold leading-none text-[#737373]">
          {num}
        </span>
      </div>
    </div>
  )
}

export function Services() {
  const desktopHoverMediaEnabled = useDesktopHoverMedia()
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    rootMargin: '-60px 0px',
    threshold: 0.2,
  })

  return (
    <section id="services" data-nav-section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px] lg:py-20">
        <div
          ref={headerRef}
          className="relative mb-8 lg:mb-10"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 34px, 0)',
            transition: `opacity 0.88s ${easeOut}, transform 0.88s ${easeOut}`,
          }}
        >
          <div className="mb-3 flex items-center gap-3 lg:ml-[calc(50%+20px)] lg:-mt-1">
            <span
              aria-hidden="true"
              className="block h-1 w-8 shrink-0 rounded-full bg-[#1cc14b]"
            />
            <span className="font-mono text-[11px] font-normal uppercase tracking-[1.8px] text-[#737373]">
              End-to-end installation
            </span>
          </div>

          <div className="lg:pl-[calc(50%+20px)]">
            <h2 className="text-[clamp(44px,7vw,84px)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#0a0a0a]">
              Services
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.num}
              service={service}
              index={index}
              desktopHoverMediaEnabled={desktopHoverMediaEnabled}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

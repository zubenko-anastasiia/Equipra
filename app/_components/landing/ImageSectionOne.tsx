import Image from 'next/image'

import sectionOneImage from '@/public/section1.1.webp'

export function ImageSectionOne() {
  return (
    <section
      aria-label="Industrial installation showcase"
      className="relative w-full overflow-hidden bg-white"
    >
      <Image
        src={sectionOneImage}
        alt="Industrial installation showcase"
        className="h-auto w-full brightness-[1.04] contrast-[0.98]"
        priority={false}
        quality={85}
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="landing-mobile-gradient pointer-events-none absolute inset-x-0 top-0 h-8 sm:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden shadow-[inset_0_0_44px_20px_rgba(255,255,255,0.94)] sm:block"
      />
    </section>
  )
}

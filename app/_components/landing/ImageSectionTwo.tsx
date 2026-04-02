import Image from 'next/image'

import sectionTwoImage from '@/public/section2.2.webp'

export function ImageSectionTwo() {
  return (
    <section
      aria-label="Industrial project showcase"
      className="relative w-full overflow-hidden bg-white"
    >
      <Image
        src={sectionTwoImage}
        alt="Industrial project showcase"
        className="h-auto w-full brightness-[1.06] contrast-[0.98]"
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

import Image from 'next/image'

import sectionOneImage from '@/public/section1.webp'

export function ImageSectionOne() {
  return (
    <section
      aria-label="Industrial installation showcase"
      className="w-full bg-white"
    >
      <Image
        src={sectionOneImage}
        alt="Industrial installation showcase"
        className="h-auto w-full brightness-[1.04] contrast-[0.98]"
        priority={false}
        quality={85}
        sizes="100vw"
      />
    </section>
  )
}

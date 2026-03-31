import Image from 'next/image'

import sectionTwoImage from '@/public/section2.webp'

export function ImageSectionTwo() {
  return (
    <section aria-label="Industrial project showcase" className="w-full bg-white">
      <Image
        src={sectionTwoImage}
        alt="Industrial project showcase"
        className="h-auto w-full brightness-[1.06] contrast-[0.98]"
        priority={false}
        quality={85}
        sizes="100vw"
      />
    </section>
  )
}

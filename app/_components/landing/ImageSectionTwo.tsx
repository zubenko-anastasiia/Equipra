import sectionTwoImage from '@/public/imgSection2.webp'
import { AnimatedImageSection } from './AnimatedImageSection'

export function ImageSectionTwo() {
  return (
    <AnimatedImageSection
      src={sectionTwoImage}
      alt="Industrial project showcase"
      ariaLabel="Industrial project showcase"
    />
  )
}

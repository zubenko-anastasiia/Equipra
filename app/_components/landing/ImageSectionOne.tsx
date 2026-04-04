import sectionOneImage from '@/public/imgSection1.webp'
import { AnimatedImageSection } from './AnimatedImageSection'

export function ImageSectionOne() {
  return (
    <AnimatedImageSection
      src={sectionOneImage}
      alt="Industrial installation showcase"
      ariaLabel="Industrial installation showcase"
    />
  )
}

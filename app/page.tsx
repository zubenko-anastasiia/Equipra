import {
  Header,
  Intro,
  AboutCompany,
  ImageSectionOne,
  Industries,
  ImageSectionTwo,
  Services,
  MapSection,
  Clients,
  VacanciesPreview,
  Footer,
} from './_components/landing'
import QualityAssurance from './_components/landing/QualityAssurance'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className='flex flex-col gap-20'>
        <Intro />
        <AboutCompany />
        <QualityAssurance />
        {/* <ImageSectionOne /> */}
        <Industries />
        {/* <ImageSectionTwo /> */}
        <Services />
        <MapSection />
        <Clients />
        <VacanciesPreview />
      </main>
      <Footer />
    </>
  )
}

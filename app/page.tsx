import {
  Header,
  Intro,
  AboutCompany,
  Industries,
  Services,
  MapSection,
  Clients,
  VacanciesPreview,
  Footer,
} from './_components/landing'
import QualityAssurance from './_components/landing/QualityAssurance'
import { getVacancies } from './vacancies/vacancyData'

export default async function HomePage() {
  const vacancies = await getVacancies()
  const previewVacancies = vacancies
    .slice(0, 6)
    .map((vacancy) => ({
      department: vacancy.department,
      title: vacancy.title,
      href: `/vacancies/${vacancy.slug}`,
    }))
    .reverse()

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
        <VacanciesPreview vacancies={previewVacancies} />
      </main>
      <Footer />
    </>
  )
}

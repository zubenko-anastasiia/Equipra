import type { Metadata } from 'next'
import { Footer, Header } from '../_components/landing'
import VacancyHubPage from './VacancyHubPage'
import { getVacancies } from './vacancyData'

export const metadata: Metadata = {
  title: 'Vacancies',
  description:
    'Current Equipra vacancies across industrial installation, project delivery, welding, and site execution.',
  alternates: {
    canonical: '/vacancies',
  },
}

export default async function VacanciesPage() {
  const vacancies = await getVacancies()

  return (
    <>
      <Header />
      <main>
        <VacancyHubPage vacancies={vacancies} />
      </main>
      <Footer />
    </>
  )
}

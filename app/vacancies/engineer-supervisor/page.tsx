import type { Metadata } from 'next'
import { Footer, Header } from '../../_components/landing'
import VacancyPage from './VacancyPage'

export const metadata: Metadata = {
  title: 'Engineer Supervisor Vacancy',
  description:
    'Engineer Supervisor vacancy at Equipra for industrial installation and project execution delivery across European sites.',
  alternates: {
    canonical: '/vacancies/engineer-supervisor',
  },
}

export default function EngineerSupervisorVacancyRoute() {
  return (
    <>
      <Header />
      <main>
        <VacancyPage />
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import { Footer, Header } from '../../_components/landing'
import VacancyArticlePage from '../VacancyArticlePage'
import { getVacancies, getVacancy } from '../vacancyData'

export async function generateStaticParams() {
  const vacancies = await getVacancies()
  return vacancies.map((vacancy) => ({ slug: vacancy.slug }))
}

export async function generateMetadata(
  props: PageProps<'/vacancies/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const vacancy = await getVacancy(slug)

  if (!vacancy) {
    return {
      title: 'Vacancy Not Found',
      description: 'The requested Equipra vacancy could not be found.',
    }
  }

  return {
    title: `${vacancy.title} Vacancy`,
    description: vacancy.description,
    alternates: {
      canonical: `/vacancies/${vacancy.slug}`,
    },
  }
}

export default async function VacancyRoute(props: PageProps<'/vacancies/[slug]'>) {
  const { slug } = await props.params
  const vacancy = await getVacancy(slug)

  return (
    <>
      <Header />
      <main>
        <VacancyArticlePage vacancy={vacancy} />
      </main>
      <Footer />
    </>
  )
}

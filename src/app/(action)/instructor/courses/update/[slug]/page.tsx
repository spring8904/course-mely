import CourseUpdateView from '@/sections/instructor/view/course-update-view'
import { ICourse } from '@/types'
import axios from 'axios'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params

  const response = await axios.get(`/api/courses/${slug}`)
  const course: ICourse = response.data

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: course.name,
    description: course.description,
    openGraph: {
      title: course.name,
      description: course.description || undefined,
      images: [course.thumbnail, ...previousImages].filter(
        (img): img is string => !!img
      ),
    },
  }
}

const CourseUpdatePage = ({ params }: Props) => {
  const { slug } = params
  return <CourseUpdateView slug={slug} />
}

export default CourseUpdatePage

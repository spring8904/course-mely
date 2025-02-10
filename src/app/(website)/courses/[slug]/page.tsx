// import { Metadata, ResolvingMetadata } from 'next'

// import { getCourseBySlug } from '@/services/course/course-api'

import CourseDetailView from '@/sections/courses/view/course-detail-view'

interface Props {
  params: {
    slug: string
  }
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { slug } = params

//   const course = await getCourseBySlug(slug)

//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: course.name,
//     description: course.description,
//     openGraph: {
//       title: course.name,
//       description: course.description || undefined,
//       images: [course.thumbnail, ...previousImages].filter(
//         (img): img is string => !!img
//       ),
//     },
//   }
// }

const CourseDetailPage = ({ params }: Props) => {
  const { slug } = params
  return <CourseDetailView slug={slug} />
}

export default CourseDetailPage

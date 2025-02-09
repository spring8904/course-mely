// import { Metadata, ResolvingMetadata } from 'next'

// import { getCourseOverview } from '@/services/instructors/courses/course-api'

import CourseUpdateView from '@/sections/instructor/view/course-update-view'

type Props = {
  params: { slug: string }
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { slug } = params

//   const res = await getCourseOverview(slug)

//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: res.data.course.name,
//     description: res.data.course.description,
//     openGraph: {
//       title: res.data.course.name,
//       description: res.data.course.description || undefined,
//       images: [res.data.course.thumbnail, ...previousImages].filter(
//         (img): img is string => !!img
//       ),
//     },
//   }
// }

const CourseUpdatePage = ({ params }: Props) => {
  const { slug } = params
  return <CourseUpdateView slug={slug} />
}

export default CourseUpdatePage

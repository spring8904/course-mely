import CourseUpdateView from '@/sections/instructor/view/course-update-view'

type Props = {
  params: { slug: string }
}

const CourseUpdatePage = ({ params }: Props) => {
  const { slug } = params
  return <CourseUpdateView slug={slug} />
}

export default CourseUpdatePage

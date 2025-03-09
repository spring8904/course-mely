import CourseUpdateView from '@/sections/instructor/view/course-update-view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cập nhật khóa học',
}

type Props = {
  params: { slug: string }
}

const CourseUpdatePage = ({ params }: Props) => {
  const { slug } = params
  return <CourseUpdateView slug={slug} />
}

export default CourseUpdatePage

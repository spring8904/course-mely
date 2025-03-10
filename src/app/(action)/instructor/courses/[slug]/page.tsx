import CourseDetailView from '@/sections/instructor/components/course-detail/course-detail'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi tiết khóa học',
}
interface Props {
  params: {
    slug: string
  }
}

const CourseDetail = ({ params }: Props) => {
  const { slug } = params

  return <CourseDetailView slug={slug} />
}

export default CourseDetail

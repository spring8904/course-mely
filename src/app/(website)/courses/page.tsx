import { CourseListView } from '@/sections/courses/view'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách khóa học',
}

const page = () => {
  return <CourseListView />
}

export default page

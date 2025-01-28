import { Metadata } from 'next'

import { CourseListView } from '@/sections/courses/view'

export const metadata: Metadata = {
  title: 'Danh sách khóa học',
}

const page = () => {
  return <CourseListView />
}

export default page

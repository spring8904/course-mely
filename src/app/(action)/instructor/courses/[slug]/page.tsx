import React from 'react'

import CourseDetailView from '@/sections/instructor/components/course-detail/course-detail'

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

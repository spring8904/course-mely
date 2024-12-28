'use client'

import CourseDetailView from '@/sections/courses/view/course-detail-view'

interface Props {
  params: {
    slug: string;
  }
}

const CourseDetailPage = ({ params }: Props) => {
  const { slug } = params;
  return <CourseDetailView slug={slug} />
}

export default CourseDetailPage;

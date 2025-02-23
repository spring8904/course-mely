import React from 'react'

import LearningLessonView from '@/sections/instructor/view/learning-lesson-view'

type Props = {
  params: { course: string }
}

const LearningPage = ({ params }: Props) => {
  const { course } = params

  return <LearningLessonView courseSlug={course} />
}

export default LearningPage

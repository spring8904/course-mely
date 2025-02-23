import React from 'react'

import LearningLessonView from '@/sections/instructor/view/learning-lesson-view'

type Props = {
  params: { course: string; lessonId: string }
}

const LearningPage = ({ params }: Props) => {
  const { course, lessonId } = params

  return <LearningLessonView courseSlug={course} lessonId={lessonId} />
}

export default LearningPage
